import { LatLng, LatLngBounds } from "leaflet";
import { create } from "zustand";

// https://github.com/smeijer/leaflet-geosearch#results
type GeoSearchLocationEvent = {
  type: "geosearch/showlocation";
  location: {
    x: number; // lon
    y: number; // lat
    label: string;
    bounds: [
      [lat: number, lng: number], // s, w
      [lat: number, lng: number], // n, e
    ];
    raw: unknown; // raw provider result
  };
};

type GeoSearchLocationStore = {
  location: {
    latLng: LatLng;
    label: string;
    bounds: LatLngBounds;
  } | null;
  setLocationFromEvent: (event: GeoSearchLocationEvent) => void;
};

const useGeoSearchLocationStore = create<GeoSearchLocationStore>((set) => ({
  location: null,
  setLocationFromEvent: (event) => {
    console.log(event);
    set((state) => {
      const prevLocation = state.location;
      const nextLatLng = new LatLng(event.location.y, event.location.x);
      const nextBounds = new LatLngBounds(
        new LatLng(...event.location.bounds[0]),
        new LatLng(...event.location.bounds[1]),
      );

      if (prevLocation === null) {
        return {
          location: {
            latLng: nextLatLng,
            label: event.location.label,
            bounds: nextBounds,
          },
        };
      }

      return {
        location: {
          // Only update reference if necessary
          latLng:
            prevLocation.latLng.equals(nextLatLng) ?
              prevLocation.latLng
            : nextLatLng,
          label: event.location.label,
          bounds:
            prevLocation.bounds.equals(nextBounds) ?
              prevLocation.bounds
            : nextBounds,
        },
      };
    });
  },
}));

export {
  useGeoSearchLocationStore,
  type GeoSearchLocationStore,
  type GeoSearchLocationEvent,
};
