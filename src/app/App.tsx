import { DEFAULT_SET } from "../config/sets";
import { getSet } from "../lib/tcgdex/client";
import "./App.css";

async function App() {
    const set = await getSet(DEFAULT_SET);
    console.log(set);

    return <></>;
}

export default App;
