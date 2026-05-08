// Shared types & metadata for the loading archetype system.
// Server-safe (no React).

export type ColorKey = "violet" | "blue" | "rose" | "amber" | "emerald";
export type SizeKey = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "mega";
export type SpeedKey =
  | "ultraSlow"
  | "vslow"
  | "slow"
  | "slowish"
  | "medium"
  | "normal"
  | "normalish"
  | "fast"
  | "vfast"
  | "faster"
  | "ultra"
  | "instant";

export const COLORS: ColorKey[] = ["violet", "blue", "rose", "amber", "emerald"];
// Loading registry uses these arrays to expand variants.
// Keep them small to avoid loading dominating the dictionary.
export const SIZES: SizeKey[] = ["md", "lg"];
export const SPEEDS: SpeedKey[] = ["slow", "normal", "fast"];

export const COLOR_META: Record<ColorKey, { hex: string; tw: string; jp: string; soft: string }> = {
  violet: { hex: "#7c5cff", tw: "violet", jp: "紫", soft: "#ede9ff" },
  blue: { hex: "#3b82f6", tw: "blue", jp: "青", soft: "#dbeafe" },
  rose: { hex: "#f43f5e", tw: "rose", jp: "ローズ", soft: "#ffe4e6" },
  amber: { hex: "#f59e0b", tw: "amber", jp: "アンバー", soft: "#fef3c7" },
  emerald: { hex: "#10b981", tw: "emerald", jp: "緑", soft: "#d1fae5" },
};

export const SIZE_META: Record<SizeKey, { px: number; jp: string }> = {
  xs: { px: 20, jp: "XS" },
  sm: { px: 28, jp: "S" },
  md: { px: 40, jp: "M" },
  lg: { px: 60, jp: "L" },
  xl: { px: 88, jp: "XL" },
  xxl: { px: 120, jp: "XXL" },
  mega: { px: 160, jp: "MEGA" },
};

export const SPEED_META: Record<SpeedKey, { sec: number; jp: string }> = {
  ultraSlow: { sec: 3.0, jp: "とても遅い" },
  vslow: { sec: 2.4, jp: "ゆっくり" },
  slow: { sec: 1.8, jp: "遅め" },
  slowish: { sec: 1.4, jp: "やや遅" },
  medium: { sec: 1.2, jp: "中" },
  normal: { sec: 1.0, jp: "ふつう" },
  normalish: { sec: 0.85, jp: "やや速" },
  fast: { sec: 0.7, jp: "速い" },
  vfast: { sec: 0.4, jp: "とても速い" },
  faster: { sec: 0.3, jp: "高速" },
  ultra: { sec: 0.25, jp: "超高速" },
  instant: { sec: 0.15, jp: "瞬時" },
};

export type ResolvedColor = { hex: string; tw: string; jp: string; soft: string; key: ColorKey };
export type ResolvedSize = { px: number; jp: string; key: SizeKey };
export type ResolvedSpeed = { sec: number; jp: string; key: SpeedKey };

export type ResolvedParams = {
  color: ResolvedColor;
  size: ResolvedSize;
  speed: ResolvedSpeed;
};

export function resolveParams(c: ColorKey, s: SizeKey, sp: SpeedKey): ResolvedParams {
  return {
    color: { ...COLOR_META[c], key: c },
    size: { ...SIZE_META[s], key: s },
    speed: { ...SPEED_META[sp], key: sp },
  };
}

export type CodeSet = {
  html: string;
  css: string;
  tailwind: string;
  react: string;
};

export type ArchetypeMeta = {
  id: string;
  baseTitle: string;
  category: string;
  baseMood: string[];
  baseTags: string[];
  difficulty: "easy" | "medium" | "hard";
  useCase: string;
  effect: string;
  suitableFor: string[];
  badUsage: string;
  similar?: string[];
  code: (p: ResolvedParams) => CodeSet;
  prompt: (p: ResolvedParams) => string;
};

// id format: ld-{archId}-{color}-{size}-{speed}
export function parseLoadingId(
  id: string
): { archId: string; color: ColorKey; size: SizeKey; speed: SpeedKey } | null {
  if (!id.startsWith("ld-")) return null;
  const parts = id.slice(3).split("-");
  if (parts.length < 4) return null;
  const speed = parts.pop() as SpeedKey;
  const size = parts.pop() as SizeKey;
  const color = parts.pop() as ColorKey;
  if (!SPEEDS.includes(speed) || !SIZES.includes(size) || !COLORS.includes(color)) return null;
  const archId = parts.join("-");
  return { archId, color, size, speed };
}

export function makeLoadingId(archId: string, c: ColorKey, s: SizeKey, sp: SpeedKey) {
  return `ld-${archId}-${c}-${s}-${sp}`;
}
