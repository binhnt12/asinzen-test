import { VisibleMap, VisibleSpecMap } from "./constants";
import { VisibleMapType, VisibleSpecMapType } from "./type";

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
