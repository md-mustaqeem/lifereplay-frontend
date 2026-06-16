import "../css/features.css";

const features = [
  {
    title: "AI Memory Search",
    desc: "Ask natural questions like 'When was I last happy?' and let AI find the moment.",
    icon: "🧠",
  },
  {
    title: "Timeline View",
    desc: "Visualize your life events in a clean, chronological feed sorted by date and mood.",
    icon: "📅",
  },
  {
    title: "Mood Tracking",
    desc: "Log your emotions and intensity levels to understand your daily well-being.",
    icon: "😊",
  },
  {
    title: "Visual Journaling",
    desc: "Attach photos to your entries to bring your memories to life visually.",
    icon: "📸",
  },
  {
    title: "Bank-Grade Security",
    desc: "Your data is protected with JWT and encrypted storage. Only you hold the keys.",
    icon: "🔒",
  },
  {
    title: "Deep Life Insights",
    desc: "Identify emotional trends, stressful periods, and your happiest milestones automatically.",
    icon: "📊",
  },
];

const Features = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <h1>Your Life, Indexed by AI</h1>
        <p>
          Transform raw memories into a structured timeline of growth and
          reflection.
        </p>
      </section>

      <section className="features-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Features;
