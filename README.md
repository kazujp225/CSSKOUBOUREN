# UI Spice

サイト制作で詰まったら、ここを見る。  
CSS・SVG・アニメーション・UI 演出を、実務の使いどころごとに探せる**社内用 UI 演出辞典**。  
各演出に「使う場面 / 効果 / NGな使い方 / Claude Code 用プロンプト」がセットで付いています。

## 起動

```bash
npm install
npm run dev
```

開発サーバ: http://localhost:3000

## ディレクトリ

```
src/
  app/
    page.tsx              # トップ（Hero / 検索 / カテゴリ / 注目）
    patterns/
      page.tsx            # 演出一覧（検索・フィルタ）
      [id]/page.tsx       # 演出詳細（プレビュー / 4種コード / Claudeプロンプト）
    about/page.tsx        # このサイトについて
  components/
    previews/             # 各演出のプレビュー React コンポーネント
    PatternCard.tsx       # 一覧用カード
    CodeBlock.tsx         # コピー可能なコードブロック
    CodeTabs.tsx          # HTML / CSS / Tailwind / React の切替
    PatternsExplorer.tsx  # 検索＋フィルタ UI
    Header.tsx / Footer.tsx / SearchBar.tsx / CategoryGrid.tsx / PopularTags.tsx
  data/
    categories.ts         # カテゴリ・人気タグ定義
    patterns.ts           # 演出データ（最初の20件）
```

## 演出の追加方法

1. `src/data/patterns.ts` に `Pattern` を 1 件追加  
2. （任意）`src/components/previews/index.tsx` にプレビュー用 React コンポーネントを追加し、`PREVIEWS` マップに登録  
3. それだけ。DB は不要、最終的に 1 万件規模まで増やせる構造。

## 思想

このサイトは単なるコード集ではありません。  
**若手・インターン・非デザイナーが「この場面ではこの演出を入れるとサイトが良くなる」と判断できるようになる**  
ためのものなので、各演出には必ず以下を入れています。

- 使う場面
- 効果
- 向いているサイト
- NG な使い方
- Claude Code 用プロンプト
