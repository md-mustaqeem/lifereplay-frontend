import { useEffect, useState } from "react";
import api from "../api/api";
import "../css/burnoutBanner.css";

export default function BurnoutAlert() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/burnout/mood-status").then((res) => setData(res.data));
  }, []);

  if (!data || !data.status) return null;

  const iconMap = {
    BURNOUT: "⚠️",
    RECOVERY: "🌿",
    HAPPY: "😄",
    STABLE: "🙂",
  };

  const classMap = {
    BURNOUT: "burnout",
    RECOVERY: "recovery",
    HAPPY: "happy",
    STABLE: "stable",
  };

  return (
    <div className={`burnout-banner ${classMap[data.status]}`}>
      <div className="burnout-icon-wrap">{iconMap[data.status]}</div>

      <div className="burnout-texts">
        <div className="burnout-title">
          {data.status === "BURNOUT" && "Burnout Alert"}
          {data.status === "RECOVERY" && "Recovery Mode"}
          {data.status === "HAPPY" && "Feeling Happy"}
          {data.status === "STABLE" && "Mood Stable"}
        </div>

        <div className="burnout-message">{data.message}</div>
      </div>
    </div>
  );
}
