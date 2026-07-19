import { Link } from "react-router";
import "./Landing.css";

export function Landing() {
  return (
    <section id="landing">
      <div className="landing-content">
        <div className="landing-badge">Community-powered food access</div>
        <h1>FoodBanked</h1>
        <p className="tagline">
          Connecting neighborhoods, donors, and food bank staff with a calmer,
          more thoughtful way to share resources.
        </p>
        <div className="landing-actions">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
          <Link to="/staff-inventory" className="btn btn-secondary">
            Staff Inventory
          </Link>
        </div>
        <div className="landing-highlights">
          <div className="highlight-card">Track pantry staples in one place</div>
          <div className="highlight-card">Support partners and volunteers</div>
          <div className="highlight-card">Keep operations moving smoothly</div>
        </div>
      </div>
    </section>
  );
}
