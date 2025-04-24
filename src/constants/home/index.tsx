import { ICity, ILinkNavbar, ILinkOnSearch, IProperties } from "./types";

export const linkNavbar: ILinkNavbar[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "About",
    path: "/about",
  },
  {
    id: 3,
    title: "Contact",
    path: "/contact",
  },
  {
    id: 4,
    title: "Blog",
    path: "/blog",
  },
];

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
export type ITypeProperties = "House" | "Villa" | "Office" | "Apartments";
export const typeProperties = [
  {
    title: "House",
  },
  {
    title: "Villa",
  },
  {
    title: "Office",
  },
  {
    title: "Apartments",
  },
];

export const ListCities: ICity[] = [
  {
    id: 1,
    name: "Manhattan",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-1.png&w=384&q=75",
  },
  {
    id: 2,
    name: "San Diego",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-2.png&w=384&q=75",
  },
  {
    id: 3,
    name: "San Francisco",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-3.png&w=384&q=75",
  },
  {
    id: 4,
    name: "Los Angeles",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-4.png&w=384&q=75",
  },
  {
    id: 5,
    name: "California",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-5.png&w=384&q=75",
  },
  {
    id: 6,
    name: "New Jersey",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-6.png&w=384&q=75",
  },
  {
    id: 7,
    name: "Manhattan",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-1.png&w=384&q=75",
  },
  {
    id: 8,
    name: "San Diego",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-2.png&w=384&q=75",
  },
  {
    id: 9,
    name: "San Francisco",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-3.png&w=384&q=75",
  },
];

export const Properties: IProperties[] = [
  {
    id: 1,
    title: "Central Park Townhouse",
    type: "House",
    location: {
      city: "Manhattan",
      state: "NY",
      country: "USA",
    },
    price: 3850000,
    features: ["Private garden", "Brownstone facade", "Smart home system"],
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "La Jolla Oceanfront Villa",
    type: "Villa",
    location: {
      city: "San Diego",
      state: "CA",
      country: "USA",
    },
    price: 7500000,
    features: ["Infinity pool", "Private beach access", "Rooftop terrace"],
    image:
      "https://images.pexels.com/photos/1488267/pexels-photo-1488267.png?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Financial District Office",
    type: "Office",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    price: 3200000,
    features: ["Floor-to-ceiling windows", "Meeting rooms", "Fiber internet"],
    image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Hollywood Hills Luxury Apartment",
    type: "Apartments",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 2800000,
    features: ["City views", "Concierge service", "Sky lounge"],
    image:
      "https://images.pexels.com/photos/5825693/pexels-photo-5825693.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Silicon Valley Tech Office",
    type: "Office",
    location: {
      city: "California",
      state: "CA",
      country: "USA",
    },
    price: 1800000,
    features: ["Open floor plan", "EV charging", "Collaboration areas"],
    image: "https://images.pexels.com/photos/68631/pexels-photo-68631.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Jersey Waterfront Condo",
    type: "Apartments",
    location: {
      city: "New Jersey",
      state: "NJ",
      country: "USA",
    },
    price: 950000,
    features: ["Harbor views", "Fitness center", "24/7 security"],
    image:
      "https://images.pexels.com/photos/13203194/pexels-photo-13203194.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    title: "Tribeca Artist Loft",
    type: "Apartments",
    location: {
      city: "Manhattan",
      state: "NY",
      country: "USA",
    },
    price: 3200000,
    features: ["Exposed brick", "High ceilings", "Artist studio space"],
    image:
      "https://images.pexels.com/photos/31731218/pexels-photo-31731218/free-photo-of-modern-brick-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    title: "Malibu Beach Villa",
    type: "Villa",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 12500000,
    features: ["Private beach", "Home cinema", "Wine cellar"],
    image:
      "https://images.pexels.com/photos/31694848/pexels-photo-31694848/free-photo-of-modern-architecture-building-with-triangular-roofs.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    title: "Beverly Hills Mansion",
    type: "Villa",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 12500000,
    features: ["Private beach", "Home cinema", "Wine cellar"],
    image:
      "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    title: "Greenwich Family House",
    type: "House",
    location: {
      city: "Greenwich",
      state: "CT",
      country: "USA",
    },
    price: 4500000,
    features: ["Large backyard", "Fireplace", "Modern kitchen"],
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 11,
    title: "Suburban Dream House",
    type: "House",
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
    },
    price: 1200000,
    features: ["Swimming pool", "Two-car garage", "Open floor plan"],
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 12,
    title: "Countryside Retreat",
    type: "House",
    location: {
      city: "Nashville",
      state: "TN",
      country: "USA",
    },
    price: 850000,
    features: ["Wrap-around porch", "Wooded lot", "Fireplace"],
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 13,
    title: "Modern Suburban House",
    type: "House",
    location: {
      city: "Seattle",
      state: "WA",
      country: "USA",
    },
    price: 950000,
    features: ["Smart home system", "Energy-efficient appliances", "Two-car garage"],
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 14,
    title: "Classic Colonial House",
    type: "House",
    location: {
      city: "Boston",
      state: "MA",
      country: "USA",
    },
    price: 1500000,
    features: ["Brick exterior", "Formal dining room", "Hardwood floors"],
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
