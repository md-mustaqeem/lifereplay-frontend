import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/memorylist.css";

const moodEmoji = {
  Happy: "😊",
  Good: "🙂",
  Neutral: "😐",
  Sad: "😟",
  Angry: "😡",
};

const MemoryList = () => {
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await api.get("/memory/my");
        console.log(res.data); // add kiya hu abhi
        const sortedMemories = (res.data || []).sort((a, b) => b.id - a.id);
        setMemories(sortedMemories);
      } catch (err) {
        console.error("Error fetching memories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="memory-page">
      <div className="memory-container">
        {/* HEADER */}
        <div className="memory-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>My Memories</h1>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="memory-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Summary</th>
                <th>Mood</th>
                <th>Intensity</th>
                <th>Date</th>
                <th>Location</th>
                <th>Type</th>
                <th>Tags</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="center">
                    Loading memories...
                  </td>
                </tr>
              ) : memories.length === 0 ? (
                <tr>
                  <td colSpan="9" className="center">
                    No memories found
                  </td>
                </tr>
              ) : (
                memories.map((m) => (
                  <tr key={m.id}>
                    {/* IMAGE */}

                    <td>
                      {m.imageUrl ? (
                        // <img
                        //   src={
                        //     m.imageUrl.startsWith("http")
                        //       ? m.imageUrl
                        //       : `http://localhost:8081/${m.imageUrl}`
                        //   }
                        //   alt="memory"
                        //   className="memory-img"
                        //   onClick={() =>
                        //     window.open(
                        //       m.imageUrl.startsWith("http")
                        //         ? m.imageUrl
                        //         : `http://localhost:8081/${m.imageUrl}`,
                        //       "_blank"
                        //     )
                        //   }
                        // />

                        <img
                          src={
                            m.imageUrl.startsWith("http")
                              ? m.imageUrl
                              : `${import.meta.env.VITE_API_URL}/${m.imageUrl}`
                          }
                          alt="memory"
                          className="memory-img"
                          onClick={() =>
                            window.open(
                              m.imageUrl.startsWith("http")
                                ? m.imageUrl
                                : `${import.meta.env.VITE_API_URL}/${m.imageUrl}`,
                              "_blank",
                            )
                          }
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>{m.title}</td>
                    <td>{m.summary || "-"}</td>
                    <td>
                      {moodEmoji[m.mood] || "😐"} {m.mood}
                    </td>
                    <td>{m.intensity}</td>
                    <td>
                      {m.eventDate
                        ? new Date(m.eventDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{m.location || "-"}</td>
                    <td>{m.memoryType}</td>
                    <td>{m.tags || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemoryList;
