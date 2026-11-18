
import { Link } from "react-router-dom";
import eventBanner from "../assets/event-banner.jpg";
import "../styles/Home.css";

const categories = [
  {
    name: "Weddings",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700",
    text: "Make your dream wedding happen"
  },
  {
    name: "Birthdays",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700",
    text: "Celebrate every special moment"
  },
  {
    name: "Engagements",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700",
    text: "Celebrate the beginning of forever"
  },
  {
    name: "Corporate Events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700",
    text: "Create memorable experiences"
  },
  {
    name: "Anniversaries",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700",
    text: "Celebrate love and togetherness"
  }
];

const services = [
  { icon: "✿", name: "Decoration", desc: "Beautiful themes and event setups" },
  { icon: "◉", name: "Photography", desc: "Capture your precious moments" },
  { icon: "♨", name: "Catering", desc: "Delicious food for every occasion" },
  { icon: "⌂", name: "Venues", desc: "Find the perfect event location" },
  { icon: "✧", name: "Makeup Artists", desc: "Get ready for your special day" },
  { icon: "♫", name: "Entertainment", desc: "Make every celebration lively" }
];

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="premium-hero" id="home">
        <div className="hero-background-shape"></div>

        <div className="premium-hero-content">
          <span className="eyebrow">
            ✦ YOUR CELEBRATION STARTS HERE
          </span>

          <h1>
            Every Moment
            <br />
            Deserves a
            <br />
            <span>Beautiful Celebration.</span>
          </h1>

          <p>
            From intimate gatherings to grand celebrations,
            discover trusted event professionals and bring
            your vision to life with Event Guide.
          </p>

          <div className="premium-hero-buttons">
            <Link to="/signup" className="premium-primary-btn">
              Plan Your Event <span>→</span>
            </Link>

            <a href="#categories" className="premium-text-btn">
              Explore Events ↗
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-symbol">✦</div>
            <div>
              <strong>Your Event, Your Way</strong>
              <span>Discover. Connect. Celebrate.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-main-photo">
            <img src={eventBanner} alt="Beautiful event decoration" />
          </div>

          <div className="hero-small-photo">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600"
              alt="Elegant event setup"
            />
          </div>

          <div className="hero-floating-card">
            <span className="floating-icon">✧</span>
            <div>
              <strong>Make it memorable</strong>
              <p>Find everything for your event</p>
            </div>
          </div>

          <div className="hero-deco-circle"></div>
          <div className="hero-deco-star">✦</div>
        </div>
      </section>

      {/* INTRO STRIP */}

      <section className="intro-strip">
        <div>
          <span>01</span>
          <strong>Discover</strong>
          <p>Explore event services</p>
        </div>
        <div>
          <span>02</span>
          <strong>Connect</strong>
          <p>Find the right professionals</p>
        </div>
        <div>
          <span>03</span>
          <strong>Celebrate</strong>
          <p>Make memories that last</p>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="category-section" id="categories">
        <div className="premium-section-heading">
          <div>
            <span className="eyebrow">FIND YOUR INSPIRATION</span>
            <h2>What Are You <em>Celebrating?</em></h2>
            <p>
              Whatever the occasion, find the right people
              to make it unforgettable.
            </p>
          </div>
          <Link to="/signup" className="section-link">
            Explore all events ↗
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((item, index) => (
            <Link to="/signup" className="category-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="category-number">0{index + 1}</div>
              <div className="category-card-content">
                <span>{item.text}</span>
                <h3>{item.name}</h3>
                <div className="category-arrow">↗</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section className="services-section" id="features">
        <div className="premium-section-heading centered-heading">
          <span className="eyebrow">EVERYTHING UNDER ONE ROOF</span>
          <h2>Find the Perfect <em>Event Services</em></h2>
          <p>
            Discover professionals who can turn your ideas
            into a celebration worth remembering.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <Link to="/signup" className="service-card" key={service.name}>
              <div className="service-icon">{service.icon}</div>
              <div>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
              </div>
              <span className="service-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT / FEATURE STORY */}

      <section className="story-section" id="about">
        <div className="story-visual">
          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000"
            alt="Elegant celebration table decoration"
          />
          <div className="story-photo-label">
            <span>✦</span>
            <div>
              <strong>Special moments</strong>
              <p>Deserve special planning</p>
            </div>
          </div>
        </div>

        <div className="story-content">
          <span className="eyebrow">THE EVENT GUIDE EXPERIENCE</span>
          <h2>
            Less Searching.
            <br />
            More <em>Celebrating.</em>
          </h2>

          <p>
            Planning an event involves many details and finding
            the right professionals can be challenging.
            Event Guide brings event vendors together so you
            can explore services in one convenient place.
          </p>

          <div className="story-points">
            <div>
              <span>✓</span>
              <p>Discover vendors based on city and event needs</p>
            </div>
            <div>
              <span>✓</span>
              <p>Explore vendor profiles and service details</p>
            </div>
            <div>
              <span>✓</span>
              <p>Save favourites and check customer ratings</p>
            </div>
          </div>

          <Link to="/signup" className="premium-primary-btn">
            Discover Event Guide →
          </Link>
        </div>
      </section>

      {/* GALLERY */}

      <section className="inspiration-section">
        <div className="premium-section-heading centered-heading">
          <span className="eyebrow">A LITTLE INSPIRATION</span>
          <h2>Beautiful Events. <em>Endless Possibilities.</em></h2>
          <p>
            Get inspired by the details that make celebrations special.
          </p>
        </div>

        <div className="inspiration-gallery">
          <img
            className="gallery-tall"
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
            alt="Wedding celebration"
          />
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700"
            alt="Birthday celebration"
          />
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700"
            alt="Event venue"
          />
          <img
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700"
            alt="Celebration table"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="steps-section" id="how-it-works">
        <div className="premium-section-heading centered-heading">
          <span className="eyebrow">SIMPLE AS ONE, TWO, THREE</span>
          <h2>Your Event Journey <em>Starts Here</em></h2>
          <p>Four simple steps to make planning easier.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-count">01</span>
            <div className="step-icon">♙</div>
            <h3>Create Your Account</h3>
            <p>Sign up as a citizen and get started.</p>
          </div>

          <div className="step-card">
            <span className="step-count">02</span>
            <div className="step-icon">⌕</div>
            <h3>Discover Vendors</h3>
            <p>Search for services based on your requirements.</p>
          </div>

          <div className="step-card">
            <span className="step-count">03</span>
            <div className="step-icon">♡</div>
            <h3>Save Your Favourites</h3>
            <p>Keep the vendors you love in one place.</p>
          </div>

          <div className="step-card">
            <span className="step-count">04</span>
            <div className="step-icon">✧</div>
            <h3>Rate Your Experience</h3>
            <p>Share your feedback with the community.</p>
          </div>
        </div>
      </section>

      {/* VENDOR CTA */}

      <section className="vendor-cta">
        <div className="vendor-cta-image">
          <img
            src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=900"
            alt="Elegant event venue"
          />
        </div>

        <div className="vendor-cta-content">
          <span className="eyebrow">ARE YOU AN EVENT PROFESSIONAL?</span>
          <h2>Let More People <em>Discover Your Business.</em></h2>
          <p>
            Showcase your services, connect with people planning
            events and grow your presence with Event Guide.
          </p>
          <Link to="/signup" className="vendor-cta-btn">
            Join as a Vendor →
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="final-cta">
        <span className="eyebrow">LET THE CELEBRATION BEGIN</span>
        <h2>Your Next Beautiful Memory Starts Here.</h2>
        <p>
          Discover the people and services that bring your
          celebrations to life.
        </p>
        <Link to="/signup" className="final-cta-btn">
          Get Started with Event Guide ↗
        </Link>
        <div className="cta-decoration">✦</div>
      </section>

      {/* FOOTER */}

      <footer className="premium-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>✦ EVENT GUIDE</h2>
            <p>
              Bringing celebrations and the right event
              professionals together.
            </p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#categories">Event Categories</a>
            <a href="#features">Services</a>
            <a href="#about">About Us</a>
          </div>

          <div className="footer-column">
            <h3>How It Works</h3>
            <a href="#how-it-works">Getting Started</a>
            <Link to="/signup">Join as a Citizen</Link>
            <Link to="/signup">Join as a Vendor</Link>
          </div>

          <div className="footer-column">
            <h3>Your Account</h3>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Event Guide. All rights reserved.</span>
          <span>Made for moments that matter ✦</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;
