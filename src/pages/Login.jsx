import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        mobile,
        password,
      });

      // BACKEND SE JO STRING AATI HAI WO HI TOKEN HAI
      localStorage.setItem("token", res.data);

      // NAVBAR DISPLAY KE LIYE
      localStorage.setItem(
        "user",
        JSON.stringify({
          mobile: mobile,
        }),
      );

      alert("Login success");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Sign In</h2>

          <form onSubmit={handleLogin}>
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="options">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>

          <div
            className="options"
            style={{ justifyContent: "center", color: "white" }}
          >
            <Link to="/signup" className="createaccount">
              Create Account
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="login-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
