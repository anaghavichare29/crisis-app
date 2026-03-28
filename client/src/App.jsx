import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css"; // Importing your CSS file

function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Routes>
        {/* Default Route */}
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } 
        />

        {/* Login Route */}
        <Route 
          path="/login" 
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" replace />
          } 
        />

        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            user ? <Dashboard dark={dark} setDark={setDark} /> : <Navigate to="/login" replace />
          } 
        />

        {/* Catch-all for bad URLs */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;