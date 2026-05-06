import { GenerateUI } from "@/components/GenerateUI";

type SearchParams = { q?: string };

export default function GeneratePage({ searchParams }: { searchParams: SearchParams }) {
  return <GenerateUI initialQuery={searchParams.q ?? ""} />;
}
