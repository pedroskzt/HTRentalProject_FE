import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
import RentalHistoryForm from "./RentalHistoryForm";

const ProfilePanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  // const [selectedProfileOption, setSelectedProfileOption] = useState<
  //   string | null
  // >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveProfile(buttonName);
  };

  const renderSelectedProfileForm = () => {
    switch (activeProfile) {
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
        {/* Left Side: Buttons */}
        <div className="col-md-4">
          <form>
            {/** Profile Options */}
            <h3>Profile Options</h3>
            <hr />
            {/* Change Password */}
            <nav>
              {" "}
              <Link
                to="/changePassword"
                className="btn btn-outline-primary fw-bold"
                id="profileChangePassword"
                type="button"
                style={{ marginLeft: "24px" }}
                onClick={() => handleButtonClick("changePassword")}
              >
                Change Password{" "}
                <i className="fa-solid fa-lock" style={{ marginLeft: "5px" }} />
              </Link>
              <hr />
              {/* Update User Info */}
              <Link
                to="/updateUserInfo"
                className="btn btn-outline-success fw-bold"
                id="profileUpdateUserInfo"
                type="button"
                style={{ marginLeft: "24px" }}
                onClick={() => handleButtonClick("updateUserInfo")}
              >
                Update User Info{" "}
                <i
                  className="fa-solid fa-circle-info"
                  style={{ marginLeft: "5px" }}
                />
              </Link>
              <hr />
              {/* Rental History */}
              <Link
                to="/rentalHistory"
                className="btn btn-outline-dark fw-bold"
                id="profileRentalHistory"
                type="button"
                style={{ marginLeft: "24px" }}
                onClick={() => handleButtonClick("rentalHistory")}
              >
                Rental History{" "}
                <i className="fa-solid fa-list" style={{ marginLeft: "5px" }} />
              </Link>
              <hr />
            </nav>
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
