import { queryOptions } from "@tanstack/react-query";
import type { CardSet } from "../../../features/cardList/types";
import type { SetSummary } from "../../../features/setSelector/types";
import { getSetFromTCGDex, getSetsFromTCGDex } from "./client";
import { mapRawSetToSetSummary, mapTCGSetToCardSet } from "./mapper";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export const setsQuery = queryOptions<Array<SetSummary>>({
  queryKey: ["tcgdex", "sets"],
  queryFn: async () => {
    const raw = await getSetsFromTCGDex();
    return raw.map(mapRawSetToSetSummary);
  },
  staleTime: ONE_DAY_MS,
  gcTime: Number.POSITIVE_INFINITY,
});

export const cardSetQuery = (setId: string) =>
  queryOptions<CardSet>({
    queryKey: ["tcgdex", "set", setId],
    queryFn: async () => {
      const raw = await getSetFromTCGDex(setId);
      if (!raw) {
        throw new Error("Set not found. The provided set ID may be invalid.");
      }
      return mapTCGSetToCardSet(raw);
    },
    staleTime: ONE_DAY_MS,
    gcTime: Number.POSITIVE_INFINITY,
  });
