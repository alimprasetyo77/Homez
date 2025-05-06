import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const usdCurrencyFormat =(value:number)=>{
  return  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export const convertToUrlSlug=(title:string) =>{
  return title.replace(/\s+/g, '-').toLowerCase();
}
