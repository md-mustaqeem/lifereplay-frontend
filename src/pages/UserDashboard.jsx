import "../css/userDashboard.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import Timeline from "../components/Timeline";
import Insights from "./Insights";
import BurnoutAlert from "../components/BurnoutAlert";

const UserDashboard = () => {
  const [recentMemories, setRecentMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);

  // 🔥 CLICKED MOOD
  const [selectedMood, setSelectedMood] = useState(null);

  // 🔍 SEARCH
  const [query, setQuery] = useState("");

  // 🔥 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔥 STATS
  const [stats, setStats] = useState({
    Happy: 0,
    Good: 0,
    Neutral: 0,
    Sad: 0,
    Angry: 0,
    total: 0,
  });

  const [isSearching, setIsSearching] = useState(false);

  const [filterType, setFilterType] = useState("month"); // month | year
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("static");
  const [autoIndex, setAutoIndex] = useState(0);

  const sortByLatest = (list) =>
    [...list].sort((a, b) => {
      const t1 = a.createdAt ? new Date(a.createdAt) : new Date(a.eventDate);
      const t2 = b.createdAt ? new Date(b.createdAt) : new Date(b.eventDate);
      return t2 - t1;
    });

  // 🔥 INITIAL LOAD
  useEffect(() => {
    api.get("/memory/my").then((res) => {
      const data = sortByLatest(res.data || []);
      setRecentMemories(data);
      setCurrentPage(1);
      if (data.length > 0) setSelectedMemory(data[0]);
    });

    api.get("/memory/my").then((res) => {
      const all = res.data || [];
      const moodCount = {
        Happy: 0,
        Good: 0,
        Neutral: 0,
        Sad: 0,
        Angry: 0,
      };

      all.forEach((m) => {
        if (moodCount[m.mood] !== undefined) moodCount[m.mood]++;
      });

      setStats({ ...moodCount, total: all.length });
    });
  }, []);

  // 🔥 RIGHT FILTER AUTO SELECT (ADDED)
  useEffect(() => {
    if (viewMode !== "auto") return;
    if (!recentMemories.length) return;

    const filtered = recentMemories.filter((m) => {
      const d = new Date(m.eventDate);

      if (filterType === "month") {
        return d.getMonth() === filterMonth && d.getFullYear() === filterYear;
      }

      return d.getFullYear() === filterYear;
    });

    if (!filtered.length) return;

    // 🔥 force change index
    const nextIndex = autoIndex % filtered.length;

    setSelectedMemory(filtered[nextIndex]);
  }, [
    viewMode,
    filterType,
    filterMonth,
    filterYear,
    recentMemories,
    autoIndex,
  ]);

  // 🔁 AUTO SLIDE TIMER (🔥 MISSING PART)
  useEffect(() => {
    if (viewMode !== "auto") return;

    const timer = setInterval(() => {
      setAutoIndex((i) => i + 1);
    }, 3000); // ⏱️ 3 seconds (change if you want)

    return () => clearInterval(timer);
  }, [viewMode]);

  // 🔍 COMPLETE SEARCH HANDLER
  const handleSearch = async (value) => {
    setQuery(value);
    setSelectedMood(null); // ✅ VERY IMPORTANT
    const v = value.trim().toLowerCase();
    if (v === "") {
      const res = await api.get("/memory/my");
      const data = sortByLatest(res.data || []);
      setRecentMemories(data);
      setCurrentPage(1);
      setSelectedMemory(data[0] || null);
      return;
    }

    // 2️⃣ DAY SEARCH
    const dayMap = {
      sun: 0,
      sunday: 0,
      mon: 1,
      monday: 1,
      tue: 2,
      tuesday: 2,
      wed: 3,
      wednesday: 3,
      thu: 4,
      thursday: 4,
      fri: 5,
      friday: 5,
      sat: 6,
      saturday: 6,
    };

    if (dayMap[v] !== undefined) {
      const res = await api.get("/memory/my");
      const filtered = (res.data || []).filter(
        (m) => new Date(m.eventDate).getDay() === dayMap[v],
      );
      const sorted = sortByLatest(filtered);
      setRecentMemories(sorted);
      setCurrentPage(1);
      setSelectedMemory(sorted[0] || null);
      return;
    }

    // 3️⃣ MONTH SEARCH
    const monthMap = {
      jan: 0,
      january: 0,
      feb: 1,
      february: 1,
      mar: 2,
      march: 2,
      apr: 3,
      april: 3,
      may: 4,
      jun: 5,
      june: 5,
      jul: 6,
      july: 6,
      aug: 7,
      august: 7,
      sep: 8,
      september: 8,
      oct: 9,
      october: 9,
      nov: 10,
      november: 10,
      dec: 11,
      december: 11,
    };

    if (monthMap[v] !== undefined) {
      const res = await api.get("/memory/my");
      const filtered = (res.data || []).filter(
        (m) => new Date(m.eventDate).getMonth() === monthMap[v],
      );
      const sorted = sortByLatest(filtered);
      setRecentMemories(sorted);
      setCurrentPage(1);
      setSelectedMemory(sorted[0] || null);
      return;
    }

    // 4️⃣ YEAR SEARCH (e.g. 2024)
    if (/^\d{4}$/.test(v)) {
      const year = parseInt(v);
      const res = await api.get("/memory/my");
      const filtered = (res.data || []).filter(
        (m) => new Date(m.eventDate).getFullYear() === year,
      );
      const sorted = sortByLatest(filtered);
      setRecentMemories(sorted);
      setCurrentPage(1);
      setSelectedMemory(sorted[0] || null);
      return;
    }

    // 5️⃣ MOOD SEARCH
    const moodMap = {
      happy: "Happy",
      good: "Good",
      neutral: "Neutral",
      sad: "Sad",
      angry: "Angry",
    };

    if (moodMap[v]) {
      setSelectedMood(moodMap[v]); // stats filter jaisa behave karega
      setCurrentPage(1);
      return;
    }

    // 6️⃣ TEXT SEARCH (title / summary / description)
    const res = await api.get(`/memory/search?q=${encodeURIComponent(value)}`);

    const sorted = sortByLatest(res.data || []);
    setRecentMemories(sorted);
    setCurrentPage(1);
    setSelectedMemory(sorted[0] || null);
  };

  const filteredMemories = selectedMood
    ? recentMemories.filter((m) => m.mood === selectedMood)
    : recentMemories;

  const totalPages = Math.ceil(filteredMemories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMemories = filteredMemories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePrev = () => {
    if (!selectedMemory) return;
    const index = recentMemories.findIndex((m) => m.id === selectedMemory.id);
    if (index < recentMemories.length - 1) {
      setSelectedMemory(recentMemories[index + 1]);
    }
  };

  const handleNext = () => {
    if (!selectedMemory) return;
    const index = recentMemories.findIndex((m) => m.id === selectedMemory.id);
    if (index > 0) {
      setSelectedMemory(recentMemories[index - 1]);
    }
  };

  const currentIndex = recentMemories.findIndex(
    (m) => m.id === selectedMemory?.id,
  );

  return (
    <div className="dashboard-wrapper">
      {/* SEARCH */}
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search by text, day, month, year..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="summary-row">
        {/* LEFT */}
        <div className="summary-left">
          <BurnoutAlert />
        </div>

        {/* RIGHT */}
        <div className="summary-right">
          <div className="stats">
            {["Happy", "Good", "Neutral", "Sad", "Angry"].map((mood) => (
              <div
                key={mood}
                className={`stat-card ${mood.toLowerCase()} ${
                  selectedMood === mood ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedMood(mood);
                  setCurrentPage(1);
                }}
              >
                <h3>{mood}</h3>
                <p>{stats[mood]}</p>
              </div>
            ))}

            <div
              className={`stat-card memory ${
                selectedMood === null ? "active" : ""
              }`}
              onClick={async () => {
                setSelectedMood(null);
                const res = await api.get("/memory/my");
                setRecentMemories(sortByLatest(res.data || []));
              }}
            >
              <h3>Memories Stored</h3>
              <p>{stats.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        {/* LEFT */}
        <div className="recent">
          <h2>
            {selectedMood ? `${selectedMood} Memories` : "Recent Memories"}
          </h2>

          {paginatedMemories.map((m) => (
            <div
              key={m.id}
              className="memory-item"
              onClick={() => setSelectedMemory(m)}
            >
              <img src={m.imageUrl} alt={m.title} />
              <div>
                <h2>{m.title}</h2>
                <p>{m.summary}</p>
                <span className="date">
                  📅 {new Date(m.eventDate).toDateString()}
                </span>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="detail">
          {selectedMemory ? (
            <>
              {/* HEADER + FILTER */}
              <div className="detail-header">
                {/* <h2>{selectedMemory.title}</h2> */}

                <div className="right-filter">
                  {/* MODE */}
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                  >
                    <option value="static">Static</option>
                    <option value="auto">Automatic</option>
                  </select>

                  {/* MONTH / YEAR */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>

                  {filterType === "month" && (
                    <select
                      value={filterMonth}
                      onChange={(e) => {
                        setFilterMonth(+e.target.value);
                        setAutoIndex((i) => i + 1);
                      }}
                    >
                      {[
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((m, i) => (
                        <option key={i} value={i}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}

                  <select
                    value={filterYear}
                    onChange={(e) => {
                      setFilterYear(+e.target.value);
                      setAutoIndex((i) => i + 1);
                    }}
                  >
                    {[2025, 2026, 2027, 2028].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGE */}
              <div className="image-wrapper">
                {currentIndex < recentMemories.length - 1 && (
                  <button className="img-nav left" onClick={handlePrev}>
                    ⬅
                  </button>
                )}

                <img
                  className="detail-img"
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                />

                {currentIndex > 0 && (
                  <button className="img-nav right" onClick={handleNext}>
                    ➡
                  </button>
                )}
              </div>

              {/* TAGS */}
              <div className="tags">
                <span>😊 {selectedMemory.mood}</span>
                <span>📍 {selectedMemory.location}</span>
                <span>
                  📅{" "}
                  {new Date(selectedMemory.eventDate).toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" },
                  )}
                </span>
                <span>
                  🕒{" "}
                  {new Date(selectedMemory.createdAt).toLocaleTimeString(
                    "en-IN",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </span>
              </div>

              <h2>{selectedMemory.title}</h2>

              <p className="desc">{selectedMemory.description}</p>
            </>
          ) : (
            <p>Select a memory</p>
          )}
        </div>
      </div>

      <Timeline />
      <Insights />
    </div>
  );
};

export default UserDashboard;
