import { createFileRoute } from "@tanstack/react-router";
import { CardList } from "@/features/cardList/CardList";
import { useEnsureSetCollection } from "@/shared/hooks/useEnsureSetCollection";

export const Route = createFileRoute("/_authenticated/sets/$setId")({
  component: SetDetailPage,
});

function SetDetailPage() {
  const { setId } = Route.useParams();
  useEnsureSetCollection(setId);
  return <CardList setId={setId} />;
}
