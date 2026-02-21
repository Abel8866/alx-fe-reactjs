import { useLocation, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || "/profile";

  return (
    <div>
      <h1>Login</h1>
      <p className="read-the-docs">This is a simulated login.</p>
      <button
        type="button"
        onClick={() => {
          onLogin();
          navigate(fromPath, { replace: true });
        }}
      >
        Log in
      </button>
    </div>
  );
}
