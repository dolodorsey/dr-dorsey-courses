import ToolWorkspace from "../../components/ToolWorkspace";

export default function ToolPage({ params }) {
  return <main className="site-shell tool-page"><ToolWorkspace toolSlug={params.slug} /></main>;
}
