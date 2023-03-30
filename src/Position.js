import { Link, useLocation, useNavigate } from "react-router-dom";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";

import { Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "./Position.css";

const Position = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedCoords = location.state.passedCoords;
  const receivedLat = receivedCoords[0][1];
  const receivedLong = receivedCoords[1][1];
  console.log(receivedLat, receivedLong);
  return (
    <div className="map-container">
      <div>
        <button onClick={() => navigate(-1)} className="close-button">
          X
        </button>
      </div>
      <MapContainer
        center={[receivedLat, receivedLong]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[receivedLat, receivedLong]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Position;
