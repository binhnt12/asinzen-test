import {
  CaretRightOutlined,
  DeleteFilled,
  FolderFilled,
  SaveFilled,
} from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { useState } from "react";
import { VisibleMap, VisibleSpecMap } from "../constants";
import { VisibleMapType, VisibleSpecMapType } from "../type";
import "./NewNode.css";

const { Option } = Select;

interface Props {
  id: number;
  handleSave: (
    value: string,
    selectValue: VisibleMapType,
    selectSpecValue: VisibleSpecMapType[] | undefined,
    id: number
  ) => void;
  handleDelete: (id: number) => void;
  handleVisibleOpen: (isOpen: boolean) => void;
  handleVisibleSpecOpen: (isOpen: boolean) => void;
}

const NewNode: React.FC<Props> = ({
  id,
  handleSave,
  handleDelete,
  handleVisibleOpen,
  handleVisibleSpecOpen,
}) => {
  const [value, setValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<VisibleMapType>(
    "visible-to-everyone"
  );
  const [selectSpecValue, setSelectSpecValue] = useState<
    VisibleSpecMapType[] | undefined
  >(undefined);
  function onSelectChange(value: VisibleMapType) {
    setSelectValue(value);
  }

  function onSelectSpecChange(value: VisibleSpecMapType[]) {
    setSelectSpecValue(value);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSave = () => {
    handleSave(value, selectValue, selectSpecValue, id);
  };

  const onDelete = () => {
    handleDelete(id);
  };

  const onVisibleFocus = () => {
    handleVisibleOpen(true);
  };

  const onVisibleBlur = () => {
    handleVisibleOpen(false);
  };

  const onVisibleSpecFocus = () => {
    handleVisibleSpecOpen(true);
  };

  const onVisibleSpecBlur = () => {
    handleVisibleSpecOpen(false);
  };

  return (
    <div className="new-node-container">
      <div className="icon-caret-right">
        <CaretRightOutlined />
      </div>
      <div className="folder">
        <FolderFilled className="icon-folder-filled" />
        <div className="content">
          <Input
            placeholder="Enter new folder name"
            className="input"
            value={value}
            onChange={(e) => onInputChange(e)}
          />
          <Select
            className="select"
            defaultValue="visible-to-everyone"
            onChange={onSelectChange}
            onFocus={onVisibleFocus}
            onBlur={onVisibleBlur}
          >
            {Object.keys(VisibleMap).map((item) => (
              <Option key={item} value={item}>
                {VisibleMap[item as VisibleMapType]}
              </Option>
            ))}
          </Select>
          <Select
            mode="multiple"
            className="select-multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={onSelectSpecChange}
            value={
              selectValue === "visible-to-specific-users"
                ? selectSpecValue
                : undefined
            }
            disabled={selectValue !== "visible-to-specific-users"}
            onFocus={onVisibleSpecFocus}
            onBlur={onVisibleSpecBlur}
          >
            {Object.keys(VisibleSpecMap).map((item) => (
              <Option key={item} value={item}>
                {VisibleSpecMap[item as VisibleSpecMapType]}
              </Option>
            ))}
          </Select>
          <div className="action">
            <DeleteFilled className="icon-delete-filled" onClick={onDelete} />
            <SaveFilled className="icon-save-filled" onClick={onSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNode;
