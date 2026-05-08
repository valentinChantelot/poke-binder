import TCGdex from "@tcgdex/sdk";

export const tcgdex = () => {
  const tcgdex = new TCGdex("fr");

  const getSet = async (id: string) => {
    const set = await tcgdex.fetch("sets", id);
    return set;
  };

  const getSerie = async (id: string) => {
    const serie = await tcgdex.fetch("series", id);
    return serie;
  };

  return {
    getSet,
    getSerie,
  };
};
