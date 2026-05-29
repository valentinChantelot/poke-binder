import pb from "../client";
import type { SetCollection } from "./types";

export async function ensureSetCollection(
  setId: string,
): Promise<SetCollection> {
  try {
    return await pb
      .collection("set_collections")
      .getFirstListItem<SetCollection>(`set_id="${setId}"`);
  } catch {
    try {
      return await pb
        .collection("set_collections")
        // biome-ignore lint/style/useNamingConvention: PocketBase field name
        .create<SetCollection>({ set_id: setId });
    } catch {
      // Unique constraint violation: a concurrent request already created it
      return pb
        .collection("set_collections")
        .getFirstListItem<SetCollection>(`set_id="${setId}"`);
    }
  }
}
