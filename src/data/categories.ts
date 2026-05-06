export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
};

export const CATEGORIES: Category[] = [
  { slug: "hero", name: "Hero / FV演出", description: "ファーストビューの第一印象を決める演出", icon: "Sparkles" },
  { slug: "cta", name: "CTAボタン", description: "クリック率を底上げする視線誘導ボタン", icon: "MousePointerClick" },
  { slug: "card", name: "カードUI", description: "情報を整理して見せるカード系UI", icon: "LayoutGrid" },
  { slug: "background", name: "背景・グラデーション", description: "余白を埋めて世界観を作る背景演出", icon: "Palette" },
  { slug: "svg", name: "SVG装飾", description: "区切り線・装飾・形状などのSVG演出", icon: "Shapes" },
  { slug: "loading", name: "ローディング", description: "待ち時間のストレスを下げる演出", icon: "LoaderCircle" },
  { slug: "hover", name: "ホバー演出", description: "触れた瞬間の小さなご褒美", icon: "Hand" },
  { slug: "text", name: "テキスト演出", description: "読ませる・止めるテキスト表現", icon: "Type" },
  { slug: "stats", name: "数字・実績演出", description: "信頼を見せる数字の見せ方", icon: "BarChart3" },
  { slug: "form", name: "フォームUI", description: "入力させるフォーム周りのUI", icon: "FormInput" },
  { slug: "faq", name: "FAQ / アコーディオン", description: "情報量を畳む・開く演出", icon: "ListCollapse" },
  { slug: "empty", name: "空状態 / エラーUI", description: "情報がない時の優しい見せ方", icon: "Inbox" },
  { slug: "icon", name: "アイコン演出 / 効果", description: "電球・歯車・ロケット・花火など、目を引く小ネタ演出", icon: "Lightbulb" },
  { slug: "font", name: "フォントアレンジ", description: "見出しの文字加工・タイポグラフィ装飾の集合", icon: "Type" },
  { slug: "fortune", name: "占い / ミスティック", description: "タロット・水晶玉・月相・占星盤・神秘系フォントなど占いサイト向け演出", icon: "Sparkles" },
];

export const POPULAR_TAGS = [
  "FV",
  "CTA",
  "高級感",
  "BtoB",
  "ホバー",
  "ローディング",
  "カード",
  "SVG",
  "Tailwind",
  "React",
];
