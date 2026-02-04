import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
      gap: "0.9rem",
      maxWidth: 720,
    },
    label: {
      color: "#94a3b8",
      fontWeight: 700,
      letterSpacing: "0.2px",
    },
    field: {
      display: "grid",
      gap: "0.4rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 0.85rem",
      borderRadius: 12,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(15, 23, 42, 0.55)",
      color: "#e5e7eb",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 0.85rem",
      borderRadius: 12,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(15, 23, 42, 0.55)",
      color: "#e5e7eb",
      outline: "none",
      minHeight: 140,
      resize: "vertical",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      marginTop: "0.2rem",
    },
    button: {
      border: 0,
      cursor: "pointer",
      padding: "0.75rem 1rem",
      borderRadius: 999,
      fontWeight: 800,
      color: "#0b1020",
      background: "linear-gradient(135deg, #38bdf8, #22c55e)",
      boxShadow: "0 16px 40px rgba(34, 197, 94, 0.18)",
    },
    hint: {
      color: "#94a3b8",
      margin: 0,
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },
    note: {
      color: "#cbd5e1",
      lineHeight: 1.65,
      margin: 0,
    },
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Contact</h1>
      <p style={styles.lead}>
        Have a question or a project in mind? Reach out and we’ll respond soon.
      </p>

      <section style={styles.card}>
        <p style={styles.hint}>
          Fill out the form below and we’ll get back to you.
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.9rem" }}>
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="message" style={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="How can we help?"
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.actions}>
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </div>
        </form>

        <p style={styles.note}>
          Prefer email instead? Contact us at{" "}
          <strong>contact@mycompany.com</strong>.
        </p>
      </section>
    </main>
  );
}
