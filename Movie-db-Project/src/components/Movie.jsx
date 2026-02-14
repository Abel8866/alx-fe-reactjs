import { useEffect, useState } from "react";
import StarIcon from "../assets/images/Star.svg";
import { discoverMovies, getMovieGenreMap, tmdbImageUrl } from "../services/tmdb";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const [movies, genres] = await Promise.all([
          discoverMovies({ signal: controller.signal }),
          getMovieGenreMap(),
        ]);
        setMovieList(movies);
        setGenreMap(genres);
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
      <h1 className="movie-title">Popular Movies</h1>

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
              <div className="movie-heading">
                <h2 className="movie-name">{movie.title ?? "Untitled"}</h2>
                {movie.release_date ? (
                  <p className="movie-year">{movie.release_date.slice(0, 4)}</p>
                ) : null}
              </div>

              {Array.isArray(movie?.genre_ids) && movie.genre_ids.length ? (
                <div className="movie-genres" aria-label="Genres">
                  {movie.genre_ids
                    .map((id) => genreMap?.[id])
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((name) => (
                      <span key={name} className="movie-genreChip">
                        {name}
                      </span>
                    ))}
                </div>
              ) : null}

              {typeof movie?.vote_average === "number" ? (
                <div className="movie-ratingRow">
                  <img className="movie-star" src={StarIcon} alt="" aria-hidden="true" />
                  <span className="movie-rating">{movie.vote_average.toFixed(1)}</span>
                  {typeof movie?.vote_count === "number" ? (
                    <span className="movie-votes">{movie.vote_count} votes</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Movie;
