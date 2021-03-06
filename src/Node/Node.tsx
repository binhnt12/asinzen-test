import { FolderFilled } from "@ant-design/icons";
import React, { createRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import "./Node.css";

interface Props {
  keyNodeSelect: string;
  text: string | never[];
  visible: string;
  visibleSpec: string[] | undefined;
  beforeStr?: string;
  afterStr?: string;
  selected?: boolean;
  handleNodeSelect: (keyNodeSelect: string) => void;
  handleNodeClick: (isNodeSelect: boolean) => void;
}

const Node: React.FC<Props> = ({
  keyNodeSelect,
  text,
  visible,
  visibleSpec,
  beforeStr,
  afterStr,
  selected,
  handleNodeSelect,
  handleNodeClick,
}) => {
  const nodeContainerRef = createRef<HTMLDivElement>();

  useClickOutside(nodeContainerRef, () => {
    handleNodeClick(false);
  });

  return (
    <div
      ref={nodeContainerRef}
      className="node-container"
      onClick={() => {
        handleNodeSelect(keyNodeSelect);
        handleNodeClick(true);
      }}
    >
      <FolderFilled className="icon-folder-filled" />
      {selected ? (
        <div className="content">
          <span className="title">
            {beforeStr}
            <span className="site-tree-search-value">{text}</span>
            {afterStr}
          </span>
          <div className="visible">
            {visibleSpec ? "Visible to " + visibleSpec.join(", ") : visible}
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="title">{text}</div>
          <div className="visible">
            {visibleSpec ? "Visible to " + visibleSpec.join(", ") : visible}
          </div>
        </div>
      )}
    </div>
  );
};

export default Node;
