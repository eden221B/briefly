export default function SummaryDisplay({ summary }) {
    if (!summary) return null;
    const { productTitle, bullets, pros, cons, price, valueScore, recommendation } = summary;
  
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <h2>{productTitle}</h2>
        <ul>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <p><strong>Pros:</strong> {pros.join(", ")}</p>
        <p><strong>Cons:</strong> {cons.join(", ")}</p>
        <p><strong>Price:</strong> {price.amount} {price.currency}</p>
        <p><strong>Value Score:</strong> {valueScore}</p>
        <p><strong>Recommendation:</strong> {recommendation}</p>
      </div>
    );
  }
  