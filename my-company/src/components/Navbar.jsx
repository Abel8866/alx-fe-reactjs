import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(15, 23, 42, 0.75)",
      borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
    },
    container: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "0.9rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      textDecoration: "none",
      color: "#f8fafc",
      fontWeight: 800,
      letterSpacing: "0.3px",
    },
    logoDot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      backgroundColor: "#22c55e",
      backgroundImage: "linear-gradient(135deg, #22c55e, #38bdf8)",
      boxShadow: "0 0 0 4px rgba(56, 189, 248, 0.12)",
    },
    links: {
      display: "flex",
      gap: "0.5rem",
      listStyle: "none",
      padding: 0,
      margin: 0,
      flexWrap: "wrap",
      justifyContent: "flex-end",
    },
    linkBase: {
      display: "inline-block",
      padding: "0.5rem 0.8rem",
      borderRadius: 999,
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
      backgroundColor: "rgba(148, 163, 184, 0.10)",
      transition:
        "background 140ms ease, color 140ms ease, box-shadow 140ms ease",
    },
  };

  const linkStyle = (to) => {
    const isActive = location.pathname === to;
    return {
      ...styles.linkBase,
      color: isActive ? "#0b1020" : "#e2e8f0",
      backgroundColor: isActive ? "#38bdf8" : styles.linkBase.backgroundColor,
      backgroundImage: isActive
        ? "linear-gradient(135deg, #38bdf8, #22c55e)"
        : "none",
      boxShadow: isActive ? "0 10px 30px rgba(34, 197, 94, 0.18)" : "none",
    };
  };

  return (
    <header style={styles.header}>
      <nav aria-label="Primary" style={styles.container}>
        <Link to="/" style={styles.brand}>
          <span aria-hidden="true" style={styles.logoDot} />
          <span>My Company</span>
        </Link>

        <ul style={styles.links}>
          <li>
            <Link to="/" style={linkStyle("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={linkStyle("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/services" style={linkStyle("/services")}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" style={linkStyle("/contact")}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
