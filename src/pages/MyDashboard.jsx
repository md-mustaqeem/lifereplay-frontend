import { useNavigate } from "react-router-dom";
import "../css/mydashboard.css";

const MyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <h2 className="dashboard-title">My Dashboard</h2>

      {/* ACTION CARDS */}
      <div className="dashboard-cards-row">
        <div
          className="dashboard-card card-add clickable"
          onClick={() => navigate("/add-memory")}
        >
          <p className="dashboard-card-label">Add Memory</p>
        </div>

        <div
          className="dashboard-card card-view clickable"
          onClick={() => navigate("/memories")}
        >
          <p className="dashboard-card-label">View Memories</p>
        </div>

        <div className="dashboard-card card-profile clickable">
          <p className="dashboard-card-label">My Profile</p>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
