import { useEffect, useState } from "react";
import api from "../api/api";
import "../css/timeline.css";

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/memory/timeline").then((res) => {
      setEvents(res.data || []);
    });
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const generatePattern = (events) => {
    if (!events.length) return [];

    const sorted = [...events].sort((a, b) => {
      const dateDiff = new Date(b.eventDate) - new Date(a.eventDate);
      if (dateDiff === 0) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return dateDiff;
    });

    return sorted.map((e) => {
      const moodText = (e.mood || "").toLowerCase();

      let mood = "natural";
      let forceRed = false;

      if (moodText.includes("sad")) {
        mood = "sad";
        forceRed = false;
      } else if (moodText.includes("angry")) {
        mood = "angry";
        forceRed = true;
      } else if (moodText.includes("happy")) mood = "happy";
      else if (moodText.includes("good")) mood = "good";
      else if (moodText.includes("neutral")) mood = "natural";

      return {
        ...e,
        mood,
        forceRed,
        size: forceRed ? "large" : "medium",
      };
    });
  };

  const pattern = generatePattern(events);

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">Your Life Timeline</h2>

      <div className="time-indicator">
        <div className="time-pill present">Present</div>
        <div className="time-line"></div>
        <div className="time-pill past">Past</div>
      </div>

      <div className="emotion-flow-outer">
        <div className="emotion-flow">
          <div className="emotion-line" />

          {pattern.map((node) => (
            <div key={node.id} className="emotion-item">
              <div
                className={`emotion-node ${
                  node.forceRed ? "mood-red" : `mood-${node.mood}`
                } size-${node.size}`}
              >
                {node.mood.toUpperCase()}
              </div>

              <div className="node-info">
                <img
                  src={node.imageUrl || "/avatar.png"}
                  alt="memory"
                  className="node-avatar"
                />
                <div className="node-text">
                  <h4>{node.title}</h4>
                  <span>{formatDate(node.eventDate)}</span>
                  {node.location && <p>📍 {node.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
