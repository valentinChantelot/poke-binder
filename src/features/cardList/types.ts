type CardList = Array<LightCard>;

type Variants = {
  normal: boolean | undefined;
  reverse: boolean | undefined;
  holo: boolean | undefined;
  firstEdition: boolean | undefined;
};

type VariantsDetailed = {
  type: string;
  subtype: string | undefined;
  size: string | undefined;
  stamp: Array<string> | undefined;
  foil: string | undefined;
  variantId: string;
};

export type LightCard = {
  id: string;
  localId: string;
  name: string;
  image: string | undefined;
};

export type Card = {
  id: string;
  localId: string;
  name: string;
  image: string | undefined;
  rarity: string;
  category: string;

  // TODO : Remove variants from here, replaced by variantsDetailed. The mapping will verify : if no variantsDetailed are provided, use variants instead. Also, Add comment to explainn that variant is deprecated in TCGDex, explaining our mapping.
  variants: Variants | undefined;
  variantsDetailed: Array<VariantsDetailed> | undefined;
  // Pokemon Only
  types: Array<string> | undefined;
  // Trainer Only
  trainerType: string | undefined;
  // Energy Only
  energyType: string | undefined;
};

export type CardSet = {
  id: string;
  name: string;
  logo: string | undefined;
  serie: {
    id: string;
    name: string;
  };
  cards: CardList;
};
