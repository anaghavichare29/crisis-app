import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; 

function Navbar({ dark, setDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);
  const profileRef = useRef(null);

const handleLogout = () => {
  navigate("/login");
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isProfileOpen]);

  return (
    <nav className="navbar">
      <div className="nav-section" ref={menuRef}>
        <button 
          className={`menu-toggle ${isMenuOpen ? "is-active" : ""}`} 
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsProfileOpen(false); 
          }}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <ul className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
          <li className="dropdown-item">Dashboard</li>
          <li className="dropdown-item">Settings</li>
          <li className="dropdown-item">Crisis Alerts</li>
          <li className="dropdown-item">Help Support</li>
        </ul>
      </div>

      <div className="nav-section" ref={profileRef}>
        
        <button 
          onClick={() => setDark(!dark)} 
          className="theme-toggle-btn"
        >
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button 
          className="profile-btn"
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsMenuOpen(false); 
          }}
        >
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User profile" 
            className="profile-img"
          />
        </button>

        <div className={`dropdown-profile ${isProfileOpen ? "show" : ""}`}>
          <div className="user-info">
            <p className="user-name">Guest User</p>
            <p className="user-email">guest@example.com</p>
          </div>
          <div className="divider"></div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;