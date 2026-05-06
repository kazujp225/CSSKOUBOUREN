export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">このサイトについて</h1>
      <p className="text-zinc-700">
        UI Spice は、CSS・デザインで詰まった人が
        <strong className="text-zinc-900">いつでも参照できる</strong>
        ことを目的に作った社内用 UI 演出辞典です。
      </p>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900">使い方</h2>
      <ul className="list-disc space-y-2 pl-6 text-zinc-700">
        <li>『どの場面で何を使えばサイトが良くなるか』をまず読む</li>
        <li>気に入ったらコードをコピペ（HTML / CSS / Tailwind / React の4種類用意）</li>
        <li>そのまま Claude Code に投げる時は『Claude 用プロンプト』をコピー</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900">編集方針</h2>
      <ul className="list-disc space-y-2 pl-6 text-zinc-700">
        <li>各演出に <strong className="text-zinc-900">使う場面 / 効果 / 向いているサイト / NGな使い方</strong> を必ず添える</li>
        <li>雰囲気タグ（高級感 / BtoB / ポップ など）で実務に近い形で検索できる</li>
        <li>難易度は ★/★★/★★★ の3段階。インターンが取り掛かりやすい順に並べる</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-zinc-900">追加方法</h2>
      <p className="text-zinc-700">
        新しい演出を追加するときは <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">src/data/patterns.ts</code>
        に Pattern オブジェクトを 1 件追加し、必要であれば
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">src/components/previews/index.tsx</code>
        にプレビューコンポーネントを追加してください。DB は不要です。最終的には 1 万件規模まで増やせる構造になっています。
      </p>
      <p className="text-zinc-700">
        ローディング演出は <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">src/data/loadings/</code>
        の archetype を増やせばパラメータの掛け算で大量に展開できます。
      </p>
    </article>
  );
}
