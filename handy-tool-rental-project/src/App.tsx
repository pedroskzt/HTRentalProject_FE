import React, { useState } from "react";
import HomePanel from "./components/HomePanel";
import LoginPanel from "./components/LoginPanel";
import ProductPanel from "./components/ProductPanel";
import RentalCartPanel from "./components/RentalCartPanel";
import ProfilePanel from "./components/ProfilePanel";
import SupportPanel from "./components/SupportPanel";

// Define the possible views for the third panel
type View = "home" | "login" | "product" | "cart" | "profile" | "support";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedButton, setSelectedButton] = useState<string>("home");

  const handleButtonClick = (view: View) => {
    setCurrentView(view);
    setSelectedButton(view);
  };

  const renderThirdPanelContent = () => {
    switch (currentView) {
      case "home":
        return <HomePanel />;
      case "login":
        return <LoginPanel />;
      case "product":
        return <ProductPanel />;
      case "cart":
        return <RentalCartPanel />;
      case "profile":
        return <ProfilePanel />;
      case "support":
        return <SupportPanel />;
      default:
        return <div>Select an option from the left panel</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="panel panel-top">
        <div className="d-flex mb-3">
          <div className="me-auto p-2">
            <img
              src="/temp-logo.jpg"
              alt="Logo"
              max-width="100px"
              height="auto"
            />
          </div>
          <div className="p-2">
            <p></p>
          </div>
          <div className="p-2">
            <button
              type="button"
              className={`btn ${
                selectedButton === "home" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("home")}
            >
              Home
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "login" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "product" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("product")}
            >
              Product
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "cart" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("cart")}
            >
              Rental Cart
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "profile" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("profile")}
            >
              Profile
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "support" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("support")}
            >
              Support
            </button>
          </div>
        </div>
      </div>
      <div className="panel panel-middle">
        {/* This panel can contain static or navigation content */}

        <div className="imagePanel">
          <img src="/temp-image-holder.jpg" alt="RentalImage" />
        </div>
      </div>
      <div className="panel panel-bottom">{renderThirdPanelContent()}</div>
    </div>
  );
};

export default App;
