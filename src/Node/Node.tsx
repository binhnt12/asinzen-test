import { FolderFilled } from "@ant-design/icons";
import React from "react";
import "./Node.css";

interface Props {
  text: string | never[];
  visible: string;
  visibleSpec: string[] | undefined;
  beforeStr?: string;
  afterStr?: string;
  selected?: boolean;
}

const Node: React.FC<Props> = ({
  text,
  visible,
  visibleSpec,
  beforeStr,
  afterStr,
  selected,
}) => {
  return (
    <div className="node-container">
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
