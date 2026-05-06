export function Footer() {
  return (
    <footer className="mt-12 border-t border-zinc-200/80 py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-sm font-semibold text-zinc-900">UI Spice</div>
            <p className="mt-0.5 text-xs text-zinc-500">
              CSSとデザインで詰まったら、ここを見る。
            </p>
          </div>
          <p className="text-[11px] text-zinc-400">
            社内用 UI 演出辞典 / Claude Code 用プロンプト付き
          </p>
        </div>
      </div>
    </footer>
  );
}
