import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import { useNavigate } from "react-router-dom";

const UpdateUserInfoForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [first_name, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const { accessToken } = useAuthorization();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api_auth/User/Get/Info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Failed to process fetching of user info.");
          throw new Error("Failed to fetch user information.");
        }
        const data = await response.json();
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
      } catch (error) {
        setError("Server error. Please try again.");
        throw new Error("Server error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [accessToken]);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^[\d+\-\s]*$/.test(value)) {
      setPhoneNumber(value);
      setError(null);
    } else {
      setError("Please enter a valid contact number (+,- and space allowed).");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!/^[\d+\-\s]*$/.test(phone_number) || phone_number === "") {
      setError("Please enter a valid contact number (+,- and space allowed).");
      setIsLoading(false);
      return;
    }
    if (first_name === "") {
      setError("Please enter a value for first name.");
      setIsLoading(false);
      return;
    }
    if (last_name === "") {
      setError("Please enter a value for last name.");
      setIsLoading(false);
      return;
    }
    if (address === "") {
      setError("Please enter a value for address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api_auth/User/Update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            first_name,
            last_name,
            address,
            phone_number,
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
        setIsLoading(false);
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
          <form className="row g-1 needs-validation" onSubmit={handleSubmit}>
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
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  pattern="[\d+\-\s]*"
                  value={phone_number}
                  onChange={handlePhoneNumberChange}
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
                  {"   "}
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                {"   "}
                {error && <div className="text-danger">{error}</div>}
              </div>
            </div>
            {/* End of Contents */}
          </form>
        </div>{" "}
        {/* End of main Update User Info */}
      </div>
    </div>
  );
};

export default UpdateUserInfoForm;
