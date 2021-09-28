import React, { useState } from "react";
import { TreeSelect as TreeSelectAntd } from "antd";
import { TreeData } from "../type";

const { TreeNode } = TreeSelectAntd;

interface Props {
  treeData: TreeData[];
  handleNodeSelect: (value: string) => void;
}

function renderTree(data: TreeData[]): React.ReactNode {
  return data.map(({ title, key, children = [] }) => {
    return (
      <TreeNode key={key} value={key} title={title}>
        {children?.length && renderTree(children)}
      </TreeNode>
    );
  });
}

const TreeSelect: React.FC<Props> = ({ treeData, handleNodeSelect }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const onChange = (value: string) => {
    setValue(value);
    handleNodeSelect(value);
  };

  return (
    <TreeSelectAntd
      showSearch
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      {renderTree(treeData)}
    </TreeSelectAntd>
  );
};

export default TreeSelect;
