import { useEffect, useRef, useState } from "react";
import StarIcon from "../assets/images/Star.svg";
import {
  discoverMoviesPage,
  getMovieGenreMap,
  tmdbImageUrl,
} from "../services/tmdb";

function Movie() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [genreMap, setGenreMap] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadMoreControllerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const [moviesPage, genres] = await Promise.all([
          discoverMoviesPage({ signal: controller.signal, page: 1 }),
          getMovieGenreMap(),
        ]);

        setMovieList(moviesPage.results);
        setGenreMap(genres);
        setPage(1);
        setHasMore(moviesPage.page < moviesPage.totalPages);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load movies.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
    return () => {
      controller.abort();
      loadMoreControllerRef.current?.abort?.();
    };
  }, []);

  async function handleLoadMore() {
    if (isLoading || isLoadingMore || !hasMore) return;

    const controller = new AbortController();
    loadMoreControllerRef.current?.abort?.();
    loadMoreControllerRef.current = controller;

    try {
      setIsLoadingMore(true);
      setError("");

      const nextPage = page + 1;
      const moviesPage = await discoverMoviesPage({
        signal: controller.signal,
        page: nextPage,
      });

      setMovieList((prev) => {
        const seen = new Set(prev.map((m) => m?.id).filter(Boolean));
        const next = Array.isArray(moviesPage.results)
          ? moviesPage.results
          : [];
        const deduped = next.filter((m) => {
          const id = m?.id;
          if (!id || seen.has(id)) return false;
          seen.add(id);
          return true;
        });
        return [...prev, ...deduped];
      });

      setPage(moviesPage.page);
      setHasMore(moviesPage.page < moviesPage.totalPages);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "Failed to load more movies.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  }

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
                  <img
                    className="movie-star"
                    src={StarIcon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="movie-rating">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  {typeof movie?.vote_count === "number" ? (
                    <span className="movie-votes">
                      {movie.vote_count} votes
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <button type="button" onClick={handleLoadMore} disabled={isLoadingMore}>
          {isLoadingMore ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </div>
  );
}

export default Movie;
