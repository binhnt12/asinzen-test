import { Button } from "antd";
import { useState } from "react";
import "./App.css";
import SearchAndResult from "./SearchAndResult/SearchAndResult";
import TreeSelect from "./TreeSelect/TreeSelect";
import { TreeData } from "./type";

function App() {
  const [treeData, setTreeData] = useState<TreeData[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isVisibleSpec, setVisibleSpec] = useState<boolean>(false);
  const [isOutside, setOutside] = useState<boolean>(true);
  const [isNodeSelect, setNodeSelect] = useState<boolean>(false);
  const [keyNodeSelect, setKeyNodeSelect] = useState<string | undefined>(
    undefined
  );

  const handleDataList = (value: TreeData[], key: string | undefined): void => {
    setTreeData(value);
    setKeyNodeSelect(key);
  };

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleOutside = (value: boolean) => {
    setOutside(value);
  };

  const handleSetIsNodeSelect = (value: boolean) => {
    setNodeSelect(value);
  };

  const handleVisible = (value: boolean) => {
    setVisible(value);
  };

  const handleVisibleSpec = (value: boolean) => {
    setVisibleSpec(value);
  };

  return (
    <div className="App">
      <h1>Copy Data to Folder</h1>
      <TreeSelect
        treeData={treeData}
        keyNodeSelect={keyNodeSelect}
        handleOpen={handleOpen}
      />
      <div className="container">
        <SearchAndResult
          handleDataList={handleDataList}
          isOpen={isOpen}
          handleOutside={handleOutside}
          isNodeSelectProps={isNodeSelect}
          handleVisible={handleVisible}
          handleVisibleSpec={handleVisibleSpec}
          handleSetIsNodeSelect={handleSetIsNodeSelect}
        />
      </div>
      {((isNodeSelect && !isOpen) ||
        (!isOpen && isOutside && !isVisible && !isVisibleSpec)) && (
        <div className="action">
          <Button>CANCEL</Button>
          <Button type="primary">SAVE</Button>
        </div>
      )}
    </div>
  );
}

export default App;
