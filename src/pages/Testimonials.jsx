import "../css/testimonials.css";

const testimonials = [
  {
    quote:
      "Life Replay AI helped me understand my emotional patterns. I can actually see when I was happiest.",
    name: "Riya Sharma",
    role: "Product Designer",
    avatar: "👩",
  },
  {
    quote:
      "I love how easily I can search my memories. Asking questions feels magical. It's like a time machine.",
    name: "Aman Verma",
    role: "Software Engineer",
    avatar: "👨",
  },
  {
    quote:
      "This app feels like a personal diary combined with AI. Clean, secure, and truly meaningful.",
    name: "Neha Kapoor",
    role: "Entrepreneur",
    avatar: "👩‍💼",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      <section className="testimonials-hero">
        <h1>Voices of Growth</h1>
        <p>
          See how our users are using AI to reflect, reconnect, and reclaim
          their most meaningful moments.
        </p>
      </section>

      <section className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <p className="quote">“{t.quote}”</p>
            <div className="user">
              <div className="avatar-circle">{t.avatar}</div>
              <div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Testimonials;
