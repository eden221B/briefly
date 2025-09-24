import React from "react";

function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "#222",
        color: "white",
        textAlign: "center",
        borderRadius: "15px", // <-- added
      }}
    >
      <p>© {new Date().getFullYear()} briefly. All rights reserved.</p>
      <small>Built with React and AI</small>
    </footer>
  );
}

export default Footer;
