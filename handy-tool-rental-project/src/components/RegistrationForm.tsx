import React, { useState } from "react";
import LoginPanel from "./LoginPanel";
import HomePanel from "./HomePanel";

const RegistrationForm = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleContactNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setContactNumber(value);
      setError(null);
    } else {
      setError("Please enter a valid contact number (digits only).");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d*$/.test(contactNumber)) {
      setError("Please enter a valid contact number (digits only).");
      return;
    }
    // Successful form
    console.log("Registration form submitted.");
  };

  return (
    <div>
      <div className="col-md-12">
        <h2 className="text-center font-monospace">&nbsp;Registration</h2>
      </div>

      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <label htmlFor="username" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-4">
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
            autoComplete="off"
            placeholder="user@test.com"
            aria-label="Username"
            required
          />
        </div>
        <div className="col-md-4">
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
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="username" className="form-label">
            &nbsp;
          </label>
        </div>

        <div className="col-md-2">
          <label htmlFor="name" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">
            <span id="nameLabel" className="fw-bold">
              Name
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            aria-label="Name"
            autoComplete="off"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="contactNumber" className="form-label">
            <span id="contactNumberLabel" className="fw-bold">
              Contact Number
            </span>
          </label>
          <input
            type="text"
            className={`form-control ${error ? "is-invalid" : ""}`}
            id="contactNumber"
            name="contactNumber"
            autoComplete="off"
            placeholder="Contact Number"
            aria-label="Contact Number"
            pattern="\d*"
            value={contactNumber}
            onChange={handleContactNumberChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <div className="col-md-2">
          <label htmlFor="contactNumber" className="form-label">
            &nbsp;
          </label>
        </div>

        <div className="col-md-2">
          <label htmlFor="address" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-8">
          <label htmlFor="address" className="form-label">
            <span id="addressLabel" className="fw-bold">
              Address
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Address"
            aria-label="Address"
            autoComplete="off"
            required
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="address" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-2">
          <label htmlFor="register" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-10">
          <button
            type="submit"
            id="register"
            name="register"
            className="btn btn-success"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;
