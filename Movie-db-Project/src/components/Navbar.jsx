import Logo from "../assets/images/Logo.svg";
import VideoIcon from "../assets/images/Video.svg";
import StarIcon from "../assets/images/Star.svg";
import PersonIcon from "../assets/images/Person.svg";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <a className="navbar-brand" href="#" aria-label="Go to home">
                    <img className="navbar-logo" src={Logo} alt="MovieDB" />
                    <span className="navbar-brandText">MovieDB</span>
                </a>

                <nav className="navbar-links" aria-label="Primary">
                    <a className="navbar-link" href="#">
                        <img className="navbar-icon" src={VideoIcon} alt="" aria-hidden="true" />
                        <span>Movies</span>
                    </a>
                    <a className="navbar-link" href="#">
                        <img className="navbar-icon" src={StarIcon} alt="" aria-hidden="true" />
                        <span>Favorites</span>
                    </a>
                    <a className="navbar-link" href="#">
                        <img className="navbar-icon" src={PersonIcon} alt="" aria-hidden="true" />
                        <span>Account</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;