// LoginPanel.tsx
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";

interface LoginPanelProps {
  onLoginSuccess: () => void;
}

const LoginPanel: React.FC<LoginPanelProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  /* This is for the Login validation*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api_auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      // Response available
      if (response.status === 200) {
        console.log("Login successful: Data" + response.body);
        onLoginSuccess();
      } else {
        console.error("Login failed. Message=", response.statusText);
        setError(response.statusText || "Login failed");
      }
    } catch (error) {
      console.error("error:" + error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isRegistering ? (
        <RegistrationForm />
      ) : (
        <div>
          <div className="col-md-4">
            <h2 className="login-panel font-monospace">&nbsp;LOGIN</h2>
          </div>

          <form className="row g-3 needs-validation" onSubmit={handleLogin}>
            <div className="row g-3 align-items-top">
              <div className="col-auto">
                <label htmlFor="username" className="col-form-label">
                  <p className="fw-bold">&nbsp;&nbsp;&nbsp;USERNAME</p>
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  aria-label="Username"
                  autoComplete="off"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  <p className="fw-semibold">Format: email@test.com</p>
                </span>
              </div>
            </div>
            <div className="row g-3 align-items-top">
              <div className="col-auto">
                <label htmlFor="password" className="col-form-label">
                  <p className="fw-bold">&nbsp;&nbsp;&nbsp;PASSWORD</p>
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="passwordHelpInline"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  <p className="fw-semibold">Must be 3-10 characters long</p>
                </span>
              </div>
            </div>

            <div className="row g-3 align-items-top">
              <div className="col-auto">
                <p></p>
              </div>
              <div className="col-auto">
                <p className="fw-semibold">Already a member?</p>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="error">{error}</div>}
              </div>
            </div>

            <div className="row g-3 align-items-top">
              <div className="col-auto">
                <p></p>
              </div>
              <div className="col-auto">
                <p className="fw-semibold">Not yet registered?</p>
              </div>

              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={toggleForm}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;
