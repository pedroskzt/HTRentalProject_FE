import React from "react";

const RegistrationForm = () => {
  return (
    <div>
      <h3>Registration</h3>
      <form>
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
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputName" className="col-form-label">
              Full Name
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Fullname"
              aria-label="Fullname"
              required
            />
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputContact" className="col-form-label">
              Contact Number
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputContact"
              placeholder="Contact Number"
              aria-label="Contact Number"
              required
            />
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputAddress" className="col-form-label">
              Address
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Address"
              aria-label="Address"
              required
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;
