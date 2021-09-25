import TreeSelect from "./TreeSelect/TreeSelect";
import SearchAndResult from "./SearchAndResult/SearchAndResult";

import "./App.css";
import Searchable from "./SearchAndResult/Searchable";
import SearchTreeTest from "./SearchAndResult/SearchTreeTest";
import { GData } from "./@type";
import { useState } from "react";

function App() {
  const [_gData, setGData] = useState<GData[]>([]);
  const handleDataList = (value: GData[]) => {
    setGData(value);
  };

  return (
    <div className="App">
      <h1>Copy Data to Folder</h1>
      <TreeSelect gData={_gData} />
      <div className="container">
        <SearchAndResult handleDataList={handleDataList} />
        {/* <Searchable /> */}
        {/* <SearchTreeTest /> */}
        <a href="/#" className="add-new-folder">
          Add New Folder
        </a>
      </div>
    </div>
  );
}

export default App;
