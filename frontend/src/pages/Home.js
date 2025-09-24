import React, { useState, useEffect } from "react";
import ProductInput from "../components/ProductInput";
import SummaryList from "../components/SummaryList";
import ComparisonForm from "../components/ComparisonForm";
import AuthForms from "../components/AuthForms";
import API from "../services/api";

function Home({ user, setUser, onLogout }) {
  const [summaries, setSummaries] = useState([]);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await API.get("/api/summaries");
        setSummaries(res.data.summaries);
      } catch (err) {
        console.error(err);
      }
    };

    if (localStorage.getItem("token")) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && setUser) setUser(storedUser);
      fetchSummaries();
    }
  }, [setUser]);

  const handleAuth = (user) => {
    if (setUser) setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    API.get("/api/summaries")
      .then((res) => setSummaries(res.data.summaries))
      .catch(console.error);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    setSummaries([]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "20px" }}>
      {!user ? (
        <AuthForms onAuth={handleAuth} />
      ) : (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ margin: 0, color: "#333" }}>
              Welcome, {user.name || user.email}
            </h2>
            <button
              onClick={handleLogout}
              style={{
                background: "#e63946",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </div>

          {/* Product Input */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <ProductInput setSummaries={setSummaries} />
          </div>

          {/* Summaries */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "#444" }}>Saved Summaries</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {/* Pass setSummaries to SummaryList */}
              <SummaryList summaries={summaries} setSummaries={setSummaries} />
            </div>
          </div>

          {/* Comparison */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <ComparisonForm summaries={summaries} setComparison={setComparison} />
            {comparison && (
              <div style={{ marginTop: "20px" }}>
                <h3>Comparison Result</h3>
                <pre>{JSON.stringify(comparison, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
