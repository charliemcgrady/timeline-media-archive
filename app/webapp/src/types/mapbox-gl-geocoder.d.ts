/// <reference types="mapbox-gl" />
/// <reference types="geojson" />

declare module __MapboxGeocoder {
  interface LngLatLiteral {
    lat: number;
    lng: number;
  }

  type Bbox = [number, number, number, number];

  interface Options {
    accessToken?: string;
    /** On geocoded result what zoom level should the map animate to when a bbox isn't found in the response. If a bbox is found the map will fit to the bbox. (optional, default 16) */
    zoom?: number;
    /** Override the default placeholder attribute value. (optional, default "Search") */
    placeholder?: string;
    /** If false, animating the map to a selected result is disabled. (optional, default true) */
    flyTo?: boolean;
    /** a proximity argument: this is a geographical point given as an object with latitude and longitude properties. Search results closer to this point will be given higher priority. */
    proximity?: LngLatLiteral;
    /** a bounding box argument: this is a bounding box given as an array in the format [minX, minY, maxX, maxY]. Search results will be limited to the bounding box. */
    bbox?: Bbox;
    /** a comma seperated list of types that filter results to match those specified. See https://www.mapbox.com/developers/api/geocoding/#filter-type for available types. */
    types?: string;
    /** a comma separated list of country codes to limit results to specified country or countries. */
    country?: string;
    /** Minimum number of characters to enter before results are shown. (optional, default 2) */
    minLength?: number;
    /** Maximum number of results to show. (optional, default 5) */
    limit?: number;
  }

  interface Results extends GeoJSON.FeatureCollection<GeoJSON.Point> {
    attribution: string;
    query: string[];
  }

  interface Result extends GeoJSON.Feature<GeoJSON.Point> {
    bbox: Bbox;
    center: number[];
    place_name: string;
    place_type: string[];
    relevance: number;
    text: string;
  }
}
declare module "@mapbox/mapbox-gl-geocoder";
