import type { CardSet } from "../../features/cardList/types";
import { getSetFromTCGDex } from "./_client";
import { mapTCGSetToCardSet } from "./_mapper";

export async function fetchSet(setId: string): Promise<CardSet> {
  const raw = await getSetFromTCGDex(setId);

  if (!raw) {
    throw new Error(
      `Set not found: ${setId}. Error from TCGdex, probably an invalid set ID.`,
    );
  }

  return mapTCGSetToCardSet(raw);
}
