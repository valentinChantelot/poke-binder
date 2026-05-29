import { ClientResponseError } from "pocketbase";
import pb from "../client";
import { buildSetIdFilter } from "./buildSetIdFilter";
import type { SetCollection } from "./types";

export async function ensureSetCollection(
  setId: string,
): Promise<SetCollection> {
  try {
    return await pb
      .collection("set_collections")
      .getFirstListItem<SetCollection>(buildSetIdFilter(setId));
  } catch (err) {
    if (!(err instanceof ClientResponseError) || err.status !== 404) {
      throw err;
    }
    try {
      return await pb
        .collection("set_collections")
        // biome-ignore lint/style/useNamingConvention: PocketBase field name
        .create<SetCollection>({ set_id: setId });
    } catch {
      // Unique constraint violation: a concurrent request already created it
      return pb
        .collection("set_collections")
        .getFirstListItem<SetCollection>(buildSetIdFilter(setId));
    }
  }
}
