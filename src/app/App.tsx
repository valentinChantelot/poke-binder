import { useQuery } from "@tanstack/react-query";
import { DEFAULT_SET_FOR_V1 } from "../config/sets";
import { cardSetQuery } from "../lib/tcgdex";
import "./App.css";

function App() {
  const { data: set, isLoading, error } = useQuery(cardSetQuery(DEFAULT_SET_FOR_V1));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(set);

  return <></>;
}

export default App;
