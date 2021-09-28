import React from "react";

export type Data = {
  key: string;
  title: string;
  children?: Data[];
};

export type TreeData = {
  key: string;
  title: string;
  visible: string;
  visibleSpec: VisibleSpecMapType[] | undefined;
  children?: TreeData[];
};

export type DataLoop = {
  key: string;
  title: React.ReactNode | string;
  titleText: string;
  visible: string | undefined;
  visibleSpec: VisibleSpecMapType[] | undefined;
  children?: DataLoop[];
};

export type VisibleMapType =
  | "visible-to-everyone"
  | "visible-to-only-me"
  | "visible-to-specific-users";

export type VisibleSpecMapType = "me" | "person-1" | "person-2";
