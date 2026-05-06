import { PatternsExplorer } from "@/components/PatternsExplorer";

type SearchParams = { q?: string; category?: string };

export default function PatternsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="space-y-8">
      <header>
        <div className="text-xs uppercase tracking-[0.18em] text-violet-300/80">Patterns</div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          演出を探す
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          キーワード・カテゴリ・雰囲気・難易度・技術タグで絞り込めます。
        </p>
      </header>
      <PatternsExplorer
        initialQuery={searchParams.q ?? ""}
        initialCategory={searchParams.category ?? ""}
      />
    </div>
  );
}
