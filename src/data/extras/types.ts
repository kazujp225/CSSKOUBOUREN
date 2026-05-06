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

export function parseExtraId(id: string): { archId: string; variantKey: string } | null {
  if (!id.startsWith("ex-")) return null;
  const rest = id.slice(3);
  // archId can contain hyphens; variantKey is the last hyphen-separated chunk
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
