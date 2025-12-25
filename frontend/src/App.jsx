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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        marginTop: "30px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(22, 22, 22, 0.36)",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "60px",
            marginTop: "30px"
          }}
        >
          AI Chart Generator
        </h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the chart you want..."
          rows={6}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={generateChart}
            disabled={loading || !prompt.trim()}
            style={{
              padding: "12px 40px",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Chart"}
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom: "20px",
              color: "red",
            }}
          >
            {error}
          </div>
        )}

        {chart && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom:"30px",
            }}
          >
            <Plot
              data={chart.data}
              layout={{ ...chart.layout, autosize: true }}
              config={{ responsive: true }}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
