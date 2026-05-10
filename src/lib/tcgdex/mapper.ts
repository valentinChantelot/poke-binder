import type { Set as TCGSet } from "@tcgdex/sdk";
import type { CardSet } from "../../features/cardList/types";

export function mapTCGSetToCardSet(raw: TCGSet): CardSet {
  return {
    id: raw.id,
    name: raw.name,
    logo: `${raw.logo}.webp`,
    serie: raw.serie,
    cards: raw.cards.map((c) => ({
      id: c.id,
      localId: c.localId,
      name: c.name,
      image: c.image ? `${c.image}/high.webp` : undefined,
    })),
  };
}
