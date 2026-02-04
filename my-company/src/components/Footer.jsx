import wave from "../assets/footer-wave.svg";

export default function Footer() {
  const styles = {
    footer: {
      marginTop: "2.5rem",
      borderTop: "1px solid rgba(148, 163, 184, 0.15)",
      background: "rgba(2, 6, 23, 0.25)",
    },
    waveWrap: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 1rem",
    },
    wave: {
      display: "block",
      width: "100%",
      height: "auto",
      opacity: 0.9,
      filter: "drop-shadow(0 18px 60px rgba(0,0,0,0.45))",
    },
    container: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "1.25rem 1rem 1.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      flexWrap: "wrap",
    },
    left: {
      display: "flex",
      alignItems: "center",
      gap: "0.7rem",
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: "linear-gradient(135deg, #38bdf8, #22c55e)",
      boxShadow: "0 0 0 4px rgba(56, 189, 248, 0.10)",
    },
    title: {
      margin: 0,
      fontWeight: 900,
      color: "#f8fafc",
      letterSpacing: "0.2px",
    },
    meta: {
      margin: 0,
      color: "#94a3b8",
      fontWeight: 600,
    },
    links: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      flexWrap: "wrap",
    },
    pill: {
      display: "inline-block",
      textDecoration: "none",
      color: "#e2e8f0",
      fontWeight: 700,
      padding: "0.5rem 0.8rem",
      borderRadius: 999,
      background: "rgba(148, 163, 184, 0.10)",
      border: "1px solid rgba(148, 163, 184, 0.12)",
    },
  };

  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.waveWrap}>
        <img
          src={wave}
          alt="Decorative wave"
          style={styles.wave}
          loading="lazy"
        />
      </div>

      <div style={styles.container}>
        <div style={styles.left}>
          <span aria-hidden="true" style={styles.dot} />
          <div>
            <p style={styles.title}>My Company</p>
            <p style={styles.meta}>© {year} • Built with React Router</p>
          </div>
        </div>

        <div style={styles.links}>
          <a href="#" style={styles.pill}>
            Back to top
          </a>
          <a
            href="mailto:contact@mycompany.com"
            style={styles.pill}
            aria-label="Email My Company"
          >
            Email us
          </a>
        </div>
      </div>
    </footer>
  );
}
