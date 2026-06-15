export default function Heatmap({ data }) {
  // 🎨 COLOR LOGIC (daily activity)
  const color = (v) =>
    v >= 3
      ? "#22c55e" // highly productive
      : v >= 1
      ? "#a3e635" // moderately active
      : v === 0
      ? "#64748b" // no activity
      : "#ef4444"; // negative / low day

  return (
    <div className="heatmap">
      {data.map((d) => (
        <div
          key={d.date}
          className="heat-cell"
          style={{ backgroundColor: color(d.value) }}
          // 👇 CLEAR TOOLTIP (IMPORTANT)
          title={`📅 ${new Date(d.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}\n📝 Memories recorded: ${d.value}`}
        />
      ))}
    </div>
  );
}
