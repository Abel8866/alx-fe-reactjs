import "./App.css";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  );
}

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="movie-image-container">
        <img src={movie.posterUrl} alt={movie.title} />
      </div>
    </Link>
  );
}

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      // Replace these with your existing API helper or fetch logic
      const movieRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/movie/${id}`,
      );
      const creditsRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/movie/${id}/credits`,
      );

      const movieData = await movieRes.json();
      const creditsData = await creditsRes.json();

      if (!cancelled) {
        setMovie(movieData);
        setCast((creditsData.cast || []).slice(0, 10)); // top 10
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <h2>Cast</h2>
      <ul>
        {cast.map((p) => (
          <li key={p.id}>
            {p.name} {p.character ? `as ${p.character}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
