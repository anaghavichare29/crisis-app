import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./CrisisMap.css"; 

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

function CrisisMap({ crises }) {
  // Mumbai coordinates
  const mumbaiCenter = [19.0760, 72.8777];

  return (
    <div className="crisis-map-wrapper">
      <MapContainer 
        center={mumbaiCenter} 
        zoom={11} 
        scrollWheelZoom={false}
        className="crisis-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {crises.map((crisis) => (
          <Marker 
            key={crisis.id} 
            position={[crisis.location.lat, crisis.location.lng]}
          >
            <Popup>
              <div className="custom-popup">
                <strong>{crisis.title}</strong>
                <p>{crisis.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CrisisMap;