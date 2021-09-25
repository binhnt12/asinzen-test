import { Select } from "antd";
import SearchBar from "./SeachTree";

import "./App.css";

const { Option } = Select;

function App() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="App">
      <h1>Copy Data to Folder</h1>
      <Select
        defaultValue="lucy"
        style={{ width: 420 }}
        onChange={handleChange}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <div className="container">
        <SearchBar />
        <a href="/#" className="add-new-folder">
          Add New Folder
        </a>
      </div>
    </div>
  );
}

export default App;
