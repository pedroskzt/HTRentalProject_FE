import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

type View = "home" | "login" | "product" | "cart" | "profile";

const LoginPanel: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("login");
  const [selectedButton, setSelectedButton] = useState<string>("login");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    navigate("/register");
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
            <p>
              <hr />
            </p>
          </div>

          <form className="row g-3 needs-validation" onSubmit={handleLogin}>
            <div className="col-md-2">
              <label htmlFor="username" className="form-label">
                &nbsp;
              </label>
            </div>
            <div className="col-md-4 page-section">
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4 page-section">
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="username" className="form-label">
                &nbsp;
              </label>
            </div>

            <div className="col-md-2">
              <label htmlFor="memberAlready" className="form-label">
                &nbsp;
              </label>
            </div>
            <div className="col-md-4 btn-main">
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
            <div className="col-md-6">
              <label htmlFor="memberAlready" className="form-label">
                &nbsp;
              </label>
            </div>

            <div className="col-md-2 page-section">
              <p className="text-lg-end fw-bold">Not a member yet?</p>
            </div>
            <div className="col-md-6 page-section">
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
            <div className="col-md-4">
              <label htmlFor="notMember" className="form-label">
                &nbsp;
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;
