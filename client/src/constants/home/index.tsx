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
];
export type ITypeProperties = "House" | "Villa" | "Office" | "Apartments";
export const propertiesTypeOptions = ["All", "House", "Villa", "Office", "Apartments"];

export const typeProperties: { title: ITypeProperties; image?: string }[] = [
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
    title: "Apartments",
    image:
      "https://images.unsplash.com/photo-1679211934250-aa8512613468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFwYXJ0ZW1lbnRzJTIwQnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
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
    listingStatus: "buy",
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
    listingStatus: "buy",
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
    listingStatus: "rent",
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
    listingStatus: "rent",
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
    listingStatus: "buy",
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
    listingStatus: "rent",
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
    listingStatus: "buy",
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
    listingStatus: "buy",
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
    listingStatus: "buy",
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
    listingStatus: "rent",
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
    listingStatus: "buy",
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
    listingStatus: "rent",
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
    listingStatus: "buy",
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
    listingStatus: "rent",
  },
  {
    id: 15,
    title: "Downtown Loft",
    type: "Apartments",
    location: {
      city: "Manhattan",
      state: "NY",
      country: "USA",
    },
    price: 2200000,
    features: ["Open concept", "Exposed beams", "City skyline views"],
    image: "https://images.pexels.com/photos/123456/pexels-photo-123456.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "rent",
  },
  {
    id: 16,
    title: "Luxury Beachfront Condo",
    type: "Apartments",
    location: {
      city: "San Diego",
      state: "CA",
      country: "USA",
    },
    price: 3000000,
    features: ["Ocean views", "Private balcony", "Resort amenities"],
    image: "https://images.pexels.com/photos/654321/pexels-photo-654321.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "buy",
  },
  {
    id: 17,
    title: "Historic Brownstone",
    type: "House",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    price: 4500000,
    features: ["Original woodwork", "Fireplace", "Garden"],
    image: "https://images.pexels.com/photos/789012/pexels-photo-789012.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "buy",
  },
  {
    id: 18,
    title: "Modern Farmhouse",
    type: "House",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 850000,
    features: ["Large porch", "Open floor plan", "Sustainable materials"],
    image: "https://images.pexels.com/photos/345678/pexels-photo-345678.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "rent",
  },
  {
    id: 19,
    title: "Penthouse Suite",
    type: "Apartments",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    price: 5000000,
    features: ["Private rooftop", "Jacuzzi", "Panoramic views"],
    image: "https://images.pexels.com/photos/234567/pexels-photo-234567.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "buy",
  },
  {
    id: 20,
    title: "Charming Cottage",
    type: "House",
    location: {
      city: "Manhattan",
      state: "NY",
      country: "USA",
    },
    price: 400000,
    features: ["Cozy interior", "Fire pit", "Mountain views"],
    image: "https://images.pexels.com/photos/456789/pexels-photo-456789.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "rent",
  },
  {
    id: 21,
    title: "Urban Studio",
    type: "Apartments",
    location: {
      city: "Los Angeles",
      state: "CA",
      country: "USA",
    },
    price: 750000,
    features: ["Compact design", "City center location", "Modern amenities"],
    image: "https://images.pexels.com/photos/567890/pexels-photo-567890.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "rent",
  },
  {
    id: 22,
    title: "Luxury Mountain Retreat",
    type: "House",
    location: {
      city: "San Diego",
      state: "CA",
      country: "USA",
    },
    price: 12000000,
    features: ["Ski-in/ski-out", "Hot tub", "Stunning views"],
    image: "https://images.pexels.com/photos/678901/pexels-photo-678901.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "buy",
  },
  {
    id: 23,
    title: "Coastal Retreat",
    type: "Villa",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    price: 3000000,
    features: ["Beach access", "Outdoor shower", "Spacious deck"],
    image: "https://images.pexels.com/photos/789123/pexels-photo-789123.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "rent",
  },
  {
    id: 24,
    title: "Elegant Townhouse",
    type: "House",
    location: {
      city: "Manhattan",
      state: "NY",
      country: "USA",
    },
    price: 2200000,
    features: ["Rooftop terrace", "Gourmet kitchen", "Historic charm"],
    image: "https://images.pexels.com/photos/890123/pexels-photo-890123.jpeg?auto=compress&cs=tinysrgb&w=600",
    listingStatus: "buy",
  },
];
