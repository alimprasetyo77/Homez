import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
  onChangePosition?: (data: IReverseGeocode) => void;
}
const DEFAULT_POSITION: [number, number] = [47.751076, -120.740135];

const Map = ({ position, interactive = false, onChangePosition }: MapProps) => {
  const [markerPos, setMarkerPos] = useState<[number, number]>(position ?? DEFAULT_POSITION);
  const mapRef = useRef<L.Map | null>(null);

  const mutation = useMutation({
    mutationKey: ["geocode"],
    mutationFn: (position: { lat: number; lon: number }) => reverseGeocode(position),
    onSuccess: (data) => {
      if (onChangePosition) {
        onChangePosition(data);
      }
    },
  });
  useEffect(() => {
    if (mapRef.current && position) {
      mapRef.current.panTo(position as [number, number]);
      setMarkerPos(position as [number, number]);
      mutation.mutate({ lat: position[0], lon: position[1] });
    }
  }, [position]);

  const MapEventsHandler = () => {
    const markerRef = useRef<L.Marker>(null);

    const map = useMapEvents({
      click(e) {
        const { lat, lon } = { lat: e.latlng.lat, lon: e.latlng.lng };
        setMarkerPos([lat, lon]);
        mutation.mutate({ lat, lon });
      },
    });

    const dragHandlers: L.LeafletEventHandlerFnMap = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (!marker) return;
          const { lat, lng: lon } = marker.getLatLng();
          setMarkerPos([lat, lon]);
          map.panTo([lat, lon]);
          mutation.mutate({ lat, lon });
        },
      }),
      [setMarkerPos, map]
    );

    return (
      <Marker draggable eventHandlers={dragHandlers} position={markerPos} ref={markerRef}>
        <Popup>You can drag me!</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={markerPos}
      zoom={interactive ? 5 : 13}
      scrollWheelZoom={interactive ? true : false}
      style={{ height: "500px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {interactive ? (
        <MapEventsHandler />
      ) : (
        <Marker position={markerPos}>
          <Popup>You position.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
