import { useState } from "react";
import "./App.css";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (err) {
      console.error("Joke fetch failed:", err);
      setJoke(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = loading ? "Fetching..." : "Fetch joke";

  return (
    <div className="app">
      <h1>Random Joke</h1>

      <div className="card">
        {error && (
          <p className="error">Could not fetch a joke. Try again.</p>
        )}

        {!error && joke && (
          <>
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </>
        )}

        {!error && !joke && (
          <p className="hint">Click the button to fetch a fresh one.</p>
        )}
      </div>

      <button onClick={fetchJoke} disabled={loading}>
        {buttonLabel}
      </button>

      {error && !loading && (
        <button onClick={fetchJoke} className="retry">
          Try again
        </button>
      )}
    </div>
  );
}

export default App;