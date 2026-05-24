import { createFileRoute } from "@tanstack/react-router";
import { CardList } from "@/features/cardList/CardList";

export const Route = createFileRoute("/sets/$setId")({
  component: SetDetailPage,
});

function SetDetailPage() {
  const { setId } = Route.useParams();
  return <CardList setId={setId} />;
}
