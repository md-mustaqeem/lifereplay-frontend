import { useEffect, useState } from "react";
import api from "../api/api";
import MoodChart from "../components/MoodChart";
import MoodMatrixHeatmap from "../components/MoodMatrixHeatmap";
import "../css/insights.css";

export default function Insights() {
  const [trend, setTrend] = useState([]);
  const [matrixData, setMatrixData] = useState([]);

  // 🔥 FILTER STATES (SHARED)
  const [view, setView] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // 🔹 FETCH DATA (ONCE)
  useEffect(() => {
    api.get("/insights/mood-trend").then((r) => setTrend(r.data || []));
    api.get("/insights/mood-matrix").then((r) => setMatrixData(r.data || []));
  }, []);

  // 🔹 FILTER FOR MOOD CHART
  const filteredTrend = trend.filter((d) => {
    const date = new Date(d.date);

    if (view === "month") {
      return (
        date.getMonth() + 1 === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    }

    return date.getFullYear() === selectedYear;
  });

  // 🔹 FILTER FOR MATRIX HEATMAP (SYNCED)
  const filteredMatrix = matrixData.filter((d) => {
    const date = new Date(d.date);

    if (view === "month") {
      return (
        date.getMonth() + 1 === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    }

    return date.getFullYear() === selectedYear;
  });

  return (
    <div className="insights-wrapper">
      <h2 className="insights-title">Insights & Analytics</h2>

      <div className="insights-card">
        <div className="insights-row">
          {/* LEFT – MOOD OVER TIME */}
          <div className="insight-block left-panel">
            <div className="chart-header">
              <h4 className="insight-heading">Mood Over Time</h4>

              <div className="insight-filters">
                <select value={view} onChange={(e) => setView(e.target.value)}>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>

                {view === "month" && (
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  >
                    <option value={1}>Jan</option>
                    <option value={2}>Feb</option>
                    <option value={3}>Mar</option>
                    <option value={4}>Apr</option>
                    <option value={5}>May</option>
                    <option value={6}>Jun</option>
                    <option value={7}>Jul</option>
                    <option value={8}>Aug</option>
                    <option value={9}>Sep</option>
                    <option value={10}>Oct</option>
                    <option value={11}>Nov</option>
                    <option value={12}>Dec</option>
                  </select>
                )}

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2024}>2028</option>
                </select>
              </div>
            </div>

            <MoodChart data={filteredTrend} />
          </div>

          {/* RIGHT – MOOD × DAY HEATMAP */}
          <div className="insight-block right-panel">
            <h4 className="insight-heading">Mood × Day Heatmap</h4>

            <MoodMatrixHeatmap data={filteredMatrix} />
          </div>
        </div>
      </div>

      <p className="insight-desc">
        This dashboard helps you compare mood trends with daily emotional
        patterns.
      </p>
    </div>
  );
}
