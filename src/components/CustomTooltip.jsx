export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={styles.tooltip}>
      <p style={styles.date}>📅 {label}</p>

      {payload.map((item, index) => (
        <div key={index} style={styles.row}>
          <span style={{ ...styles.dot, background: item.color }} />
          <span style={styles.name}>{item.name}</span>
          <span style={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  tooltip: {
    background: "rgba(20, 20, 30, 0.95)",
    padding: "12px 14px",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    minWidth: "160px",
  },
  date: {
    fontSize: "13px",
    marginBottom: "8px",
    opacity: 0.8,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    marginBottom: "4px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  name: {
    flex: 1,
  },
  value: {
    fontWeight: "bold",
  },
};
