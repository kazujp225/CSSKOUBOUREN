import { PATTERNS, type Pattern } from "@/data/patterns";
import { LOADING_PATTERNS } from "@/data/loadings/registry";
import { EXTRA_PATTERNS } from "@/data/extras/registry";
import { ARCHETYPE_BY_ID } from "@/data/loadings/archetypes";
import { parseLoadingId, resolveParams } from "@/data/loadings/types";
import { EXTRA_ARCHETYPE_BY_ID } from "@/data/extras/archetypes";
import { parseExtraId } from "@/data/extras/types";

export const ALL_PATTERNS: Pattern[] = [
  ...PATTERNS,
  ...EXTRA_PATTERNS,
  ...LOADING_PATTERNS,
];

export const PATTERN_BY_ID: Record<string, Pattern> = Object.fromEntries(
  ALL_PATTERNS.map((p) => [p.id, p])
);

export type { Pattern } from "@/data/patterns";

/**
 * Resolve full Pattern (with htmlCode / cssCode / tailwindCode / reactCode / claudePrompt)
 * for a given pattern id. For static `PATTERNS` entries the pre-baked code is returned.
 * For loading and extras patterns, code & prompt are generated on demand from their archetype.
 */
export function resolvePattern(id: string): Pattern | null {
  const meta = PATTERN_BY_ID[id];
  if (!meta) return null;
  if (meta.htmlCode && meta.htmlCode.length > 0) return meta;

  // Loading
  const lp = parseLoadingId(id);
  if (lp) {
    const arch = ARCHETYPE_BY_ID[lp.archId];
    if (arch) {
      const params = resolveParams(lp.color, lp.size, lp.speed);
      const code = arch.code(params);
      return {
        ...meta,
        htmlCode: code.html,
        cssCode: code.css,
        tailwindCode: code.tailwind,
        reactCode: code.react,
        claudePrompt: arch.prompt(params),
      };
    }
  }

  // Extra
  const ep = parseExtraId(id);
  if (ep) {
    const arch = EXTRA_ARCHETYPE_BY_ID[ep.archId];
    if (arch) {
      const variant = arch.variants.find((v) => v.key === ep.variantKey);
      if (variant) {
        const code = arch.code(variant);
        return {
          ...meta,
          htmlCode: code.html,
          cssCode: code.css,
          tailwindCode: code.tailwind,
          reactCode: code.react,
          claudePrompt: arch.prompt(variant),
        };
      }
    }
  }

  return meta;
}
