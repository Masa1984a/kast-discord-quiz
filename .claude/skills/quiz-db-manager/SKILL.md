---
name: quiz-db-manager
description: Neon PostgreSQL データベースに接続して KAST クイズデータの CRUD 操作を行うスキル。クイズの一覧取得、個別取得、新規登録、更新、削除を実行できる。「クイズを追加して」「クイズ一覧を見せて」「Q5 の内容を変更して」「クイズを削除して」などの指示で使用すること。データベース操作、クイズ管理、Question テーブルへの問い合わせに関連するリクエストでは必ずこのスキルを使うこと。
---

# Quiz DB Manager

Neon PostgreSQL 上の `Question` テーブルに対して CRUD 操作を行うスキル。

## Question テーブルのスキーマ

| カラム | 型 | 説明 |
|--------|------|------|
| `id` | Int (autoincrement) | 主キー |
| `category` | String | カテゴリ名（例: "Core Products", "Cards & Rewards"） |
| `questionText` | String | 問題文 |
| `choices` | Json (string[]) | 選択肢の配列 |
| `correctIndex` | Int | 正解の 0-based インデックス |
| `explanation` | String | 解説テキスト |

## 使い方

すべての操作は `scripts/quiz-crud.ts` を `tsx` で実行する。プロジェクトルートは `C:\temp\Quiz_challenge`。

### 一覧取得

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts list
```

カテゴリでフィルタ:
```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts list --category "Core Products"
```

### 個別取得

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts get <id>
```

### 新規登録

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts create --category "カテゴリ" --question "問題文" --choices '["A","B","C","D"]' --correct 2 --explanation "解説"
```

- `--correct` は 0-based インデックス（A=0, B=1, C=2, D=3）
- `--choices` は JSON 配列形式の文字列

### 更新

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts update <id> [--category "..."] [--question "..."] [--choices '["..."]'] [--correct N] [--explanation "..."]
```

変更したいフィールドのみ指定すれば OK。

### 削除

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts delete <id>
```

`AttemptDetail` に参照がある場合は削除できない（外部キー制約）。その場合はユーザーに確認してから `--force` で関連レコードごと削除する:

```bash
cd /c/temp/Quiz_challenge && npx tsx .claude/skills/quiz-db-manager/scripts/quiz-crud.ts delete <id> --force
```

## 注意事項

- `.env` または `.env.local` に `DATABASE_URL` が設定されている必要がある
- `correctIndex` は 0-based。ユーザーが「B が正解」と言った場合は `1` に変換すること
- 一覧取得の出力は簡潔なテーブル形式。詳細が必要な場合は `get` を使う
- 操作結果はユーザーにわかりやすく日本語で報告すること
