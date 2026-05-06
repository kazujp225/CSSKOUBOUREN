import type { ExtraArchetype, ExtraVariant, ResolvedColor } from "./types";
import { COLORS, COLOR_META } from "./types";

const cv = () =>
  COLORS.map((c) => ({
    key: c,
    label: COLOR_META[c].jp,
    color: { ...COLOR_META[c], key: c },
  }));

type CV = { key: string; label: string; color: ResolvedColor } & ExtraVariant;

/* ============================================================
   CTA 系
   ============================================================ */

const ctaGlow: ExtraArchetype<CV> = {
  id: "cta-glow",
  baseTitle: "光るCTA（カラー違い）",
  category: "cta",
  baseMood: ["高級感", "BtoB"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "FVや料金ページの主CTA。色をブランドに合わせて選択。",
  effect: "周辺グローと内側ハイライトで視線を集める。",
  suitableFor: ["BtoB SaaS", "ハイエンドコーポレート"],
  badUsage: "1ページに複数置くと視線が散る。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="glow-cta" href="#">無料で相談する</a>`,
    css: `.glow-cta { position:relative; display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:9999px; color:#fff; font-weight:600; background:${color.hex}; box-shadow: 0 8px 30px ${color.hex}55, inset 0 1px 0 rgba(255,255,255,.25); transition: transform .2s ease, box-shadow .3s ease; }
.glow-cta::after { content:""; position:absolute; inset:-2px; border-radius:inherit; background:${color.hex}; filter: blur(18px); opacity:.55; z-index:-1; transition: opacity .3s ease; }
.glow-cta:hover { transform: translateY(-1px); }
.glow-cta:hover::after { opacity:.9; }`,
    tailwind: `<a href="#"
  className="relative inline-flex items-center gap-2 rounded-full bg-${color.tw}-500 px-7 py-3.5 font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5
             before:absolute before:inset-[-2px] before:-z-10 before:rounded-full before:bg-${color.tw}-500 before:opacity-60 before:blur-xl hover:before:opacity-90"
>無料で相談する</a>`,
    react: `export function GlowCTA({ children = "無料で相談する" }) {
  return (
    <a href="#"
      className="relative inline-flex items-center gap-2 rounded-full bg-${color.tw}-500 px-7 py-3.5 font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5
                 before:absolute before:inset-[-2px] before:-z-10 before:rounded-full before:bg-${color.tw}-500 before:opacity-60 before:blur-xl hover:before:opacity-90">
      {children}
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `主CTAを${color.jp}（${color.tw}-500）の単色グローボタンに変更してください。pill形状、外側に同色のぼかしグロー、ホバーで-1px translateY と外側ぼかしの不透明度up。Tailwindで実装してください。`,
};

const ctaGradient: ExtraArchetype<CV> = {
  id: "cta-gradient",
  baseTitle: "グラデーションCTA",
  category: "cta",
  baseMood: ["モダン", "高級感"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "AI/SaaS/モダンコーポレートの主CTA。色幅で深みを持たせたい時。",
  effect: "色のフェードで奥行きが出る。単色より高級に見せやすい。",
  suitableFor: ["AI/SaaS LP", "ハイエンドサービス"],
  badUsage: "色幅を取りすぎると安っぽい。同系色の135度グラデが無難。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="grad-cta" href="#">いますぐ始める</a>`,
    css: `.grad-cta { display:inline-flex; padding:14px 28px; border-radius:9999px; color:#fff; font-weight:600; background: linear-gradient(135deg, ${color.hex}, #5b8cff); box-shadow: 0 12px 30px -10px rgba(0,0,0,.35); }`,
    tailwind: `<a href="#" className="inline-flex rounded-full bg-gradient-to-br from-${color.tw}-500 to-blue-500 px-7 py-3.5 font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5">いますぐ始める</a>`,
    react: `export function GradientCTA() {
  return (
    <a href="#" className="inline-flex rounded-full bg-gradient-to-br from-${color.tw}-500 to-blue-500 px-7 py-3.5 font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5">
      いますぐ始める
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `主CTAを ${color.jp}→青の135度グラデーション（${color.tw}-500 → blue-500）の pill ボタンに変更してください。Tailwindで bg-gradient-to-br と shadow を組み合わせ、ホバーで-1px translateY を加えてください。`,
};

const ctaOutline: ExtraArchetype<CV> = {
  id: "cta-outline",
  baseTitle: "アウトラインCTA",
  category: "cta",
  baseMood: ["ミニマル", "BtoB"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "FVの二次CTA、サブの『資料請求』、既に主CTAがある画面。",
  effect: "面積を取らず、主CTAより一段下の選択肢として並列に置ける。",
  suitableFor: ["BtoBコーポレート", "SaaSの料金ページ", "落ち着いた業種"],
  badUsage: "白背景でアウトラインが薄すぎると見落とされる。border幅は1.5px以上。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="outline-cta" href="#">資料をダウンロード</a>`,
    css: `.outline-cta { display:inline-flex; padding:12px 26px; border-radius:9999px; color:${color.hex}; font-weight:600; border: 1.5px solid ${color.hex}; background: transparent; transition: background .2s ease, color .2s ease; }
.outline-cta:hover { background:${color.hex}; color:#fff; }`,
    tailwind: `<a href="#"
  className="inline-flex rounded-full border-[1.5px] border-${color.tw}-500 px-6 py-3 font-semibold text-${color.tw}-600 transition hover:bg-${color.tw}-500 hover:text-white">
  資料をダウンロード
</a>`,
    react: `export function OutlineCTA() {
  return (
    <a href="#" className="inline-flex rounded-full border-[1.5px] border-${color.tw}-500 px-6 py-3 font-semibold text-${color.tw}-600 transition hover:bg-${color.tw}-500 hover:text-white">
      資料をダウンロード
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `二次CTA を、${color.jp}の border 1.5px / pill / 文字色 ${color.tw}-600 / ホバー時に塗り＋白文字に反転、というアウトラインボタンに置き換えてください。Tailwindで実装してください。`,
};

const ctaShimmer: ExtraArchetype<CV> = {
  id: "cta-shimmer",
  baseTitle: "シマーCTA",
  category: "cta",
  baseMood: ["高級感", "テック"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "セールやキャンペーンの『今すぐ申し込む』など、注目させたい主CTA。",
  effect: "ボタン上を光が斜めに流れる演出。動きがあるだけで一段視線が止まる。",
  suitableFor: ["セールLP", "期間限定キャンペーン", "プレミアムプラン"],
  badUsage: "汎用CTAで使うと品が落ちる。ここぞというボタンに限定する。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="shim-cta" href="#"><span>今すぐ始める</span></a>`,
    css: `.shim-cta { position:relative; display:inline-flex; padding:14px 28px; border-radius:9999px; color:#fff; font-weight:600; background:${color.hex}; overflow:hidden; }
.shim-cta::before { content:""; position:absolute; inset:0; background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%); transform: translateX(-100%); animation: shimSlide 2.4s ease-in-out infinite; }
@keyframes shimSlide { to { transform: translateX(100%); } }`,
    tailwind: `<a href="#" className="relative inline-flex overflow-hidden rounded-full bg-${color.tw}-500 px-7 py-3.5 font-semibold text-white">
  <span className="relative z-10">今すぐ始める</span>
  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,.45)_50%,transparent_70%)]" style={{ animation:"shimSlide 2.4s ease-in-out infinite" }} />
</a>`,
    react: `export function ShimmerCTA() {
  return (
    <a href="#" className="relative inline-flex overflow-hidden rounded-full bg-${color.tw}-500 px-7 py-3.5 font-semibold text-white">
      <span className="relative z-10">今すぐ始める</span>
      <span className="absolute inset-0 -translate-x-full" style={{ background:"linear-gradient(120deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%)", animation:"shimSlide 2.4s ease-in-out infinite" }} />
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.jp}の主CTAボタンに、白い光が左→右に斜めに流れるシマー演出を追加してください。背景色は ${color.tw}-500、120度の linear-gradient を translateX(-100%)→translateX(100%) で2.4秒周期で動かしてください。`,
};

const ctaArrow: ExtraArchetype<CV> = {
  id: "cta-arrow-shift",
  baseTitle: "矢印スライドCTA",
  category: "cta",
  baseMood: ["BtoB", "上品"],
  baseTags: ["Tailwind", "CSS"],
  difficulty: "easy",
  useCase: "サービス紹介セクションの『詳しく見る』。",
  effect: "ホバーで矢印が右にズレる、控えめだが効きやすいマイクロインタラクション。",
  suitableFor: ["BtoBコーポレート", "ブログ記事", "ポートフォリオ"],
  badUsage: "FV主CTAには弱い。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="arrow-cta" href="#">詳しく見る <span>→</span></a>`,
    css: `.arrow-cta { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:9999px; background:${color.hex}; color:#fff; font-weight:600; }
.arrow-cta span { transition: transform .25s ease; }
.arrow-cta:hover span { transform: translateX(4px); }`,
    tailwind: `<a href="#"
  className="group inline-flex items-center gap-2 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">
  詳しく見る <span className="transition-transform group-hover:translate-x-1">→</span>
</a>`,
    react: `export function ArrowShiftCTA() {
  return (
    <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">
      詳しく見る <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `『詳しく見る』ボタンを ${color.jp}（${color.tw}-500）の pill にし、文字後の矢印『→』がホバーで4px右にスライドするインタラクションを付けてください。Tailwind の group / group-hover で実装。`,
};

const cta3d: ExtraArchetype<CV> = {
  id: "cta-3d",
  baseTitle: "3Dプッシュ CTA",
  category: "cta",
  baseMood: ["ポップ", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "BtoC・教育・キッズ向けサービスの『申し込む』。",
  effect: "下に影があり、押した瞬間沈むように見える。物理的な気持ちよさを返す。",
  suitableFor: ["BtoC LP", "教育/コーチング", "スマホ向けアプリ訴求"],
  badUsage: "BtoBや高級プロダクトでは軽すぎる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<button class="cta-3d">いますぐ始める</button>`,
    css: `.cta-3d { display:inline-flex; padding:14px 28px; border-radius:14px; background:${color.hex}; color:#fff; font-weight:700; box-shadow: 0 5px 0 0 rgba(0,0,0,.3); transition: transform .12s ease, box-shadow .12s ease; }
.cta-3d:active { transform: translateY(4px); box-shadow: 0 1px 0 0 rgba(0,0,0,.3); }`,
    tailwind: `<button className="rounded-2xl bg-${color.tw}-500 px-7 py-3.5 font-bold text-white shadow-[0_5px_0_0_rgba(0,0,0,.25)] transition active:translate-y-1 active:shadow-[0_1px_0_0_rgba(0,0,0,.25)]">いますぐ始める</button>`,
    react: `export function PushCTA() {
  return (
    <button className="rounded-2xl bg-${color.tw}-500 px-7 py-3.5 font-bold text-white shadow-[0_5px_0_0_rgba(0,0,0,.25)] transition active:translate-y-1 active:shadow-[0_1px_0_0_rgba(0,0,0,.25)]">
      いますぐ始める
    </button>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.jp}の3Dプッシュボタンを実装してください。${color.tw}-500、角丸2xl、5px の下方向シャドウ、active:translate-y-1 + シャドウ縮小で押し込み感を出します。`,
};

/* ============================================================
   カード系
   ============================================================ */

const cardGlass: ExtraArchetype<CV> = {
  id: "card-glass",
  baseTitle: "ガラスカード",
  category: "card",
  baseMood: ["高級感", "テック"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "プラン比較・機能紹介・ダッシュボード風の上に置くカード。",
  effect: "半透明＋ぼかし＋細い枠で奥行きを作る。色の主張を控えつつ印象を残せる。",
  suitableFor: ["SaaS", "AI/ML"],
  badUsage: "白背景の上では映えない。背景にグラデかパターンが必要。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="glass">
  <h3>Realtime</h3>
  <p>常に同期されます。</p>
</div>`,
    css: `.glass { padding:24px; border-radius:18px; border:1px solid ${color.hex}33; background: linear-gradient(180deg, ${color.hex}11, ${color.hex}05); backdrop-filter: blur(10px); box-shadow: 0 30px 60px -30px rgba(0,0,0,.4); }`,
    tailwind: `<div className="rounded-2xl border p-6 backdrop-blur-md shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)]"
  style={{ borderColor:"${color.hex}33", background:"linear-gradient(180deg, ${color.hex}11, ${color.hex}05)" }}>
  <h3 className="font-semibold text-zinc-900">Realtime</h3>
  <p className="mt-1 text-zinc-600">常に同期されます。</p>
</div>`,
    react: `export function GlassCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border p-6 backdrop-blur-md shadow-[0_30px_60px_-30px_rgba(0,0,0,.4)]"
      style={{ borderColor:"${color.hex}33", background:"linear-gradient(180deg, ${color.hex}11, ${color.hex}05)" }}>
      <h3 className="font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-zinc-600">{body}</p>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.jp}（${color.hex}）の薄い半透明グラデを敷き、border は ${color.hex}33、backdrop-blur を入れて『ガラスカード』を実装してください。下方向に強めのドロップシャドウ。`,
};

const cardLift: ExtraArchetype<CV> = {
  id: "card-lift",
  baseTitle: "ホバーリフトカード",
  category: "card",
  baseMood: ["上品", "BtoB"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "記事一覧・サービスメニュー・実績一覧。",
  effect: "ホバーで -2px 浮き、影が伸びて触れる感を返す。クリック率が地味に上がる。",
  suitableFor: ["コーポレート", "メディア", "ポートフォリオ"],
  badUsage: "リストが密だと一斉に動いて視線が落ち着かない。間隔を広めに。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="lift-card" href="#">
  <h3>カードタイトル</h3>
  <p>説明文が入ります。</p>
</a>`,
    css: `.lift-card { display:block; padding:24px; border-radius:16px; border:1px solid #e7e7eb; background:#fff; box-shadow: 0 1px 2px rgba(0,0,0,.04); transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
.lift-card:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -18px ${color.hex}55; border-color:${color.hex}66; }
.lift-card h3 { font-weight:600; color:#0a0a0a; }
.lift-card p { color:#52525b; margin-top:6px; }`,
    tailwind: `<a href="#"
  className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-${color.tw}-300 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,.18)]">
  <h3 className="font-semibold text-zinc-900">カードタイトル</h3>
  <p className="mt-1.5 text-zinc-500">説明文が入ります。</p>
</a>`,
    react: `export function LiftCard({ title, body }: { title: string; body: string }) {
  return (
    <a href="#" className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-${color.tw}-300 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,.18)]">
      <h3 className="font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1.5 text-zinc-500">{body}</p>
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `カード一覧のアイテムを、ホバーで-2px浮き、ボーダーが ${color.tw}-300 に染まり、下方向に大きめの影が伸びる『リフトカード』に変更してください。Tailwindで実装。`,
};

const cardBorderGlow: ExtraArchetype<CV> = {
  id: "card-border-glow",
  baseTitle: "ボーダーグローカード",
  category: "card",
  baseMood: ["テック", "AI"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "AI/開発者向けプロダクトの機能紹介、特徴3点、導入事例。",
  effect: "ホバー時に外周のグラデーション枠が光る。テック感を出せる。",
  suitableFor: ["AI/SaaS LP", "ガジェット系"],
  badUsage: "落ち着いた業種で多用するとうるさい。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="border-glow"><div class="inner">…</div></div>`,
    css: `.border-glow { position:relative; padding:1px; border-radius:18px; background: linear-gradient(135deg, ${color.hex}, transparent 60%); }
.border-glow .inner { padding:24px; border-radius:17px; background:#fff; }
.border-glow:hover { background: linear-gradient(135deg, ${color.hex}, ${color.hex}66); }`,
    tailwind: `<div className="rounded-2xl p-px" style={{ background:"linear-gradient(135deg, ${color.hex}, transparent 60%)" }}>
  <div className="rounded-[1.05rem] bg-white p-6">
    <h3 className="font-semibold text-zinc-900">機能名</h3>
    <p className="mt-1 text-zinc-500">説明文が入ります。</p>
  </div>
</div>`,
    react: `export function GlowBorderCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl p-px transition hover:opacity-90" style={{ background:"linear-gradient(135deg, ${color.hex}, transparent 60%)" }}>
      <div className="rounded-[1.05rem] bg-white p-6">
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        <p className="mt-1 text-zinc-500">{body}</p>
      </div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `機能紹介カードを、外周1pxのグラデーションボーダー（135度、${color.hex}→transparent）で囲んでください。内側は白いカード。p-px で薄い外枠を作り、内側は rounded-[1.05rem]。`,
};

const cardTilt: ExtraArchetype<CV> = {
  id: "card-tilt",
  baseTitle: "ホバーティルトカード",
  category: "card",
  baseMood: ["BtoC", "ポップ"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "プロダクト紹介、新作告知、コレクションカード。",
  effect: "ホバーで少し3D傾く。立体的な気持ちよさで止まる時間が増える。",
  suitableFor: ["BtoC", "アパレル", "プロダクト紹介"],
  badUsage: "情報量の多いカードでやると読みづらい。装飾性が強い。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="tilt">…</div>`,
    css: `.tilt { padding:24px; border-radius:18px; background: linear-gradient(135deg, ${color.hex}, ${color.hex}99); color:#fff; transition: transform .35s ease; transform-style: preserve-3d; }
.tilt:hover { transform: perspective(800px) rotateX(6deg) rotateY(-6deg); }`,
    tailwind: `<div className="rounded-2xl p-6 text-white transition duration-300 hover:[transform:perspective(800px)_rotateX(6deg)_rotateY(-6deg)]"
  style={{ background:"linear-gradient(135deg, ${color.hex}, ${color.hex}99)" }}>
  <h3 className="font-semibold">機能名</h3>
  <p className="mt-1 text-white/80">説明文。</p>
</div>`,
    react: `export function TiltCard() {
  return (
    <div className="rounded-2xl p-6 text-white transition duration-300 hover:[transform:perspective(800px)_rotateX(6deg)_rotateY(-6deg)]"
      style={{ background:"linear-gradient(135deg, ${color.hex}, ${color.hex}99)" }}>
      <h3 className="font-semibold">機能名</h3>
      <p className="mt-1 text-white/80">説明文。</p>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `プロダクト紹介カードを、ホバー時に perspective 800px / rotateX 6deg / rotateY -6deg の3D傾きが入るように変更してください。背景は ${color.jp}（${color.hex}）の135度グラデ。`,
};

const cardNumbered: ExtraArchetype<CV> = {
  id: "card-numbered",
  baseTitle: "番号付きカード",
  category: "card",
  baseMood: ["BtoB", "整理"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "サービスの流れ・ステップカード。",
  effect: "大きな番号で順序を明示。ステップ数が一目で伝わる。",
  suitableFor: ["BtoBサービス紹介", "オンボーディング"],
  badUsage: "ステップ数が7+で並べると圧縮されて読まれない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="num-card"><span class="n">01</span><h3>ヒアリング</h3><p>現状を伺います。</p></div>`,
    css: `.num-card { padding:22px; border-radius:16px; border:1px solid #e7e7eb; background:#fff; }
.num-card .n { font-family: ui-monospace, monospace; color:${color.hex}; font-weight:700; letter-spacing:.04em; }
.num-card h3 { color:#0a0a0a; margin-top:8px; font-weight:600; }
.num-card p { color:#52525b; margin-top:4px; }`,
    tailwind: `<div className="rounded-2xl border border-zinc-200 bg-white p-5">
  <span className="font-mono font-bold tracking-wide text-${color.tw}-500">01</span>
  <h3 className="mt-1.5 font-semibold text-zinc-900">ヒアリング</h3>
  <p className="mt-1 text-zinc-500">現状を伺います。</p>
</div>`,
    react: `export function NumberedCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <span className="font-mono font-bold tracking-wide text-${color.tw}-500">{String(n).padStart(2, "0")}</span>
      <h3 className="mt-1.5 font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-zinc-500">{body}</p>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `『導入の流れ』のステップカードを、上部に ${color.jp}（${color.tw}-500）のモノスペース番号、白背景・角丸2xl・border zinc-200 の構成にしてください。`,
};

/* ============================================================
   カード（ミスティック / 占い系）
   ============================================================ */

const cardMystical: ExtraArchetype<CV> = {
  id: "card-mystical",
  baseTitle: "ミスティックカード（画像＋READ MORE）",
  category: "card",
  baseMood: ["占い", "ミスティック", "神秘"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占いサイト・スピリチュアル系メディアの記事カード、メニューカード。",
  effect: "深い紫＋金色アクセントの上品なカード。画像→セリフ見出し→説明→『READ MORE →』。",
  suitableFor: ["占いサイト", "スピリチュアル系メディア", "ミステリー小説"],
  badUsage: "白基調のサイトの中で1枚だけ使うと浮く。コンテキストごと暗くする。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="myst-card">…</article>`,
    css: `.myst-card { position:relative; overflow:hidden; border-radius:14px; background:#1a1030; border:1px solid rgba(212,175,55,.25); box-shadow: 0 18px 40px -20px rgba(212,175,55,.35); transition: transform .35s ease, box-shadow .35s ease; }
.myst-card:hover { transform: translateY(-3px); box-shadow: 0 24px 50px -16px rgba(212,175,55,.55); }
.myst-card .img { aspect-ratio: 4 / 3; background: radial-gradient(at 30% 30%, ${color.hex}aa, transparent 60%), radial-gradient(at 70% 70%, #d4af37aa, transparent 60%), linear-gradient(135deg, #1a1030, #0c0820); position:relative; }
.myst-card .img::after { content:""; position:absolute; inset:0; box-shadow: inset 0 -40px 60px -20px rgba(0,0,0,.6); }
.myst-card .body { padding: 22px 22px 24px; }
.myst-card h3 { font-family:'Cormorant Garamond','Noto Serif JP',serif; font-style:italic; font-weight:600; color:#e9d6a3; letter-spacing:.04em; }
.myst-card p { color:rgba(233,214,163,.7); font-size:13px; line-height:1.7; margin-top:10px; }
.myst-card .more { display:inline-flex; gap:8px; align-items:center; margin-top:18px; padding-top:14px; border-top:1px solid rgba(212,175,55,.2); color:#d4af37; font-size:11px; letter-spacing:.18em; font-weight:600; }
.myst-card .more::after { content:"→"; transition: transform .3s ease; }
.myst-card:hover .more::after { transform: translateX(4px); }`,
    tailwind: `// React版を参照`,
    react: `export function MysticalCard({ title = "手相占い", body = "あなたの手の中に刻まれた…" }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-[#1a1030] transition duration-300 hover:-translate-y-1"
      style={{ borderColor: "rgba(212,175,55,.25)", boxShadow: "0 18px 40px -20px rgba(212,175,55,.35)" }}>
      <div className="relative aspect-[4/3]"
        style={{ background: "radial-gradient(at 30% 30%, ${color.hex}aa, transparent 60%), radial-gradient(at 70% 70%, #d4af37aa, transparent 60%), linear-gradient(135deg, #1a1030, #0c0820)" }}>
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 -40px 60px -20px rgba(0,0,0,.6)" }} />
      </div>
      <div className="px-6 pb-7 pt-5">
        <h3 className="font-serif text-xl font-semibold italic tracking-wide" style={{ color: "#e9d6a3" }}>{title}</h3>
        <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "rgba(233,214,163,.7)" }}>{body}</p>
        <div className="mt-4 inline-flex items-center gap-2 border-t pt-3.5 text-[11px] font-semibold tracking-[0.18em]"
          style={{ borderColor: "rgba(212,175,55,.2)", color: "#d4af37" }}>
          READ MORE <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </article>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイト用のカードを実装してください。背景 #1a1030、border 1px rgba(212,175,55,.25)、box-shadow に金グロー。上部に aspect-4/3 の擬似画像エリア（${color.jp}/${color.hex} と金 #d4af37 の二重 radial-gradient + 暗い vignette）。下部本文は Cormorant Garamond / Noto Serif JP の italic 見出し（#e9d6a3）、説明は同色 70% opacity、最下部に薄い金の border-top と『READ MORE →』（#d4af37、letter-spacing .18em、ホバーで矢印が右に4pxスライド）。`,
};

const cardGoldFrame: ExtraArchetype<CV> = {
  id: "card-gold-frame",
  baseTitle: "金縁フレームカード",
  category: "card",
  baseMood: ["占い", "アンティーク", "高級感"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占い・ヴィンテージブランド・ジュエリーのプロダクトカード。",
  effect: "外側1pxの金グラデーションボーダー＋内側の暗い領域で、額装された絵のような威厳。",
  suitableFor: ["占いサイト", "ジュエリー", "アンティーク/ヴィンテージ"],
  badUsage: "情報量の多いリストでは過剰。プロダクト訴求向き。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="gold-frame"><div class="inner">…</div></div>`,
    css: `.gold-frame { padding: 1.5px; border-radius: 18px; background: linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%); background-size: 200% 200%; animation: goldShimmer 8s ease-in-out infinite; box-shadow: 0 22px 50px -22px rgba(212,175,55,.55); }
.gold-frame .inner { background: #14091e; border-radius: 16.5px; padding: 26px 22px; color: #e9d6a3; font-family: 'Cormorant Garamond','Noto Serif JP',serif; }`,
    tailwind: `// React版を参照`,
    react: `export function GoldFrameCard({ title = "今日の星座", body = "あなたの星のひとことをお届けします。" }) {
  return (
    <div className="rounded-2xl p-[1.5px] shadow-[0_22px_50px_-22px_rgba(212,175,55,.55)]"
      style={{ background: "linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%)", backgroundSize: "200% 200%", animation: "goldShimmer 8s ease-in-out infinite" }}>
      <div className="rounded-[15px] bg-[#14091e] px-6 py-7 font-serif" style={{ color: "#e9d6a3" }}>
        <span className="block text-center text-[10px] tracking-[.4em] opacity-70">— ✦ —</span>
        <h3 className="mt-2 text-center text-2xl font-semibold italic tracking-wide">{title}</h3>
        <p className="mt-2 text-center text-[13px] leading-relaxed" style={{ color: "rgba(233,214,163,.75)" }}>{body}</p>
        <span className="mt-3 block text-center text-[10px] tracking-[.4em] opacity-70">— ✦ —</span>
      </div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトのカードを、外側 1.5px の金グラデーション枠（135deg #d4af37 → #f5d272 → #8a6a1c → #d4af37、background-size 200%、8秒ゆっくりシマー）で囲んでください。内側は #14091e の暗紫、コンテンツは Cormorant Garamond italic、上下に『— ✦ —』の飾り罫。文字色 #e9d6a3。${color.jp}テーマでも背景の暗紫は固定。`,
};

const cardNightSky: ExtraArchetype<CV> = {
  id: "card-night-sky",
  baseTitle: "夜空カード（星散らし）",
  category: "card",
  baseMood: ["占い", "ミスティック", "夜"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占星術・ホロスコープ・夜系コンテンツのカード。",
  effect: "深い藍×紫の夜空グラデーションに小さな星が散って瞬く。星座占い系の世界観に最適。",
  suitableFor: ["占星術", "ホロスコープ", "夜系メディア"],
  badUsage: "明るい/ポップなコンテキストでは合わない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="night-card">…</div>`,
    css: `.night-card { position: relative; overflow: hidden; border-radius: 18px; padding: 36px 24px; background: radial-gradient(at 80% 20%, ${color.hex}66, transparent 50%), linear-gradient(180deg, #0e1233, #1a0e2e); color: #e9d6a3; box-shadow: inset 0 0 60px rgba(0,0,0,.6); }
.night-card::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 60% 20%, #fff, transparent), radial-gradient(2px 2px at 80% 60%, #fff, transparent), radial-gradient(1px 1px at 30% 75%, #fff, transparent), radial-gradient(1.5px 1.5px at 50% 50%, #fff, transparent); animation: starShine 3s ease-in-out infinite; opacity: .85; pointer-events: none; }`,
    tailwind: `// React版を参照`,
    react: `export function NightSkyCard({ title = "牡牛座 ♉", body = "今日のあなたへのメッセージ。" }) {
  return (
    <div className="relative overflow-hidden rounded-2xl px-6 py-9 font-serif"
      style={{
        background: "radial-gradient(at 80% 20%, ${color.hex}66, transparent 50%), linear-gradient(180deg, #0e1233, #1a0e2e)",
        boxShadow: "inset 0 0 60px rgba(0,0,0,.6)",
        color: "#e9d6a3",
      }}>
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 60% 20%, #fff, transparent), radial-gradient(2px 2px at 80% 60%, #fff, transparent), radial-gradient(1px 1px at 30% 75%, #fff, transparent), radial-gradient(1.5px 1.5px at 50% 50%, #fff, transparent)",
          animation: "starShine 3s ease-in-out infinite",
          opacity: .85,
        }}
      />
      <div className="relative">
        <span className="text-[10px] tracking-[.3em] opacity-60">TONIGHT</span>
        <h3 className="mt-2 text-2xl font-semibold italic tracking-wide">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "rgba(233,214,163,.75)" }}>{body}</p>
      </div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占星術カードを、深い藍と紫の夜空グラデ（${color.hex}66 の右上ハロー + #0e1233 → #1a0e2e の縦グラデ）+ inset 黒シャドウで作ってください。::before に小さな radial-gradient の星を5箇所散らし、starShine（opacity .25↔1）3秒ループで瞬かせます。文字は Cormorant Garamond italic、色は #e9d6a3。`,
};

const cardGlowEdge: ExtraArchetype<CV> = {
  id: "card-glow-edge",
  baseTitle: "グロウエッジカード（金縁発光）",
  category: "card",
  baseMood: ["占い", "プレミアム"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "占い結果のリザルトカード、プレミアム会員の特別表示。",
  effect: "暗い紫の上にゆっくり呼吸するように金グローが脈動。神聖なリザルト感。",
  suitableFor: ["占い結果ページ", "プレミアム特典", "限定アナウンス"],
  badUsage: "通常のカードとして使うと派手すぎる。特別な瞬間限定。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="glow-card">…</div>`,
    css: `.glow-card { position: relative; padding: 30px 26px; border-radius: 18px; background: linear-gradient(180deg, rgba(20,9,30,.95), rgba(10,5,20,.95)); color: #e9d6a3; animation: glowPulse 5s ease-in-out infinite; }
.glow-card::before { content: ""; position: absolute; top: 0; left: 50%; width: 1px; height: 28px; background: linear-gradient(to bottom, transparent, ${color.hex}); transform: translateX(-50%); }
.glow-card .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(212,175,55,.4); color: ${color.hex}; font-size: 10px; letter-spacing: .25em; }
.glow-card h3 { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-style: italic; margin-top: 12px; }`,
    tailwind: `// React版を参照`,
    react: `export function GlowEdgeCard({ title = "今日の運命", body = "光の中に答えがあります。" }) {
  return (
    <div className="relative rounded-2xl px-7 py-8 font-serif"
      style={{
        background: "linear-gradient(180deg, rgba(20,9,30,.95), rgba(10,5,20,.95))",
        color: "#e9d6a3",
        animation: "glowPulse 5s ease-in-out infinite",
      }}>
      <span aria-hidden className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2"
        style={{ background: "linear-gradient(to bottom, transparent, ${color.hex})" }} />
      <span className="inline-block rounded-full border px-2.5 py-1 text-[10px] tracking-[.25em]"
        style={{ borderColor: "rgba(212,175,55,.4)", color: "${color.hex}" }}>
        TODAY
      </span>
      <h3 className="mt-3 text-2xl font-semibold italic tracking-wide">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "rgba(233,214,163,.75)" }}>{body}</p>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いリザルト用のカードを、暗紫グラデ背景 + 金グロウが5秒で呼吸するように脈動するアニメ（box-shadow を 0 0 0 1px rgba(212,175,55,.25) 0 18px 40px と 0 0 0 1px rgba(212,175,55,.45) 0 18px 60px の間で動かす keyframe glowPulse）で実装してください。上端中央には ${color.hex} の縦の細いグラデ線、左に角丸バッジ『TODAY』。`,
};

const cardTarotFlow: ExtraArchetype<CV> = {
  id: "card-tarot-flow",
  baseTitle: "タロットカード横流れアニメ",
  category: "card",
  baseMood: ["占い", "ミスティック", "ヒーロー"],
  baseTags: ["CSS", "SVG", "React"],
  difficulty: "hard",
  useCase: "占いサイトのHero下、ブランドサイトの世界観演出、サブスク占いサービスの導線。",
  effect: "9枚のタロットカードが横にゆっくりマーキーで流れる。各カードは扇状に少し傾き、ホバーで起き上がり＋金グローが点く。",
  suitableFor: ["占いサイト", "スピリチュアル/ヨガ", "ブランドサイト"],
  badUsage: "BtoB業務系には合わない。リッチすぎるので1ページ1箇所まで。",
  similar: ["card-mystical", "card-gold-frame", "card-night-sky"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="tarot-flow">
  <div class="track">
    <!-- 9枚のカードを2セット並べてシームレスループ -->
    <div class="card t-sun">
      <svg viewBox="0 0 100 140">…太陽SVG…</svg>
    </div>
    <div class="card t-moon">…</div>
    <div class="card t-star">…</div>
    <!-- ...残りのカード... -->
    <!-- 同じ9枚をもう1セット繰り返し -->
  </div>
</section>`,
    css: `.tarot-flow {
  position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.tarot-flow .track {
  display: flex; gap: 24px; width: max-content; padding: 28px 0;
  animation: tarotFlow 55s linear infinite;
  will-change: transform;
}
.tarot-flow .card {
  position: relative; width: 180px; height: 260px;
  border-radius: 14px; flex-shrink: 0;
  box-shadow: 0 18px 40px -16px ${color.hex}73, 0 6px 12px rgba(0,0,0,.4);
  transition: transform .5s ease, box-shadow .5s ease;
}
/* 扇状の傾き(-8 → -4 → 0 → 4 → 8 のパターン) */
.tarot-flow .card:nth-child(5n + 1) { transform: rotate(-8deg); }
.tarot-flow .card:nth-child(5n + 2) { transform: rotate(-4deg); }
.tarot-flow .card:nth-child(5n + 3) { transform: rotate(0deg); }
.tarot-flow .card:nth-child(5n + 4) { transform: rotate(4deg); }
.tarot-flow .card:nth-child(5n + 5) { transform: rotate(8deg); }
.tarot-flow .card:hover {
  transform: rotate(0deg) translateY(-10px) scale(1.04);
  box-shadow: 0 24px 50px -14px ${color.hex}aa, 0 6px 12px rgba(0,0,0,.4);
}
@keyframes tarotFlow {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}`,
    tailwind: `<!-- container -->
<section className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
  <div className="flex w-max items-center gap-6 py-7 will-change-transform"
    style={{ animation: "tarotFlow 55s linear infinite" }}>
    {[...CARDS, ...CARDS].map((c, i) => {
      const tilt = ((i % 5) - 2) * 4; // -8 / -4 / 0 / 4 / 8
      return (
        <div key={i}
          className="group relative h-[260px] w-[180px] shrink-0 transition-transform duration-500"
          style={{ transform: \`rotate(\${tilt}deg)\` }}>
          <div className="h-full w-full rounded-2xl shadow-[0_18px_40px_-16px_${color.hex}73] transition-all duration-500
                          group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.04)]">
            {/* 各カードの SVG（太陽/月/星/魔術師/...） */}
            <c.SVG />
          </div>
        </div>
      );
    })}
  </div>
</section>

{/* keyframe (globals.css に置く) */}
{/* @keyframes tarotFlow { from { transform: translateX(0) } to { transform: translateX(-50%) } } */}`,
    react: `"use client";
// 完全動作するタロット流れコンポーネント（9枚のタロットSVG付き）。
// 詳細は src/components/TarotCards.tsx を参照してください。
import { TarotFlow } from "@/components/TarotCards";

export function TarotShowcase() {
  return (
    <section className="bg-[#0a0518] p-12">
      <TarotFlow speed={55} size={180} />
    </section>
  );
}

// もっと自前で組みたい場合:
const CARDS = [
  { numeral: "XIX", title: "THE SUN", Illustration: SunIllustration },
  { numeral: "XVIII", title: "THE MOON", Illustration: MoonIllustration },
  { numeral: "XVII", title: "THE STAR", Illustration: StarIllustration },
  { numeral: "I", title: "THE MAGICIAN", Illustration: MagicianIllustration },
  { numeral: "VI", title: "THE LOVERS", Illustration: LoversIllustration },
  { numeral: "X", title: "WHEEL OF FORTUNE", Illustration: WheelIllustration },
  // ...
];

export function CustomTarotFlow() {
  const list = [...CARDS, ...CARDS]; // 2セットでシームレスループ
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max items-center gap-6 py-7 will-change-transform"
           style={{ animation: "tarotFlow 55s linear infinite" }}>
        {list.map((c, i) => {
          const tilt = ((i % 5) - 2) * 4;
          return (
            <div key={i} className="group relative h-[260px] w-[180px] shrink-0 transition-transform duration-500"
                 style={{ transform: \`rotate(\${tilt}deg)\` }}>
              <div className="h-full w-full rounded-2xl shadow-[0_18px_40px_-16px_${color.hex}73]
                              transition-all duration-500
                              group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.04)]">
                <TarotCardFrame numeral={c.numeral} title={c.title}>
                  <c.Illustration />
                </TarotCardFrame>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトのHero下に、9枚のタロットカードが横にゆっくり流れる演出を実装してください。
要件:
- カードは 180×260px、角丸14px、暗紫背景に金縁2重 + 中央のSVGイラスト + 上下にローマ数字と英タイトル
- カードを 9枚 × 2セット（計18枚）並べ、container を translateX(0) → translateX(-50%) で 55秒 linear 無限ループ（シームレス）
- 各カードは扇状に -8 / -4 / 0 / 4 / 8 度の順に交互に傾ける
- 両端は mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent) で自然にフェード
- ホバーした1枚だけ rotate(0) translateY(-10px) scale(1.04) で起き上がり、box-shadow を ${color.hex}aa の金グローで強める（0.5秒 ease）
- カラーアクセントは ${color.tw}-500（${color.hex}）。タロットの種類は太陽/月/星/魔術師/恋人/運命の輪/女帝/塔/フードの占い師（9種）
- keyframe @keyframes tarotFlow { from { transform: translateX(0) } to { transform: translateX(-50%) } } を globals.css に置く

Tailwind と React で実装してください。SVGイラストは簡略化したインラインで構わない（path で円・線・記号で表現）。`,
};

const cardTarotPhoto: ExtraArchetype<CV> = {
  id: "card-tarot-photo",
  baseTitle: "タロットカード（写真埋め込み）",
  category: "card",
  baseMood: ["占い", "ミスティック", "プレミアム"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占いサイトの記事サムネイル、メニューカード、商品ページ。写真の上にタロットの装飾フレームを乗せる。",
  effect: "金縁2重 + 上部ローマ数字 + 中央写真（暖色duotone+vignette）+ 下部セリフ italic タイトル。本物のタロットカード感。",
  suitableFor: ["占いサイト", "ヨガ/瞑想", "ハーブ/アロマ"],
  badUsage: "写真が明るすぎると金縁の重厚感が消える。暗めの写真または暗いduotoneを必ずかける。",
  similar: ["card-tarot-photo-flow", "card-mystical"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="tarot-photo">
  <div class="numeral">XVIII</div>
  <hr class="rule"/>
  <div class="photo">
    <img src="/your-image.jpg" alt="Moon" loading="lazy"/>
    <span class="star">✦</span>
  </div>
  <hr class="rule"/>
  <div class="title">THE MOON</div>
</article>`,
    css: `.tarot-photo {
  position: relative;
  width: 220px; height: 318px;
  border-radius: 14px;
  background: linear-gradient(180deg, #1a0e2e, #07031a);
  border: 1px solid ${color.hex};
  box-shadow:
    inset 0 0 0 3px #1a0e2e,
    inset 0 0 0 4px ${color.hex}80,
    0 18px 40px -16px ${color.hex}73,
    0 6px 12px rgba(0,0,0,.5);
  overflow: hidden;
  font-family: 'Cormorant Garamond','Noto Serif JP',serif;
}
.tarot-photo .numeral {
  text-align: center; padding-top: 8px;
  color: ${color.hex}; letter-spacing: .18em; font-size: 11px;
}
.tarot-photo .rule { margin: 4px 20px; height: 1px; border: 0; background: ${color.hex}66; }
.tarot-photo .photo {
  position: relative; margin: 0 12px;
  height: calc(100% - 80px);
  border-radius: 6px; overflow: hidden;
}
.tarot-photo .photo img {
  width: 100%; height: 100%; object-fit: cover;
  filter: saturate(.85) contrast(1.05) brightness(.9);
  transition: transform .7s ease;
}
.tarot-photo:hover .photo img { transform: scale(1.05); }
.tarot-photo .photo::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, ${color.hex}33, transparent 60%, ${color.hex}22);
  mix-blend-mode: color;
}
.tarot-photo .photo::after {
  content: ""; position: absolute; inset: 0;
  box-shadow: inset 0 -30px 50px -10px rgba(0,0,0,.7), inset 0 14px 30px -10px rgba(0,0,0,.45);
}
.tarot-photo .star {
  position: absolute; top: 6px; right: 6px;
  color: ${color.hex}; font-size: 10px; opacity: .85;
}
.tarot-photo .title {
  text-align: center; padding: 0 8px 8px;
  color: #e9d6a3; font-style: italic; letter-spacing: .12em; font-size: 11px;
}`,
    tailwind: `<article className="group relative h-[318px] w-[220px] overflow-hidden rounded-[14px] font-serif"
  style={{
    background: "linear-gradient(180deg, #1a0e2e, #07031a)",
    border: "1px solid ${color.hex}",
    boxShadow: "inset 0 0 0 3px #1a0e2e, inset 0 0 0 4px ${color.hex}80, 0 18px 40px -16px ${color.hex}73, 0 6px 12px rgba(0,0,0,.5)",
  }}>
  <div className="pt-2 text-center text-[11px] tracking-[.18em]" style={{ color: "${color.hex}" }}>XVIII</div>
  <div className="mx-5 my-1 h-px" style={{ background: "${color.hex}66" }} />
  <div className="relative mx-3 overflow-hidden rounded-md" style={{ height: "calc(100% - 80px)" }}>
    <img src="/your-image.jpg" alt="" loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      style={{ filter: "saturate(.85) contrast(1.05) brightness(.9)" }} />
    <div aria-hidden className="absolute inset-0 mix-blend-color"
      style={{ background: "linear-gradient(180deg, ${color.hex}33, transparent 60%, ${color.hex}22)" }} />
    <div aria-hidden className="absolute inset-0"
      style={{ boxShadow: "inset 0 -30px 50px -10px rgba(0,0,0,.7), inset 0 14px 30px -10px rgba(0,0,0,.45)" }} />
    <span className="absolute right-1.5 top-1.5 text-[10px] opacity-85" style={{ color: "${color.hex}" }}>✦</span>
  </div>
  <div className="mx-5 my-1 h-px" style={{ background: "${color.hex}66" }} />
  <div className="px-2 pb-2 text-center text-[11px] italic tracking-[.12em]" style={{ color: "#e9d6a3" }}>
    THE MOON
  </div>
</article>`,
    react: `import { TarotPhotoCard } from "@/components/TarotCards";

export function MyTarotCard() {
  return (
    <TarotPhotoCard
      src="/your-mystical-image.jpg"
      alt="The Moon"
      numeral="XVIII"
      title="THE MOON"
      accent="${color.hex}"
      width={220}
    />
  );
}

// または自前で組む場合は Tailwind版を参考にしてください。`,
  }),
  prompt: ({ color }) =>
    `占いサイトのカードに、写真を埋め込むタロットフレームを実装してください。
要件:
- 220×318px、角丸14px、二重金縁（外側 1px ${color.hex} + inset 4px ${color.hex}80 + 内側 inset 3px #1a0e2e）
- 背景は #1a0e2e → #07031a の縦グラデ
- 上部にローマ数字（${color.hex}、letter-spacing .18em、11px）
- 中央に写真（img、object-cover）
  - 写真の上に linear-gradient(180deg, ${color.hex}33, transparent 60%, ${color.hex}22) を mix-blend-mode: color で乗せて duotone 風に
  - vignette: inset の box-shadow（下 -30px 50px、上 14px 30px）で四隅を暗く
  - filter: saturate(.85) contrast(1.05) brightness(.9)
  - hover: 1.05倍に scale (.7s ease)
- 右上に ✦ の小スター
- 下部にセリフ italic のタイトル（#e9d6a3、letter-spacing .12em）
- フォント: Cormorant Garamond / Noto Serif JP

写真URLとタイトル/数字は props 化してください。Tailwindで実装。`,
};

const cardTarotPhotoFlow: ExtraArchetype<CV> = {
  id: "card-tarot-photo-flow",
  baseTitle: "タロットカード横流れ（写真版）",
  category: "card",
  baseMood: ["占い", "ミスティック", "ヒーロー"],
  baseTags: ["CSS", "React"],
  difficulty: "hard",
  useCase: "占いサイトのHero下、写真ベースのタロットを世界観として流す装飾。",
  effect: "写真埋め込みタロットが横にゆっくり流れる。各カードは扇状に傾き、ホバーで起き上がり＋金グロー。",
  suitableFor: ["占いサイト", "スピリチュアル系メディア", "プレミアムコンテンツ"],
  badUsage: "1ページ1箇所まで。写真の解像度が低いと安っぽくなる。",
  similar: ["card-tarot-photo", "card-tarot-flow"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="tarot-photo-flow">
  <div class="track">
    <!-- N枚の <article class="tarot-photo">...写真版タロット...</article> を 2セット並べてシームレスループ -->
  </div>
</section>`,
    css: `.tarot-photo-flow {
  position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.tarot-photo-flow .track {
  display: flex; gap: 24px; width: max-content; padding: 28px 0;
  animation: tarotFlow 50s linear infinite;
  will-change: transform;
}
.tarot-photo-flow .item { flex-shrink: 0; transition: transform .5s ease; }
.tarot-photo-flow .item:nth-child(5n + 1) { transform: rotate(-8deg); }
.tarot-photo-flow .item:nth-child(5n + 2) { transform: rotate(-4deg); }
.tarot-photo-flow .item:nth-child(5n + 3) { transform: rotate(0deg); }
.tarot-photo-flow .item:nth-child(5n + 4) { transform: rotate(4deg); }
.tarot-photo-flow .item:nth-child(5n + 5) { transform: rotate(8deg); }
.tarot-photo-flow .item:hover {
  transform: rotate(0) translateY(-10px) scale(1.04);
  filter: drop-shadow(0 24px 50px ${color.hex}aa);
}
@keyframes tarotFlow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
/* 中身は card-tarot-photo を使う想定 */`,
    tailwind: `<!-- 写真リスト -->
<section className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
  <div className="flex w-max items-center gap-6 py-7 will-change-transform"
    style={{ animation: "tarotFlow 50s linear infinite" }}>
    {[...PHOTOS, ...PHOTOS].map((p, i) => {
      const tilt = ((i % 5) - 2) * 4;
      return (
        <div key={i}
          className="group shrink-0 transition-transform duration-500"
          style={{ transform: \`rotate(\${tilt}deg)\` }}>
          <div className="transition-all duration-500
                          group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.04)]
                          group-hover:drop-shadow-[0_24px_50px_${color.hex}aa]">
            <TarotPhotoCard {...p} accent="${color.hex}" width={180} />
          </div>
        </div>
      );
    })}
  </div>
</section>`,
    react: `"use client";
import { TarotPhotoFlow, SAMPLE_PHOTOS } from "@/components/TarotCards";

export function FortuneSection() {
  return (
    <section className="bg-[#0a0518] p-12">
      <TarotPhotoFlow photos={SAMPLE_PHOTOS} speed={50} size={180} accent="${color.hex}" />
    </section>
  );
}

// 自前で写真を渡す場合:
const MY_PHOTOS = [
  { src: "/photos/moon.jpg",   alt: "The Moon",      numeral: "XVIII", title: "THE MOON" },
  { src: "/photos/star.jpg",   alt: "The Star",      numeral: "XVII",  title: "THE STAR" },
  { src: "/photos/sun.jpg",    alt: "The Sun",       numeral: "XIX",   title: "THE SUN" },
  { src: "/photos/hands.jpg",  alt: "The Magician",  numeral: "I",     title: "THE MAGICIAN" },
];
// → <TarotPhotoFlow photos={MY_PHOTOS} ... />`,
  }),
  prompt: ({ color }) =>
    `占いサイトのHero下に、写真埋め込みタロットカードが横にゆっくり流れる演出を実装してください。
要件:
- 各カードは [card-tarot-photo] の写真版タロットフレーム（180×260, 金縁2重, ローマ数字+写真+タイトル）
- N枚 × 2セット並べ、translateX(0)→translateX(-50%) で 50秒 linear 無限ループ（シームレス）
- 各カードは扇状に -8/-4/0/4/8 度
- ホバー時 rotate(0) translateY(-10px) scale(1.04) で起き上がり、drop-shadow で ${color.hex}aa の金グロー
- 両端は mask-image でフェード
- アクセントカラー ${color.tw}-500（${color.hex}）

写真リストは props で受け取れるようにし、photos = [{ src, alt, numeral, title }, ...] の形式。Tailwind と React で実装。`,
};

/* ============================================================
   写真埋込カード（占い・メディア両用）— 完全コード
   ============================================================ */

const SAMPLE_IMG = "https://images.unsplash.com/photo-1532009877282-3340270e0529?w=600&auto=format&fit=crop&q=70";

const cardPhotoOverlay: ExtraArchetype<CV> = {
  id: "card-photo-overlay",
  baseTitle: "写真カード（下グラデオーバーレイ）",
  category: "card",
  baseMood: ["BtoC", "メディア", "占い"],
  baseTags: ["CSS", "Tailwind", "React"],
  difficulty: "easy",
  useCase: "メディアサイトのサムネイル、占いトピック紹介、商品ヒーロー、ブログサムネイル。",
  effect: "写真の下半分にダークグラデを乗せ、その上に白文字の見出し＋CTA。最も汎用で効く構図。",
  suitableFor: ["メディア", "占いサイト", "EC", "ブログ"],
  badUsage: "明るすぎる写真ではグラデが弱い。暗めの写真 or グラデを濃く。",
  similar: ["card-photo-vintage", "card-photo-duotone"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="photo-overlay" href="#">
  <img src="${SAMPLE_IMG}" alt="" />
  <div class="overlay">
    <span class="kicker">FORTUNE</span>
    <h3>月夜のメッセージ</h3>
    <span class="more">READ MORE →</span>
  </div>
</a>`,
    css: `.photo-overlay {
  position: relative; display: block;
  width: 320px; aspect-ratio: 4/5;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 20px 40px -16px rgba(0,0,0,.4);
  isolation: isolate;
}
.photo-overlay img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .8s ease;
}
.photo-overlay:hover img { transform: scale(1.05); }
.photo-overlay::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 35%, rgba(0,0,0,.15) 55%, rgba(0,0,0,.85) 100%);
}
.photo-overlay .overlay {
  position: relative; z-index: 1;
  margin-top: auto; padding: 22px 22px 22px;
  display: flex; flex-direction: column; gap: 6px;
  height: 100%; justify-content: flex-end;
  color: #fff;
}
.photo-overlay .kicker {
  font-size: 10px; letter-spacing: .25em; color: ${color.hex};
  font-weight: 600;
}
.photo-overlay h3 {
  font-family: 'Cormorant Garamond','Noto Serif JP',serif;
  font-size: 28px; font-weight: 600; font-style: italic;
  letter-spacing: .02em; margin: 4px 0 8px;
}
.photo-overlay .more {
  font-size: 11px; letter-spacing: .2em; font-weight: 600;
  color: ${color.hex}; opacity: .9;
  transition: opacity .3s ease;
}
.photo-overlay:hover .more { opacity: 1; }`,
    tailwind: `<a href="#"
  className="group relative isolate block aspect-[4/5] w-80 overflow-hidden rounded-2xl shadow-[0_20px_40px_-16px_rgba(0,0,0,.4)]">
  <img src="${SAMPLE_IMG}" alt=""
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/85" />
  <div className="relative flex h-full flex-col justify-end gap-1.5 p-6 text-white">
    <span className="text-[10px] font-semibold tracking-[0.25em]" style={{ color: "${color.hex}" }}>FORTUNE</span>
    <h3 className="font-serif text-3xl font-semibold italic tracking-wide">月夜のメッセージ</h3>
    <span className="text-[11px] font-semibold tracking-[0.2em] opacity-90 transition group-hover:opacity-100"
      style={{ color: "${color.hex}" }}>
      READ MORE →
    </span>
  </div>
</a>`,
    react: `export function PhotoOverlayCard({
  src,
  kicker = "FORTUNE",
  title = "月夜のメッセージ",
  href = "#",
}: { src: string; kicker?: string; title?: string; href?: string }) {
  return (
    <a href={href}
      className="group relative isolate block aspect-[4/5] w-80 overflow-hidden rounded-2xl shadow-[0_20px_40px_-16px_rgba(0,0,0,.4)]">
      <img src={src} alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/85" />
      <div className="relative flex h-full flex-col justify-end gap-1.5 p-6 text-white">
        <span className="text-[10px] font-semibold tracking-[0.25em]" style={{ color: "${color.hex}" }}>{kicker}</span>
        <h3 className="font-serif text-3xl font-semibold italic tracking-wide">{title}</h3>
        <span className="text-[11px] font-semibold tracking-[0.2em] opacity-90 transition group-hover:opacity-100"
          style={{ color: "${color.hex}" }}>READ MORE →</span>
      </div>
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `写真カード（下グラデオーバーレイ）を実装してください。
- 320×400 (aspect 4:5)、角丸 2xl、overflow-hidden、isolate
- <img> 全面 object-cover、ホバー scale-105 (700ms)
- 上に linear-gradient(180deg, transparent 35%, black/15 55%, black/85 100%) のオーバーレイ
- 下部に kicker（${color.tw}-500、letter-spacing .25em、10px）+ セリフ italic 見出し（28px）+ READ MORE → リンク（${color.tw}-500）
- ${color.jp}（${color.hex}）をアクセントに使う
完全動作する Tailwind / React コンポーネントとして実装してください。`,
};

const cardPhotoPolaroid: ExtraArchetype<CV> = {
  id: "card-photo-polaroid",
  baseTitle: "ポラロイド風写真カード",
  category: "card",
  baseMood: ["BtoC", "ノスタルジー", "クラフト"],
  baseTags: ["CSS", "Tailwind", "React"],
  difficulty: "easy",
  useCase: "ギャラリーサイト、思い出/メモリー系、占い結果のシェア画像、ブランドサイト。",
  effect: "白い太枠＋下に手書き風キャプション＋微小回転で本物のポラロイド感。",
  suitableFor: ["写真ギャラリー", "ブランド/個人サイト", "占い結果"],
  badUsage: "BtoB業務システムには合わない。",
  similar: ["card-photo-overlay", "card-photo-vintage"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<figure class="polaroid">
  <img src="${SAMPLE_IMG}" alt="" />
  <figcaption>moon, 21:48</figcaption>
</figure>`,
    css: `.polaroid {
  display: inline-block;
  background: #fafafa;
  padding: 14px 14px 36px;
  margin: 0;
  box-shadow: 0 8px 18px -6px rgba(0,0,0,.25), 0 2px 4px rgba(0,0,0,.1);
  transform: rotate(-3deg);
  transition: transform .35s ease, box-shadow .35s ease;
}
.polaroid:hover {
  transform: rotate(0) translateY(-4px) scale(1.03);
  box-shadow: 0 16px 32px -8px rgba(0,0,0,.35), 0 4px 8px rgba(0,0,0,.15);
}
.polaroid img {
  display: block;
  width: 240px; aspect-ratio: 1;
  object-fit: cover;
  filter: saturate(.9) contrast(1.05);
}
.polaroid figcaption {
  text-align: center;
  margin-top: 12px;
  font-family: 'Caveat', 'Comic Sans MS', cursive;
  font-size: 18px;
  color: ${color.hex};
}`,
    tailwind: `<figure className="group inline-block bg-zinc-50 p-3.5 pb-9 [transform:rotate(-3deg)]
                   shadow-[0_8px_18px_-6px_rgba(0,0,0,.25),0_2px_4px_rgba(0,0,0,.1)]
                   transition duration-300
                   hover:[transform:rotate(0deg)_translateY(-4px)_scale(1.03)]
                   hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,.35),0_4px_8px_rgba(0,0,0,.15)]">
  <img src="${SAMPLE_IMG}" alt=""
    className="block aspect-square w-60 object-cover [filter:saturate(.9)_contrast(1.05)]" />
  <figcaption className="mt-3 text-center text-lg [font-family:'Caveat','Comic_Sans_MS',cursive]"
    style={{ color: "${color.hex}" }}>
    moon, 21:48
  </figcaption>
</figure>`,
    react: `export function PolaroidCard({
  src,
  caption = "moon, 21:48",
  rotation = -3,
}: { src: string; caption?: string; rotation?: number }) {
  return (
    <figure className="group inline-block bg-zinc-50 p-3.5 pb-9 transition duration-300
                       shadow-[0_8px_18px_-6px_rgba(0,0,0,.25),0_2px_4px_rgba(0,0,0,.1)]
                       hover:[transform:rotate(0deg)_translateY(-4px)_scale(1.03)]
                       hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,.35),0_4px_8px_rgba(0,0,0,.15)]"
                       style={{ transform: \`rotate(\${rotation}deg)\` }}>
      <img src={src} alt=""
        className="block aspect-square w-60 object-cover [filter:saturate(.9)_contrast(1.05)]" />
      <figcaption className="mt-3 text-center text-lg [font-family:'Caveat','Comic_Sans_MS',cursive]"
        style={{ color: "${color.hex}" }}>
        {caption}
      </figcaption>
    </figure>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ポラロイド風写真カードを実装してください。
- 白フレーム（#fafafa）、padding 14px 14px 36px（下を厚く）、デフォルトで -3度 回転
- 内側に正方形写真（240px、object-cover、filter saturate(.9) contrast(1.05)）
- 下にキャプション（手書き風 'Caveat' / 'Comic Sans MS' cursive、18px、${color.tw}-500）
- box-shadow 2段（薄い+少し濃い）でリアルな浮遊感
- ホバー: 0度に戻り -4px 浮上、scale 1.03、影が大きく
- props: src / caption / rotation
完全動作する Tailwind / React コンポーネントとして実装。`,
};

const cardPhotoMagazine: ExtraArchetype<CV> = {
  id: "card-photo-magazine",
  baseTitle: "雑誌風スプリット写真カード",
  category: "card",
  baseMood: ["編集", "メディア", "上品"],
  baseTags: ["CSS", "Tailwind", "React"],
  difficulty: "easy",
  useCase: "メディア・編集系サイトの記事カード、占い特集記事、ブランド読み物。",
  effect: "左に正方形写真、右にカテゴリ・見出し・要約・READ MORE。雑誌の見開き風レイアウト。",
  suitableFor: ["メディア", "雑誌風サイト", "編集ブログ"],
  badUsage: "モバイルでは横並びだと窮屈。下記コードはレスポンシブ対応。",
  similar: ["card-photo-overlay"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="mag-card" href="#">
  <div class="img"><img src="${SAMPLE_IMG}" alt=""/></div>
  <div class="body">
    <span class="kicker">特集 / Fortune</span>
    <h3>静かに、運命を読む方法。</h3>
    <p>占い師ミネアの語る、月光と水晶の流儀。</p>
    <span class="more">READ MORE →</span>
  </div>
</a>`,
    css: `.mag-card {
  display: grid; grid-template-columns: 220px 1fr; gap: 24px;
  width: 580px;
  padding: 14px;
  border-radius: 14px;
  background: #fff; border: 1px solid #e7e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 12px 24px -12px rgba(0,0,0,.12);
  transition: transform .35s ease, box-shadow .35s ease;
  text-decoration: none;
}
.mag-card:hover { transform: translateY(-2px); box-shadow: 0 18px 30px -16px rgba(0,0,0,.2); }
.mag-card .img { aspect-ratio: 1; overflow: hidden; border-radius: 8px; }
.mag-card .img img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; }
.mag-card:hover .img img { transform: scale(1.05); }
.mag-card .body { display: flex; flex-direction: column; justify-content: center; gap: 6px; padding-right: 8px; }
.mag-card .kicker { font-size: 10px; letter-spacing: .22em; color: ${color.hex}; font-weight: 700; text-transform: uppercase; }
.mag-card h3 { font-family: 'Cormorant Garamond','Noto Serif JP',serif; font-size: 24px; font-weight: 600; color: #0a0a0a; margin: 4px 0; line-height: 1.25; }
.mag-card p { color: #52525b; font-size: 14px; line-height: 1.6; margin: 0; }
.mag-card .more { margin-top: 6px; font-size: 11px; letter-spacing: .22em; color: ${color.hex}; font-weight: 700; }
@media (max-width: 640px) {
  .mag-card { grid-template-columns: 1fr; width: 100%; }
}`,
    tailwind: `<a href="#"
  className="group grid w-[580px] grid-cols-[220px,1fr] gap-6 rounded-2xl border border-zinc-200 bg-white p-3.5 no-underline shadow-[0_1px_2px_rgba(0,0,0,.04),0_12px_24px_-12px_rgba(0,0,0,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_-16px_rgba(0,0,0,.2)] sm:max-md:grid-cols-1 max-sm:w-full max-sm:grid-cols-1">
  <div className="aspect-square overflow-hidden rounded-lg">
    <img src="${SAMPLE_IMG}" alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
  </div>
  <div className="flex flex-col justify-center gap-1.5 pr-2">
    <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "${color.hex}" }}>特集 / Fortune</span>
    <h3 className="my-1 font-serif text-2xl font-semibold leading-snug text-zinc-900">静かに、運命を読む方法。</h3>
    <p className="text-sm leading-relaxed text-zinc-600">占い師ミネアの語る、月光と水晶の流儀。</p>
    <span className="mt-1.5 text-[11px] font-bold tracking-[0.22em]" style={{ color: "${color.hex}" }}>READ MORE →</span>
  </div>
</a>`,
    react: `export function MagazineCard({
  src,
  kicker = "特集 / Fortune",
  title = "静かに、運命を読む方法。",
  excerpt = "占い師ミネアの語る、月光と水晶の流儀。",
  href = "#",
}: { src: string; kicker?: string; title?: string; excerpt?: string; href?: string }) {
  return (
    <a href={href}
      className="group grid w-[580px] grid-cols-[220px,1fr] gap-6 rounded-2xl border border-zinc-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg max-sm:w-full max-sm:grid-cols-1">
      <div className="aspect-square overflow-hidden rounded-lg">
        <img src={src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center gap-1.5 pr-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "${color.hex}" }}>{kicker}</span>
        <h3 className="my-1 font-serif text-2xl font-semibold leading-snug text-zinc-900">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-600">{excerpt}</p>
        <span className="mt-1.5 text-[11px] font-bold tracking-[0.22em]" style={{ color: "${color.hex}" }}>READ MORE →</span>
      </div>
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `雑誌風スプリットカードを実装してください。
- grid 220px / 1fr の2列、gap 24px、白背景、border zinc-200
- 左: 正方形写真、object-cover、ホバー 1.05倍 scale
- 右: kicker (${color.tw}-500、uppercase、letter-spacing .22em) / セリフ見出し / 本文 / READ MORE
- ホバーで -2px 浮上＋影拡大
- スマホで1カラムにスタック
完全動作する Tailwind / React コンポーネントとして実装。`,
};

const cardPhotoVintage: ExtraArchetype<CV> = {
  id: "card-photo-vintage",
  baseTitle: "ヴィンテージ写真カード（セピア＋粒子）",
  category: "card",
  baseMood: ["レトロ", "アンティーク", "占い"],
  baseTags: ["CSS", "Tailwind", "React"],
  difficulty: "medium",
  useCase: "アンティーク/古書/占い系のミステリアスなコンテンツカード。",
  effect: "セピアフィルター + 軽いコントラスト + フィルム粒子オーバーレイで古い写真風に。",
  suitableFor: ["占いサイト", "アンティーク/ヴィンテージブランド", "ホラー/ミステリー"],
  badUsage: "情報が読み取りにくくなるので、画像が情報媒体の場合は避ける。",
  similar: ["card-photo-polaroid", "card-photo-duotone"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<figure class="vintage-card">
  <img src="${SAMPLE_IMG}" alt="" />
  <span class="grain"></span>
  <figcaption>
    <span class="dot">●</span> Aged Memory
  </figcaption>
</figure>`,
    css: `.vintage-card {
  position: relative; display: inline-block;
  width: 280px; aspect-ratio: 4/5;
  background: #2a1f15;
  padding: 16px 16px 36px;
  border: 1px solid #6b4f2c;
  box-shadow: 0 12px 24px -10px rgba(0,0,0,.45), inset 0 0 0 4px ${color.hex}33;
  margin: 0;
}
.vintage-card img {
  display: block;
  width: 100%; height: 78%;
  object-fit: cover;
  filter: sepia(.6) saturate(.7) contrast(1.05) brightness(.95);
}
.vintage-card .grain {
  position: absolute; inset: 16px 16px 36px 16px;
  pointer-events: none;
  opacity: .12; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.vintage-card figcaption {
  margin-top: 10px;
  font-family: 'Cormorant Garamond','Noto Serif JP',serif;
  font-style: italic; letter-spacing: .12em;
  color: #d4b87a; font-size: 13px;
  text-align: center;
}
.vintage-card .dot { color: ${color.hex}; }`,
    tailwind: `<figure className="relative inline-block aspect-[4/5] w-72 bg-[#2a1f15] p-4 pb-9 m-0
                  border border-[#6b4f2c] shadow-[0_12px_24px_-10px_rgba(0,0,0,.45),inset_0_0_0_4px_${color.hex}33]">
  <img src="${SAMPLE_IMG}" alt=""
    className="block h-[78%] w-full object-cover [filter:sepia(.6)_saturate(.7)_contrast(1.05)_brightness(.95)]" />
  <span aria-hidden className="pointer-events-none absolute inset-4 bottom-9 mix-blend-overlay opacity-[.12]"
    style={{ backgroundImage: "url(\\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\\")" }} />
  <figcaption className="mt-2.5 text-center text-[13px] italic tracking-[0.12em] [font-family:'Cormorant_Garamond','Noto_Serif_JP',serif]"
    style={{ color: "#d4b87a" }}>
    <span style={{ color: "${color.hex}" }}>●</span> Aged Memory
  </figcaption>
</figure>`,
    react: `export function VintagePhotoCard({
  src,
  caption = "Aged Memory",
}: { src: string; caption?: string }) {
  return (
    <figure className="relative inline-block aspect-[4/5] w-72 m-0 bg-[#2a1f15] p-4 pb-9
                       border border-[#6b4f2c]
                       shadow-[0_12px_24px_-10px_rgba(0,0,0,.45),inset_0_0_0_4px_${color.hex}33]">
      <img src={src} alt=""
        className="block h-[78%] w-full object-cover [filter:sepia(.6)_saturate(.7)_contrast(1.05)_brightness(.95)]" />
      <span aria-hidden className="pointer-events-none absolute inset-4 bottom-9 mix-blend-overlay opacity-[.12]"
        style={{ backgroundImage: "url(\\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\\")" }} />
      <figcaption className="mt-2.5 text-center text-[13px] italic tracking-[0.12em] [font-family:'Cormorant_Garamond','Noto_Serif_JP',serif]"
        style={{ color: "#d4b87a" }}>
        <span style={{ color: "${color.hex}" }}>●</span> {caption}
      </figcaption>
    </figure>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ヴィンテージ写真カードを実装してください。
- ブラウン背景 #2a1f15、border #6b4f2c、内側 4px の inset shadow ${color.hex}33（金縁）
- 上部 78% に写真、filter: sepia(.6) saturate(.7) contrast(1.05) brightness(.95)
- 写真の上に SVG fractalNoise を mix-blend-overlay opacity .12 で被せて粒子感
- 下にセリフ italic キャプション (#d4b87a)、先頭に ● ${color.tw}-500
完全動作する Tailwind / React コンポーネントとして実装。`,
};

const cardPhotoDuotone: ExtraArchetype<CV> = {
  id: "card-photo-duotone",
  baseTitle: "デュオトーン写真カード",
  category: "card",
  baseMood: ["モダン", "アート", "占い"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "medium",
  useCase: "アート系プロダクト、占い系メディア、ブランドのキービジュアル、写真ギャラリー。",
  effect: "写真をモノクロ化＋色面 multiply で2色（紫＋黒など）に染め、強い世界観を出す。",
  suitableFor: ["アートメディア", "ファッション", "占い系のキー演出"],
  badUsage: "ナチュラルさが消えるので、人物の表情や食品写真には不向き。",
  similar: ["card-photo-vintage"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<figure class="duotone">
  <img src="${SAMPLE_IMG}" alt="" />
  <div class="tint"></div>
  <figcaption>NIGHT WHISPER</figcaption>
</figure>`,
    css: `.duotone {
  position: relative; display: inline-block; margin: 0;
  width: 280px; aspect-ratio: 4/5;
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 18px 36px -14px rgba(0,0,0,.4);
}
.duotone img {
  width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(1.05);
}
.duotone .tint {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, ${color.hex}, #0c051a);
  mix-blend-mode: multiply;
}
.duotone figcaption {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 18px 20px;
  color: #fff;
  font-family: 'Cormorant Garamond','Noto Serif JP',serif;
  font-size: 22px; font-weight: 600; letter-spacing: .14em;
  text-shadow: 0 2px 8px rgba(0,0,0,.6);
}`,
    tailwind: `<figure className="relative m-0 inline-block aspect-[4/5] w-72 overflow-hidden rounded-2xl shadow-[0_18px_36px_-14px_rgba(0,0,0,.4)]">
  <img src="${SAMPLE_IMG}" alt="" className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.05)]" />
  <div className="absolute inset-0 mix-blend-multiply"
    style={{ background: "linear-gradient(135deg, ${color.hex}, #0c051a)" }} />
  <figcaption className="absolute inset-x-0 bottom-0 p-5 font-serif text-2xl font-semibold tracking-[.14em] text-white"
    style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>
    NIGHT WHISPER
  </figcaption>
</figure>`,
    react: `export function DuotonePhotoCard({
  src,
  caption = "NIGHT WHISPER",
}: { src: string; caption?: string }) {
  return (
    <figure className="relative m-0 inline-block aspect-[4/5] w-72 overflow-hidden rounded-2xl shadow-[0_18px_36px_-14px_rgba(0,0,0,.4)]">
      <img src={src} alt="" className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.05)]" />
      <div className="absolute inset-0 mix-blend-multiply"
        style={{ background: "linear-gradient(135deg, ${color.hex}, #0c051a)" }} />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 font-serif text-2xl font-semibold tracking-[.14em] text-white"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>
        {caption}
      </figcaption>
    </figure>
  );
}`,
  }),
  prompt: ({ color }) =>
    `デュオトーン写真カードを実装してください。
- 写真は filter: grayscale(1) contrast(1.05) でモノクロ化
- その上に linear-gradient(135deg, ${color.hex}, #0c051a) を mix-blend-mode: multiply で被せる（${color.jp}と暗紫の2色染め）
- 280×350 (4:5)、角丸 2xl、強めの下方向 shadow
- 下に白文字のセリフ大見出し（letter-spacing .14em、text-shadow 黒.6）
完全動作する Tailwind / React コンポーネントとして実装。`,
};

const cardPhotoOrnateFrame: ExtraArchetype<CV> = {
  id: "card-photo-ornate-frame",
  baseTitle: "金額装フレーム写真カード",
  category: "card",
  baseMood: ["占い", "高級感", "アンティーク"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "medium",
  useCase: "占いサイトのキービジュアル、アート/ジュエリーブランド、博物館的演出。",
  effect: "二重の金グラデ枠＋4隅に飾り点＋羊皮紙バック。額装された絵画のような威厳。",
  suitableFor: ["占い", "アート/ジュエリー", "ハイエンドブランド"],
  badUsage: "情報量の多いリストだと過剰。フィーチャー用途に。",
  similar: ["card-tarot-photo", "card-photo-vintage"],
  variants: cv(),
  code: ({ color }) => ({
    html: `<figure class="ornate">
  <div class="frame">
    <img src="${SAMPLE_IMG}" alt="" />
    <span class="corner tl"></span>
    <span class="corner tr"></span>
    <span class="corner bl"></span>
    <span class="corner br"></span>
  </div>
  <figcaption>The Moonlit Promise</figcaption>
</figure>`,
    css: `.ornate {
  display: inline-block; margin: 0; padding: 6px;
  background: linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%);
  background-size: 200% 200%; animation: goldShimmer 9s ease-in-out infinite;
  border-radius: 6px;
  box-shadow: 0 22px 50px -22px rgba(212,175,55,.55);
}
.ornate .frame {
  position: relative;
  background: #f5e6c8; padding: 12px;
  border: 1px solid #8a6a1c;
  border-radius: 4px;
}
.ornate img {
  display: block;
  width: 240px; aspect-ratio: 4/5;
  object-fit: cover;
  filter: sepia(.15) saturate(1.05) contrast(1.05);
}
.ornate .corner {
  position: absolute; width: 14px; height: 14px;
  background: ${color.hex};
  clip-path: polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%);
}
.ornate .tl { top: 4px; left: 4px; }
.ornate .tr { top: 4px; right: 4px; transform: scaleX(-1); }
.ornate .bl { bottom: 4px; left: 4px; transform: scaleY(-1); }
.ornate .br { bottom: 4px; right: 4px; transform: scale(-1, -1); }
.ornate figcaption {
  margin-top: 6px;
  text-align: center; padding: 8px 12px;
  background: #14091e; color: #e9d6a3;
  font-family: 'Cormorant Garamond','Noto Serif JP',serif;
  font-style: italic; letter-spacing: .12em; font-size: 14px;
  border-radius: 4px;
}`,
    tailwind: `<figure className="m-0 inline-block rounded-md p-1.5 shadow-[0_22px_50px_-22px_rgba(212,175,55,.55)]"
  style={{
    background: "linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%)",
    backgroundSize: "200% 200%",
    animation: "goldShimmer 9s ease-in-out infinite",
  }}>
  <div className="relative rounded-sm border border-[#8a6a1c] bg-[#f5e6c8] p-3">
    <img src="${SAMPLE_IMG}" alt=""
      className="block aspect-[4/5] w-60 object-cover [filter:sepia(.15)_saturate(1.05)_contrast(1.05)]" />
    {[
      { pos: "top-1 left-1", trans: "" },
      { pos: "top-1 right-1", trans: "scale-x-[-1]" },
      { pos: "bottom-1 left-1", trans: "scale-y-[-1]" },
      { pos: "bottom-1 right-1", trans: "[transform:scale(-1,-1)]" },
    ].map((c, i) => (
      <span key={i}
        className={"absolute h-3.5 w-3.5 " + c.pos + " " + c.trans}
        style={{ background: "${color.hex}", clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)" }} />
    ))}
  </div>
  <figcaption className="mt-1.5 rounded-sm bg-[#14091e] px-3 py-2 text-center text-sm italic tracking-[.12em]"
    style={{ color: "#e9d6a3", fontFamily: "'Cormorant Garamond','Noto Serif JP',serif" }}>
    The Moonlit Promise
  </figcaption>
</figure>`,
    react: `export function OrnateFramePhoto({
  src,
  caption = "The Moonlit Promise",
}: { src: string; caption?: string }) {
  const corners = [
    "top-1 left-1",
    "top-1 right-1 scale-x-[-1]",
    "bottom-1 left-1 scale-y-[-1]",
    "bottom-1 right-1 [transform:scale(-1,-1)]",
  ];
  return (
    <figure className="m-0 inline-block rounded-md p-1.5 shadow-[0_22px_50px_-22px_rgba(212,175,55,.55)]"
      style={{
        background: "linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%)",
        backgroundSize: "200% 200%",
        animation: "goldShimmer 9s ease-in-out infinite",
      }}>
      <div className="relative rounded-sm border border-[#8a6a1c] bg-[#f5e6c8] p-3">
        <img src={src} alt=""
          className="block aspect-[4/5] w-60 object-cover [filter:sepia(.15)_saturate(1.05)_contrast(1.05)]" />
        {corners.map((c, i) => (
          <span key={i}
            className={"absolute h-3.5 w-3.5 " + c}
            style={{ background: "${color.hex}", clipPath: "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)" }} />
        ))}
      </div>
      <figcaption className="mt-1.5 rounded-sm bg-[#14091e] px-3 py-2 text-center text-sm italic tracking-[.12em]"
        style={{ color: "#e9d6a3", fontFamily: "'Cormorant Garamond','Noto Serif JP',serif" }}>
        {caption}
      </figcaption>
    </figure>
  );
}`,
  }),
  prompt: ({ color }) =>
    `金額装フレーム写真カードを実装してください。
- 外周 6px の金グラデ枠（135deg gold→pale→deep→gold、200% size、9秒ゆっくりシマー）
- 内側はクリーム背景 #f5e6c8、border #8a6a1c、padding 12px
- 中央に写真、filter: sepia(.15) saturate(1.05) contrast(1.05)
- 4隅に L字型の ${color.tw}-500 装飾（clip-path で）
- 下に黒紫帯のセリフ italic キャプション（#e9d6a3）
完全動作する Tailwind / React コンポーネントとして実装。`,
};

const cardCrystalBall: ExtraArchetype<CV> = {
  id: "card-crystal-ball",
  baseTitle: "水晶玉占いカード",
  category: "card",
  baseMood: ["占い", "ミスティック"],
  baseTags: ["SVG", "CSS"],
  difficulty: "medium",
  useCase: "占いサイトのメニューカード、霊感占い系のセクション。",
  effect: "中央に SVG の水晶玉（radial gradient で 球体 + ハイライト + 影 + 台座）を置いた重厚なカード。",
  suitableFor: ["占いサイト", "霊感占い", "オラクル系"],
  badUsage: "カジュアルなBtoCには重厚すぎる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="myst-card">
  <div class="img"><svg viewBox="0 0 100 110">…水晶玉SVG…</svg></div>
  <div class="body">
    <h3>水晶玉占い</h3>
    <p>球体に映るあなたの未来を…</p>
    <div class="more">READ MORE →</div>
  </div>
</article>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `// 中央に水晶玉SVG。background は #150a26、border ${color.hex}40。
// 詳細は previews.tsx の PCardCrystalBall を参照してください。`,
  }),
  prompt: ({ color }) =>
    `占いサイトのメニューカードを実装してください。中央に水晶玉のSVG（cx=50, cy=48, r=32 の circle に radialGradient で 白→${color.hex}→#3b1d6b→#0a0033 を入れる）+ 木製の台座 + 鋭いハイライト + 周辺に ✦ スパークル。下に Cormorant Garamond italic の見出し『水晶玉占い』、説明、金色の『READ MORE →』。背景 #150a26、ボーダー ${color.tw}/40。`,
};

const cardMoonPhases: ExtraArchetype<CV> = {
  id: "card-moon-phases",
  baseTitle: "月の満ち欠けカード",
  category: "card",
  baseMood: ["占い", "ミスティック", "夜"],
  baseTags: ["SVG", "CSS"],
  difficulty: "medium",
  useCase: "月相カレンダー、ホロスコープ、神秘系メディア。",
  effect: "5つの月相SVGが横一列に並び、夜空背景に星が散る。月のリズム表現。",
  suitableFor: ["占星術/ホロスコープ", "ヨガ/瞑想", "東洋占い"],
  badUsage: "明るい背景には合わない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="moon-card">…</article>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `// 月相5つを SVG で <circle> + 重ねた暗色 circle/rect で表現。
// previews.tsx の PCardMoonPhases を参照してください。`,
  }),
  prompt: ({ color }) =>
    `月の満ち欠けカードを実装してください。5つの月相（new / crescent / half / gibbous / full）を SVG で横並びに描き、点線で繋ぎます。背景は #0a0a22 → #0e0820 の縦グラデ、ランダム位置の星 radial-gradient で散らし、ボーダー金色 .33。見出し『月の満ち欠け』(Cormorant Garamond italic)、説明文、CTA『VIEW CALENDAR →』。`,
};

const cardZodiacWheel: ExtraArchetype<CV> = {
  id: "card-zodiac-wheel",
  baseTitle: "占星盤カード",
  category: "card",
  baseMood: ["占い", "占星術"],
  baseTags: ["SVG", "CSS"],
  difficulty: "hard",
  useCase: "西洋占星術サービスのメニュー、ホロスコープ診断のCTAカード。",
  effect: "中央に12星座の記号を配した同心円ホイール。圧倒的な情報密度と神秘性。",
  suitableFor: ["占星術プロダクト", "ホロスコープ診断", "天文系メディア"],
  badUsage: "小さい表示では潰れる。最低 280px 幅は確保。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="zodiac-card">…</article>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `// SVG: 3重の同心円 + 12分割の目盛 + 12星座記号を周囲に配置。
// previews.tsx の PCardZodiacWheel を参照してください。`,
  }),
  prompt: ({ color }) =>
    `占星盤（西洋占星術ホイール）の SVG イラストカードを実装してください。3層の同心円 (r=42/36/28)、12個の30度刻みの tick、円周上に♈〜♓の12星座記号、中央に大きな ☉。色は ${color.tw}-500（${color.hex}）。下にカードボディとして見出し『西洋占星術』、説明文、CTA『DIAGNOSE →』を配置。`,
};

const cardRunes: ExtraArchetype<CV> = {
  id: "card-runes",
  baseTitle: "ルーンストーンカード",
  category: "card",
  baseMood: ["占い", "ミスティック", "古代"],
  baseTags: ["SVG", "CSS"],
  difficulty: "medium",
  useCase: "ルーン占い・古代占いの紹介カード、神秘系コンテンツ。",
  effect: "石板に刻まれたルーン文字をSVGで表現。古代の知恵を直感的に伝える。",
  suitableFor: ["ルーン占い", "北欧神話/古代占い", "神秘系メディア"],
  badUsage: "BtoC一般向けには専門的すぎる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<article class="rune-card">…</article>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `// 4つの石板 <rect> をランダム回転で並べ、上に古代文字 ᚠ ᛟ ᚱ ᛞ をテキストで描画。
// previews.tsx の PCardRunes を参照してください。`,
  }),
  prompt: ({ color }) =>
    `ルーンストーンカードのSVGイラストを実装してください。4つの石板を rect (22×32, rx=3, fill=#231838, stroke=${color.tw}-500) でランダムな少しの回転をつけて並べ、それぞれ中央に古代北欧ルーン文字 (ᚠ / ᛟ / ᚱ / ᛞ) をテキストで描画。下に見出し『ルーン占い』、説明、CTA『READ MORE →』。`,
};

/* ============================================================
   ホバー演出
   ============================================================ */

const hoverUnderline: ExtraArchetype<CV> = {
  id: "hover-underline",
  baseTitle: "ホバーアンダーライン",
  category: "hover",
  baseMood: ["ミニマル", "BtoB"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "ナビゲーションリンク、フッターリンク、テキストリンク。",
  effect: "下線が左→右に伸びてくる、もっとも上品なホバー演出。",
  suitableFor: ["コーポレート", "メディア", "ナビ"],
  badUsage: "色を強くしすぎると下品。本文と同色か少し濃く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="hu" href="#">採用情報</a>`,
    css: `.hu { position:relative; color:#0a0a0a; font-weight:600; }
.hu::after { content:""; position:absolute; left:0; bottom:-3px; height:2px; width:0; background:${color.hex}; transition: width .3s ease; }
.hu:hover::after { width:100%; }`,
    tailwind: `<a href="#" className="relative font-semibold text-zinc-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-${color.tw}-500 after:transition-[width] hover:after:w-full">採用情報</a>`,
    react: `export function HoverUnderline({ children = "採用情報" }) {
  return (
    <a href="#" className="relative font-semibold text-zinc-900 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-${color.tw}-500 after:transition-[width] hover:after:w-full">
      {children}
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ナビリンクに『左→右に伸びるアンダーライン』のホバー演出を追加してください。線色は ${color.tw}-500、太さ2px、transition は .3s。Tailwindで after 疑似要素を使ってください。`,
};

const hoverGlow: ExtraArchetype<CV> = {
  id: "hover-glow",
  baseTitle: "ホバーグロー",
  category: "hover",
  baseMood: ["テック", "上品"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "アイコンボタン、サイドバーアイコン、ツールチップトリガー。",
  effect: "ホバーで周りに同色のソフトな光が広がる。",
  suitableFor: ["管理画面", "AI/SaaS", "ツールバー"],
  badUsage: "情報量の多いリストで一斉発光させない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<button class="hg" aria-label="保存">★</button>`,
    css: `.hg { display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:9999px; background:#f5f5f7; transition: box-shadow .3s ease, color .2s ease; }
.hg:hover { box-shadow: 0 0 0 4px ${color.hex}22, 0 0 20px ${color.hex}66; color:${color.hex}; }`,
    tailwind: `<button aria-label="保存" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:text-${color.tw}-500 hover:shadow-[0_0_0_4px_rgba(124,92,255,.13),0_0_20px_rgba(124,92,255,.4)]">★</button>`,
    react: `export function HoverGlowIcon() {
  return (
    <button aria-label="save"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 transition hover:text-${color.tw}-500"
      style={{ ['--c' as any]: '${color.hex}' }}
      onMouseEnter={(e)=>e.currentTarget.style.boxShadow='0 0 0 4px ${color.hex}22, 0 0 20px ${color.hex}66'}
      onMouseLeave={(e)=>e.currentTarget.style.boxShadow=''}
    >★</button>
  );
}`,
  }),
  prompt: ({ color }) =>
    `アイコンボタンに、ホバー時に外側へ広がる ${color.jp}のソフトな光（${color.hex}22 のリング＋${color.hex}66 のぼかし）を追加してください。文字色も ${color.tw}-500 に変化させます。`,
};

const hoverImageZoom: ExtraArchetype<CV> = {
  id: "hover-image-zoom",
  baseTitle: "ホバー画像ズーム",
  category: "hover",
  baseMood: ["BtoC", "メディア"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "ブログサムネイル、ポートフォリオ作品、コマース商品。",
  effect: "枠の中で画像が1.06倍に拡大。クリック率に効きやすい。",
  suitableFor: ["メディア", "ポートフォリオ", "コマース"],
  badUsage: "1.2倍以上で拡大すると画質が落ちて見える。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<a class="zoom" href="#"><img src="..." /></a>`,
    css: `.zoom { display:block; overflow:hidden; border-radius:16px; }
.zoom img { transition: transform .5s ease; }
.zoom:hover img { transform: scale(1.06); }
.zoom:hover { box-shadow: 0 18px 30px -16px ${color.hex}55; }`,
    tailwind: `<a href="#" className="block overflow-hidden rounded-2xl transition hover:shadow-[0_18px_30px_-16px_rgba(0,0,0,.2)]">
  <img src="..." alt="" className="h-full w-full object-cover transition duration-500 hover:scale-[1.06]" />
</a>`,
    react: `export function HoverZoom({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <a href="#" className="block overflow-hidden rounded-2xl transition hover:shadow-[0_18px_30px_-16px_rgba(0,0,0,.2)]">
      <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 hover:scale-[1.06]" />
    </a>
  );
}`,
  }),
  prompt: ({ color }) =>
    `サムネイルカードを、ホバーで画像が1.06倍ズーム + 親に ${color.jp}寄りの薄い下方向シャドウが付くように変更してください。overflow-hidden と rounded-2xl を忘れずに。`,
};

const hoverShiftBg: ExtraArchetype<CV> = {
  id: "hover-shift-bg",
  baseTitle: "ホバー塗りつぶし（左→右）",
  category: "hover",
  baseMood: ["モダン", "BtoB"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ナビメニュー項目、リストアイテム、カテゴリタイル。",
  effect: "左から色がスライドして埋まる。アニメで意図が明確に伝わる。",
  suitableFor: ["BtoBナビ", "セクションメニュー", "ギャラリーフィルタ"],
  badUsage: "速度が速すぎると目障り。.35秒以上が目安。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<button class="shift-bg">カテゴリA</button>`,
    css: `.shift-bg { position:relative; padding:10px 20px; border-radius:9999px; color:#0a0a0a; font-weight:600; overflow:hidden; isolation:isolate; }
.shift-bg::before { content:""; position:absolute; inset:0; transform: translateX(-100%); background:${color.hex}; transition: transform .35s ease; z-index:-1; }
.shift-bg:hover::before { transform: translateX(0); }
.shift-bg:hover { color:#fff; }`,
    tailwind: `// React版参照`,
    react: `export function ShiftBg({ children = "カテゴリA" }) {
  return (
    <button className="group relative overflow-hidden rounded-full px-5 py-2.5 font-semibold text-zinc-900 transition hover:text-white">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-${color.tw}-500 transition-transform duration-300 ease-out group-hover:translate-x-0" />
    </button>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ナビボタンに、ホバー時に左から ${color.tw}-500 が translateX(-100%)→0 で塗り潰され、文字色が白に切り替わる演出を追加してください。`,
};

/* ============================================================
   背景演出
   ============================================================ */

const bgGrid: ExtraArchetype<CV> = {
  id: "bg-grid",
  baseTitle: "グリッド背景",
  category: "background",
  baseMood: ["テック", "ミニマル"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "Heroセクション背景、開発者向けLP、AI系プロダクトの全体背景。",
  effect: "薄いグリッドが規律と正確さを感じさせる。中央のラジアルマスクで主役を立てる。",
  suitableFor: ["AI/開発者向けLP", "テックコーポレート"],
  badUsage: "全面で濃く描くと文字が読みにくい。マスク必須。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="grid-bg">…</section>`,
    css: `.grid-bg { background-image: linear-gradient(to right, ${color.hex}1f 1px, transparent 1px), linear-gradient(to bottom, ${color.hex}1f 1px, transparent 1px); background-size: 48px 48px; -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%); mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%); }`,
    tailwind: `<section className="[mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)] [background-size:48px_48px]"
  style={{ backgroundImage: "linear-gradient(to right, ${color.hex}1f 1px, transparent 1px), linear-gradient(to bottom, ${color.hex}1f 1px, transparent 1px)" }}>
  …
</section>`,
    react: `export function GridBg({ children }: { children: React.ReactNode }) {
  return (
    <section className="[mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)] [background-size:48px_48px]"
      style={{ backgroundImage: "linear-gradient(to right, ${color.hex}1f 1px, transparent 1px), linear-gradient(to bottom, ${color.hex}1f 1px, transparent 1px)" }}>
      {children}
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Hero背景を48pxピッチの ${color.jp}グリッド（${color.hex}1f）に変更してください。中央に向けてラジアルマスクで自然にフェードさせ、主役を邪魔しないように。`,
};

const bgDots: ExtraArchetype<CV> = {
  id: "bg-dots",
  baseTitle: "ドット背景",
  category: "background",
  baseMood: ["柔らかい", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "セクション背景・カードリストの背景。BtoCの柔らかい印象づくり。",
  effect: "ランダムでないドットの規則性が、リッチでありつつ騒がしくない印象を作る。",
  suitableFor: ["BtoC", "教育", "メディア"],
  badUsage: "ドット同士の間隔が狭いと潰れて見える。最低16px間隔。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="dots-bg">…</div>`,
    css: `.dots-bg { background-image: radial-gradient(${color.hex}40 1px, transparent 1px); background-size: 18px 18px; }`,
    tailwind: `<div className="[background-size:18px_18px]" style={{ backgroundImage:"radial-gradient(${color.hex}40 1px, transparent 1px)" }}>…</div>`,
    react: `export function DotsBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="[background-size:18px_18px]" style={{ backgroundImage:"radial-gradient(${color.hex}40 1px, transparent 1px)" }}>
      {children}
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `セクションの背景を、18pxピッチの ${color.jp}ドット（${color.hex}40）パターンにしてください。背景色は白のままで、ドットだけが薄く乗っているイメージです。`,
};

const bgConic: ExtraArchetype<CV> = {
  id: "bg-conic-gradient",
  baseTitle: "コニックグラデ背景",
  category: "background",
  baseMood: ["モダン", "AI"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "AI/プロダクト系のFV背景。動かさなくても惹きつけられる。",
  effect: "中心から放射状に色が広がる。写真なしで世界観を作れる。",
  suitableFor: ["AI/SaaS LP", "モダンコーポレート"],
  badUsage: "古ブラウザ非対応。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="conic-bg">…</div>`,
    css: `.conic-bg { background: conic-gradient(from 0deg at 50% 50%, ${color.hex}33, transparent 30%, ${color.hex}22 60%, transparent 90%, ${color.hex}33); }`,
    tailwind: `<div style={{ background:"conic-gradient(from 0deg at 50% 50%, ${color.hex}33, transparent 30%, ${color.hex}22 60%, transparent 90%, ${color.hex}33)" }}>…</div>`,
    react: `export function ConicBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background:"conic-gradient(from 0deg at 50% 50%, ${color.hex}33, transparent 30%, ${color.hex}22 60%, transparent 90%, ${color.hex}33)" }}>
      {children}
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Hero背景を、中心から放射する ${color.jp}（${color.hex}）の薄いコニックグラデーションにしてください。透明と${color.hex}33が交互に出現するパターンで。`,
};

const bgAurora: ExtraArchetype<CV> = {
  id: "bg-aurora",
  baseTitle: "オーロラ背景（動)",
  category: "background",
  baseMood: ["高級感", "AI"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "ハイエンドプロダクト・AI系のヒーロー。世界観を作る決め手。",
  effect: "色のブロブがゆっくり動いて呼吸感を出す。動画なしで生命感が出る。",
  suitableFor: ["AI/SaaS", "ラグジュアリー"],
  badUsage: "速くするとチープになる。10秒以上の周期で。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="aurora">…</div>`,
    css: `.aurora { position:relative; overflow:hidden; isolation:isolate; }
.aurora::before, .aurora::after { content:""; position:absolute; width:60%; height:60%; border-radius:9999px; filter: blur(80px); opacity:.5; z-index:-1; }
.aurora::before { left:-10%; top:-10%; background:${color.hex}; animation: auroraA 14s ease-in-out infinite; }
.aurora::after { right:-10%; bottom:-10%; background:#5b8cff; animation: auroraB 16s ease-in-out infinite; }
@keyframes auroraA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20%,30%) scale(1.1)} }
@keyframes auroraB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20%,-25%) scale(1.15)} }`,
    tailwind: `// React版参照`,
    react: `export function AuroraBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <span className="absolute -left-10 -top-10 h-3/5 w-3/5 rounded-full blur-3xl" style={{ background:"${color.hex}", opacity:.5, animation:"auroraA 14s ease-in-out infinite" }} />
      <span className="absolute -bottom-10 -right-10 h-3/5 w-3/5 rounded-full blur-3xl" style={{ background:"#5b8cff", opacity:.5, animation:"auroraB 16s ease-in-out infinite" }} />
      <div className="relative">{children}</div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Hero背景に、${color.jp}（${color.hex}）と青の2つの blur(80px) のブロブをゆっくり動かす『オーロラ背景』を追加してください。各ブロブは独立した keyframes で 14s / 16s ease-in-out で translate と scale を動かします。`,
};

const bgNoise: ExtraArchetype<CV> = {
  id: "bg-noise",
  baseTitle: "ノイズ・グレイン背景",
  category: "background",
  baseMood: ["アート", "クラフト"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ポートフォリオ・ブランドサイト・写真メディアの背景。",
  effect: "薄いノイズで紙のような質感を出す。デジタルっぽさを和らげる。",
  suitableFor: ["クリエイティブエージェンシー", "ブランドサイト"],
  badUsage: "強くかけると読みにくくなる。opacity .04〜.08が無難。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="noise-bg">…</div>`,
    css: `.noise-bg { position:relative; background:${color.hex}10; }
.noise-bg::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:.06; mix-blend-mode: multiply; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }`,
    tailwind: `// React版参照`,
    react: `export function NoiseBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ background:"${color.hex}10" }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ opacity:.06, backgroundImage:"url(\\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\\")" }} />
      <div className="relative">{children}</div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `背景に薄い ${color.jp}（${color.hex}10）の地色 + SVG fractalNoise を opacity .06 / multiply で重ねる『ノイズ背景』を実装してください。紙のような質感が出ます。`,
};

/* ============================================================
   テキスト演出
   ============================================================ */

const textGradient: ExtraArchetype<CV> = {
  id: "text-gradient",
  baseTitle: "テキストグラデーション",
  category: "text",
  baseMood: ["モダン", "AI"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "見出しの強調ワード、Hero タイトルの一部、ロゴ風表示。",
  effect: "文字自体に色のフェードがかかり、見出しが格段に印象的になる。",
  suitableFor: ["AI/SaaS", "ハイエンドサービス"],
  badUsage: "本文や長文に使うと読みにくい。短い見出し限定で。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h1>未来を、<span class="grad">速く。</span></h1>`,
    css: `.grad { background: linear-gradient(135deg, ${color.hex}, #5b8cff); -webkit-background-clip: text; background-clip: text; color: transparent; }`,
    tailwind: `<h1 className="text-4xl font-bold">未来を、<span className="bg-gradient-to-br from-${color.tw}-500 to-blue-500 bg-clip-text text-transparent">速く。</span></h1>`,
    react: `export function GradientText({ children = "速く。" }) {
  return <span className="bg-gradient-to-br from-${color.tw}-500 to-blue-500 bg-clip-text text-transparent">{children}</span>;
}`,
  }),
  prompt: ({ color }) =>
    `見出し内のキーワードに、${color.jp}→青の135度グラデーション（${color.tw}-500 → blue-500）のテキストグラデを適用してください。bg-clip-text と text-transparent を使います。`,
};

const textMarker: ExtraArchetype<CV> = {
  id: "text-marker",
  baseTitle: "テキストマーカー（蛍光ペン）",
  category: "text",
  baseMood: ["BtoC", "ポップ"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "見出し内のキーワードを蛍光ペン風に強調。",
  effect: "下半分にカラーラインを敷くだけで自然に視線が集まる。",
  suitableFor: ["BtoC LP", "教育/コーチング", "個人ブランド"],
  badUsage: "BtoBの硬い文脈では子どもっぽい。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2>あなたの<span class="marker">仕事</span>を速く。</h2>`,
    css: `.marker { background-image: linear-gradient(transparent 60%, ${color.hex}55 60%); padding: 0 4px; }`,
    tailwind: `<span className="px-1" style={{ backgroundImage:"linear-gradient(transparent 60%, ${color.hex}55 60%)" }}>仕事</span>`,
    react: `export function MarkerText({ children = "仕事" }) {
  return (
    <span className="px-1" style={{ backgroundImage:"linear-gradient(transparent 60%, ${color.hex}55 60%)" }}>
      {children}
    </span>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しのキーワードに、${color.jp}（${color.hex}55）の蛍光ペン風マーカー（下60%だけ塗り潰す linear-gradient）を適用してください。`,
};

const textOutline: ExtraArchetype<CV> = {
  id: "text-outline",
  baseTitle: "アウトラインテキスト",
  category: "text",
  baseMood: ["クリエイティブ", "アート"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ポートフォリオの大見出し、アーティストサイトのキーメッセージ。",
  effect: "文字の塗りを抜いて輪郭線だけにする。アート性が一気に上がる。",
  suitableFor: ["クリエイティブエージェンシー", "アート", "ファッション"],
  badUsage: "長文で使うと読みにくい。短い英字や1単語に限定。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h1 class="outline-text">CREATE</h1>`,
    css: `.outline-text { font-size: 80px; font-weight: 900; -webkit-text-stroke: 2px ${color.hex}; color: transparent; }`,
    tailwind: `<h1 className="text-7xl font-black" style={{ WebkitTextStroke: "2px ${color.hex}", color: "transparent" }}>CREATE</h1>`,
    react: `export function OutlineText({ children = "CREATE" }) {
  return <h1 className="text-7xl font-black" style={{ WebkitTextStroke: "2px ${color.hex}", color: "transparent" }}>{children}</h1>;
}`,
  }),
  prompt: ({ color }) =>
    `大見出しを、塗りを抜いた『アウトラインテキスト』にしてください。${color.jp}（${color.hex}）のアウトライン2px、color: transparent。font-weight は 900。`,
};

const textShadowPop: ExtraArchetype<CV> = {
  id: "text-shadow-pop",
  baseTitle: "ポップ立体テキスト",
  category: "text",
  baseMood: ["ポップ", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "BtoC・キッズ向けサイトの『見出し』。POP的な明るさを出す時。",
  effect: "ハードな影で立体感を出すレトロ風表現。",
  suitableFor: ["BtoC LP", "アパレル", "イベント"],
  badUsage: "高級・落ち着き系には合わない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="pop-text">SUPER!</h2>`,
    css: `.pop-text { font-weight:800; color:#0a0a0a; text-shadow: 4px 4px 0 ${color.hex}; }`,
    tailwind: `<h2 className="text-5xl font-extrabold" style={{ textShadow:"4px 4px 0 ${color.hex}" }}>SUPER!</h2>`,
    react: `export function PopShadowText({ children = "SUPER!" }) {
  return <h2 className="text-5xl font-extrabold" style={{ textShadow:"4px 4px 0 ${color.hex}" }}>{children}</h2>;
}`,
  }),
  prompt: ({ color }) =>
    `見出しを、${color.jp}（${color.hex}）の 4px×4px のハード影が右下に落ちるレトロな立体テキストにしてください。`,
};

/* ============================================================
   SVG装飾
   ============================================================ */

const svgWave: ExtraArchetype<CV> = {
  id: "svg-wave",
  baseTitle: "波形ディバイダー",
  category: "svg",
  baseMood: ["柔らかい", "BtoC"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "セクション間のなめらかな区切り。",
  effect: "境界に動きが出て、流れている印象を与える。",
  suitableFor: ["BtoC", "教育/医療"],
  badUsage: "BtoBで多用すると軽くなる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg viewBox="0 0 1440 120" preserveAspectRatio="none" class="wave"><path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="${color.hex}"/></svg>`,
    css: `.wave { display:block; width:100%; height:80px; }`,
    tailwind: `<svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-20 w-full">
  <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="${color.hex}" />
</svg>`,
    react: `export function WaveDivider() {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-20 w-full">
      <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="${color.hex}" />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `セクション間の区切りに、${color.jp}（${color.hex}）の波形ディバイダーSVGを差し込んでください。viewBox 1440x120、preserveAspectRatio='none'。`,
};

const svgBlob: ExtraArchetype<CV> = {
  id: "svg-blob",
  baseTitle: "ブロブ装飾",
  category: "svg",
  baseMood: ["柔らかい", "クリエイティブ"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "ヒーローのオブジェ、画像の後ろに敷く色面、空白埋めの装飾。",
  effect: "形のない有機的な色塊で、画面に温度を加える。",
  suitableFor: ["BtoC", "クリエイティブエージェンシー", "個人ブランド"],
  badUsage: "硬いコーポレートサイトでは違和感。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg viewBox="0 0 200 200" class="blob"><path d="M44,-58C56,-46,64,-32,69,-16C73,-1,72,15,64,28C56,40,40,49,24,57C8,65,-9,73,-22,67C-35,62,-44,42,-52,24C-61,5,-68,-13,-64,-28C-60,-43,-44,-55,-29,-65C-13,-75,2,-82,17,-79C32,-77,46,-65,54,-52Z" transform="translate(100 100)" fill="${color.hex}"/></svg>`,
    css: `.blob { width:240px; height:240px; }`,
    tailwind: `<svg viewBox="0 0 200 200" className="h-60 w-60">
  <path d="M44,-58C56,-46,64,-32,69,-16C73,-1,72,15,64,28C56,40,40,49,24,57C8,65,-9,73,-22,67C-35,62,-44,42,-52,24C-61,5,-68,-13,-64,-28C-60,-43,-44,-55,-29,-65C-13,-75,2,-82,17,-79C32,-77,46,-65,54,-52Z" transform="translate(100 100)" fill="${color.hex}" />
</svg>`,
    react: `export function Blob() {
  return (
    <svg viewBox="0 0 200 200" className="h-60 w-60">
      <path d="M44,-58C56,-46,64,-32,69,-16C73,-1,72,15,64,28C56,40,40,49,24,57C8,65,-9,73,-22,67C-35,62,-44,42,-52,24C-61,5,-68,-13,-64,-28C-60,-43,-44,-55,-29,-65C-13,-75,2,-82,17,-79C32,-77,46,-65,54,-52Z" transform="translate(100 100)" fill="${color.hex}" />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Hero画像の背後に、${color.jp}（${color.hex}）の有機的なブロブ形SVGを敷いてください。サイズは 240x240、画像と少しズラして配置。`,
};

const svgZigzag: ExtraArchetype<CV> = {
  id: "svg-zigzag",
  baseTitle: "ジグザグ区切り",
  category: "svg",
  baseMood: ["ポップ", "BtoC"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "クーポン・チケット風カードの上下、BtoCのイベントLPの区切り。",
  effect: "ピンキングばさみで切ったような楽しい区切り。視覚的に賑やか。",
  suitableFor: ["イベントLP", "クーポン", "サブスクのプラン比較"],
  badUsage: "BtoBの真面目な文脈では浮く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg viewBox="0 0 100 10" preserveAspectRatio="none" class="zz"><path d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 Z" fill="${color.hex}"/></svg>`,
    css: `.zz { display:block; width:100%; height:14px; }`,
    tailwind: `<svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block h-3.5 w-full">
  <path d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 Z" fill="${color.hex}" />
</svg>`,
    react: `export function ZigzagDivider() {
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block h-3.5 w-full">
      <path d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 Z" fill="${color.hex}" />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `クーポンカード上下に、${color.jp}（${color.hex}）のジグザグ区切り（V字を10個並べた SVG path）を実装してください。preserveAspectRatio='none' で横幅にフィット。`,
};

/* ============================================================
   数字・実績
   ============================================================ */

const statBigNumber: ExtraArchetype<CV> = {
  id: "stat-big-number",
  baseTitle: "大きな実績数字",
  category: "stats",
  baseMood: ["BtoB", "信頼"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "実績セクションで導入企業数・継続率・削減時間などを目立たせる。",
  effect: "数字を巨大に出して即座に印象付ける。説得力が文章の何倍にもなる。",
  suitableFor: ["BtoB SaaS", "コンサル", "採用LP"],
  badUsage: "意味のない数字を並べないこと。単位や但し書きとセットで。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="big-stat"><div class="num">2,400+</div><div class="label">導入社数</div></div>`,
    css: `.big-stat { padding:20px; }
.big-stat .num { font-size:56px; font-weight:800; letter-spacing:-.02em; color:${color.hex}; line-height:1; }
.big-stat .label { color:#52525b; margin-top:8px; }`,
    tailwind: `<div className="p-5">
  <div className="text-5xl font-extrabold tracking-tight text-${color.tw}-500 leading-none">2,400+</div>
  <div className="mt-2 text-zinc-600">導入社数</div>
</div>`,
    react: `export function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-5">
      <div className="text-5xl font-extrabold tracking-tight text-${color.tw}-500 leading-none">{value}</div>
      <div className="mt-2 text-zinc-600">{label}</div>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `実績の数字を、${color.tw}-500 / font-extrabold / 56px の超大型表示にしてください。下に zinc-600 のラベル。`,
};

/* ============================================================
   フォーム
   ============================================================ */

const formFloating: ExtraArchetype<CV> = {
  id: "form-floating-label",
  baseTitle: "フローティングラベル入力",
  category: "form",
  baseMood: ["モダン", "BtoB"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "ログイン・問い合わせ・資料請求の入力欄。",
  effect: "フォーカス時にラベルが上に移動。スリムでモダンな印象。",
  suitableFor: ["BtoB SaaS", "シンプル系コーポレート"],
  badUsage: "プレースホルダ依存設計はアクセシビリティ的に良くない。フォーカスの色は明確に。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<label class="float">
  <input placeholder=" " />
  <span>メールアドレス</span>
</label>`,
    css: `.float { position:relative; display:block; }
.float input { width:100%; padding:18px 16px 6px; border:1px solid #e7e7eb; border-radius:10px; font-size:15px; color:#0a0a0a; background:#fff; outline:none; }
.float input:focus { border-color:${color.hex}; box-shadow: 0 0 0 3px ${color.hex}33; }
.float span { position:absolute; left:16px; top:14px; color:#a1a1aa; transition: all .18s ease; pointer-events:none; }
.float input:focus + span, .float input:not(:placeholder-shown) + span { top:4px; font-size:11px; color:${color.hex}; }`,
    tailwind: `// CSS 版を参照（peer-* で実装可）`,
    react: `export function FloatingInput({ label = "メールアドレス" }) {
  return (
    <label className="relative block">
      <input placeholder=" " className="peer w-full rounded-lg border border-zinc-200 bg-white px-4 pb-1.5 pt-[18px] text-[15px] outline-none focus:border-${color.tw}-500 focus:ring-4 focus:ring-${color.tw}-500/20" />
      <span className="pointer-events-none absolute left-4 top-3.5 text-zinc-400 transition-all peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-${color.tw}-500 peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-[11px]">{label}</span>
    </label>
  );
}`,
  }),
  prompt: ({ color }) =>
    `フォームの入力欄を、フォーカスでラベルが上に移動するフローティングラベル形式にしてください。フォーカス色は ${color.tw}-500、リングは ${color.tw}-500/20。peer / peer-focus を使った Tailwind 実装で。`,
};

const formSearch: ExtraArchetype<CV> = {
  id: "form-search",
  baseTitle: "検索バー",
  category: "form",
  baseMood: ["ミニマル", "BtoB"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "サイト内検索、リスト検索、サジェスト付き検索。",
  effect: "アイコン付きの広めの検索バーで、即座に『検索できる』と伝える。",
  suitableFor: ["メディア", "EC", "SaaS"],
  badUsage: "アイコンを省略すると気付かれにくい。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<form class="search">
  <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="11" cy="11" r="7" stroke="#a1a1aa" fill="none" stroke-width="2"/><path d="M16 16 L21 21" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"/></svg>
  <input placeholder="検索…" />
</form>`,
    css: `.search { display:flex; align-items:center; gap:10px; padding:10px 16px; border:1px solid #e7e7eb; border-radius:9999px; background:#fff; }
.search:focus-within { border-color:${color.hex}; box-shadow: 0 0 0 4px ${color.hex}22; }
.search input { flex:1; border:none; outline:none; font-size:15px; background:transparent; color:#0a0a0a; }`,
    tailwind: `<form className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 transition focus-within:border-${color.tw}-500 focus-within:ring-4 focus-within:ring-${color.tw}-500/20">
  <svg viewBox="0 0 24 24" width="18" height="18" className="text-zinc-400">
    <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" strokeWidth="2"/>
    <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  <input placeholder="検索…" className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-zinc-400" />
</form>`,
    react: `export function SearchBar() {
  return (
    <form className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2.5 transition focus-within:border-${color.tw}-500 focus-within:ring-4 focus-within:ring-${color.tw}-500/20">
      <svg viewBox="0 0 24 24" width="18" height="18" className="text-zinc-400">
        <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" strokeWidth="2"/>
        <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input placeholder="検索…" className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-zinc-400" />
    </form>
  );
}`,
  }),
  prompt: ({ color }) =>
    `グローバルナビにアイコン付きの pill 検索バーを追加してください。フォーカス時 border-${color.tw}-500 + ring-4 ${color.tw}-500/20。アイコンはSVGの虫眼鏡。`,
};

/* ============================================================
   FAQ
   ============================================================ */

const faqPlus: ExtraArchetype<CV> = {
  id: "faq-plus",
  baseTitle: "+/×アイコンFAQ",
  category: "faq",
  baseMood: ["BtoB", "ミニマル"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "料金ページ・サポートページ末尾のFAQ。",
  effect: "+が×に回転して開閉を伝える、最も一般的で誤解されないFAQ。",
  suitableFor: ["BtoB", "コーポレート", "EC"],
  badUsage: "+を出さないとクリック対象に気付かれにくい。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<details class="faq-plus"><summary>料金はどこに？<span>+</span></summary><div>料金ページに3プラン記載しています。</div></details>`,
    css: `.faq-plus { border-bottom: 1px solid #e7e7eb; padding: 18px 0; }
.faq-plus summary { cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; font-weight:600; color:#0a0a0a; }
.faq-plus summary span { color:${color.hex}; transition: transform .25s ease; }
.faq-plus[open] summary span { transform: rotate(45deg); }
.faq-plus div { color:#52525b; padding-top:10px; }`,
    tailwind: `<details className="group border-b border-zinc-200 py-4">
  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-zinc-900">
    料金はどこに？
    <span className="text-${color.tw}-500 transition group-open:rotate-45">+</span>
  </summary>
  <p className="pt-2 text-zinc-600">料金ページに3プラン記載しています。</p>
</details>`,
    react: `export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-zinc-200 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-zinc-900">
        {q}
        <span className="text-${color.tw}-500 transition group-open:rotate-45">+</span>
      </summary>
      <p className="pt-2 text-zinc-600">{a}</p>
    </details>
  );
}`,
  }),
  prompt: ({ color }) =>
    `FAQを <details>/<summary> で構築し、右端の + アイコン（${color.tw}-500）が開いたとき rotate-45 で × になる仕様にしてください。Tailwind の group / group-open を使ってください。`,
};

/* ============================================================
   空状態 / エラー
   ============================================================ */

const emptyState: ExtraArchetype<CV> = {
  id: "empty-state",
  baseTitle: "空状態UI",
  category: "empty",
  baseMood: ["BtoB", "管理画面"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "リストが0件、検索結果なし、初回未登録時の管理画面。",
  effect: "『何もない』を悲しい画面にせず、次の一手を促す。",
  suitableFor: ["SaaS管理画面", "メール/タスク系", "検索結果"],
  badUsage: "本当に何もないだけのページにすると、ユーザーが詰む。必ずアクションを置く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="empty"><div class="art">📭</div><h3>まだ何もありません</h3><p>最初の項目を作って始めましょう。</p><button>＋ 新規作成</button></div>`,
    css: `.empty { text-align:center; padding:56px 24px; border:1px dashed #e4e4e7; border-radius:16px; }
.empty .art { font-size:40px; margin-bottom:8px; }
.empty h3 { font-weight:600; color:#0a0a0a; }
.empty p { color:#52525b; margin:6px 0 16px; }
.empty button { padding:8px 16px; border-radius:9999px; background:${color.hex}; color:#fff; font-weight:600; }`,
    tailwind: `<div className="rounded-2xl border border-dashed border-zinc-300 p-14 text-center">
  <div className="mb-2 text-4xl">📭</div>
  <h3 className="font-semibold text-zinc-900">まだ何もありません</h3>
  <p className="mt-1.5 text-zinc-500">最初の項目を作って始めましょう。</p>
  <button className="mt-4 rounded-full bg-${color.tw}-500 px-4 py-2 font-semibold text-white">＋ 新規作成</button>
</div>`,
    react: `export function EmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 p-14 text-center">
      <div className="mb-2 text-4xl">📭</div>
      <h3 className="font-semibold text-zinc-900">まだ何もありません</h3>
      <p className="mt-1.5 text-zinc-500">最初の項目を作って始めましょう。</p>
      <button onClick={onCreate} className="mt-4 rounded-full bg-${color.tw}-500 px-4 py-2 font-semibold text-white">＋ 新規作成</button>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `リストが0件のときの『空状態UI』を実装してください。中央寄せ、絵文字、見出し『まだ何もありません』、補足、${color.tw}-500 の主CTA『＋ 新規作成』、点線の枠で囲む。`,
};

const errorState: ExtraArchetype<CV> = {
  id: "error-state",
  baseTitle: "エラー状態UI",
  category: "empty",
  baseMood: ["BtoB", "管理画面"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "API失敗、500/404、フォーム送信失敗。",
  effect: "原因と次の行動を1画面で示し、ユーザーの『詰み』を防ぐ。",
  suitableFor: ["管理画面", "SaaS", "EC"],
  badUsage: "『エラーが発生しました』だけで終わるのは最悪。再試行/問い合わせ動線を必ずセット。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="err"><div class="ic">!</div><h3>読み込みに失敗</h3><p>ネットワークをご確認ください。</p><button>再試行</button></div>`,
    css: `.err { text-align:center; padding:40px 24px; border:1px dashed #e4e4e7; border-radius:16px; }
.err .ic { width:44px; height:44px; line-height:44px; border-radius:9999px; background: rgba(244,63,94,.15); color:#f43f5e; margin: 0 auto 12px; font-weight:700; }
.err h3 { font-weight:600; color:#0a0a0a; }
.err p { color:#52525b; margin:6px 0 16px; }
.err button { padding:8px 16px; border-radius:9999px; background:${color.hex}; color:#fff; font-weight:600; }`,
    tailwind: `<div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-500">!</div>
  <h3 className="font-semibold text-zinc-900">読み込みに失敗しました</h3>
  <p className="mt-1.5 text-zinc-500">ネットワーク接続をご確認のうえ、再試行してください。</p>
  <button className="mt-4 rounded-full bg-${color.tw}-500 px-4 py-2 font-semibold text-white">再試行</button>
</div>`,
    react: `export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-500">!</div>
      <h3 className="font-semibold text-zinc-900">読み込みに失敗しました</h3>
      <p className="mt-1.5 text-zinc-500">ネットワーク接続をご確認のうえ、再試行してください。</p>
      <button onClick={onRetry} className="mt-4 rounded-full bg-${color.tw}-500 px-4 py-2 font-semibold text-white">再試行</button>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `読み込み失敗時の『エラー状態UI』を実装してください。中央寄せ、赤系の!アイコン、見出し『読み込みに失敗しました』、説明、${color.tw}-500 の再試行ボタン、点線枠。`,
};

/* ============================================================
   Hero
   ============================================================ */

const heroCentered: ExtraArchetype<CV> = {
  id: "hero-centered",
  baseTitle: "中央寄せヒーロー",
  category: "hero",
  baseMood: ["上品", "BtoB"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "シンプルなコーポレート、ブランドサイト、ポートフォリオのトップ。",
  effect: "テキストを中央寄せにして、第一印象を『直球で』作る。情報量が少ないほど効く。",
  suitableFor: ["コーポレート", "ブランドサイト", "ポートフォリオ"],
  badUsage: "情報が多いLPでは余白が大きくなりすぎる。BtoBの製品ページには向かない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-c">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="flex flex-col items-center text-center px-6 py-24">
  <span className="rounded-full px-3 py-1 text-xs font-semibold bg-${color.tw}-100 text-${color.tw}-700">2026 リリース</span>
  <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900">
    未来を、<span className="text-${color.tw}-500">速く。</span>
  </h1>
  <p className="mt-5 max-w-xl text-zinc-600">サービスの説明文がここに入ります。</p>
  <div className="mt-8 flex gap-3">
    <button className="rounded-full bg-${color.tw}-500 px-5 py-3 font-semibold text-white">無料で試す</button>
    <button className="rounded-full border border-zinc-300 px-5 py-3 font-semibold text-zinc-700">資料請求</button>
  </div>
</section>`,
    react: `export function CenteredHero() {
  return (
    <section className="flex flex-col items-center text-center px-6 py-24">
      <span className="rounded-full bg-${color.tw}-100 px-3 py-1 text-xs font-semibold text-${color.tw}-700">2026 リリース</span>
      <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900">
        未来を、<span className="text-${color.tw}-500">速く。</span>
      </h1>
      <p className="mt-5 max-w-xl text-zinc-600">サービスの説明文がここに入ります。</p>
      <div className="mt-8 flex gap-3">
        <button className="rounded-full bg-${color.tw}-500 px-5 py-3 font-semibold text-white">無料で試す</button>
        <button className="rounded-full border border-zinc-300 px-5 py-3 font-semibold text-zinc-700">資料請求</button>
      </div>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `中央寄せヒーローを実装してください。上から: ${color.tw}-100 背景の小バッジ、巨大見出し（強調ワードに ${color.tw}-500）、リード文（max-w-xl）、主CTA(${color.tw}-500)+二次CTA。Tailwindで縦並び中央揃え、py-24。`,
};

const heroMinimal: ExtraArchetype<CV> = {
  id: "hero-minimal",
  baseTitle: "ミニマルヒーロー",
  category: "hero",
  baseMood: ["ミニマル", "高級感"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "ブランドサイト・建築・ファッションなど『静』のヒーロー。",
  effect: "巨大なタイトルと1行のサブのみ。装飾を捨てることで世界観を残す。",
  suitableFor: ["ブランド", "建築", "ファッション"],
  badUsage: "BtoB製品の説明には情報が足りない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-min">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="px-6 py-32">
  <h1 className="text-6xl sm:text-8xl font-black tracking-[-0.02em] leading-[0.95] text-zinc-900">
    Make it <span className="text-${color.tw}-500">real.</span>
  </h1>
  <p className="mt-8 max-w-md text-lg text-zinc-500">あなたのアイデアを、最短距離で形に。</p>
</section>`,
    react: `export function MinimalHero() {
  return (
    <section className="px-6 py-32">
      <h1 className="text-6xl sm:text-8xl font-black leading-[0.95] tracking-[-0.02em] text-zinc-900">
        Make it <span className="text-${color.tw}-500">real.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-zinc-500">あなたのアイデアを、最短距離で形に。</p>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ミニマルヒーローを実装してください。装飾なし、巨大な見出し（font-black, sm:text-8xl, line-height 0.95, letter-spacing -0.02em、最後の単語だけ ${color.tw}-500）、その下に max-w-md の text-lg リード文のみ。py-32。`,
};

const heroGradient: ExtraArchetype<CV> = {
  id: "hero-gradient-bg",
  baseTitle: "グラデ背景ヒーロー",
  category: "hero",
  baseMood: ["AI", "モダン"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "AI/SaaS/モダンプロダクトのフルブリードヒーロー。",
  effect: "全面のソフトグラデ背景で世界観を作り、白文字で見出しを置く。動画なしで重厚感。",
  suitableFor: ["AI/SaaS LP", "モダンコーポレート"],
  badUsage: "コントラストが弱いと文字が読みにくい。グラデの暗い側にテキストを配置する。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-g">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="relative overflow-hidden rounded-3xl px-8 py-24"
  style={{ background: \`linear-gradient(135deg, ${color.hex}, #1a1a2e)\` }}>
  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">NEW</span>
  <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight text-white sm:text-6xl">
    AIで、仕事を最短に。
  </h1>
  <p className="mt-5 max-w-xl text-white/80">面倒な作業をすべて自動化。</p>
  <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-zinc-900">無料で始める</button>
</section>`,
    react: `export function GradientHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl px-8 py-24"
      style={{ background: "linear-gradient(135deg, ${color.hex}, #1a1a2e)" }}>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">NEW</span>
      <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight text-white sm:text-6xl">AIで、仕事を最短に。</h1>
      <p className="mt-5 max-w-xl text-white/80">面倒な作業をすべて自動化。</p>
      <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-zinc-900">無料で始める</button>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `フルブリードのグラデ背景ヒーローを実装してください。背景は linear-gradient(135deg, ${color.hex}, #1a1a2e)、上から白いバッジ・白い大見出し・白80%リード文・白ボタンに濃い文字。py-24、overflow-hidden、rounded-3xl。`,
};

const heroBadgeNews: ExtraArchetype<CV> = {
  id: "hero-news-strip",
  baseTitle: "お知らせ帯付きヒーロー",
  category: "hero",
  baseMood: ["BtoB", "プロダクト"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "新機能リリース・キャンペーン告知付きでHeroを兼ねる時。",
  effect: "Hero上部の小さな帯リンクで『新着情報』を一行ぶち込め、本文は別に集中できる。",
  suitableFor: ["プロダクトLP", "BtoB SaaS", "コンサル"],
  badUsage: "帯にも本文にもCTAを置くと混乱する。一本化を。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-news">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="px-6 py-24 text-center">
  <a className="inline-flex items-center gap-2 rounded-full border border-${color.tw}-200 bg-${color.tw}-50 px-4 py-1.5 text-xs font-semibold text-${color.tw}-700 hover:bg-${color.tw}-100">
    🎉 v2.0 をリリースしました <span>→</span>
  </a>
  <h1 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
    すべての作業を、<span className="text-${color.tw}-500">ひとつに。</span>
  </h1>
  <p className="mx-auto mt-5 max-w-xl text-zinc-600">説明文。</p>
  <button className="mt-8 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">いますぐ始める</button>
</section>`,
    react: `export function NewsStripHero() {
  return (
    <section className="px-6 py-24 text-center">
      <a className="inline-flex items-center gap-2 rounded-full border border-${color.tw}-200 bg-${color.tw}-50 px-4 py-1.5 text-xs font-semibold text-${color.tw}-700 hover:bg-${color.tw}-100">
        🎉 v2.0 をリリースしました <span>→</span>
      </a>
      <h1 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
        すべての作業を、<span className="text-${color.tw}-500">ひとつに。</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-zinc-600">説明文。</p>
      <button className="mt-8 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">いますぐ始める</button>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Heroの上に『お知らせ帯リンク』（${color.tw}-50/200/700 で構成、絵文字+矢印付き）を置き、その下に中央寄せの大見出し・リード文・主CTA を並べる構成にしてください。`,
};

const heroStats: ExtraArchetype<CV> = {
  id: "hero-with-stats",
  baseTitle: "数字付きヒーロー",
  category: "hero",
  baseMood: ["BtoB", "信頼"],
  baseTags: ["Tailwind"],
  difficulty: "easy",
  useCase: "BtoB SaaS で実績を即座に見せたい時、エンタープライズ向け訴求。",
  effect: "Hero下部に3つの実績数字を並べることで、見出しの説得力が格段に上がる。",
  suitableFor: ["BtoB SaaS", "コンサル", "エンタープライズ"],
  badUsage: "盛った数字は逆効果。出典/単位を必ず添える。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-stats">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="px-6 py-24">
  <h1 className="text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl">
    エンタープライズの、<br/><span className="text-${color.tw}-500">最後のSaaS。</span>
  </h1>
  <p className="mt-5 max-w-xl text-zinc-600">面倒な業務はすべて自動化。</p>
  <button className="mt-8 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">資料請求</button>
  <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
    {[
      { v: "2,400+", l: "導入社数" },
      { v: "99.9%", l: "稼働率" },
      { v: "120h", l: "月間削減工数" },
    ].map(s => (
      <div key={s.l}>
        <dt className="text-3xl font-extrabold text-${color.tw}-500">{s.v}</dt>
        <dd className="mt-1 text-zinc-500">{s.l}</dd>
      </div>
    ))}
  </dl>
</section>`,
    react: `export function StatsHero() {
  const stats = [{ v:"2,400+", l:"導入社数" },{ v:"99.9%", l:"稼働率" },{ v:"120h", l:"月間削減工数" }];
  return (
    <section className="px-6 py-24">
      <h1 className="text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl">エンタープライズの、<br/><span className="text-${color.tw}-500">最後のSaaS。</span></h1>
      <p className="mt-5 max-w-xl text-zinc-600">面倒な業務はすべて自動化。</p>
      <button className="mt-8 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">資料請求</button>
      <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
        {stats.map(s => (
          <div key={s.l}>
            <dt className="text-3xl font-extrabold text-${color.tw}-500">{s.v}</dt>
            <dd className="mt-1 text-zinc-500">{s.l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `Hero下部に、border-t pt-8 で区切った3列の実績数字（導入社数 / 稼働率 / 削減工数）を置いてください。数値は ${color.tw}-500 の text-3xl extrabold、ラベルは zinc-500。`,
};

const heroMockup: ExtraArchetype<CV> = {
  id: "hero-mockup",
  baseTitle: "モックアップ付きヒーロー",
  category: "hero",
  baseMood: ["プロダクト", "テック"],
  baseTags: ["Tailwind"],
  difficulty: "medium",
  useCase: "SaaS/アプリのトップ。製品スクリーンショットや UI モックを見せる定番。",
  effect: "右側に浮遊するUIモックを置くことで、製品が『何を提供するか』を絵で先に見せられる。",
  suitableFor: ["SaaS", "モバイル/Webアプリ"],
  badUsage: "モックの解像度が荒いと逆効果。Retina対応必須。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-mockup">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="grid grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-[1fr,1.1fr]">
  <div>
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">作業を、もっと<span className="text-${color.tw}-500">速く。</span></h1>
    <p className="mt-5 text-zinc-600">説明文がここに入ります。</p>
    <button className="mt-7 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">無料で試す</button>
  </div>
  <div className="relative">
    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xl">
      <div className="rounded-xl bg-gradient-to-br from-${color.tw}-100 to-blue-100 aspect-[16/10]" />
    </div>
    <div className="absolute -bottom-6 -left-6 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl">
      <div className="h-10 w-32 rounded bg-gradient-to-r from-${color.tw}-200 to-blue-200" />
    </div>
  </div>
</section>`,
    react: `export function MockupHero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-[1fr,1.1fr]">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">作業を、もっと<span className="text-${color.tw}-500">速く。</span></h1>
        <p className="mt-5 text-zinc-600">説明文がここに入ります。</p>
        <button className="mt-7 rounded-full bg-${color.tw}-500 px-6 py-3 font-semibold text-white">無料で試す</button>
      </div>
      <div className="relative">
        <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-2xl">
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-${color.tw}-100 to-blue-100" />
        </div>
        <div className="absolute -bottom-6 -left-6 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl">
          <div className="h-10 w-32 rounded bg-gradient-to-r from-${color.tw}-200 to-blue-200" />
        </div>
      </div>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `製品モックアップ付きヒーローを実装してください。lg で2カラム（テキスト 1fr / モック 1.1fr）。右側はメインのモックカード（rounded-2xl, shadow-2xl, 16:10）と、左下に小さい補助カード（${color.tw}-200 → blue-200 のグラデ）を絶対配置で重ねて立体感を出します。`,
};

const heroDiagonal: ExtraArchetype<CV> = {
  id: "hero-diagonal",
  baseTitle: "斜め分割ヒーロー",
  category: "hero",
  baseMood: ["勢い", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "キャンペーン・セール・イベントの告知LP。",
  effect: "斜めに分割された背景で勢いを表現。動きのある印象を作れる。",
  suitableFor: ["BtoC LP", "イベント", "セール"],
  badUsage: "BtoBの落ち着いた業種では浮く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-diag">…</section>`,
    css: `.hero-diag { position: relative; padding: 96px 32px; isolation: isolate; }
.hero-diag::before { content: ""; position: absolute; inset: 0; background: ${color.hex}; clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%); z-index: -1; }`,
    tailwind: `<section className="relative isolate overflow-hidden px-8 py-24">
  <div className="absolute inset-0 -z-10" style={{ background:"${color.hex}", clipPath:"polygon(0 0, 60% 0, 40% 100%, 0 100%)" }} />
  <h1 className="text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl">
    Spring <span className="text-white">SALE</span><br/>開催中。
  </h1>
  <p className="mt-5 max-w-xl text-zinc-700">期間中、全商品20%OFF。</p>
  <button className="mt-8 rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white">いますぐチェック</button>
</section>`,
    react: `export function DiagonalHero() {
  return (
    <section className="relative isolate overflow-hidden px-8 py-24">
      <div className="absolute inset-0 -z-10" style={{ background: "${color.hex}", clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)" }} />
      <h1 className="text-5xl font-bold leading-tight text-zinc-900 sm:text-6xl">Spring <span className="text-white">SALE</span><br/>開催中。</h1>
      <p className="mt-5 max-w-xl text-zinc-700">期間中、全商品20%OFF。</p>
      <button className="mt-8 rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white">いますぐチェック</button>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `斜め分割ヒーローを実装してください。背景に absolute で ${color.hex} の塗りを clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%) で斜めに切ったものを敷き、その上に見出し（『SALE』だけ白文字）・リード・黒CTAを置きます。`,
};

const heroVideoBg: ExtraArchetype<CV> = {
  id: "hero-video-bg",
  baseTitle: "動画背景風ヒーロー（疑似）",
  category: "hero",
  baseMood: ["高級感", "プロダクト"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "ブランドサイト・観光・アパレルのトップで動画背景の代わりに使う。",
  effect: "ぼかしたグラデ＋薄いノイズで動画背景の雰囲気を演出。本物の動画より軽い。",
  suitableFor: ["ブランド", "観光", "アパレル"],
  badUsage: "そのうえに置く文字とのコントラストが弱いと読めない。暗いオーバーレイを忘れずに。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-vid">…</section>`,
    css: `/* React版を参照 */`,
    tailwind: `<section className="relative overflow-hidden rounded-3xl px-8 py-24 text-white">
  <div aria-hidden className="absolute inset-0 -z-10" style={{ background: \`radial-gradient(at 20% 20%, ${color.hex}, transparent 60%), radial-gradient(at 80% 80%, #1e40af, transparent 60%), linear-gradient(180deg, #0f0f1a, #0a0a14)\` }} />
  <div aria-hidden className="absolute inset-0 -z-10 bg-black/30" />
  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">FEATURED</span>
  <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight sm:text-6xl">空気を、<span className="text-${color.tw}-200">記憶する。</span></h1>
  <p className="mt-5 max-w-xl text-white/80">説明文。</p>
  <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-zinc-900">詳しく見る</button>
</section>`,
    react: `export function VideoLikeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl px-8 py-24 text-white">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background:"radial-gradient(at 20% 20%, ${color.hex}, transparent 60%), radial-gradient(at 80% 80%, #1e40af, transparent 60%), linear-gradient(180deg, #0f0f1a, #0a0a14)" }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/30" />
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">FEATURED</span>
      <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight sm:text-6xl">空気を、<span className="text-${color.tw}-200">記憶する。</span></h1>
      <p className="mt-5 max-w-xl text-white/80">説明文。</p>
      <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-zinc-900">詳しく見る</button>
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `動画背景の代わりに、暗い radial-gradient を2つ重ねて movie-still のような雰囲気を作るヒーローを実装してください。${color.hex} と #1e40af の2点ハイライト + 黒30%のオーバーレイ。文字は白、強調は ${color.tw}-200。py-24 の rounded-3xl ブロック。`,
};

const heroSplit: ExtraArchetype<CV> = {
  id: "hero-split",
  baseTitle: "二分割ヒーロー",
  category: "hero",
  baseMood: ["BtoB", "整理"],
  baseTags: ["Tailwind"],
  difficulty: "medium",
  useCase: "BtoBサービスのトップ。テキストとビジュアルを左右に並べる定番。",
  effect: "情報を読ませる導線が明確になる。Hero制作の第一手。",
  suitableFor: ["BtoB SaaS", "コンサル", "代理店"],
  badUsage: "右側のビジュアルが弱いと寂しい。グラデor図解を必ず置く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<section class="hero-split">…</section>`,
    css: `/* レスポンシブの本格実装は React版を */`,
    tailwind: `<section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
  <div>
    <span className="inline-block rounded-full bg-${color.tw}-100 px-3 py-1 text-xs font-semibold text-${color.tw}-700">NEW</span>
    <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">未来を、<span className="text-${color.tw}-500">速く。</span></h1>
    <p className="mt-4 text-zinc-600">サービスの説明文がここに入ります。</p>
    <div className="mt-6 flex gap-3">
      <button className="rounded-full bg-${color.tw}-500 px-5 py-2.5 font-semibold text-white">無料で試す</button>
      <button className="rounded-full border border-zinc-300 px-5 py-2.5 font-semibold text-zinc-700">資料請求</button>
    </div>
  </div>
  <div className="aspect-square rounded-3xl bg-gradient-to-br from-${color.tw}-200 via-${color.tw}-100 to-blue-100" />
</section>`,
    react: `export function SplitHero() {
  return (
    <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <div>
        <span className="inline-block rounded-full bg-${color.tw}-100 px-3 py-1 text-xs font-semibold text-${color.tw}-700">NEW</span>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">未来を、<span className="text-${color.tw}-500">速く。</span></h1>
        <p className="mt-4 text-zinc-600">サービスの説明文がここに入ります。</p>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-${color.tw}-500 px-5 py-2.5 font-semibold text-white">無料で試す</button>
          <button className="rounded-full border border-zinc-300 px-5 py-2.5 font-semibold text-zinc-700">資料請求</button>
        </div>
      </div>
      <div className="aspect-square rounded-3xl bg-gradient-to-br from-${color.tw}-200 via-${color.tw}-100 to-blue-100" />
    </section>
  );
}`,
  }),
  prompt: ({ color }) =>
    `2分割ヒーローを実装してください。左にバッジ＋見出し（強調ワードに ${color.tw}-500）＋本文＋主／二次ボタン、右に正方形のグラデ（${color.tw}-200 → ${color.tw}-100 → blue-100）。lg で2カラム、それ以下で1カラム。`,
};

/* ============================================================
   アイコン演出 / 効果
   ============================================================ */

const iconLightbulb: ExtraArchetype<CV> = {
  id: "icon-lightbulb",
  baseTitle: "電球がつく",
  category: "icon",
  baseMood: ["フレンドリー", "ポップ"],
  baseTags: ["SVG", "CSS"],
  difficulty: "medium",
  useCase: "「アイデア」「発見」「ヒント」のセクション。AIや学習系アプリの示唆メッセージ。",
  effect: "電球本体がぼわっと光り、外周に光線が広がる。『ひらめき』を直感で伝える。",
  suitableFor: ["AIプロダクト", "教育/学習サービス", "ヘルプセンター"],
  badUsage: "汎用ロード扱いはNG。『気づき』の文脈に絞る。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="bulb" viewBox="0 0 64 64">
  <g class="rays" stroke="${color.hex}" stroke-width="2" stroke-linecap="round">
    <line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/>
    <line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/>
    <line x1="14" y1="14" x2="18" y2="18"/><line x1="46" y1="46" x2="50" y2="50"/>
    <line x1="50" y1="14" x2="46" y2="18"/><line x1="18" y1="46" x2="14" y2="50"/>
  </g>
  <g class="body">
    <path d="M22 26 a10 10 0 1 1 20 0 c0 6 -4 8 -4 12 h-12 c0 -4 -4 -6 -4 -12 z" fill="${color.hex}" stroke="${color.hex}" stroke-width="2"/>
    <rect x="26" y="42" width="12" height="3" rx="1" fill="#0a0a0a"/>
    <rect x="28" y="46" width="8" height="3" rx="1" fill="#0a0a0a"/>
  </g>
</svg>`,
    css: `.bulb { width: 80px; height: 80px; color: ${color.hex}; }
.bulb .body { animation: bulbGlow 2.4s ease-in-out infinite; transform-origin: 32px 32px; }
.bulb .rays { animation: bulbRays 2.4s ease-in-out infinite; transform-origin: 32px 32px; }`,
    tailwind: `// React版を参照`,
    react: `export function LightbulbIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" style={{ color: "${color.hex}" }}>
      <g style={{ transformOrigin: "32px 32px", animation: "bulbRays 2.4s ease-in-out infinite" }}
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/>
        <line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/>
        <line x1="14" y1="14" x2="18" y2="18"/><line x1="46" y1="46" x2="50" y2="50"/>
        <line x1="50" y1="14" x2="46" y2="18"/><line x1="18" y1="46" x2="14" y2="50"/>
      </g>
      <g style={{ transformOrigin: "32px 32px", animation: "bulbGlow 2.4s ease-in-out infinite" }}>
        <path d="M22 26 a10 10 0 1 1 20 0 c0 6 -4 8 -4 12 h-12 c0 -4 -4 -6 -4 -12 z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        <rect x="26" y="42" width="12" height="3" rx="1" fill="#0a0a0a"/>
        <rect x="28" y="46" width="8" height="3" rx="1" fill="#0a0a0a"/>
      </g>
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `『電球がぼわっと光る』アイコンをSVGで実装してください。色は ${color.tw}-500（${color.hex}）。電球本体は opacity と drop-shadow をkeyframeで揺らし、外周の8本の光線は scale(.7)→scale(1) で消えて出現を繰り返します。2.4秒ループ。`,
};

const iconGears: ExtraArchetype<CV> = {
  id: "icon-gears",
  baseTitle: "歯車が噛み合って回転",
  category: "icon",
  baseMood: ["テック", "プロセス"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "「処理中」「最適化中」「セットアップ中」など、機構的な進捗の演出。",
  effect: "2つの歯車が逆方向に回り、物事が『動いている』と直感的に伝わる。",
  suitableFor: ["管理画面のセットアップ", "ビルド/デプロイ画面", "技術プロダクト"],
  badUsage: "BtoCの可愛い系プロダクトには硬い印象。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="gears" viewBox="0 0 100 64">
  <g class="g1" transform="translate(30 32)"><!-- gear path --></g>
  <g class="g2" transform="translate(70 32)"><!-- gear path --></g>
</svg>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `function Gear({ size = 26, color = "${color.hex}" }: { size?: number; color?: string }) {
  // 8歯の歯車を SVG path で
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g>
      <circle r={size * 0.55} fill={color} />
      {teeth.map((deg) => (
        <rect key={deg} x={-size * 0.13} y={-size * 0.95} width={size * 0.26} height={size * 0.4}
              fill={color} transform={\`rotate(\${deg})\`} rx="1.5" />
      ))}
      <circle r={size * 0.22} fill="#fff" />
    </g>
  );
}
export function GearsIcon() {
  return (
    <svg viewBox="0 0 100 64" className="h-20 w-32">
      <g transform="translate(34 32)" style={{ transformOrigin: "34px 32px", animation: "gearCw 4s linear infinite", transformBox: "fill-box" }}>
        <Gear size={26} />
      </g>
      <g transform="translate(70 24)" style={{ transformOrigin: "70px 24px", animation: "gearCcw 3s linear infinite", transformBox: "fill-box" }}>
        <Gear size={18} />
      </g>
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `2つの歯車（${color.tw}-500）が左大・右小で噛み合って逆回転するSVGアイコンを実装してください。各歯車は中心円＋8本の歯（rect）で構成。左は4秒で時計回り、右は3秒で反時計回り、無限ループ。`,
};

const iconRocket: ExtraArchetype<CV> = {
  id: "icon-rocket",
  baseTitle: "ロケット発射",
  category: "icon",
  baseMood: ["勢い", "ポップ"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "「公開しました」「デプロイ完了」「アップデート」「リリース告知」。",
  effect: "ロケット絵文字が斜めに上昇し、煙の尾を残してフェードアウト。前進感を爆発的に演出。",
  suitableFor: ["BtoC LP", "プロダクトリリース", "ゲーミフィケーション"],
  badUsage: "BtoBの真面目な業種では幼く見える。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="rocket"><span class="ship">🚀</span><span class="smoke"></span></div>`,
    css: `.rocket { position:relative; width: 80px; height: 80px; }
.rocket .ship { position:absolute; bottom:0; left:50%; font-size: 36px; transform: translate(-50%) rotate(-45deg); animation: rocketLift 2s ease-out infinite; }
.rocket .smoke { position: absolute; bottom: 6px; left: 50%; width: 14px; height: 14px; border-radius: 50%; background: ${color.hex}; transform: translate(-50%); opacity: .6; animation: rocketSmoke 2s ease-out infinite; }`,
    tailwind: `// React版を参照`,
    react: `export function RocketIcon() {
  return (
    <div className="relative h-20 w-20">
      <span className="absolute bottom-0 left-1/2 text-4xl"
        style={{ transform: "translateX(-50%) rotate(-45deg)", animation: "rocketLift 2s ease-out infinite" }}>
        🚀
      </span>
      <span className="absolute h-3.5 w-3.5 rounded-full"
        style={{ left: "50%", bottom: 6, transform: "translateX(-50%)", background: "${color.hex}", opacity: .6, animation: "rocketSmoke 2s ease-out infinite" }} />
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `ロケット絵文字（🚀）が斜め上に発射され、下に ${color.tw}-500 の煙が広がってフェードアウトする演出を実装してください。ロケットは2秒ease-outで -45deg のまま translateY(-90px)、煙は scale(1)→scale(2) でフェードアウト。`,
};

const iconFireworks: ExtraArchetype<CV> = {
  id: "icon-fireworks",
  baseTitle: "花火",
  category: "icon",
  baseMood: ["ポップ", "祝福"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "「達成しました」「登録完了」「お祝い」のお祝いトースト。",
  effect: "中心から8方向にカラフルな粒子が爆発。完了の喜びを最大化。",
  suitableFor: ["オンボーディング完了", "ゲーム", "チェックアウト完了画面"],
  badUsage: "BtoB業務では浮く。汎用ロードには使わない。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="fw" viewBox="0 0 80 80">
  <g class="burst">
    <!-- 8方向の粒子 -->
  </g>
</svg>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `export function FireworksIcon() {
  const particles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20">
      {particles.map((deg, i) => (
        <circle key={deg} cx="40" cy="40" r="3" fill="${color.hex}"
          style={{
            transformOrigin: "40px 40px",
            transform: \`rotate(\${deg}deg) translateY(-26px)\`,
            animation: "fwBurst 1.4s ease-out infinite",
            animationDelay: \`\${i * 0.04}s\`,
          }}
        />
      ))}
      <circle cx="40" cy="40" r="3" fill="${color.hex}" style={{ animation: "fwBurst 1.4s ease-out infinite" }} />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `中心から8方向に ${color.tw}-500 の粒子が爆発する『花火』アイコンを実装してください。各粒子は rotate(0..315deg) translateY(-26px) で配置し、scale(0)→scale(1.2) のease-out 1.4秒ループでフェードアウト。`,
};

const iconSparkles: ExtraArchetype<CV> = {
  id: "icon-sparkles",
  baseTitle: "キラキラ（瞬き）",
  category: "icon",
  baseMood: ["AI", "プレミアム"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "AI生成中、プレミアム機能、新機能ハイライト、Magicな処理の表現。",
  effect: "複数の星が時間差で瞬く、AI/魔法系プロダクトで万能な装飾。",
  suitableFor: ["AIプロダクト", "プレミアムプラン", "新機能アナウンス"],
  badUsage: "硬めの業務システムでは浮く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="sparkles" viewBox="0 0 64 64"><!-- 4-5 stars --></svg>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `function Star({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  const half = size / 2;
  return (
    <path
      d={\`M\${x},\${y - half} L\${x + size * 0.16},\${y - size * 0.16} L\${x + half},\${y} L\${x + size * 0.16},\${y + size * 0.16} L\${x},\${y + half} L\${x - size * 0.16},\${y + size * 0.16} L\${x - half},\${y} L\${x - size * 0.16},\${y - size * 0.16} Z\`}
      fill="${color.hex}"
      style={{ transformOrigin: \`\${x}px \${y}px\`, animation: "sparkleBlink 1.6s ease-in-out infinite", animationDelay: \`\${delay}s\` }}
    />
  );
}
export function SparklesIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20">
      <Star x={32} y={32} size={28} delay={0} />
      <Star x={14} y={14} size={12} delay={0.3} />
      <Star x={50} y={18} size={10} delay={0.6} />
      <Star x={48} y={50} size={14} delay={0.45} />
      <Star x={12} y={48} size={9} delay={0.15} />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.jp}（${color.hex}）の十字スパーク形（path で 4頂点 + 4内側点）の星を5個サイズ違いで配置し、それぞれ時間差で scale(.4)↔scale(1) にopacityで瞬かせる SVG演出を実装してください。1.6秒周期、各星 delay は 0/0.15/0.3/0.45/0.6 秒。`,
};

const iconLockUnlock: ExtraArchetype<CV> = {
  id: "icon-lock-unlock",
  baseTitle: "鍵が開く",
  category: "icon",
  baseMood: ["BtoB", "セキュア"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "「認証成功」「アクセス許可」「機能解放」「プレミアム解禁」。",
  effect: "南京錠の弧が右に回って外れる。解放/許可の瞬間を絵で見せる。",
  suitableFor: ["認証フロー", "プレミアム機能解禁", "セキュリティ系プロダクト"],
  badUsage: "汎用ロードでは意味が混乱する。文脈を絞る。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="lock" viewBox="0 0 64 64"><!-- arc + body --></svg>`,
    css: `.lock .arc { transform-origin: 22px 28px; animation: lockArc 2.4s ease-in-out infinite; }`,
    tailwind: `// React版を参照`,
    react: `export function LockUnlockIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" style={{ color: "${color.hex}" }}>
      <rect x="14" y="28" width="36" height="26" rx="4" fill="currentColor" />
      <rect x="29" y="36" width="6" height="10" rx="1" fill="#fff" />
      <path className="arc" d="M22 28 V20 a10 10 0 0 1 20 0 v8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
        style={{ transformOrigin: "22px 28px", animation: "lockArc 2.4s ease-in-out infinite" }} />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `南京錠アイコン（${color.tw}-500）のうち、上部の弧の path を transform-origin: 22px 28px で rotate 0→28deg + translateY(-2px) のkeyframeに変えて、開閉を繰り返すアニメを実装してください。本体は固定。2.4秒ループ。`,
};

const iconHeartBurst: ExtraArchetype<CV> = {
  id: "icon-heart-burst",
  baseTitle: "ハート爆発（いいね）",
  category: "icon",
  baseMood: ["BtoC", "SNS"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "SNSの『いいね』タップ、お気に入り追加、通知。",
  effect: "中心ハートが脈動し、周囲に小さなハートが飛び散る。短時間で『好き』を爆発的に表現。",
  suitableFor: ["SNS", "メッセージング", "デート系"],
  badUsage: "BtoB業務システムでは浮く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="heart-burst">…</div>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `export function HeartBurstIcon() {
  const minis = [
    { tx: "-32px", ty: "-28px" },
    { tx: "32px",  ty: "-28px" },
    { tx: "-36px", ty: "8px"  },
    { tx: "36px",  ty: "8px"  },
    { tx: "0px",   ty: "-40px" },
  ];
  return (
    <div className="relative flex h-20 w-20 items-center justify-center" style={{ color: "${color.hex}" }}>
      <span className="text-5xl" style={{ animation: "heartPop 1.6s ease-in-out infinite" }}>♥</span>
      {minis.map((m, i) => (
        <span key={i} className="absolute text-base"
          style={{
            ['--tx' as any]: m.tx,
            ['--ty' as any]: m.ty,
            animation: "heartFly 1.6s ease-out infinite",
            animationDelay: \`\${0.2 + i * 0.08}s\`,
          }}>
          ♥
        </span>
      ))}
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `『いいね』タップ用のハート爆発アイコンを実装してください。中心ハート（${color.tw}-500）が scale(.9)↔scale(1.15) で脈動。同時に周囲5つの小ハートが --tx/--ty 方向（例: -32px/-28px, 32px/-28px, ±36px/8px, 0/-40px）に translate しながら scale(.5)→scale(1) で飛んで消えます。`,
};

const iconWifi: ExtraArchetype<CV> = {
  id: "icon-wifi-radiate",
  baseTitle: "Wi-Fi 電波拡散",
  category: "icon",
  baseMood: ["テック", "通信"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "ネットワーク接続中、デバイス発見中、IoT/ホームセキュリティ系の処理。",
  effect: "中心点から3段の弧が次々と表示されて消える。通信が『生きている』と伝える。",
  suitableFor: ["IoT", "ネットワーク管理", "リモート制御"],
  badUsage: "通信文脈以外で使うと誤解される。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="wifi" viewBox="0 0 64 56"><!-- 3 arcs + dot --></svg>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `export function WifiIcon() {
  return (
    <svg viewBox="0 0 64 56" className="h-16 w-20" style={{ color: "${color.hex}" }}>
      <circle cx="32" cy="46" r="4" fill="currentColor" />
      {[
        { d: "M14 36 a18 18 0 0 1 36 0", delay: "0s" },
        { d: "M20 36 a12 12 0 0 1 24 0", delay: "0.2s" },
        { d: "M26 36 a6 6 0 0 1 12 0",  delay: "0.4s" },
      ].map((a, i) => (
        <path key={i} d={a.d} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
          style={{ transformOrigin: "32px 36px", animation: "wifiArc 2s ease-in-out infinite", animationDelay: a.delay }} />
      ))}
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.tw}-500のWi-Fi拡散アイコンを実装してください。中心ドット + 上方向に3段の弧（半径6/12/18）。各弧は scale(.5)→scale(1) でフェードイン/アウト、delay を 0/0.2/0.4秒ずらして波動的に表示。2秒ループ。`,
};

const iconPaperPlane: ExtraArchetype<CV> = {
  id: "icon-paper-plane",
  baseTitle: "紙飛行機が飛ぶ（送信）",
  category: "icon",
  baseMood: ["フレンドリー", "通知"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "メッセージ送信中、メール送信完了、フォーム送信、通知発射。",
  effect: "紙飛行機が斜め右上へ飛んでいきフェードアウト。送信の達成感を出す。",
  suitableFor: ["メールUI", "チャット", "問い合わせフォーム"],
  badUsage: "頻繁な操作にはアニメが過剰。送信完了の1回限りで使う。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="plane"><span>✈️</span></div>`,
    css: `.plane span { display: inline-block; font-size: 36px; animation: paperFly 1.8s ease-in infinite; color: ${color.hex}; }`,
    tailwind: `// React版を参照`,
    react: `export function PaperPlaneIcon() {
  return (
    <div className="relative flex h-20 w-32 items-center">
      <span className="text-4xl" style={{ color: "${color.hex}", animation: "paperFly 1.8s ease-in infinite" }}>✈️</span>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `紙飛行機絵文字（✈️）が左下→右上へ飛んでいく送信演出を実装してください。color: ${color.tw}-500、translate(0,0)→translate(40px,-20px) rotate(15deg)→translate(80px,-40px) rotate(20deg) でフェードアウト。1.8秒ease-inで繰り返し。`,
};

const iconBell: ExtraArchetype<CV> = {
  id: "icon-bell-ring",
  baseTitle: "ベルが鳴る（通知）",
  category: "icon",
  baseMood: ["フレンドリー", "通知"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "通知バッジ、新着件数表示、アラート、重要メッセージ。",
  effect: "ベルアイコンが左右にカチカチ揺れ、通知が来たことを直感的に示す。",
  suitableFor: ["管理画面のヘッダー", "SNS/メッセージング", "オンライン教育"],
  badUsage: "常時揺らすとうるさい。通知件数があるときだけ動くように。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="bell" viewBox="0 0 64 64"><!-- bell path --></svg>`,
    css: `.bell { animation: bellSwing 1.4s ease-in-out infinite; transform-origin: 32px 12px; }`,
    tailwind: `// React版を参照`,
    react: `export function BellIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" style={{ color: "${color.hex}", transformOrigin: "32px 12px", animation: "bellSwing 1.4s ease-in-out infinite" }}>
      <path d="M32 8 a20 20 0 0 1 20 20 v10 l4 6 H8 l4 -6 V28 a20 20 0 0 1 20 -20 z" fill="currentColor" />
      <circle cx="32" cy="50" r="4" fill="currentColor" />
      <circle cx="32" cy="6" r="3" fill="currentColor" />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.tw}-500のベル通知アイコンを実装してください。transform-origin: 32px 12px (ベル上部の固定点)、rotate を 0→15→-12→8→-5→0 と細かく揺らす keyframe を1.4秒ループで適用してください。`,
};

const iconClock: ExtraArchetype<CV> = {
  id: "icon-clock-tick",
  baseTitle: "時計の針が動く",
  category: "icon",
  baseMood: ["BtoB", "時間"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "「予約中」「タイマー」「時間がかかる処理」「営業時間」。",
  effect: "時計盤の上で長針が滑らかに、秒針がチクチクと動く。時間経過を絵で示す。",
  suitableFor: ["予約システム", "タイマー", "勤怠管理"],
  badUsage: "本物の時間に意味がない場面で使うと誤解を招く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="clock" viewBox="0 0 64 64"><!-- face + hands --></svg>`,
    css: `/* React版を参照 */`,
    tailwind: `// React版を参照`,
    react: `export function ClockIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" style={{ color: "${color.hex}" }}>
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="32" y1="32" x2="32" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: "32px 32px", animation: "clockMin 6s linear infinite" }} />
      <line x1="32" y1="32" x2="32" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: "32px 32px", animation: "clockSec 1s steps(8) infinite" }} />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `${color.tw}-500の時計アイコンを実装してください。文字盤は半径28の円、長針は6秒で1周のlinear、秒針は1秒で1周だが steps(8) でチクチクとした動きにしてください。中心ピボット円も忘れずに。`,
};

const iconTypewriter: ExtraArchetype<CV> = {
  id: "icon-typewriter",
  baseTitle: "タイプライター（カーソル付き）",
  category: "icon",
  baseMood: ["AI", "テック"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "AIチャットの応答中、コードを書いている演出、ターミナル風UI。",
  effect: "文字が左から順にタイプされ、末尾でカーソルが点滅。生成中らしさを強く出せる。",
  suitableFor: ["AIアシスタント", "チャット", "ターミナル/CLI風UI"],
  badUsage: "毎回タイプアニメだと読みづらい。重要な短文に限定する。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="tw"><span class="text">Generating</span><span class="caret">|</span></div>`,
    css: `.tw .text { font-family: ui-monospace, monospace; color: ${color.hex}; overflow: hidden; display: inline-block; white-space: nowrap; border-right: 0; animation: typeText 2.4s steps(10) infinite; }
.tw .caret { color: ${color.hex}; animation: typeCaret 1s steps(2) infinite; }
@keyframes typeText { from { width: 0 } to { width: 10ch } }`,
    tailwind: `// React版を参照`,
    react: `export function TypewriterIcon() {
  return (
    <div className="font-mono text-2xl" style={{ color: "${color.hex}" }}>
      <span className="inline-block overflow-hidden whitespace-nowrap align-middle"
            style={{ width: 0, animation: "typeText 2.4s steps(10) infinite" }}>
        Generating
      </span>
      <span className="ml-0.5 align-middle" style={{ animation: "typeCaret 1s steps(2) infinite" }}>|</span>
      <style jsx global>{\`@keyframes typeText { from { width: 0 } to { width: 10ch } }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `タイプライター演出を実装してください。${color.tw}-500のmonoテキスト『Generating』を、width 0→10ch のsteps(10)アニメ（2.4秒）で1文字ずつタイプ。横にカーソル『|』を typeCaret 1s steps(2) で点滅。`,
};

/* ============================================================
   フォントアレンジ
   ============================================================ */

const fontGlitch: ExtraArchetype<CV> = {
  id: "font-glitch",
  baseTitle: "グリッチ文字（RGBずれ）",
  category: "font",
  baseMood: ["サイバー", "テック"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "サイバーパンク、ハッカー風、デジタルブランド、ゲーム系のヒーロー。",
  effect: "1文字に対してRGB各色が少しずれて重なり、デジタルノイズ風の見出しになる。",
  suitableFor: ["ゲーム/eSports", "Web3/暗号資産", "サイバーセキュリティ"],
  badUsage: "BtoBの落ち着いた業種では浮きすぎる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="glitch" data-text="GLITCH">GLITCH</h2>`,
    css: `.glitch { position: relative; font-weight: 900; color: ${color.hex}; text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9; animation: glitchA 1.6s infinite linear alternate-reverse; }
@keyframes glitchA { 0%,100%{ text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9 } 50%{ text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9 } }`,
    tailwind: `// React版を参照`,
    react: `export function GlitchText({ children = "GLITCH" }) {
  return (
    <h2 className="text-5xl font-black"
      style={{ color: "${color.hex}", textShadow: "-2px 0 #ff00c1, 2px 0 #00fff9", animation: "glitchA 1.6s infinite linear alternate-reverse" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しに『RGB分離グリッチ』演出を実装してください。文字色は ${color.tw}-500、text-shadow に -2px 0 #ff00c1, 2px 0 #00fff9 を入れ、keyframe で text-shadow を左右反転させて1.6秒のalternate-reverseで揺らします。`,
};

const font3D: ExtraArchetype<CV> = {
  id: "font-3d-extrude",
  baseTitle: "3D押し出し文字",
  category: "font",
  baseMood: ["ポップ", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ポップなブランド、玩具系、アパレル、イベントLPの大見出し。",
  effect: "text-shadowを段階的に重ねて文字に厚みを持たせる。3D風の塊感が出る。",
  suitableFor: ["BtoC LP", "イベント告知", "ブランド"],
  badUsage: "シリアス・ハイエンド業種では子どもっぽくなる。",
  variants: cv(),
  code: ({ color }) => {
    const layers = [1, 2, 3, 4, 5, 6].map((n) => `${n}px ${n}px 0 ${color.hex}`).join(", ");
    return ({
      html: `<h2 class="extrude">PUSH!</h2>`,
      css: `.extrude { font-weight: 900; color: #fff; text-shadow: ${layers}, 8px 8px 14px rgba(0,0,0,.25); }`,
      tailwind: `// React版を参照`,
      react: `export function ExtrudeText({ children = "PUSH!" }) {
  return (
    <h2 className="text-6xl font-black text-white"
      style={{ textShadow: "${layers}, 8px 8px 14px rgba(0,0,0,.25)" }}>
      {children}
    </h2>
  );
}`,
    });
  },
  prompt: ({ color }) =>
    `見出しを、白文字に ${color.jp}（${color.hex}）の text-shadow を 1px 1px 0 から 6px 6px 0 まで6段重ねて『3D押し出し』風にしてください。最後に黒の8px 8px 14pxの落ち影で接地感を出します。`,
};

const fontLongShadow: ExtraArchetype<CV> = {
  id: "font-long-shadow",
  baseTitle: "ロングシャドウ文字",
  category: "font",
  baseMood: ["レトロ", "ポップ"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "レトロデザイン、ヴィンテージブランド、看板風の見出し。",
  effect: "右下に向かって伸びる長い斜めの影。フラットデザインの定番アクセント。",
  suitableFor: ["レトロブランド", "クラフト/雑貨", "イベント"],
  badUsage: "情報量の多い長文には合わない。短い見出しまたはロゴで使う。",
  variants: cv(),
  code: ({ color }) => {
    const layers = Array.from({ length: 30 }, (_, i) => `${i + 1}px ${i + 1}px 0 ${color.hex}`).join(", ");
    return ({
      html: `<h2 class="long-shadow">LONG</h2>`,
      css: `.long-shadow { font-weight: 800; color: #0a0a0a; text-shadow: ${layers}; }`,
      tailwind: `// React版を参照`,
      react: `export function LongShadowText({ children = "LONG" }) {
  return (
    <h2 className="text-6xl font-extrabold text-zinc-900"
      style={{ textShadow: "${layers}" }}>
      {children}
    </h2>
  );
}`,
    });
  },
  prompt: ({ color }) =>
    `見出しに、${color.jp}（${color.hex}）の右下方向に伸びる『ロングシャドウ』を text-shadow を1pxずつ30段重ねて作ってください。文字は黒、影は ${color.hex} 単色。`,
};

const fontNeon: ExtraArchetype<CV> = {
  id: "font-neon",
  baseTitle: "ネオンサイン",
  category: "font",
  baseMood: ["夜", "クラブ"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ナイト系・音楽・ゲーム・イベントの見出しやロゴ。",
  effect: "外側に複数段の光を重ねて、夜のネオン管のような発光を再現。暗い背景で映える。",
  suitableFor: ["クラブ/ナイト系", "音楽/ライブ", "ゲーム"],
  badUsage: "白背景では映えない。背景は黒or濃色推奨。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="neon">NEON</h2>`,
    css: `.neon { color: #fff; font-weight: 800; text-shadow: 0 0 4px #fff, 0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}; }`,
    tailwind: `<h2 className="text-6xl font-extrabold text-white"
  style={{ textShadow: "0 0 4px #fff, 0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}" }}>NEON</h2>`,
    react: `export function NeonText({ children = "NEON" }) {
  return (
    <h2 className="text-6xl font-extrabold text-white"
      style={{ textShadow: "0 0 4px #fff, 0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しを ${color.jp}（${color.hex}）のネオンサイン風にしてください。文字色は白、text-shadow は内側に白の小さなグロー、外側に ${color.hex} の 10/20/40px の3段グロー。背景は暗い色推奨。`,
};

const fontWave: ExtraArchetype<CV> = {
  id: "font-letter-wave",
  baseTitle: "1文字ずつ波打つ",
  category: "font",
  baseMood: ["ポップ", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "BtoCブランドや教育系のキャッチコピー、楽しさを伝えたい見出し。",
  effect: "見出しの各文字が時間差で上下に揺れ、文字列全体が波のように動く。",
  suitableFor: ["BtoC LP", "教育/コーチング", "個人ブランド"],
  badUsage: "BtoBの硬い文脈では幼くなる。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="wave"><span>S</span><span>P</span><span>L</span><span>A</span><span>S</span><span>H</span></h2>`,
    css: `.wave { font-weight: 800; color: ${color.hex}; }
.wave span { display: inline-block; animation: letterWave 1.6s ease-in-out infinite; }
.wave span:nth-child(2) { animation-delay: .1s }
.wave span:nth-child(3) { animation-delay: .2s }
.wave span:nth-child(4) { animation-delay: .3s }
.wave span:nth-child(5) { animation-delay: .4s }
.wave span:nth-child(6) { animation-delay: .5s }
@keyframes letterWave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`,
    tailwind: `// React版を参照`,
    react: `export function WaveText({ text = "SPLASH" }) {
  return (
    <h2 className="text-5xl font-extrabold" style={{ color: "${color.hex}" }}>
      {Array.from(text).map((c, i) => (
        <span key={i} className="inline-block"
          style={{ animation: \`letterWave 1.6s ease-in-out infinite\`, animationDelay: \`\${i * 0.1}s\` }}>
          {c}
        </span>
      ))}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しテキストを1文字ずつ <span> に分け、translateY で 0↔-12px に1.6秒ease-in-outで揺らしてください。各文字の delay は 0.1秒ずつずらして波打って見せます。色は ${color.tw}-500。`,
};

const fontStrokeFill: ExtraArchetype<CV> = {
  id: "font-stroke-to-fill",
  baseTitle: "アウトライン→塗り",
  category: "font",
  baseMood: ["クリエイティブ", "アート"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "ポートフォリオ・クリエイティブエージェンシーのヒーロー、ホバーで切り替えたい見出し。",
  effect: "通常はアウトラインだけ、ホバー（または時間差）で塗りが入る。緊張感のある演出。",
  suitableFor: ["クリエイティブエージェンシー", "アート", "ファッション"],
  badUsage: "短時間で切り替えると揺らぐので、transition は400ms以上に。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="stroke-fill">CREATE</h2>`,
    css: `.stroke-fill { font-weight: 900; -webkit-text-stroke: 2px ${color.hex}; color: transparent; transition: color .5s ease; }
.stroke-fill:hover { color: ${color.hex}; }`,
    tailwind: `// React版を参照`,
    react: `export function StrokeFillText({ children = "CREATE" }) {
  return (
    <h2 className="cursor-default text-7xl font-black transition-colors duration-500 hover:text-current"
      style={{ WebkitTextStroke: "2px ${color.hex}", color: "transparent" }}
      onMouseEnter={(e)=> e.currentTarget.style.color="${color.hex}" }
      onMouseLeave={(e)=> e.currentTarget.style.color="transparent" }
    >
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しを、通常時はアウトライン（${color.jp}/${color.hex}、stroke 2px、color: transparent）、ホバー時に塗りに変わるよう実装してください。transition: color .5s ease。`,
};

const fontGradientAnim: ExtraArchetype<CV> = {
  id: "font-gradient-anim",
  baseTitle: "グラデーション流動文字",
  category: "font",
  baseMood: ["AI", "モダン"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "AI/SaaS/ハイエンドプロダクトのヒーロー見出し。",
  effect: "テキストグラデのbackground-positionをアニメして色が流れる。動いているだけで高級。",
  suitableFor: ["AIプロダクト", "ハイエンドコーポレート"],
  badUsage: "周期を速くしすぎるとうるさい。8秒以上を推奨。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="grad-anim">Future is Now</h2>`,
    css: `.grad-anim { font-weight: 800; background: linear-gradient(90deg, ${color.hex}, #5b8cff, ${color.hex}); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradPan 8s linear infinite; }
@keyframes gradPan { from { background-position: 0% 0 } to { background-position: 200% 0 } }`,
    tailwind: `// React版を参照`,
    react: `export function GradientAnimText({ children = "Future is Now" }) {
  return (
    <h2 className="bg-clip-text text-6xl font-extrabold text-transparent"
      style={{
        backgroundImage: "linear-gradient(90deg, ${color.hex}, #5b8cff, ${color.hex})",
        backgroundSize: "200% 100%",
        animation: "gradPan 8s linear infinite",
      }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しに『流れるグラデ』を実装してください。background は 90度の linear-gradient(${color.hex}, blue-500, ${color.hex})、size 200%、background-clip: text + color: transparent、background-position を 0%→200% へ8秒linear無限ループでアニメ。`,
};

const fontEmboss: ExtraArchetype<CV> = {
  id: "font-emboss",
  baseTitle: "エンボス（凹み）",
  category: "font",
  baseMood: ["上品", "ミニマル"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "上品なブランド、ハイエンド系のセクション見出し、引用。",
  effect: "上にハイライト・下にシャドウを乗せて、紙に押し込んだような凹凸を表現。",
  suitableFor: ["ハイエンドブランド", "ジュエリー", "高級コスメ"],
  badUsage: "派手な背景の上では効果が消える。落ち着いた背景で。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="emboss">Premium</h2>`,
    css: `.emboss { font-weight: 800; color: ${color.hex}; text-shadow: 0 1px 0 #fff, 0 -1px 0 rgba(0,0,0,.25); }`,
    tailwind: `<h2 className="text-6xl font-extrabold"
  style={{ color: "${color.hex}", textShadow: "0 1px 0 #fff, 0 -1px 0 rgba(0,0,0,.25)" }}>Premium</h2>`,
    react: `export function EmbossText({ children = "Premium" }) {
  return (
    <h2 className="text-6xl font-extrabold"
      style={{ color: "${color.hex}", textShadow: "0 1px 0 #fff, 0 -1px 0 rgba(0,0,0,.25)" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しに、文字色 ${color.tw}-500、text-shadow に 0 1px 0 #fff（下にハイライト）と 0 -1px 0 rgba(0,0,0,.25)（上に影）を入れて、紙にエンボスしたような上品な質感を作ってください。`,
};

const fontStripe: ExtraArchetype<CV> = {
  id: "font-stripe",
  baseTitle: "ストライプ塗り文字",
  category: "font",
  baseMood: ["ポップ", "レトロ"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "看板風、雑誌風、レトロブランドの大見出し。",
  effect: "文字内部を斜めストライプで塗る。視線を集めるユニーク表現。",
  suitableFor: ["雑誌/メディア", "レトロブランド", "イベントLP"],
  badUsage: "細い書体だと潰れる。font-weight 900 を推奨。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="stripe-text">SUPER</h2>`,
    css: `.stripe-text { font-weight: 900; background-image: repeating-linear-gradient(45deg, ${color.hex} 0 8px, transparent 8px 16px); -webkit-background-clip: text; background-clip: text; color: transparent; }`,
    tailwind: `<h2 className="bg-clip-text text-7xl font-black text-transparent"
  style={{ backgroundImage: "repeating-linear-gradient(45deg, ${color.hex} 0 8px, transparent 8px 16px)" }}>SUPER</h2>`,
    react: `export function StripeText({ children = "SUPER" }) {
  return (
    <h2 className="bg-clip-text text-7xl font-black text-transparent"
      style={{ backgroundImage: "repeating-linear-gradient(45deg, ${color.hex} 0 8px, transparent 8px 16px)" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しの内部を、${color.jp}（${color.hex}）の45度ストライプで塗ってください。background-image は repeating-linear-gradient で 8px stripe / 8px gap、background-clip: text、color: transparent。font-weight: 900。`,
};

const fontStretch: ExtraArchetype<CV> = {
  id: "font-stretch-tall",
  baseTitle: "縦長ストレッチ文字",
  category: "font",
  baseMood: ["モード", "ファッション"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "モード/ファッション/雑誌風サイトの大見出し。",
  effect: "scaleY で縦に2倍引き伸ばす。エッジの効いたモード感。",
  suitableFor: ["ファッション", "雑誌", "アート"],
  badUsage: "本文では読めない。装飾文字限定。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="tall">TALL</h2>`,
    css: `.tall { font-weight: 900; transform: scaleY(2); transform-origin: top; color: ${color.hex}; letter-spacing: -.02em; }`,
    tailwind: `<h2 className="origin-top text-6xl font-black [transform:scaleY(2)]" style={{ color: "${color.hex}", letterSpacing: "-.02em" }}>TALL</h2>`,
    react: `export function TallText({ children = "TALL" }) {
  return (
    <h2 className="origin-top text-6xl font-black [transform:scaleY(2)]"
      style={{ color: "${color.hex}", letterSpacing: "-.02em" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しを ${color.jp}（${color.tw}-500）で、transform: scaleY(2) で縦に2倍引き伸ばすモード風タイポにしてください。transform-origin は top、letter-spacing は -.02em。`,
};

const fontReveal: ExtraArchetype<CV> = {
  id: "font-letter-fade-in",
  baseTitle: "1文字ずつフェードイン",
  category: "font",
  baseMood: ["上品", "シネマ"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "オープニング・スプラッシュ・タイトルバック。",
  effect: "見出しが左から1文字ずつ現れる、シネマ的な登場演出。",
  suitableFor: ["ブランドサイト", "プロダクト紹介の冒頭", "ストーリー系"],
  badUsage: "本文には合わない。短い見出しのみで。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="reveal"><span>H</span><span>E</span><span>L</span><span>L</span><span>O</span></h2>`,
    css: `.reveal { font-weight: 800; color: ${color.hex}; }
.reveal span { display: inline-block; opacity: 0; transform: translateY(.4em); animation: letterReveal .6s ease-out forwards; }
.reveal span:nth-child(2){animation-delay:.1s}
.reveal span:nth-child(3){animation-delay:.2s}
.reveal span:nth-child(4){animation-delay:.3s}
.reveal span:nth-child(5){animation-delay:.4s}
@keyframes letterReveal { to { opacity: 1; transform: translateY(0); } }`,
    tailwind: `// React版を参照`,
    react: `"use client";
import { useState } from "react";
export function LetterReveal({ text = "HELLO" }) {
  const [k, setK] = useState(0);
  return (
    <h2 onClick={() => setK(v => v + 1)} className="cursor-pointer text-6xl font-extrabold" style={{ color: "${color.hex}" }}>
      {Array.from(text).map((c, i) => (
        <span key={\`\${k}-\${i}\`} className="inline-block"
          style={{ opacity: 0, transform: "translateY(.4em)", animation: "letterReveal .6s ease-out forwards", animationDelay: \`\${i * 0.1}s\` }}>
          {c}
        </span>
      ))}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しテキストを1文字ずつ <span> に分け、それぞれ opacity 0 + translateY(.4em) からスタートして、左から順に .1秒ずつ delay を入れて .6秒 ease-out で fadeIn + translateY(0) させてください。色は ${color.tw}-500。`,
};

const fontHandwriting: ExtraArchetype<CV> = {
  id: "font-handwriting",
  baseTitle: "手書き風（SVG ストローク描画）",
  category: "font",
  baseMood: ["温かい", "クラフト"],
  baseTags: ["SVG"],
  difficulty: "hard",
  useCase: "個人ブランド・カフェ・クラフトサイトの見出し。",
  effect: "SVG path の stroke-dasharray を使って文字が描かれていく。手書きらしさを出せる。",
  suitableFor: ["個人ブランド", "カフェ/レストラン", "クラフト"],
  badUsage: "システム系プロダクトには合わない。装飾用に限定。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<svg class="hw" viewBox="0 0 240 80"><path d="M20,60 C 30,20 60,20 80,50 S 130,20 160,50 220,30 220,55" stroke="${color.hex}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    css: `.hw path { stroke-dasharray: 600; stroke-dashoffset: 600; animation: hwDraw 2.6s ease-in-out infinite alternate; }
@keyframes hwDraw { to { stroke-dashoffset: 0 } }`,
    tailwind: `// React版を参照`,
    react: `export function HandwrittenStroke() {
  return (
    <svg viewBox="0 0 240 80" className="h-20 w-60">
      <path d="M20,60 C 30,20 60,20 80,50 S 130,20 160,50 220,30 220,55"
            stroke="${color.hex}" strokeWidth={4} fill="none" strokeLinecap="round"
            style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: "hwDraw 2.6s ease-in-out infinite alternate" }} />
    </svg>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しの装飾として、SVG path（${color.jp}/${color.hex}/4px、stroke-linecap round）を stroke-dasharray=600, stroke-dashoffset=600 から 0 へ 2.6秒 ease-in-out alternate でアニメして手書き風に描かせてください。`,
};

const fontPrintCmyk: ExtraArchetype<CV> = {
  id: "font-print-cmyk",
  baseTitle: "印刷ズレ風（CMYK）",
  category: "font",
  baseMood: ["レトロ", "アート"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "出版・雑誌・ZINE系メディア、レトロアートのデザイン。",
  effect: "シアン/マゼンタ/イエローの3版がわずかにずれて重なるオフセット印刷風表現。",
  suitableFor: ["雑誌/出版", "ZINE/インディー", "レトロアート"],
  badUsage: "本文では読みにくい。装飾の見出し限定。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="cmyk">PRINT</h2>`,
    css: `.cmyk { font-weight: 900; color: rgba(0,0,0,.85); text-shadow: 2px 0 rgba(0, 220, 220, .8), -2px 0 rgba(220, 0, 220, .75), 0 2px rgba(220, 220, 0, .8); }`,
    tailwind: `<h2 className="text-7xl font-black" style={{ color:"rgba(0,0,0,.85)", textShadow:"2px 0 rgba(0, 220, 220, .8), -2px 0 rgba(220, 0, 220, .75), 0 2px rgba(220, 220, 0, .8)" }}>PRINT</h2>`,
    react: `export function CMYKText({ children = "PRINT" }) {
  return (
    <h2 className="text-7xl font-black"
      style={{ color: "rgba(0,0,0,.85)", textShadow: "2px 0 rgba(0,220,220,.8), -2px 0 rgba(220,0,220,.75), 0 2px rgba(220,220,0,.8)" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しを、ほぼ黒の文字に text-shadow でシアン(2px 0)・マゼンタ(-2px 0)・イエロー(0 2px)を少しずつずらして重ねる『CMYK印刷ズレ風』にしてください。font-weight: 900。`,
};

const fontMixedSize: ExtraArchetype<CV> = {
  id: "font-mixed-size",
  baseTitle: "サイズミックス（強弱タイポ）",
  category: "font",
  baseMood: ["編集", "雑誌"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "雑誌風レイアウト、ZINE、編集系のキービジュアル。",
  effect: "1単語の中で文字サイズを意図的に変えることで、編集デザイン的なリズムを作る。",
  suitableFor: ["雑誌/編集", "ファッション", "アート"],
  badUsage: "本文では読みにくい。短いキャッチコピーで。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="mix"><span>A</span><span>R</span><span>T</span><span>!</span></h2>`,
    css: `.mix { font-weight: 900; color: ${color.hex}; line-height: 1; letter-spacing: -.04em; }
.mix span:nth-child(1){font-size:1em}
.mix span:nth-child(2){font-size:1.6em}
.mix span:nth-child(3){font-size:.85em}
.mix span:nth-child(4){font-size:1.4em}`,
    tailwind: `// React版を参照`,
    react: `export function MixedSizeText({ text = "ART!" }) {
  const sizes = ["1em", "1.6em", ".85em", "1.4em"];
  return (
    <h2 className="text-5xl font-black leading-none" style={{ color: "${color.hex}", letterSpacing: "-.04em" }}>
      {Array.from(text).map((c, i) => (
        <span key={i} style={{ fontSize: sizes[i % sizes.length] }}>{c}</span>
      ))}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しのキャッチコピーで、1文字ずつ font-size を 1em / 1.6em / .85em / 1.4em のように意図的にバラつかせる『編集タイポ風』を実装してください。色は ${color.tw}-500、letter-spacing -.04em でぎゅっと寄せます。`,
};

const fontReverse: ExtraArchetype<CV> = {
  id: "font-mirror",
  baseTitle: "ミラー反転（下に鏡像）",
  category: "font",
  baseMood: ["アート", "上品"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "アート系・ハイエンドのキービジュアル、ロゴの装飾。",
  effect: "見出しの下に上下反転 + フェードした鏡像を配置。水面に映ったような印象。",
  suitableFor: ["ハイエンドブランド", "アート", "ジュエリー"],
  badUsage: "情報量の多いセクションだと邪魔。装飾用に。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="mirror"><h2>REFLECT</h2><h2 class="mir">REFLECT</h2></div>`,
    css: `.mirror { display: inline-flex; flex-direction: column; line-height: .9; }
.mirror h2 { font-weight: 900; color: ${color.hex}; margin: 0; }
.mirror .mir { transform: scaleY(-1); opacity: .25; -webkit-mask-image: linear-gradient(to top, transparent, #000 80%); mask-image: linear-gradient(to top, transparent, #000 80%); }`,
    tailwind: `// React版を参照`,
    react: `export function MirrorText({ children = "REFLECT" }) {
  return (
    <div className="inline-flex flex-col leading-[.9]">
      <h2 className="m-0 text-6xl font-black" style={{ color: "${color.hex}" }}>{children}</h2>
      <h2 className="m-0 text-6xl font-black" style={{ color: "${color.hex}", transform: "scaleY(-1)", opacity: .25, WebkitMaskImage: "linear-gradient(to top, transparent, #000 80%)", maskImage: "linear-gradient(to top, transparent, #000 80%)" }}>
        {children}
      </h2>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `見出しの下に、同じテキストを scaleY(-1) で鏡像配置し、opacity .25 + 上方向に向けてフェードする mask-image を適用して『水面反射』風にしてください。色は ${color.tw}-500。`,
};

/* ============================================================
   フォントアレンジ（占い / ミスティック系）
   ============================================================ */

const fontMysticShimmer: ExtraArchetype<CV> = {
  id: "font-mystic-shimmer",
  baseTitle: "ミスティック・シマー",
  category: "font",
  baseMood: ["占い", "神秘", "ミスティック"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "占い・スピリチュアル・神秘系サイトの見出し / トップロゴ。",
  effect: "セリフ書体 × ゆっくり流れるグラデが、星明かりのような神秘的な質感を作る。",
  suitableFor: ["占いサイト", "スピリチュアル", "ヨガ/瞑想"],
  badUsage: "BtoB業務系では浮く。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="mystic-shim">星に問う、あなたの今日。</h2>`,
    css: `.mystic-shim { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; font-weight: 600; letter-spacing: .05em; background: linear-gradient(90deg, ${color.hex}, #f5e6c8, ${color.hex}); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradPan 9s linear infinite; }`,
    tailwind: `<h2 className="bg-clip-text font-serif text-5xl font-semibold tracking-wide text-transparent"
  style={{ backgroundImage: "linear-gradient(90deg, ${color.hex}, #f5e6c8, ${color.hex})", backgroundSize: "200% 100%", animation: "gradPan 9s linear infinite" }}>
  星に問う、あなたの今日。
</h2>`,
    react: `export function MysticShimmerText({ children = "星に問う、あなたの今日。" }) {
  return (
    <h2 className="bg-clip-text font-serif text-5xl font-semibold tracking-wide text-transparent"
      style={{ backgroundImage: "linear-gradient(90deg, ${color.hex}, #f5e6c8, ${color.hex})", backgroundSize: "200% 100%", animation: "gradPan 9s linear infinite" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトの見出しを、セリフ書体（Cormorant Garamond / Noto Serif JP）に ${color.jp}（${color.hex}）→ アイボリー（#f5e6c8）→ ${color.hex} の3色グラデを background-clip: text で適用し、background-position を 9秒かけてゆっくり流す『ミスティック・シマー』にしてください。letter-spacing を .05em。`,
};

const fontTarotFrame: ExtraArchetype<CV> = {
  id: "font-tarot-frame",
  baseTitle: "タロット風飾り枠＋見出し",
  category: "font",
  baseMood: ["占い", "ミスティック", "アンティーク"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占いサイトの主要見出し、タロット占いのカード見出し、占星術プロダクトのCTA枠。",
  effect: "セリフ書体の見出しを、上下に飾り罫＋星アイコンで挟み、タロットカードのような気品を出す。",
  suitableFor: ["タロット/占星術", "ヨガ", "ハーブ/アロマ"],
  badUsage: "シリアスBtoBには合わない。本文中の見出しでは過剰。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="tarot"><span class="rule">— ✦ —</span><h2>運命の扉</h2><span class="rule">— ✦ —</span></div>`,
    css: `.tarot { text-align: center; font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; color: ${color.hex}; }
.tarot .rule { display: block; letter-spacing: .4em; opacity: .65; }
.tarot h2 { font-weight: 600; font-style: italic; letter-spacing: .08em; margin: 6px 0; }`,
    tailwind: `<div className="text-center font-serif" style={{ color: "${color.hex}" }}>
  <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
  <h2 className="my-1 text-4xl italic font-semibold tracking-wider">運命の扉</h2>
  <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
</div>`,
    react: `export function TarotHeading({ children = "運命の扉" }) {
  return (
    <div className="text-center font-serif" style={{ color: "${color.hex}" }}>
      <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
      <h2 className="my-1 text-4xl font-semibold italic tracking-wider">{children}</h2>
      <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトの見出しを、上下に『— ✦ —』の飾り罫（letter-spacing .4em, opacity .6）で挟み、中央にセリフ italic の見出し（${color.tw}-500、letter-spacing .08em）を配置する『タロット風』に変更してください。font-family は Cormorant Garamond / Noto Serif JP。`,
};

const fontCrystalBall: ExtraArchetype<CV> = {
  id: "font-crystal-ball",
  baseTitle: "水晶玉（円グラデの中の文字）",
  category: "font",
  baseMood: ["占い", "ミスティック"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占いサイトのキービジュアル、トップロゴ、メインビジュアル。",
  effect: "丸いグラデーションの中に文字を入れ、水晶玉に映る言葉のような演出。",
  suitableFor: ["占いサイト", "魔法/ファンタジー", "ストーリー系LP"],
  badUsage: "情報量の多い見出しには使えない。短いキャッチに。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="crystal"><span>占う</span></div>`,
    css: `.crystal { width: 240px; height: 240px; border-radius: 9999px; background: radial-gradient(circle at 35% 30%, #fff 0%, ${color.hex}88 30%, ${color.hex} 70%, #2a004a 100%); box-shadow: 0 30px 60px -20px ${color.hex}55, inset 0 0 60px rgba(0,0,0,.3); display: flex; align-items: center; justify-content: center; animation: crystalGlow 6s ease-in-out infinite; }
.crystal span { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 600; color: #fff; text-shadow: 0 0 20px ${color.hex}; }
@keyframes crystalGlow { 0%,100%{ box-shadow: 0 30px 60px -20px ${color.hex}55, inset 0 0 60px rgba(0,0,0,.3) } 50%{ box-shadow: 0 30px 80px -10px ${color.hex}99, inset 0 0 80px rgba(0,0,0,.4) } }`,
    tailwind: `// React版を参照`,
    react: `export function CrystalBall({ children = "占う" }) {
  return (
    <div className="flex h-60 w-60 items-center justify-center rounded-full"
      style={{
        background: "radial-gradient(circle at 35% 30%, #fff 0%, ${color.hex}88 30%, ${color.hex} 70%, #2a004a 100%)",
        boxShadow: "0 30px 60px -20px ${color.hex}55, inset 0 0 60px rgba(0,0,0,.3)",
        animation: "crystalGlow 6s ease-in-out infinite",
      }}>
      <span className="font-serif text-5xl font-semibold text-white" style={{ textShadow: "0 0 20px ${color.hex}" }}>
        {children}
      </span>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトのキービジュアルとして、240pxの円形に radial-gradient（中心 #fff から ${color.hex}、外周 #2a004a）を敷き、中央にセリフ書体『占う』を白文字＋${color.tw}-500グローで置く『水晶玉』ビジュアルを実装してください。box-shadow を 6秒で広げる脈動アニメ付き。`,
};

const fontMoonGlow: ExtraArchetype<CV> = {
  id: "font-moon-glow",
  baseTitle: "月光ハロー",
  category: "font",
  baseMood: ["占い", "ミスティック", "夜"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "夜系・占い・癒しサイトの見出し。暗い背景の上で映える。",
  effect: "外側に複数段の柔らかいグローを重ねて、月の光のような後光を作る。",
  suitableFor: ["占いサイト", "ナイト系プロダクト", "癒し/ヨガ"],
  badUsage: "明るい背景では効果が消える。背景は暗色推奨。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="moon-bg"><h2 class="moon-glow">⊕ 月夜の占い</h2></div>`,
    css: `.moon-glow { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; font-weight: 500; color: #fff8e7; letter-spacing: .06em; text-shadow: 0 0 8px #fff8e7, 0 0 18px ${color.hex}, 0 0 36px ${color.hex}, 0 0 60px ${color.hex}; }`,
    tailwind: `<div className="bg-[#0a0a14] p-10 rounded-2xl">
  <h2 className="font-serif text-5xl font-medium tracking-wider"
    style={{ color: "#fff8e7", textShadow: "0 0 8px #fff8e7, 0 0 18px ${color.hex}, 0 0 36px ${color.hex}, 0 0 60px ${color.hex}" }}>
    ⊕ 月夜の占い
  </h2>
</div>`,
    react: `export function MoonGlowText({ children = "⊕ 月夜の占い" }) {
  return (
    <div className="rounded-2xl bg-[#0a0a14] p-10">
      <h2 className="font-serif text-5xl font-medium tracking-wider"
        style={{ color: "#fff8e7", textShadow: "0 0 8px #fff8e7, 0 0 18px ${color.hex}, 0 0 36px ${color.hex}, 0 0 60px ${color.hex}" }}>
        {children}
      </h2>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占いサイトの夜セクションで、文字色は #fff8e7（クリーム）、外側に white の小グロー＋${color.jp}（${color.hex}）の 18/36/60px の3段グローを text-shadow で重ねた『月光ハロー』見出しを実装してください。背景は暗色（#0a0a14）推奨。セリフ書体。`,
};

const fontConstellation: ExtraArchetype<CV> = {
  id: "font-constellation",
  baseTitle: "星座（文字の周りに星）",
  category: "font",
  baseMood: ["占い", "ミスティック", "夜"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "占星術・宇宙・ミステリー系サイトのヒーロー見出し。",
  effect: "見出しの周辺に小さな星を散らし、瞬かせる。タイトル自体が夜空の星座のように見える。",
  suitableFor: ["占星術", "宇宙系メディア", "ミステリー小説"],
  badUsage: "星が多すぎると賑やかすぎる。5〜8個までが上品。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<div class="constellation">
  <span class="star s1">✦</span>
  <span class="star s2">✦</span>
  <span class="star s3">✦</span>
  <span class="star s4">✦</span>
  <h2>Cosmos</h2>
</div>`,
    css: `.constellation { position: relative; display: inline-block; padding: 24px 36px; font-family: 'Cormorant Garamond', serif; color: ${color.hex}; }
.constellation h2 { font-weight: 600; font-size: 56px; letter-spacing: .04em; margin: 0; }
.constellation .star { position: absolute; font-size: 14px; animation: sparkleBlink 1.8s ease-in-out infinite; }
.constellation .s1 { top: 6px; left: 8px; }
.constellation .s2 { top: 0; right: 28px; animation-delay: .4s; }
.constellation .s3 { bottom: 4px; left: 38px; animation-delay: .8s; }
.constellation .s4 { bottom: 12px; right: 4px; animation-delay: 1.2s; }`,
    tailwind: `// React版を参照`,
    react: `export function ConstellationText({ children = "Cosmos" }) {
  const stars = [
    { top: 6, left: 8, delay: 0 },
    { top: 0, right: 28, delay: 0.4 },
    { bottom: 4, left: 38, delay: 0.8 },
    { bottom: 12, right: 4, delay: 1.2 },
  ];
  return (
    <div className="relative inline-block px-9 py-6 font-serif" style={{ color: "${color.hex}" }}>
      {stars.map((s, i) => (
        <span key={i} className="absolute text-sm" style={{ ...s, animation: \`sparkleBlink 1.8s ease-in-out infinite\`, animationDelay: \`\${s.delay}s\` }}>✦</span>
      ))}
      <h2 className="m-0 text-6xl font-semibold tracking-wide">{children}</h2>
    </div>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占星術ページの見出しに、その周囲4箇所（左上/右上/左下/右下）に小さな ✦ 星を散らし、それぞれ delay 0/.4/.8/1.2秒 で sparkleBlink ループさせる『星座フレーム』を作ってください。色は ${color.tw}-500、見出しはセリフ書体。`,
};

const fontMistFade: ExtraArchetype<CV> = {
  id: "font-mist-fade",
  baseTitle: "霧から浮かぶ文字",
  category: "font",
  baseMood: ["占い", "ミスティック"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "占い結果の表示、神秘的な瞬間の演出、メッセージの登場アニメ。",
  effect: "ぼかしから徐々にフォーカスが合っていくように見出しが現れる。神秘的な登場演出。",
  suitableFor: ["占い結果ページ", "ストーリー系LP", "幻想系作品"],
  badUsage: "頻繁に使うと読みづらい。重要シーンに限る。",
  variants: cv(),
  code: ({ color }) => ({
    html: `<h2 class="mist">あなたへのメッセージ</h2>`,
    css: `.mist { font-family: 'Cormorant Garamond', 'Noto Serif JP', serif; font-style: italic; font-weight: 500; color: ${color.hex}; letter-spacing: .04em; animation: mistAppear 3.2s ease-out infinite; }
@keyframes mistAppear { 0%{ opacity: 0; filter: blur(16px); letter-spacing: .25em } 50%{ opacity: 1; filter: blur(0); letter-spacing: .04em } 100%{ opacity: 0; filter: blur(8px); letter-spacing: .12em } }`,
    tailwind: `// React版を参照`,
    react: `export function MistText({ children = "あなたへのメッセージ" }) {
  return (
    <h2 className="font-serif text-4xl font-medium italic tracking-wide"
      style={{ color: "${color.hex}", animation: "mistAppear 3.2s ease-out infinite" }}>
      {children}
    </h2>
  );
}`,
  }),
  prompt: ({ color }) =>
    `占い結果の登場演出として、見出しを blur(16px) opacity 0 letter-spacing .25em から、blur(0) opacity 1 letter-spacing .04em にゆっくり収束させる『霧から浮かぶ』アニメを実装してください。色は ${color.tw}-500、セリフ italic、3.2秒ease-outで無限ループ（または単発で once）。`,
};

/* ============================================================
   集約
   ============================================================ */

export const EXTRA_ARCHETYPES: ExtraArchetype<any>[] = [
  // CTA
  ctaGlow,
  ctaGradient,
  ctaOutline,
  ctaShimmer,
  ctaArrow,
  cta3d,
  // Card
  cardGlass,
  cardLift,
  cardBorderGlow,
  cardTilt,
  cardNumbered,
  // Card - Mystical
  cardMystical,
  cardGoldFrame,
  cardNightSky,
  cardGlowEdge,
  cardCrystalBall,
  cardMoonPhases,
  cardZodiacWheel,
  cardRunes,
  cardTarotFlow,
  cardTarotPhoto,
  cardTarotPhotoFlow,
  cardPhotoOverlay,
  cardPhotoPolaroid,
  cardPhotoMagazine,
  cardPhotoVintage,
  cardPhotoDuotone,
  cardPhotoOrnateFrame,
  // Hover
  hoverUnderline,
  hoverGlow,
  hoverImageZoom,
  hoverShiftBg,
  // Background
  bgGrid,
  bgDots,
  bgConic,
  bgAurora,
  bgNoise,
  // Text
  textGradient,
  textMarker,
  textOutline,
  textShadowPop,
  // SVG
  svgWave,
  svgBlob,
  svgZigzag,
  // Stats
  statBigNumber,
  // Form
  formFloating,
  formSearch,
  // FAQ
  faqPlus,
  // Empty / Error
  emptyState,
  errorState,
  // Hero
  heroSplit,
  heroCentered,
  heroMinimal,
  heroGradient,
  heroBadgeNews,
  heroStats,
  heroMockup,
  heroDiagonal,
  heroVideoBg,
  // Icon
  iconLightbulb,
  iconGears,
  iconRocket,
  iconFireworks,
  iconSparkles,
  iconLockUnlock,
  iconHeartBurst,
  iconWifi,
  iconPaperPlane,
  iconBell,
  iconClock,
  iconTypewriter,
  // Font
  fontGlitch,
  font3D,
  fontLongShadow,
  fontNeon,
  fontWave,
  fontStrokeFill,
  fontGradientAnim,
  fontEmboss,
  fontStripe,
  fontStretch,
  fontReveal,
  fontHandwriting,
  fontPrintCmyk,
  fontMixedSize,
  fontReverse,
  // Font - Mystical / Fortune
  fontMysticShimmer,
  fontTarotFrame,
  fontCrystalBall,
  fontMoonGlow,
  fontConstellation,
  fontMistFade,
];

export const EXTRA_ARCHETYPE_BY_ID = Object.fromEntries(
  EXTRA_ARCHETYPES.map((a) => [a.id, a])
);
