export default function Home() {
  const styles = {
    main: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "2.25rem 1rem 3rem",
    },
    hero: {
      padding: "1.6rem 1.6rem",
      borderRadius: 20,
      background:
        "linear-gradient(135deg, rgba(56, 189, 248, 0.14), rgba(34, 197, 94, 0.10))",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
    },
    title: {
      margin: 0,
      fontSize: "2.2rem",
      letterSpacing: "-0.02em",
      color: "#f8fafc",
    },
    subtitle: {
      marginTop: "0.75rem",
      marginBottom: 0,
      fontSize: "1.05rem",
      lineHeight: 1.6,
      color: "#cbd5e1",
      maxWidth: 70 * 8,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1rem",
      marginTop: "1.25rem",
    },
    card: {
      padding: "1rem",
      borderRadius: 16,
      background: "rgba(2, 6, 23, 0.35)",
      border: "1px solid rgba(148, 163, 184, 0.14)",
    },
    cardTitle: {
      margin: 0,
      color: "#e2e8f0",
      fontSize: "1.05rem",
      fontWeight: 700,
    },
    cardText: {
      margin: "0.5rem 0 0",
      color: "#cbd5e1",
      lineHeight: 1.55,
    },
  };

  return (
    <main style={styles.main}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Home</h1>
        <p style={styles.subtitle}>
          Welcome to My Company. We create clean, reliable solutions that help
          your business ship faster.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Modern Stack</h2>
            <p style={styles.cardText}>
              React + Vite projects built for speed and clarity.
            </p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Great UX</h2>
            <p style={styles.cardText}>
              Interfaces that feel polished, accessible, and consistent.
            </p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Trusted Delivery</h2>
            <p style={styles.cardText}>
              Practical engineering with predictable outcomes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
