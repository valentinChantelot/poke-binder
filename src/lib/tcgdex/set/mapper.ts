import type { SetResume, Set as TCGSet } from "@tcgdex/sdk";
import type { CardSet } from "../../../features/cardList/types";
import type { SetSummary } from "../../../features/setSelector/types";

export function mapRawSetToSetSummary(raw: SetResume): SetSummary {
  return {
    id: raw.id,
    name: raw.name,
  };
}

export function mapTCGSetToCardSet(raw: TCGSet): CardSet {
  return {
    id: raw.id,
    name: raw.name,
    logo: raw.logo ? `${raw.logo}.webp` : undefined,
    serie: { id: raw.serie.id, name: raw.serie.name },
    cards: raw.cards.map((c) => ({
      id: c.id,
      localId: c.localId,
      name: c.name,
      image: c.image ? `${c.image}/high.webp` : undefined,
    })),
  };
}
