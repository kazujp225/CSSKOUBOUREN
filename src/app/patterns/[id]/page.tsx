import { notFound } from "next/navigation";
import Link from "next/link";
import { PATTERN_BY_ID } from "@/data/all";
import { CATEGORIES } from "@/data/categories";
import { PatternPreview } from "@/components/previews";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeTabs } from "@/components/CodeTabs";
import { PatternCard } from "@/components/PatternCard";
import { ChevronLeft } from "lucide-react";

const DIFF_LABEL = { easy: "★ かんたん", medium: "★★ ふつう", hard: "★★★ むずかしい" } as const;

export default function PatternDetailPage({ params }: { params: { id: string } }) {
  const p = PATTERN_BY_ID[params.id];
  if (!p) notFound();

  const cat = CATEGORIES.find((c) => c.slug === p.category);
  const similar = (p.similar ?? []).map((id) => PATTERN_BY_ID[id]).filter(Boolean);

  return (
    <div className="space-y-12">
      {/* breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Link href="/patterns" className="inline-flex items-center gap-1 hover:text-zinc-900">
          <ChevronLeft size={14} /> 演出一覧
        </Link>
        <span aria-hidden>/</span>
        <span>{cat?.name}</span>
        <span aria-hidden>/</span>
        <span className="text-zinc-700">{p.title}</span>
      </div>

      {/* header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-700">
            {cat?.name}
          </span>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 font-medium text-violet-700">
            {DIFF_LABEL[p.difficulty]}
          </span>
          {p.mood.map((m) => (
            <span key={m} className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
              {m}
            </span>
          ))}
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-zinc-600"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
          {p.title}
        </h1>
        <p className="max-w-3xl text-zinc-600">{p.useCase}</p>
      </header>

      {/* preview */}
      <section className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            Preview
          </span>
          <span className="rounded-full border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10px] text-zinc-500">
            {p.id}
          </span>
        </div>
        <div className="aspect-[16/9] w-full bg-zinc-50/70">
          <PatternPreview id={p.id} />
        </div>
      </section>

      {/* meta info */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Info title="どんな効果があるか" body={p.effect} />
        <Info title="向いているサイト" list={p.suitableFor} />
        <Info title="使う場面" body={p.useCase} />
        <Info title="NGな使い方" body={p.badUsage} tone="warn" />
      </section>

      {/* code */}
      <section className="space-y-4">
        <SectionLabel eyebrow="Code" title="コード" />
        <p className="text-sm text-zinc-500">
          プロジェクトに合わせて、HTML / CSS / Tailwind / React から選べます。
        </p>
        <CodeTabs
          tabs={[
            { key: "tailwind", label: "Tailwind", lang: "tsx", code: p.tailwindCode },
            { key: "react", label: "React", lang: "tsx", code: p.reactCode },
            { key: "html", label: "HTML", lang: "html", code: p.htmlCode },
            { key: "css", label: "CSS", lang: "css", code: p.cssCode },
          ]}
        />
      </section>

      {/* claude prompt */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-6 items-center rounded-md bg-gradient-to-r from-violet-500 to-blue-500 px-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Claude
          </span>
          <SectionLabel eyebrow="Prompt" title="Claude Code 用プロンプト" />
        </div>
        <p className="text-sm text-zinc-500">
          そのまま Claude Code に貼り付けてください。プロジェクトの文脈に合わせて適宜調整を。
        </p>
        <CodeBlock code={p.claudePrompt} lang="prompt" />
      </section>

      {/* similar */}
      {similar.length > 0 && (
        <section className="space-y-5">
          <SectionLabel eyebrow="Similar" title="類似演出" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <PatternCard key={s.id} pattern={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-500">
        {eyebrow}
      </div>
      <h2 className="mt-1 font-display text-xl font-semibold text-zinc-900">{title}</h2>
    </div>
  );
}

function Info({
  title,
  body,
  list,
  tone = "default",
}: {
  title: string;
  body?: string;
  list?: string[];
  tone?: "default" | "warn";
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        tone === "warn"
          ? "border-rose-200 bg-rose-50/60"
          : "border-zinc-200/70 bg-white shadow-soft"
      }`}
    >
      <h3
        className={`font-display text-[14px] font-semibold ${
          tone === "warn" ? "text-rose-700" : "text-zinc-900"
        }`}
      >
        {title}
      </h3>
      {body && (
        <p
          className={`mt-2.5 text-sm leading-relaxed ${
            tone === "warn" ? "text-rose-700" : "text-zinc-700"
          }`}
        >
          {body}
        </p>
      )}
      {list && (
        <ul className="mt-2.5 space-y-1.5 text-sm text-zinc-700">
          {list.map((l) => (
            <li key={l} className="flex gap-2">
              <span className="mt-2 inline-block h-1 w-1 rounded-full bg-zinc-400" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
