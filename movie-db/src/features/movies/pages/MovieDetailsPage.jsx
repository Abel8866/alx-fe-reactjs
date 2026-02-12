import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../routes/paths";
import {
  fetchMovieDetailsRequested,
  selectMovieDetails,
  selectMovieDetailsError,
  selectMovieDetailsStatus,
} from "../state/movieDetailsSlice";

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

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link className="underline" to={paths.movies}>
        ← Back to Movies
      </Link>

      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "failed" && <p className="mt-4 text-red-600">{error}</p>}

      {status === "succeeded" && data && (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          {data.tagline ? (
            <p className="mt-1 text-sm text-gray-500">{data.tagline}</p>
          ) : null}
          {data.overview ? <p className="mt-4">{data.overview}</p> : null}
        </div>
      )}
    </main>
  );
}
