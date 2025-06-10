import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CityMap = ({ lat, lon, city }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{city} konumu</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CityMap;