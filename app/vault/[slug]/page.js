import ToolWorkspace from "../../components/ToolWorkspace";

export default async function ToolPage({ params }) {
  const route = await params;
  return <main className="site-shell tool-page"><ToolWorkspace toolSlug={route.slug} /></main>;
}
