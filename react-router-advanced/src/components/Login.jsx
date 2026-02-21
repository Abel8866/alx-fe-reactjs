import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const fromPath = location.state?.from?.pathname || "/profile";

  return (
    <div>
      <h1>Login</h1>
      <p className="read-the-docs">This is a simulated login.</p>
      <button
        type="button"
        onClick={() => {
          login();
          navigate(fromPath, { replace: true });
        }}
      >
        Log in
      </button>
    </div>
  );
}
