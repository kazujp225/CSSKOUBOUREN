"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Sparkles, Search, Wand2, ArrowRight } from "lucide-react";
import { search, EXAMPLE_PROMPTS, type MatchResult } from "@/lib/match";
import { CATEGORIES } from "@/data/categories";
import { PatternPreview } from "@/components/previews";

export function GenerateUI({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);
  const [pending, startTransition] = useTransition();

  const results = useMemo<MatchResult[]>(() => {
    if (!submitted.trim()) return [];
    return search(submitted, { limit: 9 });
  }, [submitted]);

  function run(query: string) {
    setQ(query);
    // simulate a tiny "thinking" pause for UX
    startTransition(() => {
      setTimeout(() => setSubmitted(query), 220);
    });
  }

  return (
    <div className="space-y-10">
      {/* hero */}
      <div className="relative overflow-hidden rounded-[28px] border border-zinc-200/70 bg-white p-8 shadow-soft sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-violet-300/30 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-10 h-60 w-60 rounded-full bg-blue-300/25 blur-[120px]"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-zinc-700 shadow-soft backdrop-blur">
            <Wand2 size={12} className="text-violet-500" />
            Mini-AI Search
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
            欲しい演出を、<em className="not-italic italic bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">日本語で。</em>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            雰囲気・カテゴリ・色・速度などを文章で書いてください。登録済みの演出から、
            「なぜマッチしたか」を添えて最適なものを返します。
            外部 AI は使わず、内蔵のシノニム辞書 + 重み付きスコアリングで動作します。
          </p>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (q.trim()) run(q.trim());
            }}
            className="mt-7 flex flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex flex-1 items-center rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 shadow-soft focus-within:border-violet-300 focus-within:shadow-lift">
              <Sparkles size={18} className="text-violet-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="例) 占いサイトの神秘的なカード / BtoB向けの光る紫CTAボタン / 送信中のアニメ"
                className="ml-3 w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!q.trim() || pending}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "考え中…" : <>探す <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* example prompts */}
          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              例
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => run(p)}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] text-zinc-600 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:text-zinc-900"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* results */}
      {!submitted ? (
        <EmptyState />
      ) : results.length === 0 ? (
        <NoResults query={submitted} />
      ) : (
        <Results results={results} query={submitted} />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-soft">
      <div className="mb-2 text-3xl">🔮</div>
      <h3 className="font-display text-lg font-semibold text-zinc-900">
        作りたい演出を文章で書くと、ここにマッチが出ます。
      </h3>
      <p className="mt-1.5 text-sm text-zinc-500">
        「BtoB向けの高級感」「光る紫」「占いサイト」のような書き方で大丈夫。
      </p>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center shadow-soft">
      <div className="mb-2 text-3xl">🤔</div>
      <h3 className="font-display text-lg font-semibold text-zinc-900">
        「{query}」に近い演出が見つかりませんでした
      </h3>
      <p className="mt-1.5 text-sm text-zinc-500">
        もう少し具体的な単語（カテゴリ、色、雰囲気）で書いてみてください。
      </p>
    </div>
  );
}

function Results({ results, query }: { results: MatchResult[]; query: string }) {
  const top = results[0];
  const others = results.slice(1);
  return (
    <div className="space-y-10">
      {/* top match */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-500">
            Top Match
          </span>
          <span className="h-px flex-1 bg-zinc-200" />
          <span className="font-mono text-[11px] text-zinc-400">
            score {top.score.toFixed(1)}
          </span>
        </div>
        <TopCard result={top} />
      </section>

      {/* other matches */}
      {others.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Other Matches
            </span>
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="font-mono text-[11px] text-zinc-400">
              {others.length} 件
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r) => (
              <ResultCard key={r.pattern.id} result={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TopCard({ result }: { result: MatchResult }) {
  const p = result.pattern;
  const cat = CATEGORIES.find((c) => c.slug === p.category);
  return (
    <Link
      href={`/patterns/${p.id}`}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lift lg:grid-cols-[1.1fr,1fr]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-50/70 lg:aspect-auto">
        <PatternPreview id={p.id} />
      </div>
      <div className="flex flex-col justify-center gap-3 border-t border-zinc-100 p-6 lg:border-t-0 lg:border-l">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-medium text-zinc-700">
            {cat?.name}
          </span>
          {p.mood.slice(0, 2).map((m) => (
            <span key={m} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-zinc-700">
              {m}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900">
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600">{p.useCase}</p>
        {result.reasons.length > 0 && (
          <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">
            <div className="text-[10px] uppercase tracking-wider text-violet-600">
              なぜマッチしたか
            </div>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {result.reasons.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-violet-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-violet-700"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
          詳細・コードを見る
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

function ResultCard({ result }: { result: MatchResult }) {
  const p = result.pattern;
  const cat = CATEGORIES.find((c) => c.slug === p.category);
  return (
    <Link
      href={`/patterns/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-50/70">
        <PatternPreview id={p.id} />
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-700 shadow">
          {result.score.toFixed(1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-zinc-100 p-4">
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
          {cat?.name}
        </span>
        <h3 className="font-display text-[15px] font-semibold leading-snug tracking-tight text-zinc-900">
          {p.title}
        </h3>
        {result.reasons.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1">
            {result.reasons.slice(0, 3).map((r) => (
              <li
                key={r}
                className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] text-violet-700"
              >
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
