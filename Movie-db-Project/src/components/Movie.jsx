import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import StarIcon from "../assets/images/Star.svg";
import {
  discoverMoviesPage,
  getMovieGenreMap,
  searchMoviesPage,
  tmdbImageUrl,
} from "../services/tmdb";

const MAX_MOVIES = 500;
const MOVIES_PER_PAGE = 20;
const MAX_PAGES = Math.ceil(MAX_MOVIES / MOVIES_PER_PAGE);

function Movie() {
  const [searchParams] = useSearchParams();

  const query = useMemo(() => {
    const q = (searchParams.get("q") || "").trim();
    return q;
  }, [searchParams]);

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [genreMap, setGenreMap] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const gridTopRef = useRef(null);
  const pageControllerRef = useRef(null);
  const shouldScrollAfterLoadRef = useRef(false);

  function clampPage(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 1;
    return Math.max(1, Math.min(MAX_PAGES, Math.floor(numeric)));
  }

  async function loadPage(targetPage, { signal, query: queryOverride } = {}) {
    try {
      setIsLoading(true);
      setError("");

      const safePage = clampPage(targetPage);

      const activeQuery =
        typeof queryOverride === "string" ? queryOverride : query;

      const moviesPage = activeQuery
        ? await searchMoviesPage({
            signal,
            page: safePage,
            query: activeQuery,
          })
        : await discoverMoviesPage({
            signal,
            page: safePage,
          });

      setMovieList(Array.isArray(moviesPage.results) ? moviesPage.results : []);
      const apiPage = moviesPage.page ?? safePage;
      const apiTotalPages = moviesPage.totalPages ?? 1;
      const cappedTotalPages = Math.max(1, Math.min(apiTotalPages, MAX_PAGES));

      setTotalPages(cappedTotalPages);
      setPage(Math.max(1, Math.min(apiPage, cappedTotalPages)));
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to load movies.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    pageControllerRef.current?.abort?.();
    pageControllerRef.current = controller;

    (async () => {
      try {
        setIsLoading(true);
        setError("");

        const [genres] = await Promise.all([getMovieGenreMap()]);
        setGenreMap(genres);

        await loadPage(1, { signal: controller.signal, query });
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
      pageControllerRef.current?.abort?.();
    };
  }, []);

  useEffect(() => {
    // When the navbar search updates ?q=..., reload from page 1.
    const controller = new AbortController();
    pageControllerRef.current?.abort?.();
    pageControllerRef.current = controller;

    shouldScrollAfterLoadRef.current = true;
    scrollToTop();

    void loadPage(1, { signal: controller.signal, query });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!shouldScrollAfterLoadRef.current) return;
    if (isLoading) return;

    shouldScrollAfterLoadRef.current = false;
    scrollToTop();
  }, [page, isLoading]);

  function scrollToTop() {
    if (gridTopRef.current?.scrollIntoView) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const scrollingElement =
      typeof document !== "undefined" ? document.scrollingElement : null;

    if (scrollingElement?.scrollTo) {
      scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (typeof window !== "undefined" && window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function beginNavigation(targetPage) {
    const safeTarget = clampPage(targetPage);
    if (safeTarget === page) return;

    // Scroll immediately, then scroll again once the new page has finished loading.
    shouldScrollAfterLoadRef.current = true;

    scrollToTop();

    const controller = new AbortController();
    pageControllerRef.current?.abort?.();
    pageControllerRef.current = controller;

    void loadPage(safeTarget, { signal: controller.signal, query });
  }

  function handleFirst() {
    if (isLoading || page <= 1) return;
    beginNavigation(1);
  }

  function handlePrev() {
    if (isLoading || page <= 1) return;
    beginNavigation(page - 1);
  }

  function handleNext() {
    if (isLoading || page >= totalPages) return;
    beginNavigation(page + 1);
  }

  function handleLast() {
    if (isLoading || page >= totalPages) return;
    beginNavigation(totalPages);
  }

  return (
    <div className="movie-page">
      <h1 className="movie-title">
        {query ? `Results for "${query}"` : "Popular Movies"}
      </h1>

      {isLoading ? <p>Loading…</p> : null}
      {error ? <p className="movie-error">{error}</p> : null}

      <div className="movie-gridTop" ref={gridTopRef} />

      <div className="movie-grid">
        {movieList.map((movie) => (
          <article key={movie.id} className="movie-card lcPaUB">
            <Link
              to={`/movies/${movie.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
              aria-label={`View details for ${movie.title ?? "this movie"}`}
            >
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
                    <p className="movie-year">
                      {movie.release_date.slice(0, 4)}
                    </p>
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
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination layout like your screenshot */}
      <div className="movie-pagination" aria-label="Pagination">
        <button
          type="button"
          onClick={handleFirst}
          disabled={isLoading || page <= 1}
        >
          ‹ First
        </button>

        <button
          type="button"
          onClick={handlePrev}
          disabled={isLoading || page <= 1}
        >
          ‹ Previous
        </button>

        <span aria-live="polite">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading || page >= totalPages}
        >
          Next ›
        </button>

        <button
          type="button"
          onClick={handleLast}
          disabled={isLoading || page >= totalPages}
        >
          Last ›
        </button>
      </div>
    </div>
  );
}

export default Movie;
