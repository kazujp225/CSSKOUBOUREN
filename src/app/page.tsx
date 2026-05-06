import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { PopularTags } from "@/components/PopularTags";
import { CategoryGrid } from "@/components/CategoryGrid";
import { PatternCard } from "@/components/PatternCard";
import { PATTERNS } from "@/data/patterns";
import { ALL_PATTERNS } from "@/data/all";

export default function Home() {
  const featured = PATTERNS.slice(0, 6);
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-zinc-200/70 bg-white px-6 py-16 shadow-soft sm:px-12 sm:py-24">
        {/* decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(0,0,0,.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        />
        {/* glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-10 h-72 w-72 rounded-full bg-violet-300/35 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 bottom-0 h-72 w-72 rounded-full bg-blue-300/30 blur-[120px]"
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-[11px] tracking-wide text-zinc-700 shadow-soft backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse-soft" />
            UI Effect Index — 社内用デザイン辞典
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-900 sm:text-[64px]">
            サイト制作で詰まったら、
            <br />
            <em className="not-italic font-medium italic bg-gradient-to-r from-violet-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              ここを見る。
            </em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            CSS・SVG・アニメーション・UI 演出を、
            <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-zinc-800">
              実務の使いどころ
            </span>
            ごとに探せる社内用デザイン辞典。コードと一緒に「いつ使うべきか」「Claude Code に投げるプロンプト」までセットで載せています。
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar autoFocus={false} />
          </div>

          <div className="mt-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              人気タグ
            </div>
            <div className="mt-3">
              <PopularTags />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <Link
              href="/patterns"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              全演出を見る
              <span aria-hidden>→</span>
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 shadow-soft">
              <span className="font-mono font-semibold text-zinc-900">
                {ALL_PATTERNS.length.toLocaleString()}
              </span>
              個の演出が登録されています
            </span>
          </div>
        </div>
      </section>

      {/* カテゴリ */}
      <section id="categories" className="space-y-7">
        <SectionHead
          eyebrow="Categories"
          title="カテゴリから探す"
          desc="作っているのが Hero か CTA かカードか — 役割で選ぶのが一番速い。"
        />
        <CategoryGrid />
      </section>

      {/* 注目演出 */}
      <section className="space-y-7">
        <div className="flex items-end justify-between gap-4">
          <SectionHead
            eyebrow="Featured"
            title="まずはこれ"
            desc="迷ったら使い回せる定番演出から。"
          />
          <Link
            href="/patterns"
            className="shrink-0 text-sm text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline"
          >
            全 {ALL_PATTERNS.length.toLocaleString()} 件を見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PatternCard key={p.id} pattern={p} />
          ))}
        </div>
      </section>

      {/* 思想 */}
      <section className="rounded-[28px] border border-zinc-200/70 bg-white p-8 shadow-soft sm:p-14">
        <SectionHead
          eyebrow="Why"
          title="このサイトの目的"
          desc="単なるコード集ではなく、判断するための辞典です。"
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Pillar
            n="01"
            title="使う場面が分かる"
            body="『この場面ではこういう演出を入れるとサイトが良くなる』を、若手・インターン・非デザイナーでも判断できるように。"
          />
          <Pillar
            n="02"
            title="効果とNGがセット"
            body="どう良くなるかと、やってはいけない使い方を必ず併記。雰囲気だけで真似て事故るのを防ぎます。"
          />
          <Pillar
            n="03"
            title="Claude Code にそのまま投げる"
            body="各演出には Claude Code 用の実装プロンプト付き。コピペで自分のプロジェクトに落とせます。"
          />
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-zinc-300" />
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-500">
          {eyebrow}
        </div>
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-900 sm:text-[34px]">
        {title}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">{desc}</p>
    </div>
  );
}

function Pillar({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6">
      <span className="absolute right-5 top-4 font-mono text-[11px] tracking-wider text-zinc-300">
        {n}
      </span>
      <h3 className="font-display text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
    </div>
  );
}
