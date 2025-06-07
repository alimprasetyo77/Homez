import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const usdCurrencyFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
};

export const convertToUrlSlug = (title: string) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};

export const checkProperty = (property: File | string | number | object | null | undefined): boolean => {
  if (property instanceof File) {
    return property.size > 0;
  }

  if (typeof property === "string") {
    return property.trim() !== "";
  }

  if (property && typeof property === "object") {
    return Object.keys(property).length > 0;
  }

  if (typeof property === "number") return true;
  return false;
};
