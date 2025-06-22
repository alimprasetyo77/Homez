import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useMemo, useRef } from "react";
import L, { LatLngExpression } from "leaflet";

interface Props {
  position: LatLngExpression;
  onDragEnd: (position: [number, number]) => void;
}

export const DraggableMarker = ({ position, onDragEnd }: Props) => {
  const markerRef = useRef<L.Marker>(null);
  const map = useMap();

  const eventHandlers: L.LeafletEventHandlerFnMap = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (!marker) return;

        const { lat, lng } = marker.getLatLng();
        onDragEnd([lat, lng]);
        map.panTo([lat, lng]);
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

export const MapClickHandler = ({ onClick }: { onClick: (latlng: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};
