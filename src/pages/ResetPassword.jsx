import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/forgotpassword.css";

const ResetPassword = () => {
  const { state } = useLocation();
  const mobile = state?.mobile;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // await axios.post("http://localhost:8081/api/auth/reset-password", null, {
      //   params: {
      //     mobile,
      //     newPassword: password,
      //   },
      // });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        null,
        {
          params: {
            mobile,
            newPassword: password,
          },
        },
      );

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h2>Reset Password</h2>

        <form onSubmit={handleReset}>
          <div className="input-group">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
