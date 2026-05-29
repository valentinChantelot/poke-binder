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
    } catch (createErr) {
      if (
        !(createErr instanceof ClientResponseError) ||
        createErr.status !== 400
      ) {
        throw createErr;
      }
      // 400 = unique constraint: a concurrent request created the record first
      return pb
        .collection("set_collections")
        .getFirstListItem<SetCollection>(buildSetIdFilter(setId));
    }
  }
}
