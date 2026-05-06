// 25 loading archetypes. Each archetype × 5 colors × 2 sizes × 4 speeds = 40 patterns.
// 25 × 40 = 1000 patterns.

import type { ArchetypeMeta, ResolvedParams } from "./types";

const A = (m: ArchetypeMeta) => m;

/* ---------- 1. spinner-classic ---------- */
const spinnerClassic = A({
  id: "spinner-classic",
  baseTitle: "クラシックスピナー",
  category: "loading",
  baseMood: ["ミニマル", "テック"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "ボタン押下時、データ取得中、初回ロード時の最小限の待ち。",
  effect: "「処理が動いている」と最小単位で伝える。フリーズ誤解を防ぐ。",
  suitableFor: ["管理画面", "SaaS", "フォーム送信内"],
  badUsage: "3秒以上の処理にスピナーだけ置くと不安が増す。長い処理はプログレスや段階表示にする。",
  similar: ["spinner-dual", "spinner-dotted"],
  code: ({ color, size, speed }) => ({
    html: `<div class="spinner" role="status" aria-label="loading"></div>`,
    css: `.spinner {
  width: ${size.px}px;
  height: ${size.px}px;
  border-radius: 9999px;
  border: 3px solid rgba(0,0,0,.10);
  border-top-color: ${color.hex};
  animation: spin ${speed.sec}s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`,
    tailwind: `<div role="status" aria-label="loading"
  className="rounded-full border-[3px] border-zinc-200 border-t-${color.tw}-500 animate-spin"
  style={{ width: ${size.px}, height: ${size.px}, animationDuration: "${speed.sec}s" }} />`,
    react: `export function Spinner() {
  return (
    <div role="status" aria-label="loading"
      className="rounded-full border-[3px] border-zinc-200 border-t-${color.tw}-500 animate-spin"
      style={{ width: ${size.px}, height: ${size.px}, animationDuration: "${speed.sec}s" }} />
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.jp}サイズの${color.jp}クラシックスピナー（${size.px}px、${speed.sec}秒で1回転）を、ボタン送信中の表示に追加してください。Tailwindで上の border 色だけ ${color.tw}-500、他は zinc-200 にし、animate-spin を使ってください。aria-label='loading' を付けてください。`,
});

/* ---------- 2. spinner-dual ---------- */
const spinnerDual = A({
  id: "spinner-dual",
  baseTitle: "ダブルリングスピナー",
  category: "loading",
  baseMood: ["テック", "上品"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ダッシュボードや主要処理の待機。シンプルすぎず、かといって派手でもないバランス。",
  effect: "外側と内側で逆回転して情報量がワンランク増す。動きにリッチさが出る。",
  suitableFor: ["管理画面", "BtoB SaaS", "アプリの初期ロード"],
  badUsage: "小さすぎると2リングが潰れて1本に見える。${px}px以下なら1リングのほうが綺麗。",
  similar: ["spinner-classic", "spinner-dotted"],
  code: ({ color, size, speed }) => ({
    html: `<div class="dual-spin" role="status" aria-label="loading">
  <span class="ring outer"></span>
  <span class="ring inner"></span>
</div>`,
    css: `.dual-spin { position: relative; width: ${size.px}px; height: ${size.px}px; }
.dual-spin .ring { position: absolute; inset: 0; border-radius: 9999px; border: 3px solid transparent; }
.dual-spin .outer { border-top-color: ${color.hex}; animation: spin ${speed.sec}s linear infinite; }
.dual-spin .inner { inset: 6px; border-bottom-color: ${color.hex}; animation: spin ${(speed.sec * 1.4).toFixed(2)}s linear infinite reverse; }
@keyframes spin { to { transform: rotate(360deg); } }`,
    tailwind: `<div className="relative" style={{ width: ${size.px}, height: ${size.px} }} role="status" aria-label="loading">
  <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-${color.tw}-500 animate-spin"
    style={{ animationDuration: "${speed.sec}s" }} />
  <span className="absolute inset-1.5 rounded-full border-[3px] border-transparent border-b-${color.tw}-500 animate-spin"
    style={{ animationDuration: "${(speed.sec * 1.4).toFixed(2)}s", animationDirection: "reverse" }} />
</div>`,
    react: `export function DualSpinner() {
  return (
    <div className="relative" style={{ width: ${size.px}, height: ${size.px} }} role="status" aria-label="loading">
      <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-${color.tw}-500 animate-spin"
        style={{ animationDuration: "${speed.sec}s" }} />
      <span className="absolute inset-1.5 rounded-full border-[3px] border-transparent border-b-${color.tw}-500 animate-spin"
        style={{ animationDuration: "${(speed.sec * 1.4).toFixed(2)}s", animationDirection: "reverse" }} />
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${color.jp}のダブルリングスピナー（${size.px}px、外側${speed.sec}秒で時計回り、内側はその1.4倍の周期で逆回り）をローディング表示に使ってください。色は ${color.tw}-500、Tailwindの animate-spin と animationDirection: 'reverse' を使ってください。`,
});

/* ---------- 3. spinner-dotted ---------- */
const spinnerDotted = A({
  id: "spinner-dotted",
  baseTitle: "ドットスピナー",
  category: "loading",
  baseMood: ["柔らかい", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "ホビー・BtoCサイトの可愛い待機表示。アプリ初期ロードや画像読み込み。",
  effect: "8つのドットが順に明滅し、機械的すぎない柔らかな『動き』を出せる。",
  suitableFor: ["BtoC LP", "メディアサイト", "コミュニティ"],
  badUsage: "BtoBの硬いダッシュボードでは可愛すぎる。色を派手にしすぎない。",
  similar: ["spinner-classic", "spinner-dual"],
  code: ({ color, size, speed }) => ({
    html: `<div class="dot-spin" role="status" aria-label="loading">
  ${Array.from({ length: 8 }, () => `<span class="dot"></span>`).join("\n  ")}
</div>`,
    css: `.dot-spin { position: relative; width: ${size.px}px; height: ${size.px}px; }
.dot-spin .dot { position: absolute; left: 50%; top: 0; width: ${Math.max(4, Math.round(size.px / 9))}px; height: ${Math.max(4, Math.round(size.px / 9))}px; margin-left: -${Math.max(2, Math.round(size.px / 18))}px; border-radius: 9999px; background: ${color.hex}; opacity: 0; animation: dotFade ${speed.sec * 1.2}s linear infinite; }
${Array.from({ length: 8 }, (_, i) => `.dot-spin .dot:nth-child(${i + 1}) { transform: rotate(${i * 45}deg) translateY(${size.px / 2 - Math.max(2, Math.round(size.px / 18))}px); animation-delay: ${(-i * 0.12).toFixed(2)}s; }`).join("\n")}
@keyframes dotFade { 0% { opacity: 1; } 100% { opacity: 0; } }`,
    tailwind: `// CSSベースで実装するのが簡潔です。React版を参照してください。`,
    react: `export function DotSpinner() {
  const dots = Array.from({ length: 8 });
  return (
    <div className="relative" style={{ width: ${size.px}, height: ${size.px} }} role="status" aria-label="loading">
      {dots.map((_, i) => (
        <span key={i}
          className="absolute left-1/2 top-0 -ml-[${Math.max(2, Math.round(size.px / 18))}px] rounded-full bg-${color.tw}-500"
          style={{
            width: ${Math.max(4, Math.round(size.px / 9))},
            height: ${Math.max(4, Math.round(size.px / 9))},
            transform: \`rotate(\${i * 45}deg) translateY(${size.px / 2 - Math.max(2, Math.round(size.px / 18))}px)\`,
            animation: \`dotFade ${speed.sec * 1.2}s linear infinite\`,
            animationDelay: \`\${-i * 0.12}s\`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx global>{\`@keyframes dotFade { 0% { opacity: 1; } 100% { opacity: 0; } }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.px}px の円周上に8つのドットを ${color.tw}-500 で並べ、順番に明→暗にフェードする『ドットスピナー』を実装してください。1周は約${(speed.sec * 1.2).toFixed(1)}秒、各ドットの遅延は0.12秒ずつずらしてください。Reactで実装してください。`,
});

/* ---------- 4. spinner-conic ---------- */
const spinnerConic = A({
  id: "spinner-conic",
  baseTitle: "コニックスピナー",
  category: "loading",
  baseMood: ["モダン", "テック"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ロゴや主要画面のロード。1色グラデーションでモダンに見せたい時。",
  effect: "conic-gradientで色のフェードを綺麗に作れる。border型より滑らか。",
  suitableFor: ["AI/SaaS LP", "モダンなコーポレート", "ガジェット系"],
  badUsage: "古いブラウザ（IE11等）非対応。社内システムで対応必要なら border 型を使う。",
  similar: ["spinner-classic"],
  code: ({ color, size, speed }) => ({
    html: `<div class="conic-spin" role="status" aria-label="loading"></div>`,
    css: `.conic-spin {
  width: ${size.px}px; height: ${size.px}px; border-radius: 9999px;
  background: conic-gradient(from 0deg, transparent 0%, ${color.hex} 90%);
  -webkit-mask: radial-gradient(circle at center, transparent 55%, #000 56%);
          mask: radial-gradient(circle at center, transparent 55%, #000 56%);
  animation: spin ${speed.sec}s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`,
    tailwind: `<div role="status" aria-label="loading"
  className="rounded-full animate-spin"
  style={{
    width: ${size.px}, height: ${size.px},
    animationDuration: "${speed.sec}s",
    background: "conic-gradient(from 0deg, transparent 0%, ${color.hex} 90%)",
    WebkitMask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
    mask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
  }}
/>`,
    react: `export function ConicSpinner() {
  return (
    <div role="status" aria-label="loading"
      className="rounded-full animate-spin"
      style={{
        width: ${size.px}, height: ${size.px},
        animationDuration: "${speed.sec}s",
        background: "conic-gradient(from 0deg, transparent 0%, ${color.hex} 90%)",
        WebkitMask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
        mask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
      }}
    />
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `conic-gradient で transparent → ${color.hex} のグラデーションを 90% で締めるスピナーを ${size.px}px で実装してください。中心を radial-gradient mask で抜いてリング型にし、${speed.sec}秒で1回転させてください。`,
});

/* ---------- 5. spinner-dashed ---------- */
const spinnerDashed = A({
  id: "spinner-dashed",
  baseTitle: "破線スピナー",
  category: "loading",
  baseMood: ["ミニマル", "アート"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "アート系・ポートフォリオサイトの個性的なロード表示。",
  effect: "破線が回ることで、スピナーに『線画』のニュアンスが乗る。普通の塗りより軽快。",
  suitableFor: ["ポートフォリオ", "クリエイティブエージェンシー", "ブログ"],
  badUsage: "小さすぎると破線が見えない。${px}px未満では潰れる。",
  similar: ["spinner-classic"],
  code: ({ color, size, speed }) => ({
    html: `<svg class="dashed-spin" viewBox="0 0 50 50" role="status" aria-label="loading">
  <circle cx="25" cy="25" r="22" fill="none" stroke="${color.hex}" stroke-width="3" stroke-dasharray="8 6" stroke-linecap="round"/>
</svg>`,
    css: `.dashed-spin { width: ${size.px}px; height: ${size.px}px; animation: spin ${speed.sec}s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }`,
    tailwind: `<svg viewBox="0 0 50 50" className="animate-spin"
  style={{ width: ${size.px}, height: ${size.px}, animationDuration: "${speed.sec}s" }}>
  <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" className="text-${color.tw}-500" />
</svg>`,
    react: `export function DashedSpinner() {
  return (
    <svg viewBox="0 0 50 50" className="animate-spin text-${color.tw}-500"
      style={{ width: ${size.px}, height: ${size.px}, animationDuration: "${speed.sec}s" }}>
      <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="3"
        strokeDasharray="8 6" strokeLinecap="round" />
    </svg>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.px}px の破線スピナーを SVG で実装してください。circle に stroke-dasharray='8 6'、色は ${color.tw}-500、丸い線端、${speed.sec}秒で1回転です。`,
});

/* ---------- 6. dots-bounce ---------- */
const dotsBounce = A({
  id: "dots-bounce",
  baseTitle: "ドット 3点バウンス",
  category: "loading",
  baseMood: ["フレンドリー", "BtoC"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "チャット送信中、メッセージ取得中、軽い読み込み。",
  effect: "3つのドットが順に跳ねることで、システムが『考え中』であると親しみやすく示す。",
  suitableFor: ["チャットUI", "BtoC LP", "サポート画面"],
  badUsage: "管理画面の重要処理に使うと軽すぎる。",
  similar: ["dots-fade", "dots-scale", "typing-dots"],
  code: ({ color, size, speed }) => {
    const dot = Math.max(6, Math.round(size.px / 5));
    return ({
      html: `<div class="dot-bounce" role="status" aria-label="loading">
  <span></span><span></span><span></span>
</div>`,
      css: `.dot-bounce { display: inline-flex; gap: ${Math.round(dot * 0.6)}px; align-items: center; }
.dot-bounce span { width: ${dot}px; height: ${dot}px; border-radius: 9999px; background: ${color.hex}; animation: bounce ${speed.sec}s ease-in-out infinite; }
.dot-bounce span:nth-child(2) { animation-delay: ${(speed.sec / 6).toFixed(2)}s; }
.dot-bounce span:nth-child(3) { animation-delay: ${(speed.sec / 3).toFixed(2)}s; }
@keyframes bounce { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-${Math.round(dot * 0.9)}px); opacity: 1; } }`,
      tailwind: `<div role="status" aria-label="loading" className="inline-flex items-center gap-[${Math.round(dot * 0.6)}px]">
  {[0, 1, 2].map((i) => (
    <span key={i} className="rounded-full bg-${color.tw}-500"
      style={{
        width: ${dot}, height: ${dot},
        animation: \`dbBounce ${speed.sec}s ease-in-out infinite\`,
        animationDelay: \`\${i * ${(speed.sec / 6).toFixed(2)}}s\`,
      }} />
  ))}
  <style jsx>{\`@keyframes dbBounce { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-${Math.round(dot * 0.9)}px); opacity: 1; } }\`}</style>
</div>`,
      react: `export function DotsBounce() {
  return (
    <div role="status" aria-label="loading" className="inline-flex items-center gap-[${Math.round(dot * 0.6)}px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="rounded-full bg-${color.tw}-500"
          style={{
            width: ${dot}, height: ${dot},
            animation: \`dbBounce ${speed.sec}s ease-in-out infinite\`,
            animationDelay: \`\${i * ${(speed.sec / 6).toFixed(2)}}s\`,
          }} />
      ))}
      <style jsx global>{\`@keyframes dbBounce { 0%,80%,100% { transform: translateY(0); opacity: .5; } 40% { transform: translateY(-${Math.round(dot * 0.9)}px); opacity: 1; } }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, size, speed }) =>
    `${color.jp}の3点バウンスドットを実装してください。ドット径は${Math.max(6, Math.round(size.px / 5))}px、${speed.sec}秒の ease-in-out 無限ループで上方向に跳ねるアニメ。各ドットは少しずつ delay をずらしてください。`,
});

/* ---------- 7. dots-fade ---------- */
const dotsFade = A({
  id: "dots-fade",
  baseTitle: "ドット 3点フェード",
  category: "loading",
  baseMood: ["ミニマル", "BtoB"],
  baseTags: ["CSS", "Tailwind"],
  difficulty: "easy",
  useCase: "チャット風UIや控えめにしたい待機表示。",
  effect: "上下に動かさず opacity だけ揺らす、最も静かな『考え中』表現。",
  suitableFor: ["BtoB", "落ち着いたフォーム", "ダッシュボード"],
  badUsage: "ホビーサイトでは弱すぎる。",
  similar: ["dots-bounce", "dots-scale"],
  code: ({ color, size, speed }) => {
    const dot = Math.max(6, Math.round(size.px / 5));
    return ({
      html: `<div class="dot-fade">
  <span></span><span></span><span></span>
</div>`,
      css: `.dot-fade { display:inline-flex; gap:${Math.round(dot*0.6)}px; }
.dot-fade span { width:${dot}px; height:${dot}px; border-radius:9999px; background:${color.hex}; opacity:.25; animation: dfFade ${speed.sec}s ease-in-out infinite; }
.dot-fade span:nth-child(2){ animation-delay:${(speed.sec/4).toFixed(2)}s }
.dot-fade span:nth-child(3){ animation-delay:${(speed.sec/2).toFixed(2)}s }
@keyframes dfFade { 0%,100%{opacity:.25} 50%{opacity:1} }`,
      tailwind: `<div className="inline-flex gap-[${Math.round(dot*0.6)}px]">
  {[0,1,2].map(i => (
    <span key={i} className="rounded-full bg-${color.tw}-500"
      style={{ width:${dot}, height:${dot}, opacity:.25,
        animation:\`dfFade ${speed.sec}s ease-in-out infinite\`,
        animationDelay:\`\${i*${(speed.sec/4).toFixed(2)}}s\` }} />
  ))}
  <style jsx>{\`@keyframes dfFade { 0%,100%{opacity:.25} 50%{opacity:1} }\`}</style>
</div>`,
      react: `export function DotsFade() {
  return (
    <div className="inline-flex gap-[${Math.round(dot*0.6)}px]" role="status" aria-label="loading">
      {[0,1,2].map(i => (
        <span key={i} className="rounded-full bg-${color.tw}-500"
          style={{ width:${dot}, height:${dot}, opacity:.25,
            animation:\`dfFade ${speed.sec}s ease-in-out infinite\`,
            animationDelay:\`\${i*${(speed.sec/4).toFixed(2)}}s\` }} />
      ))}
      <style jsx global>{\`@keyframes dfFade { 0%,100%{opacity:.25} 50%{opacity:1} }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, speed }) =>
    `${color.jp}の3点ドットを、opacityだけ 0.25↔1 に揺らすフェードアニメで実装してください。${speed.sec}秒周期、各ドットは1/4周期ずつ遅延を入れてください。`,
});

/* ---------- 8. dots-scale ---------- */
const dotsScale = A({
  id: "dots-scale",
  baseTitle: "ドット 3点スケール",
  category: "loading",
  baseMood: ["柔らかい", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "やわらかいプロダクトの読み込み。BtoBよりBtoC寄り。",
  effect: "拡大縮小で『鼓動』のような印象を作る。フェードよりやや感情的。",
  suitableFor: ["BtoC", "教育", "メディカル系"],
  badUsage: "ピッチが速すぎると不安を煽る。",
  similar: ["dots-bounce", "dots-fade"],
  code: ({ color, size, speed }) => {
    const dot = Math.max(8, Math.round(size.px / 4));
    return ({
      html: `<div class="dot-scale"><span></span><span></span><span></span></div>`,
      css: `.dot-scale { display:inline-flex; gap:${Math.round(dot*0.5)}px; align-items:center; }
.dot-scale span { width:${dot}px; height:${dot}px; border-radius:9999px; background:${color.hex}; transform: scale(.6); animation: dsScale ${speed.sec}s ease-in-out infinite; }
.dot-scale span:nth-child(2){ animation-delay:${(speed.sec/4).toFixed(2)}s }
.dot-scale span:nth-child(3){ animation-delay:${(speed.sec/2).toFixed(2)}s }
@keyframes dsScale { 0%,100%{transform:scale(.6); opacity:.4} 50%{transform:scale(1); opacity:1} }`,
      tailwind: `// React版を参照`,
      react: `export function DotsScale() {
  return (
    <div className="inline-flex items-center gap-[${Math.round(dot*0.5)}px]">
      {[0,1,2].map(i => (
        <span key={i} className="rounded-full bg-${color.tw}-500"
          style={{ width:${dot}, height:${dot},
            animation:\`dsScale ${speed.sec}s ease-in-out infinite\`,
            animationDelay:\`\${i*${(speed.sec/4).toFixed(2)}}s\` }} />
      ))}
      <style jsx global>{\`@keyframes dsScale { 0%,100%{transform:scale(.6); opacity:.4} 50%{transform:scale(1); opacity:1} }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, speed }) =>
    `${color.jp}の3点ドットを、scale(.6)↔scale(1) で鼓動のように脈打たせてください。${speed.sec}秒周期、ease-in-out。`,
});

/* ---------- 9. dots-wave ---------- */
const dotsWave = A({
  id: "dots-wave",
  baseTitle: "ドット 5点ウェーブ",
  category: "loading",
  baseMood: ["フレンドリー", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "目立たせたい待機。検索中・分析中など、少し時間がかかる処理。",
  effect: "5つのドットが順に上下することで波のように見える。3点より華やか。",
  suitableFor: ["検索画面", "分析処理", "アプリ"],
  badUsage: "5点なので幅を取る。1行内のインライン用途には3点を使う。",
  similar: ["dots-bounce", "equalizer"],
  code: ({ color, size, speed }) => {
    const dot = Math.max(6, Math.round(size.px / 6));
    const dur = speed.sec;
    return ({
      html: `<div class="dot-wave">${"<span></span>".repeat(5)}</div>`,
      css: `.dot-wave { display:inline-flex; gap:${Math.round(dot*0.6)}px; align-items:center; }
.dot-wave span { width:${dot}px; height:${dot}px; border-radius:9999px; background:${color.hex}; animation: dwWave ${dur}s ease-in-out infinite; }
${[0,1,2,3,4].map(i => `.dot-wave span:nth-child(${i+1}){ animation-delay:${(i*dur/10).toFixed(2)}s }`).join("\n")}
@keyframes dwWave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-${Math.round(dot*1.4)}px)} }`,
      tailwind: `// React版参照`,
      react: `export function DotsWave() {
  return (
    <div className="inline-flex items-center gap-[${Math.round(dot*0.6)}px]" role="status" aria-label="loading">
      {[0,1,2,3,4].map(i => (
        <span key={i} className="rounded-full bg-${color.tw}-500"
          style={{ width:${dot}, height:${dot},
            animation:\`dwWave ${dur}s ease-in-out infinite\`,
            animationDelay:\`\${i*${(dur/10).toFixed(2)}}s\` }} />
      ))}
      <style jsx global>{\`@keyframes dwWave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-${Math.round(dot*1.4)}px)} }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, speed }) =>
    `${color.jp}のドット5点ウェーブを実装してください。${speed.sec}秒周期、各ドットの delay は 1/10周期ずつずらすことで波打って見せます。translateYで上方向に動かしてください。`,
});

/* ---------- 10. dots-rotate ---------- */
const dotsRotate = A({
  id: "dots-rotate",
  baseTitle: "ドット 円周回転",
  category: "loading",
  baseMood: ["テック", "シンプル"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "汎用的なミニローダー。コンパクトな空間に置きやすい。",
  effect: "3つのドットが円形に回転することで方向感のあるリズムを作る。",
  suitableFor: ["管理画面", "リスト読み込み", "サイドバー"],
  badUsage: "回転速度が速すぎると安っぽくなる。",
  similar: ["spinner-dotted", "orbit-planet"],
  code: ({ color, size, speed }) => {
    const dot = Math.max(6, Math.round(size.px / 5));
    return ({
      html: `<div class="dot-rot"><span></span><span></span><span></span></div>`,
      css: `.dot-rot { position:relative; width:${size.px}px; height:${size.px}px; animation: drSpin ${speed.sec}s linear infinite; }
.dot-rot span { position:absolute; left:50%; top:50%; width:${dot}px; height:${dot}px; margin:-${dot/2}px; border-radius:9999px; background:${color.hex}; }
.dot-rot span:nth-child(1){ transform: rotate(  0deg) translateX(${size.px/2 - dot/2}px) }
.dot-rot span:nth-child(2){ transform: rotate(120deg) translateX(${size.px/2 - dot/2}px) }
.dot-rot span:nth-child(3){ transform: rotate(240deg) translateX(${size.px/2 - dot/2}px) }
@keyframes drSpin { to { transform: rotate(360deg); } }`,
      tailwind: `// React版参照`,
      react: `export function DotsRotate() {
  return (
    <div className="relative animate-spin" style={{ width:${size.px}, height:${size.px}, animationDuration:"${speed.sec}s" }}>
      {[0,120,240].map(deg => (
        <span key={deg} className="absolute left-1/2 top-1/2 rounded-full bg-${color.tw}-500"
          style={{ width:${dot}, height:${dot}, margin:-${dot/2},
            transform:\`rotate(\${deg}deg) translateX(${size.px/2 - dot/2}px)\` }} />
      ))}
    </div>
  );
}`,
    });
  },
  prompt: ({ color, size, speed }) =>
    `${size.px}px のコンテナに、3つのドットを 0°/120°/240° の円配置で並べ、コンテナ全体を ${speed.sec}秒で回転させてください。色は ${color.tw}-500。`,
});

/* ---------- 11. bar-bounce ---------- */
const barBounce = A({
  id: "bar-bounce",
  baseTitle: "バー 5本バウンス",
  category: "loading",
  baseMood: ["テック", "勢い"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ロード進捗・分析中など、力強く伝えたいとき。",
  effect: "5本の縦棒が高さを変える、ややエネルギッシュなローダー。",
  suitableFor: ["分析ダッシュボード", "音楽/動画系", "ゲーム"],
  badUsage: "落ち着いた業種では強すぎる。",
  similar: ["equalizer", "dots-wave"],
  code: ({ color, size, speed }) => {
    const w = Math.max(4, Math.round(size.px / 8));
    const gap = Math.max(2, Math.round(w * 0.6));
    return ({
      html: `<div class="bar-bounce">${"<span></span>".repeat(5)}</div>`,
      css: `.bar-bounce { display:inline-flex; gap:${gap}px; align-items:flex-end; height:${size.px}px; }
.bar-bounce span { width:${w}px; height:30%; background:${color.hex}; border-radius:${w/2}px; animation: bbBar ${speed.sec}s ease-in-out infinite; }
${[0,1,2,3,4].map(i => `.bar-bounce span:nth-child(${i+1}){ animation-delay:${(i*speed.sec/8).toFixed(2)}s }`).join("\n")}
@keyframes bbBar { 0%,100%{height:30%} 50%{height:100%} }`,
      tailwind: `// React版参照`,
      react: `export function BarBounce() {
  return (
    <div className="inline-flex items-end" style={{ gap:${gap}, height:${size.px} }}>
      {[0,1,2,3,4].map(i => (
        <span key={i} className="bg-${color.tw}-500"
          style={{ width:${w}, borderRadius:${w/2},
            animation:\`bbBar ${speed.sec}s ease-in-out infinite\`,
            animationDelay:\`\${i*${(speed.sec/8).toFixed(2)}}s\` }} />
      ))}
      <style jsx global>{\`@keyframes bbBar { 0%,100%{height:30%} 50%{height:100%} }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, size, speed }) =>
    `${size.px}px の高さで、${color.jp}の縦棒5本が30%↔100%で高さアニメするローダーを実装してください。${speed.sec}秒周期、ease-in-out、各バーは1/8周期ずつdelay。`,
});

/* ---------- 12. equalizer ---------- */
const equalizer = A({
  id: "equalizer",
  baseTitle: "イコライザー（4本バー）",
  category: "loading",
  baseMood: ["音楽", "テック"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "音声・動画系の再生中インジケーター、ストリーミング処理中表示。",
  effect: "音楽プレイヤーのような4本バーが個別に変動。『再生中・処理中』を強く訴求。",
  suitableFor: ["音楽/Podcastアプリ", "動画配信", "ストリーミングデータ"],
  badUsage: "金融などお堅いプロダクトには合わない。",
  similar: ["bar-bounce"],
  code: ({ color, size, speed }) => {
    const w = Math.max(4, Math.round(size.px / 8));
    const gap = Math.max(2, Math.round(w * 0.7));
    return ({
      html: `<div class="eq">${"<span></span>".repeat(4)}</div>`,
      css: `.eq { display:inline-flex; gap:${gap}px; align-items:flex-end; height:${size.px}px; }
.eq span { width:${w}px; background:${color.hex}; border-radius:${w/2}px; animation: eqBar ${speed.sec}s ease-in-out infinite; transform-origin: bottom; }
.eq span:nth-child(1){ animation-duration:${(speed.sec*1.0).toFixed(2)}s }
.eq span:nth-child(2){ animation-duration:${(speed.sec*0.7).toFixed(2)}s }
.eq span:nth-child(3){ animation-duration:${(speed.sec*1.3).toFixed(2)}s }
.eq span:nth-child(4){ animation-duration:${(speed.sec*0.9).toFixed(2)}s }
@keyframes eqBar { 0%,100%{height:25%} 50%{height:100%} }`,
      tailwind: `// React版参照`,
      react: `export function Equalizer() {
  const durs = [${(speed.sec).toFixed(2)}, ${(speed.sec*0.7).toFixed(2)}, ${(speed.sec*1.3).toFixed(2)}, ${(speed.sec*0.9).toFixed(2)}];
  return (
    <div className="inline-flex items-end" style={{ gap:${gap}, height:${size.px} }}>
      {durs.map((d, i) => (
        <span key={i} className="bg-${color.tw}-500"
          style={{ width:${w}, borderRadius:${w/2},
            animation:\`eqBar \${d}s ease-in-out infinite\` }} />
      ))}
      <style jsx global>{\`@keyframes eqBar { 0%,100%{height:25%} 50%{height:100%} }\`}</style>
    </div>
  );
}`,
    });
  },
  prompt: ({ color, size, speed }) =>
    `音楽イコライザー風の4本縦棒ローダー（${size.px}px、色 ${color.tw}-500）を実装してください。各バーは 25%↔100% で高さ変動、duration を ${speed.sec}/0.7s/1.3s/0.9s と少しずつズラして自然なランダム感を出してください。`,
});

/* ---------- 13. progress-linear ---------- */
const progressLinear = A({
  id: "progress-linear",
  baseTitle: "リニアプログレス（不確定）",
  category: "loading",
  baseMood: ["ミニマル", "BtoB"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "ページ全体やセクションのロード時、進捗が分からない処理の上部バー。",
  effect: "細いバーが流れることで『動いている』ことを最小限の表現で示す。",
  suitableFor: ["管理画面の上部", "ページ初期ロード", "API待機"],
  badUsage: "進捗が分かるなら必ず数値プログレスを使う。",
  similar: ["progress-stripe", "spinner-classic"],
  code: ({ color, size, speed }) => ({
    html: `<div class="lin-prog"><span></span></div>`,
    css: `.lin-prog { position: relative; width: 100%; height: ${Math.max(2, Math.round(size.px/14))}px; background: rgba(0,0,0,.06); border-radius: 9999px; overflow: hidden; }
.lin-prog span { position:absolute; top:0; left:-40%; width:40%; height:100%; background:${color.hex}; border-radius:inherit; animation: lpSlide ${speed.sec*1.4}s ease-in-out infinite; }
@keyframes lpSlide { 0%{left:-40%} 50%{left:60%} 100%{left:120%} }`,
    tailwind: `<div className="relative w-full overflow-hidden rounded-full bg-zinc-200" style={{ height:${Math.max(2, Math.round(size.px/14))} }}>
  <span className="absolute inset-y-0 -left-2/5 w-2/5 rounded-full bg-${color.tw}-500"
    style={{ animation:"lpSlide ${(speed.sec*1.4).toFixed(2)}s ease-in-out infinite" }} />
  <style jsx global>{\`@keyframes lpSlide { 0%{left:-40%} 50%{left:60%} 100%{left:120%} }\`}</style>
</div>`,
    react: `export function LinearProgress() {
  return (
    <div className="relative w-full overflow-hidden rounded-full bg-zinc-200" style={{ height:${Math.max(2, Math.round(size.px/14))} }} role="progressbar">
      <span className="absolute inset-y-0 w-2/5 rounded-full bg-${color.tw}-500"
        style={{ left:"-40%", animation:"lpSlide ${(speed.sec*1.4).toFixed(2)}s ease-in-out infinite" }} />
      <style jsx global>{\`@keyframes lpSlide { 0%{left:-40%} 50%{left:60%} 100%{left:120%} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, speed }) =>
    `不確定リニアプログレスバーを実装してください。背景は zinc-200、内側のバーは幅40%で ${color.tw}-500、left を -40%→120% に ${(speed.sec*1.4).toFixed(2)}秒で流すアニメ。`,
});

/* ---------- 14. progress-stripe ---------- */
const progressStripe = A({
  id: "progress-stripe",
  baseTitle: "ストライプ進捗バー",
  category: "loading",
  baseMood: ["勢い", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "アップロード中・処理中など、少し勢いのある進捗表示。",
  effect: "斜めストライプが流れることで『進んでいる』感が増す。Bootstrap風の懐かしい印象。",
  suitableFor: ["管理画面", "データインポート", "ダウンロード"],
  badUsage: "高級感を出したいサイトには合わない。",
  similar: ["progress-linear"],
  code: ({ color, size, speed }) => ({
    html: `<div class="stripe-prog"><span></span></div>`,
    css: `.stripe-prog { width:100%; height:${Math.max(8, Math.round(size.px/4))}px; border-radius:9999px; background: rgba(0,0,0,.06); overflow:hidden; }
.stripe-prog span { display:block; width:65%; height:100%; background-color:${color.hex}; background-image: linear-gradient(45deg, rgba(255,255,255,.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.25) 50%, rgba(255,255,255,.25) 75%, transparent 75%, transparent); background-size: 24px 24px; border-radius:inherit; animation: spStripe ${speed.sec}s linear infinite; }
@keyframes spStripe { from{background-position:0 0} to{background-position:48px 0} }`,
    tailwind: `// React版参照`,
    react: `export function StripeProgress({ value = 65 }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-zinc-200" style={{ height:${Math.max(8, Math.round(size.px/4))} }}>
      <span className="block h-full rounded-full bg-${color.tw}-500"
        style={{
          width: \`\${value}%\`,
          backgroundImage: "linear-gradient(45deg, rgba(255,255,255,.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.25) 50%, rgba(255,255,255,.25) 75%, transparent 75%, transparent)",
          backgroundSize: "24px 24px",
          animation: "spStripe ${speed.sec}s linear infinite"
        }} />
      <style jsx global>{\`@keyframes spStripe { from{background-position:0 0} to{background-position:48px 0} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, speed }) =>
    `ストライプ進捗バーを実装してください。背景は zinc-200、塗りは ${color.tw}-500 の上に45度のストライプ、background-position を ${speed.sec}秒で流して進んでいる感を出してください。`,
});

/* ---------- 15. ripple ---------- */
const ripple = A({
  id: "ripple",
  baseTitle: "リップル波紋",
  category: "loading",
  baseMood: ["柔らかい", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "位置情報の取得中、デバイス検索中、Bluetooth接続中など『電波感』のある処理。",
  effect: "中心から円が広がりフェードアウト。空間に広がる『探している』感を出せる。",
  suitableFor: ["位置情報アプリ", "デバイス連携", "通信処理"],
  badUsage: "通常のローディングには大げさ。",
  similar: ["pulse-ring", "magnifier-search"],
  code: ({ color, size, speed }) => ({
    html: `<div class="ripple"><span></span><span></span></div>`,
    css: `.ripple { position:relative; width:${size.px}px; height:${size.px}px; }
.ripple span { position:absolute; inset:0; border-radius:9999px; border:2px solid ${color.hex}; opacity:0; animation: rip ${speed.sec*1.6}s cubic-bezier(0,.2,.8,1) infinite; }
.ripple span:nth-child(2){ animation-delay:${(speed.sec*0.8).toFixed(2)}s }
@keyframes rip { from{transform:scale(.2); opacity:1} to{transform:scale(1.4); opacity:0} }`,
    tailwind: `// React版参照`,
    react: `export function Ripple() {
  return (
    <div className="relative" style={{ width:${size.px}, height:${size.px} }} role="status" aria-label="loading">
      {[0,1].map(i => (
        <span key={i} className="absolute inset-0 rounded-full border-2 border-${color.tw}-500"
          style={{ opacity:0,
            animation:\`rip ${(speed.sec*1.6).toFixed(2)}s cubic-bezier(0,.2,.8,1) infinite\`,
            animationDelay:\`\${i*${(speed.sec*0.8).toFixed(2)}}s\` }} />
      ))}
      <style jsx global>{\`@keyframes rip { from{transform:scale(.2); opacity:1} to{transform:scale(1.4); opacity:0} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.px}px の中心から ${color.tw}-500 の円が広がって消える『リップル波紋』を実装してください。${(speed.sec*1.6).toFixed(2)}秒周期で2つの円を半周期遅らせて重ねることで、連続した波に見せます。`,
});

/* ---------- 16. pulse-ring ---------- */
const pulseRing = A({
  id: "pulse-ring",
  baseTitle: "パルスリング",
  category: "loading",
  baseMood: ["柔らかい", "BtoB"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "通知バッジ、ライブ中バッジ、注目アイコン横の演出。",
  effect: "中心ドット＋外側リングが広がってフェード。注目させたい要素に添える小さな脈動。",
  suitableFor: ["通知バッジ", "ライブ配信中", "新着インジケータ"],
  badUsage: "1画面に複数置くと視線が散る。",
  similar: ["ripple"],
  code: ({ color, size, speed }) => ({
    html: `<div class="pulse-ring"><span class="dot"></span><span class="ring"></span></div>`,
    css: `.pulse-ring { position:relative; width:${size.px}px; height:${size.px}px; }
.pulse-ring .dot { position:absolute; inset:30%; border-radius:9999px; background:${color.hex}; }
.pulse-ring .ring { position:absolute; inset:0; border-radius:9999px; background:${color.hex}; opacity:.4; animation: prPulse ${speed.sec*1.4}s ease-out infinite; }
@keyframes prPulse { 0%{transform:scale(.6); opacity:.5} 100%{transform:scale(1.3); opacity:0} }`,
    tailwind: `// React版参照`,
    react: `export function PulseRing() {
  return (
    <div className="relative" style={{ width:${size.px}, height:${size.px} }}>
      <span className="absolute inset-[30%] rounded-full bg-${color.tw}-500" />
      <span className="absolute inset-0 rounded-full bg-${color.tw}-500"
        style={{ opacity:.4, animation:\`prPulse ${(speed.sec*1.4).toFixed(2)}s ease-out infinite\` }} />
      <style jsx global>{\`@keyframes prPulse { 0%{transform:scale(.6); opacity:.5} 100%{transform:scale(1.3); opacity:0} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `通知バッジ用のパルスリングを実装してください。${size.px}pxのコンテナに中心ドット ${color.tw}-500 と、外側リングが scale(.6)→scale(1.3) で広がって ${(speed.sec*1.4).toFixed(2)}秒周期でフェードアウトします。`,
});

/* ---------- 17. heart-beat ---------- */
const heartBeat = A({
  id: "heart-beat",
  baseTitle: "ハートビート",
  category: "loading",
  baseMood: ["フレンドリー", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "お気に入り追加中、いいね処理中、ヘルスケア系アプリの待機。",
  effect: "ハートが鼓動するように2回スケール。可愛い演出だが意図が明確。",
  suitableFor: ["BtoC", "ヘルスケア", "SNS"],
  badUsage: "BtoBや業務システムでは浮く。",
  similar: ["pulse-ring", "dots-scale"],
  code: ({ color, size, speed }) => ({
    html: `<div class="heart" aria-label="loading">♥</div>`,
    css: `.heart { display:inline-block; font-size:${size.px}px; line-height:1; color:${color.hex}; animation: hbBeat ${speed.sec*1.2}s ease-in-out infinite; }
@keyframes hbBeat { 0%,40%,100%{transform:scale(1)} 20%{transform:scale(1.25)} 30%{transform:scale(1.1)} }`,
    tailwind: `<div aria-label="loading" className="text-${color.tw}-500"
  style={{ fontSize:${size.px}, lineHeight:1, animation:\`hbBeat ${(speed.sec*1.2).toFixed(2)}s ease-in-out infinite\` }}>♥</div>`,
    react: `export function HeartBeat() {
  return (
    <div aria-label="loading" className="text-${color.tw}-500"
      style={{ fontSize:${size.px}, lineHeight:1, animation:\`hbBeat ${(speed.sec*1.2).toFixed(2)}s ease-in-out infinite\` }}>♥
      <style jsx global>{\`@keyframes hbBeat { 0%,40%,100%{transform:scale(1)} 20%{transform:scale(1.25)} 30%{transform:scale(1.1)} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `ハート（♥）が鼓動するアニメを実装してください。fontSize ${size.px}、色 ${color.tw}-500、scale を 1→1.25→1.1→1 と段階的に変化させる ${(speed.sec*1.2).toFixed(2)}秒周期の keyframe を使ってください。`,
});

/* ---------- 18. magnifier-search ---------- */
const magnifierSearch = A({
  id: "magnifier-search",
  baseTitle: "虫眼鏡サーチ",
  category: "loading",
  baseMood: ["フレンドリー", "親しみ"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "検索処理中、フィルタ適用中、データ走査中。『探している』を直感的に表現。",
  effect: "虫眼鏡が表面をなぞるように動く。ロード中であることに加えて『何をしているか』まで伝わる。",
  suitableFor: ["検索画面", "ファイル一覧", "監査・スキャン系"],
  badUsage: "汎用ロードで使い回すと意味が薄れる。検索/走査の文脈に限定する。",
  similar: ["magnifier-orbit", "ripple"],
  code: ({ color, size, speed }) => ({
    html: `<svg class="mag-search" viewBox="0 0 64 64" aria-label="searching">
  <line x1="6" y1="50" x2="58" y2="50" stroke="rgba(0,0,0,.12)" stroke-width="2" stroke-linecap="round"/>
  <g class="mag">
    <circle cx="0" cy="0" r="10" fill="none" stroke="${color.hex}" stroke-width="3"/>
    <line x1="7" y1="7" x2="14" y2="14" stroke="${color.hex}" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`,
    css: `.mag-search { width:${size.px}px; height:${size.px}px; }
.mag-search .mag { animation: msMove ${speed.sec*1.6}s ease-in-out infinite; }
@keyframes msMove { 0%,100%{transform:translate(14px,32px)} 50%{transform:translate(50px,32px)} }`,
    tailwind: `// React版参照`,
    react: `export function MagnifierSearch() {
  return (
    <svg viewBox="0 0 64 64" aria-label="searching"
      style={{ width:${size.px}, height:${size.px} }}>
      <line x1="6" y1="50" x2="58" y2="50" stroke="rgba(0,0,0,.12)" strokeWidth="2" strokeLinecap="round"/>
      <g style={{ animation:\`msMove ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\` }}>
        <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="3" className="text-${color.tw}-500"/>
        <line x1="7" y1="7" x2="14" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-${color.tw}-500"/>
      </g>
      <style jsx global>{\`@keyframes msMove { 0%,100%{transform:translate(14px,32px)} 50%{transform:translate(50px,32px)} }\`}</style>
    </svg>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `虫眼鏡が表面を左右にスキャンする SVG ローダーを実装してください。サイズ ${size.px}px、色 ${color.tw}-500、虫眼鏡は円+線で構成し、g 要素を translate(14,32)↔translate(50,32) に ${(speed.sec*1.6).toFixed(2)}秒周期で動かします。下部に薄いベースラインを引いてください。`,
});

/* ---------- 19. magnifier-orbit ---------- */
const magnifierOrbit = A({
  id: "magnifier-orbit",
  baseTitle: "虫眼鏡サークル探索",
  category: "loading",
  baseMood: ["フレンドリー", "BtoC"],
  baseTags: ["SVG"],
  difficulty: "hard",
  useCase: "全体スキャン・360度探索の演出。深い検索やインデックス作成中など。",
  effect: "虫眼鏡が円を描いて動くことで『隅々まで探している』感を出せる。",
  suitableFor: ["全文検索", "セキュリティスキャン", "AI解析中"],
  badUsage: "短時間処理で使うとアニメが半端に終わる。",
  similar: ["magnifier-search"],
  code: ({ color, size, speed }) => ({
    html: `<svg class="mag-orbit" viewBox="0 0 100 100" aria-label="searching">
  <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,0,0,.10)" stroke-dasharray="3 4"/>
  <g class="mag">
    <g transform="translate(0,-32)">
      <circle cx="0" cy="0" r="9" fill="none" stroke="${color.hex}" stroke-width="3"/>
      <line x1="6" y1="6" x2="13" y2="13" stroke="${color.hex}" stroke-width="3" stroke-linecap="round"/>
    </g>
  </g>
</svg>`,
    css: `.mag-orbit { width:${size.px}px; height:${size.px}px; }
.mag-orbit .mag { transform-origin: 50px 50px; transform: translate(50px,50px); animation: moSpin ${speed.sec*1.8}s linear infinite; }
@keyframes moSpin { from{transform: translate(50px,50px) rotate(0deg)} to{transform: translate(50px,50px) rotate(360deg)} }`,
    tailwind: `// React版参照`,
    react: `export function MagnifierOrbit() {
  return (
    <svg viewBox="0 0 100 100" aria-label="searching" style={{ width:${size.px}, height:${size.px} }}>
      <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,0,0,.10)" strokeDasharray="3 4"/>
      <g style={{ animation:\`moSpin ${(speed.sec*1.8).toFixed(2)}s linear infinite\` }}>
        <g transform="translate(0,-32)">
          <circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" strokeWidth="3" className="text-${color.tw}-500"/>
          <line x1="6" y1="6" x2="13" y2="13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-${color.tw}-500"/>
        </g>
      </g>
      <style jsx global>{\`@keyframes moSpin { from{transform:translate(50px,50px) rotate(0deg)} to{transform:translate(50px,50px) rotate(360deg)} }\`}</style>
    </svg>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `虫眼鏡が半径32の円軌道をぐるりと回る SVG ローダーを実装してください。${size.px}px、色 ${color.tw}-500、軌道は破線で薄く描き、虫眼鏡を ${(speed.sec*1.8).toFixed(2)}秒で1周させてください。`,
});

/* ---------- 20. line-draw ---------- */
const lineDraw = A({
  id: "line-draw",
  baseTitle: "ライン描画",
  category: "loading",
  baseMood: ["アート", "クリエイティブ"],
  baseTags: ["SVG"],
  difficulty: "medium",
  useCase: "ポートフォリオ・クリエイティブ系サイトの世界観のあるロード。",
  effect: "stroke-dasharrayで線が描かれていくアニメ。手書き感・制作中の雰囲気を出せる。",
  suitableFor: ["デザイナー/イラストレーターのサイト", "クリエイティブ事業", "アート系LP"],
  badUsage: "汎用ローダーとして使うとブランドからズレる。",
  similar: ["circle-draw", "pencil-write"],
  code: ({ color, size, speed }) => ({
    html: `<svg class="line-draw" viewBox="0 0 100 40" aria-label="loading">
  <path d="M5,20 C25,5 45,35 65,20 S95,5 95,20" fill="none" stroke="${color.hex}" stroke-width="3" stroke-linecap="round"/>
</svg>`,
    css: `.line-draw { width:${size.px*1.5}px; height:${size.px*0.6}px; }
.line-draw path { stroke-dasharray: 200; stroke-dashoffset: 200; animation: ldDraw ${speed.sec*1.6}s ease-in-out infinite; }
@keyframes ldDraw { 0%{stroke-dashoffset:200} 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:-200} }`,
    tailwind: `// React版参照`,
    react: `export function LineDraw() {
  return (
    <svg viewBox="0 0 100 40" aria-label="loading"
      style={{ width:${size.px*1.5}, height:${size.px*0.6} }}>
      <path d="M5,20 C25,5 45,35 65,20 S95,5 95,20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        className="text-${color.tw}-500"
        style={{ strokeDasharray:200, strokeDashoffset:200, animation:\`ldDraw ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\` }}/>
      <style jsx global>{\`@keyframes ldDraw { 0%{stroke-dashoffset:200} 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:-200} }\`}</style>
    </svg>
  );
}`,
  }),
  prompt: ({ color, speed }) =>
    `ベジェ曲線が左から右へ描かれていく SVGロード演出を実装してください。色 ${color.tw}-500、stroke-dasharray を ${(speed.sec*1.6).toFixed(2)}秒で 200→0→-200 まで動かして描いた線を消すループに。`,
});

/* ---------- 21. circle-draw ---------- */
const circleDraw = A({
  id: "circle-draw",
  baseTitle: "サークル描画",
  category: "loading",
  baseMood: ["アート", "ミニマル"],
  baseTags: ["SVG"],
  difficulty: "easy",
  useCase: "完了直前のロード、ゲージ風の演出、SNSの『送信中』。",
  effect: "円が時計回りに描かれていく。簡潔でブランドに馴染みやすい。",
  suitableFor: ["SNS", "完了直前の確認", "プロフィール画像周り"],
  badUsage: "1秒未満の処理だと完成しないまま消えるので、duration を1.4秒以上に。",
  similar: ["line-draw", "spinner-conic"],
  code: ({ color, size, speed }) => ({
    html: `<svg class="circle-draw" viewBox="0 0 50 50" aria-label="loading">
  <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="3"/>
  <circle cx="25" cy="25" r="20" fill="none" stroke="${color.hex}" stroke-width="3" stroke-linecap="round" transform="rotate(-90 25 25)"/>
</svg>`,
    css: `.circle-draw { width:${size.px}px; height:${size.px}px; }
.circle-draw circle:last-child { stroke-dasharray: 126; stroke-dashoffset: 126; animation: cdDraw ${speed.sec*1.6}s ease-in-out infinite; }
@keyframes cdDraw { 0%{stroke-dashoffset:126} 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:-126} }`,
    tailwind: `// React版参照`,
    react: `export function CircleDraw() {
  return (
    <svg viewBox="0 0 50 50" aria-label="loading" style={{ width:${size.px}, height:${size.px} }}>
      <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3"/>
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        transform="rotate(-90 25 25)" className="text-${color.tw}-500"
        style={{ strokeDasharray:126, strokeDashoffset:126, animation:\`cdDraw ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\` }}/>
      <style jsx global>{\`@keyframes cdDraw { 0%{stroke-dashoffset:126} 50%{stroke-dashoffset:0} 100%{stroke-dashoffset:-126} }\`}</style>
    </svg>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.px}px のサークル描画ローダーを実装してください。半径20の円を ${color.tw}-500 で描き、stroke-dasharray=126 を 126→0→-126 と ${(speed.sec*1.6).toFixed(2)}秒で動かして、円を一筆書き→消去のループに。背景に薄いリングも添えてください。`,
});

/* ---------- 22. pencil-write ---------- */
const pencilWrite = A({
  id: "pencil-write",
  baseTitle: "ペン描画ローダー",
  category: "loading",
  baseMood: ["アート", "親しみ"],
  baseTags: ["SVG", "CSS"],
  difficulty: "hard",
  useCase: "教育・コーチング・クリエイティブ系の温かみのある待機。",
  effect: "ペン絵文字が動きながら下に線が伸びていく。『書いている／作成中』が伝わる。",
  suitableFor: ["教育サービス", "ノートアプリ", "クリエイティブツール"],
  badUsage: "高速処理に使うと終わる前にループして奇妙に見える。",
  similar: ["line-draw", "circle-draw"],
  code: ({ color, size, speed }) => ({
    html: `<div class="pencil-write" aria-label="loading">
  <span class="pen">✏️</span>
  <span class="line"></span>
</div>`,
    css: `.pencil-write { position:relative; width:${size.px*2}px; height:${size.px}px; }
.pencil-write .pen { position:absolute; left:0; top:50%; font-size:${Math.round(size.px*0.6)}px; transform: translate(0,-50%) rotate(35deg); animation: pwMove ${speed.sec*1.6}s ease-in-out infinite; }
.pencil-write .line { position:absolute; left:0; bottom:30%; height:2px; background:${color.hex}; border-radius:2px; animation: pwLine ${speed.sec*1.6}s ease-in-out infinite; }
@keyframes pwMove { 0%,100%{left:0%} 50%{left:calc(100% - ${Math.round(size.px*0.6)}px)} }
@keyframes pwLine { 0%,100%{width:0%} 50%{width:100%} }`,
    tailwind: `// React版参照`,
    react: `export function PencilWrite() {
  return (
    <div className="relative" style={{ width:${size.px*2}, height:${size.px} }} aria-label="loading">
      <span className="absolute top-1/2" style={{ left:0, fontSize:${Math.round(size.px*0.6)}, transform:"translateY(-50%) rotate(35deg)", animation:\`pwMove ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\` }}>✏️</span>
      <span className="absolute h-0.5 rounded bg-${color.tw}-500" style={{ left:0, bottom:"30%", animation:\`pwLine ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\`, width:0 }} />
      <style jsx global>{\`
        @keyframes pwMove { 0%,100%{left:0%} 50%{left:calc(100% - ${Math.round(size.px*0.6)}px)} }
        @keyframes pwLine { 0%,100%{width:0%} 50%{width:100%} }
      \`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `ペン絵文字（✏️）が左→右に動きながら、下にある線が同期して0%→100%に伸びる『描いている』ローダーを実装してください。コンテナは ${size.px*2}×${size.px}px、線色 ${color.tw}-500、${(speed.sec*1.6).toFixed(2)}秒のease-in-outで往復。`,
});

/* ---------- 23. typing-dots ---------- */
const typingDots = A({
  id: "typing-dots",
  baseTitle: "テキスト＋ドット入力中",
  category: "loading",
  baseMood: ["フレンドリー", "BtoC"],
  baseTags: ["CSS"],
  difficulty: "easy",
  useCase: "チャット相手が入力中の表示、AIアシスタントが考え中の表示。",
  effect: "「Loading」「考え中」などの文字に続くドットが順に明滅。状況が言語で伝わる。",
  suitableFor: ["チャットUI", "AIアシスタント", "サポート"],
  badUsage: "テキストが長すぎると重い。短文（数文字）で使う。",
  similar: ["dots-bounce", "dots-fade"],
  code: ({ color, size, speed }) => ({
    html: `<div class="typing"><span>考え中</span><span class="d">.</span><span class="d">.</span><span class="d">.</span></div>`,
    css: `.typing { display:inline-flex; align-items:baseline; gap:2px; font-size:${Math.round(size.px*0.5)}px; color:${color.hex}; }
.typing .d { opacity:.3; animation: tdDot ${speed.sec*1.2}s ease-in-out infinite; }
.typing .d:nth-child(3){ animation-delay:${(speed.sec/4).toFixed(2)}s }
.typing .d:nth-child(4){ animation-delay:${(speed.sec/2).toFixed(2)}s }
@keyframes tdDot { 0%,100%{opacity:.3} 50%{opacity:1} }`,
    tailwind: `// React版参照`,
    react: `export function TypingDots() {
  return (
    <div className="inline-flex items-baseline gap-px text-${color.tw}-500" style={{ fontSize:${Math.round(size.px*0.5)} }}>
      <span>考え中</span>
      {[0,1,2].map(i => (
        <span key={i} style={{ opacity:.3, animation:\`tdDot ${(speed.sec*1.2).toFixed(2)}s ease-in-out infinite\`, animationDelay:\`\${i*${(speed.sec/4).toFixed(2)}}s\` }}>.</span>
      ))}
      <style jsx global>{\`@keyframes tdDot { 0%,100%{opacity:.3} 50%{opacity:1} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, speed }) =>
    `「考え中」というテキストの後に続くドット3つが順にフェードする『入力中』ローダーを実装してください。色は ${color.tw}-500、各ドットは ${(speed.sec*1.2).toFixed(2)}秒周期で 0.3↔1 を往復、delay を 0/1/2 × 1/4周期で。`,
});

/* ---------- 24. orbit-planet ---------- */
const orbitPlanet = A({
  id: "orbit-planet",
  baseTitle: "オービット（公転）",
  category: "loading",
  baseMood: ["テック", "宇宙"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "AI解析中、計算中、宇宙・天体・サイエンス系コンテンツのロード。",
  effect: "中心点の周りを衛星ドットが公転。少しSF的なテック感を出せる。",
  suitableFor: ["AI/ML系プロダクト", "サイエンス系メディア", "計算処理画面"],
  badUsage: "汎用業務システムでは違和感が出る。",
  similar: ["dots-rotate", "spinner-classic"],
  code: ({ color, size, speed }) => {
    const planet = Math.max(6, Math.round(size.px / 6));
    return ({
      html: `<div class="orbit"><span class="sun"></span><span class="planet"></span></div>`,
      css: `.orbit { position:relative; width:${size.px}px; height:${size.px}px; animation: opSpin ${speed.sec}s linear infinite; }
.orbit .sun { position:absolute; left:50%; top:50%; width:${Math.round(planet*1.4)}px; height:${Math.round(planet*1.4)}px; margin:-${Math.round(planet*0.7)}px; border-radius:9999px; background:${color.hex}; opacity:.4; }
.orbit .planet { position:absolute; left:50%; top:50%; width:${planet}px; height:${planet}px; margin:-${planet/2}px; border-radius:9999px; background:${color.hex}; transform: translateX(${size.px/2 - planet/2}px); }
@keyframes opSpin { to { transform: rotate(360deg); } }`,
      tailwind: `// React版参照`,
      react: `export function Orbit() {
  return (
    <div className="relative animate-spin" style={{ width:${size.px}, height:${size.px}, animationDuration:"${speed.sec}s" }}>
      <span className="absolute left-1/2 top-1/2 rounded-full bg-${color.tw}-500" style={{ width:${Math.round(planet*1.4)}, height:${Math.round(planet*1.4)}, margin:-${Math.round(planet*0.7)}, opacity:.4 }} />
      <span className="absolute left-1/2 top-1/2 rounded-full bg-${color.tw}-500" style={{ width:${planet}, height:${planet}, margin:-${planet/2}, transform:\`translateX(${size.px/2 - planet/2}px)\` }} />
    </div>
  );
}`,
    });
  },
  prompt: ({ color, size, speed }) =>
    `${size.px}px の中心に半透明の太陽（${color.tw}-500/40）、その周囲を ${color.tw}-500 のドットが公転する SVG/CSSローダーを実装してください。コンテナを ${speed.sec}秒で回転させ、衛星はコンテナ中心から右にオフセットして配置します。`,
});

/* ---------- 25. flip-card ---------- */
const flipCard = A({
  id: "flip-card",
  baseTitle: "フリップカード",
  category: "loading",
  baseMood: ["モダン", "アプリ"],
  baseTags: ["CSS"],
  difficulty: "medium",
  useCase: "アプリ全画面ロード、スプラッシュ、ステップ切替時の継ぎ目。",
  effect: "カード状の四角がY軸回転して反転。質感のあるロード。",
  suitableFor: ["モバイルアプリ", "ゲーム", "ブランドサイトのスプラッシュ"],
  badUsage: "ボタン内などの小さな空間には不向き。",
  similar: ["spinner-classic"],
  code: ({ color, size, speed }) => ({
    html: `<div class="flip" aria-label="loading"><span></span></div>`,
    css: `.flip { perspective: 200px; width:${size.px}px; height:${size.px}px; }
.flip span { display:block; width:100%; height:100%; background:${color.hex}; border-radius:${Math.round(size.px*0.18)}px; animation: fcFlip ${speed.sec*1.6}s ease-in-out infinite; }
@keyframes fcFlip { 0%{transform: rotateY(0)} 50%{transform: rotateY(180deg)} 100%{transform: rotateY(360deg)} }`,
    tailwind: `// React版参照`,
    react: `export function FlipCard() {
  return (
    <div style={{ perspective:200, width:${size.px}, height:${size.px} }} aria-label="loading">
      <span className="block h-full w-full bg-${color.tw}-500" style={{ borderRadius:${Math.round(size.px*0.18)}, animation:\`fcFlip ${(speed.sec*1.6).toFixed(2)}s ease-in-out infinite\` }} />
      <style jsx global>{\`@keyframes fcFlip { 0%{transform:rotateY(0)} 50%{transform:rotateY(180deg)} 100%{transform:rotateY(360deg)} }\`}</style>
    </div>
  );
}`,
  }),
  prompt: ({ color, size, speed }) =>
    `${size.px}px の角丸カードを Y 軸方向に flip させるローダーを実装してください。色 ${color.tw}-500、parent に perspective:200、${(speed.sec*1.6).toFixed(2)}秒で 0→180→360deg と回転を続けます。`,
});

export const ARCHETYPES: ArchetypeMeta[] = [
  spinnerClassic,
  spinnerDual,
  spinnerDotted,
  spinnerConic,
  spinnerDashed,
  dotsBounce,
  dotsFade,
  dotsScale,
  dotsWave,
  dotsRotate,
  barBounce,
  equalizer,
  progressLinear,
  progressStripe,
  ripple,
  pulseRing,
  heartBeat,
  magnifierSearch,
  magnifierOrbit,
  lineDraw,
  circleDraw,
  pencilWrite,
  typingDots,
  orbitPlanet,
  flipCard,
];

export const ARCHETYPE_BY_ID: Record<string, ArchetypeMeta> = Object.fromEntries(
  ARCHETYPES.map((a) => [a.id, a])
);

export type { ResolvedParams };
