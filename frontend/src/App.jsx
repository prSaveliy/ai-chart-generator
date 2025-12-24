import { useState } from "react";
import Plot from "react-plotly.js";

function App() {
  const [prompt, setPrompt] = useState("");
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateChart = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      setChart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>AI Chart Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the chart you want..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={generateChart} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {chart && (
        <Plot
          data={chart.data}
          layout={chart.layout}
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
}

export default App;
