import type { Set as TCGSet } from "@tcgdex/sdk";
import type { CardSet } from "../../features/cardList/types";

export function mapToSet(raw: TCGSet): CardSet {
    return {
        id: raw.id,
        name: raw.name,
        logo: raw.logo,
        serie: raw.serie,
        cards: raw.cards,
    };
}
