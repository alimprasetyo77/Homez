import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { DraggableMarker } from "./handler";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { ICreateProperty } from "@/types/property-type";
import { MapClickHandler } from "./handler";
import { IReverseGeocode } from "@/types/geocode-type";
import { reverseGeocode } from "@/services/property-service";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapProps {
  position?: [number, number];
  interactive?: boolean;
}

const Map = ({ position = [-6.2, 106.816666], interactive }: MapProps) => {
  const { setValue } = useFormContext<ICreateProperty>();
  const [markerPos, setMarkerPos] = useState<[number, number]>(position as [number, number]);

  const { refetch } = useQuery<IReverseGeocode>({
    queryKey: ["location", markerPos],
    queryFn: async () => {
      const data = await reverseGeocode({ lat: markerPos[0], lon: markerPos[1] });
      setValue("location.address", data.display_name);
      return data;
    },
    enabled: false,
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {interactive ? (
        <>
          <DraggableMarker
            position={markerPos}
            onDragEnd={(newPos) => {
              setMarkerPos(newPos);
              refetch();
            }}
          />
          <MapClickHandler
            onClick={(pos) => {
              setMarkerPos(pos);
              refetch();
            }}
          />
        </>
      ) : (
        <Marker position={markerPos}>
          <Popup>You can drag me!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
