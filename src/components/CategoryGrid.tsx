import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { ALL_PATTERNS } from "@/data/all";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORIES.map((c) => {
        const count = ALL_PATTERNS.filter((p) => p.category === c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/patterns?category=${c.slug}`}
            className="group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lift"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-[15px] font-semibold tracking-tight text-zinc-900">
                {c.name}
              </h3>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                {count}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-zinc-500">
              {c.description}
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-zinc-400 opacity-0 transition group-hover:opacity-100">
              見る
              <span aria-hidden>→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
