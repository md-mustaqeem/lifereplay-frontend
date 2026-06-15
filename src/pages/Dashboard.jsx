import { useEffect, useState } from "react";
import "../css/dashboard.css";

const Dashboard = () => {
  const [placeholder, setPlaceholder] = useState(
    "When was I last feeling truly happy?"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setPlaceholder("Search your memories...");
      } else if (window.innerWidth < 768) {
        setPlaceholder("When was I last happy?");
      } else {
        setPlaceholder("When was I last feeling truly happy?");
      }
    };

    handleResize(); // initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard">
      <div className="hero">
        {/* AI ICON */}
        <div className="ai-orbit">🧠</div>

        {/* HEADING */}
        <h1>
          Search Your Life.
          <br />
          <span>Replay Your Journey.</span>
        </h1>

        {/* SEARCH BAR */}
        <div className="search-box">
          {/* <span className="icon">🔍</span> */}
          <input
            type="text"
            placeholder={placeholder}
            className="placeholder"
          />
        </div>

        {/* SUGGESTIONS */}
        <div className="suggestions">
          <span>💼 Last interview moment</span>
          <span>😌 Stressful days in 2025</span>
          <span>👨‍👩‍👦 Memories with Rahul</span>
        </div>

        {/* CTA */}
        <button className="cta">Get Started</button>
      </div>
    </div>
  );
};

export default Dashboard;
