// frontend/src/components/ComparisonForm.js
export default function ComparisonDisplay({ comparisonData }) {
    if (!comparisonData || !comparisonData.aiComparison) return null;
  
    const { comparisons, bestOption, rationale } = comparisonData.aiComparison;
  
    return (
      <div>
        <h2>Product Comparisons</h2>
        {comparisons.map((p, idx) => (
          <div key={idx} style={{ border: "1px solid #", padding: "10px", marginBottom: "10px"}}>
            <h3>{p.productTitle}</h3>
            <ul>
              <li><strong>Pros:</strong> {p.pros.join(", ")}</li>
              <li><strong>Cons:</strong> {p.cons.join(", ")}</li>
              <li><strong>Price:</strong> {p.price.amount} {p.price.currency}</li>
              <li><strong>Value Score:</strong> {p.valueScore}</li>
              
            </ul>
          </div>
        ))}
        <h3>Best Option: {bestOption}</h3>
        <p><strong>Rationale:</strong> {rationale}</p>
      </div>
    );
  }
  