// Generic archetype framework for non-loading patterns.

import { COLOR_META, COLORS, type ColorKey, type ResolvedColor } from "@/data/loadings/types";
import type { CodeSet } from "@/data/loadings/types";

export { COLOR_META, COLORS, type ColorKey, type ResolvedColor };
export type { CodeSet };

export type ExtraVariant = {
  key: string;
  label: string; // 人が読める短い名称（例: "紫", "アウトライン")
  // arbitrary additional fields per archetype
  [k: string]: unknown;
};

export type ExtraArchetype<V extends ExtraVariant = ExtraVariant> = {
  id: string; // archetype id (e.g. "cta-glow")
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
  variants: V[];
  code: (v: V) => CodeSet;
  prompt: (v: V) => string;
};

export function makeExtraId(archId: string, variantKey: string) {
  return `ex-${archId}-${variantKey}`;
}

// Extras volume expansion axes (Path C). Adds variant dimensions to multiply
// the ID space without forcing per-archetype code-generator changes.
export const EXTRA_SIZES = ["sm", "md", "lg"] as const;
export const EXTRA_STYLES = ["solid", "soft", "outline"] as const;
export type ExtraSize = typeof EXTRA_SIZES[number];
export type ExtraStyle = typeof EXTRA_STYLES[number];

export function makeExtraIdSized(archId: string, color: string, size: ExtraSize, style: ExtraStyle) {
  return `ex-${archId}-${color}-${size}-${style}`;
}

export function parseExtraId(
  id: string
): { archId: string; variantKey: string; size?: ExtraSize; style?: ExtraStyle } | null {
  if (!id.startsWith("ex-")) return null;
  const rest = id.slice(3);
  const parts = rest.split("-");

  // Try new format: {archId}-{color}-{size}-{style} (at least 4 segments)
  if (parts.length >= 4) {
    const style = parts[parts.length - 1] as ExtraStyle;
    const size = parts[parts.length - 2] as ExtraSize;
    const color = parts[parts.length - 3];
    if (
      EXTRA_STYLES.includes(style as ExtraStyle) &&
      EXTRA_SIZES.includes(size as ExtraSize) &&
      COLORS.includes(color as ColorKey)
    ) {
      const archId = parts.slice(0, parts.length - 3).join("-");
      return { archId, variantKey: color, size, style };
    }
  }

  // Legacy fallback: {archId}-{variantKey}
  const lastDash = rest.lastIndexOf("-");
  if (lastDash <= 0) return null;
  return { archId: rest.slice(0, lastDash), variantKey: rest.slice(lastDash + 1) };
}

// Common helper: make 5 color variants
export function colorVariants(): { key: string; label: string; color: ResolvedColor }[] {
  return COLORS.map((c) => ({
    key: c,
    label: COLOR_META[c].jp,
    color: { ...COLOR_META[c], key: c },
  }));
}
