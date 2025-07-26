# 📝 Todo App

シンプルで使いやすいタスク管理アプリケーションです。直感的なインターフェースでタスクの作成、編集、削除、並び替えを行うことができます。

## ✨ 特徴

- **タスク管理**: タスクの作成、編集、削除が簡単に行えます
- **完了管理**: チェックボックスでタスクの完了状態を管理
- **ドラッグ&ドロップ**: 直感的な操作でタスクの順序を変更
- **レスポンシブデザイン**: デスクトップ・タブレット・モバイルに対応
- **ダークモード**: システムの設定に応じて自動的に切り替え
- **ローカルストレージ**: ブラウザにデータを自動保存
- **スムーズなアニメーション**: 心地よいユーザーエクスペリエンス

## 🛠️ 技術スタック

- **Frontend**: Next.js 15.4.4 + React 19
- **スタイリング**: Tailwind CSS v4
- **言語**: TypeScript
- **フォント**: Geist Sans & Geist Mono
- **データ保存**: LocalStorage（ブラウザローカル）

## 🚀 開発環境セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストールと起動

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### その他のコマンド

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コードリント
npm run lint
```

## 📱 機能詳細

### タスク作成
- 上部のフォームにテキストを入力
- 「追加」ボタンまたはEnterキーで追加
- 最大200文字まで入力可能

### タスク編集
- タスクテキストをクリックして編集モード
- Enterキーで保存、Escapeキーでキャンセル

### タスク削除
- 各タスクの削除ボタン（ゴミ箱アイコン）をクリック

### タスク完了
- チェックボックスをクリックして完了状態を切り替え
- 完了済みタスクは半透明で表示

### 並び替え
- タスクをドラッグ&ドロップで順序変更
- 直感的な操作で整理が可能

### 統計表示
- 合計タスク数
- 完了済みタスク数
- 未完了タスク数

## 🎨 デザインコンセプト

- **モダンでクリーン**: 余白を活用したスッキリとしたデザイン
- **直感的操作**: 迷わず使える分かりやすいUI
- **アクセシビリティ**: キーボード操作とスクリーンリーダーに配慮
- **パフォーマンス**: Core Web Vitalsを意識した軽快な動作

## 📂 プロジェクト構造

```
src/
├── app/              # Next.js App Router
│   ├── globals.css   # グローバルスタイル
│   ├── layout.tsx    # ルートレイアウト
│   └── page.tsx      # メインページ
├── components/       # Reactコンポーネント
│   ├── TodoApp.tsx   # メインアプリコンポーネント
│   ├── TodoForm.tsx  # タスク追加フォーム
│   ├── TodoList.tsx  # タスクリスト表示
│   └── TodoItem.tsx  # 個別タスクアイテム
└── types/           # TypeScript型定義
    └── index.ts     # Todo型定義
```

## 💾 データ仕様

### Todo型定義
```typescript
interface Todo {
  id: string;        // 一意識別子
  text: string;      // タスクテキスト
  completed: boolean; // 完了状態
  createdAt: Date;   // 作成日時
}
```

### データ永続化
- ブラウザのLocalStorageを使用
- ページリロード後もデータが保持される
- プライベートブラウジングモードでも動作

## 🔧 カスタマイズ

### テーマ色の変更
`src/app/globals.css`のCSS変数を編集:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### 最大文字数の変更
各コンポーネントの`maxLength`プロパティを変更

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## 🐛 既知の問題

現在、既知の問題はありません。問題を発見した場合は、Issueを作成してください。

## 📄 ライセンス

MIT License
