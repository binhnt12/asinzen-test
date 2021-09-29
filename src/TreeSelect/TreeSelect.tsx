import React, { useEffect, useState } from "react";
import { TreeSelect as TreeSelectAntd } from "antd";
import { TreeData } from "../type";
import "./TreeSelect.css";

const { TreeNode } = TreeSelectAntd;

interface Props {
  treeData: TreeData[];
  keyNodeSelect: string | undefined;
  handleOpen: (isOpen: boolean) => void;
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

const TreeSelect: React.FC<Props> = ({
  treeData,
  keyNodeSelect,
  handleOpen,
}) => {
  useEffect(() => {
    setValue(keyNodeSelect);
  }, [keyNodeSelect]);

  const [value, setValue] = useState<string | undefined>(undefined);

  const onDropdownVisibleChange = (isOpen: boolean) => {
    handleOpen(isOpen);
  };

  return (
    <div>
      <TreeSelectAntd
        style={{ width: "100%" }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onDropdownVisibleChange={onDropdownVisibleChange}
      >
        {renderTree(treeData)}
      </TreeSelectAntd>
    </div>
  );
};

export default TreeSelect;
