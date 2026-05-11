import { useQuery } from '@tanstack/react-query';
import { cardSetQuery } from '../../lib/tcgdex';
import './CardList.css';

type CardListProps = {
  setId: string;
};

export function CardList({ setId }: CardListProps) {
  const { data: set, isLoading, error } = useQuery(cardSetQuery(setId));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!set) return null;

  return (
    <>
      {set.name} from {set.serie.name}
      <img src={set.logo} alt={`Logo of ${set.name}`} />
      <section className="binder">
        {set.cards.map((c) => (
          <div key={c.id} className="binder__card">
            <p>{c.name}</p>
            <img src={c.image} alt={c.name} />
          </div>
        ))}
      </section>
    </>
  );
}
