import { useQuery } from "@tanstack/react-query";
import { ensureSetCollection } from "@/lib/pocketbase/setCollections";

// queryFn runs a find-or-create against PocketBase. This is intentionally
// idempotent (unique index on set_id) and local-only, making the side effect
// safe inside a query. retry:false prevents duplicate create attempts on error.
export function useEnsureSetCollection(setId: string) {
  return useQuery({
    queryKey: ["set_collections", setId],
    queryFn: () => ensureSetCollection(setId),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
}
