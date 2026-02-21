import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function About() {
  return (
    <>
      <h1>About</h1>
      <p className="read-the-docs">This is a basic React Router setup.</p>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <p className="read-the-docs">Page not found.</p>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav
        className="card"
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
