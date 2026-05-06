// Lazy registry: only metadata is built up-front. Full code/prompt for each
// pattern is resolved on demand by `resolvePattern` in `@/data/all`.
// 25 archetypes × 5 colors × 5 sizes × 8 speeds = 5,000 patterns.

import type { Pattern } from "@/data/patterns";
import { ARCHETYPES } from "./archetypes";
import {
  COLORS,
  COLOR_META,
  SIZE_META,
  SIZES,
  SPEED_META,
  SPEEDS,
  makeLoadingId,
} from "./types";

function buildPatterns(): Pattern[] {
  const out: Pattern[] = [];
  for (const arch of ARCHETYPES) {
    for (const c of COLORS) {
      for (const s of SIZES) {
        for (const sp of SPEEDS) {
          out.push({
            id: makeLoadingId(arch.id, c, s, sp),
            title: `${arch.baseTitle} / ${COLOR_META[c].jp} / ${SIZE_META[s].jp} / ${SPEED_META[sp].jp}`,
            category: arch.category,
            tags: arch.baseTags,
            mood: arch.baseMood,
            difficulty: arch.difficulty,
            useCase: arch.useCase,
            effect: arch.effect,
            suitableFor: arch.suitableFor,
            badUsage: arch.badUsage,
            // code & prompt are resolved lazily by resolvePattern() in @/data/all
            htmlCode: "",
            cssCode: "",
            tailwindCode: "",
            reactCode: "",
            claudePrompt: "",
            similar: arch.similar?.map((archId) => makeLoadingId(archId, c, s, sp)),
          });
        }
      }
    }
  }
  return out;
}

export const LOADING_PATTERNS: Pattern[] = buildPatterns();
