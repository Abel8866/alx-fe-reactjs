import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const topCast = cast.slice(0, 12);

  return (
    <div style={{ padding: 16 }}>
      <Link to="/">← Back</Link>

      {backdrop ? (
        <div
          style={{
            marginTop: 12,
            borderRadius: 12,
            overflow: "hidden",
            maxHeight: 320,
          }}
        >
          <img
            src={backdrop}
            alt=""
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
      ) : null}

      <div
        style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title || movie.name || "Poster"}
            style={{
              width: 220,
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
        ) : null}

        <div style={{ minWidth: 260, maxWidth: 720 }}>
          <h1 style={{ margin: 0 }}>{movie.title}</h1>

          <div style={{ marginTop: 8, opacity: 0.85 }}>
            {movie.release_date ? <span>{movie.release_date}</span> : null}
            {movie.runtime ? (
              <span>
                {movie.release_date ? " • " : ""}
                {movie.runtime} min
              </span>
            ) : null}
            {Array.isArray(movie.genres) && movie.genres.length ? (
              <span>
                {movie.release_date || movie.runtime ? " • " : ""}
                {movie.genres
                  .map((g) => g.name)
                  .filter(Boolean)
                  .join(", ")}
              </span>
            ) : null}
          </div>

          <h2 style={{ marginTop: 16, marginBottom: 6 }}>Overview</h2>
          <p style={{ marginTop: 0, lineHeight: 1.5 }}>
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>

      <h2 style={{ marginTop: 20, marginBottom: 10 }}>Top Cast</h2>
      {topCast.length === 0 ? (
        <p>No cast info available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {topCast.map((person) => {
            const profile = tmdbImageUrl(person.profile_path, "w185");
            return (
              <div
                key={person.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {profile ? (
                  <img
                    src={profile}
                    alt={person.name}
                    style={{
                      width: "100%",
                      height: 240,
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      height: 240,
                      display: "grid",
                      placeItems: "center",
                      opacity: 0.7,
                    }}
                  >
                    No photo
                  </div>
                )}

                <div style={{ padding: 10 }}>
                  <div style={{ fontWeight: 700 }}>{person.name}</div>
                  {person.character ? (
                    <div style={{ opacity: 0.8, marginTop: 4 }}>
                      as {person.character}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
