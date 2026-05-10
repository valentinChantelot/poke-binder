import TCGdex from "@tcgdex/sdk";
import { DEFAULT_LOCALE } from "../../config/locale";

const tcgdex = new TCGdex(DEFAULT_LOCALE);

export async function getSetFromTCGDex(id: string) {
  const set = await tcgdex.set.get(id);
  return set;
}
