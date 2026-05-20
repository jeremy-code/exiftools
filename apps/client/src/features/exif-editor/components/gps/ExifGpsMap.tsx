import { useEffect, useState } from "react";

import { LatLng, type Map as LeafletMap } from "leaflet";
import { cn } from "tailwind-variants";

import { DraggableMarker } from "#components/map/DraggableMarker";
import { GeoSearchControl } from "#components/map/GeoSearchControl";
import { GpsPopup } from "#components/map/GpsPopup";
import { Map, type MapProps } from "#components/map/Map";
import { useGeoSearchLocation } from "#hooks/useGeoSearchLocation";

type ExifGpsMapProps = {
  coordinate: LatLng | undefined;
  setCoordinate: (coordinate: LatLng) => void;
} & MapProps;

const ExifGpsMap = ({
  className,
  coordinate,
  setCoordinate,
  ...props
}: ExifGpsMapProps) => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const { label, latLng: geoSearchLocationLatLng } = useGeoSearchLocation(
    map,
    ({ location }) => {
      const newLatLng = new LatLng(location.y, location.x, coordinate?.alt);
      if (coordinate === undefined || !coordinate.equals(newLatLng)) {
        setCoordinate(newLatLng);
      }
    },
  );

  // Leaflet Map isn't controlled by map, so center={coordinate} does not update
  // as expected. Hence, using useEffect to pan whenenvr the coordinate changes
  useEffect(() => {
    if (coordinate !== undefined) {
      map?.panTo(coordinate);
    }
  }, [map, coordinate]);

  return (
    <Map
      className={cn("h-65 rounded", className)}
      center={coordinate}
      ref={setMap}
      {...props}
    >
      <GeoSearchControl showMarker={false} />
      {coordinate !== undefined && (
        <DraggableMarker
          position={coordinate}
          onDragEnd={(event) => {
            const newCoordinate = event.target.getLatLng();
            if (coordinate === undefined || !newCoordinate.equals(coordinate)) {
              setCoordinate(newCoordinate);
            }
          }}
        >
          <GpsPopup
            coordinate={coordinate}
            label={
              geoSearchLocationLatLng?.equals(coordinate) && label !== null ?
                label
              : undefined
            }
          />
        </DraggableMarker>
      )}
    </Map>
  );
};

export { ExifGpsMap, type ExifGpsMapProps };
