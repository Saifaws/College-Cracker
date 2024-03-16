import "./LandingPage.css";
import LandingPageImage from "./assets/landingpageimage.svg";
import Logo from "./assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="landing-page">
      <nav>
        <img alt="imgs" src={Logo} width={250} />
      </nav>

      <div className="container page">
        <div className="info">
          <h1 className="landing-text">
            Track <span>colleges</span> you applied for!
          </h1>
          <p>
            Keep a track of all the colleges you have applied for at a single
            place.
          </p>
          <Link to="/register">
            <button className="btn landing-btn">Register/Login</button>
          </Link>
        </div>
        <img alt="imgs" src={LandingPageImage} className="main-img" width={600} />
      </div>
    </div>
  );
}

export default LandingPage;
