import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./IncidentForm.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

function IncidentForm({ onAddIncident, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [position, setPosition] = useState({ lat: 19.0760, lng: 72.8777 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !position) return;

    const newIncident = {
      id: Date.now(),
      title,
      description,
      location: position
    };

    if (onAddIncident) onAddIncident(newIncident);
    
    setTitle("");
    setDescription("");
  };

  return (
    <div className="incident-form-wrapper">
      
      <div className="form-pane">
        <h2 className="form-title">Report New Incident</h2>
        <p className="form-subtitle">Fill in the details and click on the map to set the exact location.</p>
        
        <form onSubmit={handleSubmit} className="incident-form">
          <div className="form-group">
            <label htmlFor="title">Incident Title</label>
            <input
              type="text"
              id="title"
              placeholder="e.g., Severe Waterlogging"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Provide details about the situation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            {onCancel && (
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancel
              </button>
            )}
            <button type="submit" className="submit-btn">
              Submit Report
            </button>
          </div>
        </form>
      </div>

      <div className="map-pane">
        <MapContainer 
          center={[19.0760, 72.8777]} 
          zoom={11} 
          scrollWheelZoom={true}
          className="form-map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker position={position} setPosition={setPosition} />
        </MapContainer>
        <div className="map-hint">
          📍 Click anywhere on the map to move the pin.
        </div>
      </div>

    </div>
  );
}

export default IncidentForm;