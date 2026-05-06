/* ============================================================
   /fortune — 深夜・偶然見つけた未来解析館
   ============================================================ */
import Link from "next/link";

const PHOTO_ALLEY = "https://images.unsplash.com/photo-1503066211613-c17ebc9daef0?w=1600&auto=format&fit=crop&q=80";
const PHOTO_LANTERN = "https://images.unsplash.com/photo-1556881286-fc6915169721?w=1200&auto=format&fit=crop&q=80";
const PHOTO_HANDS = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80";
const PHOTO_INCENSE = "https://images.unsplash.com/photo-1542728928-1413d1894ed1?w=900&auto=format&fit=crop&q=80";
const PHOTO_TAROT = "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=900&auto=format&fit=crop&q=80";
const PHOTO_CRYSTAL = "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80";
const PHOTO_WALL = "https://images.unsplash.com/photo-1517663154410-d9d35d3a3eb3?w=1200&auto=format&fit=crop&q=80";

export const metadata = {
  title: "深夜未来解析館 — UI Spice / Fortune",
};

export default function FortunePage() {
  return (
    <div
      className="-mx-6 -mt-10 -mb-28 sm:-mx-8"
      style={{
        background: "#07070B",
        color: "#e9d6a3",
        fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
      }}
    >
      <SceneAlley />
      <SceneEntrance />
      <SceneKanjiMosaic />
      <SceneCardChoice />
      <SceneAnalysis />
      <SceneResult />
      <SceneSilence />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Reusable atmospheric primitives
   ────────────────────────────────────────────── */

function MistOverlay({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(600px 240px at 30% 60%, rgba(255,255,255,.05), transparent 60%), radial-gradient(800px 320px at 80% 30%, rgba(255,138,61,.06), transparent 60%)",
        animation: "mistDrift 22s ease-in-out infinite",
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
}

function FilmGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        opacity: 0.07,
        mixBlendMode: "overlay",
      }}
    />
  );
}

function Lantern({ size = 56, swing = true }: { size?: number; swing?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size * 1.3,
        animation: swing ? "lanternSwing 5s ease-in-out infinite" : undefined,
        transformOrigin: "top center",
      }}
      className="relative"
    >
      {/* hanging cord */}
      <div
        aria-hidden
        className="absolute left-1/2 -top-12 -translate-x-1/2"
        style={{ width: 1, height: 56, background: "linear-gradient(to bottom, transparent, rgba(214,168,95,.6))" }}
      />
      {/* lantern body */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2a0606 0%, #B3261E 35%, #FF8A3D 60%, #B3261E 90%, #2a0606 100%)",
          borderRadius: "44% 44% 36% 36% / 50% 50% 12% 12%",
          border: "1px solid rgba(0,0,0,.6)",
          animation: "lanternPulse 3.6s ease-in-out infinite",
        }}
      >
        {/* gold trim top/bottom */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-2"
          style={{ background: "linear-gradient(180deg,#1a0a0a,#5a2200)" }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2"
          style={{ background: "linear-gradient(0deg,#1a0a0a,#5a2200)" }}
        />
        {/* horizontal ribs */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 7px, rgba(0,0,0,.3) 7px 8px)",
          }}
        />
        {/* center kanji */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: "#1a0606",
            fontWeight: 800,
            fontSize: size * 0.42,
            fontFamily: "'Noto Serif JP', serif",
            opacity: 0.8,
          }}
        >
          占
        </div>
      </div>
      {/* tassel */}
      <div
        aria-hidden
        className="absolute left-1/2 -bottom-3 -translate-x-1/2"
        style={{ width: 4, height: 10, background: "#D6A85F", borderRadius: 1 }}
      />
    </div>
  );
}

function KanjiVertical({
  text,
  className = "",
  fontSize = 22,
  glow = true,
}: {
  text: string;
  className?: string;
  fontSize?: number;
  glow?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        writingMode: "vertical-rl",
        fontFamily: "'Noto Serif JP', serif",
        fontSize,
        letterSpacing: "0.4em",
        color: "#B3261E",
        animation: glow ? "kanjiGlow 4s ease-in-out infinite" : undefined,
      }}
    >
      {text}
    </div>
  );
}

function WetReflection({
  src,
  height = 160,
  flip = true,
}: {
  src: string;
  height?: number;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative w-full overflow-hidden"
      style={{ height }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5) blur(4px) saturate(1.2)",
          transform: flip ? "scaleY(-1)" : undefined,
          opacity: 0.35,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent, #07070B 70%), repeating-linear-gradient(180deg, rgba(255,255,255,0) 0 6px, rgba(255,255,255,.05) 6px 7px)",
        }}
      />
    </div>
  );
}

function Embers({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = 5 + (i * 91) / count;
        const delay = (i * 1.7) % 5;
        const dur = 6 + (i % 3) * 2;
        const size = 1 + (i % 4) * 0.7;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: "radial-gradient(circle, #FF8A3D 0%, rgba(255,138,61,0) 70%)",
              animation: `ember ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Scene 1 — 路地 (the alley)
   ────────────────────────────────────────────── */

function SceneAlley() {
  return (
    <section
      className="relative isolate flex min-h-[110vh] w-full items-end overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 80%, rgba(179,38,30,.30), transparent 55%), radial-gradient(circle at 70% 50%, rgba(255,138,61,.10), transparent 60%), linear-gradient(180deg, #03030A 0%, #07070B 50%, #0a0408 100%)",
      }}
    >
      {/* alley photo (very dim) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${PHOTO_ALLEY})`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          filter: "brightness(0.32) saturate(1.05) hue-rotate(-8deg)",
        }}
      />
      <FilmGrain />
      <MistOverlay opacity={0.7} />
      <Embers />

      {/* hanging lantern, top right */}
      <div className="absolute right-[8%] top-24">
        <Lantern size={56} />
      </div>
      <div className="absolute right-[16%] top-32 hidden md:block">
        <Lantern size={42} />
      </div>

      {/* kanji column right */}
      <KanjiVertical
        text="深夜・運命・解析"
        className="absolute right-3 top-32 sm:right-10"
        fontSize={20}
      />

      {/* tiny side label */}
      <div className="absolute left-6 top-8 sm:left-10 sm:top-10">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(214,168,95,.6)" }}
        >
          UI Spice ／ Fortune
        </div>
        <div className="mt-1 text-[10px]" style={{ color: "rgba(214,168,95,.4)" }}>
          深夜 02 : 47 / 雨上がり
        </div>
      </div>

      {/* main content lower-left */}
      <div className="relative z-10 mb-[18vh] ml-6 sm:mb-[14vh] sm:ml-14">
        <div
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#FF8A3D" }}
        >
          ENTRY
        </div>
        <h1
          className="mt-3 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-[88px]"
          style={{ color: "#f5e6c8" }}
        >
          路地の奥に、
          <br />
          <span
            style={{
              color: "#B3261E",
              fontStyle: "italic",
              animation: "kanjiGlow 4s ease-in-out infinite",
            }}
          >
            未来解析館。
          </span>
        </h1>
        <p
          className="mt-6 max-w-md text-[14px] leading-relaxed"
          style={{ color: "rgba(233,214,163,.55)" }}
        >
          深夜の小路、提灯の灯る扉。<br />
          そこは偶然見つかる、運命を覗くための部屋。
        </p>
        <div className="mt-10 flex items-center gap-4">
          <div
            className="h-px w-14"
            style={{ background: "linear-gradient(to right, transparent, #D6A85F)" }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "#D6A85F" }}
          >
            scroll ↓
          </span>
        </div>
      </div>

      {/* wet reflection */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40">
        <WetReflection src={PHOTO_ALLEY} height={160} />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Scene 2 — 入口 (massive dark space + door)
   ────────────────────────────────────────────── */

function SceneEntrance() {
  return (
    <section
      className="relative isolate flex min-h-[90vh] flex-col items-center justify-center overflow-hidden"
      style={{ background: "#04040a" }}
    >
      <FilmGrain />
      <MistOverlay opacity={0.4} />
      {/* huge silent space */}
      <div className="text-center">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "rgba(214,168,95,.5)" }}
        >
          please knock
        </div>
        <div
          className="mx-auto mt-5 flex h-px w-12 items-center"
          style={{ background: "rgba(214,168,95,.4)" }}
        />
        {/* door */}
        <div className="relative mx-auto mt-12 inline-block">
          <div
            className="relative h-[420px] w-[280px] overflow-hidden"
            style={{
              background:
                "repeating-linear-gradient(90deg, #1a0e0e 0 14px, #2a1414 14px 28px), linear-gradient(180deg, transparent 0%, rgba(0,0,0,.6) 100%)",
              borderRadius: "140px 140px 6px 6px",
              border: "2px solid #4A0F1B",
              boxShadow:
                "inset 0 0 60px rgba(0,0,0,.85), 0 30px 60px -20px rgba(179,38,30,.45)",
            }}
          >
            {/* door grain via repeating gradient already; add center kanji */}
            <div
              className="absolute inset-x-0 top-1/3 text-center"
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: "#B3261E",
                fontFamily: "'Noto Serif JP', serif",
                animation: "kanjiGlow 5s ease-in-out infinite",
                opacity: 0.85,
              }}
            >
              占
            </div>
            {/* door knocker */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[64%] -translate-x-1/2 rounded-full"
              style={{
                width: 28,
                height: 28,
                background: "radial-gradient(circle at 35% 30%, #f6cf85, #8a6726 70%, #382008)",
                boxShadow: "0 4px 8px rgba(0,0,0,.6)",
              }}
            />
          </div>
          {/* lantern over door */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2">
            <Lantern size={64} />
          </div>
        </div>
        <p
          className="mx-auto mt-12 max-w-sm text-[13px] leading-relaxed"
          style={{ color: "rgba(233,214,163,.45)", fontStyle: "italic" }}
        >
          扉の前で、息を整える。<br />
          次の階段を降りれば、もう戻れない。
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Scene 3 — 漢字ネオン / 写真 mosaic
   ────────────────────────────────────────────── */

function SceneKanjiMosaic() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-32 sm:px-12"
      style={{
        background:
          "radial-gradient(at 80% 20%, rgba(179,38,30,.18), transparent 50%), linear-gradient(180deg, #07070B, #0a0507 70%, #07070B)",
      }}
    >
      <FilmGrain />
      <MistOverlay opacity={0.3} />
      {/* section eyebrow */}
      <div className="mb-10 flex items-center gap-4">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#FF8A3D" }}
        >
          02 / Hall
        </div>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(90deg, rgba(255,138,61,.4), transparent)" }}
        />
        <KanjiVertical text="占" fontSize={24} className="opacity-80" />
      </div>

      {/* irregular bento grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 sm:gap-6">
        {/* big neon kanji card */}
        <div
          className="col-span-12 sm:col-span-5 sm:row-span-2 rounded-2xl"
          style={{
            background:
              "radial-gradient(at 30% 30%, rgba(179,38,30,.4), transparent 60%), linear-gradient(180deg, #14040a, #0a0205)",
            border: "1px solid rgba(214,168,95,.18)",
            minHeight: 460,
          }}
        >
          <NeonKanjiPanel />
        </div>

        {/* big photo card (alley) */}
        <div
          className="col-span-12 sm:col-span-7 overflow-hidden rounded-2xl"
          style={{ minHeight: 220 }}
        >
          <PhotoSceneCard
            src={PHOTO_ALLEY}
            kicker="路地"
            title="深夜の路地、九份"
            tone="red"
          />
        </div>

        {/* small text card */}
        <div
          className="col-span-6 sm:col-span-3 rounded-2xl p-6"
          style={{
            background: "linear-gradient(180deg, #11050a, #07020a)",
            border: "1px solid rgba(214,168,95,.18)",
            minHeight: 220,
          }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(214,168,95,.55)" }}
          >
            line 01
          </div>
          <p
            className="mt-3 text-base italic leading-relaxed"
            style={{ color: "#e9d6a3" }}
          >
            「線香の煙が
            <br />答えを
            <br />なぞる夜」
          </p>
          <div
            className="mt-6 inline-block rounded-full px-3 py-1 text-[10px]"
            style={{
              background: "rgba(179,38,30,.15)",
              color: "#FF8A3D",
              border: "1px solid rgba(179,38,30,.35)",
            }}
          >
            禁忌
          </div>
        </div>

        {/* incense photo */}
        <div
          className="col-span-6 sm:col-span-4 overflow-hidden rounded-2xl"
          style={{ minHeight: 220 }}
        >
          <PhotoSceneCard
            src={PHOTO_INCENSE}
            kicker="香"
            title="線香の煙"
            tone="amber"
            ratio="square"
          />
        </div>

        {/* full-width thin scroll quote */}
        <div
          className="col-span-12 rounded-2xl p-8 text-center"
          style={{
            background: "linear-gradient(180deg, #0a0307, #06010a)",
            border: "1px solid rgba(214,168,95,.12)",
            minHeight: 130,
          }}
        >
          <p
            className="text-2xl italic leading-relaxed sm:text-3xl"
            style={{
              color: "#e9d6a3",
              animation: "kanjiGlow 6s ease-in-out infinite",
            }}
          >
            「運命とは、覗き見てしまった者にだけ訪れる。」
          </p>
          <div
            className="mx-auto mt-4 h-px w-16"
            style={{ background: "rgba(214,168,95,.4)" }}
          />
          <div className="mt-2 font-mono text-[10px] tracking-[0.3em]" style={{ color: "rgba(214,168,95,.6)" }}>
            — 第七章
          </div>
        </div>

        {/* tall vertical photo */}
        <div
          className="col-span-6 sm:col-span-4 overflow-hidden rounded-2xl"
          style={{ minHeight: 360 }}
        >
          <PhotoSceneCard src={PHOTO_LANTERN} kicker="灯" title="赤提灯" tone="red" ratio="tall" />
        </div>

        {/* horizontal photo */}
        <div
          className="col-span-6 sm:col-span-8 overflow-hidden rounded-2xl"
          style={{ minHeight: 360 }}
        >
          <PhotoSceneCard
            src={PHOTO_WALL}
            kicker="壁"
            title="湿った漆喰"
            tone="amber"
            ratio="wide"
          />
        </div>
      </div>
    </section>
  );
}

function NeonKanjiPanel() {
  return (
    <div className="relative h-full w-full p-8">
      <div
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "rgba(214,168,95,.55)" }}
      >
        sign
      </div>
      <div className="mt-3 flex items-end gap-6">
        <div
          style={{
            fontSize: 160,
            fontWeight: 800,
            color: "#B3261E",
            fontFamily: "'Noto Serif JP',serif",
            lineHeight: 1,
            animation: "kanjiGlow 4s ease-in-out infinite",
          }}
        >
          占
        </div>
        <div className="space-y-2">
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#D6A85F",
              fontFamily: "'Noto Serif JP',serif",
              opacity: 0.9,
            }}
          >
            未
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 700,
              color: "#FF8A3D",
              fontFamily: "'Noto Serif JP',serif",
            }}
          >
            来
          </div>
        </div>
      </div>
      <p
        className="mt-8 max-w-xs text-sm italic leading-relaxed"
        style={{ color: "rgba(233,214,163,.6)" }}
      >
        その看板に灯がともる。
        <br />
        路地のすべてが、ふっと止まる。
      </p>
      <div className="mt-8 flex gap-2">
        {["紅", "金", "黒"].map((c, i) => (
          <span
            key={c}
            className="font-mono text-[10px] tracking-[0.2em]"
            style={{
              color: ["#B3261E", "#D6A85F", "#a1a1aa"][i],
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function PhotoSceneCard({
  src,
  kicker,
  title,
  tone = "red",
  ratio = "wide",
}: {
  src: string;
  kicker: string;
  title: string;
  tone?: "red" | "amber" | "violet";
  ratio?: "wide" | "tall" | "square";
}) {
  const aspect =
    ratio === "wide" ? "16/9" : ratio === "tall" ? "3/4" : "1";
  const tint =
    tone === "red"
      ? "linear-gradient(135deg, rgba(179,38,30,.4), transparent 60%, rgba(74,15,27,.6))"
      : tone === "amber"
      ? "linear-gradient(135deg, rgba(255,138,61,.3), transparent 60%, rgba(58,20,8,.6))"
      : "linear-gradient(135deg, rgba(111,75,255,.3), transparent 60%, rgba(20,12,38,.6))";
  const accent =
    tone === "red" ? "#B3261E" : tone === "amber" ? "#FF8A3D" : "#6F4BFF";
  return (
    <div
      className="group relative h-full w-full overflow-hidden"
      style={{ aspectRatio: aspect }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
        style={{
          filter: "saturate(.85) contrast(1.08) brightness(.7)",
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: tint, mixBlendMode: "color" }} />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 30%, rgba(7,7,11,.4) 70%, rgba(7,7,11,.92) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {kicker}
        </div>
        <div
          className="mt-2 text-2xl italic sm:text-3xl"
          style={{
            color: "#f5e6c8",
            fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
            letterSpacing: "0.03em",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Scene 4 — カード選定
   ────────────────────────────────────────────── */

function SceneCardChoice() {
  const cards = [
    { num: "I", label: "魔術師", img: PHOTO_HANDS },
    { num: "VI", label: "恋人たち", img: PHOTO_TAROT },
    { num: "XVIII", label: "月", img: PHOTO_LANTERN },
  ];
  return (
    <section
      className="relative isolate flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-32"
      style={{
        background:
          "radial-gradient(at 50% 50%, rgba(74,15,27,.4), transparent 60%), linear-gradient(180deg, #07070B, #0a0408 50%, #07070B)",
      }}
    >
      <FilmGrain />
      <MistOverlay opacity={0.45} />
      <Embers count={6} />

      <div
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "#FF8A3D" }}
      >
        03 / Choose
      </div>
      <h2
        className="mt-4 max-w-2xl text-center text-3xl font-semibold leading-[1.1] sm:text-5xl"
        style={{ color: "#f5e6c8" }}
      >
        三枚の中から、
        <br />
        <span style={{ color: "#B3261E", fontStyle: "italic" }}>
          指が呼ばれる一枚を。
        </span>
      </h2>

      <div className="mt-20 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
        {cards.map((c, i) => {
          const tilt = (i - 1) * 6;
          const offsetY = i === 1 ? -20 : 0;
          const scale = i === 1 ? 1.06 : 0.94;
          return (
            <div
              key={c.num}
              className="group relative cursor-pointer transition-transform duration-700 ease-out hover:[transform:translateY(-32px)_rotate(0deg)_scale(1.08)]"
              style={{
                transform: `translateY(${offsetY}px) rotate(${tilt}deg) scale(${scale})`,
              }}
            >
              <div
                className="relative h-[360px] w-[220px] overflow-hidden"
                style={{
                  background: "#1a0a0f",
                  border: "1px solid #D6A85F",
                  borderRadius: 14,
                  boxShadow:
                    "inset 0 0 0 4px rgba(214,168,95,.5), 0 30px 60px -24px rgba(179,38,30,.6)",
                }}
              >
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-3 h-[88%] w-[calc(100%-1.5rem)] object-cover"
                  style={{
                    filter: "sepia(.2) saturate(.9) contrast(1.1) brightness(.7)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-3"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(179,38,30,.25), transparent 50%, rgba(7,7,11,.85))",
                    mixBlendMode: "multiply",
                  }}
                />
                <div
                  className="absolute inset-x-0 top-1.5 text-center font-mono text-[10px] tracking-[0.3em]"
                  style={{ color: "#D6A85F" }}
                >
                  {c.num}
                </div>
                <div
                  className="absolute inset-x-0 bottom-1 text-center text-[12px] italic tracking-[0.18em]"
                  style={{
                    color: "#e9d6a3",
                    fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
                  }}
                >
                  {c.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p
        className="mt-16 text-center text-sm italic"
        style={{ color: "rgba(233,214,163,.4)" }}
      >
        選んだ瞬間、もう変えられない。
      </p>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Scene 5 — 解析中 (the analysis UI)
   ────────────────────────────────────────────── */

function SceneAnalysis() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 py-32 sm:px-12"
      style={{
        background:
          "linear-gradient(180deg, #07070B, #0a0813 50%, #07070B)",
      }}
    >
      <FilmGrain />
      <MistOverlay opacity={0.3} />

      <div className="mb-12 flex items-center gap-4">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#FF8A3D" }}
        >
          04 / Analysis
        </div>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(90deg, rgba(255,138,61,.4), transparent)" }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-5">
        {/* primary scope */}
        <div
          className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-2xl"
          style={{
            background:
              "radial-gradient(at 40% 30%, rgba(179,38,30,.25), transparent 60%), linear-gradient(180deg, #0a0408, #0a0a14)",
            border: "1px solid rgba(214,168,95,.2)",
            minHeight: 420,
          }}
        >
          {/* scanline */}
          <div
            aria-hidden
            className="absolute inset-x-0 h-12 mix-blend-overlay"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,138,61,.4) 50%, transparent)",
              animation: "scanLine 4s linear infinite",
            }}
          />
          <div className="relative flex h-full flex-col p-8">
            <div className="flex items-center justify-between">
              <div
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(214,168,95,.55)" }}
              >
                primary scope
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "#FF8A3D" }}>
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#B3261E", animation: "lanternPulse 1.6s ease-in-out infinite" }}
                />
                LIVE / 0.84 stable
              </div>
            </div>

            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="relative h-64 w-64">
                {/* concentric rings */}
                {[1, 0.78, 0.55, 0.32].map((r, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      inset: `${(1 - r) * 50}%`,
                      border: `1px solid rgba(214,168,95,${0.6 - i * 0.12})`,
                      animation: `slowFloat ${4 + i}s ease-in-out infinite`,
                    }}
                  />
                ))}
                {/* zodiac ticks */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-3 w-px origin-bottom"
                    style={{
                      background: i % 6 === 0 ? "#B3261E" : "rgba(214,168,95,.4)",
                      transform: `translate(-50%,-128px) rotate(${i * 15}deg)`,
                      transformOrigin: "50% 128px",
                    }}
                  />
                ))}
                {/* center kanji */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    fontSize: 64,
                    fontWeight: 700,
                    color: "#B3261E",
                    fontFamily: "'Noto Serif JP',serif",
                    animation: "kanjiGlow 4s ease-in-out infinite",
                  }}
                >
                  運
                </div>
              </div>
            </div>

            {/* bars */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "因", v: 72 },
                { label: "縁", v: 88 },
                { label: "果", v: 56 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em]" style={{ color: "rgba(214,168,95,.55)" }}>
                    <span>{m.label}</span>
                    <span style={{ color: "#FF8A3D" }}>{m.v}%</span>
                  </div>
                  <div
                    className="mt-1.5 h-1 w-full overflow-hidden rounded-full"
                    style={{ background: "rgba(214,168,95,.12)" }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${m.v}%`,
                        background: "linear-gradient(90deg, #B3261E, #FF8A3D)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* side panels */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-5 lg:grid-cols-1">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "linear-gradient(180deg, #0c0408, #07020a)",
              border: "1px solid rgba(179,38,30,.25)",
            }}
          >
            <div
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(214,168,95,.5)" }}
            >
              palm capture
            </div>
            <img
              src={PHOTO_HANDS}
              alt=""
              loading="lazy"
              className="mt-4 aspect-[4/3] w-full rounded-md object-cover"
              style={{
                filter: "saturate(.7) contrast(1.05) brightness(.65) hue-rotate(-10deg)",
                border: "1px solid rgba(214,168,95,.35)",
              }}
            />
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px]" style={{ color: "#FF8A3D" }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#FF8A3D" }} />
              scanning · 3 lines detected
            </div>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "linear-gradient(180deg, #0a0408, #07020a)",
              border: "1px solid rgba(214,168,95,.18)",
            }}
          >
            <div
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "rgba(214,168,95,.5)" }}
            >
              candle log
            </div>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(233,214,163,.65)" }}>
              {[
                "02:47 lantern lit",
                "02:48 incense placed",
                "02:51 card chosen / VI",
                "02:53 reading begins",
              ].map((line, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px]" style={{ color: "#FF8A3D" }}>
                    ›
                  </span>
                  <span className="italic">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Scene 6 — 結果
   ────────────────────────────────────────────── */

function SceneResult() {
  return (
    <section
      className="relative isolate min-h-[110vh] overflow-hidden px-6 py-40 sm:px-12"
      style={{
        background:
          "radial-gradient(at 50% 30%, rgba(179,38,30,.30), transparent 55%), linear-gradient(180deg, #07070B 0%, #14060a 50%, #07070B 100%)",
      }}
    >
      <FilmGrain />
      <MistOverlay opacity={0.5} />

      <div className="mx-auto max-w-3xl text-center">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#FF8A3D" }}
        >
          05 / Verdict
        </div>
        <div
          className="mx-auto mt-6 h-px w-12"
          style={{ background: "rgba(214,168,95,.4)" }}
        />
        <div
          className="mt-12"
          style={{ animation: "deepFloat 9s ease-in-out infinite" }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "rgba(214,168,95,.55)" }}
          >
            score
          </div>
          <div
            className="mt-3 font-display"
            style={{
              fontSize: 240,
              lineHeight: 0.9,
              fontWeight: 700,
              color: "#f5e6c8",
              fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              textShadow:
                "0 0 16px rgba(255,138,61,.35), 0 0 60px rgba(179,38,30,.25)",
            }}
          >
            73
          </div>
          <div
            className="mt-2 font-mono text-[10px] tracking-[0.3em]"
            style={{ color: "rgba(214,168,95,.55)" }}
          >
            of one hundred
          </div>
        </div>
        <p
          className="mx-auto mt-16 max-w-xl text-base italic leading-relaxed sm:text-lg"
          style={{
            color: "#e9d6a3",
            animation: "kanjiGlow 6s ease-in-out infinite",
          }}
        >
          「迷うことを許される夜は、長くは続かない。<br />
          覗いた者は、明日、何かを変えるだろう。」
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { k: "因", v: "誤解が解ける" },
            { k: "縁", v: "新しい道" },
            { k: "果", v: "あなたの決断" },
          ].map((c) => (
            <div
              key={c.k}
              className="rounded-full px-4 py-2 text-[12px]"
              style={{
                background: "rgba(214,168,95,.06)",
                border: "1px solid rgba(214,168,95,.25)",
                color: "rgba(233,214,163,.85)",
              }}
            >
              <span style={{ color: "#B3261E", marginRight: 6 }}>{c.k}</span>
              {c.v}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Scene 7 — 静寂 / outro
   ────────────────────────────────────────────── */

function SceneSilence() {
  return (
    <section
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden"
      style={{ background: "#04040a" }}
    >
      <FilmGrain />
      <div
        className="font-mono text-[10px] uppercase tracking-[0.4em]"
        style={{ color: "rgba(214,168,95,.4)" }}
      >
        you may close the door now
      </div>
      <div
        className="mt-8"
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: "#B3261E",
          fontFamily: "'Noto Serif JP',serif",
          opacity: 0.8,
          animation: "kanjiGlow 8s ease-in-out infinite",
        }}
      >
        終
      </div>
      <div
        className="mt-8 h-px w-12"
        style={{ background: "rgba(214,168,95,.3)" }}
      />
      <div className="mt-12 flex items-center gap-3">
        <Link
          href="/patterns?q=占い"
          className="rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.3em]"
          style={{
            border: "1px solid rgba(214,168,95,.3)",
            color: "#D6A85F",
          }}
        >
          各演出のコードへ →
        </Link>
        <Link
          href="/"
          className="rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.3em]"
          style={{
            color: "rgba(214,168,95,.4)",
          }}
        >
          ホームに戻る
        </Link>
      </div>
    </section>
  );
}
