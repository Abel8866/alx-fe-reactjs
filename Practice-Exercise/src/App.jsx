import "./App.css";

import ControlledForm from "./components/ControlledForm";
import UncontrolledForm from "./components/UncontrolledForm";
import ComplexForm from "./components/ComplexForm";

function App() {
  return (
    <main style={{ padding: 16, display: "grid", gap: 16, maxWidth: 720 }}>
      <header style={{ display: "grid", gap: 6 }}>
        <h1 style={{ margin: 0 }}>Controlled vs Uncontrolled Forms</h1>
        <p style={{ margin: 0 }}>
          Same fields, different state management and validation patterns.
        </p>
      </header>

      <ControlledForm />
      <UncontrolledForm />
      <ComplexForm />

      <section
        style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}
      >
        <h2 style={{ marginTop: 0 }}>Key Differences</h2>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
          <li>
            <strong>State management:</strong> Controlled inputs store values in
            React state; uncontrolled inputs store values in the DOM.
          </li>
          <li>
            <strong>Reading values:</strong> Controlled values are available
            anytime from state; uncontrolled values are typically read on submit
            via refs (or <code>FormData</code>).
          </li>
          <li>
            <strong>Validation:</strong> Controlled forms make it easy to
            validate on change/blur for instant feedback; uncontrolled forms
            often validate on submit unless you add extra event handling.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default App;
