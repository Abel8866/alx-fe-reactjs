import { useMemo, useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ControlledForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = "Name is required.";

    if (!values.email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(values.email))
      nextErrors.email = "Email is not valid.";

    return nextErrors;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0;

  function onChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function onBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setTouched({ name: true, email: true });

    if (!canSubmit) return;

    alert(`Controlled submit:\n${JSON.stringify(values, null, 2)}`);
  }

  return (
    <section style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Controlled Form</h2>
      <p style={{ marginTop: 0 }}>
        Inputs are bound to React state; validation can run as you type.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Name</span>
            <input
              name="name"
              value={values.name}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={touched.name && !!errors.name}
            />
          </label>
          {touched.name && errors.name && (
            <p role="alert" style={{ margin: 0, color: "crimson" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Email</span>
            <input
              name="email"
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={touched.email && !!errors.email}
            />
          </label>
          {touched.email && errors.email && (
            <p role="alert" style={{ margin: 0, color: "crimson" }}>
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
}
