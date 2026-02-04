export default function Contact() {
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
    card: {
      marginTop: "1.25rem",
      borderRadius: 18,
      padding: "1.25rem",
      background: "rgba(2, 6, 23, 0.35)",
      border: "1px solid rgba(148, 163, 184, 0.14)",
      display: "grid",
      gap: "0.75rem",
      maxWidth: 720,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
      flexWrap: "wrap",
      paddingBottom: "0.75rem",
      borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
    },
    label: {
      color: "#94a3b8",
      fontWeight: 700,
      letterSpacing: "0.2px",
    },
    value: {
      color: "#e2e8f0",
      fontWeight: 700,
    },
    note: {
      color: "#cbd5e1",
      lineHeight: 1.65,
      margin: 0,
    },
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Contact</h1>
      <p style={styles.lead}>
        Have a question or a project in mind? Reach out and we’ll respond soon.
      </p>

      <section style={styles.card}>
        <div style={styles.row}>
          <span style={styles.label}>Email</span>
          <span style={styles.value}>contact@mycompany.com</span>
        </div>
        <div style={styles.row}>
          <span style={styles.label}>Hours</span>
          <span style={styles.value}>Mon–Fri, 9:00–17:00</span>
        </div>
        <p style={styles.note}>
          Prefer a short brief? Include your goals, timeline, and any links, and
          we’ll point you in the right direction.
        </p>
      </section>
    </main>
  );
}
