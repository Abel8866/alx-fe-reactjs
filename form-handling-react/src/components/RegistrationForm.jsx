import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // For this step, we only validate and capture values.
    console.log("Registration submitted:", {
      username,
      email,
      password,
    });

    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          autoComplete="username"
        />
        {errors.username ? (
          <p className="form-error" role="alert">
            {errors.username}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          autoComplete="email"
        />
        {errors.email ? (
          <p className="form-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          autoComplete="new-password"
        />
        {errors.password ? (
          <p className="form-error" role="alert">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
