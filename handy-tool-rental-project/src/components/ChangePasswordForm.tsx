import React from "react";

interface ChangePasswordFormProps {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
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
                className="btn btn-primary fw-bold"
                name="profileChangePassword"
                id="profileChangePassword"
                type="button"
                disabled={false}
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
                className="btn btn-secondary fw-bold"
                name="profileUpdateUserInfo"
                id="profileUpdateUserInfo"
                type="button"
                disabled
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
          <h3>Change Password</h3>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
