import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarIcon from "../assets/images/Star.svg";
import {
  getMovieCredits,
  getMovieDetails,
  tmdbImageUrl,
} from "../services/tmdb";

export default function MovieDetails() {
  const { id } = useParams();

  const movieId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const detailsRef = useRef(null);

  useEffect(() => {
    if (!movieId) {
      setError("Invalid movie id.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(movieId, { signal: controller.signal }),
          getMovieCredits(movieId, { signal: controller.signal }),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e?.message || "Failed to load movie details.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [movieId]);

  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        <Link to="/">← Back</Link>
        <p style={{ marginTop: 12 }}>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <Link to="/">← Back</Link>
        <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ padding: 16 }}>
        <Link to="/">← Back</Link>
        <p style={{ marginTop: 12 }}>Movie not found.</p>
      </div>
    );
  }

  const poster = tmdbImageUrl(movie.poster_path, "w500");
  const backdrop = tmdbImageUrl(movie.backdrop_path, "w1280");
  const cast = Array.isArray(credits?.cast) ? credits.cast : [];
  const crew = Array.isArray(credits?.crew) ? credits.crew : [];

  const castWithPhotos = cast.filter((p) => Boolean(p?.profile_path));
  const crewWithPhotos = crew.filter((p) => Boolean(p?.profile_path));

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const rating =
    typeof movie.vote_average === "number" ? movie.vote_average : null;
  const votes = typeof movie.vote_count === "number" ? movie.vote_count : null;

  function scrollToDetails() {
    const node = detailsRef.current;
    if (!node) return;
    if (typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="movie-details">
      <header
        className="movie-detailsHero movie-detailsHero--clickable"
        style={
          backdrop
            ? {
                "--movie-backdrop": `url(${backdrop})`,
              }
            : undefined
        }
        role="button"
        tabIndex={0}
        aria-label="View movie details"
        onClick={scrollToDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            scrollToDetails();
          }
        }}
      >
        <div className="movie-detailsHeroBg" aria-hidden="true" />
        <div className="movie-detailsHeroOverlay" aria-hidden="true" />

        <div className="movie-detailsHeroInner">
          <div className="movie-detailsHeroLeft">
            <h1 className="movie-detailsTitle">
              {movie.title}
              {year ? (
                <span className="movie-detailsYear"> ({year})</span>
              ) : null}
            </h1>

            {rating !== null ? (
              <div className="movie-detailsHeroRating" aria-label="Rating">
                <div className="movie-detailsHeroRatingRow">
                  <img
                    className="movie-detailsHeroStar"
                    src={StarIcon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="movie-detailsHeroScore">
                    {rating.toFixed(1)}
                  </span>
                  <span className="movie-detailsHeroOutOf">/ 10</span>
                </div>
                {votes !== null ? (
                  <div className="movie-detailsHeroVotes">{votes} votes</div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="movie-detailsBody">
        <section
          ref={detailsRef}
          className="movie-detailsCard"
          aria-label="Movie details"
        >
          <div className="movie-detailsCardInner">
            <div className="movie-detailsPosterCol">
              {poster ? (
                <img
                  className="movie-detailsPoster"
                  src={poster}
                  alt={movie.title || "Movie poster"}
                />
              ) : (
                <div className="movie-detailsPosterEmpty">No image</div>
              )}
            </div>

            <div className="movie-detailsInfo">
              <div className="movie-detailsInfoHeader">
                <h2 className="movie-detailsInfoTitle">{movie.title}</h2>
                <div className="movie-detailsMeta">
                  {movie.release_date ? (
                    <span>{movie.release_date}</span>
                  ) : null}
                  {movie.runtime ? (
                    <span>
                      {movie.release_date ? " • " : ""}
                      {movie.runtime} min
                    </span>
                  ) : null}
                </div>
              </div>

              {Array.isArray(movie.genres) && movie.genres.length ? (
                <div className="movie-genres" aria-label="Genres">
                  {movie.genres
                    .map((g) => g?.name)
                    .filter(Boolean)
                    .map((name) => (
                      <span key={name} className="movie-genreChip">
                        {name}
                      </span>
                    ))}
                </div>
              ) : null}

              <h3 className="movie-detailsSectionTitle">Overview</h3>
              <p className="movie-detailsOverview">
                {movie.overview || "No description available."}
              </p>

              <div className="movie-detailsActions">
                <Link className="movie-detailsBackLink" to="/">
                  Back to movies
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="movie-detailsPeople" aria-label="Cast">
          <h2 className="movie-detailsPeopleTitle">
            Cast ({castWithPhotos.length})
          </h2>
          {castWithPhotos.length === 0 ? (
            <p className="movie-detailsEmpty">No cast info available.</p>
          ) : (
            <div className="people-grid">
              {castWithPhotos.map((person) => {
                const profile = tmdbImageUrl(person.profile_path, "w185");
                return (
                  <Link
                    key={person.id}
                    to={`/people/${person.id}`}
                    className="people-card people-cardLink"
                    aria-label={`View details for ${person.name || "this person"}`}
                  >
                    <img
                      className="people-photo"
                      src={profile}
                      alt={person.name}
                      loading="lazy"
                    />
                    <div className="people-meta">
                      <div className="people-name">{person.name}</div>
                      {person.character ? (
                        <div className="people-role">{person.character}</div>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="movie-detailsPeople" aria-label="Crew">
          <h2 className="movie-detailsPeopleTitle">
            Crew ({crewWithPhotos.length})
          </h2>
          {crewWithPhotos.length === 0 ? (
            <p className="movie-detailsEmpty">No crew info available.</p>
          ) : (
            <div className="people-grid">
              {crewWithPhotos.map((person) => {
                const profile = tmdbImageUrl(person.profile_path, "w185");
                return (
                  <Link
                    key={`${person.id}-${person.job}`}
                    to={`/people/${person.id}`}
                    className="people-card people-cardLink"
                    aria-label={`View details for ${person.name || "this person"}`}
                  >
                    <img
                      className="people-photo"
                      src={profile}
                      alt={person.name}
                      loading="lazy"
                    />
                    <div className="people-meta">
                      <div className="people-name">{person.name}</div>
                      {person.job ? (
                        <div className="people-role">{person.job}</div>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
