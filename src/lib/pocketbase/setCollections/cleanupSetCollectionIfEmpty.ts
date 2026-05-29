import pb from "../client";
import { buildSetIdFilter } from "./buildSetIdFilter";
import type { SetCollection } from "./types";

export async function cleanupSetCollectionIfEmpty(
  setId: string,
): Promise<void> {
  const [collection, entries] = await Promise.all([
    pb
      .collection("set_collections")
      .getFirstListItem<SetCollection>(buildSetIdFilter(setId))
      .catch(() => null),
    pb
      .collection("card_entries")
      .getList(1, 1, { filter: buildSetIdFilter(setId) }),
  ]);

  if (collection !== null && entries.totalItems === 0) {
    await pb.collection("set_collections").delete(collection.id);
  }
}
