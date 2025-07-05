export type ListLinkSearch = "buy" | "rent" | "sold";

export interface ILinkOnSearch {
  id: number;
  title: ListLinkSearch;
}

export interface ILinkNavbar {
  id: number;
  title: string;
  path: string;
}
export interface IProperties {
  id: number;
  title: string;
  type: string;
  location: Location;
  price: number;
  features: string[];
  image: string;
  listingStatus: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
}
