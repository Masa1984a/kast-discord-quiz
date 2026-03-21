import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

// .env.local を優先、なければ .env を読む（override で上書き）
const root = resolve(__dirname, "../../../..");
const envLocal = resolve(root, ".env.local");
const envFile = resolve(root, ".env");
config({ path: existsSync(envLocal) ? envLocal : envFile, override: true });

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

function parseArgs(args: string[]): { command: string; id?: number; flags: Record<string, string> } {
  const command = args[0] || "help";
  let id: number | undefined;
  const flags: Record<string, string> = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        flags[key] = value;
        i++;
      } else {
        flags[key] = "true";
      }
    } else if (!isNaN(Number(arg)) && id === undefined) {
      id = Number(arg);
    }
  }

  return { command, id, flags };
}

async function list(flags: Record<string, string>) {
  const where = flags.category ? { category: flags.category } : {};
  const questions = await prisma.question.findMany({
    where,
    orderBy: { id: "asc" },
    select: { id: true, category: true, questionText: true, correctIndex: true },
  });

  if (questions.length === 0) {
    console.log("No questions found.");
    return;
  }

  console.log(`Found ${questions.length} question(s):\n`);
  console.log("ID  | Category                    | Question (truncated)");
  console.log("----|-----------------------------|-----------------------------------------");
  for (const q of questions) {
    const text = q.questionText.length > 40 ? q.questionText.slice(0, 40) + "..." : q.questionText;
    console.log(`${String(q.id).padStart(3)} | ${q.category.padEnd(27)} | ${text}`);
  }
}

async function get(id: number) {
  const q = await prisma.question.findUnique({ where: { id } });
  if (!q) {
    console.log(`Question #${id} not found.`);
    process.exit(1);
  }

  const choices = q.choices as string[];
  const labels = ["A", "B", "C", "D", "E", "F"];

  console.log(`Question #${q.id}`);
  console.log(`Category:     ${q.category}`);
  console.log(`Question:     ${q.questionText}`);
  console.log(`Choices:`);
  choices.forEach((c, i) => {
    const marker = i === q.correctIndex ? " ✅" : "";
    console.log(`  ${labels[i]}. ${c}${marker}`);
  });
  console.log(`Correct:      ${labels[q.correctIndex]} (index ${q.correctIndex})`);
  console.log(`Explanation:  ${q.explanation}`);
  const links = q.relatedLinks as {label: string, url: string}[] | undefined;
  if (links && links.length > 0) {
    console.log(`Related Links:`);
    links.forEach((l) => console.log(`  - ${l.label}: ${l.url}`));
  }

  // Show reference count
  const refCount = await prisma.attemptDetail.count({ where: { questionId: id } });
  if (refCount > 0) {
    console.log(`\nReferenced in ${refCount} attempt detail(s).`);
  }
}

async function create(flags: Record<string, string>) {
  const required = ["category", "question", "choices", "correct", "explanation"];
  for (const key of required) {
    if (!flags[key]) {
      console.error(`Missing required flag: --${key}`);
      process.exit(1);
    }
  }

  let choices: string[];
  try {
    choices = JSON.parse(flags.choices);
  } catch {
    console.error("Invalid JSON for --choices. Use format: '[\"A\",\"B\",\"C\",\"D\"]'");
    process.exit(1);
  }

  const correctIndex = Number(flags.correct);
  if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= choices.length) {
    console.error(`--correct must be 0-${choices.length - 1}`);
    process.exit(1);
  }

  let relatedLinks: {label: string, url: string}[] = [];
  if (flags.links) {
    try {
      relatedLinks = JSON.parse(flags.links);
    } catch {
      console.error("Invalid JSON for --links. Use format: '[{\"label\":\"...\",\"url\":\"...\"}]'");
      process.exit(1);
    }
  }

  const q = await prisma.question.create({
    data: {
      category: flags.category,
      questionText: flags.question,
      choices,
      correctIndex,
      explanation: flags.explanation,
      relatedLinks,
    },
  });

  console.log(`Created question #${q.id}: "${q.questionText}"`);
}

async function update(id: number, flags: Record<string, string>) {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    console.log(`Question #${id} not found.`);
    process.exit(1);
  }

  const data: Record<string, unknown> = {};
  if (flags.category) data.category = flags.category;
  if (flags.question) data.questionText = flags.question;
  if (flags.choices) {
    try {
      data.choices = JSON.parse(flags.choices);
    } catch {
      console.error("Invalid JSON for --choices.");
      process.exit(1);
    }
  }
  if (flags.correct !== undefined) {
    const ci = Number(flags.correct);
    if (isNaN(ci)) {
      console.error("--correct must be a number.");
      process.exit(1);
    }
    data.correctIndex = ci;
  }
  if (flags.explanation) data.explanation = flags.explanation;
  if (flags.links) {
    try {
      data.relatedLinks = JSON.parse(flags.links);
    } catch {
      console.error("Invalid JSON for --links.");
      process.exit(1);
    }
  }

  if (Object.keys(data).length === 0) {
    console.log("No fields to update. Specify at least one flag.");
    process.exit(1);
  }

  const q = await prisma.question.update({ where: { id }, data });
  console.log(`Updated question #${q.id}: "${q.questionText}"`);
  console.log(`Updated fields: ${Object.keys(data).join(", ")}`);
}

async function remove(id: number, force: boolean) {
  const existing = await prisma.question.findUnique({ where: { id } });
  if (!existing) {
    console.log(`Question #${id} not found.`);
    process.exit(1);
  }

  const refCount = await prisma.attemptDetail.count({ where: { questionId: id } });

  if (refCount > 0 && !force) {
    console.error(
      `Question #${id} is referenced by ${refCount} attempt detail(s). Use --force to delete with related records.`
    );
    process.exit(1);
  }

  if (refCount > 0 && force) {
    await prisma.attemptDetail.deleteMany({ where: { questionId: id } });
    console.log(`Deleted ${refCount} related attempt detail(s).`);
  }

  await prisma.question.delete({ where: { id } });
  console.log(`Deleted question #${id}: "${existing.questionText}"`);
}

function showHelp() {
  console.log(`
Quiz CRUD Manager

Usage:
  quiz-crud.ts list [--category "..."]     List all questions
  quiz-crud.ts get <id>                    Get question details
  quiz-crud.ts create --category "..." --question "..." --choices '[...]' --correct N --explanation "..."
  quiz-crud.ts update <id> [--category] [--question] [--choices] [--correct] [--explanation]
  quiz-crud.ts delete <id> [--force]       Delete a question
  `);
}

async function main() {
  const args = process.argv.slice(2);
  const { command, id, flags } = parseArgs(args);

  try {
    switch (command) {
      case "list":
        await list(flags);
        break;
      case "get":
        if (id === undefined) { console.error("Usage: get <id>"); process.exit(1); }
        await get(id);
        break;
      case "create":
        await create(flags);
        break;
      case "update":
        if (id === undefined) { console.error("Usage: update <id> [flags]"); process.exit(1); }
        await update(id, flags);
        break;
      case "delete":
        if (id === undefined) { console.error("Usage: delete <id>"); process.exit(1); }
        await remove(id, flags.force === "true");
        break;
      default:
        showHelp();
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
