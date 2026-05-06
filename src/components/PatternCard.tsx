import Link from "next/link";
import { Pattern } from "@/data/patterns";
import { CATEGORIES } from "@/data/categories";
import { PatternPreview } from "@/components/previews";

const DIFF_LABEL: Record<Pattern["difficulty"], string> = {
  easy: "★",
  medium: "★★",
  hard: "★★★",
};

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const cat = CATEGORIES.find((c) => c.slug === pattern.category);
  return (
    <Link
      href={`/patterns/${pattern.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-50/70 ring-1 ring-inset ring-zinc-100">
        <PatternPreview id={pattern.id} />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 border-t border-zinc-100 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700">
            {cat?.name ?? pattern.category}
          </span>
          <span className="font-mono text-[11px] tracking-wide text-violet-500">
            {DIFF_LABEL[pattern.difficulty]}
          </span>
        </div>
        <h3 className="font-display text-[16px] font-semibold leading-snug tracking-tight text-zinc-900">
          {pattern.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
          {pattern.useCase}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {pattern.mood.slice(0, 3).map((m) => (
            <span
              key={m}
              className="rounded-md bg-zinc-100/80 px-1.5 py-0.5 text-[10px] text-zinc-600"
            >
              {m}
            </span>
          ))}
          {pattern.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-md border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
