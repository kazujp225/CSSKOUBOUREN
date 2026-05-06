// Lazy registry for extras: code & prompt resolved on demand by resolvePattern in @/data/all.

import type { Pattern } from "@/data/patterns";
import { EXTRA_ARCHETYPES } from "./archetypes";
import { COLOR_META, makeExtraId } from "./types";

function build(): Pattern[] {
  const out: Pattern[] = [];
  for (const arch of EXTRA_ARCHETYPES) {
    for (const v of arch.variants) {
      const id = makeExtraId(arch.id, v.key);
      const colorJp =
        v.key in COLOR_META ? COLOR_META[v.key as keyof typeof COLOR_META].jp : v.label;
      out.push({
        id,
        title: `${arch.baseTitle} / ${colorJp}`,
        category: arch.category,
        tags: arch.baseTags,
        mood: arch.baseMood,
        difficulty: arch.difficulty,
        useCase: arch.useCase,
        effect: arch.effect,
        suitableFor: arch.suitableFor,
        badUsage: arch.badUsage,
        // code & prompt resolved lazily
        htmlCode: "",
        cssCode: "",
        tailwindCode: "",
        reactCode: "",
        claudePrompt: "",
        similar: arch.similar?.map((id) => makeExtraId(id, v.key)),
      });
    }
  }
  return out;
}

export const EXTRA_PATTERNS: Pattern[] = build();
