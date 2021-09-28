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
    title: "My folder 1",
    visible: "visible-to-everyone",
    visibleSpec: undefined,
    key: "0",
    children: [
      {
        title: "My folder 1-1",
        visible: "visible-to-everyone",
        visibleSpec: undefined,
        key: "1",
      },
      {
        title: "My folder 1-2",
        visible: "visible-to-specific-users",
        visibleSpec: ["me", "person-1"],
        key: "2",
      },
    ],
  },
  {
    title: "My folder 2",
    visible: "visible-to-everyone",
    visibleSpec: undefined,
    key: "3",
    children: [
      {
        title: "My folder 2-1",
        visible: "visible-to-only-me",
        visibleSpec: undefined,
        key: "4",
      },
      {
        title: "My folder 2-2",
        visible: "visible-to-everyone",
        visibleSpec: undefined,
        key: "5",
      },
    ],
  },
];
