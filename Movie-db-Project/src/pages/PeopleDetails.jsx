import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarIcon from "../assets/images/Star.svg";
import {
  getMovieGenreMap,
  getPersonCombinedCredits,
  getPersonDetails,
  tmdbImageUrl,
} from "../services/tmdb";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function uniqueById(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const id = item?.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    result.push(item);
  }
  return result;
}

function sortByReleaseDateDesc(a, b) {
  const da = a?.release_date ? new Date(a.release_date).getTime() : 0;
  const db = b?.release_date ? new Date(b.release_date).getTime() : 0;
  return db - da;
}

export default function PeopleDetails() {
  const { id } = useParams();

  const personId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState(null);
  const [genreMap, setGenreMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!personId) {
      setError("Invalid person id.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [personData, creditsData, genres] = await Promise.all([
          getPersonDetails(personId, { signal: controller.signal }),
          getPersonCombinedCredits(personId, { signal: controller.signal }),
          getMovieGenreMap(),
        ]);

        setPerson(personData);
        setCredits(creditsData);
        setGenreMap(genres || {});
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e?.message || "Failed to load person details.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [personId]);

  if (loading) {
    return (
      <main className="person-detailsPage" aria-busy="true">
        <div className="person-detailsContainer">
          <p className="person-detailsStatus">Loading…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="person-detailsPage">
        <div className="person-detailsContainer">
          <p className="person-detailsStatus person-detailsStatus--error">
            {error}
          </p>
          <Link className="person-detailsBack" to="/people">
            Back to people
          </Link>
        </div>
      </main>
    );
  }

  if (!person) {
    return (
      <main className="person-detailsPage">
        <div className="person-detailsContainer">
          <p className="person-detailsStatus">Person not found.</p>
          <Link className="person-detailsBack" to="/people">
            Back to people
          </Link>
        </div>
      </main>
    );
  }

  const photo = tmdbImageUrl(person.profile_path, "w342");
  const birthday = formatDate(person.birthday);
  const deathday = formatDate(person.deathday);

  const castMovies = uniqueById(
    (Array.isArray(credits?.cast) ? credits.cast : [])
      .filter((item) => item?.media_type === "movie")
      .sort(sortByReleaseDateDesc),
  );

  const crewMovies = uniqueById(
    (Array.isArray(credits?.crew) ? credits.crew : [])
      .filter((item) => item?.media_type === "movie")
      .sort(sortByReleaseDateDesc),
  );

  return (
    <main className="person-detailsPage">
      <div className="person-detailsContainer">
        <section className="person-detailsCard" aria-label="Person details">
          <div className="person-detailsCardInner">
            <div className="person-detailsPhotoCol">
              {photo ? (
                <img
                  className="person-detailsPhoto"
                  src={photo}
                  alt={person.name || "Person"}
                />
              ) : (
                <div
                  className="person-detailsPhotoEmpty"
                  aria-label="No photo"
                />
              )}
            </div>

            <div className="person-detailsInfoCol">
              <h1 className="person-detailsName">{person.name}</h1>

              <div className="person-detailsFacts" aria-label="Biography facts">
                <p className="person-detailsFact">
                  <span className="person-detailsFactLabel">
                    Date of birth:
                  </span>{" "}
                  <span className="person-detailsFactValue">
                    {birthday || "—"}
                    {deathday ? ` (died ${deathday})` : ""}
                  </span>
                </p>
                <p className="person-detailsFact">
                  <span className="person-detailsFactLabel">
                    Place of birth:
                  </span>{" "}
                  <span className="person-detailsFactValue">
                    {person.place_of_birth || "—"}
                  </span>
                </p>
              </div>

              <p className="person-detailsBio">
                {person.biography || "No biography available."}
              </p>
            </div>
          </div>
        </section>

        <section className="person-credits" aria-label="Cast credits">
          <h2 className="person-creditsTitle">
            Movies - cast ({castMovies.length})
          </h2>
          {castMovies.length === 0 ? (
            <p className="person-creditsEmpty">No cast movies available.</p>
          ) : (
            <div className="movie-grid">
              {castMovies.map((movie) => (
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
                      <div className="movie-poster movie-poster--empty">
                        No image
                      </div>
                    )}

                    <div className="movie-meta">
                      <div className="movie-heading">
                        <h3 className="movie-name">
                          {movie.title ?? "Untitled"}
                        </h3>
                        {movie.release_date ? (
                          <p className="movie-year">
                            {movie.release_date.slice(0, 4)}
                          </p>
                        ) : null}
                      </div>

                      {Array.isArray(movie?.genre_ids) &&
                      movie.genre_ids.length ? (
                        <div className="movie-genres" aria-label="Genres">
                          {movie.genre_ids
                            .map((gid) => genreMap?.[gid])
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
          )}
        </section>

        <section className="person-credits" aria-label="Crew credits">
          <h2 className="person-creditsTitle">
            Movies - crew ({crewMovies.length})
          </h2>
          {crewMovies.length === 0 ? (
            <p className="person-creditsEmpty">No crew movies available.</p>
          ) : (
            <div className="movie-grid">
              {crewMovies.map((movie) => (
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
                      <div className="movie-poster movie-poster--empty">
                        No image
                      </div>
                    )}

                    <div className="movie-meta">
                      <div className="movie-heading">
                        <h3 className="movie-name">
                          {movie.title ?? "Untitled"}
                        </h3>
                        {movie.release_date ? (
                          <p className="movie-year">
                            {movie.release_date.slice(0, 4)}
                          </p>
                        ) : null}
                      </div>

                      {Array.isArray(movie?.genre_ids) &&
                      movie.genre_ids.length ? (
                        <div className="movie-genres" aria-label="Genres">
                          {movie.genre_ids
                            .map((gid) => genreMap?.[gid])
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
          )}
        </section>
      </div>
    </main>
  );
}
