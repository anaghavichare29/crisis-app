import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./pages/Dashboard";
import HelpSupport from "./pages/HelpSupport";
import CrisisAlerts from "./pages/CrisisAlerts";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  return (
    <div
      className={
        dark
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !user ? (
              <Login setUser={setUser} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard dark={dark} setDark={setDark} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/help" element={<HelpSupport />} />

        <Route
          path="/alerts"
          element={user ? <CrisisAlerts /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
