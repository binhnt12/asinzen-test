import TreeSelect from "./TreeSelect/TreeSelect";
import SearchAndResult from "./SearchAndResult/SearchAndResult";

import "./App.css";
import { TreeData } from "./type";
import { useState } from "react";
import { Button } from "antd";

function App() {
  const [treeData, setTreeData] = useState<TreeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>("");

  const handleDataList = (value: TreeData[]) => {
    setTreeData(value);
  };

  const handleNodeSelect = (value: string) => {
    setSelectedNode(value);
  };

  return (
    <div className="App">
      <h1>Copy Data to Folder</h1>
      <TreeSelect treeData={treeData} handleNodeSelect={handleNodeSelect} />
      <div className="container">
        <SearchAndResult
          handleDataList={handleDataList}
          selectedNode={selectedNode}
        />
      </div>
      <div className="action">
        <Button>CANCEL</Button>
        <Button type="primary">SAVE</Button>
      </div>
    </div>
  );
}

export default App;
