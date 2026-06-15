import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😟", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

const moodIntensityMap = {
  Happy: 10,
  Good: 7,
  Neutral: 5,
  Sad: 3,
  Angry: 8,
};

const moodColors = {
  Happy: "#F59E0B",
  Good: "#10B981",
  Neutral: "#6B7280",
  Sad: "#3B82F6",
  Angry: "#EF4444",
};

const intensityLabels = {
  1: "Barely there",
  2: "Very mild",
  3: "Mild",
  4: "Low",
  5: "Moderate",
  6: "Notable",
  7: "Strong",
  8: "Intense",
  9: "Very intense",
  10: "Overwhelming",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "560px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "28px 32px 24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  backBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    flexShrink: 0,
    transition: "background 0.2s",
  },
  headerTitle: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.3px",
  },
  headerSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "13px",
    margin: "2px 0 0",
  },
  body: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#111827",
    background: "#FAFAFA",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#111827",
    background: "#FAFAFA",
    outline: "none",
    resize: "vertical",
    minHeight: "100px",
    fontFamily: "inherit",
    lineHeight: 1.6,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #E5E7EB",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#111827",
    background: "#FAFAFA",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  selectWrapper: {
    position: "relative",
  },
  selectArrow: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#9CA3AF",
    fontSize: "14px",
  },
  moodRow: {
    display: "flex",
    gap: "8px",
  },
  moodItem: (active, label) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "10px 4px",
    borderRadius: "12px",
    border: active
      ? `2px solid ${moodColors[label] || "#667eea"}`
      : "1.5px solid #E5E7EB",
    background: active ? `${moodColors[label]}15` : "#FAFAFA",
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  moodEmoji: {
    fontSize: "22px",
    lineHeight: 1,
  },
  moodLabel: (active, label) => ({
    fontSize: "11px",
    fontWeight: active ? 600 : 400,
    color: active ? moodColors[label] || "#667eea" : "#9CA3AF",
  }),
  sliderWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  slider: {
    flex: 1,
    height: "4px",
    accentColor: "#667eea",
    cursor: "pointer",
  },
  intensityBadge: (intensity) => ({
    minWidth: "28px",
    height: "28px",
    borderRadius: "8px",
    background: `hsl(${240 + (intensity - 1) * 12}, 70%, 96%)`,
    color: `hsl(${240 + (intensity - 1) * 12}, 60%, 45%)`,
    fontSize: "13px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  intensityHint: {
    fontSize: "12px",
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  fileArea: {
    border: "1.5px dashed #D1D5DB",
    borderRadius: "12px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    background: "#FAFAFA",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    position: "relative",
  },
  fileIcon: {
    fontSize: "28px",
    lineHeight: 1,
  },
  fileText: {
    fontSize: "13px",
    color: "#6B7280",
  },
  fileInput: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  previewWrapper: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1.5px solid #E5E7EB",
  },
  previewImg: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    display: "block",
  },
  removeImgBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "rgba(0,0,0,0.55)",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    padding: "0 32px 32px",
  },
  saveBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.2px",
    transition: "opacity 0.2s, transform 0.1s",
  },
  divider: {
    height: "1px",
    background: "#F3F4F6",
    margin: "4px 0",
  },
};

const AddMemory = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    memoryType: "Personal",
    mood: "",
    intensity: 5,
    eventDate: "",
    location: "",
    tags: "",
  });

  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(form)], { type: "application/json" }),
      );
      if (image) formData.append("image", image);
      await api.post("/memory/add", formData);
      alert("Memory Saved Successfully ✅");
      setForm({
        title: "",
        summary: "",
        description: "",
        memoryType: "Personal",
        mood: "",
        intensity: 5,
        eventDate: "",
        location: "",
        tags: "",
      });
      setImage(null);
    } catch {
      alert("Error saving memory ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ←
          </button>
          <div>
            <h3 style={styles.headerTitle}>Add a Memory</h3>
            <p style={styles.headerSub}>Capture this moment forever</p>
          </div>
        </div>

        <div style={styles.body}>
          {/* Title */}
          <div style={styles.section}>
            <label style={styles.label}>Title</label>
            <input
              style={styles.input}
              name="title"
              placeholder="Give your memory a name..."
              value={form.title}
              onChange={handleChange}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.background = "#FAFAFA";
              }}
            />
          </div>

          {/* Summary */}
          <div style={styles.section}>
            <label style={styles.label}>Summary</label>
            <input
              style={styles.input}
              name="summary"
              placeholder="One line about what happened..."
              value={form.summary}
              onChange={handleChange}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.background = "#FAFAFA";
              }}
            />
          </div>

          {/* Description */}
          <div style={styles.section}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              name="description"
              placeholder="Tell the full story — the details you never want to forget..."
              value={form.description}
              onChange={handleChange}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.background = "#FAFAFA";
              }}
            />
          </div>

          <div style={styles.divider} />

          {/* Memory Type */}
          <div style={styles.section}>
            <label style={styles.label}>Memory Type</label>
            <div style={styles.selectWrapper}>
              <select
                style={styles.select}
                name="memoryType"
                value={form.memoryType}
                onChange={handleChange}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Travel">Travel</option>
                <option value="Learning">Learning</option>
                <option value="Relationship">Relationship</option>
              </select>
              <span style={styles.selectArrow}>▾</span>
            </div>
          </div>

          {/* Mood */}
          <div style={styles.section}>
            <label style={styles.label}>How did you feel?</label>
            <div style={styles.moodRow}>
              {moods.map((m) => (
                <div
                  key={m.label}
                  style={styles.moodItem(form.mood === m.label, m.label)}
                  onClick={() =>
                    setForm({
                      ...form,
                      mood: m.label,
                      intensity: moodIntensityMap[m.label] || 5,
                    })
                  }
                >
                  <span style={styles.moodEmoji}>{m.emoji}</span>
                  <span
                    style={styles.moodLabel(form.mood === m.label, m.label)}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div style={styles.section}>
            <label style={styles.label}>Emotional Intensity</label>
            <div style={styles.sliderWrapper}>
              <div style={styles.sliderRow}>
                <span style={{ fontSize: "13px", color: "#9CA3AF" }}>1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  style={styles.slider}
                  value={form.intensity}
                  onChange={(e) =>
                    setForm({ ...form, intensity: Number(e.target.value) })
                  }
                />
                <span style={{ fontSize: "13px", color: "#9CA3AF" }}>10</span>
                <div style={styles.intensityBadge(form.intensity)}>
                  {form.intensity}
                </div>
              </div>
              <span style={styles.intensityHint}>
                {intensityLabels[form.intensity] || ""}
              </span>
            </div>
          </div>

          <div style={styles.divider} />

          {/* Date & Location */}
          <div style={styles.twoCol}>
            <div style={styles.section}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="eventDate"
                style={styles.input}
                value={form.eventDate}
                max={new Date().toLocaleDateString("en-CA")}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                  e.target.style.background = "#FAFAFA";
                }}
              />
            </div>
            <div style={styles.section}>
              <label style={styles.label}>Location</label>
              <input
                style={styles.input}
                name="location"
                placeholder="City or place"
                value={form.location}
                onChange={handleChange}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                  e.target.style.background = "#FAFAFA";
                }}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={styles.section}>
            <label style={styles.label}>Tags</label>
            <input
              style={styles.input}
              name="tags"
              placeholder="#happy #travel #milestone"
              value={form.tags}
              onChange={handleChange}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E5E7EB";
                e.target.style.background = "#FAFAFA";
              }}
            />
          </div>

          {/* Photos */}
          <div style={styles.section}>
            <label style={styles.label}>Photo</label>
            {image ? (
              <div style={styles.previewWrapper}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  style={styles.previewImg}
                />
                <button
                  type="button"
                  style={styles.removeImgBtn}
                  onClick={() => setImage(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div style={styles.fileArea}>
                <span style={styles.fileIcon}>📷</span>
                <span style={styles.fileText}>Click to add a photo</span>
                <span style={{ fontSize: "11px", color: "#C4C4C4" }}>
                  JPG, PNG, WEBP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  style={styles.fileInput}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div style={styles.footer}>
          <button
            type="button"
            style={{
              ...styles.saveBtn,
              opacity: saving ? 0.7 : 1,
            }}
            onClick={handleSubmit}
            disabled={saving}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = saving ? "0.7" : "1";
            }}
          >
            {saving ? "Saving..." : "✦ Save Memory"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemory;
