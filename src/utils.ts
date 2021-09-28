import { VisibleMap, VisibleSpecMap } from "./constants";
import { TreeData, VisibleMapType, VisibleSpecMapType } from "./type";

export const visibleToValue = (visible: string): string => {
  let res = "";
  Object.keys(VisibleMap).forEach((item) => {
    if (VisibleMap[item as VisibleMapType] === visible) res = item;
  });
  return res;
};

export const visibleSpecToValue = (visibleSpec: string): string => {
  let res = "";
  Object.keys(VisibleSpecMap).forEach((item) => {
    if (VisibleSpecMap[item as VisibleSpecMapType] === visibleSpec) res = item;
  });
  return res;
};

export const newData = ({
  key,
  title,
  visible,
  visibleSpec,
  childKey,
  data,
}: {
  key: string;
  title: string;
  visible: VisibleMapType;
  visibleSpec: VisibleSpecMapType[] | undefined;
  childKey: string;
  data: TreeData[];
}) => {
  for (let i = 0; i < data.length; i++) {
    if (key === data[i].key) {
      if (data[i].children) {
        (data[i].children as TreeData[]).unshift({
          title,
          visible,
          visibleSpec,
          key: childKey,
        });
      } else {
        data[i].children = [{ title, visible, visibleSpec, key: childKey }];
      }
      return;
    }
    if (data[i].children)
      newData({
        key,
        title,
        visible,
        visibleSpec,
        childKey,
        data: data[i].children as TreeData[],
      });
  }
};
