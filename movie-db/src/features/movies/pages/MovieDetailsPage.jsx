import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../routes/paths";
import {
  fetchMovieDetailsRequested,
  selectMovieDetails,
  selectMovieDetailsError,
  selectMovieDetailsStatus,
} from "../state/movieDetailsSlice";
import Loading from "../../../shared/components/Feedback/Loading";
import ErrorState from "../../../shared/components/Feedback/ErrorState";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(selectMovieDetails);
  const status = useSelector(selectMovieDetailsStatus);
  const error = useSelector(selectMovieDetailsError);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMovieDetailsRequested(id));
  }, [dispatch, id]);

  const posterUrl = useMemo(() => {
    if (!data?.poster_path) return null;
    return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  }, [data?.poster_path]);

  const cast = data?.credits?.cast || [];

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <Link className="underline" to={paths.movies}>
        ← Back to Movies
      </Link>

      {status === "loading" && (
        <div className="mt-6">
          <Loading />
        </div>
      )}
      {status === "failed" && (
        <div className="mt-6">
          <ErrorState title="Failed to load movie details" message={error} />
        </div>
      )}

      {status === "succeeded" && data && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <div className="rounded border overflow-hidden bg-gray-100">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={data.title}
                className="w-full h-auto"
                loading="lazy"
              />
            ) : null}
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{data.title}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
              {data.release_date ? <span>{data.release_date}</span> : null}
              {typeof data.vote_average === "number" ? (
                <span>Rating: {data.vote_average.toFixed(1)} / 10</span>
              ) : null}
              {data.runtime ? <span>{data.runtime} min</span> : null}
            </div>

            {data.tagline ? (
              <p className="mt-3 text-sm text-gray-500">{data.tagline}</p>
            ) : null}

            {data.overview ? <p className="mt-5">{data.overview}</p> : null}

            {cast.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-xl font-semibold">Cast</h2>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cast.slice(0, 12).map((person) => (
                    <li
                      key={person.cast_id ?? person.credit_id ?? person.id}
                      className="rounded border p-3"
                    >
                      <div className="font-medium">{person.name}</div>
                      {person.character ? (
                        <div className="text-sm text-gray-600">
                          {person.character}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
