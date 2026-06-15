import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/forgot.css";

const ForgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    try {
      setLoading(true);

      // await axios.post("http://localhost:8081/api/auth/forgot-password", null, {
      //   params: { mobile },
      // });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        null,
        {
          params: { mobile },
        },
      );

      alert("OTP sent successfully");

      // ✅ IMPORTANT FIX
      navigate("/verify-otp", { state: { mobile } });
    } catch (err) {
      alert(err.response?.data || "Failed to send OTP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-wrapper">
        <div className="forgot-card">
          <h2 className="forgot-title">Forgot</h2>
          <br />
          <p className="subtitle">
            Enter your registered mobile number to receive OTP
          </p>

          <form onSubmit={handleSendOtp}>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Mobile Number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <button type="submit" className="forgot-btn" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <div className="forgot-footer">
            <Link to="/login" className="backtologin">
              Back to Login
            </Link>
          </div>
        </div>

        <div className="forgot-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
            alt="forgot password"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
