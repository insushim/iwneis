import { guides } from "@/lib/data/guides";
import GuideDetail from "./GuideDetail";

export function generateStaticParams() {
  return guides.map((guide) => ({
    id: guide.id,
  }));
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GuideDetail id={id} />;
}
