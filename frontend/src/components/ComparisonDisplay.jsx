import React from "react";

export default function ComparisonDisplay({ comparisonData }) {
  if (!comparisonData || !comparisonData.aiComparison) return null;

  const { comparisons, bestOption, rationale } = comparisonData.aiComparison;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Product Comparison</h2>
      {comparisons.map((p, idx) => {
        const isBest = p.productTitle === bestOption;
        return (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: isBest ? "#e0ffe0" : "#f9f9f9",
            }}
          >
            <h3>
              {p.productTitle} {isBest && "⭐ Best Choice"}
            </h3>
            <ul>
              <li>
                <strong>Pros:</strong> {p.pros.join(", ")}
              </li>
              <li>
                <strong>Cons:</strong> {p.cons.join(", ")}
              </li>
              <li>
                <strong>Price:</strong> {p.price.amount} {p.price.currency}
              </li>
              <li>
                <strong>Value Score:</strong> {p.valueScore}
              </li>
              
            </ul>
          </div>
        );
      })}
      <p>
        <strong>Rationale:</strong> {rationale}
      </p>
    </div>
  );
}
