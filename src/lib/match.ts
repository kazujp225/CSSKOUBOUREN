// Lightweight "AI-like" pattern matcher.
// Takes a natural-language query in Japanese / English and returns ranked patterns
// from the global ALL_PATTERNS index. No external ML — just keyword normalization,
// synonym expansion, weighted scoring across rich metadata, and bigram fallback for
// non-tokenized Japanese input.

import type { Pattern } from "@/data/patterns";
import { ALL_PATTERNS } from "@/data/all";
import { CATEGORIES } from "@/data/categories";

/* -----------------------------------------------------------
   1. Synonym dictionary
   The keys are user phrases that may appear in queries; values are
   "canonical tokens" we expand to so they can match pattern metadata.
----------------------------------------------------------- */
const SYNONYMS: Record<string, string[]> = {
  // categories
  "ボタン": ["cta"],
  "クリック": ["cta", "ホバー"],
  "ロード": ["loading"],
  "ローディング": ["loading"],
  "待機": ["loading"],
  "読み込み": ["loading"],
  "スピナー": ["loading", "spinner"],
  "ドット": ["loading"],
  "プログレス": ["loading"],
  "進捗": ["loading"],
  "カード": ["card"],
  "Hero": ["hero", "FV"],
  "FV": ["hero"],
  "ファーストビュー": ["hero"],
  "メインビジュアル": ["hero"],
  "見出し": ["text", "font"],
  "タイトル": ["text", "font", "hero"],
  "テキスト": ["text", "font"],
  "フォント": ["font"],
  "タイポ": ["font"],
  "背景": ["background"],
  "グラデ": ["background", "グラデーション"],
  "グラデーション": ["background"],
  "波": ["svg"],
  "SVG": ["svg"],
  "区切り": ["svg"],
  "ディバイダー": ["svg"],
  "FAQ": ["faq"],
  "アコーディオン": ["faq"],
  "フォーム": ["form"],
  "入力": ["form"],
  "検索": ["form", "icon"],
  "数字": ["stats"],
  "実績": ["stats"],
  "カウント": ["stats"],
  "ホバー": ["hover"],
  "マウスオーバー": ["hover"],
  "空": ["empty"],
  "0件": ["empty"],
  "エラー": ["empty"],
  "アイコン": ["icon"],
  "電球": ["icon", "lightbulb"],
  "歯車": ["icon", "gears"],
  "ロケット": ["icon", "rocket"],
  "花火": ["icon", "fireworks"],
  "キラキラ": ["icon", "sparkles"],
  "鍵": ["icon", "lock"],
  "ハート": ["icon", "heart"],
  "Wi-Fi": ["icon", "wifi"],
  "Wifi": ["icon", "wifi"],
  "電波": ["icon", "wifi"],
  "紙飛行機": ["icon", "paper", "送信"],
  "送信": ["icon", "paper"],
  "ベル": ["icon", "bell"],
  "通知": ["icon", "bell"],
  "時計": ["icon", "clock"],
  "タイプライター": ["icon", "typewriter"],

  // moods
  "高級": ["高級感"],
  "上品": ["上品", "高級感", "ミニマル"],
  "シンプル": ["ミニマル"],
  "ミニマル": ["ミニマル"],
  "可愛い": ["BtoC", "ポップ", "フレンドリー"],
  "ポップ": ["ポップ", "BtoC"],
  "BtoB": ["BtoB"],
  "BtoC": ["BtoC"],
  "AI": ["AI", "テック"],
  "テック": ["テック", "AI"],
  "モダン": ["モダン", "テック"],
  "勢い": ["勢い"],
  "落ち着いた": ["ミニマル", "上品"],
  "華やか": ["ポップ", "BtoC"],
  "祝福": ["祝福", "ポップ"],
  "夜": ["夜", "ミスティック"],
  "占い": ["占い", "ミスティック", "神秘"],
  "神秘": ["神秘", "ミスティック", "占い"],
  "ミスティック": ["ミスティック", "占い"],
  "オカルト": ["占い", "ミスティック"],
  "アンティーク": ["アンティーク", "ヴィンテージ"],
  "ヴィンテージ": ["ヴィンテージ", "アンティーク"],
  "レトロ": ["レトロ"],
  "アート": ["アート", "クリエイティブ"],
  "クリエイティブ": ["クリエイティブ", "アート"],
  "ファッション": ["ファッション", "モード"],
  "モード": ["モード", "ファッション"],
  "ナイト": ["夜", "ミスティック"],
  "ハッカー": ["サイバー", "テック"],
  "サイバー": ["サイバー"],
  "プレミアム": ["プレミアム", "高級感"],
  "信頼": ["信頼感", "BtoB"],

  // technique words
  "光る": ["glow", "shimmer", "ネオン"],
  "発光": ["glow", "ネオン"],
  "ネオン": ["ネオン", "glow"],
  "シマー": ["シマー", "shimmer"],
  "立体": ["3D", "extrude"],
  "3D": ["3D"],
  "影": ["shadow"],
  "シャドウ": ["shadow"],
  "アウトライン": ["outline", "stroke"],
  "ストローク": ["stroke", "outline"],
  "波打": ["wave"],
  "揺れ": ["wave", "swing"],
  "回転": ["spin", "rotate"],
  "回る": ["spin"],
  "スクロール": ["scroll"],
  "ふわっと": ["fade", "fade-up"],
  "フェード": ["fade"],
  "現れる": ["fade", "reveal"],
  "リップル": ["ripple"],
  "波紋": ["ripple"],
  "脈動": ["pulse", "heartbeat"],
  "鼓動": ["heartbeat"],
  "拡大": ["zoom", "scale"],
  "ズーム": ["zoom"],
  "浮く": ["float"],
  "浮遊": ["float"],
  "傾き": ["tilt"],
  "ティルト": ["tilt"],
  "グリッチ": ["glitch"],
  "ロングシャドウ": ["long-shadow"],
  "縁取り": ["outline"],
  "霧": ["mist", "fade"],
  "星": ["star", "sparkle"],
  "月": ["moon"],
  "水晶": ["crystal", "ball"],

  // tech tags
  "Tailwind": ["tailwind"],
  "tailwind": ["tailwind"],
  "React": ["react"],
  "react": ["react"],
  "CSS": ["css"],
  "Framer": ["framer"],
  "Motion": ["framer"],

  // colors (so user can say e.g. "紫の光るボタン")
  "紫": ["violet"],
  "青": ["blue"],
  "ローズ": ["rose"],
  "赤": ["rose"],
  "ピンク": ["rose"],
  "アンバー": ["amber"],
  "オレンジ": ["amber"],
  "黄色": ["amber"],
  "緑": ["emerald"],
  "エメラルド": ["emerald"],

  // size / speed (variant hints)
  "大きい": ["lg"],
  "大": ["lg"],
  "小さい": ["md"],
  "小": ["md"],
  "ゆっくり": ["slow"],
  "遅い": ["slow"],
  "ふつう": ["normal"],
  "速い": ["fast"],
  "高速": ["fast", "vfast"],
};

/* -----------------------------------------------------------
   2. Color / variant detection from query
----------------------------------------------------------- */
const COLOR_HINTS: Record<string, string> = {
  紫: "violet",
  バイオレット: "violet",
  violet: "violet",
  青: "blue",
  ブルー: "blue",
  blue: "blue",
  ローズ: "rose",
  赤: "rose",
  ピンク: "rose",
  rose: "rose",
  アンバー: "amber",
  オレンジ: "amber",
  黄: "amber",
  amber: "amber",
  緑: "emerald",
  エメラルド: "emerald",
  green: "emerald",
};

/* -----------------------------------------------------------
   3. Tokenizer with bigram fallback
----------------------------------------------------------- */
export function tokenize(raw: string): { tokens: string[]; expanded: string[] } {
  const q = raw
    .toLowerCase()
    .replace(/[、。！？!?,.;:]/g, " ")
    .trim();
  const tokens = new Set<string>();
  const expanded = new Set<string>();

  // whitespace / latin words
  for (const w of q.split(/\s+/)) {
    if (w.length > 0) tokens.add(w);
  }

  // synonyms (substring match against the original lowercased query)
  for (const [key, vals] of Object.entries(SYNONYMS)) {
    if (q.includes(key.toLowerCase())) {
      for (const v of vals) {
        tokens.add(v.toLowerCase());
        expanded.add(v);
      }
    }
  }

  // Japanese bigrams (2-char chunks where at least one char is JP)
  for (let i = 0; i < q.length - 1; i++) {
    const bg = q.slice(i, i + 2);
    if (/[぀-ヿ一-鿿]/.test(bg)) tokens.add(bg);
  }

  // Trigrams give a slight further boost on longer JP words
  for (let i = 0; i < q.length - 2; i++) {
    const tg = q.slice(i, i + 3);
    if (/[぀-ヿ一-鿿]/.test(tg)) tokens.add(tg);
  }

  return { tokens: Array.from(tokens), expanded: Array.from(expanded) };
}

export function detectColor(query: string): string | null {
  const q = query.toLowerCase();
  for (const [k, v] of Object.entries(COLOR_HINTS)) {
    if (q.includes(k.toLowerCase())) return v;
  }
  return null;
}

/* -----------------------------------------------------------
   4. Scorer
----------------------------------------------------------- */
export type MatchResult = {
  pattern: Pattern;
  score: number;
  reasons: string[];
};

const FIELD_WEIGHTS = {
  title: 5,
  category: 4,
  mood: 4.5,
  tags: 3,
  suitableFor: 2.5,
  useCase: 2,
  effect: 1.5,
};

function fieldHit(field: string, token: string): boolean {
  const f = field.toLowerCase();
  const t = token.toLowerCase();
  return f.includes(t);
}

function scoreOne(p: Pattern, tokens: string[]): MatchResult {
  let score = 0;
  const reasonSet = new Set<string>();
  const cat = CATEGORIES.find((c) => c.slug === p.category);
  const catName = cat?.name ?? p.category;

  // dedup tokens by length-asc, longer tokens are more specific
  const uniq = Array.from(new Set(tokens)).filter((t) => t.length >= 1);

  for (const token of uniq) {
    if (token.length < 1) continue;
    // a single ASCII char is too noisy; only count if length >= 2 OR JP char
    const isJp = /[぀-ヿ一-鿿]/.test(token);
    if (!isJp && token.length < 2) continue;

    // title
    if (fieldHit(p.title, token)) {
      score += FIELD_WEIGHTS.title * (token.length >= 3 ? 1.2 : 1);
      reasonSet.add(`タイトルに「${token}」`);
    }
    // category slug or name
    if (p.category.toLowerCase() === token.toLowerCase() || fieldHit(catName, token)) {
      score += FIELD_WEIGHTS.category;
      reasonSet.add(`カテゴリ「${catName}」`);
    }
    // mood
    for (const m of p.mood) {
      if (fieldHit(m, token)) {
        score += FIELD_WEIGHTS.mood;
        reasonSet.add(`雰囲気「${m}」`);
        break;
      }
    }
    // tags
    for (const tg of p.tags) {
      if (fieldHit(tg, token)) {
        score += FIELD_WEIGHTS.tags;
        reasonSet.add(`技術「${tg}」`);
        break;
      }
    }
    // suitableFor
    for (const s of p.suitableFor) {
      if (fieldHit(s, token)) {
        score += FIELD_WEIGHTS.suitableFor;
        reasonSet.add(`想定: ${s}`);
        break;
      }
    }
    // useCase
    if (fieldHit(p.useCase, token)) {
      score += FIELD_WEIGHTS.useCase;
      reasonSet.add(`用途文に「${token}」`);
    }
    // effect
    if (fieldHit(p.effect, token)) {
      score += FIELD_WEIGHTS.effect;
    }
  }

  return { pattern: p, score, reasons: Array.from(reasonSet).slice(0, 4) };
}

/* -----------------------------------------------------------
   5. Variant preference
   If the user mentioned a color (e.g. "青"), promote variants of the same
   archetype that use that color over other colors.
----------------------------------------------------------- */
function colorOfPattern(p: Pattern): string | null {
  // ld-{archId}-{color}-{size}-{speed}  or  ex-{archId}-{color}
  if (p.id.startsWith("ld-")) {
    const parts = p.id.split("-");
    return parts[parts.length - 3] ?? null;
  }
  if (p.id.startsWith("ex-")) {
    const lastDash = p.id.lastIndexOf("-");
    return p.id.slice(lastDash + 1);
  }
  return null;
}

/* -----------------------------------------------------------
   6. Public search entry
----------------------------------------------------------- */
export type SearchOpts = { limit?: number; archetypeBoost?: boolean };

export function search(query: string, opts: SearchOpts = {}): MatchResult[] {
  const limit = opts.limit ?? 8;
  const { tokens, expanded } = tokenize(query);
  const preferredColor = detectColor(query);

  if (tokens.length === 0) return [];

  let scored: MatchResult[] = ALL_PATTERNS.map((p) => scoreOne(p, tokens)).filter(
    (r) => r.score > 0
  );

  // Color preference boost
  if (preferredColor) {
    scored = scored.map((r) => {
      const c = colorOfPattern(r.pattern);
      if (c === preferredColor) {
        return { ...r, score: r.score * 1.4, reasons: [`色「${preferredColor}」`, ...r.reasons] };
      }
      // gently penalize other colors of the same archetype if a color was specified
      return { ...r, score: c && c !== preferredColor ? r.score * 0.8 : r.score };
    });
  }

  // Sort by score desc
  scored.sort((a, b) => b.score - a.score);

  // De-duplicate "same archetype" clusters: keep top of each archetype until limit
  if (opts.archetypeBoost !== false) {
    const seenArch = new Map<string, number>();
    const filtered: MatchResult[] = [];
    for (const r of scored) {
      const arch = archetypeKey(r.pattern.id);
      const c = seenArch.get(arch) ?? 0;
      if (c >= 1) continue; // only top variant per archetype in the headline list
      seenArch.set(arch, c + 1);
      filtered.push(r);
      if (filtered.length >= limit) break;
    }
    return filtered;
  }

  return scored.slice(0, limit);
}

function archetypeKey(id: string): string {
  if (id.startsWith("ld-")) {
    const parts = id.split("-");
    return parts.slice(0, parts.length - 3).join("-");
  }
  if (id.startsWith("ex-")) {
    const lastDash = id.lastIndexOf("-");
    return id.slice(0, lastDash);
  }
  return id;
}

/* -----------------------------------------------------------
   7. Quick example prompts surfaced in the UI
----------------------------------------------------------- */
export const EXAMPLE_PROMPTS: string[] = [
  "BtoB向けの高級感ある光るCTAボタン",
  "占いサイトのカード",
  "AI生成中の演出",
  "BtoBサービスの導入実績の数字を大きく",
  "FAQ アコーディオン 上品",
  "ホバーで矢印が伸びるリンク",
  "夜空のような神秘的な背景",
  "雑誌風の編集タイポグラフィ",
  "送信中の紙飛行機アニメ",
  "緑の進捗バー 速い",
  "ふわっと現れるセクション",
  "見出しに使う 1文字ずつ波打つ",
];
