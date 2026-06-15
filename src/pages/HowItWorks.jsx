import "../css/howitworks.css";

const HowItWorks = () => {
  return (
    <div className="how-page">
      {/* HERO */}
      <section className="how-hero">
        <h1>How Life Replay AI Works</h1>
        <p>
          Capture moments, relive memories, and understand your life using
          simple steps powered by AI.
        </p>
      </section>

      {/* STEPS */}
      <section className="how-steps">
        <div className="how-card">
          <span className="step">1</span>
          <h3>Create an Account</h3>
          <p>
            Sign up using your mobile number and secure your personal memory
            space.
          </p>
        </div>

        <div className="how-card">
          <span className="step">2</span>
          <h3>Add Memories</h3>
          <p>
            Save your moments with title, mood, intensity, date, and photos.
          </p>
        </div>

        <div className="how-card">
          <span className="step">3</span>
          <h3>Search Your Life</h3>
          <p>
            Ask natural questions like “When was I last feeling happy?” and get
            instant answers.
          </p>
        </div>

        <div className="how-card">
          <span className="step">4</span>
          <h3>Relive & Reflect</h3>
          <p>
            Explore timelines, moods, and insights to understand your life
            journey better.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
