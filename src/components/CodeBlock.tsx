"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  lang = "tsx",
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d14]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-500">
          <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono uppercase tracking-wide text-zinc-400">
            {lang}
          </span>
          {filename && <span className="text-zinc-500">{filename}</span>}
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <pre className="max-h-[480px] overflow-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono text-zinc-200">{code}</code>
      </pre>
    </div>
  );
}
