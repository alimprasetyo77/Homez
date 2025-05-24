export type PropertyType = "house" | "apartment" | "office" | "villa";
export type PropertyStatus = "buy" | "rent";

export interface IProperty {
  id: string;
  title: string;
  description?: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  images: string[];
  isFeatured: boolean;
}
