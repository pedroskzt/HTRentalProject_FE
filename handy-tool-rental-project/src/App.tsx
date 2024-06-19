import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeCarousel from "./components/HomeCarousel";
import "./App.css";

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="navbar bg-body-tertiary">
        <div className="container-fluid justify-content-start">
          <img
            src="/ht-rental-logo2.png"
            alt="Logo"
            style={{ maxWidth: "80px", height: "auto" }}
          />
          <div className="text-header-section fw-bold">
            &nbsp;&nbsp;&nbsp;Handy Tool (HT) Rental&nbsp;&nbsp;&nbsp;
          </div>
          <nav>
            <Link
              to="/"
              className={`btn btn-lg btn-header ${
                activeButton === "home" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleButtonClick("home")}
            >
              Home
            </Link>{" "}
            <Link
              to="/login"
              className={`btn btn-lg btn-header ${
                activeButton === "login" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleButtonClick("login")}
            >
              Login
            </Link>{" "}
            <Link
              to="/product"
              className={`btn btn-lg btn-header ${
                activeButton === "product" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleButtonClick("product")}
            >
              Product
            </Link>{" "}
            <Link
              to="/cart"
              className={`btn btn-lg btn-header ${
                activeButton === "cart" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleButtonClick("cart")}
            >
              Cart
            </Link>{" "}
            <Link
              to="/profile"
              className={`btn btn-lg btn-header ${
                activeButton === "profile" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => handleButtonClick("profile")}
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Carousel */}
        <div className="panel panel-middle">
          <HomeCarousel />
        </div>

        {/* Dynamic content based on nested routes */}
        <div className="panel panel-bottom">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-left p-3 mt-auto footer">
        HT Tool Rental. All Rights Reserved (2024).
      </footer>
    </div>
  );
};

export default App;
