import Link from "next/link";
import { POPULAR_TAGS } from "@/data/categories";

export function PopularTags() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {POPULAR_TAGS.map((t) => (
        <Link
          key={t}
          href={`/patterns?q=${encodeURIComponent(t)}`}
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700 shadow-soft transition hover:-translate-y-0.5 hover:border-zinc-400 hover:text-zinc-900"
        >
          # {t}
        </Link>
      ))}
    </div>
  );
}
