export default function About() {
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
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1rem",
      marginTop: "1.25rem",
    },
    panel: {
      padding: "1.1rem 1.1rem",
      borderRadius: 18,
      background: "rgba(2, 6, 23, 0.35)",
      border: "1px solid rgba(148, 163, 184, 0.14)",
    },
    panelTitle: {
      margin: 0,
      fontSize: "1.05rem",
      fontWeight: 800,
      color: "#e2e8f0",
    },
    text: {
      margin: "0.55rem 0 0",
      color: "#cbd5e1",
      lineHeight: 1.65,
    },
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>About</h1>
      <p style={styles.lead}>
        We build products that help teams move faster — with clean code,
        thoughtful design, and reliable delivery.
      </p>

      <section style={styles.grid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Our Mission</h2>
          <p style={styles.text}>
            Make software easier to build, maintain, and scale.
          </p>
        </div>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Our Values</h2>
          <p style={styles.text}>
            Clarity, craftsmanship, and communication — always.
          </p>
        </div>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>How We Work</h2>
          <p style={styles.text}>
            Small iterations, measurable outcomes, and strong foundations.
          </p>
        </div>
      </section>
    </main>
  );
}
