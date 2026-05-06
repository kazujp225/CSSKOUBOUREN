import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#3b82f6] shadow-[0_4px_18px_rgba(124,92,255,.35)] transition group-hover:scale-105"
          >
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-white/90" />
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor">
              <path d="M12 2 L14 9 L21 11 L14 13 L12 20 L10 13 L3 11 L10 9 Z" />
            </svg>
          </span>
          <div className="leading-none">
            <div className="font-display text-[15px] font-semibold tracking-tight text-zinc-900">
              UI Spice
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
              UI Effect Index
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/generate"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <span aria-hidden>✦</span> AI で探す
          </Link>
          <Link
            href="/patterns"
            className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            演出一覧
          </Link>
          <Link
            href="/#categories"
            className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            カテゴリ
          </Link>
          <Link
            href="/about"
            className="hidden rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100/80 hover:text-zinc-900 sm:inline-block"
          >
            このサイトについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
