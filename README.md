# KAST Discord Quiz App

KAST Discord コミュニティ向けのクイズアプリです。Discord アカウントでログインし、ランダムに出題される 5 問のクイズに挑戦できます。

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Auth:** NextAuth.js v5 (Discord Provider)
- **Database:** Neon Postgres (Prisma ORM)
- **Deployment:** Vercel

## Features

- Discord OAuth ログイン
- 70 問のクイズデータベースからランダム 5 問を出題
- 解答後にスコア・正解・解説を表示
- 過去の成績履歴を閲覧可能
- ダークモード専用 UI（KAST ブランドカラー）

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

`.env.local` に以下を設定:

- `DATABASE_URL` / `DIRECT_URL` — Neon or Vercel Postgres の接続文字列
- `AUTH_SECRET` — `npx auth secret` で生成
- `AUTH_DISCORD_ID` / `AUTH_DISCORD_SECRET` — [Discord Developer Portal](https://discord.com/developers/applications) で作成
- Discord OAuth Redirect URI: `http://localhost:3000/api/auth/callback/discord`

### 3. Set up database

```bash
npx prisma db push
npx prisma db seed
```

### 4. Run dev server

```bash
npm run dev
```

http://localhost:3000 でアクセス。

## Deployment (Vercel)

1. GitHub リポジトリを Vercel にインポート
2. Environment Variables に `.env.local` と同じ値を設定（`NEXTAUTH_URL` は本番 URL に変更）
3. Discord OAuth に本番の Redirect URI を追加: `https://your-domain.vercel.app/api/auth/callback/discord`
4. Build Command: `prisma generate && next build`（package.json で設定済み）

## Quiz Data

クイズデータは `prisma/seed.ts` に 70 問分定義されています。カテゴリ:

- Core Products / Cards & Products / Stablecoins & Blockchain
- Leadership & Team / Fees & Transfers / Security & Compliance
- DeFi & Yield / Community & Campaigns / Geography & Use Cases
- Technical Knowledge / Staking & Rewards / Market Knowledge
