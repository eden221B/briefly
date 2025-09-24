// frontend/src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/briefly.jpg"; // your image path
function Landing() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link to="/home">
          <button
            style={{
              padding: "16px 32px",
              backgroundColor: "#333",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              marginTop: "590px",
            }}
          >
            Get Started →
          </button>
        </Link>
      </div>
    );
  }
  
  export default Landing;