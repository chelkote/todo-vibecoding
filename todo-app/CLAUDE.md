# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code) への指針を提供します。

## 開発コマンド

- **開発サーバー起動**: `npm run dev` (高速ビルドのためTurbopackを使用)
- **本番用ビルド**: `npm run build`
- **本番サーバー起動**: `npm start`
- **コードリント**: `npm run lint`

## プロジェクト構造

これは以下の構造を持つApp Routerアーキテクチャを使用したNext.js 15アプリケーションです：

- **フレームワーク**: Next.js 15.4.4 with React 19
- **スタイリング**: Tailwind CSS v4（テーマ用のカスタムCSS変数付き）
- **TypeScript**: パスエイリアス（`@/*`が`./src/*`にマップ）を有効にしたストリクトモード
- **フォント**: Google FontsのGeist SansとGeist Mono
- **ESLint**: TypeScriptサポート付きのNext.js推奨設定

### 主要なアーキテクチャの詳細

- **App Router**: `src/app/`ディレクトリ構造を使用（Next.js 13+ App Router）
- **レイアウトシステム**: `src/app/layout.tsx`のルートレイアウトがグローバルスタイリングとフォント読み込みを処理
- **テーマ設定**: `globals.css`でライト/ダークモードサポート用のCSSカスタムプロパティ
- **パス解決**: `@/*`インポート用のTypeScriptパスマッピング設定
- **ビルドツール**: 開発時にTurbopackを使用し、高速コンパイルを実現

### スタイリングシステム

- カスタムテーマ変数付きのTailwind CSS v4
- `prefers-color-scheme`によるダークモードサポート
- 背景/前景色用のカスタムCSSプロパティ
- Tailwind設定に統合されたフォント変数

### 開発に関する注意事項

- ストリクトなTypeScript設定を使用
- Next.jsとTypeScript用にESLintを設定
- 現在テストフレームワークは設定されていない
- `src/`ディレクトリを使用した標準的なNext.jsプロジェクト構造