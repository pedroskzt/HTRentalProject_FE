// LoginPanel.tsx
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";

const LoginPanel: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div>
      {isRegistering ? (
        <RegistrationForm />
      ) : (
        <div>
          <h3>Login Panel</h3>
          <form className="row g-3 needs-validation">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputUsername" className="col-form-label">
                  Username
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  placeholder="Username"
                  aria-label="Username"
                  required
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  Format: email@test.com
                </span>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="inputPassword" className="col-form-label">
                  Password
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="passwordHelpInline"
                  required
                />
              </div>
              <div className="col-auto">
                <span id="passwordHelpInline" className="form-text">
                  Must be 8-20 characters long.
                </span>
              </div>
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>

            <div className="d-flex mb-3">
              <div className="p-2">
                <p className="fw-semibold">Not yet registered?</p>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={toggleForm}
                >
                  Register
                </button>
              </div>
              <div className="p-2"></div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;
