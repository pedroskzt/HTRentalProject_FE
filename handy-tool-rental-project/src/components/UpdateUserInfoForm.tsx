import React, { useState } from "react";

interface UpdateUserInfoFormProps {}

const UpdateUserInfoForm: React.FC<UpdateUserInfoFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Side: Checkboxes */}
        <div className="col-md-4">
          <form>
            {/** Profile Options */}
            <h3>Profile Options</h3>
            <div>
              <hr />
            </div>
            {/* Change Password */}
            <div className="form-check">
              <button
                className="btn btn-secondary fw-bold"
                name="profileChangePassword"
                id="profileChangePassword"
                type="button"
                disabled
              >
                Change Password{" "}
                <i className="fa-solid fa-lock" style={{ marginLeft: "5px" }} />
              </button>
            </div>

            <div>
              <hr />
            </div>
            {/* Update User Info */}
            <div className="form-check">
              <button
                className="btn btn-success fw-bold"
                name="profileUpdateUserInfo"
                id="profileUpdateUserInfo"
                type="button"
                disabled={false}
              >
                Update User Info
                <i
                  className="fa-solid fa-circle-info"
                  style={{ marginLeft: "5px" }}
                />
              </button>
            </div>
            <div>
              <hr />
            </div>
            {/* Rental History */}
            <div className="form-check">
              <button
                className="btn btn-secondary fw-bold"
                name="profileRentalHistory"
                id="profileRentalHistory"
                type="button"
                disabled
              >
                Rental History
                <i className="fa-solid fa-list" style={{ marginLeft: "5px" }} />
              </button>
            </div>
            <div>
              <hr />
            </div>
          </form>
        </div>
        {/* Profile Forms */}
        <div className="col-md-8">
          {/** Display form according to button clicked on the left part */}
          <h3 className="text-center">Update User Information</h3>
          <hr />
          {/* First Row */}
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-4 page-section mx-2">
              <label htmlFor="first_name" className="form-label">
                <span id="firstNameLabel" className="fw-bold">
                  First Name
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                aria-label="First Name"
                autoComplete="given-name"
                required
                value="First Name"
              />
            </div>
            <div className="col-md-4 page-section mx-2">
              <label htmlFor="last_name" className="form-label">
                <span id="lastNameLabel" className="fw-bold">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                aria-label="Last Name"
                autoComplete="family-name"
                required
                value="Last Name"
              />
            </div>
          </div>
          {/* Second Row */}
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-4 page-section mx-2">
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
                autoComplete="street-address"
                required
                value="Address"
              />
            </div>
            <div className="col-md-4 page-section mx-2">
              <label htmlFor="phone_number" className="form-label">
                <span id="phoneNumberLabel" className="fw-bold">
                  Phone Number
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                name="phone_number"
                autoComplete="tel"
                placeholder="Phone Number"
                aria-label="Phone Number"
                pattern="\d*"
                value="Phone number"
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-3">
            <p> &nbsp;</p>
          </div>
          {/* Third Row */}
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-8 btn-main d-flex justify-content-center mx-2">
              <button
                className="btn btn-success fw-bold"
                id="update"
                name="update"
                type="submit"
              >
                {isLoading ? "Updating in..." : "Update"}
                <i
                  className="fa-solid fa-address-card"
                  style={{ marginLeft: "5px" }}
                />
              </button>
              {error && <div className="text-danger">{error}</div>}
            </div>
          </div>
          {/* End of Contents */}
        </div>{" "}
        {/* End of main Update User Info */}
      </div>
    </div>
  );
};

export default UpdateUserInfoForm;
