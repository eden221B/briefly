import React, { useState } from "react";

function SummaryList({ summaries, setSummaries }) {
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleCompare = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: summaries.map((s) => ({
            productTitle: s.productTitle,
            aiSummary: s.aiSummary,
          })),
          criteria: {}, // optional for now
        }),
      });
      const data = await res.json();
      setComparisonResult(data);
    } catch (err) {
      console.error("Comparison failed:", err);
      alert("Failed to compare products. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/summaries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update state immediately
        setSummaries((prev) => prev.filter((s) => s._id !== id));
      } else {
        const errorText = await res.text();
        console.error("Delete failed:", errorText);
        alert("Failed to delete summary. Check console for details.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete summary. Check console for details.");
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <h3>Saved Summaries</h3>
      {summaries.length === 0 && <p>No summaries yet</p>}

      {summaries.map((s, i) => (
        <div
          key={s._id || i}
          style={{
            border: "1px solid #ddd",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <h4>{s.productTitle}</h4>
          <ul>
            {s.aiSummary.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
          <strong>Pros:</strong> {s.aiSummary.pros.join(", ")} <br />
          <strong>Cons:</strong> {s.aiSummary.cons.join(", ")} <br />
          <strong>Price:</strong> {s.aiSummary.price.amount} {s.aiSummary.price.currency} <br />
          <em>{s.aiSummary.recommendation}</em>
          <br />
          <button
            onClick={() => handleDelete(s._id)}
            style={{
              marginTop: "8px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ❌ Delete
          </button>
        </div>
      ))}

      {summaries.length > 1 && (
        <div style={{ marginTop: "15px" }}>
          <button
            onClick={handleCompare}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            Compare Products
          </button>
        </div>
      )}

      {comparisonResult && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4>Comparison Result</h4>
          <p>
            <strong>Best Option:</strong> {comparisonResult.bestOption}
          </p>
          <p>
            <strong>Rationale:</strong> {comparisonResult.rationale}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#eee" }}>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Product</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Pros</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Cons</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Price</th>
                <th style={{ border: "1px solid #ccc", padding: "5px" }}>Value Score</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResult.comparisons.map((c, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{c.productTitle}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{c.pros.join(", ")}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{c.cons.join(", ")}</td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                    {c.price.amount} {c.price.currency}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "5px" }}>{c.valueScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SummaryList;
