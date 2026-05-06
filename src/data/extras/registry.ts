import type { Pattern } from "@/data/patterns";
import { EXTRA_ARCHETYPES } from "./archetypes";
import { COLOR_META, makeExtraId } from "./types";

function build(): Pattern[] {
  const out: Pattern[] = [];
  for (const arch of EXTRA_ARCHETYPES) {
    for (const v of arch.variants) {
      const id = makeExtraId(arch.id, v.key);
      const code = arch.code(v as any);
      const prompt = arch.prompt(v as any);
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
        htmlCode: code.html,
        cssCode: code.css,
        tailwindCode: code.tailwind,
        reactCode: code.react,
        claudePrompt: prompt,
        similar: arch.similar?.map((id) => makeExtraId(id, v.key)),
      });
    }
  }
  return out;
}

export const EXTRA_PATTERNS: Pattern[] = build();
