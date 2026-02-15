import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w342";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function People() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page") || 1);
  const qFromUrl = (searchParams.get("q") || "").trim();

  const page = useMemo(
    () => clamp(Number.isFinite(pageFromUrl) ? pageFromUrl : 1, 1, 500),
    [pageFromUrl],
  );
  const query = qFromUrl;

  const [people, setPeople] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError(
        "Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.",
      );
      return;
    }

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");

      try {
        const endpoint = query
          ? `${TMDB_BASE}/search/person?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
              query,
            )}&page=${page}&include_adult=false`
          : `${TMDB_BASE}/person/popular?api_key=${apiKey}&language=en-US&page=${page}`;

        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data = await res.json();

        setPeople(Array.isArray(data?.results) ? data.results : []);
        // TMDB caps to 500 pages
        setTotalPages(clamp(Number(data?.total_pages || 1), 1, 500));
      } catch (e) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Failed to load people.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [apiKey, page, query]);

  function updateParams(next) {
    const nextParams = new URLSearchParams(searchParams);

    if (next.q) nextParams.set("q", next.q);
    else nextParams.delete("q");

    nextParams.set("page", String(next.page || 1));
    setSearchParams(nextParams);
  }

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <main className="people-page">
      <div className="people-top">
        <h2 className="people-title">
          {query ? `Results for "${query}"` : "Popular people"}
        </h2>
      </div>

      {error ? <div className="people-error">{error}</div> : null}
      {loading ? <div className="people-loading">Loading...</div> : null}

      <section className="people-grid" aria-busy={loading ? "true" : "false"}>
        {people.map((p) => {
          const img = p?.profile_path ? `${TMDB_IMG}${p.profile_path}` : "";
          return (
            <article key={p.id} className="person-card" title={p?.name || ""}>
              <div className="person-photoWrap">
                {img ? (
                  <img
                    className="person-photo"
                    src={img}
                    alt={p?.name || "Person"}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="person-photoPlaceholder"
                    aria-label="No photo"
                  />
                )}
              </div>
              <div className="person-name">{p?.name}</div>
            </article>
          );
        })}
      </section>

      <div className="people-pagination">
        <button
          className="people-pageBtn"
          onClick={() => updateParams({ q: query, page: 1 })}
          disabled={isFirst}
        >
          ‹ First
        </button>
        <button
          className="people-pageBtn"
          onClick={() => updateParams({ q: query, page: page - 1 })}
          disabled={isFirst}
        >
          ‹ Previous
        </button>

        <div className="people-pageInfo">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>

        <button
          className="people-pageBtn"
          onClick={() => updateParams({ q: query, page: page + 1 })}
          disabled={isLast}
        >
          Next ›
        </button>
        <button
          className="people-pageBtn"
          onClick={() => updateParams({ q: query, page: totalPages })}
          disabled={isLast}
        >
          Last ›
        </button>
      </div>
    </main>
  );
}
