type CardList = Array<LightCard>;

type variants = {
  normal?: boolean;
  reverse?: boolean;
  holo?: boolean;
  firstEdition?: boolean;
};

export type LightCard = {
  id: string;
  localId: string;
  name: string;
  imageUrl?: string;
};

export type Card = {
  id: string;
  localId: string;
  name: string;
  image?: string;
  rarity: string;
  category: string;
  variants?: variants;
  // Pokemon Only
  types?: Array<string>;
  // Trainer Only
  trainerType?: string;
  // Energy Only
  energyType?: string;
};

export type CardSet = {
  id: string;
  name: string;
  logo?: string;
  serie: {
    id: string;
    name: string;
  };
  cards: CardList;
};
