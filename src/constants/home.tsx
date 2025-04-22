interface ILinkOnSearch {
  id: number;
  title: "buy" | "rent" | "sold";
}

export const listLinkOnSearch: ILinkOnSearch[] = [
  {
    id: 1,
    title: "buy",
  },
  {
    id: 2,
    title: "rent",
  },
  {
    id: 3,
    title: "sold",
  },
];
