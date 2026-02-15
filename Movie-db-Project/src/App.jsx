import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesPage from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails";
import People from "./pages/People";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/people" element={<People />} />
      </Route>
    </Routes>
  );
}
