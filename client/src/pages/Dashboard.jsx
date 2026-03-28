import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar"; 
import "./Dashboard.css"; 

function Dashboard({ dark, setDark }) {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrises = async (lat, lng) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/crisis/nearby?lat=${lat}&lng=${lng}`
      );
      setCrises(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch nearby crises from the server.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCrises(latitude, longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Please enable location permissions to see nearby alerts.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className={`dashboard-wrapper ${dark ? "dark-theme" : ""}`}>
      <Navbar dark={dark} setDark={setDark} />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Nearby Crisis Alerts</h1>
            <p className="dashboard-subtitle">Real-time updates for your area</p>
          </div>
        </header>

        {loading && (
          <div className="status-container loading">
            <div className="spinner"></div>
            <p>Locating you and fetching data...</p>
          </div>
        )}

        {error && (
          <div className="status-container error">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && crises.length > 0 && (
          <div className="crisis-grid">
            {crises.map((crisis, index) => (
              <div key={index} className="crisis-card">
                <div className="card-header">
                  <span className="alert-badge">Alert</span>
                </div>
                <h2 className="card-title">{crisis.title || "Emergency Alert"}</h2>
                <p className="card-desc">
                  {crisis.description || "Details are currently unavailable. Please stay alert."}
                </p>
                <button className="card-action">View Details</button>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && crises.length === 0 && (
          <div className="status-container success">
            <p>✅ No nearby crises reported. You are safe!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;