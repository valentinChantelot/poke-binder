import { DEFAULT_SET_FOR_V1 } from "../config/sets";
import { CardList } from "../features/cardList/CardList";

function App() {
  return <CardList setId={DEFAULT_SET_FOR_V1} />;
}

export default App;
