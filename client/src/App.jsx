import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Dashboard dark={dark} setDark={setDark} />
      )}
    </div>
  );
}

export default App;