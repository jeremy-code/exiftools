import { useEffect, useMemo, useState } from "react";

import { LatLng, type Map as LeafletMap } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { GeoSearchControl } from "#components/map/GeoSearchControl";
import { Map } from "#components/map/Map";
import { icon } from "#components/map/icon";
import { useGeoSearchLocation } from "#hooks/useGeoSearchLocation";
import { formatLatLng } from "#lib/leaflet/formatLatLng";
import { formatLatLngAsGeoUri } from "#lib/leaflet/formatLatLngAsGeoUri";

type ExifGpsMapProps = {
  latitude: number | undefined;
  longitude: number | undefined;
  altitude: number | undefined;
  setCoordinate: (coordinate: LatLng) => void;
};

const ExifGpsMap = ({
  latitude,
  longitude,
  altitude,
  setCoordinate,
}: ExifGpsMapProps) => {
  const coordinate = useMemo(
    () =>
      latitude !== undefined && longitude !== undefined ?
        new LatLng(latitude, longitude, altitude)
      : undefined,
    [latitude, longitude, altitude],
  );

  const [map, setMap] = useState<LeafletMap | null>(null);
  const { latLng: geoSearchLocation, label } = useGeoSearchLocation(map);

  if (
    geoSearchLocation !== null &&
    (coordinate === undefined || !geoSearchLocation.equals(coordinate))
  ) {
    setCoordinate(geoSearchLocation);
  }

  // Leaflet Map isn't controlled by map, so center={coordinate} does not update
  // as expected. Hence, using useEffect to pan whenenvr the coordinate changes
  useEffect(() => {
    if (coordinate) {
      map?.panTo(coordinate);
    }
  }, [map, coordinate]);

  return (
    <Map className="h-80 rounded" center={coordinate} ref={setMap}>
      <GeoSearchControl showMarker={false} />
      {coordinate !== undefined && (
        <Marker icon={icon} position={coordinate}>
          <Popup>
            {!!label && `${label}\n`}
            {`${formatLatLng(coordinate)} `}
            <a
              href={`https://www.openstreetmap.org/#map=18/${coordinate.lat}/${coordinate.lng}`}
              target="_blank"
            >
              (OSM)
            </a>{" "}
            <a href={formatLatLngAsGeoUri(coordinate)} target="_blank">
              (geo)
            </a>
          </Popup>
        </Marker>
      )}
    </Map>
  );
};

export { ExifGpsMap, type ExifGpsMapProps };
