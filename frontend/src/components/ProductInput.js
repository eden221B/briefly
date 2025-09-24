// frontend/src/components/ProductInput.js
import React, { useState } from "react";
import API from "../services/api";

function ProductInput({ setSummaries }) {
  const [rawData, setRawData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!rawData.trim()) return alert('Please paste product text');
    setLoading(true);
    try {
      const res = await API.post("/api/ai/summarize", { rawData });
      setSummaries(prev => [res.data.summary, ...prev]);
      setRawData("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error summarizing product (are you logged in?)");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>Enter Product Description</h3>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize Product"}
      </button>
    </div>
  );
}

export default ProductInput;
