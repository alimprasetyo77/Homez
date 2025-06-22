export interface IForwardGeoCode {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export interface IReverseGeocode extends IForwardGeoCode {
  address: {
    house_number: string;
    road: string;
    city_block: string;
    neighbourhood: string;
    suburb: string;
    city_district: string;
    city: string;
    "ISO3166-2-lvl4": string;
    region: string;
    "ISO3166-2-lvl3": string;
    postcode: string;
    country: string;
    country_code: string;
  };
}
