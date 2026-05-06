"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PREVIEW_FNS as LOADING_PREVIEW_FNS } from "@/data/loadings/previews";
import { parseLoadingId, resolveParams } from "@/data/loadings/types";
import { EXTRA_PREVIEW_FNS } from "@/data/extras/previews";
import { parseExtraId, COLOR_META, type ColorKey } from "@/data/extras/types";

/* 共通の小さい背景: プレビュー枠の中で映えるように */
function PreviewStage({
  children,
  className = "",
  pad = true,
  theme = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
  theme?: "dark" | "light";
}) {
  const themeBg =
    theme === "dark"
      ? "bg-[#0d0d14] text-white"
      : "bg-white text-zinc-900";
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${themeBg} ${
        pad ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* 1. 光るCTA */
export function GlowCTAPreview() {
  return (
    <PreviewStage>
      <span
        role="button"
        className="relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-br from-[#7c5cff] to-[#5b8cff] px-7 py-3.5 font-semibold text-white shadow-[0_8px_30px_rgba(124,92,255,.35)] transition hover:-translate-y-0.5
          before:absolute before:inset-[-2px] before:-z-10 before:rounded-full before:bg-gradient-to-br before:from-[#7c5cff] before:to-[#5b8cff] before:opacity-60 before:blur-xl hover:before:opacity-90"
      >
        無料で相談する →
      </span>
    </PreviewStage>
  );
}

/* 2. 矢印が伸びるCTA */
export function ArrowCTAPreview() {
  return (
    <PreviewStage>
      <span
        role="button"
        className="group inline-flex cursor-pointer items-center gap-2.5 font-semibold text-white"
      >
        詳しく見る
        <span className="relative inline-flex items-center">
          <span className="block h-px w-[18px] bg-white transition-all duration-300 group-hover:w-8" />
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">›</span>
        </span>
      </span>
    </PreviewStage>
  );
}

/* 3. ロゴ無限スクロール */
export function LogoMarqueePreview() {
  const logos = ["BRAND", "STUDIO", "WORKS", "LABS", "CO.", "INC."];
  return (
    <PreviewStage pad={false} className="px-0">
      <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max gap-14 animate-marquee">
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center gap-14 px-7">
              {logos.map((l) => (
                <span key={l + i} className="font-bold tracking-[0.2em] text-zinc-400">
                  {l}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PreviewStage>
  );
}

/* 4. カウントアップ */
export function CountUpPreview() {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    const to = 2400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return (
    <PreviewStage>
      <div
        ref={ref}
        onClick={() => setKey((k) => k + 1)}
        className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6"
        title="クリックで再カウント"
      >
        <div className="text-4xl font-bold tracking-tight text-white">
          {n.toLocaleString()}+
        </div>
        <div className="mt-1 text-zinc-400">導入社数</div>
      </div>
    </PreviewStage>
  );
}

/* 5. ガラスカード */
export function GlassCardPreview() {
  return (
    <PreviewStage className="bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,92,255,.35),transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(91,140,255,.28),transparent_60%)]">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.08] to-white/[.02] p-6 backdrop-blur-md shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
        <h3 className="font-semibold text-white">Realtime Sync</h3>
        <p className="mt-1 text-zinc-400">すべてのデータが即時で同期されます。</p>
      </div>
    </PreviewStage>
  );
}

/* 6. 背景グリッド */
export function GridBgPreview() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0d14]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        maskImage:
          "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
      }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          built for builders
        </div>
        <div className="mt-1 text-xl font-semibold text-white">Grid Background</div>
      </div>
    </div>
  );
}

/* 7. ふわっと表示 */
export function FadeUpPreview() {
  const [k, setK] = useState(0);
  return (
    <PreviewStage>
      <div className="space-y-2 text-center" onClick={() => setK((v) => v + 1)}>
        {["見出し", "リード文", "特徴 ①", "特徴 ②"].map((t, i) => (
          <motion.div
            key={`${k}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? "text-2xl font-semibold text-white" : "text-zinc-400"}
          >
            {t}
          </motion.div>
        ))}
        <div className="pt-2 text-xs text-zinc-500">クリックで再生</div>
      </div>
    </PreviewStage>
  );
}

/* 8. SVG波形ディバイダー */
export function WaveDividerPreview() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex-1 bg-gradient-to-b from-violet-500 to-violet-300" />
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="-mt-px block h-16 w-full">
        <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill="#f7f7f8" />
      </svg>
      <div className="h-16 bg-zinc-100" />
    </div>
  );
}

/* 9. 動くグラデーション */
export function AnimatedGradientPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 animate-gradient-pan bg-[linear-gradient(120deg,#1a1030,#0b0b0f,#102040,#0b0b0f)] bg-[length:300%_300%]" />
      <div className="relative flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">animated</div>
          <div className="text-xl font-semibold text-white">Gradient Background</div>
        </div>
      </div>
    </div>
  );
}

/* 10. スピナー */
export function SpinnerPreview() {
  return (
    <PreviewStage>
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <span className="text-zinc-400">読み込み中…</span>
      </div>
    </PreviewStage>
  );
}

/* 11. スケルトン */
export function SkeletonPreview() {
  return (
    <PreviewStage>
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="h-3 w-40 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
        <div className="mt-3 h-3 w-60 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
        <div className="mt-3 h-3 w-32 rounded-md bg-[linear-gradient(90deg,#1d1d27_0%,#2a2a36_50%,#1d1d27_100%)] bg-[length:200%_100%] animate-shine" />
      </div>
    </PreviewStage>
  );
}

/* 12. FAQ */
export function FAQAccordionPreview() {
  const items = [
    { q: "料金はどこに書いてありますか？", a: "料金ページに3プラン記載しています。" },
    { q: "解約はいつでも可能ですか？", a: "はい、マイページからいつでも可能です。" },
  ];
  return (
    <PreviewStage>
      <div className="w-full max-w-md">
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} defaultOpen={i === 0} />
        ))}
      </div>
    </PreviewStage>
  );
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10">
      <span
        role="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between py-3 text-left font-semibold text-white"
        aria-expanded={open}
      >
        {q}
        <span className={`text-zinc-400 transition ${open ? "rotate-45" : ""}`}>+</span>
      </span>
      <div
        className="grid overflow-hidden text-zinc-400 transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pb-3">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* 13. 画像ホバーズーム */
export function ImageZoomPreview() {
  return (
    <PreviewStage>
      <span
        role="link"
        className="block w-56 cursor-pointer overflow-hidden rounded-2xl"
      >
        <span className="block aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,#7c5cff,transparent_60%),radial-gradient(circle_at_70%_70%,#5b8cff,transparent_60%),linear-gradient(135deg,#1a1030,#102040)] transition duration-500 hover:scale-[1.06]" />
      </span>
    </PreviewStage>
  );
}

/* 14. テキストマーカー */
export function TextMarkerPreview() {
  const [k, setK] = useState(0);
  return (
    <PreviewStage>
      <div onClick={() => setK((v) => v + 1)} className="cursor-pointer text-center">
        <div className="text-2xl font-semibold text-white">
          あなたの
          <motion.span
            key={k}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              backgroundImage:
                "linear-gradient(transparent 60%, rgba(124,92,255,.55) 60%)",
              backgroundRepeat: "no-repeat",
              padding: "0 4px",
            }}
          >
            仕事
          </motion.span>
          を、もっと速く。
        </div>
        <div className="pt-2 text-xs text-zinc-500">クリックで再生</div>
      </div>
    </PreviewStage>
  );
}

/* 15. 浮遊カード */
export function FloatingCardPreview() {
  return (
    <PreviewStage>
      <div className="animate-float will-change-transform rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-[#7c5cff] to-[#5b8cff]" />
          <div>
            <div className="font-semibold text-white">Realtime</div>
            <div className="text-xs text-zinc-400">always in sync</div>
          </div>
        </div>
      </div>
    </PreviewStage>
  );
}

/* 16. Before / After (preview-safe: no <input>) */
export function BeforeAfterPreview() {
  const pos = 50;
  return (
    <PreviewStage>
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
        {/* AFTER (下) */}
        <div className="aspect-[4/3] w-full bg-gradient-to-br from-violet-500 to-blue-500">
          <div className="flex h-full items-center justify-center text-3xl font-bold text-white/90 drop-shadow">
            AFTER
          </div>
        </div>
        {/* BEFORE (上、左から幅50%固定) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-zinc-700 to-zinc-900" style={{ width: `${(100 / pos) * 100}%` }}>
            <div className="flex h-full items-center justify-center text-3xl font-bold text-white/80">
              BEFORE
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
          style={{ left: `${pos}%` }}
        />
        {/* slider thumb (visual only) */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/95 text-xs font-bold text-zinc-700 shadow"
          style={{ left: `${pos}%` }}
        >
          ⇆
        </div>
      </div>
    </PreviewStage>
  );
}

/* 17. スクロール誘導 */
export function ScrollCuePreview() {
  return (
    <PreviewStage>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">scroll</span>
        <div className="flex h-9 w-[22px] justify-center rounded-full border border-white/50 pt-1.5">
          <span
            className="block h-1.5 w-1 rounded-sm bg-white"
            style={{ animation: "cue 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </PreviewStage>
  );
}

/* 18. ステップカード */
export function StepCardsPreview() {
  const steps = [
    { title: "ヒアリング", body: "現状と課題を伺います。" },
    { title: "ご提案", body: "最適なプランをお出しします。" },
    { title: "実装", body: "合意の上で着手します。" },
  ];
  return (
    <PreviewStage>
      <ol className="grid w-full max-w-md grid-cols-1 gap-3 p-0 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="font-mono font-bold tracking-wide text-violet-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-1.5 text-sm font-semibold text-white">{s.title}</h4>
            <p className="mt-0.5 text-xs text-zinc-400">{s.body}</p>
          </li>
        ))}
      </ol>
    </PreviewStage>
  );
}

/* 19. エラー状態 */
export function ErrorStatePreview() {
  return (
    <PreviewStage>
      <div className="w-full max-w-sm rounded-2xl border border-dashed border-white/10 p-6 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-300">
          !
        </div>
        <h3 className="font-semibold text-white">読み込みに失敗しました</h3>
        <p className="mt-1 text-sm text-zinc-400">ネットワーク接続をご確認ください。</p>
        <span role="button" className="mt-3 inline-flex cursor-pointer rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900">
          再試行
        </span>
      </div>
    </PreviewStage>
  );
}

/* 20. 空状態 */
export function EmptyStatePreview() {
  return (
    <PreviewStage>
      <div className="w-full max-w-sm rounded-2xl border border-dashed border-white/10 p-8 text-center">
        <div className="mb-1 text-3xl">📭</div>
        <h3 className="font-semibold text-white">まだ何もありません</h3>
        <p className="mt-1 text-sm text-zinc-400">最初の項目を作って始めましょう。</p>
        <span role="button" className="mt-3 inline-flex cursor-pointer rounded-full bg-violet-500 px-4 py-1.5 text-sm font-semibold text-white">
          ＋ 新規作成
        </span>
      </div>
    </PreviewStage>
  );
}

/* マッピング */
export const PREVIEWS: Record<string, () => JSX.Element> = {
  "glow-cta": GlowCTAPreview,
  "arrow-cta": ArrowCTAPreview,
  "logo-marquee": LogoMarqueePreview,
  "count-up": CountUpPreview,
  "glass-card": GlassCardPreview,
  "grid-bg": GridBgPreview,
  "fade-up-section": FadeUpPreview,
  "svg-wave-divider": WaveDividerPreview,
  "animated-gradient": AnimatedGradientPreview,
  "spinner": SpinnerPreview,
  "skeleton": SkeletonPreview,
  "faq-accordion": FAQAccordionPreview,
  "image-zoom": ImageZoomPreview,
  "text-marker": TextMarkerPreview,
  "floating-card": FloatingCardPreview,
  "before-after": BeforeAfterPreview,
  "scroll-cue": ScrollCuePreview,
  "step-card": StepCardsPreview,
  "error-state": ErrorStatePreview,
  "empty-state": EmptyStatePreview,
};

export function PatternPreview({ id }: { id: string }) {
  const Comp = PREVIEWS[id];
  if (Comp) return <Comp />;

  const parsedLoading = parseLoadingId(id);
  if (parsedLoading) {
    const Fn = LOADING_PREVIEW_FNS[parsedLoading.archId];
    if (Fn) {
      const params = resolveParams(parsedLoading.color, parsedLoading.size, parsedLoading.speed);
      return <Fn {...params} />;
    }
  }

  const parsedExtra = parseExtraId(id);
  if (parsedExtra) {
    const Fn = EXTRA_PREVIEW_FNS[parsedExtra.archId];
    const ck = parsedExtra.variantKey as ColorKey;
    if (Fn && COLOR_META[ck]) {
      const variant = {
        key: ck,
        label: COLOR_META[ck].jp,
        color: { ...COLOR_META[ck], key: ck },
      };
      return <Fn {...variant} />;
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-zinc-500">
      Preview not found
    </div>
  );
}
