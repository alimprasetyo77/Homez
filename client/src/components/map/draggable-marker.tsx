import { Marker, Popup } from "react-leaflet";
import { useMemo, useRef } from "react";
import L, { LatLngExpression } from "leaflet";

interface Props {
  position: LatLngExpression;
  onDragEnd: (position: [number, number]) => void;
}

export const DraggableMarker = ({ position, onDragEnd }: Props) => {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const latlng = marker.getLatLng();
          onDragEnd([latlng.lat, latlng.lng]);
        }
      },
    }),
    [onDragEnd]
  );

  return (
    <Marker draggable eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup>You can drag me!</Popup>
    </Marker>
  );
};
