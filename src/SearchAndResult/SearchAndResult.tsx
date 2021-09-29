import { Input, Tree } from "antd";
import { Key } from "rc-tree/lib/interface";
import { createRef, useEffect, useState } from "react";
import { treeData, VisibleMap, VisibleSpecMap } from "../constants";
import useClickInside from "../hooks/useClickInside";
import useClickOutside from "../hooks/useClickOutside";
import NewNode from "../NewNode/NewNode";
import Node from "../Node/Node";
import {
  Data,
  DataLoop,
  TreeData,
  VisibleMapType,
  VisibleSpecMapType,
} from "../type";
import { visibleSpecToValue, visibleToValue } from "../utils";
import "./SearchAndResult.css";

const { Search } = Input;

interface Props {
  isOpen: boolean;
  isNodeSelectProps: boolean;
  handleDataList: (
    gData: TreeData[],
    keyNodeSelect: string | undefined
  ) => void;
  handleOutside: (isOutside: boolean) => void;
  handleClose: (isClose: boolean) => void;
  handleVisible: (isOpen: boolean) => void;
  handleVisibleSpec: (isOpen: boolean) => void;
}

const dataList: Data[] = [];
const generateList = (data: Data[]): void => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: data[i].title });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(treeData);

const getParentKey = (key: string, tree: TreeData[]): string | undefined => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const SearchAndResult: React.FC<Props> = ({
  isOpen,
  handleDataList,
  handleOutside,
  handleClose,
  handleVisible,
  handleVisibleSpec,
}) => {
  const [count, setCount] = useState<number>(0);
  const [newNodeArray, setNewNodeArray] = useState<{ id: number }[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [_gData, setGData] = useState<TreeData[]>(treeData);
  const [keyNodeSelect, setKeyNodeSelect] = useState<string | undefined>(
    undefined
  );
  const [isOutside, setOutside] = useState<boolean>(true);
  const [isVisibleOpen, setVisibleOpen] = useState<boolean>(false);
  const [isVisibleSpecOpen, setVisibleSpecOpen] = useState<boolean>(false);
  const [isNodeSelect, setNodeSelect] = useState<boolean>(false);

  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    handleDataList(_gData, keyNodeSelect);
  }, [handleDataList, _gData, keyNodeSelect]);

  useClickOutside(containerRef, () => onOutside(true));
  useClickInside(containerRef, () => onOutside(false));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, _gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys as Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const onExpand = (expandedKeys: Key[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const loop = (data: TreeData[] | DataLoop[]): DataLoop[] =>
    data.map((item: any) => {
      const text = item.titleText || item.title;
      const index = text.indexOf(searchValue);
      const beforeStr = text.substr(0, index);
      const afterStr = text.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <Node
            keyNodeSelect={item.key}
            selected
            text={searchValue}
            beforeStr={beforeStr}
            afterStr={afterStr}
            visible={VisibleMap[item.visible as VisibleMapType]}
            visibleSpec={
              item.visibleSpec
                ? item.visibleSpec.map(
                    (obj: VisibleSpecMapType) => VisibleSpecMap[obj]
                  )
                : undefined
            }
            handleNodeSelect={handleNodeSelect}
            handleNodeClick={handleNodeClick}
          />
        ) : (
          <Node
            keyNodeSelect={item.key}
            text={text}
            visible={VisibleMap[item.visible as VisibleMapType]}
            visibleSpec={
              item.visibleSpec
                ? item.visibleSpec.map(
                    (obj: VisibleSpecMapType) => VisibleSpecMap[obj]
                  )
                : undefined
            }
            handleNodeSelect={handleNodeSelect}
            handleNodeClick={handleNodeClick}
          />
        );
      if (item.children) {
        return {
          title,
          titleText: item.titleText,
          key: item.key,
          visible: item.visible,
          visibleSpec: item.visibleSpec,
          children: loop(item.children),
        };
      }

      return {
        title,
        titleText: item.titleText,
        key: item.key,
        visible: item.visible,
        visibleSpec: item.visibleSpec,
      };
    });

  const onDrop = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: TreeData[],
      key: string,
      callback: (dataI: TreeData, i: number, data: TreeData[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children as TreeData[], key, callback);
        }
      }
    };
    const data = [..._gData];

    // Find dragObject
    let dragObj = {};
    loop(data, dragKey, (item: TreeData, index: number, arr: TreeData[]) => {
      const parent = info.node.title.props;
      arr.splice(index, 1);
      dragObj = item;
      if (parent.visibleSpec) {
        item.visibleSpec = parent.visibleSpec.map((obj: VisibleSpecMapType) =>
          visibleSpecToValue(obj)
        );
      } else {
        item.visible = visibleToValue(parent.visible);
        item.visibleSpec = undefined;
      }
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj as TreeData);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj as TreeData);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: TreeData[] = [];
      let i: number = 0;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj as TreeData);
      } else {
        ar.splice(i + 1, 0, dragObj as TreeData);
      }
    }

    setGData(data);
  };

  const onOutside = (isOutside: boolean) => {
    setOutside(isOutside);
    handleOutside(isOutside);
  };

  const handleNodeSelect = (key: string) => {
    setKeyNodeSelect(key);
  };

  const handleNodeClick = (isNodeSelect: boolean) => {
    setNodeSelect(isNodeSelect);
  };

  const handleNewNodeDelete = (id: number) => {
    const temp = newNodeArray.filter((item) => item.id !== id);
    setNewNodeArray(temp);
  };

  const handleSave = (
    value: string,
    selectValue: VisibleMapType,
    selectSpecValue: VisibleSpecMapType[] | undefined,
    id: number
  ) => {
    const data = [..._gData];
    data.unshift({
      key: Date.now().toString(),
      title: value,
      visible: selectValue,
      visibleSpec: selectSpecValue,
    });
    setGData(data);
    generateList(data);
    handleNewNodeDelete(id);
  };

  const handleDelete = (id: number) => {
    handleNewNodeDelete(id);
  };

  const handleNewFolderAdd = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setNewNodeArray([...newNodeArray, { id: count }]);
    setCount(count + 1);
  };

  const handleVisibleOpen = (isOpen: boolean) => {
    setVisibleOpen(isOpen);
    handleVisible(isOpen);
  };

  const handleVisibleSpecOpen = (isOpen: boolean) => {
    setVisibleSpecOpen(isOpen);
    handleVisibleSpec(isOpen);
  };

  if (
    (isNodeSelect && !isOpen) ||
    (!isOpen && isOutside && !isVisibleOpen && !isVisibleSpecOpen)
  )
    return null;

  return (
    <div ref={containerRef} className="search-and-result-container">
      <div className="search-and-result">
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={onChange}
        />

        {newNodeArray.map((item) => (
          <NewNode
            key={item.id}
            handleSave={handleSave}
            handleDelete={handleDelete}
            id={item.id}
            handleVisibleOpen={handleVisibleOpen}
            handleVisibleSpecOpen={handleVisibleSpecOpen}
          />
        ))}
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          draggable
          blockNode
          onDrop={onDrop}
          treeData={loop(_gData)}
        />
      </div>
      <a
        href="/#"
        className="add-new-folder"
        onClick={(e) => handleNewFolderAdd(e)}
      >
        Add New Folder
      </a>
    </div>
  );
};

export default SearchAndResult;
