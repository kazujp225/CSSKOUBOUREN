// Generates the full LOADING_PATTERNS array from archetypes × color × size × speed.
// 25 archetypes × 5 colors × 2 sizes × 4 speeds = 1000 patterns.

import type { Pattern } from "@/data/patterns";
import { ARCHETYPES } from "./archetypes";
import {
  COLORS,
  COLOR_META,
  SIZE_META,
  SPEED_META,
  resolveParams,
  makeLoadingId,
  type SizeKey,
  type SpeedKey,
} from "./types";

// 5 colors × 1 size (md) × 2 speeds (slow/normal) × 25 archetypes = 250
const USE_SIZES: SizeKey[] = ["md"];
const USE_SPEEDS: SpeedKey[] = ["slow", "normal"];

function buildPatterns(): Pattern[] {
  const out: Pattern[] = [];
  for (const arch of ARCHETYPES) {
    for (const c of COLORS) {
      for (const s of USE_SIZES) {
        for (const sp of USE_SPEEDS) {
          const params = resolveParams(c, s, sp);
          const code = arch.code(params);
          const prompt = arch.prompt(params);
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
            htmlCode: code.html,
            cssCode: code.css,
            tailwindCode: code.tailwind,
            reactCode: code.react,
            claudePrompt: prompt,
            similar: arch.similar?.flatMap((archId) => {
              const sameKey = makeLoadingId(archId, c, s, sp);
              return [sameKey];
            }),
          });
        }
      }
    }
  }
  return out;
}

export const LOADING_PATTERNS: Pattern[] = buildPatterns();
