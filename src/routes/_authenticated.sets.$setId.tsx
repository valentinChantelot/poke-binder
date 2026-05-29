import { createFileRoute } from "@tanstack/react-router";
import { CardList } from "@/features/cardList/CardList";
import { useEnsureSetCollection } from "@/features/setCollection/useEnsureSetCollection";

export const Route = createFileRoute("/_authenticated/sets/$setId")({
  component: SetDetailPage,
});

function SetDetailPage() {
  const { setId } = Route.useParams();
  // Ensures a set_collections record exists for this set. Return value unused
  // until card management is wired in — at that point pass data to CardList.
  useEnsureSetCollection(setId);
  return <CardList setId={setId} />;
}
