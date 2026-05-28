import { LatLng, LatLngBounds } from "leaflet";
import { describe, expect, test, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import { GEOSEARCH_LOCATION_EVENT } from "#__fixtures__/geoSearchLocationEvent";

import { useGeoSearchLocationStore } from "./geoSearchLocationStore";

vi.mock("zustand");

describe("useGeoSearchLocationStore", () => {
  test("initializes with no location", async () => {
    const { result } = await renderHook(() => useGeoSearchLocationStore());

    expect(result.current.location).toBeNull();
  });

  test("sets location", async () => {
    const { result, act } = await renderHook(() => useGeoSearchLocationStore());

    await act(() => {
      result.current.setLocationFromEvent(GEOSEARCH_LOCATION_EVENT);
    });

    const { x, y, label, bounds } = GEOSEARCH_LOCATION_EVENT.location;

    expect(result.current.location).toStrictEqual({
      latLng: new LatLng(y, x),
      label,
      bounds: new LatLngBounds(bounds[0], bounds[1]),
    });
  });
});
