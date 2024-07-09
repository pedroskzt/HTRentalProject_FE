import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import { useNavigate } from "react-router-dom";

interface UpdateUserInfoFormProps {}

const UpdateUserInfoForm: React.FC<UpdateUserInfoFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    email: "",
  });
  const { accessToken } = useAuthorization();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api_auth/User/Get/Info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user information.");
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        setError("Server error. Please try again.");
        throw new Error("Server error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [accessToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("new userinfo:", userInfo);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api_auth/User/Update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            userInfo,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      // Response available
      if (response.status === 200 || response.status === 202) {
        // Status 202: Accepted
        navigate("/profile");
      } else {
        console.error("Update failed. Message=", response.statusText);
        setError(response.statusText || "Update failed");
      }
    } catch (error) {
      console.error("error:" + error);
      setError("Server error. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(true);
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
                value={userInfo.first_name}
                onChange={handleInputChange}
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
                value={userInfo.last_name}
                onChange={handleInputChange}
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
                value={userInfo.address}
                onChange={handleInputChange}
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
                value={userInfo.phone_number}
                onChange={handleInputChange}
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
                onClick={handleSubmit}
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
