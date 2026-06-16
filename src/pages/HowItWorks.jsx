import "../css/howitworks.css";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Secure Your Space",
      desc: "Start your journey with a private, encrypted vault. Your memories are yours alone, accessible only to you via your mobile.",
    },
    {
      id: "02",
      title: "Capture the Moment",
      desc: "Record your daily highlights, work breakthroughs, or travel joys. Add moods and intensity to create a rich emotional tapestry.",
    },
    {
      id: "03",
      title: "Ask Your AI",
      desc: "No more scrolling through endless galleries. Ask, 'When did I feel most productive last month?' and get instant, clear answers.",
    },
    {
      id: "04",
      title: "Reflect & Evolve",
      desc: "Visualize your growth over time. Identify your triggers, celebrate wins, and gain deep insights into your life's journey.",
    },
  ];

  return (
    <div className="how-page">
      <section className="how-hero">
        <h1>Your Life, Perfectly Replayed</h1>
        <p>
          A personal AI-powered sanctuary to document, analyze, and rediscover
          the moments that define your growth.
        </p>
      </section>

      <section className="how-steps">
        {steps.map((step, index) => (
          <div className="how-card" key={index}>
            <span className="step">{step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HowItWorks;
