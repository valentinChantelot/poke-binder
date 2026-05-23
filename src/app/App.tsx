import { useState } from "react";
import { DEFAULT_SET_FOR_V1 } from "../config/sets";
import { CardList } from "../features/cardList/CardList";
import { SetSelector } from "../features/setSelector/SetSelector";

function App() {
  const [selectedSetId, setSelectedSetId] = useState(DEFAULT_SET_FOR_V1);

  return (
    <>
      <SetSelector value={selectedSetId} onChange={setSelectedSetId} />
      <CardList setId={selectedSetId} />
    </>
  );
}

export default App;
