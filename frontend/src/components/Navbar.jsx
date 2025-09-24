import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#333",
        color: "white",
        borderRadius: "15px", // rounded corners
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)", // shadow for 3D effect
        width: "90%", // adjust width as needed
        maxWidth: "1000px",
        margin: "20px auto", // center navbar horizontally
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
      <h2 style={{ fontSize: "50px", margin: 0 }}>briefly.</h2>
      </Link>


      <div>
        {!user ? (
          <Link to="/home">
            <button
              style={{
                padding: "12px 12px", 
                backgroundColor: "#8f8d8d",
                border: "none",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              Login
            </button>
          </Link>
        ) : (
            <span style={{ fontSize: "1.5rem", fontWeight: "500" }}>
            Welcome, {user.name || user.email}!
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
