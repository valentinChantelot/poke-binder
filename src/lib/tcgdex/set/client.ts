import TCGdex, { type SetResume, type Set as TCGSet } from "@tcgdex/sdk";
import { DEFAULT_LOCALE } from "../../../config/locale";

const tcgdex = new TCGdex(DEFAULT_LOCALE);

export async function getSetFromTCGDex(id: string): Promise<TCGSet | null> {
  return tcgdex.set.get(id);
}

export async function getSetsFromTCGDex(): Promise<Array<SetResume>> {
  return tcgdex.set.list();
}
