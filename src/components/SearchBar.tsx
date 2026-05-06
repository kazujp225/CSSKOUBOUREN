"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ initial = "", autoFocus = false }: { initial?: string; autoFocus?: boolean }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = q.trim() ? `/patterns?q=${encodeURIComponent(q.trim())}` : "/patterns";
    router.push(url);
  };
  return (
    <form
      onSubmit={submit}
      className="group relative flex w-full items-center rounded-full border border-zinc-200/80 bg-white px-5 py-3.5 shadow-soft transition focus-within:border-zinc-400 focus-within:shadow-lift"
    >
      <Search size={18} className="text-zinc-400" />
      <input
        autoFocus={autoFocus}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="演出を検索:  虫眼鏡 / スピナー / 占い / カード …"
        className="ml-3 w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      <span className="ml-2 hidden font-mono text-[10px] text-zinc-400 sm:inline">⏎</span>
      <button
        type="submit"
        className="ml-3 hidden rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-zinc-700 sm:inline-block"
      >
        検索
      </button>
    </form>
  );
}
