import type { GeoSearchLocationEvent } from "#stores/geoSearchLocationStore";

const GEOSEARCH_LOCATION_EVENT = {
  type: "geosearch/showlocation",
  location: {
    x: -77.0365528,
    y: 38.8976387,
    label:
      "White House, 1600, Pennsylvania Avenue Northwest, Ward 2, Washington, District of Columbia, 20500, United States",
    bounds: [
      [38.8974904, -77.0368541],
      [38.8977959, -77.0362517],
    ],
    raw: {
      place_id: 347426922,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
      osm_type: "relation",
      osm_id: 19761182,
      lat: "38.8976387",
      lon: "-77.0365528",
      class: "office",
      type: "government",
      place_rank: 30,
      importance: 0.6958339719610435,
      addresstype: "office",
      name: "White House",
      display_name:
        "White House, 1600, Pennsylvania Avenue Northwest, Ward 2, Washington, District of Columbia, 20500, United States",
      boundingbox: ["38.8974904", "38.8977959", "-77.0368541", "-77.0362517"],
    },
  },
} satisfies GeoSearchLocationEvent;

export { GEOSEARCH_LOCATION_EVENT };
