import { useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ComplexForm() {
  const [serverMessage, setServerMessage] = useState("");

  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      role: "student",
      newsletter: false,
      acceptTerms: false,
      bio: "",
    }),
    [],
  );

  function validate(values) {
    const nextErrors = {};

    if (!values.firstName.trim())
      nextErrors.firstName = "First name is required.";
    if (!values.lastName.trim()) nextErrors.lastName = "Last name is required.";

    if (!values.email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(values.email))
      nextErrors.email = "Email is not valid.";

    if (!values.password) nextErrors.password = "Password is required.";
    else if (values.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters.";

    if (!values.confirmPassword)
      nextErrors.confirmPassword = "Please confirm your password.";
    else if (values.confirmPassword !== values.password)
      nextErrors.confirmPassword = "Passwords do not match.";

    if (values.age === "") nextErrors.age = "Age is required.";
    else if (!Number.isInteger(Number(values.age)))
      nextErrors.age = "Age must be a number.";
    else if (Number(values.age) < 13)
      nextErrors.age = "You must be at least 13.";

    if (!values.acceptTerms)
      nextErrors.acceptTerms = "You must accept the terms to continue.";

    if (values.bio.trim().length > 0 && values.bio.trim().length < 20)
      nextErrors.bio =
        "Bio must be at least 20 characters (or leave it empty).";

    return nextErrors;
  }

  const form = useForm({
    initialValues,
    validate,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, helpers) => {
      setServerMessage("");

      // Simulate async submit
      await new Promise((r) => setTimeout(r, 400));

      setServerMessage("Submitted successfully (simulated). Check the alert.");
      alert(`Complex form submit:\n${JSON.stringify(values, null, 2)}`);

      helpers.resetForm();
    },
  });

  const { errors, touched } = form;

  return (
    <section style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Complex Form (with custom hook)</h2>
      <p style={{ marginTop: 0 }}>
        Demonstrates a reusable hook that handles state, touched tracking,
        validation, and async submit.
      </p>

      <form onSubmit={form.handleSubmit} noValidate>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>First name</span>
              <input {...form.getFieldProps("firstName")} />
            </label>
            {touched.firstName && errors.firstName && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.firstName}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Last name</span>
              <input {...form.getFieldProps("lastName")} />
            </label>
            {touched.lastName && errors.lastName && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.lastName}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Email</span>
              <input {...form.getFieldProps("email")} />
            </label>
            {touched.email && errors.email && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Password</span>
              <input type="password" {...form.getFieldProps("password")} />
            </label>
            {touched.password && errors.password && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.password}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Confirm password</span>
              <input
                type="password"
                {...form.getFieldProps("confirmPassword")}
              />
            </label>
            {touched.confirmPassword && errors.confirmPassword && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Age</span>
              <input type="number" {...form.getFieldProps("age")} />
            </label>
            {touched.age && errors.age && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.age}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Role</span>
              <select {...form.getFieldProps("role")}>
                <option value="student">Student</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
              </select>
            </label>
          </div>

          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              {...form.getFieldProps("newsletter", { type: "checkbox" })}
            />
            <span>Subscribe to newsletter</span>
          </label>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                {...form.getFieldProps("acceptTerms", { type: "checkbox" })}
              />
              <span>I accept the terms</span>
            </label>
            {touched.acceptTerms && errors.acceptTerms && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.acceptTerms}
              </p>
            )}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Bio (optional)</span>
              <textarea rows={3} {...form.getFieldProps("bio")} />
            </label>
            {touched.bio && errors.bio && (
              <p role="alert" style={{ margin: 0, color: "crimson" }}>
                {errors.bio}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button type="submit" disabled={!form.isValid || form.isSubmitting}>
              {form.isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={() => {
                setServerMessage("");
                form.resetForm();
              }}
            >
              Reset
            </button>
            <span style={{ fontSize: 12, opacity: 0.8 }}>
              submitCount: {form.submitCount}
            </span>
          </div>

          {serverMessage && (
            <p role="status" style={{ margin: 0, color: "green" }}>
              {serverMessage}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
