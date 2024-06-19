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
  lat: number;
  long: number;
  onChange: any;
  address?: string;
}
const LeafletMap: FC<IProps> = ({ lat, long, onChange, address }) => {
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

  const Markers = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();
    useEffect(() => {
      map.flyTo([lat, long], 13); // flyTo provides animation
    }, [lat, long, map]);

    useMapEvents({
      click(e) {
        const newLat = e.latlng.lat;
        const newLong = e.latlng.lng;
        map.flyTo([newLat, newLong], 13);
        // inform parent about the change

        provider.search({ query: `${newLat}, ${newLong}` }).then((results) => {
          if (results && results.length > 0) {
            const address = results[0].label; // Get the address from the first result
            onChange(newLat, newLong, address);
          }
        });
        // onChange(newLat, newLong);
      },
      dragend(e) {
        const newPosition = e.target.getLatLng();
        map.flyTo([newPosition.lat, newPosition.lng], 13);

        // Reverse geocoding to get address
        provider
          .search({ query: `${newPosition.lat}, ${newPosition.lng}` })
          .then((results) => {
            if (results && results.length > 0) {
              const address = results[0].label; // Get the address from the first result
              onChange(newPosition.lat, newPosition.lng, address);
            }
          });
      },
    });

    return (
      <Marker
        position={[lat, long]}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const newPosition = e.target.getLatLng();
            map.flyTo([newPosition.lat, newPosition.lng], 13);
          },
        }}
        icon={icon}
      ></Marker>
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
      style={{ height: "280px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers />
      <ChangeCursorOnDrag />
      <GeoSearch />
    </MapContainer>
  );
};

export default LeafletMap;
