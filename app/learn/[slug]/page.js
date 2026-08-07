import { LearningWorkspace } from "../../components/StudentActions";

export default function LearnPage({ params }) {
  return <main className="learning-page"><LearningWorkspace courseSlug={params.slug} /></main>;
}
