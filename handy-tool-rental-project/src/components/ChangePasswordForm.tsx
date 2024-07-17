import React, { useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import { useNavigate } from "react-router-dom";

interface ChangePasswordFormProps {}

const ChangePasswordForm: React.FC = () => {
  const {
    accessToken,
    username,
    password: savedPassword,
    setPassword,
  } = useAuthorization();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessages([]);

    // Validations
    if (currentPassword !== savedPassword) {
      setErrorMessages(["Current password is incorrect."]);
      setIsLoading(false);
      console.error("Incorrect current password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessages(["New password and confirm password do not match."]);
      setIsLoading(false);
      return;
    }

    // Call API
    try {
      const response = await fetch(
        "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api_auth/ChangePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const data = await response.json();
      console.log("data:", data);
      setIsLoading(false);

      // Response available
      if (response.status === 200 || response.ok) {
        setPassword(newPassword);
        setErrorMessages([]);
        console.log("Change password successful. New password:", newPassword);
        navigate("/login");
      } else {
        console.error("Change password failed. Message=", response.statusText);

        if (Array.isArray(data) && data.length > 0) {
          setErrorMessages(data);
        } else {
          setErrorMessages(["An error occurred while changing the password."]);
        }
      }
    } catch (error) {
      console.error("error:" + error);
      setErrorMessages(["An error occurred. Please try again."]);
      setIsLoading(false);
      return;
    }
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
          <form
            className="row g-1 needs-validation"
            onSubmit={handleChangePassword}
          >
            {/** Display form according to button clicked on the left part */}
            <h3 className="text-center">Change Password</h3>
            <hr />
            {/* First Row */}
            <div className="row d-flex justify-content-center mb-2">
              <div className="col-md-4 page-section mx-2">
                <label htmlFor="currentpassword" className="form-label">
                  <span id="currentpasswordLabel" className="fw-bold">
                    Current Password
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentpassword"
                  name="currentpassword"
                  placeholder="Current Password"
                  aria-label="Current Password"
                  autoComplete="off"
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="row d-flex justify-content-center mb-2">
              <div className="col-md-4 page-section mx-2">
                <label htmlFor="newpassword" className="form-label">
                  <span id="newpasswordLabel" className="fw-bold">
                    New Password
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newpassword"
                  name="newpassword"
                  placeholder="New Password"
                  aria-label="New Password"
                  autoComplete="off"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Third Row */}

            <div className="row d-flex justify-content-center mb-2">
              <div className="col-md-4 page-section mx-2">
                <label htmlFor="confirmpassword" className="form-label">
                  <span id="confirmpasswordLabel" className="fw-bold">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  autoComplete="off"
                  required
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Fourth Row */}
            <div className="row d-flex justify-content-center mb-2">
              <div className="col-md-8 btn-main d-flex justify-content-center mx-2">
                <button
                  className="btn btn-primary fw-bold"
                  id="changepassword"
                  name="changepassword"
                  type="submit"
                >
                  {isLoading ? "Changing password ..." : "Change"}
                  {"   "}
                  <i className="fa-solid fa-pen-nib"></i>
                </button>
                {"   "}
                {errorMessages.length > 0 && (
                  <div className="text-danger">
                    <ul>
                      {errorMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
