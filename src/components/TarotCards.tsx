"use client";

/* 8 tarot cards as inline SVG.
   Each is a 100×140 viewBox with a gold ornate frame, central illustration,
   roman numeral, and title. Designed to be embedded as 180×260 px in flows. */

import type { CSSProperties } from "react";

const GOLD = "#d4af37";
const GOLD_DEEP = "#a07d1d";
const CREAM = "#e9d6a3";
const CARD_BG = "#1a0e2e";

function CardFrame({
  numeral,
  title,
  children,
  variant = "violet",
}: {
  numeral: string;
  title: string;
  children: React.ReactNode;
  variant?: "violet" | "blue" | "rose" | "amber" | "emerald" | "indigo";
}) {
  const accents: Record<string, string> = {
    violet: "#7c5cff",
    blue: "#3b82f6",
    rose: "#f43f5e",
    amber: "#f59e0b",
    emerald: "#10b981",
    indigo: "#4338ca",
  };
  const accent = accents[variant] ?? "#7c5cff";
  return (
    <svg viewBox="0 0 100 140" className="block h-full w-full">
      <defs>
        <linearGradient id={`bg-${variant}-${title}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={CARD_BG} />
          <stop offset=".5" stopColor="#0e0822" />
          <stop offset="1" stopColor="#070314" />
        </linearGradient>
        <radialGradient id={`halo-${variant}-${title}`} cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor={accent} stopOpacity=".35" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      {/* card body */}
      <rect x="0" y="0" width="100" height="140" rx="6" fill={`url(#bg-${variant}-${title})`} />
      <rect x="0" y="0" width="100" height="140" rx="6" fill={`url(#halo-${variant}-${title})`} />
      {/* outer frame */}
      <rect x="3" y="3" width="94" height="134" rx="4" fill="none" stroke={GOLD} strokeWidth="0.7" opacity=".95" />
      <rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke={GOLD} strokeWidth="0.3" opacity=".55" />
      {/* roman numeral */}
      <text x="50" y="17" textAnchor="middle" fontSize="6.5" fill={GOLD} fontFamily="serif" letterSpacing="1">
        {numeral}
      </text>
      <line x1="20" y1="22" x2="80" y2="22" stroke={GOLD} strokeWidth="0.3" opacity=".5" />
      {/* center illustration */}
      <g transform="translate(0 0)">{children}</g>
      {/* title */}
      <line x1="20" y1="118" x2="80" y2="118" stroke={GOLD} strokeWidth="0.3" opacity=".5" />
      <text x="50" y="128" textAnchor="middle" fontSize="6" fill={CREAM} fontFamily="serif" letterSpacing="1.4" fontStyle="italic">
        {title}
      </text>
      {/* corner ornaments */}
      <g fill={GOLD} opacity=".7">
        <circle cx="9" cy="9" r="0.8" />
        <circle cx="91" cy="9" r="0.8" />
        <circle cx="9" cy="131" r="0.8" />
        <circle cx="91" cy="131" r="0.8" />
      </g>
    </svg>
  );
}

/* === Individual cards === */

export function TheSun(props: { variant?: any }) {
  return (
    <CardFrame numeral="XIX" title="THE SUN" variant={props.variant ?? "amber"}>
      <g transform="translate(50 65)">
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-32"
            stroke={GOLD}
            strokeWidth={i % 2 === 0 ? "0.7" : "0.4"}
            transform={`rotate(${i * 22.5})`}
            opacity={i % 2 === 0 ? 0.95 : 0.5}
          />
        ))}
        <circle r="16" fill={GOLD} />
        <circle r="16" fill="none" stroke={GOLD_DEEP} strokeWidth="0.4" />
        <circle cx="-4" cy="-3" r="1.2" fill={CARD_BG} />
        <circle cx="4" cy="-3" r="1.2" fill={CARD_BG} />
        <path d="M -4 4 Q 0 7 4 4" stroke={CARD_BG} strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </CardFrame>
  );
}

export function TheMoon(props: { variant?: any }) {
  return (
    <CardFrame numeral="XVIII" title="THE MOON" variant={props.variant ?? "indigo"}>
      <g transform="translate(50 64)">
        {/* moon */}
        <circle cx="0" cy="0" r="22" fill="none" stroke={GOLD} strokeWidth="0.4" opacity=".4" />
        <circle cx="0" cy="0" r="18" fill={CREAM} opacity=".85" />
        <circle cx="6" cy="-2" r="18" fill={CARD_BG} />
        <circle cx="-3" cy="-4" r="1.4" fill={GOLD} opacity=".8" />
        <circle cx="-7" cy="2" r="1" fill={GOLD} opacity=".6" />
        <circle cx="-2" cy="6" r="0.8" fill={GOLD} opacity=".5" />
        {/* drops below */}
        <text x="0" y="40" textAnchor="middle" fontSize="9" fill={GOLD} opacity=".7">☽</text>
      </g>
      {/* small stars around */}
      <text x="22" y="40" fontSize="4" fill={GOLD} opacity=".6">✦</text>
      <text x="76" y="44" fontSize="3.5" fill={GOLD} opacity=".5">✦</text>
      <text x="22" y="98" fontSize="3" fill={GOLD} opacity=".4">✦</text>
      <text x="76" y="100" fontSize="4" fill={GOLD} opacity=".6">✦</text>
    </CardFrame>
  );
}

export function TheStar(props: { variant?: any }) {
  return (
    <CardFrame numeral="XVII" title="THE STAR" variant={props.variant ?? "blue"}>
      <g transform="translate(50 60)">
        {/* big 8-point star */}
        <path
          d="M 0 -22 L 4 -4 L 22 0 L 4 4 L 0 22 L -4 4 L -22 0 L -4 -4 Z"
          fill={GOLD}
        />
        <path
          d="M 0 -16 L 3 -3 L 16 0 L 3 3 L 0 16 L -3 3 L -16 0 L -3 -3 Z"
          fill={CREAM}
          opacity=".8"
        />
      </g>
      {/* small surrounding stars */}
      <text x="20" y="44" fontSize="6" fill={GOLD}>✦</text>
      <text x="76" y="48" fontSize="5" fill={GOLD} opacity=".7">✦</text>
      <text x="22" y="100" fontSize="4" fill={GOLD} opacity=".6">✦</text>
      <text x="78" y="102" fontSize="5" fill={GOLD} opacity=".75">✦</text>
      <text x="50" y="100" textAnchor="middle" fontSize="9" fill={CREAM} opacity=".55">~</text>
    </CardFrame>
  );
}

export function TheMagician(props: { variant?: any }) {
  return (
    <CardFrame numeral="I" title="THE MAGICIAN" variant={props.variant ?? "violet"}>
      <g transform="translate(50 60)">
        {/* infinity */}
        <path
          d="M -14 0 a 7 7 0 1 0 14 0 a 7 7 0 1 1 14 0 a 7 7 0 1 1 -14 0 a 7 7 0 1 0 -14 0 z"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.2"
        />
        {/* central wand */}
        <line x1="0" y1="-18" x2="0" y2="22" stroke={GOLD} strokeWidth="1" />
        <circle cx="0" cy="-18" r="2" fill={GOLD} />
        <circle cx="0" cy="22" r="2" fill={GOLD} />
        {/* 4 elemental symbols around */}
        <text x="-22" y="32" fontSize="7" fill={GOLD} fontFamily="serif">✧</text>
        <text x="22" y="32" fontSize="7" fill={GOLD} fontFamily="serif">✦</text>
        <text x="-22" y="-22" fontSize="7" fill={GOLD} fontFamily="serif">☆</text>
        <text x="22" y="-22" fontSize="7" fill={GOLD} fontFamily="serif">★</text>
      </g>
    </CardFrame>
  );
}

export function TheLovers(props: { variant?: any }) {
  return (
    <CardFrame numeral="VI" title="THE LOVERS" variant={props.variant ?? "rose"}>
      <g transform="translate(50 64)">
        {/* twin hearts */}
        <path
          d="M -10 -2 c -4 -8 -14 -2 -10 5 c 1 4 10 10 10 10 c 0 0 9 -6 10 -10 c 4 -7 -6 -13 -10 -5 z"
          fill="#e0526a"
          opacity=".95"
        />
        <path
          d="M 10 -2 c -4 -8 -14 -2 -10 5 c 1 4 10 10 10 10 c 0 0 9 -6 10 -10 c 4 -7 -6 -13 -10 -5 z"
          fill="#e0526a"
          opacity=".7"
        />
        {/* halo */}
        <circle r="26" fill="none" stroke={GOLD} strokeWidth="0.4" opacity=".4" />
        {/* small angels icons */}
        <circle cx="0" cy="-22" r="2.5" fill={GOLD} />
        <circle cx="0" cy="-22" r="3.5" fill="none" stroke={GOLD} strokeWidth="0.3" opacity=".5" />
      </g>
    </CardFrame>
  );
}

export function TheWheel(props: { variant?: any }) {
  return (
    <CardFrame numeral="X" title="WHEEL OF FORTUNE" variant={props.variant ?? "emerald"}>
      <g transform="translate(50 65)">
        <circle r="22" fill="none" stroke={GOLD} strokeWidth="0.7" />
        <circle r="14" fill="none" stroke={GOLD} strokeWidth="0.5" opacity=".7" />
        <circle r="6" fill={GOLD} />
        {/* spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <line
            key={d}
            x1="0"
            y1="0"
            x2="0"
            y2="-22"
            stroke={GOLD}
            strokeWidth="0.6"
            transform={`rotate(${d})`}
          />
        ))}
        {/* 4 corner symbols */}
        <text x="-24" y="-18" fontSize="5" fill={GOLD} opacity=".7">♉</text>
        <text x="20" y="-18" fontSize="5" fill={GOLD} opacity=".7">♌</text>
        <text x="-24" y="30" fontSize="5" fill={GOLD} opacity=".7">♏</text>
        <text x="20" y="30" fontSize="5" fill={GOLD} opacity=".7">♒</text>
      </g>
    </CardFrame>
  );
}

export function TheEmpress(props: { variant?: any }) {
  return (
    <CardFrame numeral="III" title="THE EMPRESS" variant={props.variant ?? "rose"}>
      <g transform="translate(50 60)">
        {/* throne / crown */}
        <path d="M -18 -22 L -10 -28 L 0 -22 L 10 -28 L 18 -22 L 18 -16 L -18 -16 Z" fill={GOLD} opacity=".9" />
        {/* face/figure */}
        <ellipse cx="0" cy="-2" rx="11" ry="14" fill={CREAM} opacity=".82" />
        <circle cx="-3" cy="-4" r="1" fill={CARD_BG} />
        <circle cx="3" cy="-4" r="1" fill={CARD_BG} />
        <path d="M -3 2 Q 0 4 3 2" stroke={CARD_BG} strokeWidth="0.6" fill="none" />
        {/* body / dress */}
        <path d="M -16 28 L -10 12 L 10 12 L 16 28 Z" fill={GOLD} opacity=".85" />
        {/* heart */}
        <text x="0" y="24" textAnchor="middle" fontSize="6" fill="#e0526a">♥</text>
      </g>
    </CardFrame>
  );
}

export function TheFortuneTeller(props: { variant?: any }) {
  // Minea-inspired hooded fortune teller with crystal ball
  return (
    <CardFrame numeral="○" title="THE FORTUNE TELLER" variant={props.variant ?? "violet"}>
      <g transform="translate(50 62)">
        {/* hood / cloak */}
        <path
          d="M -22 28 Q -22 -8 0 -22 Q 22 -8 22 28 Z"
          fill="#3a1d6b"
          stroke={GOLD}
          strokeWidth="0.6"
          opacity=".95"
        />
        {/* hood opening (face) - oval */}
        <ellipse cx="0" cy="-2" rx="9" ry="12" fill="#1a0e2e" />
        {/* eyes glowing */}
        <circle cx="-3" cy="-3" r="0.9" fill={GOLD} />
        <circle cx="3" cy="-3" r="0.9" fill={GOLD} />
        {/* crystal ball below */}
        <ellipse cx="0" cy="22" rx="9" ry="2" fill="rgba(0,0,0,.6)" />
        <circle cx="0" cy="16" r="6" fill="url(#mineaCrystal)" />
        <ellipse cx="-2" cy="14" rx="2" ry="1" fill="rgba(255,255,255,.6)" />
        {/* gold trim on cloak */}
        <line x1="-22" y1="28" x2="22" y2="28" stroke={GOLD} strokeWidth="0.5" />
      </g>
      <defs>
        <radialGradient id="mineaCrystal" cx="35%" cy="30%">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#1a0033" />
        </radialGradient>
      </defs>
      {/* surrounding stars */}
      <text x="14" y="42" fontSize="4" fill={GOLD} opacity=".6">✦</text>
      <text x="84" y="42" fontSize="3" fill={GOLD} opacity=".5">✦</text>
      <text x="12" y="100" fontSize="3" fill={GOLD} opacity=".5">✦</text>
      <text x="84" y="102" fontSize="4" fill={GOLD} opacity=".7">✦</text>
    </CardFrame>
  );
}

export function TheTower(props: { variant?: any }) {
  return (
    <CardFrame numeral="XVI" title="THE TOWER" variant={props.variant ?? "rose"}>
      <g transform="translate(50 70)">
        {/* tower base */}
        <rect x="-10" y="-10" width="20" height="32" fill={GOLD} opacity=".85" />
        <rect x="-12" y="-14" width="24" height="6" fill={GOLD} />
        {/* windows */}
        <rect x="-3" y="-4" width="6" height="6" fill={CARD_BG} />
        <rect x="-3" y="6" width="6" height="6" fill={CARD_BG} />
        {/* lightning */}
        <path d="M -2 -38 L -8 -16 L -2 -16 L -10 4 L 0 -10 L -4 -10 L 4 -34 Z" fill={GOLD} opacity=".95" />
      </g>
      <text x="22" y="44" fontSize="3" fill={GOLD} opacity=".6">✦</text>
      <text x="76" y="44" fontSize="3" fill={GOLD} opacity=".6">✦</text>
    </CardFrame>
  );
}

/* === Tarot card row === */

const CARDS = [
  { Comp: TheSun, variant: "amber" },
  { Comp: TheMoon, variant: "indigo" },
  { Comp: TheStar, variant: "blue" },
  { Comp: TheMagician, variant: "violet" },
  { Comp: TheFortuneTeller, variant: "violet" },
  { Comp: TheLovers, variant: "rose" },
  { Comp: TheWheel, variant: "emerald" },
  { Comp: TheEmpress, variant: "rose" },
  { Comp: TheTower, variant: "violet" },
] as const;

/* ===========================================================
   Photo-embedded tarot cards
   =========================================================== */

export type TarotPhoto = {
  src: string;
  alt?: string;
  numeral: string;
  title: string;
  caption?: string;
};

/* 5 stable Unsplash photo IDs for mystical scenes */
export const SAMPLE_PHOTOS: TarotPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=480&auto=format&fit=crop&q=70",
    alt: "Crystal ball",
    numeral: "○",
    title: "DIVINATION",
  },
  {
    src: "https://images.unsplash.com/photo-1532978879514-6cb0a6f5ee37?w=480&auto=format&fit=crop&q=70",
    alt: "Stars in night sky",
    numeral: "XVII",
    title: "THE STAR",
  },
  {
    src: "https://images.unsplash.com/photo-1532009877282-3340270e0529?w=480&auto=format&fit=crop&q=70",
    alt: "Moon",
    numeral: "XVIII",
    title: "THE MOON",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=480&auto=format&fit=crop&q=70",
    alt: "Hands holding light",
    numeral: "I",
    title: "THE MAGICIAN",
  },
  {
    src: "https://images.unsplash.com/photo-1543551112-69c4c4d9e3a4?w=480&auto=format&fit=crop&q=70",
    alt: "Candle",
    numeral: "IX",
    title: "THE HERMIT",
  },
];

/* Reusable photo-embedded tarot frame.
   - 4:6 aspect (180×260)
   - Outer gold border (2 layers)
   - Top: roman numeral
   - Center: photo with vignette + subtle warm filter
   - Bottom: title in serif italic */
export function TarotPhotoCard({
  src,
  alt = "",
  numeral,
  title,
  accent = GOLD,
  width = 180,
}: {
  src: string;
  alt?: string;
  numeral: string;
  title: string;
  accent?: string;
  width?: number;
}) {
  const height = Math.round((width * 260) / 180);
  return (
    <div
      className="relative overflow-hidden rounded-[14px]"
      style={{
        width,
        height,
        background: `linear-gradient(180deg, #1a0e2e, #07031a)`,
        border: `1px solid ${accent}`,
        boxShadow: `inset 0 0 0 3px ${CARD_BG}, inset 0 0 0 4px ${accent}80, 0 18px 40px -16px ${accent}73, 0 6px 12px rgba(0,0,0,.5)`,
      }}
    >
      {/* numeral header */}
      <div
        className="relative pt-2 text-center"
        style={{
          color: accent,
          fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
          letterSpacing: "0.18em",
          fontSize: 11,
        }}
      >
        {numeral}
      </div>
      {/* divider */}
      <div className="mx-5 my-1 h-px" style={{ background: `${accent}66` }} />
      {/* photo area */}
      <div
        className="relative mx-3 overflow-hidden rounded-[6px]"
        style={{ height: height - 64 }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            filter: "saturate(.85) contrast(1.05) brightness(.9)",
          }}
        />
        {/* duotone tint */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color"
          style={{
            background: `linear-gradient(180deg, ${accent}33, transparent 60%, ${accent}22)`,
          }}
        />
        {/* vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            boxShadow: `inset 0 -30px 50px -10px rgba(0,0,0,.7), inset 0 14px 30px -10px rgba(0,0,0,.45)`,
          }}
        />
        {/* corner star */}
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5"
          style={{ color: accent, fontSize: 10, opacity: 0.85 }}
        >
          ✦
        </span>
      </div>
      {/* divider */}
      <div className="mx-5 my-1 h-px" style={{ background: `${accent}66` }} />
      {/* title */}
      <div
        className="px-2 pb-2 text-center"
        style={{
          color: CREAM,
          fontFamily: "'Cormorant Garamond','Noto Serif JP',serif",
          fontStyle: "italic",
          letterSpacing: "0.12em",
          fontSize: 11,
        }}
      >
        {title}
      </div>
    </div>
  );
}

/* Marquee version of the photo tarot cards */
export function TarotPhotoFlow({
  photos = SAMPLE_PHOTOS,
  speed = 50,
  size = 180,
  accent = GOLD,
  className = "",
}: {
  photos?: TarotPhoto[];
  speed?: number;
  size?: number;
  accent?: string;
  className?: string;
}) {
  const list = [...photos, ...photos];
  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <div
        className="flex w-max items-center gap-6 py-7 will-change-transform"
        style={{ animation: `tarotFlow ${speed}s linear infinite` }}
      >
        {list.map((p, i) => {
          const tilt = ((i % 5) - 2) * 4;
          return (
            <div
              key={i}
              className="group relative shrink-0 transition-transform duration-500"
              style={{ transform: `rotate(${tilt}deg)` }}
            >
              <div className="rounded-[14px] transition-all duration-500 group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.04)]">
                <TarotPhotoCard
                  src={p.src}
                  alt={p.alt}
                  numeral={p.numeral}
                  title={p.title}
                  accent={accent}
                  width={size}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TarotFlow({
  speed = 50,
  size = 180,
  className = "",
}: {
  speed?: number; // seconds per loop
  size?: number;
  className?: string;
}) {
  // duplicate cards for seamless loop
  const list = [...CARDS, ...CARDS];
  return (
    <div
      className={`relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
      style={{ height: size * (260 / 180) + 28 }}
    >
      <div
        className="absolute inset-y-0 left-0 flex items-center gap-6 will-change-transform"
        style={{
          width: "max-content",
          animation: `tarotFlow ${speed}s linear infinite`,
        }}
      >
        {list.map((c, i) => {
          const tilt = ((i % 5) - 2) * 4; // -8, -4, 0, 4, 8 deg pattern
          const Card = c.Comp;
          return (
            <div
              key={i}
              className="group relative shrink-0 transition-transform duration-500"
              style={{
                width: size,
                height: size * (260 / 180),
                transform: `rotate(${tilt}deg)`,
              }}
            >
              <div
                className="h-full w-full rounded-2xl transition-all duration-500 group-hover:[transform:rotate(0deg)_translateY(-10px)_scale(1.04)]"
                style={
                  {
                    boxShadow:
                      "0 18px 40px -16px rgba(212,175,55,.45), 0 6px 12px rgba(0,0,0,.4)",
                  } as CSSProperties
                }
              >
                <Card variant={c.variant} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
