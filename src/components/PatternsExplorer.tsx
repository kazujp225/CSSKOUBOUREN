"use client";

import { useEffect, useMemo, useState } from "react";
import type { Pattern } from "@/data/patterns";
import { ALL_PATTERNS } from "@/data/all";
import { CATEGORIES } from "@/data/categories";
import { PatternCard } from "@/components/PatternCard";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_MOODS = Array.from(new Set(ALL_PATTERNS.flatMap((p) => p.mood)));
const ALL_TECH = Array.from(new Set(ALL_PATTERNS.flatMap((p) => p.tags)));
const DIFFS: Pattern["difficulty"][] = ["easy", "medium", "hard"];
const DIFF_LABEL: Record<Pattern["difficulty"], string> = {
  easy: "★ かんたん",
  medium: "★★ ふつう",
  hard: "★★★ むずかしい",
};

const PAGE_SIZE = 30;

export function PatternsExplorer({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [mood, setMood] = useState<string>("");
  const [diff, setDiff] = useState<string>("");
  const [tech, setTech] = useState<string>("");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return ALL_PATTERNS.filter((p) => {
      if (category && p.category !== category) return false;
      if (mood && !p.mood.includes(mood)) return false;
      if (diff && p.difficulty !== diff) return false;
      if (tech && !p.tags.includes(tech)) return false;
      if (!ql) return true;
      const hay = [
        p.title,
        p.useCase,
        p.effect,
        p.suitableFor.join(" "),
        p.mood.join(" "),
        p.tags.join(" "),
        CATEGORIES.find((c) => c.slug === p.category)?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(ql);
    });
  }, [q, category, mood, diff, tech]);

  // reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [q, category, mood, diff, tech]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setQ("");
    setCategory("");
    setMood("");
    setDiff("");
    setTech("");
  };

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm focus-within:border-zinc-400 focus-within:shadow-md">
        <Search size={18} className="text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="検索:  虫眼鏡 / スピナー / ドット / 描画 / カード …"
          className="ml-3 w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} className="text-zinc-400 hover:text-zinc-700">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Filter
          label="カテゴリ"
          value={category}
          options={[{ value: "", label: "すべて" }, ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))]}
          onChange={setCategory}
        />
        <Filter
          label="雰囲気"
          value={mood}
          options={[{ value: "", label: "すべて" }, ...ALL_MOODS.map((m) => ({ value: m, label: m }))]}
          onChange={setMood}
        />
        <Filter
          label="難易度"
          value={diff}
          options={[{ value: "", label: "すべて" }, ...DIFFS.map((d) => ({ value: d, label: DIFF_LABEL[d] }))]}
          onChange={setDiff}
        />
        <Filter
          label="技術"
          value={tech}
          options={[{ value: "", label: "すべて" }, ...ALL_TECH.map((t) => ({ value: t, label: t }))]}
          onChange={setTech}
        />
        {(q || category || mood || diff || tech) && (
          <button
            onClick={reset}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 shadow-sm hover:bg-zinc-50 hover:text-zinc-900"
          >
            すべて解除
          </button>
        )}
      </div>

      <div className="text-sm text-zinc-500">
        {results.length.toLocaleString()} 件 / 全 {ALL_PATTERNS.length.toLocaleString()} 件
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-14 text-center shadow-sm">
          <div className="mb-2 text-3xl">🔎</div>
          <h3 className="font-semibold text-zinc-900">該当する演出が見つかりませんでした</h3>
          <p className="mt-1 text-sm text-zinc-500">条件を緩めてもう一度お試しください。</p>
          <button onClick={reset} className="mt-3 rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white">
            条件をリセット
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((p) => (
              <PatternCard key={p.id} pattern={p} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination total={totalPages} current={safePage} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          )}
        </>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white pl-3 pr-1 text-xs text-zinc-700 shadow-sm">
      <span className="text-zinc-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full bg-transparent py-1.5 pl-1 pr-2 text-xs text-zinc-900 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-white text-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Pagination({ total, current, onChange }: { total: number; current: number; onChange: (p: number) => void }) {
  const win = 2;
  const start = Math.max(1, current - win);
  const end = Math.min(total, current + win);
  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className="flex items-center justify-center gap-1.5 pt-4">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>
      {start > 1 && (
        <>
          <PageBtn page={1} current={current} onChange={onChange} />
          {start > 2 && <span className="px-1 text-xs text-zinc-400">…</span>}
        </>
      )}
      {pages.map((p) => (
        <PageBtn key={p} page={p} current={current} onChange={onChange} />
      ))}
      {end < total && (
        <>
          {end < total - 1 && <span className="px-1 text-xs text-zinc-400">…</span>}
          <PageBtn page={total} current={current} onChange={onChange} />
        </>
      )}
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function PageBtn({ page, current, onChange }: { page: number; current: number; onChange: (p: number) => void }) {
  const active = page === current;
  return (
    <button
      onClick={() => onChange(page)}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-medium transition ${
        active
          ? "bg-zinc-900 text-white"
          : "border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50"
      }`}
    >
      {page}
    </button>
  );
}

