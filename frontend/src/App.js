import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { setAuthToken } from "./services/api";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuthToken(null);
  };

  return (
    <Router>
      <Navbar user={user} />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/home"
            element={<Home user={user} setUser={setUser} onLogout={handleLogout} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
