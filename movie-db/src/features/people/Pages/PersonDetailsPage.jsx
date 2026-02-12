import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../../../routes/paths";
import {
  fetchPersonDetailsRequested,
  selectPersonDetails,
  selectPersonDetailsError,
  selectPersonDetailsStatus,
} from "../state/personDetailsSlice";

export default function PersonDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector(selectPersonDetails);
  const status = useSelector(selectPersonDetailsStatus);
  const error = useSelector(selectPersonDetailsError);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchPersonDetailsRequested(id));
  }, [dispatch, id]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link className="underline" to={paths.people}>
        ← Back to People
      </Link>

      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "failed" && <p className="mt-4 text-red-600">{error}</p>}

      {status === "succeeded" && data && (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          {data.biography ? <p className="mt-4">{data.biography}</p> : null}
        </div>
      )}
    </main>
  );
}
