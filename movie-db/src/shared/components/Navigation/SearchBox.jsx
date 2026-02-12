import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBox({ placeholder = "Search..." }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("search") ?? "";
  const urlPage = searchParams.get("page") ?? "1";

  // Keep input in sync with URL (refresh/back/forward)
  const [value, setValue] = useState(urlQuery);

  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  const debounced = useDebounce(value, 400);
  const normalized = useMemo(() => (debounced || "").trim(), [debounced]);

  // When input changes (debounced): update URL search param + reset page to 1
  useEffect(() => {
    if (normalized === urlQuery) return;

    const next = new URLSearchParams(searchParams);

    if (normalized) next.set("search", normalized);
    else next.delete("search");

    next.set("page", "1");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalized, urlQuery, setSearchParams]);

  const clear = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    next.set("page", "1");
    setSearchParams(next);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-2 rounded border bg-white px-3 py-2">
        <input
          className="w-full outline-none text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search"
        />
        {urlQuery ? (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-gray-600 hover:text-black"
            title="Clear"
          >
            Clear
          </button>
        ) : null}
      </div>

      {/* optional tiny helper (kept minimal) */}
      {urlQuery ? (
        <div className="mt-1 text-xs text-gray-500">Page: {urlPage}</div>
      ) : null}
    </div>
  );
}
