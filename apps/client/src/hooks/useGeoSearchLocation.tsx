import { useEffect, useEffectEvent } from "react";

import { type LeafletEvent, type Map as LeafletMap } from "leaflet";

import {
  useGeoSearchLocationStore,
  type GeoSearchLocationEvent,
} from "#stores/geoSearchLocationStore";

const useGeoSearchLocation = (map: LeafletMap | null) => {
  const setLocationFromEvent = useGeoSearchLocationStore(
    (state) => state.setLocationFromEvent,
  );
  const onLocationChange = useEffectEvent(
    (event: LeafletEvent | GeoSearchLocationEvent) => {
      if (
        "location" in event &&
        typeof event.location === "object" &&
        event.location !== null
      ) {
        setLocationFromEvent(event);
      }
    },
  );

  useEffect(() => {
    if (map === null) {
      return;
    }

    map.on("geosearch/showlocation", onLocationChange);

    return () => {
      map.off("geosearch/showlocation", onLocationChange);
    };
  }, [map]);
};

export { useGeoSearchLocation, type GeoSearchLocationEvent };
