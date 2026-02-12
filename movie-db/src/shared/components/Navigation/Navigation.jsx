import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import SearchBox from "./SearchBox";

function linkClass({ isActive }) {
  return [
    "text-sm px-3 py-2 rounded",
    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100",
  ].join(" ");
}

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Keep search “context” aligned with current section (movies vs people)
  const isPeople = location.pathname.startsWith("/people");
  const placeholder = isPeople ? "Search people..." : "Search movies...";

  // If user is on a details page and clicks the section tab, go to list root
  const goMovies = () => navigate(paths.movies);
  const goPeople = () => navigate(paths.people);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="font-semibold">MovieDB</div>

          <nav className="flex items-center gap-2">
            <NavLink to={paths.movies} className={linkClass} onClick={goMovies}>
              Movies
            </NavLink>
            <NavLink to={paths.people} className={linkClass} onClick={goPeople}>
              People
            </NavLink>
          </nav>
        </div>

        <SearchBox placeholder={placeholder} />
      </div>
    </header>
  );
}