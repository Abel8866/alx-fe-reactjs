import { useEffect, useState } from "react";
import { discoverMovies, tmdbImageUrl } from "../services/tmdb";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const movies = await discoverMovies({ signal: controller.signal });
        setMovieList(movies);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load movies.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <div className="movie-page">
      <h1 className="movie-title">Movies</h1>

      {isLoading ? <p>Loading…</p> : null}
      {error ? <p className="movie-error">{error}</p> : null}

      <div className="movie-grid">
        {movieList.map((movie) => (
          <article key={movie.id} className="movie-card lcPaUB">
            {movie?.poster_path ? (
              <img
                className="movie-poster"
                src={tmdbImageUrl(movie.poster_path, "w500")}
                alt={movie.title ?? "movie poster"}
                loading="lazy"
              />
            ) : (
              <div className="movie-poster movie-poster--empty">No image</div>
            )}

            <div className="movie-meta">
              <h2 className="movie-name">{movie.title ?? "Untitled"}</h2>
              {movie.release_date ? (
                <p className="movie-sub">{movie.release_date}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Movie;
