// Lazy registry for extras with size × style variant expansion (Path C).
// Each archetype × 5 colors × 3 sizes × 3 styles = 45 patterns per archetype.

import type { Pattern } from "@/data/patterns";
import { EXTRA_ARCHETYPES } from "./archetypes";
import { COLOR_META, EXTRA_SIZES, EXTRA_STYLES, makeExtraIdSized } from "./types";

const SIZE_LABEL: Record<string, string> = { sm: "S", md: "M", lg: "L" };
const STYLE_LABEL: Record<string, string> = { solid: "塗り", soft: "ソフト", outline: "アウトライン" };

function build(): Pattern[] {
  const out: Pattern[] = [];
  for (const arch of EXTRA_ARCHETYPES) {
    for (const v of arch.variants) {
      // Pick the color label from the variant if it has one, otherwise from COLOR_META.
      const colorKey = v.key;
      const colorJp =
        colorKey in COLOR_META
          ? COLOR_META[colorKey as keyof typeof COLOR_META].jp
          : v.label;
      for (const size of EXTRA_SIZES) {
        for (const style of EXTRA_STYLES) {
          const id = makeExtraIdSized(arch.id, colorKey, size, style);
          out.push({
            id,
            title: `${arch.baseTitle} / ${colorJp} / ${SIZE_LABEL[size]} / ${STYLE_LABEL[style]}`,
            category: arch.category,
            tags: arch.baseTags,
            mood: arch.baseMood,
            difficulty: arch.difficulty,
            useCase: arch.useCase,
            effect: arch.effect,
            suitableFor: arch.suitableFor,
            badUsage: arch.badUsage,
            // Code & prompt resolved lazily in @/data/all
            htmlCode: "",
            cssCode: "",
            tailwindCode: "",
            reactCode: "",
            claudePrompt: "",
            // Note: similar references use base variant key (no size/style suffix yet)
            similar: arch.similar?.map((s) => makeExtraIdSized(s, colorKey, size, style)),
          });
        }
      }
    }
  }
  return out;
}

export const EXTRA_PATTERNS: Pattern[] = build();
