import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC = () => {
  /* This is for the Register validation*/

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [error_number, setErrorNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
      setErrorNumber(null);
    } else {
      setErrorNumber("Please enter a valid contact number (digits only).");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!/^\d*$/.test(phone_number)) {
      setErrorNumber("Please enter a valid contact number (digits only).");
      return;
    }

    // Call Registration API
    try {
      const response = await fetch(
        "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api_auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            address,
            phone_number,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      // Response available
      if (response.status === 200 || response.status === 201) {
        console.log("Registration successful: Data" + response.body);
        // onRegisterSuccess();
        navigate("/login");
      } else {
        console.error("Registration failed. Message=", response.statusText);
        setError(response.statusText || "Registration failed");
      }
    } catch (error) {
      console.error("error:" + error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="col-md-12 page-section">
        <h3 className="text-center">Registration</h3>
      </div>
      <div>
        <p>
          <hr />
        </p>
      </div>

      <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="col-md-2">
          <label htmlFor="email" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-4 page-section">
          <label htmlFor="email" className="form-label">
            <span id="emailLabel" className="fw-bold">
              Email
            </span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="user@test.com"
            aria-label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-4 page-section">
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
            autoComplete="new-password"
            placeholder="Password"
            aria-label="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="password" className="form-label">
            &nbsp;
          </label>
        </div>

        {/* Second Row */}
        <div className="col-md-2">
          <label htmlFor="first_name" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-4 page-section">
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
        <div className="col-md-4 page-section">
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
        <div className="col-md-2">
          <label htmlFor="last_name" className="form-label">
            &nbsp;
          </label>
        </div>

        {/* Third Row */}
        <div className="col-md-2">
          <label htmlFor="address" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-4 page-section">
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
        <div className="col-md-4 page-section">
          <label htmlFor="phone_number" className="form-label">
            <span id="phoneNumberLabel" className="fw-bold">
              Phone Number
            </span>
          </label>
          <input
            type="text"
            className={`form-control ${error_number ? "is-invalid" : ""}`}
            id="phone_number"
            name="phone_number"
            autoComplete="tel"
            placeholder="Phone Number"
            aria-label="Phone Number"
            pattern="\d*"
            value={phone_number}
            onChange={handlePhoneNumberChange}
            required
          />
          {error_number && (
            <div className="invalid-feedback">{error_number}</div>
          )}
        </div>
        <div className="col-md-2">
          <label htmlFor="phone_number" className="form-label">
            &nbsp;
          </label>
        </div>

        {/* Fourth Row */}
        <div className="col-md-2">
          <label htmlFor="register" className="form-label">
            &nbsp;
          </label>
        </div>
        <div className="col-md-10 btn-main">
          <button
            className="btn btn-success fw-bold"
            id="register"
            name="register"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering in..." : "Register"}
            <i
              className="fa-solid fa-address-card"
              style={{ marginLeft: "5px" }}
            />
          </button>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;
