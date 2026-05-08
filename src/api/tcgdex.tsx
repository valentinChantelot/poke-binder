import TCGdex from "@tcgdex/sdk";

export const tcgdex = () => {
  const tcgdex = new TCGdex("fr");

  const getSet = async (id: string) => {
    const set = await tcgdex.fetch("sets", id);
    return set;
  };

  const getIllustration = async (url: string) => {
    const illustration = await fetch(`${url}/high.webp`)
    return illustration
  }

  return {
    getSet,
    getIllustration
  };
};
