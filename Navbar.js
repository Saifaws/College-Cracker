import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import React, { useEffect, useState } from "react";

function Navbar() {
  const user = localStorage.getItem("user");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
  },[localStorage]);

  return (
    <div className="navbar">
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaAlignLeft color="#45B6C9" />
        </button>

        <h3 className="logo-text">College Cracker</h3>

        <div className="btn-container">
          <button type="button" className="btn btn-navbar">
            <FaUserCircle />
            {JSON.parse(user).name}
          </button>
          {/* <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={removeUserFromLocalStorage}
            >
              logout
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
