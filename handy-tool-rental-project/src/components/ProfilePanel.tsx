import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
import RentalHistoryForm from "./RentalHistoryForm";
import { useAuthorization } from "./AuthorizationContext";

const ProfilePanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthorization();

  // Initial load check for authorization
  useEffect(() => {
    if (accessToken) {
      console.log("User has access.");
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  const handleButtonClick = (buttonName: string) => {
    // Make sure that only those authenticated gets to do Profile functions
    if (isAuthenticated) {
      setActiveProfile(buttonName);
    }
  };

  const renderSelectedProfileForm = () => {
    switch (activeProfile) {
      case "changepassword":
        return <ChangePasswordForm />;
      case "updateuserinfo":
        return <UpdateUserInfoForm />;
      case "rentalhistory":
        return <RentalHistoryForm />;
      default:
        return (
          <div className="text-danger">
            <h4>
              {isAuthenticated
                ? "You need to select a Profile function"
                : "You need to login to access the Profile functions"}
            </h4>
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
              {isAuthenticated ? (
                <Link
                  to="/changepassword"
                  className="btn btn-outline-primary fw-bold"
                  id="profileChangePassword"
                  type="button"
                  style={{ marginLeft: "24px" }}
                  onClick={() => handleButtonClick("changepassword")}
                >
                  Change Password{" "}
                  <i
                    className="fa-solid fa-lock"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
              ) : (
                <span
                  className="btn btn-secondary fw-bold"
                  style={{
                    marginLeft: "24px",
                    cursor: "not-allowed",
                    opacity: 0.5,
                  }}
                >
                  Change Password{" "}
                  <i
                    className="fa-solid fa-lock"
                    style={{ marginLeft: "5px" }}
                  />
                </span>
              )}
              <hr />
              {/* Update User Info */}
              {isAuthenticated ? (
                <Link
                  to="/updateuserinfo"
                  className="btn btn-outline-success fw-bold"
                  id="profileUpdateUserInfo"
                  type="button"
                  style={{ marginLeft: "24px" }}
                  onClick={() => handleButtonClick("updateuserinfo")}
                >
                  Update User Info{" "}
                  <i
                    className="fa-solid fa-circle-info"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
              ) : (
                <span
                  className="btn btn-secondary fw-bold"
                  style={{
                    marginLeft: "24px",
                    cursor: "not-allowed",
                    opacity: 0.5,
                  }}
                >
                  Update User Info{" "}
                  <i
                    className="fa-solid fa-circle-info"
                    style={{ marginLeft: "5px" }}
                  />
                </span>
              )}
              <hr />
              {/* Rental History */}
              {isAuthenticated ? (
                <Link
                  to="/rentalhistory"
                  className="btn btn-outline-dark fw-bold"
                  id="profileRentalHistory"
                  type="button"
                  style={{ marginLeft: "24px" }}
                  onClick={() => handleButtonClick("rentalhistory")}
                >
                  Rental History{" "}
                  <i
                    className="fa-solid fa-list"
                    style={{ marginLeft: "5px" }}
                  />
                </Link>
              ) : (
                <span
                  className="btn btn-secondary fw-bold"
                  style={{
                    marginLeft: "24px",
                    cursor: "not-allowed",
                    opacity: 0.5,
                  }}
                >
                  Rental History{" "}
                  <i
                    className="fa-solid fa-list"
                    style={{ marginLeft: "5px" }}
                  />
                </span>
              )}
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
