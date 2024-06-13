import React, { useState } from "react";
import HomePanel from "./components/HomePanel";
import LoginPanel from "./components/LoginPanel";
import ProductPanel from "./components/ProductPanel";
import RentalCartPanel from "./components/RentalCartPanel";
import ProfilePanel from "./components/ProfilePanel";
import SupportPanel from "./components/SupportPanel";
import HomeCarousel from "./components/HomeCarousel";

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
      {/* This panel is the header part */}
      <div className="panel panel-header">
        <nav className="navbar bg-body-tertiary">
          <form className="container-fluid justify-content-start">
            <img
              src="/ht-rental-logo.png"
              alt="Logo"
              max-width="80px"
              height="auto"
            />
            <h2 className="font-monospace">
              &nbsp;Handy Tool Rental&nbsp;&nbsp;&nbsp;
            </h2>
            <button
              className={`btn ${
                selectedButton === "home" ? "btn-primary" : "btn-dark"
              }`}
              type="button"
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
              Cart
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
          </form>
        </nav>
      </div>

      {/* This panel can contain static or navigation content */}
      <div className="panel panel-middle">
        <HomeCarousel />
      </div>

      {/* This panel contains the user input and information */}
      <div className="panel panel-bottom">{renderThirdPanelContent()}</div>
    </div>
  );
};

export default App;
