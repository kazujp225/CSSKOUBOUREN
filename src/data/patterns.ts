export type Difficulty = "easy" | "medium" | "hard";

export type Pattern = {
  id: string;
  title: string;
  category: string; // category slug
  tags: string[]; // tech tags: Tailwind / React / SVG / CSS / Framer
  mood: string[]; // 雰囲気: 高級感 / BtoB / ポップ など
  difficulty: Difficulty;
  useCase: string;
  effect: string;
  suitableFor: string[];
  badUsage: string;
  htmlCode: string;
  cssCode: string;
  tailwindCode: string;
  reactCode: string;
  claudePrompt: string;
  similar?: string[]; // similar pattern ids
};

export const PATTERNS: Pattern[] = [
  // 1
  {
    id: "glow-cta",
    title: "光るCTAボタン",
    category: "cta",
    tags: ["CSS", "Tailwind", "React"],
    mood: ["高級感", "BtoB", "テック"],
    difficulty: "easy",
    useCase: "ファーストビューの主CTAや、料金ページの『お問い合わせ』ボタン。視線を確実に集めたい場面で使う。",
    effect: "周辺グローと内側ハイライトで『ここを押せばいい』と一瞬で伝える。ホバー時に光が広がり、押した感を演出できる。",
    suitableFor: ["BtoB SaaS", "コーポレートサイトFV", "高単価サービスLP"],
    badUsage: "1ページに複数置くと視線が分散して効果が消える。子要素のテキストが長すぎるとボタンらしさが薄れる。",
    htmlCode: `<a class="glow-cta" href="#">
  無料で相談する
</a>`,
    cssCode: `.glow-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 9999px;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(135deg, #7c5cff, #5b8cff);
  box-shadow: 0 8px 30px rgba(124,92,255,.35), inset 0 1px 0 rgba(255,255,255,.25);
  transition: transform .2s ease, box-shadow .3s ease;
}
.glow-cta::after {
  content: "";
  position: absolute; inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #7c5cff, #5b8cff);
  filter: blur(18px); opacity: .55; z-index: -1;
  transition: opacity .3s ease;
}
.glow-cta:hover { transform: translateY(-1px); }
.glow-cta:hover::after { opacity: .9; }`,
    tailwindCode: `<a
  href="#"
  className="relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white
             bg-gradient-to-br from-[#7c5cff] to-[#5b8cff]
             shadow-[0_8px_30px_rgba(124,92,255,.35)]
             transition hover:-translate-y-0.5
             before:absolute before:inset-[-2px] before:-z-10 before:rounded-full
             before:bg-gradient-to-br before:from-[#7c5cff] before:to-[#5b8cff]
             before:blur-xl before:opacity-60 hover:before:opacity-90"
>
  無料で相談する
</a>`,
    reactCode: `export function GlowCTA({ children = "無料で相談する" }) {
  return (
    <a
      href="#"
      className="relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white
                 bg-gradient-to-br from-violet-500 to-blue-500
                 shadow-[0_8px_30px_rgba(124,92,255,.35)]
                 transition hover:-translate-y-0.5
                 before:absolute before:inset-[-2px] before:-z-10 before:rounded-full
                 before:bg-gradient-to-br before:from-violet-500 before:to-blue-500
                 before:blur-xl before:opacity-60 hover:before:opacity-90"
    >
      {children}
    </a>
  );
}`,
    claudePrompt:
      "このLPの主CTAボタンを、青紫グラデーションのグロー付きボタンに変更してください。BtoB向けなので派手すぎず、通常時は控えめに、ホバー時に外側のぼかしが少し強くなるくらいにしてください。Tailwind CSSで実装し、丸みは pill 形状、既存のフォントサイズを維持してください。",
    similar: ["arrow-cta", "animated-gradient"],
  },

  // 2
  {
    id: "arrow-cta",
    title: "ホバーで矢印が伸びるボタン",
    category: "cta",
    tags: ["CSS", "Tailwind"],
    mood: ["BtoB", "ミニマル"],
    difficulty: "easy",
    useCase: "セクション内の二次CTA、ブログ記事の『続きを読む』、サービス紹介の『詳しく見る』。",
    effect: "矢印がスッと伸びることで、押した先に進む感覚を視覚で予告する。控えめだが回遊率が地味に上がる。",
    suitableFor: ["記事サイト", "BtoBサービス紹介", "シンプル系コーポレート"],
    badUsage: "FVの主CTAとして使うと弱い。ボタン背景がない『テキスト矢印型』は周りと色コントラストを必ず確保する。",
    htmlCode: `<a class="arrow-cta" href="#">
  詳しく見る
  <span class="arrow"><span class="line"></span><span class="head">›</span></span>
</a>`,
    cssCode: `.arrow-cta { display:inline-flex; align-items:center; gap:10px; color:#f5f5f7; font-weight:600; }
.arrow-cta .arrow { position: relative; display:inline-flex; align-items:center; }
.arrow-cta .line { width:18px; height:1px; background:#f5f5f7; transition: width .3s ease; }
.arrow-cta .head { transition: transform .3s ease; }
.arrow-cta:hover .line { width: 32px; }
.arrow-cta:hover .head { transform: translateX(4px); }`,
    tailwindCode: `<a href="#" className="group inline-flex items-center gap-2.5 font-semibold text-white">
  詳しく見る
  <span className="relative inline-flex items-center">
    <span className="block h-px w-[18px] bg-white transition-all duration-300 group-hover:w-8" />
    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">›</span>
  </span>
</a>`,
    reactCode: `export function ArrowCTA({ children = "詳しく見る" }) {
  return (
    <a href="#" className="group inline-flex items-center gap-2.5 font-semibold text-white">
      {children}
      <span className="relative inline-flex items-center">
        <span className="block h-px w-[18px] bg-white transition-all duration-300 group-hover:w-8" />
        <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">›</span>
      </span>
    </a>
  );
}`,
    claudePrompt:
      "セクション内の二次CTAリンクを、ホバーで矢印の線が伸びて頭が右に少しスライドするミニマルなボタンに置き換えてください。色は本文と同じ白、太字、装飾は最小限にしてください。Tailwind CSSで group/group-hover を使って実装してください。",
    similar: ["glow-cta"],
  },

  // 3
  {
    id: "logo-marquee",
    title: "実績ロゴ無限スクロール",
    category: "stats",
    tags: ["CSS", "Tailwind"],
    mood: ["BtoB", "信頼感"],
    difficulty: "medium",
    useCase: "FV直下や実績セクションで『誰が使っているか』を見せる定番演出。導入企業ロゴの一覧。",
    effect: "止まっているロゴ列より圧倒的に視線が止まる。情報量が多くてもうるさくならず、信頼を一瞬で伝える。",
    suitableFor: ["BtoB SaaS", "代理店/制作会社", "採用LP"],
    badUsage: "ロゴ間の余白が狭いと安っぽく見える。両端のフェードアウトを忘れると唐突に切れて見える。",
    htmlCode: `<div class="marquee">
  <div class="marquee-track">
    <!-- ロゴを2セット並べる -->
    <span>BRAND</span><span>BRAND</span><span>BRAND</span><span>BRAND</span>
    <span>BRAND</span><span>BRAND</span><span>BRAND</span><span>BRAND</span>
  </div>
</div>`,
    cssCode: `.marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.marquee-track { display: flex; gap: 56px; width: max-content; animation: marquee 28s linear infinite; }
.marquee-track span { color: #a1a1aa; font-weight: 700; letter-spacing: .12em; }
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`,
    tailwindCode: `<div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
  <div className="flex w-max gap-14 animate-marquee">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="flex shrink-0 items-center gap-14">
        {logos.map((l) => <span key={l} className="text-zinc-400 font-bold tracking-widest">{l}</span>)}
      </div>
    ))}
  </div>
</div>`,
    reactCode: `const logos = ["BRAND", "STUDIO", "WORKS", "LABS", "CO.", "INC."];

export function LogoMarquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max gap-14 animate-marquee">
        {[0,1].map((i) => (
          <div key={i} aria-hidden={i === 1} className="flex shrink-0 items-center gap-14">
            {logos.map((l) => (
              <span key={l + i} className="text-zinc-400 font-bold tracking-widest">{l}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    claudePrompt:
      "実績セクションに『導入企業ロゴ無限スクロール』を追加してください。同じロゴ列を2セット並べて translateX(-50%) させる手法でシームレスにしてください。両端は mask-image でフェードアウト、速度は28秒程度。Tailwind CSSで実装してください。",
    similar: ["count-up"],
  },

  // 4
  {
    id: "count-up",
    title: "数字カウントアップカード",
    category: "stats",
    tags: ["React", "Framer"],
    mood: ["BtoB", "信頼感"],
    difficulty: "medium",
    useCase: "実績セクションで『導入企業数』『継続率』『削減時間』など、数字で説得する場面。",
    effect: "画面に入ってから0からカウントアップすることで『今まさに動いている数字』に見える。静的より圧倒的に目が止まる。",
    suitableFor: ["BtoBサービスLP", "採用LP", "プロダクト紹介ページ"],
    badUsage: "意味のない数字を並べない。単位や但し書きを必ずセットで置かないと不信感に繋がる。",
    htmlCode: `<div class="stat">
  <div class="num" data-target="2400">0</div>
  <div class="label">導入社数</div>
</div>`,
    cssCode: `.stat { padding: 24px; border:1px solid #22222e; border-radius:16px; background:#14141d }
.stat .num { font-size: 44px; font-weight: 700; letter-spacing: -.02em; color:#fff }
.stat .label { color:#a1a1aa; margin-top: 4px }
/* JS で data-target に向かって加算する */`,
    tailwindCode: `<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
  <div className="text-4xl font-bold tracking-tight text-white">{value}+</div>
  <div className="mt-1 text-zinc-400">導入社数</div>
</div>`,
    reactCode: `"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to = 2400, suffix = "+", label = "導入社数" }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-4xl font-bold tracking-tight text-white">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-zinc-400">{label}</div>
    </div>
  );
}`,
    claudePrompt:
      "実績セクションのカードを、画面に入った瞬間から1.4秒で0→目標値までイージングしながら加算する『カウントアップカード』に変更してください。IntersectionObserverを使い、一度見たら再カウントしないようにしてください。Reactのクライアントコンポーネントで実装してください。",
    similar: ["logo-marquee", "fade-up-section"],
  },

  // 5
  {
    id: "glass-card",
    title: "ガラス風カードUI",
    category: "card",
    tags: ["CSS", "Tailwind"],
    mood: ["高級感", "テック"],
    difficulty: "easy",
    useCase: "プラン比較・機能紹介・ダッシュボード風UIなど、奥行きのある背景の上に置くカード。",
    effect: "半透明＋ぼかし＋細いライン。情報密度が高くても重く見えず、モダンな印象を一気に作れる。",
    suitableFor: ["SaaS LP", "AI/テック系プロダクト", "ダークテーマのサイト全般"],
    badUsage: "白背景の上では効果が弱い。背景にグラデーションや粒のある絵がある時だけ使う。",
    htmlCode: `<div class="glass-card">
  <h3>Realtime Sync</h3>
  <p>すべてのデータが即時で同期されます。</p>
</div>`,
    cssCode: `.glass-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.08);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -30px rgba(0,0,0,.6);
}
.glass-card h3 { color:#fff; font-weight:600; margin-bottom:6px }
.glass-card p  { color:#a1a1aa }`,
    tailwindCode: `<div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[.02]
                p-6 backdrop-blur-md shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
  <h3 className="font-semibold text-white">Realtime Sync</h3>
  <p className="mt-1 text-zinc-400">すべてのデータが即時で同期されます。</p>
</div>`,
    reactCode: `export function GlassCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.06] to-white/[.02]
                    p-6 backdrop-blur-md shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1 text-zinc-400">{body}</p>
    </div>
  );
}`,
    claudePrompt:
      "機能紹介セクションのカードを、ダーク背景に映える『ガラス風カード』にしてください。半透明白＋ぼかし＋細い白枠＋下方向のドロップシャドウで奥行きを出します。背景は既存のグラデーションを活かしてください。Tailwind CSSで実装。",
    similar: ["floating-card", "step-card"],
  },

  // 6
  {
    id: "grid-bg",
    title: "背景グリッド",
    category: "background",
    tags: ["CSS", "Tailwind"],
    mood: ["テック", "ミニマル"],
    difficulty: "easy",
    useCase: "ヒーローセクションの背景、開発者向け/AI系サイトの全体背景。情報量が少ないFVを締める。",
    effect: "整列した薄いグリッドで『規律』『正確さ』を感じさせる。中央のラジアルマスクで主役を邪魔しない。",
    suitableFor: ["AI/開発者向けLP", "テック系コーポレート", "ダッシュボードのHero"],
    badUsage: "全面で濃く出すと文字が読みにくくなる。必ずマスクで中心を抜いて主役を立てる。",
    htmlCode: `<section class="grid-bg">
  <div class="content">…</div>
</section>`,
    cssCode: `.grid-bg {
  position: relative;
  background-color: #0b0b0f;
  background-image:
    linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
}`,
    tailwindCode: `<section className="relative
  [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]
  [background-size:48px_48px]
  [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]">
  …
</section>`,
    reactCode: `export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative
      [background-image:linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]
      [background-size:48px_48px]
      [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]">
      {children}
    </section>
  );
}`,
    claudePrompt:
      "FVセクションの背景を『薄いラインの48pxグリッド』に変更してください。中央に向かってラジアルマスクで自然にフェードアウトさせ、主役の見出しを邪魔しないようにしてください。色味は白の6%程度。Tailwind CSSの任意値で実装してください。",
    similar: ["animated-gradient"],
  },

  // 7
  {
    id: "fade-up-section",
    title: "ふわっと表示されるセクション",
    category: "text",
    tags: ["CSS", "React", "Framer"],
    mood: ["上品", "BtoB"],
    difficulty: "easy",
    useCase: "セクションの見出し、リード文、特徴3点など、スクロールで現れる要素全般。",
    effect: "下から少し上がってフェードイン。読み手の視線をその順に誘導でき、紙芝居のリズムが生まれる。",
    suitableFor: ["コーポレートサイト全般", "BtoB LP", "ブログ"],
    badUsage: "全要素にかけると遅く感じる。1セクションに大→中→小の3段くらいに留める。",
    htmlCode: `<div class="fade-up">…</div>`,
    cssCode: `.fade-up { opacity: 0; transform: translateY(16px); }
.fade-up.in { animation: fadeUp .6s ease both; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
/* IntersectionObserverで .in を付与 */`,
    tailwindCode: `<div className="opacity-0 translate-y-4 data-[in=true]:animate-fade-up data-[in=true]:opacity-100">
  …
</div>`,
    reactCode: `"use client";
import { motion } from "framer-motion";

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}`,
    claudePrompt:
      "セクションの見出し→リード文→特徴3点が、スクロールで画面に入った時に下から16px上がりながらふわっと表示されるようにしてください。Framer Motion の whileInView を使い、once: true、duration: 0.6、見出しから順に150msずつ delay を増やしてください。",
    similar: ["scroll-cue", "text-marker"],
  },

  // 8
  {
    id: "svg-wave-divider",
    title: "SVG波形区切り",
    category: "svg",
    tags: ["SVG", "CSS"],
    mood: ["柔らかい", "BtoC"],
    difficulty: "easy",
    useCase: "セクションとセクションの境目を直線で切らず、なめらかに切り替えたい時。",
    effect: "境界に動きが出て、紙の上のセクションが『流れている』ように見える。BtoCで親しみを出したい時に強い。",
    suitableFor: ["BtoCサービス", "教育/医療系", "個人ブランド"],
    badUsage: "BtoBでカチッと見せたいサイトで使うと逆効果。色がギラついていると安っぽくなる。",
    htmlCode: `<div class="wave">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="#101017"/>
  </svg>
</div>`,
    cssCode: `.wave { line-height: 0; }
.wave svg { display:block; width: 100%; height: 80px; }`,
    tailwindCode: `<div className="leading-none">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-20 w-full">
    <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="currentColor" className="text-bg-soft" />
  </svg>
</div>`,
    reactCode: `export function WaveDivider({ color = "#101017" }) {
  return (
    <div className="leading-none">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-20 w-full">
        <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}`,
    claudePrompt:
      "FV下部とサービス紹介セクションの境目に、SVGの波形ディバイダーを差し込んでください。viewBoxは1440x120、preserveAspectRatio='none'で横幅にフィットさせ、色は次セクションの背景色に合わせてください。",
    similar: ["animated-gradient"],
  },

  // 9
  {
    id: "animated-gradient",
    title: "ゆっくり動くグラデーション背景",
    category: "background",
    tags: ["CSS", "Tailwind"],
    mood: ["高級感", "AI", "テック"],
    difficulty: "easy",
    useCase: "FV背景。AI系・SaaS系・ハイエンドコーポレートで、写真を使わず世界観を作る時。",
    effect: "色がゆっくり流れることで『生きている』印象を出す。写真や動画なしで高級感を作れる軽量演出。",
    suitableFor: ["AI/SaaS LP", "ハイエンドコーポレート", "プロダクトHero"],
    badUsage: "速く動かすと安っぽくなる。最低でも10秒以上の周期にする。",
    htmlCode: `<div class="anim-gradient"></div>`,
    cssCode: `.anim-gradient {
  background: linear-gradient(120deg, #1a1030, #0b0b0f, #102040, #0b0b0f);
  background-size: 300% 300%;
  animation: gradientPan 14s ease infinite;
}
@keyframes gradientPan {
  0%,100% { background-position: 0% 50%; }
  50%     { background-position: 100% 50%; }
}`,
    tailwindCode: `<div className="bg-[linear-gradient(120deg,#1a1030,#0b0b0f,#102040,#0b0b0f)] bg-[length:300%_300%] animate-gradient-pan" />`,
    reactCode: `export function AnimatedGradientBg({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(120deg,#1a1030,#0b0b0f,#102040,#0b0b0f)] bg-[length:300%_300%] animate-gradient-pan">
      {children}
    </div>
  );
}`,
    claudePrompt:
      "FVの背景を、紫→黒→青→黒の4色を120度のグラデーションでゆっくり流す演出に変更してください。周期は14秒、ease、無限ループ。背景サイズは300%にして position を 0%↔100% の間で動かしてください。Tailwindの任意値で実装してください。",
    similar: ["grid-bg", "glow-cta"],
  },

  // 10
  {
    id: "spinner",
    title: "ローディングスピナー",
    category: "loading",
    tags: ["CSS", "Tailwind"],
    mood: ["ミニマル", "テック"],
    difficulty: "easy",
    useCase: "ボタン押下後の処理待ち、ページ初期ロード、データ取得中の小さい待ち。",
    effect: "『処理が止まっていない』ことを伝える最小単位の演出。なしだとフリーズに見える。",
    suitableFor: ["管理画面", "SaaSアプリ", "フォーム送信ボタン内"],
    badUsage: "3秒以上かかる処理にスピナーだけ置くと不安になる。長い処理はプログレスや段階表示にする。",
    htmlCode: `<div class="spinner" role="status" aria-label="loading"></div>`,
    cssCode: `.spinner {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,.2);
  border-top-color: #fff;
  animation: spin .9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg) } }`,
    tailwindCode: `<div role="status" aria-label="loading"
  className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />`,
    reactCode: `export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="loading"
      style={{ width: size, height: size }}
      className="inline-block rounded-full border-2 border-white/20 border-t-white animate-spin"
    />
  );
}`,
    claudePrompt:
      "送信ボタン内に、ボタンクリック中だけ表示される白いスピナーを追加してください。サイズは20px、border-2、上だけ白で他は white/20、aria-label='loading'。Tailwindで実装してください。",
    similar: ["skeleton"],
  },

  // 11
  {
    id: "skeleton",
    title: "スケルトンUI",
    category: "loading",
    tags: ["CSS", "Tailwind"],
    mood: ["ミニマル", "テック"],
    difficulty: "easy",
    useCase: "リスト/カード/ダッシュボードなど、レイアウトが決まっているコンテンツの初回ロード時。",
    effect: "画面の構造を先に見せることで体感速度を上げる。スピナーより圧倒的に高速に感じる。",
    suitableFor: ["管理画面", "SNS/メディア", "コマース商品リスト"],
    badUsage: "実際のコンテンツとサイズが違うと、後でガクッとレイアウトが動いて逆効果。",
    htmlCode: `<div class="sk-card">
  <div class="sk-line w-60"></div>
  <div class="sk-line w-40"></div>
  <div class="sk-line w-72"></div>
</div>`,
    cssCode: `.sk-line {
  height: 12px; border-radius: 6px; margin-block: 10px;
  background: linear-gradient(90deg, #1d1d27 0%, #2a2a36 50%, #1d1d27 100%);
  background-size: 200% 100%;
  animation: shine 1.6s linear infinite;
}
@keyframes shine { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`,
    tailwindCode: `<div className="space-y-3">
  <div className="h-3 w-60 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
  <div className="h-3 w-40 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
  <div className="h-3 w-72 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
</div>`,
    reactCode: `export function SkeletonLine({ className = "w-60" }: { className?: string }) {
  return (
    <div className={\`h-3 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine \${className}\`} />
  );
}`,
    claudePrompt:
      "データ取得中のカードリストを、実物と同じレイアウトのスケルトンUIに置き換えてください。文字部分は高さ12pxの角丸ライン、左→右にハイライトが流れるシマー演出を1.6秒周期で。Tailwindの任意値とkeyframeで実装してください。",
    similar: ["spinner"],
  },

  // 12
  {
    id: "faq-accordion",
    title: "FAQアコーディオン",
    category: "faq",
    tags: ["React", "CSS"],
    mood: ["BtoB", "ミニマル"],
    difficulty: "medium",
    useCase: "料金ページ・サービス紹介ページ末尾の『よくある質問』。情報量を畳んでスクロールを短くする。",
    effect: "質問だけを並べて初見の心理的負担を下げる。開く時の高さアニメーションで操作の手応えを返す。",
    suitableFor: ["BtoB SaaS", "コーポレート", "コマース"],
    badUsage: "全項目を初期で開くと意味がない。アイコンの+/-を出さないと押せると気づかれない。",
    htmlCode: `<details class="faq">
  <summary>料金はどこに書いてありますか？</summary>
  <div>料金ページに3プラン記載しています…</div>
</details>`,
    cssCode: `.faq { border-bottom: 1px solid rgba(255,255,255,.08); padding: 18px 0; }
.faq summary { cursor: pointer; list-style: none; display:flex; justify-content: space-between; align-items: center; color:#fff; font-weight: 600; }
.faq summary::after { content: "+"; color:#a1a1aa; transition: transform .2s ease; }
.faq[open] summary::after { content: "−"; }
.faq > div { color:#a1a1aa; padding-top: 10px; }`,
    tailwindCode: `<details className="group border-b border-white/10 py-4">
  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
    料金はどこに書いてありますか？
    <span className="text-zinc-400 transition group-open:rotate-45">+</span>
  </summary>
  <p className="pt-2 text-zinc-400">料金ページに3プラン記載しています…</p>
</details>`,
    reactCode: `"use client";
import { useState } from "react";

export function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left font-semibold text-white"
        aria-expanded={open}
      >
        {q}
        <span className={\`text-zinc-400 transition \${open ? "rotate-45" : ""}\`}>+</span>
      </button>
      <div
        className="grid overflow-hidden text-zinc-400 transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pb-4">{a}</p>
        </div>
      </div>
    </div>
  );
}`,
    claudePrompt:
      "FAQセクションを、グリッドの grid-template-rows: 0fr↔1fr アニメーションで滑らかに開閉するアコーディオンに作り替えてください。+アイコンは開いた時に45度回転。1項目ずつしか開かない要件はなしで、それぞれ独立して開閉できるようにしてください。",
    similar: ["step-card"],
  },

  // 13
  {
    id: "image-zoom",
    title: "画像ホバーズーム",
    category: "hover",
    tags: ["CSS", "Tailwind"],
    mood: ["BtoC", "上品"],
    difficulty: "easy",
    useCase: "ブログ記事のサムネイル一覧、ポートフォリオの作品一覧、コマースの商品カード。",
    effect: "画像が枠の中で少し拡大し、『触れる感』『進める感』を返す。クリック率に効きやすい。",
    suitableFor: ["メディア", "ポートフォリオ", "コマース"],
    badUsage: "1.2倍以上に拡大すると粗くなる。overflow-hiddenを忘れるとレイアウトが崩れる。",
    htmlCode: `<a class="zoom" href="#">
  <img src="..." alt="" />
</a>`,
    cssCode: `.zoom { display:block; overflow:hidden; border-radius: 16px; }
.zoom img { transition: transform .5s ease; }
.zoom:hover img { transform: scale(1.06); }`,
    tailwindCode: `<a href="#" className="block overflow-hidden rounded-2xl">
  <img src="..." alt="" className="h-full w-full object-cover transition duration-500 hover:scale-[1.06]" />
</a>`,
    reactCode: `export function ZoomThumb({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <a href="#" className="block overflow-hidden rounded-2xl">
      <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 hover:scale-[1.06]" />
    </a>
  );
}`,
    claudePrompt:
      "記事一覧のサムネイル画像に、ホバーで1.06倍ズームする演出を追加してください。親に overflow-hidden と rounded-2xl、画像に transition duration-500 を付け、画像比率は崩さないように object-cover を維持してください。",
    similar: ["floating-card"],
  },

  // 14
  {
    id: "text-marker",
    title: "テキストマーカーアニメーション",
    category: "text",
    tags: ["CSS", "Tailwind"],
    mood: ["BtoC", "ポップ"],
    difficulty: "easy",
    useCase: "見出しの一部を強調したい時。『〇〇な〇〇』の核ワードを蛍光ペンで引いた風に見せる。",
    effect: "見出しの中の押したいキーワードに視線を集中させられる。静的な太字より圧倒的に止まる。",
    suitableFor: ["BtoC LP", "教育/コーチング", "個人ブランドサイト"],
    badUsage: "BtoBの硬めの文脈で多用するとカジュアルになりすぎる。1見出し1箇所まで。",
    htmlCode: `<h2>あなたの<span class="marker">仕事</span>を、もっと速く。</h2>`,
    cssCode: `.marker {
  background-image: linear-gradient(transparent 60%, rgba(124,92,255,.45) 60%);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  transition: background-size .8s ease .2s;
}
.in .marker, .marker.in { background-size: 100% 100%; }`,
    tailwindCode: `<span className="bg-[linear-gradient(transparent_60%,rgba(124,92,255,.45)_60%)] bg-[length:0%_100%] bg-no-repeat
  transition-[background-size] duration-700 [.in_&]:bg-[length:100%_100%]">
  仕事
</span>`,
    reactCode: `"use client";
import { motion } from "framer-motion";

export function MarkerText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      style={{
        backgroundImage:
          "linear-gradient(transparent 60%, rgba(124,92,255,.45) 60%)",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </motion.span>
  );
}`,
    claudePrompt:
      "見出しのキーワードに、画面に入った瞬間から左→右に蛍光ペンを引くマーカー演出を追加してください。色は青紫の45%透過、background-size を 0%→100% にトランジションして実現します。Framer Motion の whileInView で実装してください。",
    similar: ["fade-up-section"],
  },

  // 15
  {
    id: "floating-card",
    title: "浮遊するカード",
    category: "card",
    tags: ["CSS", "Tailwind"],
    mood: ["柔らかい", "BtoC"],
    difficulty: "easy",
    useCase: "FV右側のモックアップ、特徴セクションのアイコンカードなど、ちょっとしたアクセント。",
    effect: "ゆっくり上下に揺れることで、固いダーク背景に『呼吸』が生まれる。重心の軽さを演出できる。",
    suitableFor: ["BtoC LP", "アプリ紹介", "ポートフォリオ"],
    badUsage: "重要情報のカードを揺らすと読みにくい。揺れる要素は装飾扱いに留める。",
    htmlCode: `<div class="float-card">…</div>`,
    cssCode: `.float-card {
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}
@keyframes float {
  0%,100% { transform: translateY(0) }
  50%     { transform: translateY(-10px) }
}`,
    tailwindCode: `<div className="animate-float will-change-transform rounded-2xl border border-white/10 bg-white/5 p-6">
  …
</div>`,
    reactCode: `export function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-float will-change-transform rounded-2xl border border-white/10 bg-white/5 p-6">
      {children}
    </div>
  );
}`,
    claudePrompt:
      "FV右側のモックアップ画像を、6秒周期で上下に10pxゆっくり揺れる『浮遊カード』に変更してください。ease-in-out で無限ループ、will-change: transform を付与。重要なテキストは別レイヤーに置き、揺らさないでください。",
    similar: ["glass-card"],
  },

  // 16
  {
    id: "before-after",
    title: "Before / After比較UI",
    category: "card",
    tags: ["React", "CSS"],
    mood: ["BtoB", "実績"],
    difficulty: "hard",
    useCase: "リフォーム/デザイン制作/コンサル系の実績ページ。『どう変わったか』を一目で見せる。",
    effect: "スライダーで画像を切り替えることで、説得力が文章の何倍にもなる。直感的に成果が伝わる。",
    suitableFor: ["制作会社", "リフォーム/美容/医療", "コンサル実績"],
    badUsage: "Before と After のサイズ・撮影位置が違うと比較として弱い。",
    htmlCode: `<div class="ba">
  <img class="after" src="after.jpg" />
  <div class="before"><img src="before.jpg" /></div>
  <input class="range" type="range" min="0" max="100" value="50" />
</div>`,
    cssCode: `.ba { position: relative; overflow: hidden; border-radius: 16px; }
.ba img { display:block; width:100%; }
.ba .before { position: absolute; inset: 0; width: 50%; overflow: hidden; }
.ba .range { position: absolute; left:0; right:0; bottom: 12px; width: 90%; margin: auto; }`,
    tailwindCode: `<!-- 完全な動作はReact版を参照 -->`,
    reactCode: `"use client";
import { useState } from "react";

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img src={after} alt="after" className="block w-full" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ width: \`\${pos}%\` }}
      >
        <img src={before} alt="before" className="block h-full w-auto max-w-none" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
        style={{ left: \`\${pos}%\` }}
      />
      <input
        type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-3 mx-auto w-[90%]"
        aria-label="before after"
      />
    </div>
  );
}`,
    claudePrompt:
      "実績ページに『Before / After 比較UI』を追加してください。Afterを下に敷き、Beforeを左から幅可変で上に重ね、中央に縦の白線、下に range スライダーで切り替えます。画像サイズはBeforeとAfterで一致させ、レスポンシブで動くようにしてください。Reactクライアントコンポーネントで実装。",
    similar: ["image-zoom", "step-card"],
  },

  // 17
  {
    id: "scroll-cue",
    title: "スクロール誘導アニメーション",
    category: "hero",
    tags: ["CSS", "Tailwind"],
    mood: ["上品", "BtoB"],
    difficulty: "easy",
    useCase: "ファーストビュー下端で『下にもコンテンツがある』ことを伝える。",
    effect: "矢印やドットが下に向けて繰り返し動き、スクロールを促す。離脱率を地味に下げる。",
    suitableFor: ["FVで一画面を埋める強いLP", "コーポレートサイト", "ポートフォリオ"],
    badUsage: "FVが短いページ（既に次が見えている）に置くと冗長。",
    htmlCode: `<div class="cue">
  <span class="dot"></span>
</div>`,
    cssCode: `.cue { width: 22px; height: 36px; border: 1px solid rgba(255,255,255,.5); border-radius: 999px; display:flex; justify-content:center; padding-top: 6px; }
.cue .dot { width: 4px; height: 6px; border-radius: 2px; background: #fff; animation: cue 1.6s ease-in-out infinite; }
@keyframes cue {
  0% { transform: translateY(0); opacity: 1 }
  70%{ transform: translateY(14px); opacity: 0 }
  100%{ transform: translateY(0); opacity: 0 }
}`,
    tailwindCode: `<div className="mx-auto flex h-9 w-[22px] justify-center rounded-full border border-white/50 pt-1.5">
  <span className="block h-1.5 w-1 rounded-sm bg-white animate-[cue_1.6s_ease-in-out_infinite]" />
</div>`,
    reactCode: `export function ScrollCue() {
  return (
    <div className="mx-auto flex h-9 w-[22px] justify-center rounded-full border border-white/50 pt-1.5">
      <span className="block h-1.5 w-1 rounded-sm bg-white animate-[cue_1.6s_ease-in-out_infinite]" />
      <style jsx global>{\`
        @keyframes cue {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      \`}</style>
    </div>
  );
}`,
    claudePrompt:
      "FV下端中央に、マウスアイコン風のスクロール誘導アニメーションを追加してください。22x36の角丸の枠の中で、白いドットが上→下に1.6秒周期で落ちて消える動きです。Tailwindの任意値で keyframes を作って実装してください。",
    similar: ["fade-up-section"],
  },

  // 18
  {
    id: "step-card",
    title: "ステップカード",
    category: "card",
    tags: ["Tailwind", "React"],
    mood: ["BtoB", "整理"],
    difficulty: "easy",
    useCase: "サービスの流れ・導入ステップ・申込みフローの3〜5ステップを順に見せる。",
    effect: "番号付きカードで『順序』を視覚化する。文章だけより理解速度が一気に上がる。",
    suitableFor: ["BtoBサービス紹介", "プロセス説明", "オンボーディング"],
    badUsage: "ステップが7つ以上になると圧縮されて読まれない。多い時は2列に折る。",
    htmlCode: `<ol class="steps">
  <li><span class="n">01</span><h4>ヒアリング</h4><p>現状と課題をお聞きします。</p></li>
  <li><span class="n">02</span><h4>ご提案</h4><p>最適なプランをお出しします。</p></li>
  <li><span class="n">03</span><h4>実装</h4><p>合意の上で着手します。</p></li>
</ol>`,
    cssCode: `.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; list-style: none; padding: 0; }
.steps li { padding: 22px; border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: rgba(255,255,255,.03); }
.steps .n { font-family: ui-monospace, monospace; color: #7c5cff; font-weight: 700; letter-spacing: .04em; }
.steps h4 { color:#fff; margin-top: 8px }
.steps p { color:#a1a1aa; margin-top: 4px }`,
    tailwindCode: `<ol className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
  {steps.map((s, i) => (
    <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <span className="font-mono font-bold tracking-wide text-violet-400">{String(i+1).padStart(2,"0")}</span>
      <h4 className="mt-2 font-semibold text-white">{s.title}</h4>
      <p className="mt-1 text-zinc-400">{s.body}</p>
    </li>
  ))}
</ol>`,
    reactCode: `type Step = { title: string; body: string };

export function StepCards({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <span className="font-mono font-bold tracking-wide text-violet-400">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="mt-2 font-semibold text-white">{s.title}</h4>
          <p className="mt-1 text-zinc-400">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}`,
    claudePrompt:
      "サービス紹介ページの『導入の流れ』を、3カラムのステップカードに置き換えてください。各カードに 01/02/03 の番号（モノスペース、青紫）、タイトル、説明を入れ、角丸2xl、ボーダーは白10%、背景は白5%。スマホでは1カラムに折り返してください。",
    similar: ["faq-accordion", "glass-card"],
  },

  // 19
  {
    id: "error-state",
    title: "エラー状態UI",
    category: "empty",
    tags: ["Tailwind", "React"],
    mood: ["BtoB", "管理画面"],
    difficulty: "easy",
    useCase: "API失敗時、500/404、フォーム送信失敗の表示。",
    effect: "原因と次の行動を1画面で示し、ユーザーの『詰み』を防ぐ。再試行ボタンは必ず置く。",
    suitableFor: ["管理画面", "SaaS", "コマース"],
    badUsage: "『エラーが発生しました』だけで終わるのは最悪。再試行/問い合わせ動線まで必ずセット。",
    htmlCode: `<div class="error-state">
  <div class="icon">!</div>
  <h3>読み込みに失敗しました</h3>
  <p>ネットワーク接続をご確認のうえ、再試行してください。</p>
  <button class="retry">再試行</button>
</div>`,
    cssCode: `.error-state { text-align:center; padding: 40px 24px; border:1px dashed rgba(255,255,255,.12); border-radius: 16px; }
.error-state .icon { width:44px; height:44px; line-height:44px; border-radius: 50%; background: rgba(255, 90, 90, .15); color:#ff8a8a; margin: 0 auto 12px; font-weight: 700; }
.error-state h3 { color:#fff; font-weight:600 }
.error-state p { color:#a1a1aa; margin: 6px 0 16px }
.error-state .retry { padding: 8px 16px; border-radius: 9999px; background:#fff; color:#0b0b0f; font-weight:600 }`,
    tailwindCode: `<div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-300">!</div>
  <h3 className="font-semibold text-white">読み込みに失敗しました</h3>
  <p className="mt-1.5 text-zinc-400">ネットワーク接続をご確認のうえ、再試行してください。</p>
  <button className="mt-4 rounded-full bg-white px-4 py-2 font-semibold text-zinc-900">再試行</button>
</div>`,
    reactCode: `export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-300">!</div>
      <h3 className="font-semibold text-white">読み込みに失敗しました</h3>
      <p className="mt-1.5 text-zinc-400">ネットワーク接続をご確認のうえ、再試行してください。</p>
      <button onClick={onRetry} className="mt-4 rounded-full bg-white px-4 py-2 font-semibold text-zinc-900">
        再試行
      </button>
    </div>
  );
}`,
    claudePrompt:
      "API取得失敗時の表示を、専用の『エラー状態UI』に変更してください。中央寄せ、上部に赤系の!アイコン、見出し『読み込みに失敗しました』、説明文、白背景の再試行ボタン。点線の枠で囲み、角丸2xl。Reactで onRetry コールバックを受け取るコンポーネントとして実装してください。",
    similar: ["empty-state", "skeleton"],
  },

  // 20
  {
    id: "empty-state",
    title: "空状態UI",
    category: "empty",
    tags: ["Tailwind", "React"],
    mood: ["BtoB", "管理画面"],
    difficulty: "easy",
    useCase: "データが0件の時。検索結果なし、フォルダが空、未登録時の管理画面。",
    effect: "『何もない』を悲しい画面にせず、『次の一手』を促す画面に変える。離脱を防ぐ。",
    suitableFor: ["SaaS管理画面", "メール/タスク系UI", "検索結果"],
    badUsage: "本当に何もないだけのページにすると、ユーザーが詰む。必ずアクションを置く。",
    htmlCode: `<div class="empty-state">
  <div class="art">📭</div>
  <h3>まだ何もありません</h3>
  <p>最初の項目を作って始めましょう。</p>
  <button class="cta">＋ 新規作成</button>
</div>`,
    cssCode: `.empty-state { text-align:center; padding: 56px 24px; border:1px dashed rgba(255,255,255,.12); border-radius: 16px; }
.empty-state .art { font-size: 40px; margin-bottom: 8px; }
.empty-state h3 { color:#fff; font-weight:600 }
.empty-state p  { color:#a1a1aa; margin: 6px 0 16px }
.empty-state .cta { padding: 8px 16px; border-radius:9999px; background:#7c5cff; color:#fff; font-weight:600 }`,
    tailwindCode: `<div className="rounded-2xl border border-dashed border-white/10 p-14 text-center">
  <div className="mb-2 text-4xl">📭</div>
  <h3 className="font-semibold text-white">まだ何もありません</h3>
  <p className="mt-1.5 text-zinc-400">最初の項目を作って始めましょう。</p>
  <button className="mt-4 rounded-full bg-violet-500 px-4 py-2 font-semibold text-white">＋ 新規作成</button>
</div>`,
    reactCode: `export function EmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-14 text-center">
      <div className="mb-2 text-4xl">📭</div>
      <h3 className="font-semibold text-white">まだ何もありません</h3>
      <p className="mt-1.5 text-zinc-400">最初の項目を作って始めましょう。</p>
      <button onClick={onCreate} className="mt-4 rounded-full bg-violet-500 px-4 py-2 font-semibold text-white">
        ＋ 新規作成
      </button>
    </div>
  );
}`,
    claudePrompt:
      "管理画面のリストが0件の時の表示を、『空状態UI』に置き換えてください。上部にイラストか絵文字、見出し『まだ何もありません』、補足文、青紫の主CTA『＋ 新規作成』。点線の枠で柔らかく囲み、padding は広めに取ってください。Reactで onCreate ハンドラを受け取れるようにしてください。",
    similar: ["error-state"],
  },
];

export const PATTERN_BY_ID = Object.fromEntries(PATTERNS.map((p) => [p.id, p]));
