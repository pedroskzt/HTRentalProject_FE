import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import { useAuthorization } from "./AuthorizationContext";

type View = "home" | "login" | "product" | "cart" | "profile";

const LoginPanel: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("login");
  const [selectedButton, setSelectedButton] = useState<string>("login");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  /* This is for the Login validation*/
  const [username, setUsernameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAccessToken, setUsername, setPassword } = useAuthorization();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    navigate("/register");
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api_auth/Login",
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
        setAccessToken(data.access);
        setUsername(username);
        setPassword(password);
        setCurrentView("profile");
        navigate("/profile");
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
          <div className="col-md-12 page-section">
            <h3 className="text-center">Login</h3>
          </div>
          <div>
            <hr />
          </div>

          <form onSubmit={handleLogin}>
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="username" className="form-label">
                  &nbsp;
                </label>
              </div>
              <div className="col-md-4 page-section mx-2">
                <label htmlFor="username" className="form-label">
                  <span id="emailLabel" className="fw-bold">
                    Username
                  </span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  aria-label="Username"
                  autoComplete="off"
                  required
                  value={username}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>
              <div className="col-md-4 page-section mx-2">
                <label htmlFor="password" className="form-label">
                  <span id="passwordLabel" className="fw-bold">
                    Password
                  </span>
                </label>
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
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 mx-2">
                <label htmlFor="memberAlready" className="form-label">
                  &nbsp;
                </label>
              </div>
              <div className="col-md-8 btn-main d-flex justify-content-center">
                <button
                  className="btn btn-primary fw-bold"
                  name="login"
                  id="login"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                  <i
                    className="fa-solid fa-right-to-bracket"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
                {error && <div className="text-danger">{error}</div>}
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 page-section">
                <p className="text-lg-end fw-bold">Not a member yet?</p>
              </div>
              <div className="col-md-8 btn-main page-section">
                <button
                  type="button"
                  className="btn btn-outline-success fw-bold"
                  onClick={toggleForm}
                >
                  Register
                  <i
                    className="fa-solid fa-address-card"
                    style={{ marginLeft: "5px" }}
                  />
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
