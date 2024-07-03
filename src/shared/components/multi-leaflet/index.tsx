import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { MarkerIcon } from "@/shared/lib/image-config";
import "leaflet-geosearch/assets/css/leaflet.css";
const icon = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [50, 50],
  iconAnchor: [12, 41], // Icon anchor set to bottom point of the icon
});

interface IProps {
  locations: { lat: number; long: number; name?: string }[];
  onChange: any;
}
const MultiLeafletMap: FC<IProps> = ({ locations, onChange }) => {
  const [positions, setPositions] = useState<[number, number]>([
    27.7172, 85.324,
  ]); // Coordinates for Nepal

  // Leaflet Geosearch
  const GeoSearch = () => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = GeoSearchControl({
        provider: provider,
        showMarker: true,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        popupFormat: ({ query, result }: { query: any; result: any }) =>
          result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: false,
        searchLabel: "Enter address",
        keepResult: true,
      });

      map.addControl(searchControl);
      // Cleanup function
      return () => {
        map.removeControl(searchControl);
      };
    }, []);
    return null;
  };

  const Markers: FC<{ locations: IProps["locations"] }> = ({ locations }) => {
    const map = useMap();

    useEffect(() => {
      if (locations.length > 0) {
        map.flyTo([locations[0].lat, locations[0].long], 13); // Optionally center the map around the first location
      }
    }, [locations, map]);

    return (
      <>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.long]}
            icon={icon}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </>
    );
  };

  const ChangeCursorOnDrag = () => {
    const map = useMap();

    useMapEvents({
      mouseover: () => {
        map.getContainer().style.cursor = "pointer";
      },
      mouseout: () => {
        map.getContainer().style.cursor = "";
      },
      dragstart: () => {
        map.getContainer().style.cursor = "grabbing";
      },
      dragend: () => {
        map.getContainer().style.cursor = "pointer";
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={positions}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers locations={locations} />
      <ChangeCursorOnDrag />
      <GeoSearch />
    </MapContainer>
  );
};

export default MultiLeafletMap;
