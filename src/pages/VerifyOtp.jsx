import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/otp.css";

const VerifyOtp = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);

      // await axios.post("http://localhost:8081/api/auth/verify-otp", null, {
      //   params: { mobile, otp },
      // });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        null,
        {
          params: { mobile, otp },
        },
      );

      alert("OTP verified");
      navigate("/reset-password", { state: { mobile } });
    } catch (err) {
      alert("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Verify OTP</h2>

        <form onSubmit={handleVerifyOtp}>
          <div className="input-group">
            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button type="submit" className="otp-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
