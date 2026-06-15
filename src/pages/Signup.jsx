import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 POPUP STATE (NEW – no existing logic changed)
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("success");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        name,
        mobile,
        email,
        password,
      });

      // ✅ popup shown
      setPopupMsg(res.data || "Signup successful");
      setPopupType("success");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setPopupMsg("Signup failed. Please try again.");
      setPopupType("error");
      setShowPopup(true);
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-wrapper">
        {/* LEFT FORM */}
        <div className="signup-card">
          <h2 className="signup-title">Create Account</h2>
          <br />
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <div className="signup-footer">
            <span className="login-link-al">Already have an account?</span>
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="signup-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
            alt="signup illustration"
          />
        </div>
      </div>

      {/* ✅ POPUP (NEW – no existing JSX changed) */}
      {showPopup && (
        <div className="popup-overlay">
          <div className={`popup-card ${popupType}`}>
            <h3>{popupType === "success" ? "✅ Success" : "❌ Error"}</h3>
            <p>{popupMsg}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
