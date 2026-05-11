"use client";

import type { ResolvedColor } from "./types";
import { TarotFlow, TarotPhotoFlow, TarotPhotoCard, SAMPLE_PHOTOS } from "@/components/TarotCards";

const SAMPLE_IMG = "https://images.unsplash.com/photo-1532009877282-3340270e0529?w=600&auto=format&fit=crop&q=70";

type CV = { key: string; label: string; color: ResolvedColor };

function Stage({ children, theme = "light" }: { children: React.ReactNode; theme?: "light" | "soft" }) {
  const bg = theme === "soft" ? "bg-zinc-50" : "bg-white";
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${bg} p-6`}>
      {children}
    </div>
  );
}

/* CTA */
export function PCtaGlow({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="relative inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"
        style={{
          background: color.hex,
          boxShadow: `0 8px 30px ${color.hex}55, inset 0 1px 0 rgba(255,255,255,.25)`,
        }}
      >
        無料で相談する
      </span>
    </Stage>
  );
}

export function PCtaGradient({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="inline-flex cursor-pointer rounded-full px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"
        style={{
          background: `linear-gradient(135deg, ${color.hex}, #5b8cff)`,
          boxShadow: "0 12px 30px -10px rgba(0,0,0,.35)",
        }}
      >
        いますぐ始める
      </span>
    </Stage>
  );
}

export function PCtaOutline({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="inline-flex cursor-pointer rounded-full px-6 py-3 font-semibold transition"
        style={{
          border: `1.5px solid ${color.hex}`,
          color: color.hex,
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = color.hex;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = color.hex;
        }}
      >
        資料をダウンロード
      </span>
    </Stage>
  );
}

export function PCtaShimmer({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="relative inline-flex cursor-pointer overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white"
        style={{ background: color.hex }}
      >
        <span className="relative z-10">今すぐ始める</span>
        <span
          className="absolute inset-0"
          style={{
            background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.45) 50%, transparent 70%)",
            transform: "translateX(-100%)",
            animation: "shimSlide 2.4s ease-in-out infinite",
          }}
        />
      </span>
    </Stage>
  );
}

export function PCtaArrow({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
        style={{ background: color.hex }}
      >
        詳しく見る <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Stage>
  );
}

export function PCta3d({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="inline-flex cursor-pointer rounded-2xl px-7 py-3.5 font-bold text-white transition active:translate-y-1"
        style={{
          background: color.hex,
          boxShadow: "0 5px 0 0 rgba(0,0,0,.25)",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 0 0 rgba(0,0,0,.25)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow = "0 5px 0 0 rgba(0,0,0,.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 5px 0 0 rgba(0,0,0,.25)";
        }}
      >
        いますぐ始める
      </span>
    </Stage>
  );
}

/* Card */
export function PCardGlass({ color }: CV) {
  return (
    <Stage theme="soft">
      <div
        className="rounded-2xl p-5 backdrop-blur-md"
        style={{
          width: "min(280px, 90%)",
          border: `1px solid ${color.hex}33`,
          background: `linear-gradient(180deg, ${color.hex}11, ${color.hex}05)`,
          boxShadow: "0 30px 60px -30px rgba(0,0,0,.4)",
        }}
      >
        <h3 className="font-semibold text-zinc-900">Realtime Sync</h3>
        <p className="mt-1 text-sm text-zinc-600">常に同期されます。</p>
      </div>
    </Stage>
  );
}

export function PCardLift({ color }: CV) {
  return (
    <Stage theme="soft">
      <span
        role="link"
        className="block cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
        style={{ width: "min(280px, 90%)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color.hex + "66";
          e.currentTarget.style.boxShadow = `0 18px 30px -18px ${color.hex}77`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <h3 className="font-semibold text-zinc-900">機能名</h3>
        <p className="mt-1.5 text-sm text-zinc-500">説明文が入ります。</p>
      </span>
    </Stage>
  );
}

export function PCardBorderGlow({ color }: CV) {
  return (
    <Stage theme="soft">
      <div
        className="rounded-2xl p-px"
        style={{
          background: `linear-gradient(135deg, ${color.hex}, transparent 60%)`,
          width: "min(280px, 90%)",
        }}
      >
        <div className="rounded-[1.05rem] bg-white p-5">
          <h3 className="font-semibold text-zinc-900">機能名</h3>
          <p className="mt-1 text-sm text-zinc-500">説明文が入ります。</p>
        </div>
      </div>
    </Stage>
  );
}

export function PCardTilt({ color }: CV) {
  return (
    <Stage theme="soft">
      <div
        className="rounded-2xl p-5 text-white transition duration-300 hover:[transform:perspective(800px)_rotateX(6deg)_rotateY(-6deg)]"
        style={{
          width: "min(260px, 85%)",
          background: `linear-gradient(135deg, ${color.hex}, ${color.hex}99)`,
        }}
      >
        <h3 className="font-semibold">機能名</h3>
        <p className="mt-1 text-sm text-white/80">説明文。</p>
      </div>
    </Stage>
  );
}

export function PCardNumbered({ color }: CV) {
  return (
    <Stage theme="soft">
      <div
        className="rounded-2xl border border-zinc-200 bg-white p-5"
        style={{ width: "min(260px, 85%)" }}
      >
        <span className="font-mono font-bold tracking-wide" style={{ color: color.hex }}>
          01
        </span>
        <h3 className="mt-1.5 font-semibold text-zinc-900">ヒアリング</h3>
        <p className="mt-1 text-sm text-zinc-500">現状を伺います。</p>
      </div>
    </Stage>
  );
}

/* Card - Mystical (premium SVG illustrations) */

const SERIF = "'Cormorant Garamond','Noto Serif JP',serif";
const GOLD = "#d4af37";
const GOLD_SOFT = "#bf9a30";
const CREAM = "#e9d6a3";
const DARK_BG = "#0a0518";
const CARD_BG = "#150a26";

/* SVG illustrations */

function PalmIllustration({ accent = GOLD }: { accent?: string }) {
  return (
    <svg viewBox="0 0 100 110" className="h-full w-full">
      <defs>
        <linearGradient id="palmGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity=".18" />
          <stop offset="1" stopColor={accent} stopOpacity=".02" />
        </linearGradient>
      </defs>
      <path
        d="M 28 105 C 22 80 24 65 27 55 L 27 28 C 27 22 32 21 34 25 L 35 50 L 38 18 C 38 13 44 12 45 18 L 46 50 L 50 16 C 51 11 57 11 57 18 L 57 50 L 61 22 C 61 17 67 17 68 23 L 68 52 L 73 36 C 75 32 80 33 79 39 L 76 60 C 75 70 75 80 73 90 L 70 105 Z"
        fill="url(#palmGlow)"
        stroke={accent}
        strokeWidth="0.7"
        strokeLinejoin="round"
        opacity=".95"
      />
      {/* palm lines */}
      <path d="M 32 70 Q 48 64 64 72" stroke={accent} strokeWidth="0.6" fill="none" opacity=".75" />
      <path d="M 35 80 Q 50 84 65 84" stroke={accent} strokeWidth="0.6" fill="none" opacity=".55" />
      <path d="M 42 92 Q 50 96 60 96" stroke={accent} strokeWidth="0.6" fill="none" opacity=".4" />
      <circle cx="50" cy="78" r="0.9" fill={accent} />
      <circle cx="50" cy="78" r="2.2" fill="none" stroke={accent} strokeWidth="0.4" opacity=".5" />
    </svg>
  );
}

function CrystalBallIllustration({ accent = GOLD }: { accent?: string }) {
  return (
    <svg viewBox="0 0 100 110" className="h-full w-full">
      <defs>
        <radialGradient id="ball" cx="35%" cy="32%" r="60%">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="35%" stopColor={accent} stopOpacity=".85" />
          <stop offset="75%" stopColor="#3b1d6b" stopOpacity=".95" />
          <stop offset="100%" stopColor="#0a0033" />
        </radialGradient>
        <linearGradient id="stand" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a2a18" />
          <stop offset="1" stopColor="#1a1208" />
        </linearGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="50" cy="98" rx="28" ry="3" fill="rgba(0,0,0,.6)" />
      {/* stand */}
      <path d="M 30 92 L 70 92 L 64 100 L 36 100 Z" fill="url(#stand)" stroke={accent} strokeWidth="0.5" opacity=".9" />
      <line x1="34" y1="92" x2="66" y2="92" stroke={accent} strokeWidth="0.4" />
      {/* sphere */}
      <circle cx="50" cy="48" r="32" fill="url(#ball)" />
      {/* highlight */}
      <ellipse cx="40" cy="33" rx="8" ry="4" fill="rgba(255,255,255,.7)" transform="rotate(-30 40 33)" />
      <circle cx="58" cy="58" r="2" fill="rgba(255,255,255,.4)" />
      {/* sparkles */}
      <text x="80" y="22" fill={accent} fontSize="6">✦</text>
      <text x="14" y="62" fill={accent} fontSize="4" opacity=".6">✦</text>
      <text x="78" y="78" fill={accent} fontSize="4" opacity=".6">✦</text>
    </svg>
  );
}

function MoonPhasesIllustration({ accent = CREAM }: { accent?: string }) {
  const moons = [
    { r: 7.5, off: 0, kind: "new" },
    { r: 7.5, off: 0, kind: "crescent" },
    { r: 7.5, off: 0, kind: "half" },
    { r: 7.5, off: 0, kind: "gibbous" },
    { r: 7.5, off: 0, kind: "full" },
  ];
  return (
    <svg viewBox="0 0 200 60" className="h-full w-full">
      {/* connecting line */}
      <line x1="20" y1="30" x2="180" y2="30" stroke={GOLD} strokeWidth="0.4" strokeDasharray="2 3" opacity=".5" />
      {moons.map((m, i) => {
        const cx = 20 + i * 40;
        return (
          <g key={i}>
            <circle cx={cx} cy={30} r={m.r} fill={accent} />
            {m.kind === "new" && <circle cx={cx} cy={30} r={m.r} fill="#0e0820" />}
            {m.kind === "crescent" && (
              <circle cx={cx - 3} cy={30} r={m.r} fill="#0e0820" />
            )}
            {m.kind === "half" && (
              <rect x={cx} y={30 - m.r} width={m.r + 0.5} height={m.r * 2} fill="#0e0820" />
            )}
            {m.kind === "gibbous" && (
              <circle cx={cx + 3} cy={30} r={m.r} fill="#0e0820" />
            )}
            <circle cx={cx} cy={30} r={m.r} fill="none" stroke={GOLD} strokeWidth="0.4" opacity=".7" />
          </g>
        );
      })}
    </svg>
  );
}

function TarotSunIllustration({ accent = GOLD }: { accent?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* outer rays */}
      <g stroke={accent} strokeWidth="0.6" strokeLinecap="round">
        {rays.map((deg, i) => (
          <line
            key={deg}
            x1="50"
            y1="50"
            x2="50"
            y2={i % 2 === 0 ? "12" : "20"}
            transform={`rotate(${deg} 50 50)`}
            opacity={i % 2 === 0 ? 0.85 : 0.5}
          />
        ))}
      </g>
      {/* outer ring */}
      <circle cx="50" cy="50" r="22" fill="none" stroke={accent} strokeWidth="0.5" opacity=".6" />
      {/* sun face */}
      <circle cx="50" cy="50" r="18" fill={accent} opacity=".95" />
      <circle cx="44" cy="46" r="1.5" fill="#1a0030" />
      <circle cx="56" cy="46" r="1.5" fill="#1a0030" />
      <path d="M 44 54 Q 50 58 56 54" stroke="#1a0030" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ZodiacWheelIllustration({ accent = GOLD }: { accent?: string }) {
  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  const symbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="42" fill="none" stroke={accent} strokeWidth="0.6" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={accent} strokeWidth="0.4" opacity=".7" />
      <circle cx="50" cy="50" r="28" fill="none" stroke={accent} strokeWidth="0.3" opacity=".4" />
      <g stroke={accent} strokeWidth="0.5">
        {ticks.map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="14"
            x2="50"
            y2="20"
            transform={`rotate(${deg} 50 50)`}
            opacity=".7"
          />
        ))}
      </g>
      {/* symbols around */}
      {symbols.map((s, i) => {
        const a = (i * 30 - 75) * (Math.PI / 180);
        const r = 32;
        const x = 50 + r * Math.cos(a);
        const y = 50 + r * Math.sin(a) + 1.5;
        return (
          <text key={s} x={x} y={y} fontSize="4.5" fill={accent} textAnchor="middle" opacity=".8">
            {s}
          </text>
        );
      })}
      {/* center ☉ */}
      <text x="50" y="55" fontSize="14" fill={accent} textAnchor="middle" fontFamily="serif">
        ☉
      </text>
    </svg>
  );
}

function EyeIllustration({ accent = GOLD }: { accent?: string }) {
  return (
    <svg viewBox="0 0 100 80" className="h-full w-full">
      {/* triangle */}
      <path d="M 50 8 L 92 70 L 8 70 Z" fill="none" stroke={accent} strokeWidth="0.7" opacity=".85" />
      <path d="M 50 16 L 84 66 L 16 66 Z" fill="none" stroke={accent} strokeWidth="0.4" opacity=".4" />
      {/* eye */}
      <ellipse cx="50" cy="46" rx="22" ry="11" fill="none" stroke={accent} strokeWidth="0.8" />
      <circle cx="50" cy="46" r="9" fill={accent} opacity=".95" />
      <circle cx="50" cy="46" r="4.5" fill="#0a0518" />
      <circle cx="48" cy="44" r="1.5" fill="#fff" opacity=".85" />
      {/* lashes */}
      <g stroke={accent} strokeWidth="0.5" strokeLinecap="round">
        <line x1="28" y1="35" x2="24" y2="30" />
        <line x1="38" y1="32" x2="36" y2="26" />
        <line x1="50" y1="31" x2="50" y2="25" />
        <line x1="62" y1="32" x2="64" y2="26" />
        <line x1="72" y1="35" x2="76" y2="30" />
      </g>
    </svg>
  );
}

function CrescentMoonIllustration({ accent = CREAM }: { accent?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <radialGradient id="moonGrad" cx="40%" cy="35%">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="60%" stopColor={accent} stopOpacity=".9" />
          <stop offset="100%" stopColor="#9b8853" />
        </radialGradient>
      </defs>
      <circle cx="55" cy="50" r="34" fill="url(#moonGrad)" />
      <circle cx="68" cy="50" r="34" fill="#0e0820" />
      {/* tiny stars */}
      <text x="14" y="20" fontSize="6" fill={GOLD} opacity=".9">✦</text>
      <text x="86" y="86" fontSize="5" fill={GOLD} opacity=".7">✦</text>
      <text x="20" y="80" fontSize="4" fill={GOLD} opacity=".6">✦</text>
      <text x="84" y="22" fontSize="4" fill={GOLD} opacity=".6">✦</text>
    </svg>
  );
}

function RuneStonesIllustration({ accent = GOLD }: { accent?: string }) {
  const runes = [
    { x: 12, y: 28, r: -8, ch: "ᚠ" },
    { x: 36, y: 22, r: 5, ch: "ᛟ" },
    { x: 60, y: 26, r: -3, ch: "ᚱ" },
    { x: 84, y: 22, r: 8, ch: "ᛞ" },
  ];
  return (
    <svg viewBox="0 0 120 70" className="h-full w-full">
      {runes.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y}) rotate(${s.r})`}>
          <rect width="22" height="32" rx="3" fill="#231838" stroke={accent} strokeWidth="0.5" />
          <text x="11" y="22" fontSize="14" fill={accent} textAnchor="middle" fontFamily="serif">
            {s.ch}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* === Card frame helpers === */

function MysticCardFrame({
  children,
  accent = GOLD,
  padded = true,
}: {
  children: React.ReactNode;
  accent?: string;
  padded?: boolean;
}) {
  return (
    <article
      className="group relative w-full max-w-[280px] overflow-hidden rounded-[14px]"
      style={{
        background: `linear-gradient(180deg, ${CARD_BG}, #0c061b)`,
        border: `1px solid ${accent}40`,
        boxShadow: `0 1px 0 ${accent}26 inset, 0 22px 50px -22px ${accent}66, 0 1px 2px rgba(0,0,0,.4)`,
      }}
    >
      <div className={padded ? "p-0" : ""}>{children}</div>
    </article>
  );
}

function CornerOrnaments({ accent = GOLD }: { accent?: string }) {
  const Corner = ({ tx, ty, rot }: { tx: number; ty: number; rot: number }) => (
    <svg
      viewBox="0 0 20 20"
      className="absolute"
      style={{ width: 22, height: 22, top: ty, left: tx === -1 ? undefined : tx, right: tx === -1 ? 6 : undefined, transform: `rotate(${rot}deg)`, color: accent }}
    >
      <path d="M 2 2 L 18 2 L 18 6 L 6 6 L 6 18 L 2 18 Z" fill="currentColor" opacity=".75" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" opacity=".7" />
    </svg>
  );
  return (
    <>
      <Corner tx={6} ty={6} rot={0} />
      <Corner tx={-1} ty={6} rot={90} />
      <Corner tx={6} ty={-1 as unknown as number} rot={-90} />
      <Corner tx={-1} ty={-1 as unknown as number} rot={180} />
    </>
  );
}

function ImageArea({
  children,
  accent = GOLD,
  bg,
}: {
  children: React.ReactNode;
  accent?: string;
  bg?: string;
}) {
  const background =
    bg ??
    `radial-gradient(at 30% 25%, ${accent}33, transparent 55%), radial-gradient(at 75% 80%, #2a1148, transparent 60%), linear-gradient(135deg, #150a26, #07031a)`;
  return (
    <div className="relative aspect-[4/3] overflow-hidden" style={{ background }}>
      {/* noise overlay (cheap grain via tiny SVG) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* vignette */}
      <div aria-hidden className="absolute inset-0" style={{ boxShadow: "inset 0 -42px 60px -14px rgba(0,0,0,.7), inset 0 18px 40px -14px rgba(0,0,0,.5)" }} />
      {/* corner sparkle */}
      <span aria-hidden className="absolute right-3 top-3 text-[10px]" style={{ color: accent, letterSpacing: ".25em" }}>✦</span>
      <div className="relative flex h-full w-full items-center justify-center p-5">{children}</div>
    </div>
  );
}

function CardBody({
  title,
  body,
  cta = "READ MORE",
  accent = GOLD,
}: {
  title: string;
  body: string;
  cta?: string;
  accent?: string;
}) {
  return (
    <div className="px-5 pb-5 pt-4" style={{ fontFamily: SERIF }}>
      <h3 className="text-[18px] font-semibold italic tracking-wide" style={{ color: CREAM }}>
        {title}
      </h3>
      <p className="mt-1.5 text-[11.5px] leading-relaxed" style={{ color: "rgba(233,214,163,.65)" }}>
        {body}
      </p>
      <div
        className="mt-3.5 inline-flex items-center gap-2 border-t pt-3 text-[9.5px] font-semibold"
        style={{ borderColor: `${accent}33`, color: accent, letterSpacing: ".22em" }}
      >
        {cta} <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </div>
  );
}

/* === 4 existing (rebuilt) === */

export function PCardMystical({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#06031a] p-4">
      <MysticCardFrame accent={color.hex}>
        <ImageArea accent={color.hex}>
          <PalmIllustration accent={color.hex} />
        </ImageArea>
        <CardBody
          accent={color.hex}
          title="手相占い"
          body="あなたの手の中に刻まれた運命を、星の声と共に読み解きます。"
        />
      </MysticCardFrame>
    </div>
  );
}

export function PCardGoldFrame({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#04020f] p-4">
      <div
        className="rounded-[18px] p-[1.5px]"
        style={{
          background: `linear-gradient(135deg, ${GOLD}, #f5d272 30%, #8a6a1c 60%, ${GOLD} 100%)`,
          backgroundSize: "200% 200%",
          animation: "goldShimmer 8s ease-in-out infinite",
          boxShadow: `0 26px 56px -22px ${GOLD}66`,
          maxWidth: 250,
          width: "100%",
        }}
      >
        <div
          className="relative rounded-[16px] px-5 pb-6 pt-5 text-center"
          style={{
            background: `radial-gradient(at 50% 0%, ${color.hex}33, transparent 50%), linear-gradient(180deg, #14091e, #0a0512)`,
            color: CREAM,
            fontFamily: SERIF,
          }}
        >
          <CornerOrnaments accent={GOLD} />
          <div className="relative">
            <div className="mx-auto h-[90px] w-[90px]">
              <TarotSunIllustration accent={GOLD} />
            </div>
            <span className="mt-2 block text-[9px] tracking-[.4em] opacity-70">— ✦ —</span>
            <h3 className="mt-1 text-[20px] font-semibold italic tracking-wide">今日の星座</h3>
            <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(233,214,163,.7)" }}>
              あなたの星のひとことを。
            </p>
            <span className="mt-2 block text-[9px] tracking-[.4em] opacity-70">— ✦ —</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PCardNightSky({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#03020c] p-4">
      <div
        className="relative w-full max-w-[280px] overflow-hidden rounded-2xl"
        style={{
          background: `radial-gradient(at 80% 18%, ${color.hex}55, transparent 55%), linear-gradient(180deg, #0e1233, #1a0e2e)`,
          boxShadow: `inset 0 0 60px rgba(0,0,0,.65), 0 22px 50px -22px ${color.hex}55`,
          color: CREAM,
          fontFamily: SERIF,
          border: `1px solid ${GOLD}30`,
        }}
      >
        {/* stars */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1.2px 1.2px at 12% 18%, #fff, transparent 60%), radial-gradient(.8px .8px at 28% 36%, #fff, transparent 60%), radial-gradient(1.5px 1.5px at 64% 22%, #fff, transparent 60%), radial-gradient(.7px .7px at 80% 50%, #fff, transparent 60%), radial-gradient(1.2px 1.2px at 30% 70%, #fff, transparent 60%), radial-gradient(.8px .8px at 50% 80%, #fff, transparent 60%), radial-gradient(1px 1px at 90% 14%, #fff, transparent 60%)",
            animation: "starShine 3.6s ease-in-out infinite",
          }}
        />
        {/* moon illustration */}
        <div className="relative flex h-[110px] items-center justify-center pt-4">
          <div className="h-[84px] w-[84px]">
            <CrescentMoonIllustration accent={CREAM} />
          </div>
        </div>
        <div className="relative px-5 pb-5 pt-1">
          <span className="text-[9px] tracking-[.32em] opacity-65">TONIGHT</span>
          <h3 className="mt-1 text-[20px] font-semibold italic tracking-wide">牡牛座 ♉</h3>
          <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(233,214,163,.7)" }}>
            今夜は静かな決断のとき。月明かりがあなたを照らします。
          </p>
        </div>
      </div>
    </div>
  );
}

export function PCardGlowEdge({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#03020c] p-4">
      <div
        className="relative w-full max-w-[260px] overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(180deg, rgba(20,9,30,.95), rgba(8,4,16,.96))`,
          color: CREAM,
          fontFamily: SERIF,
          animation: "glowPulse 5s ease-in-out infinite",
          border: `1px solid ${GOLD}33`,
        }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2"
          style={{ background: `linear-gradient(to bottom, transparent, ${color.hex})` }}
        />
        {/* eye illustration */}
        <div className="flex justify-center pt-6">
          <div className="h-[80px] w-[110px]">
            <EyeIllustration accent={color.hex} />
          </div>
        </div>
        <div className="px-5 pb-6 pt-2 text-center">
          <span
            className="inline-block rounded-full border px-2.5 py-0.5 text-[9px]"
            style={{ borderColor: `${GOLD}55`, color: GOLD, letterSpacing: ".28em" }}
          >
            TODAY
          </span>
          <h3 className="mt-2 text-[20px] font-semibold italic tracking-wide">今日の運命</h3>
          <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(233,214,163,.7)" }}>
            光の中に答えがあります。
          </p>
        </div>
      </div>
    </div>
  );
}

/* === 4 NEW mystical cards === */

export function PCardCrystalBall({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#06031a] p-4">
      <MysticCardFrame accent={color.hex}>
        <ImageArea accent={color.hex}>
          <CrystalBallIllustration accent={color.hex} />
        </ImageArea>
        <CardBody
          accent={color.hex}
          title="水晶玉占い"
          body="球体に映るあなたの未来を、霊的な視点から読み解きます。"
        />
      </MysticCardFrame>
    </div>
  );
}

export function PCardMoonPhases({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#03020c] p-4">
      <div
        className="relative w-full max-w-[280px] overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(180deg, #0a0a22, #0e0820)`,
          color: CREAM,
          fontFamily: SERIF,
          border: `1px solid ${GOLD}33`,
          boxShadow: `0 22px 50px -22px ${GOLD}55`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1.2px 1.2px at 16% 24%, #fff, transparent 60%), radial-gradient(1px 1px at 84% 24%, #fff, transparent 60%), radial-gradient(.8px .8px at 50% 80%, #fff, transparent 60%)",
            animation: "starShine 3s ease-in-out infinite",
            opacity: .85,
          }}
        />
        <div className="relative flex h-[120px] items-center justify-center px-3">
          <MoonPhasesIllustration accent={CREAM} />
        </div>
        <div className="relative px-5 pb-5 pt-1">
          <span className="text-[9px] tracking-[.32em] opacity-65" style={{ color: GOLD }}>
            MOON CALENDAR
          </span>
          <h3 className="mt-1 text-[20px] font-semibold italic tracking-wide">月の満ち欠け</h3>
          <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(233,214,163,.7)" }}>
            月のリズムに合わせて、心と運気を整えていきましょう。
          </p>
          <div
            className="mt-3 inline-flex items-center gap-2 border-t pt-2.5 text-[9.5px] font-semibold"
            style={{ borderColor: `${GOLD}33`, color: GOLD, letterSpacing: ".22em" }}
          >
            VIEW CALENDAR <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PCardZodiacWheel({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#06031a] p-4">
      <MysticCardFrame accent={color.hex}>
        <ImageArea accent={color.hex}>
          <ZodiacWheelIllustration accent={color.hex} />
        </ImageArea>
        <CardBody
          accent={color.hex}
          title="西洋占星術"
          body="生まれた瞬間の星の配置から、あなたの本質を読み解きます。"
          cta="DIAGNOSE"
        />
      </MysticCardFrame>
    </div>
  );
}

export function PCardTarotFlow(_: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(at 20% 0%, rgba(124,92,255,.18), transparent 60%), linear-gradient(180deg, #0a0518, #0e0820)",
      }}
    >
      <TarotFlow speed={45} size={88} />
    </div>
  );
}

export function PCardTarotPhoto({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0518, #0e0820)" }}
    >
      <TarotPhotoCard
        src={SAMPLE_IMG}
        alt="The Moon"
        numeral="XVIII"
        title="THE MOON"
        accent={color.hex}
        width={150}
      />
    </div>
  );
}

export function PCardTarotPhotoFlow({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0518, #0e0820)" }}
    >
      <TarotPhotoFlow photos={SAMPLE_PHOTOS} speed={45} size={92} accent={color.hex} />
    </div>
  );
}

export function PCardPhotoOverlay({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-50 p-3">
      <a
        role="link"
        className="group relative isolate block aspect-[4/5] w-[60%] cursor-pointer overflow-hidden rounded-2xl shadow-[0_20px_40px_-16px_rgba(0,0,0,.4)]"
      >
        <img
          src={SAMPLE_IMG}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/85" />
        <div className="relative flex h-full flex-col justify-end gap-1 p-4 text-white">
          <span
            className="text-[8px] font-semibold tracking-[0.25em]"
            style={{ color: color.hex }}
          >
            FORTUNE
          </span>
          <h3
            className="font-serif text-base font-semibold italic leading-tight"
            style={{ fontFamily: "'Cormorant Garamond','Noto Serif JP',serif" }}
          >
            月夜のメッセージ
          </h3>
          <span
            className="text-[8px] font-semibold tracking-[0.2em] opacity-90"
            style={{ color: color.hex }}
          >
            READ MORE →
          </span>
        </div>
      </a>
    </div>
  );
}

export function PCardPhotoPolaroid({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-100 p-3">
      <figure
        className="m-0 inline-block bg-zinc-50 p-2 pb-5 shadow-[0_8px_18px_-6px_rgba(0,0,0,.25),0_2px_4px_rgba(0,0,0,.1)] transition duration-300 hover:[transform:rotate(0deg)_translateY(-3px)_scale(1.04)]"
        style={{ transform: "rotate(-3deg)" }}
      >
        <img
          src={SAMPLE_IMG}
          alt=""
          loading="lazy"
          className="block aspect-square w-32 object-cover"
          style={{ filter: "saturate(.9) contrast(1.05)" }}
        />
        <figcaption
          className="mt-2 text-center text-base"
          style={{
            fontFamily: "'Caveat','Comic Sans MS',cursive",
            color: color.hex,
          }}
        >
          moon, 21:48
        </figcaption>
      </figure>
    </div>
  );
}

export function PCardPhotoMagazine({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-50 p-3">
      <a
        role="link"
        className="group grid w-full max-w-[300px] cursor-pointer grid-cols-[80px,1fr] gap-3 rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={SAMPLE_IMG}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-0.5">
          <span
            className="text-[8px] font-bold uppercase tracking-[0.22em]"
            style={{ color: color.hex }}
          >
            FORTUNE
          </span>
          <h3
            className="text-sm font-semibold leading-tight text-zinc-900"
            style={{ fontFamily: "'Cormorant Garamond','Noto Serif JP',serif" }}
          >
            運命を読む方法。
          </h3>
          <p className="text-[10px] leading-snug text-zinc-500">
            月光と水晶の流儀。
          </p>
          <span
            className="mt-0.5 text-[8px] font-bold tracking-[0.22em]"
            style={{ color: color.hex }}
          >
            READ MORE →
          </span>
        </div>
      </a>
    </div>
  );
}

export function PCardPhotoVintage({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-100 p-3">
      <figure
        className="relative inline-block aspect-[4/5] w-[140px] m-0 bg-[#2a1f15] p-3 pb-7"
        style={{
          border: "1px solid #6b4f2c",
          boxShadow: `0 12px 24px -10px rgba(0,0,0,.45), inset 0 0 0 3px ${color.hex}33`,
        }}
      >
        <img
          src={SAMPLE_IMG}
          alt=""
          loading="lazy"
          className="block h-[78%] w-full object-cover"
          style={{ filter: "sepia(.6) saturate(.7) contrast(1.05) brightness(.95)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 bottom-7"
          style={{
            opacity: 0.12,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <figcaption
          className="mt-1.5 text-center text-[10px] italic tracking-[0.12em]"
          style={{
            color: "#d4b87a",
            fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
          }}
        >
          <span style={{ color: color.hex }}>●</span> Aged Memory
        </figcaption>
      </figure>
    </div>
  );
}

export function PCardPhotoDuotone({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-100 p-3">
      <figure className="relative m-0 inline-block aspect-[4/5] w-[150px] overflow-hidden rounded-xl shadow-[0_18px_36px_-14px_rgba(0,0,0,.4)]">
        <img
          src={SAMPLE_IMG}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.05)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color.hex}, #0c051a)`,
            mixBlendMode: "multiply",
          }}
        />
        <figcaption
          className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold tracking-[.14em] text-white"
          style={{
            fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
            textShadow: "0 2px 8px rgba(0,0,0,.6)",
          }}
        >
          NIGHT WHISPER
        </figcaption>
      </figure>
    </div>
  );
}

export function PCardPhotoOrnateFrame({ color }: CV) {
  const corners: { pos: string; t: string }[] = [
    { pos: "top-1 left-1", t: "" },
    { pos: "top-1 right-1", t: "scaleX(-1)" },
    { pos: "bottom-1 left-1", t: "scaleY(-1)" },
    { pos: "bottom-1 right-1", t: "scale(-1,-1)" },
  ];
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-900 p-3">
      <figure
        className="m-0 inline-block rounded-md p-1.5"
        style={{
          background:
            "linear-gradient(135deg, #d4af37, #f5d272 30%, #8a6a1c 60%, #d4af37 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 9s ease-in-out infinite",
          boxShadow: "0 22px 50px -22px rgba(212,175,55,.55)",
        }}
      >
        <div
          className="relative rounded-sm p-2"
          style={{ background: "#f5e6c8", border: "1px solid #8a6a1c" }}
        >
          <img
            src={SAMPLE_IMG}
            alt=""
            loading="lazy"
            className="block aspect-[4/5] w-[120px] object-cover"
            style={{ filter: "sepia(.15) saturate(1.05) contrast(1.05)" }}
          />
          {corners.map((c, i) => (
            <span
              key={i}
              className={`absolute h-3 w-3 ${c.pos}`}
              style={{
                background: color.hex,
                clipPath:
                  "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)",
                transform: c.t || undefined,
              }}
            />
          ))}
        </div>
        <figcaption
          className="mt-1 rounded-sm px-2 py-1 text-center text-[10px] italic tracking-[0.12em]"
          style={{
            background: "#14091e",
            color: "#e9d6a3",
            fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
          }}
        >
          The Moonlit Promise
        </figcaption>
      </figure>
    </div>
  );
}

export function PCardRunes({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#06031a] p-4">
      <MysticCardFrame accent={color.hex}>
        <ImageArea accent={color.hex} bg={`linear-gradient(180deg, #1a1030, #06031a)`}>
          <RuneStonesIllustration accent={color.hex} />
        </ImageArea>
        <CardBody
          accent={color.hex}
          title="ルーン占い"
          body="北欧の古代文字に問いかけ、あなたへの導きを得ます。"
        />
      </MysticCardFrame>
    </div>
  );
}

/* Hover */
export function PHoverUnderline({ color }: CV) {
  return (
    <Stage>
      <span role="link" className="group relative cursor-pointer font-semibold text-zinc-900">
        採用情報
        <span
          className="absolute -bottom-1 left-0 h-0.5 w-0 transition-[width] duration-300 group-hover:w-full"
          style={{ background: color.hex }}
        />
      </span>
    </Stage>
  );
}

export function PHoverGlow({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        aria-label="保存"
        className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-xl transition"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = color.hex;
          e.currentTarget.style.boxShadow = `0 0 0 4px ${color.hex}22, 0 0 24px ${color.hex}66`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        ★
      </span>
    </Stage>
  );
}

export function PHoverImageZoom({ color }: CV) {
  return (
    <Stage theme="soft">
      <span
        role="link"
        className="block w-44 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 18px 30px -16px ${color.hex}55`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <span
          className="block aspect-[4/3] w-full transition duration-500 hover:scale-[1.06]"
          style={{
            background: `linear-gradient(135deg, ${color.hex}, ${color.hex}66, #cbd5e1)`,
          }}
        />
      </span>
    </Stage>
  );
}

export function PHoverShiftBg({ color }: CV) {
  return (
    <Stage>
      <span
        role="button"
        className="group relative inline-flex cursor-pointer overflow-hidden rounded-full px-5 py-2.5 font-semibold text-zinc-900 transition hover:text-white"
      >
        <span className="relative z-10">カテゴリA</span>
        <span
          className="absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"
          style={{ background: color.hex }}
        />
      </span>
    </Stage>
  );
}

/* Background */
export function PBgGrid({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white"
      style={{
        backgroundImage: `linear-gradient(to right, ${color.hex}1f 1px, transparent 1px), linear-gradient(to bottom, ${color.hex}1f 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
      }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">grid</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

export function PBgDots({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-white"
      style={{
        backgroundImage: `radial-gradient(${color.hex}40 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
      }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">dots</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

export function PBgConic({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background: `conic-gradient(from 0deg at 50% 50%, ${color.hex}33, transparent 30%, ${color.hex}22 60%, transparent 90%, ${color.hex}33)`,
      }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-700">conic</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

export function PBgAurora({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white">
      <span
        className="absolute -left-10 -top-10 h-3/5 w-3/5 rounded-full blur-3xl"
        style={{ background: color.hex, opacity: 0.5, animation: "auroraA 14s ease-in-out infinite" }}
      />
      <span
        className="absolute -bottom-10 -right-10 h-3/5 w-3/5 rounded-full blur-3xl"
        style={{ background: "#5b8cff", opacity: 0.5, animation: "auroraB 16s ease-in-out infinite" }}
      />
      <div className="relative text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-700">aurora</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

export function PBgNoise({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ background: color.hex + "10" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.08,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="relative text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-700">noise</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

/* Text */
export function PTextGradient({ color }: CV) {
  return (
    <Stage>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
        未来を、
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(135deg, ${color.hex}, #5b8cff)`,
          }}
        >
          速く。
        </span>
      </h2>
    </Stage>
  );
}

export function PTextMarker({ color }: CV) {
  return (
    <Stage>
      <h2 className="text-2xl font-semibold text-zinc-900">
        あなたの
        <span
          className="px-1"
          style={{ backgroundImage: `linear-gradient(transparent 60%, ${color.hex}55 60%)` }}
        >
          仕事
        </span>
        を速く。
      </h2>
    </Stage>
  );
}

export function PTextOutline({ color }: CV) {
  return (
    <Stage>
      <h1
        className="text-6xl font-black tracking-tight"
        style={{ WebkitTextStroke: `2px ${color.hex}`, color: "transparent" }}
      >
        CREATE
      </h1>
    </Stage>
  );
}

export function PTextShadowPop({ color }: CV) {
  return (
    <Stage>
      <h2 className="text-4xl font-extrabold text-zinc-900" style={{ textShadow: `4px 4px 0 ${color.hex}` }}>
        SUPER!
      </h2>
    </Stage>
  );
}

/* SVG */
export function PSvgWave({ color }: CV) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex-1" style={{ background: color.hex + "30" }} />
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="-mt-px block h-12 w-full">
        <path d="M0,80 C360,140 1080,20 1440,80 L1440,120 L0,120 Z" fill={color.hex} />
      </svg>
      <div className="flex-1" style={{ background: color.hex }} />
    </div>
  );
}

export function PSvgBlob({ color }: CV) {
  return (
    <Stage theme="soft">
      <svg viewBox="0 0 200 200" className="h-32 w-32">
        <path
          d="M44,-58C56,-46,64,-32,69,-16C73,-1,72,15,64,28C56,40,40,49,24,57C8,65,-9,73,-22,67C-35,62,-44,42,-52,24C-61,5,-68,-13,-64,-28C-60,-43,-44,-55,-29,-65C-13,-75,2,-82,17,-79C32,-77,46,-65,54,-52Z"
          transform="translate(100 100)"
          fill={color.hex}
        />
      </svg>
    </Stage>
  );
}

export function PSvgZigzag({ color }: CV) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <div className="flex-1" />
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="block h-3 w-full">
        <path d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 Z" fill={color.hex} />
      </svg>
      <div className="flex-1" style={{ background: color.hex }} />
    </div>
  );
}

/* Stats */
export function PStatBigNumber({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="p-5 text-center">
        <div
          className="text-6xl font-extrabold leading-none tracking-tight"
          style={{ color: color.hex }}
        >
          2,400+
        </div>
        <div className="mt-2 text-zinc-600">導入社数</div>
      </div>
    </Stage>
  );
}

/* Form (visual mock — interactive版はコード/プロンプト参照) */
export function PFormFloating({ color }: CV) {
  return (
    <Stage theme="soft">
      <span
        className="relative block w-64 rounded-lg border bg-white px-4 pb-2 pt-[18px] text-[15px]"
        style={{
          borderColor: color.hex,
          boxShadow: `0 0 0 4px ${color.hex}33`,
        }}
      >
        <span className="absolute left-4 top-1 text-[11px]" style={{ color: color.hex }}>
          メールアドレス
        </span>
        <span className="block text-zinc-900">name@example.com</span>
      </span>
    </Stage>
  );
}

export function PFormSearch({ color }: CV) {
  return (
    <Stage theme="soft">
      <span
        className="flex w-72 items-center gap-2.5 rounded-full border bg-white px-4 py-2.5"
        style={{
          borderColor: color.hex,
          boxShadow: `0 0 0 4px ${color.hex}33`,
        }}
      >
        <svg viewBox="0 0 24 24" width={18} height={18} className="text-zinc-400">
          <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" strokeWidth="2" />
          <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="flex-1 text-[15px] text-zinc-400">検索…</span>
      </span>
    </Stage>
  );
}

/* FAQ (visual mock — 動作は詳細ページのコード/プロンプト参照) */
export function PFaqPlus({ color }: CV) {
  return (
    <Stage theme="soft">
      <span className="block w-72">
        <span className="flex items-center justify-between border-b border-zinc-200 pb-3 font-semibold text-zinc-900">
          料金はどこに？
          <span style={{ color: color.hex }} className="rotate-45">
            +
          </span>
        </span>
        <span className="block pt-2 text-sm text-zinc-600">料金ページに3プラン記載しています。</span>
      </span>
    </Stage>
  );
}

/* Empty / Error */
export function PEmptyState({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="w-72 rounded-2xl border border-dashed border-zinc-300 p-6 text-center">
        <div className="mb-2 text-3xl">📭</div>
        <h3 className="font-semibold text-zinc-900">まだ何もありません</h3>
        <p className="mt-1 text-sm text-zinc-500">最初の項目を作って始めましょう。</p>
        <span
          role="button"
          className="mt-3 inline-flex cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold text-white"
          style={{ background: color.hex }}
        >
          ＋ 新規作成
        </span>
      </div>
    </Stage>
  );
}

export function PErrorState({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="w-72 rounded-2xl border border-dashed border-zinc-300 p-6 text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/15 font-bold text-rose-500">
          !
        </div>
        <h3 className="font-semibold text-zinc-900">読み込みに失敗</h3>
        <p className="mt-1 text-sm text-zinc-500">ネットワーク接続をご確認ください。</p>
        <span
          role="button"
          className="mt-3 inline-flex cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold text-white"
          style={{ background: color.hex }}
        >
          再試行
        </span>
      </div>
    </Stage>
  );
}

/* Hero — プレビューはカード内に収まる縮小レイアウト */

export function PHeroCentered({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: color.hex + "22", color: color.hex }}
        >
          2026 リリース
        </span>
        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-zinc-900">
          未来を、<span style={{ color: color.hex }}>速く。</span>
        </h3>
        <p className="mt-1.5 text-[10px] text-zinc-600">サービスの説明文。</p>
        <div className="mt-3 flex gap-1.5">
          <span
            role="button"
            className="inline-flex cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold text-white"
            style={{ background: color.hex }}
          >
            無料で試す
          </span>
          <span
            role="button"
            className="inline-flex cursor-pointer rounded-full border border-zinc-300 px-3 py-1 text-[10px] font-semibold text-zinc-700"
          >
            資料請求
          </span>
        </div>
      </div>
    </Stage>
  );
}

export function PHeroMinimal({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="w-full max-w-md">
        <h3 className="text-3xl font-black leading-[0.95] tracking-tight text-zinc-900">
          Make it <span style={{ color: color.hex }}>real.</span>
        </h3>
        <p className="mt-3 max-w-[16em] text-[11px] text-zinc-500">
          あなたのアイデアを、最短距離で形に。
        </p>
      </div>
    </Stage>
  );
}

export function PHeroGradient({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-start justify-center overflow-hidden p-6 text-white"
      style={{ background: `linear-gradient(135deg, ${color.hex}, #1a1a2e)` }}
    >
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
        NEW
      </span>
      <h3 className="mt-2 text-xl font-bold leading-tight">AIで、仕事を最短に。</h3>
      <p className="mt-1 text-[10px] text-white/80">面倒な作業をすべて自動化。</p>
      <span
        role="button"
        className="mt-3 inline-flex cursor-pointer rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-zinc-900"
      >
        無料で始める
      </span>
    </div>
  );
}

export function PHeroNewsStrip({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <span
          role="link"
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
          style={{
            borderColor: color.hex + "55",
            background: color.hex + "10",
            color: color.hex,
          }}
        >
          🎉 v2.0 をリリースしました <span>→</span>
        </span>
        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-zinc-900">
          すべての作業を、<span style={{ color: color.hex }}>ひとつに。</span>
        </h3>
        <p className="mt-1 text-[10px] text-zinc-600">説明文。</p>
        <span
          role="button"
          className="mt-2.5 inline-flex cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold text-white"
          style={{ background: color.hex }}
        >
          いますぐ始める
        </span>
      </div>
    </Stage>
  );
}

export function PHeroStats({ color }: CV) {
  const stats = [
    { v: "2,400+", l: "導入" },
    { v: "99.9%", l: "稼働" },
    { v: "120h", l: "削減" },
  ];
  return (
    <Stage theme="soft">
      <div className="w-full max-w-md">
        <h3 className="text-lg font-bold leading-tight text-zinc-900">
          エンタープライズの、
          <br />
          <span style={{ color: color.hex }}>最後のSaaS。</span>
        </h3>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-zinc-200 pt-2">
          {stats.map((s) => (
            <div key={s.l}>
              <div
                className="text-base font-extrabold leading-none"
                style={{ color: color.hex }}
              >
                {s.v}
              </div>
              <div className="mt-0.5 text-[9px] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

export function PHeroMockup({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="grid w-full max-w-md grid-cols-2 items-center gap-3">
        <div>
          <h3 className="text-base font-bold leading-tight text-zinc-900">
            作業を、もっと
            <span style={{ color: color.hex }}>速く。</span>
          </h3>
          <p className="mt-1 text-[10px] text-zinc-600">説明文。</p>
          <span
            role="button"
            className="mt-2 inline-flex cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold text-white"
            style={{ background: color.hex }}
          >
            無料で試す
          </span>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl">
            <div
              className="aspect-[16/10] rounded-md"
              style={{
                background: `linear-gradient(135deg, ${color.hex}33, #dbeafe)`,
              }}
            />
          </div>
          <div className="absolute -bottom-2 -left-2 rounded-md border border-zinc-200 bg-white p-1.5 shadow-xl">
            <div
              className="h-3 w-12 rounded"
              style={{
                background: `linear-gradient(to right, ${color.hex}55, #93c5fd)`,
              }}
            />
          </div>
        </div>
      </div>
    </Stage>
  );
}

export function PHeroDiagonal({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden bg-white p-6">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: color.hex,
          clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
        }}
      />
      <div className="relative">
        <h3 className="text-xl font-bold leading-tight text-zinc-900">
          Spring <span className="text-white">SALE</span>
          <br />
          開催中。
        </h3>
        <p className="mt-1 text-[10px] text-zinc-700">期間中、全商品20%OFF。</p>
        <span
          role="button"
          className="mt-2 inline-flex cursor-pointer rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold text-white"
        >
          いますぐチェック
        </span>
      </div>
    </div>
  );
}

export function PHeroVideoBg({ color }: CV) {
  return (
    <div className="relative flex h-full w-full flex-col items-start justify-center overflow-hidden p-6 text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(at 20% 20%, ${color.hex}, transparent 60%), radial-gradient(at 80% 80%, #1e40af, transparent 60%), linear-gradient(180deg, #0f0f1a, #0a0a14)`,
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <div className="relative">
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
          FEATURED
        </span>
        <h3 className="mt-2 text-xl font-bold leading-tight">
          空気を、
          <span style={{ color: color.hex + "cc" }}>記憶する。</span>
        </h3>
        <p className="mt-1 text-[10px] text-white/80">説明文。</p>
        <span
          role="button"
          className="mt-2 inline-flex cursor-pointer rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-zinc-900"
        >
          詳しく見る
        </span>
      </div>
    </div>
  );
}

export function PHeroSplit({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="grid w-full max-w-md grid-cols-2 items-center gap-4">
        <div>
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: color.hex + "22", color: color.hex }}
          >
            NEW
          </span>
          <h3 className="mt-2 text-base font-bold leading-tight text-zinc-900">
            未来を、
            <span style={{ color: color.hex }}>速く。</span>
          </h3>
          <p className="mt-1 text-[10px] text-zinc-600">サービスの説明文。</p>
          <span
            role="button"
            className="mt-2 inline-flex cursor-pointer rounded-full px-3 py-1 text-[10px] font-semibold text-white"
            style={{ background: color.hex }}
          >
            無料で試す
          </span>
        </div>
        <div
          className="aspect-square rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${color.hex}55, ${color.hex}22, #dbeafe)`,
          }}
        />
      </div>
    </Stage>
  );
}

/* ============================================================
   アイコン演出プレビュー
   ============================================================ */

export function PIconLightbulb({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 64 64" className="h-24 w-24" style={{ color: color.hex }}>
        <g
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ transformOrigin: "32px 32px", animation: "bulbRays 2.4s ease-in-out infinite" }}
        >
          <line x1="32" y1="6" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="58" />
          <line x1="6" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="58" y2="32" />
          <line x1="14" y1="14" x2="18" y2="18" />
          <line x1="46" y1="46" x2="50" y2="50" />
          <line x1="50" y1="14" x2="46" y2="18" />
          <line x1="18" y1="46" x2="14" y2="50" />
        </g>
        <g style={{ transformOrigin: "32px 32px", animation: "bulbGlow 2.4s ease-in-out infinite" }}>
          <path
            d="M22 26 a10 10 0 1 1 20 0 c0 6 -4 8 -4 12 h-12 c0 -4 -4 -6 -4 -12 z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
          />
          <rect x="26" y="42" width="12" height="3" rx="1" fill="#0a0a0a" />
          <rect x="28" y="46" width="8" height="3" rx="1" fill="#0a0a0a" />
        </g>
      </svg>
    </Stage>
  );
}

function GearShape({ size, color }: { size: number; color: string }) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g>
      {teeth.map((deg) => (
        <rect
          key={deg}
          x={-size * 0.13}
          y={-size * 0.95}
          width={size * 0.26}
          height={size * 0.4}
          rx={1.5}
          fill={color}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r={size * 0.55} fill={color} />
      <circle r={size * 0.22} fill="#fff" />
    </g>
  );
}

export function PIconGears({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 100 64" className="h-20 w-32">
        <g
          transform="translate(34 36)"
          style={{ transformOrigin: "34px 36px", animation: "gearCw 4s linear infinite", transformBox: "fill-box" }}
        >
          <GearShape size={26} color={color.hex} />
        </g>
        <g
          transform="translate(70 24)"
          style={{ transformOrigin: "70px 24px", animation: "gearCcw 3s linear infinite", transformBox: "fill-box" }}
        >
          <GearShape size={18} color={color.hex} />
        </g>
      </svg>
    </Stage>
  );
}

export function PIconRocket({ color }: CV) {
  return (
    <Stage>
      <div className="relative h-24 w-24">
        <span
          className="absolute bottom-0 left-1/2 text-4xl"
          style={{
            transform: "translateX(-50%) rotate(-45deg)",
            animation: "rocketLift 2s ease-out infinite",
          }}
        >
          🚀
        </span>
        <span
          className="absolute h-3.5 w-3.5 rounded-full"
          style={{
            left: "50%",
            bottom: 6,
            transform: "translateX(-50%)",
            background: color.hex,
            opacity: 0.6,
            animation: "rocketSmoke 2s ease-out infinite",
          }}
        />
      </div>
    </Stage>
  );
}

export function PIconFireworks({ color }: CV) {
  const particles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <Stage>
      <svg viewBox="0 0 80 80" className="h-24 w-24">
        {particles.map((deg, i) => (
          <circle
            key={deg}
            cx={40}
            cy={40}
            r={3}
            fill={color.hex}
            style={{
              transformOrigin: "40px 40px",
              transform: `rotate(${deg}deg) translateY(-26px)`,
              animation: "fwBurst 1.4s ease-out infinite",
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}
        <circle
          cx={40}
          cy={40}
          r={4}
          fill={color.hex}
          style={{
            transformOrigin: "40px 40px",
            animation: "fwBurst 1.4s ease-out infinite",
          }}
        />
      </svg>
    </Stage>
  );
}

function StarShape({ x, y, size, fill, delay }: { x: number; y: number; size: number; fill: string; delay: number }) {
  const half = size / 2;
  const i = size * 0.16;
  const d = `M${x},${y - half} L${x + i},${y - i} L${x + half},${y} L${x + i},${y + i} L${x},${y + half} L${x - i},${y + i} L${x - half},${y} L${x - i},${y - i} Z`;
  return (
    <path
      d={d}
      fill={fill}
      style={{
        transformOrigin: `${x}px ${y}px`,
        animation: "sparkleBlink 1.6s ease-in-out infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export function PIconSparkles({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 64 64" className="h-24 w-24">
        <StarShape x={32} y={32} size={28} fill={color.hex} delay={0} />
        <StarShape x={14} y={14} size={12} fill={color.hex} delay={0.3} />
        <StarShape x={50} y={18} size={10} fill={color.hex} delay={0.6} />
        <StarShape x={48} y={50} size={14} fill={color.hex} delay={0.45} />
        <StarShape x={12} y={48} size={9} fill={color.hex} delay={0.15} />
      </svg>
    </Stage>
  );
}

export function PIconLockUnlock({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 64 64" className="h-24 w-24" style={{ color: color.hex }}>
        <rect x={14} y={28} width={36} height={26} rx={4} fill="currentColor" />
        <rect x={29} y={36} width={6} height={10} rx={1} fill="#fff" />
        <path
          d="M22 28 V20 a10 10 0 0 1 20 0 v8"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          style={{
            transformOrigin: "22px 28px",
            animation: "lockArc 2.4s ease-in-out infinite",
          }}
        />
      </svg>
    </Stage>
  );
}

export function PIconHeartBurst({ color }: CV) {
  const minis = [
    { tx: "-32px", ty: "-28px" },
    { tx: "32px", ty: "-28px" },
    { tx: "-36px", ty: "8px" },
    { tx: "36px", ty: "8px" },
    { tx: "0px", ty: "-40px" },
  ];
  return (
    <Stage>
      <div className="relative flex h-24 w-24 items-center justify-center" style={{ color: color.hex }}>
        <span className="text-5xl" style={{ animation: "heartPop 1.6s ease-in-out infinite" }}>
          ♥
        </span>
        {minis.map((m, i) => (
          <span
            key={i}
            className="absolute text-base"
            style={
              {
                ["--tx" as string]: m.tx,
                ["--ty" as string]: m.ty,
                animation: "heartFly 1.6s ease-out infinite",
                animationDelay: `${0.2 + i * 0.08}s`,
              } as React.CSSProperties
            }
          >
            ♥
          </span>
        ))}
      </div>
    </Stage>
  );
}

export function PIconWifi({ color }: CV) {
  const arcs = [
    { d: "M14 36 a18 18 0 0 1 36 0", delay: "0s" },
    { d: "M20 36 a12 12 0 0 1 24 0", delay: "0.2s" },
    { d: "M26 36 a6 6 0 0 1 12 0", delay: "0.4s" },
  ];
  return (
    <Stage>
      <svg viewBox="0 0 64 56" className="h-20 w-24" style={{ color: color.hex }}>
        <circle cx={32} cy={46} r={4} fill="currentColor" />
        {arcs.map((a, i) => (
          <path
            key={i}
            d={a.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            style={{
              transformOrigin: "32px 36px",
              animation: "wifiArc 2s ease-in-out infinite",
              animationDelay: a.delay,
            }}
          />
        ))}
      </svg>
    </Stage>
  );
}

export function PIconPaperPlane({ color }: CV) {
  return (
    <Stage>
      <div className="relative flex h-24 w-32 items-end justify-start pl-2">
        <span
          className="text-4xl"
          style={{
            color: color.hex,
            animation: "paperFly 1.8s ease-in infinite",
            display: "inline-block",
          }}
        >
          ✈️
        </span>
      </div>
    </Stage>
  );
}

export function PIconBell({ color }: CV) {
  return (
    <Stage>
      <svg
        viewBox="0 0 64 64"
        className="h-24 w-24"
        style={{
          color: color.hex,
          transformOrigin: "32px 12px",
          animation: "bellSwing 1.4s ease-in-out infinite",
        }}
      >
        <path
          d="M32 8 a20 20 0 0 1 20 20 v10 l4 6 H8 l4 -6 V28 a20 20 0 0 1 20 -20 z"
          fill="currentColor"
        />
        <circle cx={32} cy={50} r={4} fill="currentColor" />
        <circle cx={32} cy={6} r={3} fill="currentColor" />
      </svg>
    </Stage>
  );
}

export function PIconClock({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 64 64" className="h-24 w-24" style={{ color: color.hex }}>
        <circle cx={32} cy={32} r={28} fill="none" stroke="currentColor" strokeWidth={3} />
        <line
          x1={32}
          y1={32}
          x2={32}
          y2={14}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transformOrigin: "32px 32px", animation: "clockMin 6s linear infinite" }}
        />
        <line
          x1={32}
          y1={32}
          x2={32}
          y2={20}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ transformOrigin: "32px 32px", animation: "clockSec 1s steps(8) infinite" }}
        />
        <circle cx={32} cy={32} r={2} fill="currentColor" />
      </svg>
    </Stage>
  );
}

export function PIconTypewriter({ color }: CV) {
  return (
    <Stage>
      <div className="font-mono text-2xl" style={{ color: color.hex }}>
        <span
          className="inline-block overflow-hidden whitespace-nowrap align-middle"
          style={{ width: 0, animation: "typeText 2.4s steps(10) infinite" }}
        >
          Generating
        </span>
        <span className="ml-0.5 align-middle" style={{ animation: "typeCaret 1s steps(2) infinite" }}>
          |
        </span>
      </div>
    </Stage>
  );
}

/* ============================================================
   フォントアレンジプレビュー
   ============================================================ */

export function PFontGlitch({ color }: CV) {
  return (
    <Stage>
      <h2
        className="text-5xl font-black tracking-wide"
        style={{
          color: color.hex,
          textShadow: "-2px 0 #ff00c1, 2px 0 #00fff9",
          animation: "glitchA 1.6s infinite linear alternate-reverse",
        }}
      >
        GLITCH
      </h2>
    </Stage>
  );
}

export function PFont3D({ color }: CV) {
  const layers = [1, 2, 3, 4, 5, 6].map((n) => `${n}px ${n}px 0 ${color.hex}`).join(", ");
  return (
    <Stage theme="soft">
      <h2
        className="text-6xl font-black text-white"
        style={{ textShadow: `${layers}, 8px 8px 14px rgba(0,0,0,.25)` }}
      >
        PUSH!
      </h2>
    </Stage>
  );
}

export function PFontLongShadow({ color }: CV) {
  const layers = Array.from({ length: 30 }, (_, i) => `${i + 1}px ${i + 1}px 0 ${color.hex}`).join(", ");
  return (
    <Stage theme="soft">
      <h2 className="text-6xl font-extrabold text-zinc-900" style={{ textShadow: layers }}>
        LONG
      </h2>
    </Stage>
  );
}

export function PFontNeon({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a14] p-6">
      <h2
        className="text-6xl font-extrabold text-white"
        style={{
          textShadow: `0 0 4px #fff, 0 0 10px ${color.hex}, 0 0 20px ${color.hex}, 0 0 40px ${color.hex}`,
        }}
      >
        NEON
      </h2>
    </div>
  );
}

export function PFontWave({ color }: CV) {
  const text = "SPLASH";
  return (
    <Stage>
      <h2 className="text-5xl font-extrabold" style={{ color: color.hex }}>
        {Array.from(text).map((c, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: "letterWave 1.6s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {c}
          </span>
        ))}
      </h2>
    </Stage>
  );
}

export function PFontStrokeFill({ color }: CV) {
  return (
    <Stage>
      <h2
        className="cursor-default text-7xl font-black transition-colors duration-500"
        style={{
          WebkitTextStroke: `2px ${color.hex}`,
          color: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = color.hex;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "transparent";
        }}
      >
        CREATE
      </h2>
    </Stage>
  );
}

export function PFontGradientAnim({ color }: CV) {
  return (
    <Stage>
      <h2
        className="bg-clip-text text-5xl font-extrabold text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${color.hex}, #5b8cff, ${color.hex})`,
          backgroundSize: "200% 100%",
          animation: "gradPan 8s linear infinite",
        }}
      >
        Future is Now
      </h2>
    </Stage>
  );
}

export function PFontEmboss({ color }: CV) {
  return (
    <Stage theme="soft">
      <h2
        className="text-6xl font-extrabold"
        style={{
          color: color.hex,
          textShadow: "0 1px 0 #fff, 0 -1px 0 rgba(0,0,0,.25)",
        }}
      >
        Premium
      </h2>
    </Stage>
  );
}

export function PFontStripe({ color }: CV) {
  return (
    <Stage>
      <h2
        className="bg-clip-text text-7xl font-black text-transparent"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color.hex} 0 8px, transparent 8px 16px)`,
        }}
      >
        SUPER
      </h2>
    </Stage>
  );
}

export function PFontStretch({ color }: CV) {
  return (
    <Stage theme="soft">
      <h2
        className="origin-top text-5xl font-black [transform:scaleY(2)]"
        style={{ color: color.hex, letterSpacing: "-.02em" }}
      >
        TALL
      </h2>
    </Stage>
  );
}

export function PFontReveal({ color }: CV) {
  const text = "HELLO";
  return (
    <Stage>
      <h2 className="text-6xl font-extrabold" style={{ color: color.hex }}>
        {Array.from(text).map((c, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: 0,
              transform: "translateY(.4em)",
              animation: "letterReveal .6s ease-out forwards",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {c}
          </span>
        ))}
      </h2>
    </Stage>
  );
}

export function PFontHandwriting({ color }: CV) {
  return (
    <Stage>
      <svg viewBox="0 0 240 80" className="h-20 w-60">
        <path
          d="M20,60 C 30,20 60,20 80,50 S 130,20 160,50 220,30 220,55"
          stroke={color.hex}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: 600,
            animation: "hwDraw 2.6s ease-in-out infinite alternate",
          }}
        />
      </svg>
    </Stage>
  );
}

export function PFontPrintCmyk(_: CV) {
  return (
    <Stage theme="soft">
      <h2
        className="text-7xl font-black"
        style={{
          color: "rgba(0,0,0,.85)",
          textShadow:
            "2px 0 rgba(0,220,220,.8), -2px 0 rgba(220,0,220,.75), 0 2px rgba(220,220,0,.8)",
        }}
      >
        PRINT
      </h2>
    </Stage>
  );
}

export function PFontMixedSize({ color }: CV) {
  const text = "ART!";
  const sizes = ["1em", "1.6em", ".85em", "1.4em"];
  return (
    <Stage theme="soft">
      <h2
        className="text-5xl font-black leading-none"
        style={{ color: color.hex, letterSpacing: "-.04em" }}
      >
        {Array.from(text).map((c, i) => (
          <span key={i} style={{ fontSize: sizes[i % sizes.length] }}>
            {c}
          </span>
        ))}
      </h2>
    </Stage>
  );
}

export function PFontReverse({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="inline-flex flex-col leading-[.9]">
        <h2 className="m-0 text-5xl font-black" style={{ color: color.hex }}>
          REFLECT
        </h2>
        <h2
          className="m-0 text-5xl font-black"
          style={{
            color: color.hex,
            transform: "scaleY(-1)",
            opacity: 0.25,
            WebkitMaskImage: "linear-gradient(to top, transparent, #000 80%)",
            maskImage: "linear-gradient(to top, transparent, #000 80%)",
          }}
        >
          REFLECT
        </h2>
      </div>
    </Stage>
  );
}

/* Mystical / Fortune fonts */

export function PFontMysticShimmer({ color }: CV) {
  return (
    <Stage>
      <h2
        className="bg-clip-text text-3xl font-semibold tracking-wide text-transparent"
        style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif",
          backgroundImage: `linear-gradient(90deg, ${color.hex}, #f5e6c8, ${color.hex})`,
          backgroundSize: "200% 100%",
          animation: "gradPan 9s linear infinite",
        }}
      >
        星に問う、あなたの今日。
      </h2>
    </Stage>
  );
}

export function PFontTarotFrame({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="text-center" style={{ color: color.hex, fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif" }}>
        <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
        <h2 className="my-1 text-4xl font-semibold italic tracking-wider">運命の扉</h2>
        <span className="block tracking-[.4em] opacity-60">— ✦ —</span>
      </div>
    </Stage>
  );
}

export function PFontCrystalBall({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0e0820] p-6">
      <div
        className="flex h-44 w-44 items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color.hex}88 30%, ${color.hex} 70%, #2a004a 100%)`,
          boxShadow: `0 30px 60px -20px ${color.hex}55, inset 0 0 60px rgba(0,0,0,.3)`,
          animation: "crystalGlow 6s ease-in-out infinite",
        }}
      >
        <span
          className="text-3xl font-semibold text-white"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: `0 0 16px ${color.hex}`,
          }}
        >
          占う
        </span>
      </div>
    </div>
  );
}

export function PFontMoonGlow({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a14] p-6">
      <h2
        className="text-3xl font-medium tracking-wider"
        style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif",
          color: "#fff8e7",
          textShadow: `0 0 8px #fff8e7, 0 0 18px ${color.hex}, 0 0 36px ${color.hex}, 0 0 60px ${color.hex}`,
        }}
      >
        ⊕ 月夜の占い
      </h2>
    </div>
  );
}

export function PFontConstellation({ color }: CV) {
  const stars = [
    { top: 6, left: 8, delay: 0 },
    { top: 0, right: 28, delay: 0.4 },
    { bottom: 4, left: 38, delay: 0.8 },
    { bottom: 12, right: 4, delay: 1.2 },
  ];
  return (
    <Stage>
      <div
        className="relative inline-block px-9 py-6"
        style={{ color: color.hex, fontFamily: "'Cormorant Garamond', serif" }}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute text-sm"
            style={{
              ...s,
              animation: "sparkleBlink 1.8s ease-in-out infinite",
              animationDelay: `${s.delay}s`,
            }}
          >
            ✦
          </span>
        ))}
        <h2 className="m-0 text-5xl font-semibold tracking-wide">Cosmos</h2>
      </div>
    </Stage>
  );
}

export function PFontMistFade({ color }: CV) {
  return (
    <Stage>
      <h2
        className="text-3xl font-medium italic tracking-wide"
        style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', serif",
          color: color.hex,
          animation: "mistAppear 3.2s ease-out infinite",
        }}
      >
        あなたへのメッセージ
      </h2>
    </Stage>
  );
}

/* ============================================================
   NAV
   ============================================================ */

export function PNavHorizontal({ color }: CV) {
  return (
    <Stage>
      <header className="flex w-full max-w-md items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 shadow-sm">
        <span className="text-xs font-bold text-zinc-900">Brand</span>
        <nav className="flex gap-3 text-[10px] text-zinc-600">
          <span className="cursor-pointer hover:text-zinc-900">Features</span>
          <span className="cursor-pointer hover:text-zinc-900">Pricing</span>
          <span className="cursor-pointer hover:text-zinc-900">Docs</span>
        </nav>
        <span
          role="button"
          className="cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
          style={{ background: color.hex }}
        >
          始める
        </span>
      </header>
    </Stage>
  );
}

export function PNavTabs({ color }: CV) {
  return (
    <Stage>
      <nav className="flex w-full max-w-xs gap-4 border-b border-zinc-200">
        {[
          { l: "概要", a: true },
          { l: "履歴", a: false },
          { l: "設定", a: false },
        ].map((t) => (
          <span
            key={t.l}
            className="cursor-pointer border-b-2 py-2 text-xs font-medium transition"
            style={{
              borderColor: t.a ? color.hex : "transparent",
              color: t.a ? color.hex : "#52525b",
            }}
          >
            {t.l}
          </span>
        ))}
      </nav>
    </Stage>
  );
}

export function PNavBreadcrumb({ color }: CV) {
  return (
    <Stage>
      <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
        <span className="cursor-pointer text-zinc-600">ホーム</span>
        <span>/</span>
        <span className="cursor-pointer text-zinc-600">サービス</span>
        <span>/</span>
        <span className="cursor-pointer text-zinc-600">料金</span>
        <span>/</span>
        <span className="font-semibold" style={{ color: color.hex }}>
          エンタープライズ
        </span>
      </nav>
    </Stage>
  );
}

export function PNavPagination({ color }: CV) {
  return (
    <Stage>
      <nav className="flex items-center gap-1">
        <span
          role="button"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-xs text-zinc-600"
        >
          ‹
        </span>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            role="button"
            className="flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-full border px-1.5 text-[11px] font-medium"
            style={{
              borderColor: n === 2 ? color.hex : "#e7e7eb",
              background: n === 2 ? color.hex : "#fff",
              color: n === 2 ? "#fff" : "#52525b",
            }}
          >
            {n}
          </span>
        ))}
        <span className="px-1 text-[10px] text-zinc-400">…</span>
        <span
          role="button"
          className="flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white px-1.5 text-[11px] text-zinc-600"
        >
          10
        </span>
        <span
          role="button"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-xs text-zinc-600"
        >
          ›
        </span>
      </nav>
    </Stage>
  );
}

/* ============================================================
   FEEDBACK
   ============================================================ */

export function PFeedbackToast({ color }: CV) {
  return (
    <Stage theme="soft">
      <div className="flex max-w-[300px] gap-2.5 rounded-xl border border-zinc-200 bg-white p-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,.18)]">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{ background: color.hex + "1a", color: color.hex }}
        >
          ✓
        </span>
        <div className="flex-1">
          <div className="text-xs font-semibold text-zinc-900">保存しました</div>
          <p className="mt-0.5 text-[10px] leading-snug text-zinc-600">変更が反映されました。</p>
        </div>
        <span className="cursor-pointer text-xs text-zinc-400">×</span>
      </div>
    </Stage>
  );
}

export function PFeedbackBanner({ color }: CV) {
  return (
    <Stage>
      <div
        className="flex w-full max-w-md items-center gap-2 border-b px-3 py-2"
        style={{ background: color.hex + "10", borderColor: color.hex + "33" }}
      >
        <span className="text-sm">🎉</span>
        <p className="flex-1 text-[11px] text-zinc-900">
          v2.0 をリリースしました。
          <span className="ml-1 font-semibold" style={{ color: color.hex }}>
            変更点を見る →
          </span>
        </p>
        <span className="cursor-pointer text-xs text-zinc-600">×</span>
      </div>
    </Stage>
  );
}

export function PFeedbackModal({ color }: CV) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-200/40 p-3">
      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[1px]" />
      <div className="relative w-full max-w-[280px] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,.35)]">
        <h3 className="text-sm font-semibold text-zinc-900">変更を保存しますか？</h3>
        <p className="mt-1.5 text-[11px] text-zinc-600">この操作は取り消せません。</p>
        <div className="mt-4 flex justify-end gap-2">
          <span
            role="button"
            className="cursor-pointer rounded-full border border-zinc-200 px-3 py-1 text-[11px] text-zinc-600"
          >
            キャンセル
          </span>
          <span
            role="button"
            className="cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold text-white"
            style={{ background: color.hex }}
          >
            保存する
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DISCLOSURE
   ============================================================ */

export function PDisclosureTooltip({ color }: CV) {
  return (
    <Stage>
      <div className="relative inline-flex items-center gap-2 text-xs text-zinc-700">
        <span>有料プランの内容</span>
        <span
          className="relative inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-zinc-100 text-[11px] font-bold text-zinc-600"
          style={{ background: color.hex + "1a", color: color.hex }}
        >
          ?
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[10px] text-white">
            月額1,200円から
          </span>
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-zinc-900" />
        </span>
      </div>
    </Stage>
  );
}

export function PDisclosureDropdown({ color }: CV) {
  return (
    <Stage>
      <div className="relative inline-block">
        <span
          role="button"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700"
        >
          メニュー <span className="rotate-180 text-[8px]">▾</span>
        </span>
        <ul className="absolute left-0 z-10 mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_18px_30px_-12px_rgba(0,0,0,.18)]">
          {[
            { l: "プロフィール", h: false },
            { l: "設定", h: true },
            { l: "ログアウト", h: false },
          ].map((it) => (
            <li
              key={it.l}
              className="cursor-pointer px-3 py-1.5 text-[11px]"
              style={{
                background: it.h ? color.hex + "1a" : undefined,
                color: it.h ? color.hex : "#52525b",
              }}
            >
              {it.l}
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

/* ============================================================
   DATA
   ============================================================ */

export function PDataBadge({ color }: CV) {
  return (
    <Stage>
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white"
          style={{ background: color.hex }}
        >
          12
        </span>
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: color.hex }}
        />
        <span
          className="inline-flex h-5 items-center rounded-full px-2 text-[11px] font-bold"
          style={{ background: color.hex + "26", color: color.hex }}
        >
          新着
        </span>
      </div>
    </Stage>
  );
}

export function PDataTag({ color }: CV) {
  return (
    <Stage>
      <div className="flex flex-wrap items-center gap-2">
        {["React", "Tailwind", "TypeScript"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full py-0.5 pl-2.5 pr-1 text-[10px] font-semibold"
            style={{ background: color.hex + "26", color: color.hex }}
          >
            {t}
            <span
              className="cursor-pointer rounded-full px-1.5 leading-none opacity-60 hover:opacity-100"
            >
              ×
            </span>
          </span>
        ))}
      </div>
    </Stage>
  );
}

export function PDataAvatar({ color }: CV) {
  const a = SAMPLE_IMG;
  return (
    <Stage theme="soft">
      <div className="flex items-center gap-2">
        {[
          { online: true },
          { online: true },
          { online: false },
        ].map((u, i) => (
          <div key={i} className="relative h-9 w-9">
            <img
              src={a}
              alt=""
              className="h-full w-full rounded-full border-2 border-white object-cover"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
              style={{ background: u.online ? color.hex : "#a1a1aa" }}
            />
          </div>
        ))}
      </div>
    </Stage>
  );
}

export function PDataTableRow({ color }: CV) {
  return (
    <Stage theme="soft">
      <table className="w-full max-w-[300px] border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="px-2 py-1.5 font-semibold">名前</th>
            <th className="px-2 py-1.5 font-semibold">権限</th>
          </tr>
        </thead>
        <tbody>
          {[
            { n: "田中", r: "Admin", sel: false },
            { n: "佐藤", r: "Member", sel: true },
            { n: "鈴木", r: "Member", sel: false },
          ].map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-100 text-zinc-900"
              style={{
                background: row.sel ? color.hex + "1a" : undefined,
                boxShadow: row.sel ? `inset 3px 0 0 ${color.hex}` : undefined,
              }}
            >
              <td className="px-2 py-1.5">{row.n}</td>
              <td className="px-2 py-1.5">{row.r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stage>
  );
}

export function PDataTimeline({ color }: CV) {
  const steps = [
    { d: "05/01", t: "注文受付", s: "done" },
    { d: "05/02", t: "発送準備中", s: "now" },
    { d: "05/04", t: "到着予定", s: "todo" },
  ];
  return (
    <Stage theme="soft">
      <ol className="relative m-0 max-w-[260px] list-none p-0 pl-7">
        <span
          aria-hidden
          className="absolute left-2.5 top-1.5 bottom-1.5 w-0.5"
          style={{ background: "#e4e4e7" }}
        />
        {steps.map((s, i) => {
          const dotStyle =
            s.s === "done"
              ? { background: color.hex, borderColor: color.hex }
              : s.s === "now"
              ? { background: "#fff", borderColor: color.hex, boxShadow: `0 0 0 4px ${color.hex}33` }
              : { background: "#fff", borderColor: "#d4d4d8" };
          return (
            <li key={i} className="relative pb-3">
              <span
                aria-hidden
                className="absolute -left-[24px] top-1.5 h-3 w-3 rounded-full border-2"
                style={dotStyle}
              />
              <time className="text-[10px] text-zinc-500">{s.d}</time>
              <h4 className="text-[11px] font-semibold text-zinc-900">{s.t}</h4>
            </li>
          );
        })}
      </ol>
    </Stage>
  );
}

/* ============================================================
   FORM (additional)
   ============================================================ */

export function PFormCheckbox({ color }: CV) {
  return (
    <Stage>
      <div className="space-y-2">
        {[
          { l: "同意します", checked: true },
          { l: "ニュースレター登録", checked: false },
          { l: "個人情報の利用に同意", checked: true },
        ].map((c) => (
          <label
            key={c.l}
            className="flex cursor-pointer select-none items-center gap-2 text-xs text-zinc-900"
          >
            <span
              className="flex h-4 w-4 items-center justify-center rounded-md border-2 text-[10px] font-bold text-white"
              style={{
                borderColor: c.checked ? color.hex : "#d4d4d8",
                background: c.checked ? color.hex : "#fff",
              }}
            >
              {c.checked ? "✓" : ""}
            </span>
            {c.l}
          </label>
        ))}
      </div>
    </Stage>
  );
}

export function PFormRadio({ color }: CV) {
  return (
    <Stage>
      <div className="space-y-2">
        {[
          { l: "個人プラン", checked: false },
          { l: "法人プラン", checked: true },
        ].map((r) => (
          <label
            key={r.l}
            className="flex cursor-pointer items-center gap-2 text-xs text-zinc-900"
          >
            <span
              className="relative h-4 w-4 rounded-full border-2"
              style={{
                borderColor: r.checked ? color.hex : "#d4d4d8",
                background: "#fff",
              }}
            >
              {r.checked && (
                <span
                  className="absolute inset-[2px] rounded-full"
                  style={{ background: color.hex }}
                />
              )}
            </span>
            {r.l}
          </label>
        ))}
      </div>
    </Stage>
  );
}

export function PFormSwitch({ color }: CV) {
  return (
    <Stage>
      <div className="flex items-center gap-4">
        {[true, false].map((on, i) => (
          <span
            key={i}
            className="relative inline-block h-6 w-11 rounded-full transition"
            style={{ background: on ? color.hex : "#d4d4d8" }}
          >
            <span
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              style={{
                left: on ? "calc(100% - 22px)" : "2px",
                transition: "left 0.2s",
              }}
            />
          </span>
        ))}
      </div>
    </Stage>
  );
}

/* ============================================================
   STATS — ring progress
   ============================================================ */

export function PStatsRingProgress({ color }: CV) {
  const value = 75;
  const r = 44;
  const C = 2 * Math.PI * r;
  const offset = C - (C * value) / 100;
  return (
    <Stage theme="soft">
      <svg viewBox="0 0 100 100" className="h-28 w-28">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e7e7eb" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color.hex}
          strokeWidth="8"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#0a0a0a"
        >
          {value}%
        </text>
      </svg>
    </Stage>
  );
}

/* ============================================================
   MOTION — small monochrome bento previews
   ============================================================ */

function MotionStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-zinc-50 p-4">
      {children}
    </div>
  );
}

export function PMotionDigitFlip({ color }: CV) {
  const [n, setN] = useStateOnce(7);
  useIntervalSafe(() => setN((v) => (v + 1) % 10), 1200);
  return (
    <MotionStage>
      <div
        className="inline-flex h-24 w-20 items-center justify-center rounded-2xl bg-zinc-100 font-mono text-6xl font-bold"
        style={{
          color: color.hex,
          animation: "digitFlipY 1.2s ease-in-out infinite",
          perspective: 600,
        }}
      >
        {n}
      </div>
    </MotionStage>
  );
}

export function PMotionDigitRoll({ color }: CV) {
  return (
    <MotionStage>
      <div className="h-20 w-16 overflow-hidden rounded-2xl bg-zinc-100">
        <div className="flex flex-col" style={{ animation: "digitRoll 4s steps(1) infinite" }}>
          {[0, 1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className="flex h-20 items-center justify-center font-mono text-5xl font-bold"
              style={{ color: color.hex }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </MotionStage>
  );
}

export function PMotionLetterFall({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 2500);
  return (
    <MotionStage>
      <h2
        className="inline-flex text-4xl font-extrabold tracking-wider"
        style={{ color: color.hex }}
      >
        {"LOADING".split("").map((c, i) => (
          <span
            key={`${k}-${i}`}
            className="inline-block opacity-0"
            style={{
              animation: `letterFall .7s cubic-bezier(.6,.05,.18,1.2) ${i * 0.08}s forwards`,
            }}
          >
            {c}
          </span>
        ))}
      </h2>
    </MotionStage>
  );
}

export function PMotionLetterBlurIn({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 2800);
  return (
    <MotionStage>
      <h2 className="inline-flex text-4xl font-bold tracking-wide" style={{ color: color.hex }}>
        {"FOCUS".split("").map((c, i) => (
          <span
            key={`${k}-${i}`}
            className="inline-block"
            style={{
              filter: "blur(14px)",
              opacity: 0,
              transform: "scale(1.15)",
              animation: `letterBlurIn .9s ease-out ${i * 0.15}s forwards`,
            }}
          >
            {c}
          </span>
        ))}
      </h2>
    </MotionStage>
  );
}

export function PMotionLetterScramble({ color }: CV) {
  const target = "DECODING";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%";
  const [text, setText] = useStateOnce(target);
  const [lockedAt, setLocked] = useStateOnce(0);

  useEffectOnce(() => {
    let tick = 0;
    const lockStep = 4;
    let locked = 0;
    let lastReset = Date.now();
    const id = setInterval(() => {
      tick++;
      const elapsed = Date.now() - lastReset;
      if (elapsed > 3000) {
        locked = 0;
        lastReset = Date.now();
      } else if (tick % lockStep === 0 && locked < target.length) {
        locked++;
      }
      setLocked(locked);
      setText(
        target
          .split("")
          .map((c, i) => (i < locked ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("")
      );
    }, 50);
    return () => clearInterval(id);
  });

  return (
    <MotionStage>
      <span className="font-mono text-3xl font-bold tracking-wider" style={{ color: color.hex }}>
        {text}
      </span>
    </MotionStage>
  );
}

export function PMotionShapeMorph({ color }: CV) {
  return (
    <MotionStage>
      <div
        className="h-[72px] w-[72px]"
        style={{ background: color.hex, animation: "shapeMorph 4s ease-in-out infinite" }}
      />
    </MotionStage>
  );
}

export function PMotionShapeCycle({ color }: CV) {
  return (
    <MotionStage>
      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100">
        {["+", "×", "○", "□"].map((s, i) => (
          <span
            key={s}
            className="absolute text-2xl font-bold opacity-0"
            style={{
              color: color.hex,
              animation: `shapeSymbolFade 4s linear ${i}s infinite`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </MotionStage>
  );
}

export function PMotionBookmarkFill({ color }: CV) {
  const [on, setOn] = useStateOnce(true);
  useIntervalSafe(() => setOn((v) => !v), 2200);
  return (
    <MotionStage>
      <button
        onClick={() => setOn((v) => !v)}
        className="relative h-12 w-10 cursor-pointer bg-transparent"
        aria-pressed={on}
      >
        <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full">
          <path d="M6 3h12v18l-6-4-6 4z" fill="none" stroke={color.hex} strokeWidth="2" />
        </svg>
        {on && (
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 h-full w-full"
            key={String(on)}
            style={{ animation: "bookmarkFill 1.2s ease-out forwards" }}
          >
            <path d="M6 3h12v18l-6-4-6 4z" fill={color.hex} />
          </svg>
        )}
      </button>
    </MotionStage>
  );
}

export function PMotionHeartFill({ color }: CV) {
  const [on, setOn] = useStateOnce(false);
  useIntervalSafe(() => setOn((v) => !v), 1800);
  return (
    <MotionStage>
      <button onClick={() => setOn((v) => !v)} className="cursor-pointer bg-transparent p-0">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10"
          style={{
            animation: on ? "heartPopBeat .8s cubic-bezier(.4,1.6,.6,.9)" : undefined,
          }}
          key={String(on)}
        >
          <path
            d="M12 21s-7-4.5-9-9c-1-3 1-7 5-7 2 0 3 1 4 2 1-1 2-2 4-2 4 0 6 4 5 7-2 4.5-9 9-9 9z"
            fill={on ? color.hex : "none"}
            stroke={color.hex}
            strokeWidth="2"
          />
        </svg>
      </button>
    </MotionStage>
  );
}

export function PMotionCheckDraw({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 1800);
  return (
    <MotionStage>
      <svg viewBox="0 0 32 32" className="h-16 w-16" key={k}>
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="6"
          style={{
            fill: color.hex,
            opacity: 0,
            animation: "checkBoxFade .3s ease .35s forwards",
          }}
        />
        <path
          d="M9 17 L14 22 L24 11"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 24,
            strokeDashoffset: 24,
            animation: "checkDraw .55s cubic-bezier(.7,.05,.3,1) .35s forwards",
          }}
        />
      </svg>
    </MotionStage>
  );
}

export function PMotionProgressFill({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 3200);
  return (
    <MotionStage>
      <div className="h-2 w-56 overflow-hidden rounded-full bg-zinc-200">
        <span
          key={k}
          className="block h-full rounded-full"
          style={{ background: color.hex, animation: "progressFill 2.4s ease-out forwards", width: 0 }}
        />
      </div>
    </MotionStage>
  );
}

export function PMotionRingFill({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 2800);
  return (
    <MotionStage>
      <svg viewBox="0 0 100 100" className="h-24 w-24" key={k}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e7e7eb" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color.hex}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="282"
          transform="rotate(-90 50 50)"
          style={{ animation: "ringFill 2s ease-out forwards" }}
        />
      </svg>
    </MotionStage>
  );
}

export function PMotionTypewriter({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 3500);
  const text = "Generating…";
  return (
    <MotionStage>
      <div className="inline-flex items-baseline font-mono text-lg" style={{ color: color.hex }} key={k}>
        <span
          className="inline-block overflow-hidden whitespace-nowrap"
          style={{ width: 0, animation: `typewriterReveal 2.4s steps(${text.length}) forwards` }}
        >
          {text}
        </span>
        <span className="ml-0.5 inline-block" style={{ animation: "typewriterCaret 1s steps(2) infinite" }}>
          |
        </span>
      </div>
    </MotionStage>
  );
}

export function PMotionLineReveal({ color }: CV) {
  const [k, setK] = useStateOnce(0);
  useIntervalSafe(() => setK((v) => v + 1), 3200);
  const lines = ["あなたの仕事を、", "最短に。"];
  return (
    <MotionStage>
      <h2 className="text-2xl font-extrabold leading-tight" style={{ color: color.hex }} key={k}>
        {lines.map((l, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className="inline-block translate-y-full"
              style={{ animation: `lineRevealUp .8s cubic-bezier(.6,.05,.18,1.2) ${i * 0.25}s forwards` }}
            >
              {l}
            </span>
          </span>
        ))}
      </h2>
    </MotionStage>
  );
}

export function PMotionCardFlip({ color }: CV) {
  const [flipped, setFlipped] = useStateOnce(false);
  useIntervalSafe(() => setFlipped((v) => !v), 2800);
  return (
    <MotionStage>
      <div className="h-24 w-40 [perspective:800px]">
        <div
          className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl text-lg font-bold text-white [backface-visibility:hidden]"
            style={{ background: color.hex }}
          >
            FRONT
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-zinc-900 text-lg font-bold text-white [transform:rotateY(180deg)] [backface-visibility:hidden]"
          >
            BACK
          </div>
        </div>
      </div>
    </MotionStage>
  );
}

export function PCardPricing({ color }: CV) {
  return (
    <Stage theme="soft">
      <article
        className="relative w-full max-w-[240px] rounded-2xl border-2 bg-white p-5 shadow-[0_22px_50px_-20px_rgba(0,0,0,.18)]"
        style={{ borderColor: color.hex }}
      >
        <span
          className="absolute -top-2.5 right-4 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
          style={{ background: color.hex }}
        >
          人気
        </span>
        <h3 className="text-base font-bold text-zinc-900">Pro</h3>
        <div className="mt-1 mb-3 flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-zinc-900">¥1,200</span>
          <span className="text-[10px] text-zinc-500">/月</span>
        </div>
        <ul className="m-0 mb-3 list-none p-0">
          {["無制限プロジェクト", "優先サポート", "API"].map((f) => (
            <li key={f} className="border-t border-zinc-100 py-1 text-[10px] text-zinc-600">
              ✓ {f}
            </li>
          ))}
        </ul>
        <span
          role="button"
          className="block w-full cursor-pointer rounded-full py-1.5 text-center text-[10px] font-semibold text-white"
          style={{ background: color.hex }}
        >
          このプランで始める
        </span>
      </article>
    </Stage>
  );
}

export function PCardTestimonial({ color }: CV) {
  return (
    <Stage theme="soft">
      <article className="relative w-full max-w-[280px] rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <span
          aria-hidden
          className="absolute left-3 top-0 font-serif leading-none"
          style={{ color: color.hex + "33", fontSize: 56 }}
        >
          &ldquo;
        </span>
        <p className="relative pt-2 text-xs leading-relaxed text-zinc-900">
          導入してから業務時間が30%減りました。
        </p>
        <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 pt-2.5">
          <div
            className="h-8 w-8 rounded-full"
            style={{ background: `linear-gradient(135deg, ${color.hex}, #5b8cff)` }}
          />
          <div>
            <div className="text-[11px] font-semibold text-zinc-900">山田 太郎</div>
            <div className="text-[9px] text-zinc-500">株式会社XYZ / マネージャー</div>
          </div>
        </div>
      </article>
    </Stage>
  );
}

export function PBgMeshSoft({ color }: CV) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        backgroundColor: "#fafafa",
        backgroundImage: `radial-gradient(at 15% 20%, ${color.hex}55, transparent 50%), radial-gradient(at 80% 30%, #3b82f655, transparent 50%), radial-gradient(at 60% 80%, ${color.hex}33, transparent 50%), radial-gradient(at 25% 75%, #c084fc44, transparent 50%)`,
        backgroundSize: "200% 200%",
        animation: "meshDrift 18s ease-in-out infinite",
      }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-700">mesh</div>
        <div className="mt-1 text-lg font-semibold text-zinc-900">Background</div>
      </div>
    </div>
  );
}

export function PHoverTilt3D({ color }: CV) {
  return (
    <Stage theme="soft">
      <div
        className="group relative w-56 overflow-hidden rounded-2xl p-6 text-white shadow-[0_12px_24px_-10px_rgba(0,0,0,.4)] transition duration-500 hover:[transform:perspective(800px)_rotateX(8deg)_rotateY(-8deg)_translateZ(20px)]"
        style={{
          background: `linear-gradient(135deg, ${color.hex}, #0a0a14)`,
          perspective: 1200,
          transformStyle: "preserve-3d",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[20%] -translate-x-full transition duration-700 ease-out group-hover:translate-x-[60%]"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.18) 50%, transparent 70%)",
          }}
        />
        <h3 className="relative text-base font-bold">Premium</h3>
        <p className="relative mt-1 text-[11px] text-white/80">ホバーで傾きと光のスイープ。</p>
      </div>
    </Stage>
  );
}

export function PTextChromeReflective({ color }: CV) {
  return (
    <Stage theme="soft">
      <h2
        className="bg-clip-text text-5xl font-black tracking-tighter text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, #c0c0c0, #fff 40%, ${color.hex} 50%, #fff 60%, #c0c0c0)`,
          backgroundSize: "200% 100%",
          animation: "chromeShimmer 6s linear infinite",
        }}
      >
        REFLECT
      </h2>
    </Stage>
  );
}

/* tiny preview helpers (avoid duplicating imports - re-export hooks here lazily) */
import { useEffect as _ue, useState as _us } from "react";
function useStateOnce<T>(init: T): [T, (v: T | ((prev: T) => T)) => void] {
  return _us(init) as any;
}
function useIntervalSafe(fn: () => void, ms: number) {
  _ue(() => {
    const id = setInterval(fn, ms);
    return () => clearInterval(id);
  }, [fn, ms]);
}
function useEffectOnce(fn: () => void | (() => void)) {
  _ue(() => fn(), []);
}

/* shimmer keyframe used by ctaShimmer preview - included once via this style block */
function ShimmerKeyframes() {
  return null;
}

export const EXTRA_PREVIEW_FNS: Record<string, (v: CV) => JSX.Element> = {
  "cta-glow": PCtaGlow,
  "cta-gradient": PCtaGradient,
  "cta-outline": PCtaOutline,
  "cta-shimmer": PCtaShimmer,
  "cta-arrow-shift": PCtaArrow,
  "cta-3d": PCta3d,
  "card-glass": PCardGlass,
  "card-lift": PCardLift,
  "card-border-glow": PCardBorderGlow,
  "card-tilt": PCardTilt,
  "card-numbered": PCardNumbered,
  "card-mystical": PCardMystical,
  "card-gold-frame": PCardGoldFrame,
  "card-night-sky": PCardNightSky,
  "card-glow-edge": PCardGlowEdge,
  "card-crystal-ball": PCardCrystalBall,
  "card-moon-phases": PCardMoonPhases,
  "card-zodiac-wheel": PCardZodiacWheel,
  "card-runes": PCardRunes,
  "card-tarot-flow": PCardTarotFlow,
  "card-tarot-photo": PCardTarotPhoto,
  "card-tarot-photo-flow": PCardTarotPhotoFlow,
  "card-photo-overlay": PCardPhotoOverlay,
  "card-photo-polaroid": PCardPhotoPolaroid,
  "card-photo-magazine": PCardPhotoMagazine,
  "card-photo-vintage": PCardPhotoVintage,
  "card-photo-duotone": PCardPhotoDuotone,
  "card-photo-ornate-frame": PCardPhotoOrnateFrame,
  "hover-underline": PHoverUnderline,
  "hover-glow": PHoverGlow,
  "hover-image-zoom": PHoverImageZoom,
  "hover-shift-bg": PHoverShiftBg,
  "bg-grid": PBgGrid,
  "bg-dots": PBgDots,
  "bg-conic-gradient": PBgConic,
  "bg-aurora": PBgAurora,
  "bg-noise": PBgNoise,
  "text-gradient": PTextGradient,
  "text-marker": PTextMarker,
  "text-outline": PTextOutline,
  "text-shadow-pop": PTextShadowPop,
  "svg-wave": PSvgWave,
  "svg-blob": PSvgBlob,
  "svg-zigzag": PSvgZigzag,
  "stat-big-number": PStatBigNumber,
  "form-floating-label": PFormFloating,
  "form-search": PFormSearch,
  "faq-plus": PFaqPlus,
  "empty-state": PEmptyState,
  "error-state": PErrorState,
  "hero-split": PHeroSplit,
  "hero-centered": PHeroCentered,
  "hero-minimal": PHeroMinimal,
  "hero-gradient-bg": PHeroGradient,
  "hero-news-strip": PHeroNewsStrip,
  "hero-with-stats": PHeroStats,
  "hero-mockup": PHeroMockup,
  "hero-diagonal": PHeroDiagonal,
  "hero-video-bg": PHeroVideoBg,
  "nav-horizontal": PNavHorizontal,
  "nav-tabs": PNavTabs,
  "nav-breadcrumb": PNavBreadcrumb,
  "nav-pagination": PNavPagination,
  "feedback-toast": PFeedbackToast,
  "feedback-banner": PFeedbackBanner,
  "feedback-modal": PFeedbackModal,
  "disclosure-tooltip": PDisclosureTooltip,
  "disclosure-dropdown": PDisclosureDropdown,
  "data-badge": PDataBadge,
  "data-tag": PDataTag,
  "data-avatar": PDataAvatar,
  "data-table-row": PDataTableRow,
  "data-timeline": PDataTimeline,
  "form-checkbox": PFormCheckbox,
  "form-radio": PFormRadio,
  "form-switch": PFormSwitch,
  "stats-ring-progress": PStatsRingProgress,
  "motion-digit-flip": PMotionDigitFlip,
  "motion-digit-roll": PMotionDigitRoll,
  "motion-letter-fall": PMotionLetterFall,
  "motion-letter-blur-in": PMotionLetterBlurIn,
  "motion-letter-scramble": PMotionLetterScramble,
  "motion-shape-morph": PMotionShapeMorph,
  "motion-shape-cycle": PMotionShapeCycle,
  "motion-bookmark-fill": PMotionBookmarkFill,
  "motion-heart-fill": PMotionHeartFill,
  "motion-check-draw": PMotionCheckDraw,
  "motion-progress-fill": PMotionProgressFill,
  "motion-ring-fill": PMotionRingFill,
  "motion-text-typewriter": PMotionTypewriter,
  "motion-text-line-reveal": PMotionLineReveal,
  "motion-card-flip": PMotionCardFlip,
  "card-pricing": PCardPricing,
  "card-testimonial": PCardTestimonial,
  "bg-mesh-soft": PBgMeshSoft,
  "hover-tilt-3d-deep": PHoverTilt3D,
  "text-chrome-shimmer": PTextChromeReflective,
  "icon-lightbulb": PIconLightbulb,
  "icon-gears": PIconGears,
  "icon-rocket": PIconRocket,
  "icon-fireworks": PIconFireworks,
  "icon-sparkles": PIconSparkles,
  "icon-lock-unlock": PIconLockUnlock,
  "icon-heart-burst": PIconHeartBurst,
  "icon-wifi-radiate": PIconWifi,
  "icon-paper-plane": PIconPaperPlane,
  "icon-bell-ring": PIconBell,
  "icon-clock-tick": PIconClock,
  "icon-typewriter": PIconTypewriter,
  "font-glitch": PFontGlitch,
  "font-3d-extrude": PFont3D,
  "font-long-shadow": PFontLongShadow,
  "font-neon": PFontNeon,
  "font-letter-wave": PFontWave,
  "font-stroke-to-fill": PFontStrokeFill,
  "font-gradient-anim": PFontGradientAnim,
  "font-emboss": PFontEmboss,
  "font-stripe": PFontStripe,
  "font-stretch-tall": PFontStretch,
  "font-letter-fade-in": PFontReveal,
  "font-handwriting": PFontHandwriting,
  "font-print-cmyk": PFontPrintCmyk,
  "font-mixed-size": PFontMixedSize,
  "font-mirror": PFontReverse,
  "font-mystic-shimmer": PFontMysticShimmer,
  "font-tarot-frame": PFontTarotFrame,
  "font-crystal-ball": PFontCrystalBall,
  "font-moon-glow": PFontMoonGlow,
  "font-constellation": PFontConstellation,
  "font-mist-fade": PFontMistFade,
};
