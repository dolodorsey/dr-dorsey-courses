import { LearningWorkspace } from "../../components/StudentActions";

export default async function LearnPage({ params }) {
  const route = await params;
  return <main className="learning-page"><LearningWorkspace courseSlug={route.slug} /></main>;
}
