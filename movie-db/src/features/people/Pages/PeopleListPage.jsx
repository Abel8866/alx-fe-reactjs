import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeopleRequested,
  selectPeople,
  selectPeopleError,
  selectPeoplePage,
  selectPeopleQuery,
  selectPeopleStatus,
  selectPeopleTotalPages,
  setPeoplePage,
  setPeopleQuery,
} from "../state/peopleSlice";
import { paths } from "../../../routes/paths";

export default function PeopleListPage() {
  const dispatch = useDispatch();

  const items = useSelector(selectPeople);
  const status = useSelector(selectPeopleStatus);
  const error = useSelector(selectPeopleError);
  const page = useSelector(selectPeoplePage);
  const totalPages = useSelector(selectPeopleTotalPages);
  const query = useSelector(selectPeopleQuery);

  const [queryInput, setQueryInput] = useState(query);
  const debouncedQuery = useMemo(() => queryInput.trim(), [queryInput]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setPeopleQuery(debouncedQuery));
    }, 400);
    return () => clearTimeout(id);
  }, [dispatch, debouncedQuery]);

  useEffect(() => {
    dispatch(fetchPeopleRequested());
  }, [dispatch, page, query]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">People</h1>
        <Link className="text-sm underline" to={paths.movies}>
          Movies
        </Link>
      </div>

      <input
        className="mt-4 w-full rounded border px-3 py-2"
        placeholder="Search people..."
        value={queryInput}
        onChange={(e) => setQueryInput(e.target.value)}
      />

      {status === "loading" && <p className="mt-4">Loading...</p>}
      {status === "failed" && <p className="mt-4 text-red-600">{error}</p>}

      {status === "succeeded" && (
        <ul className="mt-4 space-y-2">
          {items.map((person) => (
            <li key={person.id} className="rounded border p-3">
              <Link className="underline" to={paths.personDetails(person.id)}>
                {person.name}
              </Link>
              {person.known_for_department ? (
                <span className="ml-2 text-sm text-gray-500">
                  ({person.known_for_department})
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() => dispatch(setPeoplePage(Math.max(1, page - 1)))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} / {totalPages}
        </span>
        <button
          className="rounded border px-3 py-2 disabled:opacity-50"
          onClick={() =>
            dispatch(setPeoplePage(Math.min(totalPages, page + 1)))
          }
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
