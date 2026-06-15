import "../css/features.css";

const Features = () => {
  return (
    <div className="features-page">
      {/* HERO */}
      <section className="features-hero">
        <h1>Powerful Features</h1>
        <p>
          Life Replay AI helps you capture, relive, and understand your life
          moments with the power of AI.
        </p>
      </section>

      {/* FEATURES GRID */}
      <section className="features-grid">
        <div className="feature-card">
          <h3>🧠 AI Memory Search</h3>
          <p>
            Search your memories using natural language like
            <em> “When was I last happy?”</em>
          </p>
        </div>

        <div className="feature-card">
          <h3>📅 Timeline View</h3>
          <p>
            View your life events in a clean timeline sorted by date and mood.
          </p>
        </div>

        <div className="feature-card">
          <h3>😊 Mood Tracking</h3>
          <p>
            Track emotions such as Happy, Sad, Neutral, Angry with intensity
            levels.
          </p>
        </div>

        <div className="feature-card">
          <h3>📸 Photo Memories</h3>
          <p>
            Upload images with your memories to visually relive your moments.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure & Private</h3>
          <p>
            Your memories are protected using secure authentication and JWT.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Insights & Stats</h3>
          <p>
            Get insights like happiest days, stressful periods, and memory
            trends.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Features;
