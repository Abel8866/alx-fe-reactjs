export default function Services() {
  const styles = {
    main: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "2.25rem 1rem 3rem",
    },
    title: {
      margin: 0,
      color: "#f8fafc",
      fontSize: "2rem",
      letterSpacing: "-0.02em",
    },
    lead: {
      marginTop: "0.75rem",
      color: "#cbd5e1",
      lineHeight: 1.7,
      maxWidth: 800,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1rem",
      marginTop: "1.25rem",
    },
    card: {
      borderRadius: 18,
      padding: "1.1rem",
      background: "rgba(2, 6, 23, 0.35)",
      border: "1px solid rgba(148, 163, 184, 0.14)",
    },
    cardTitle: {
      margin: 0,
      color: "#e2e8f0",
      fontSize: "1.05rem",
      fontWeight: 800,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.75rem",
    },
    badge: {
      fontSize: "0.78rem",
      padding: "0.2rem 0.55rem",
      borderRadius: 999,
      color: "#0b1020",
      background: "linear-gradient(135deg, #38bdf8, #22c55e)",
    },
    text: {
      margin: "0.6rem 0 0",
      color: "#cbd5e1",
      lineHeight: 1.65,
    },
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Services</h1>
      <p style={styles.lead}>
        Pick a focused engagement or combine services for an end-to-end build.
      </p>

      <section style={styles.grid}>
        <article style={styles.card}>
          <h2 style={styles.cardTitle}>
            Consulting <span style={styles.badge}>Strategy</span>
          </h2>
          <p style={styles.text}>
            Architecture reviews, roadmap planning, and technical guidance.
          </p>
        </article>

        <article style={styles.card}>
          <h2 style={styles.cardTitle}>
            Design <span style={styles.badge}>UX/UI</span>
          </h2>
          <p style={styles.text}>
            Wireframes, component systems, and usable interfaces.
          </p>
        </article>

        <article style={styles.card}>
          <h2 style={styles.cardTitle}>
            Development <span style={styles.badge}>Build</span>
          </h2>
          <p style={styles.text}>
            Frontend features, integrations, and production-ready delivery.
          </p>
        </article>
      </section>
    </main>
  );
}
