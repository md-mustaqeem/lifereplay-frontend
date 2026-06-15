import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function MoodChart({ data }) {
  // 🔴 Low / No data case
  if (!data || data.length < 2) {
    return (
      <div
        style={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.7,
          fontSize: 13,
        }}
      >
        Add more memories to see meaningful mood trends
      </div>
    );
  }

  const moods = ["Happy", "Good", "Neutral", "Sad", "Angry"];

  const formatted = data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((d) => {
      const row = { date: d.date };
      moods.forEach((m) => {
        row[m] = d.moods?.[m] ?? 0; // intensity value
      });
      return row;
    });

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={formatted}>
          {/* 🔹 Soft grid */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 6"
          />

          {/* 🔹 X Axis (Date) */}
          <XAxis
            dataKey="date"
            tickFormatter={(d) =>
              new Date(d).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            }
            tick={{ fill: "#9ca3af", fontSize: 18 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 10]}
            allowDecimals={false}
            label={{
              value: "Mood Intensity",
              angle: -90,
              position: "insideLeft",
              fill: "#9ca3af",
              fontSize: 18,
            }}
          />

          {/* 🔹 Legend (MOST IMPORTANT for clarity) */}
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{
              color: "#e5e7eb",
              fontSize: 18,
              paddingBottom: "10px",
            }}
          />

          {/* 🔹 Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* 🔹 Mood Lines */}
          <Line
            type="monotone"
            dataKey="Happy"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Good"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Neutral"
            stroke="#a1a1aa"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Sad"
            stroke="#f97316"
            strokeWidth={3}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Angry"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
