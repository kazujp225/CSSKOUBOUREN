import { PATTERNS, type Pattern } from "@/data/patterns";
import { LOADING_PATTERNS } from "@/data/loadings/registry";
import { EXTRA_PATTERNS } from "@/data/extras/registry";

export const ALL_PATTERNS: Pattern[] = [
  ...PATTERNS,
  ...EXTRA_PATTERNS,
  ...LOADING_PATTERNS,
];

export const PATTERN_BY_ID: Record<string, Pattern> = Object.fromEntries(
  ALL_PATTERNS.map((p) => [p.id, p])
);

export type { Pattern } from "@/data/patterns";
