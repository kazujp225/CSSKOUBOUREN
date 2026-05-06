"use client";

import type { ResolvedParams } from "./types";

/* Helpers */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white p-6">
      {children}
    </div>
  );
}

const dot = (sizePx: number) => Math.max(6, Math.round(sizePx / 5));

/* 1 */
export function PSpinnerClassic({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div
        role="status"
        aria-label="loading"
        className="rounded-full"
        style={{
          width: size.px,
          height: size.px,
          border: "3px solid rgba(0,0,0,.10)",
          borderTopColor: color.hex,
          animation: `drSpin ${speed.sec}s linear infinite`,
        }}
      />
    </Stage>
  );
}

/* 2 */
export function PSpinnerDual({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div className="relative" style={{ width: size.px, height: size.px }} role="status" aria-label="loading">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: "3px solid transparent",
            borderTopColor: color.hex,
            animation: `drSpin ${speed.sec}s linear infinite`,
          }}
        />
        <span
          className="absolute inset-1.5 rounded-full"
          style={{
            border: "3px solid transparent",
            borderBottomColor: color.hex,
            animation: `drSpin ${(speed.sec * 1.4).toFixed(2)}s linear infinite reverse`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 3 */
export function PSpinnerDotted({ color, size, speed }: ResolvedParams) {
  const r = size.px / 2;
  const d = Math.max(4, Math.round(size.px / 9));
  return (
    <Stage>
      <div className="relative" style={{ width: size.px, height: size.px }} role="status" aria-label="loading">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 rounded-full"
            style={{
              width: d,
              height: d,
              marginLeft: -d / 2,
              background: color.hex,
              opacity: 0,
              transform: `rotate(${i * 45}deg) translateY(${r - d / 2}px)`,
              transformOrigin: `center ${r}px`,
              animation: `dotFade ${(speed.sec * 1.2).toFixed(2)}s linear infinite`,
              animationDelay: `${(-i * 0.12).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 4 */
export function PSpinnerConic({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div
        role="status"
        aria-label="loading"
        style={{
          width: size.px,
          height: size.px,
          borderRadius: 9999,
          background: `conic-gradient(from 0deg, transparent 0%, ${color.hex} 90%)`,
          WebkitMask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
          mask: "radial-gradient(circle at center, transparent 55%, #000 56%)",
          animation: `drSpin ${speed.sec}s linear infinite`,
        }}
      />
    </Stage>
  );
}

/* 5 */
export function PSpinnerDashed({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <svg
        viewBox="0 0 50 50"
        role="status"
        aria-label="loading"
        style={{
          width: size.px,
          height: size.px,
          color: color.hex,
          animation: `drSpin ${speed.sec}s linear infinite`,
        }}
      >
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
      </svg>
    </Stage>
  );
}

/* 6 */
export function PDotsBounce({ color, size, speed }: ResolvedParams) {
  const d = dot(size.px);
  return (
    <Stage>
      <div className="inline-flex items-center" style={{ gap: Math.round(d * 0.6) }} role="status" aria-label="loading">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: d,
              height: d,
              background: color.hex,
              animation: `dbBounce ${speed.sec}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 6).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 7 */
export function PDotsFade({ color, size, speed }: ResolvedParams) {
  const d = dot(size.px);
  return (
    <Stage>
      <div className="inline-flex" style={{ gap: Math.round(d * 0.6) }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: d,
              height: d,
              background: color.hex,
              opacity: 0.25,
              animation: `dfFade ${speed.sec}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 4).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 8 */
export function PDotsScale({ color, size, speed }: ResolvedParams) {
  const d = Math.max(8, Math.round(size.px / 4));
  return (
    <Stage>
      <div className="inline-flex items-center" style={{ gap: Math.round(d * 0.5) }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: d,
              height: d,
              background: color.hex,
              animation: `dsScale ${speed.sec}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 4).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 9 */
export function PDotsWave({ color, size, speed }: ResolvedParams) {
  const d = Math.max(6, Math.round(size.px / 6));
  return (
    <Stage>
      <div className="inline-flex items-center" style={{ gap: Math.round(d * 0.6) }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: d,
              height: d,
              background: color.hex,
              animation: `dwWave ${speed.sec}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 10).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 10 */
export function PDotsRotate({ color, size, speed }: ResolvedParams) {
  const d = dot(size.px);
  const r = size.px / 2 - d / 2;
  return (
    <Stage>
      <div
        className="relative"
        style={{
          width: size.px,
          height: size.px,
          animation: `drSpin ${speed.sec}s linear infinite`,
        }}
      >
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: d,
              height: d,
              margin: -d / 2,
              background: color.hex,
              transform: `rotate(${deg}deg) translateX(${r}px)`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 11 */
export function PBarBounce({ color, size, speed }: ResolvedParams) {
  const w = Math.max(4, Math.round(size.px / 8));
  const gap = Math.max(2, Math.round(w * 0.6));
  return (
    <Stage>
      <div className="inline-flex items-end" style={{ gap, height: size.px }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: w,
              borderRadius: w / 2,
              background: color.hex,
              animation: `bbBar ${speed.sec}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 8).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 12 */
export function PEqualizer({ color, size, speed }: ResolvedParams) {
  const w = Math.max(4, Math.round(size.px / 8));
  const gap = Math.max(2, Math.round(w * 0.7));
  const durs = [speed.sec, speed.sec * 0.7, speed.sec * 1.3, speed.sec * 0.9];
  return (
    <Stage>
      <div className="inline-flex items-end" style={{ gap, height: size.px }}>
        {durs.map((d, i) => (
          <span
            key={i}
            style={{
              width: w,
              borderRadius: w / 2,
              background: color.hex,
              animation: `eqBar ${d.toFixed(2)}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 13 */
export function PProgressLinear({ color, size, speed }: ResolvedParams) {
  const h = Math.max(2, Math.round(size.px / 14));
  return (
    <Stage>
      <div className="relative w-full max-w-xs overflow-hidden rounded-full bg-zinc-200" style={{ height: h }}>
        <span
          className="absolute inset-y-0 rounded-full"
          style={{
            left: "-40%",
            width: "40%",
            background: color.hex,
            animation: `lpSlide ${(speed.sec * 1.4).toFixed(2)}s ease-in-out infinite`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 14 */
export function PProgressStripe({ color, size, speed }: ResolvedParams) {
  const h = Math.max(8, Math.round(size.px / 4));
  return (
    <Stage>
      <div className="w-full max-w-xs overflow-hidden rounded-full bg-zinc-200" style={{ height: h }}>
        <span
          className="block h-full rounded-full"
          style={{
            width: "65%",
            backgroundColor: color.hex,
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,.3) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.3) 75%, transparent 75%, transparent)",
            backgroundSize: "24px 24px",
            animation: `spStripe ${speed.sec}s linear infinite`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 15 */
export function PRipple({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div className="relative" style={{ width: size.px, height: size.px }} role="status" aria-label="loading">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color.hex}`,
              opacity: 0,
              animation: `rip ${(speed.sec * 1.6).toFixed(2)}s cubic-bezier(0,.2,.8,1) infinite`,
              animationDelay: `${(i * speed.sec * 0.8).toFixed(2)}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  );
}

/* 16 */
export function PPulseRing({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div className="relative" style={{ width: size.px, height: size.px }}>
        <span className="absolute rounded-full" style={{ inset: "30%", background: color.hex }} />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: color.hex,
            opacity: 0.4,
            animation: `prPulse ${(speed.sec * 1.4).toFixed(2)}s ease-out infinite`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 17 */
export function PHeartBeat({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div
        aria-label="loading"
        style={{
          fontSize: size.px,
          lineHeight: 1,
          color: color.hex,
          animation: `hbBeat ${(speed.sec * 1.2).toFixed(2)}s ease-in-out infinite`,
        }}
      >
        ♥
      </div>
    </Stage>
  );
}

/* 18 */
export function PMagnifierSearch({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <svg viewBox="0 0 64 64" aria-label="searching" style={{ width: size.px * 1.4, height: size.px * 1.4 }}>
        <line x1="6" y1="50" x2="58" y2="50" stroke="rgba(0,0,0,.12)" strokeWidth="2" strokeLinecap="round" />
        <g style={{ animation: `msMove ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite` }}>
          <circle cx="0" cy="0" r="10" fill="none" stroke={color.hex} strokeWidth="3" />
          <line x1="7" y1="7" x2="14" y2="14" stroke={color.hex} strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </Stage>
  );
}

/* 19 */
export function PMagnifierOrbit({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <svg viewBox="0 0 100 100" aria-label="searching" style={{ width: size.px * 1.4, height: size.px * 1.4 }}>
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,0,0,.10)" strokeDasharray="3 4" />
        <g style={{ animation: `moSpin ${(speed.sec * 1.8).toFixed(2)}s linear infinite` }}>
          <g transform="translate(0,-32)">
            <circle cx="0" cy="0" r="9" fill="none" stroke={color.hex} strokeWidth="3" />
            <line x1="6" y1="6" x2="13" y2="13" stroke={color.hex} strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </Stage>
  );
}

/* 20 */
export function PLineDraw({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <svg viewBox="0 0 100 40" aria-label="loading" style={{ width: size.px * 1.6, height: size.px * 0.7 }}>
        <path
          d="M5,20 C25,5 45,35 65,20 S95,5 95,20"
          fill="none"
          stroke={color.hex}
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            animation: `ldDraw ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite`,
          }}
        />
      </svg>
    </Stage>
  );
}

/* 21 */
export function PCircleDraw({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <svg viewBox="0 0 50 50" aria-label="loading" style={{ width: size.px, height: size.px }}>
        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3" />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color.hex}
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 25 25)"
          style={{
            strokeDasharray: 126,
            strokeDashoffset: 126,
            animation: `cdDraw ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite`,
          }}
        />
      </svg>
    </Stage>
  );
}

/* 22 */
export function PPencilWrite({ color, size, speed }: ResolvedParams) {
  const w = size.px * 2.4;
  const pen = Math.round(size.px * 0.6);
  return (
    <Stage>
      <div className="relative" style={{ width: w, height: size.px }} aria-label="loading">
        <span
          className="absolute"
          style={{
            top: "50%",
            left: 0,
            fontSize: pen,
            transform: "translateY(-50%) rotate(35deg)",
            animation: `pwMove ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite`,
          }}
        >
          ✏️
        </span>
        <span
          className="absolute h-0.5 rounded"
          style={{
            left: 0,
            bottom: "30%",
            background: color.hex,
            width: 0,
            animation: `pwLine ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 23 */
export function PTypingDots({ color, size, speed }: ResolvedParams) {
  const fz = Math.max(14, Math.round(size.px * 0.5));
  return (
    <Stage>
      <div className="inline-flex items-baseline gap-px" style={{ fontSize: fz, color: color.hex }}>
        <span>考え中</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              opacity: 0.3,
              animation: `tdDot ${(speed.sec * 1.2).toFixed(2)}s ease-in-out infinite`,
              animationDelay: `${(i * speed.sec / 4).toFixed(2)}s`,
            }}
          >
            .
          </span>
        ))}
      </div>
    </Stage>
  );
}

/* 24 */
export function POrbitPlanet({ color, size, speed }: ResolvedParams) {
  const planet = Math.max(6, Math.round(size.px / 6));
  return (
    <Stage>
      <div
        className="relative"
        style={{ width: size.px, height: size.px, animation: `drSpin ${speed.sec}s linear infinite` }}
      >
        <span
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: Math.round(planet * 1.4),
            height: Math.round(planet * 1.4),
            margin: -Math.round(planet * 0.7),
            background: color.hex,
            opacity: 0.4,
          }}
        />
        <span
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: planet,
            height: planet,
            margin: -planet / 2,
            background: color.hex,
            transform: `translateX(${size.px / 2 - planet / 2}px)`,
          }}
        />
      </div>
    </Stage>
  );
}

/* 25 */
export function PFlipCard({ color, size, speed }: ResolvedParams) {
  return (
    <Stage>
      <div style={{ perspective: 200, width: size.px, height: size.px }} aria-label="loading">
        <span
          className="block h-full w-full"
          style={{
            background: color.hex,
            borderRadius: Math.round(size.px * 0.18),
            animation: `fcFlip ${(speed.sec * 1.6).toFixed(2)}s ease-in-out infinite`,
          }}
        />
      </div>
    </Stage>
  );
}

export const PREVIEW_FNS: Record<string, (p: ResolvedParams) => JSX.Element> = {
  "spinner-classic": PSpinnerClassic,
  "spinner-dual": PSpinnerDual,
  "spinner-dotted": PSpinnerDotted,
  "spinner-conic": PSpinnerConic,
  "spinner-dashed": PSpinnerDashed,
  "dots-bounce": PDotsBounce,
  "dots-fade": PDotsFade,
  "dots-scale": PDotsScale,
  "dots-wave": PDotsWave,
  "dots-rotate": PDotsRotate,
  "bar-bounce": PBarBounce,
  "equalizer": PEqualizer,
  "progress-linear": PProgressLinear,
  "progress-stripe": PProgressStripe,
  "ripple": PRipple,
  "pulse-ring": PPulseRing,
  "heart-beat": PHeartBeat,
  "magnifier-search": PMagnifierSearch,
  "magnifier-orbit": PMagnifierOrbit,
  "line-draw": PLineDraw,
  "circle-draw": PCircleDraw,
  "pencil-write": PPencilWrite,
  "typing-dots": PTypingDots,
  "orbit-planet": POrbitPlanet,
  "flip-card": PFlipCard,
};
