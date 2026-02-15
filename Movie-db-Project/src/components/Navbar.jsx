import VideoIcon from "../assets/images/Video.svg";
import SearchIcon from "../assets/images/Search.svg";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const homeHref = import.meta.env.BASE_URL || "/";
  const location = useLocation();
  const navigate = useNavigate();

  const isPeoplePage = location.pathname.startsWith("/people");
  const searchPlaceholder = isPeoplePage
    ? "Search for people…"
    : "Search for movies…";
  const searchAriaLabel = isPeoplePage
    ? "Search for people"
    : "Search for movies";

  const peopleQueryFromUrl = useMemo(() => {
    if (!isPeoplePage) return "";
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim();
  }, [isPeoplePage, location.search]);

  const movieQueryFromUrl = useMemo(() => {
    if (isPeoplePage) return "";
    if (location.pathname !== homeHref) return "";
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim();
  }, [homeHref, isPeoplePage, location.pathname, location.search]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Keep the input synced with the current People search.
    if (isPeoplePage) {
      setSearchValue(peopleQueryFromUrl);
      return;
    }

    // Sync movies search when on home (/?q=...).
    if (location.pathname === homeHref) {
      setSearchValue(movieQueryFromUrl);
    }
  }, [
    homeHref,
    isPeoplePage,
    location.pathname,
    movieQueryFromUrl,
    peopleQueryFromUrl,
  ]);

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <a
          className="navbar-brand"
          href={homeHref}
          aria-label="Movie Browser home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            className="navbar-brandIcon"
            src={VideoIcon}
            alt=""
            aria-hidden="true"
          />
          <span className="navbar-brandText">Movie Browser</span>
        </a>

        <nav className="navbar-tabs" aria-label="Sections">
          <Link className="navbar-tab navbar-tab--active" to={homeHref}>
            Movies
          </Link>
          <Link className="navbar-tab" to="/people">
            People
          </Link>
        </nav>

        <form
          className="navbar-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();

            const trimmed = searchValue.trim();

            const params = new URLSearchParams();
            if (trimmed) params.set("q", trimmed);
            params.set("page", "1");

            if (isPeoplePage) {
              navigate(`/people?${params.toString()}`);
              return;
            }

            // Movie search: always sends you to home with ?q=
            if (trimmed) {
              navigate(`${homeHref}?${params.toString()}`);
            } else {
              navigate(homeHref);
            }
          }}
        >
          <img
            className="navbar-searchIcon"
            src={SearchIcon}
            alt=""
            aria-hidden="true"
          />
          <input
            className="navbar-searchInput"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchAriaLabel}
          />
        </form>
      </div>
    </header>
  );
}

export default Navbar;
