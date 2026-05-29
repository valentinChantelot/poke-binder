import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  cleanupSetCollectionIfEmpty,
  ensureSetCollection,
} from "@/lib/pocketbase/setCollections";

export function useEnsureSetCollection(setId: string) {
  const query = useQuery({
    queryKey: ["set_collections", setId],
    queryFn: () => ensureSetCollection(setId),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    return () => {
      void cleanupSetCollectionIfEmpty(setId).catch(() => undefined);
    };
  }, [setId]);

  return query;
}
