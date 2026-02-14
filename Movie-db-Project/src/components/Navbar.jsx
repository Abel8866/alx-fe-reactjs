import VideoIcon from "../assets/images/Video.svg";
import SearchIcon from "../assets/images/Search.svg";

function Navbar() {
    return (
        <header className="navbar" role="banner">
            <div className="navbar-inner">
                <a className="navbar-brand" href="#" aria-label="Movie Browser home">
                    <img className="navbar-brandIcon" src={VideoIcon} alt="" aria-hidden="true" />
                    <span className="navbar-brandText">Movie Browser</span>
                </a>

                <nav className="navbar-tabs" aria-label="Sections">
                    <a className="navbar-tab navbar-tab--active" href="#">
                        Movies
                    </a>
                    <a className="navbar-tab" href="#">
                        People
                    </a>
                </nav>

                <form className="navbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
                    <img className="navbar-searchIcon" src={SearchIcon} alt="" aria-hidden="true" />
                    <input
                        className="navbar-searchInput"
                        type="search"
                        placeholder="Search for movies…"
                        aria-label="Search for movies"
                    />
                </form>
            </div>
        </header>
    );
}

export default Navbar;