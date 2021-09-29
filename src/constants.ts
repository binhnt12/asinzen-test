import { TreeData } from "./type";

export const VisibleMap = {
  "visible-to-everyone": "Visible to Everyone",
  "visible-to-only-me": "Visible to only Me",
  "visible-to-specific-users": "Visible to specific users",
};

export const VisibleSpecMap = {
  me: "Me",
  "person-1": "Binhnt",
  "person-2": "Congnt",
};

export const treeData: TreeData[] = [
  {
    title: "My folder a",
    visible: "visible-to-everyone",
    visibleSpec: undefined,
    key: "0",
    children: [
      {
        title: "My folder a1",
        visible: "visible-to-everyone",
        visibleSpec: undefined,
        key: "1",
      },
      {
        title: "My folder a2",
        visible: "visible-to-specific-users",
        visibleSpec: ["me", "person-1"],
        key: "2",
      },
    ],
  },
  {
    title: "My folder b",
    visible: "visible-to-everyone",
    visibleSpec: undefined,
    key: "3",
    children: [
      {
        title: "My folder b-1",
        visible: "visible-to-only-me",
        visibleSpec: undefined,
        key: "4",
      },
      {
        title: "My folder b-2",
        visible: "visible-to-everyone",
        visibleSpec: undefined,
        key: "5",
      },
    ],
  },
];
