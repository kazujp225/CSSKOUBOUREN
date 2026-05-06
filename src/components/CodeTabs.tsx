"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

type Tab = { key: string; label: string; lang: string; code: string };

export function CodeTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active === t.key
                ? "bg-zinc-900 text-white"
                : "border border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={current.code} lang={current.lang} />
    </div>
  );
}
