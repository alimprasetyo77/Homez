import { Camera, Check, DollarSign, Home, Star } from "lucide-react";
import { ILinkOnSearch } from "./types";
import { ICreateProperty, IProperty, IUpdateProperty } from "@/types/property-type";
import { useForm } from "react-hook-form";

export const listLinkOnSearch: ILinkOnSearch[] = [
  {
    id: 1,
    title: "buy",
  },
  {
    id: 2,
    title: "rent",
  },
];
export const propertiesTypeOptions = ["all", "house", "villa", "office", "apartment"];

export const typeProperties: { title: string; image?: string }[] = [
  {
    title: "House",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Villa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmlsbGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Office",
    image:
      "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8T2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Apartment",
    image:
      "https://images.unsplash.com/photo-1679211934250-aa8512613468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFwYXJ0ZW1lbnRzJTIwQnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
];

export const Steps = [
  { id: "verify", label: "Verify", icon: Check },
  { id: "details", label: "Details", icon: Home },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "photos", label: "Photos", icon: Camera },
  { id: "reviews", label: "Reviews", icon: Star },
];

export const AmenitiesList: { label: string; value: IProperty["amenities"][number] }[] = [
  { label: "AC", value: "AC" },
  { label: "Water Heater", value: "WATER_HEATER" },
  { label: "Kitchen Set", value: "KITCHEN_SET" },
  { label: "Furnished", value: "FURNISHED" },
  { label: "Private Pool", value: "PRIVATE_POOL" },
  { label: "Balcony", value: "BALCONY" },
  { label: "Garden", value: "GARDEN" },
  { label: "Garage", value: "GARAGE" },
  { label: "Security", value: "SECURITY" },
  { label: "CCTV", value: "CCTV" },
  { label: "Gym", value: "GYM" },
  { label: "Shared Pool", value: "SHARED_POOL" },
  { label: "Elevator", value: "ELEVATOR" },
  { label: "Playground", value: "PLAYGROUND" },
  { label: "Internet", value: "INTERNET" },
  { label: "Cable TV", value: "CABLE_TV" },
];

// SECTION CREATE | UPDATE
type FormData = ICreateProperty | IUpdateProperty;
type FieldNames = Parameters<ReturnType<typeof useForm<FormData>>["trigger"]>[0];

// Constants
export const STEP_VALIDATION_FIELDS: Record<number, FieldNames> = {
  1: ["type", "photoDocument"],
  2: ["title", "description", "location.address", "bedrooms", "bathrooms", "squareFeet", "amenities"],
  3: ["listingType", "price"],
  4: ["photos.main_photo", "photos.photo_1", "photos.photo_2", "photos.photo_3", "photos.photo_4"],
};
export const DEFAULT_FORM_VALUES: Partial<ICreateProperty> = {
  title: "",
  bathrooms: 0,
  bedrooms: 0,
  description: "",
  listingType: "",
  photoDocument: "",
  photos: {
    main_photo: "",
    photo_1: "",
    photo_2: "",
    photo_3: "",
    photo_4: "",
  },
  price: 0,
  squareFeet: 0,
  type: "",
  location: {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
  },
  amenities: [],
  isVerified: false,
  isFeatured: false,
};
