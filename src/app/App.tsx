import { useQuery } from "@tanstack/react-query";
import { DEFAULT_SET_FOR_V1 } from "../config/sets";
import { cardSetQuery } from "../lib/tcgdex";
import "./App.css";

function App() {
  const {
    data: set,
    isLoading,
    error,
  } = useQuery(cardSetQuery(DEFAULT_SET_FOR_V1));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!set) return null;

  console.log(set);

  return (
    <>
      {set.name} from {set.serie.name}
      <img src={set.logo} alt={`Logo of ${set.name}`} />
      <section className="binder">
        {set.cards.map((c) => (
          <div key={c.id} className="binder__card">
            <p>{c.name}</p>
            <img src={c.imageUrl} alt={c.name} />
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
