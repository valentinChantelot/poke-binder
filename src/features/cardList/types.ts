type CardList = Array<LightCard>;

type Variants = {
  normal?: boolean;
  reverse?: boolean;
  holo?: boolean;
  firstEdition?: boolean;
};

type VariantsDetailed = {
  type: string;
  subtype?: string;
  size?: string;
  stamp?: Array<string>;
  foil?: string;
  variantId: string;
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

  // TODO : Remove variants from here, replaced by variantsDetailed. The mapping will verify : if no variantsDetailed are provided, use variants instead. Also, Add comment to explainn that variant is deprecated in TCGDex, explaining our mapping.
  variants?: Variants;
  variantsDetailed?: Array<VariantsDetailed>;
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
