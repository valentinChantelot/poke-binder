import TCGdex from '@tcgdex/sdk';

export const tcgdex = () => {
  const tcgdex = new TCGdex('fr');

  (async () => {
    const card = await tcgdex.card.get('swsh3-136');
    console.log(card.name);
  })();
};
