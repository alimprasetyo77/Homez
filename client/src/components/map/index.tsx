import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { DraggableMarker } from "./draggable-marker";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { ICreateProperty } from "@/types/property-type";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({
  position = [-6.2, 106.816666],
  dragable,
}: {
  position?: [number, number];
  dragable?: boolean;
}) => {
  const { getValues, setValue } = useFormContext<ICreateProperty>();
  const [markerPos, setMarkerPos] = useState<[number, number]>(position as [number, number]);

  const { data: dataLocation, refetch } = useQuery({
    queryKey: ["location", markerPos[0], markerPos[1]],
    queryFn: async () => {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${markerPos[0]}&lon=${markerPos[1]}`
      );
      setValue("location.address", response.data.display_name);

      return response.data;
    },
    enabled: !!getValues("location.address"),
  });

  console.log(dataLocation);

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
      {dragable ? (
        <DraggableMarker
          position={markerPos}
          onDragEnd={(newPos) => {
            setMarkerPos(newPos);
            refetch();
          }}
        />
      ) : (
        <Marker position={markerPos}>
          <Popup>You can drag me!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
