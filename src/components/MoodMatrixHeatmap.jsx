const MOODS = ["Angry", "Sad", "Neutral", "Good", "Happy"];

const normalizeDate = (d) => new Date(d).toISOString().split("T")[0];

// DISPLAY DATE (DD/MM)
const displayDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

// NORMALIZE MOOD (Capitalized)
const normalizeMood = (m) =>
  m ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : "";

// MOOD + INTENSITY BASED COLOR
const getMoodColor = (mood, intensity) => {
  if (!intensity || intensity === 0) return "#374151";

  switch (mood) {
    case "Angry":
      return intensity >= 3 ? "#dc2626" : "#f87171";
    case "Sad":
      return intensity >= 3 ? "#f97316" : "#fdba74";
    case "Neutral":
      return intensity >= 3 ? "#9ca3af" : "#6b7280";
    case "Good":
      return intensity >= 3 ? "#3b82f6" : "#93c5fd";
    case "Happy":
      return intensity >= 3 ? "#16a34a" : "#4ade80";
    default:
      return "#374151";
  }
};

export default function MoodMatrixHeatmap({ data }) {
  if (!data || !data.length) return null;

  // UNIQUE SORTED DATES (ISO)
  const dates = [...new Set(data.map((d) => normalizeDate(d.date)))].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="matrix-heatmap">
      {/* HEADER */}
      <div className="matrix-row header">
        <div className="matrix-label" />
        {dates.map((d) => (
          <div key={d} className="matrix-date">
            {displayDate(d)}
          </div>
        ))}
      </div>

      {/* MOOD ROWS */}
      {MOODS.map((mood) => (
        <div key={mood} className="matrix-row">
          <div className="matrix-label">{mood}</div>

          {dates.map((date) => {
            const item = data.find(
              (d) =>
                normalizeDate(d.date) === date && normalizeMood(d.mood) === mood
            );

            const intensity = Number(item?.intensity || 0);

            return (
              <div
                key={`${mood}-${date}`}
                className="matrix-cell"
                style={{ background: getMoodColor(mood, intensity) }}
                title={`${mood} • ${displayDate(
                  date
                )} • Intensity: ${intensity}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
