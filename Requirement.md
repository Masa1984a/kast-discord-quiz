# プロジェクト概要
Vercel上に構築する「KAST Discord Quiz App」のMVP開発を行ってください。
ユーザーはDiscordアカウントでログインし、ランダムに出題される5問のクイズに挑戦します。解答結果はデータベースに保存され、後から自身の傾向や成績を確認できるようにします。

# 技術スタック(最新の安定バージョンを探す)
- **Framework:** Next.js(App Router)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js (Auth.js) - Discord Providerを利用
- **Database:** Vercel Postgres
- **ORM:** Prisma (または Drizzle ORM)
- **Deployment:** Vercel (Proプラン環境)

# デザイン・UI要件
- 添付の `index.html` のデザイン言語を完全に踏襲してください。
- **テーマ:** ダークモード専用
- **カラーパレット:**
  - Background: `#0F0F0F`
  - Card/Container: `#1A1A1A`
  - Border: `#2A2A2A`
  - Accent/Primary: `#A78BFA` (KAST Purple)
  - Correct/Success: `#34D399`
  - Text: `#E5E5E5` (Muted: `#A0A0A0`)
- **フォント:** Inter
- **レスポンシブ:** モバイルファーストでPC表示にも対応

# 機能要件 (MVP)
1. **認証機能 (Auth)**
   - Discordアカウントでのみログイン可能とする。
   - 未ログインユーザーはトップページ（ログインボタンのみ）を表示。
2. **クイズ出題機能 (Quiz Engine)**
   - データベース（または初期のシードデータ）からランダムに「5問」を抽出して出題する。
   - 1問ずつ表示、または縦スクロールで5問表示（実装しやすい方でOK）。
3. **採点・結果表示機能 (Results)**
   - 5問解答後に採点処理を行い、スコア（例: 4/5）を表示。
   - 正解・不正解のフィードバックと、各設問の「解説（Explanation）」を表示する。
4. **成績保存・履歴機能 (History)**
   - ユーザーごとの解答結果（スコア、解答した日時）をデータベースに保存。
   - ユーザーのマイページ的な画面で、過去の成績履歴を表示する。
5. **マスターデータ管理**
   - **【重要】** クイズの設問・選択肢・解説などのマスターデータ管理用のWeb画面（Admin UI）は今回**不要**です。
   - データのメンテナンスは開発者が直接データベース（Vercel Postgres）を操作して行う想定です。

# データベーススキーマ要件 (Prisma想定)
以下のモデル構造をベースにスキーマを構築してください。
- **User:** NextAuthの標準スキーマ（Discord ID, Name, Image等を保存）
- **Question:** 設問マスター (id, category, questionText, choices(JSON), correctIndex, explanation)
- **QuizAttempt:** 挑戦履歴 (id, userId, score, totalQuestions, createdAt)
- **AttemptDetail:** 各問題の解答履歴 (id, attemptId, questionId, selectedChoiceIndex, isCorrect)

# Quizの内容(現在の想定)
Quiz_challenge.md

# 開発ステップの指示
以下の順序でコードを生成・提示してください。
1. `schema.prisma` の定義と、シードデータ（数問分）の作成スクリプト
2. NextAuth (Discord Provider) の設定コード (`auth.ts` または `app/api/auth/[...nextauth]/route.ts`)
3. クイズデータをランダムに5件取得するサーバーアクション（またはAPIルート）
4. UI実装（ログイン画面、クイズ解答画面、結果・履歴表示画面）