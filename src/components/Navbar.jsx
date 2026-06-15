import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../css/navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 RE-READ USER ON EVERY ROUTE CHANGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setOpen(false);
  }, [location]);

  // ❌ outside click close
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          Life Replay <span className="ai">AI</span>
        </Link>

        {/* LINKS */}
        <div className="nav-links">
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/how-it-works">How it Works</NavLink>
          <NavLink to="/testimonials">Testimonials</NavLink>
        </div>

        {/* RIGHT */}
        <div className="nav-right" ref={dropdownRef}>
          {!user ? (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ) : (
            <div className="user-menu">
              {/* 👇 USER NUMBER (NO OTHER CHANGE) */}
              <span className="user-name" onClick={() => setOpen(!open)}>
                👤 {user?.mobile || user?.name}
              </span>

              {/* 👇 DROPDOWN */}
              {open && (
                <div className="dropdown">
                  <button onClick={() => navigate("/mydashboard")}>
                    My Dashboard
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
