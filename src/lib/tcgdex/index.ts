import { queryOptions } from "@tanstack/react-query";
import type { CardSet } from "../../features/cardList/types";
import { getSetFromTCGDex } from "./_client";
import { mapTCGSetToCardSet } from "./_mapper";

export const cardSetQuery = (setId: string) =>
  queryOptions<CardSet>({
    queryKey: ["tcgdex", "set", setId],
    queryFn: async () => {
      const raw = await getSetFromTCGDex(setId);
      if (!raw) {
        throw new Error(
          `Set not found: ${setId}. Error from TCGdex, probably an invalid set ID.`,
        );
      }
      return mapTCGSetToCardSet(raw);
    },
  });
