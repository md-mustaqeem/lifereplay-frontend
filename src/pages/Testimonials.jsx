import "../css/testimonials.css";

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      {/* HERO */}
      <section className="testimonials-hero">
        <h1>What Our Users Say</h1>
        <p>
          Real stories from people who use Life Replay AI to reflect, grow, and
          relive meaningful moments.
        </p>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="testimonials-grid">
        <div className="testimonial-card">
          <p className="quote">
            “Life Replay AI helped me understand my emotional patterns. I can
            actually see when I was happiest.”
          </p>
          <div className="user">
            <span className="avatar">👩</span>
            <div>
              <h4>Riya Sharma</h4>
              <span>Product Designer</span>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p className="quote">
            “I love how easily I can search my memories. Asking questions feels
            magical.”
          </p>
          <div className="user">
            <span className="avatar">👨</span>
            <div>
              <h4>Aman Verma</h4>
              <span>Software Engineer</span>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p className="quote">
            “This app feels like a personal diary combined with AI. Clean,
            secure, and meaningful.”
          </p>
          <div className="user">
            <span className="avatar">👩‍💼</span>
            <div>
              <h4>Neha Kapoor</h4>
              <span>Entrepreneur</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
