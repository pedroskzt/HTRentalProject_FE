import React from "react";
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
import RentalHistoryForm from "./RentalHistoryForm";

const ProfilePanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProfileOption, setSelectedProfileOption] = useState<
    string | null
  >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (profileOption: string) => {
    setSelectedProfileOption(profileOption);
  };

  const renderSelectedProfileForm = () => {
    switch (selectedProfileOption) {
      case "changePassword":
        return <ChangePasswordForm />;
      case "updateUserInfo":
        return <UpdateUserInfoForm />;
      case "rentalHistory":
        return <RentalHistoryForm />;
      default:
        return (
          <div className="text-danger">
            You must select a Profile option on the left side
          </div>
        );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Side: Checkboxes */}
        <div className="col-md-4">
          <form>
            {/** Profile Options */}
            <h3>Profile Options</h3>
            <div>
              <p>
                <hr />
              </p>
            </div>
            {/* Change Password */}
            <div className="form-check">
              <button
                className="btn btn-outline-primary fw-bold"
                name="profileChangePassword"
                id="profileChangePassword"
                type="button"
                disabled={isLoading}
                onClick={() => handleButtonClick("changePassword")}
              >
                Change Password{" "}
                <i className="fa-solid fa-lock" style={{ marginLeft: "5px" }} />
              </button>
            </div>

            <div>
              <p>
                <hr />
              </p>
            </div>
            {/* Update User Info */}
            <div className="form-check">
              <button
                className="btn btn-outline-success fw-bold"
                name="profileUpdateUserInfo"
                id="profileUpdateUserInfo"
                type="button"
                disabled={isLoading}
                onClick={() => handleButtonClick("updateUserInfo")}
              >
                Update User Info
                <i
                  className="fa-solid fa-circle-info"
                  style={{ marginLeft: "5px" }}
                />
              </button>
            </div>
            <div>
              <p>
                <hr />
              </p>
            </div>
            {/* Rental History */}
            <div className="form-check">
              <button
                className="btn btn-outline-dark fw-bold"
                name="profileRentalHistory"
                id="profileRentalHistory"
                type="button"
                disabled={isLoading}
                onClick={() => handleButtonClick("rentalHistory")}
              >
                Rental History
                <i className="fa-solid fa-list" style={{ marginLeft: "5px" }} />
              </button>
            </div>
            <div>
              <p>
                <hr />
              </p>
            </div>
          </form>
        </div>

        {/* Profile Forms */}
        <div className="col-md-8">
          {/** Display form according to button clicked on the left part */}
          {renderSelectedProfileForm()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
