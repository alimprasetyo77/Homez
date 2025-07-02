export interface IFavorite {
  id: string;
  property: Property;
}

interface Property {
  id: string;
  status: string;
  listingType: string;
  price: number;
  title: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  type: string;
  createdAt: string;
  photos: {
    main_photo: string;
  };
}
