import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Profile from "./components/Profile.jsx";
import BlogPost from "./components/BlogPost.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import useAuth from "./auth/useAuth.js";

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

function RouterApp() {
  const { logout } = useAuth();
  // Keeping the counter state in Home as-is; this local state is only for Home.
  return (
    <BrowserRouter>
      <nav
        className="card"
        style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/blog/1">Blog Post</Link>
        <Link to="/login">Login</Link>
        <button type="button" onClick={() => logout()}>
          Log out
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile/*" element={<Profile />} />
        </Route>

        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}

export default App;
