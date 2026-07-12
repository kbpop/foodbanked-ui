import { Link } from 'react-router'
import './Landing.css'

export function Landing() {
  return (
    <section id="landing">
      <div className="landing-content">
        <h1>FoodBanked</h1>
        <p className="tagline">
          Connecting communities with food banks — find what you need, or
          give what you can.
        </p>
        <div className="landing-actions">
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </section>
  )
}

