import { useRef, useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [errors, setErrors] = useState({});

  function onSubmit(event) {
    event.preventDefault();

    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";

    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Email is not valid.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    alert(`Uncontrolled submit:\n${JSON.stringify({ name, email }, null, 2)}`);
  }

  return (
    <section style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Uncontrolled Form</h2>
      <p style={{ marginTop: 0 }}>
        Inputs keep their values in the DOM; you read them on submit via refs.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Name</span>
            <input name="name" ref={nameRef} defaultValue="" />
          </label>
          {errors.name && (
            <p role="alert" style={{ margin: 0, color: "crimson" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Email</span>
            <input name="email" ref={emailRef} defaultValue="" />
          </label>
          {errors.email && (
            <p role="alert" style={{ margin: 0, color: "crimson" }}>
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
