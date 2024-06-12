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

  const handleLoginSuccess = () => {
    setCurrentView("profile");
    setSelectedButton("profile");
  };

  const renderThirdPanelContent = () => {
    switch (currentView) {
      case "home":
        return <HomePanel />;
      case "login":
        return <LoginPanel onLoginSuccess={handleLoginSuccess} />;
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
      <div className="panel panel-header">
        <div className="d-flex mb-3">
          <div className="p-2">
            <img
              src="/ht-rental-logo.png"
              alt="Logo"
              max-width="100px"
              height="auto"
            />
          </div>
          <div className="p-2">
            <h2 className="font-monospace">
              &nbsp;&nbsp;&nbsp;HANDY TOOL RENTAL&nbsp;&nbsp;&nbsp;
            </h2>
          </div>
          <div className="p-2">
            <button
              type="button"
              className={`btn ${
                selectedButton === "home" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("home")}
            >
              HOME
            </button>
            <button type="button" className="btn btn-outline-light">
              &nbsp;
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "login" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("login")}
            >
              LOGIN
            </button>
            <button type="button" className="btn btn-outline-light">
              &nbsp;
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "product" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("product")}
            >
              PRODUCT
            </button>
            <button type="button" className="btn btn-outline-light">
              &nbsp;
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "cart" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("cart")}
            >
              CART
            </button>
            <button type="button" className="btn btn-outline-light">
              &nbsp;
            </button>
            <button
              type="button"
              className={`btn ${
                selectedButton === "profile" ? "btn-primary" : "btn-dark"
              }`}
              onClick={() => handleButtonClick("profile")}
            >
              PROFILE
            </button>
          </div>
        </div>
      </div>
      <div className="panel panel-middle">
        {/* This panel can contain static or navigation content */}

        <div className="imagePanel">
          <img src="/ht-rental-image.jpg" alt="RentalImage" />
        </div>
      </div>
      <div className="panel panel-bottom">{renderThirdPanelContent()}</div>
    </div>
  );
};

export default App;
