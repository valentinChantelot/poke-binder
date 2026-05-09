import { DEFAULT_SET_FOR_V1 } from "../config/sets";
import { fetchSet } from "../lib/tcgdex";
import "./App.css";

async function App() {
  const set = await fetchSet(DEFAULT_SET_FOR_V1);
  console.log(set);

  return <></>;
}

export default App;
