import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar"; 
import CrisisMap from "../components/CrisisMap/CrisisMap"; 
import IncidentForm from "../components/incidentForm/IncidentForm"; 
import "./Dashboard.css"; 

function Dashboard({ dark, setDark }) {
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchCrises = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://crisis-backend-8zo1.onrender.com/api/crisis/nearby?lat=${lat}&lng=${lng}`
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

  const handleAddNewIncident = (newIncident) => {
    setCrises([newIncident, ...crises]); 
    setIsFormOpen(false); 
  };

  return (
    <div className={`dashboard-wrapper ${dark ? "dark-theme" : ""}`}>
      <Navbar dark={dark} setDark={setDark} />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Nearby Crisis Alerts</h1>
            <p className="dashboard-subtitle">Real-time updates for Mumbai</p>
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
          <>
            <CrisisMap crises={crises} />

            <div className="crisis-grid">
              {crises.map((crisis) => (
                <div key={crisis.id} className="crisis-card">
                  <div className="card-header">
                    <span className="alert-badge">Alert</span>
                  </div>
                  <h2 className="card-title">{crisis.title}</h2>
                  <p className="card-desc">{crisis.description}</p>
                  <button className="card-action">View Details</button>
                </div>
              ))}

              <button 
                className="add-incident-card"
                onClick={() => setIsFormOpen(true)}
              >
                <span className="add-icon">+</span>
                <span className="add-text">Report New Incident</span>
              </button>
            </div>
          </>
        )}

        {!loading && !error && crises.length === 0 && (
          <div className="status-container success">
            <p>✅ No nearby crises reported. You are safe!</p>
          </div>
        )}
      </main>

      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <IncidentForm 
              onAddIncident={handleAddNewIncident} 
              onCancel={() => setIsFormOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;