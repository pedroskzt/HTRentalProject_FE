import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeCarousel from "./components/HomeCarousel";
import "./App.css";
import { useAuthorization } from "./components/AuthorizationContext";

// insert function URL for openAI here:
const functionUrl = "https://xxxxxxxxxxxxxxxx.lambda-url.eu-west-3.on.aws/";

type Message = {
  text: string;
  sender: "ai" | "user";
};

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("");
  const { setAccessToken } = useAuthorization();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set the active button based on the current location
    const path = location.pathname;
    switch (path) {
      case "/":
        setActiveButton("home");
        break;
      case "/login":
        setActiveButton("login");
        break;
      case "/product":
        setActiveButton("product");
        break;
      case "/cart":
        setActiveButton("cart");
        break;
      case "/profile":
        setActiveButton("profile");
        break;
      case "/logout":
        setActiveButton("logout");
        break;
      default:
        setActiveButton("home");
        break;
    }
  }, [location]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    setActiveButton("logout");
    setAccessToken(""); // Clears the token
    navigate("/logout");
  };
  // creating chat bot
  const [newInputValue, setNewInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const newMessage: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setNewInputValue("");
    const newMessages: Message[] = [
      ...messages,
      {
        text: newInputValue,
        sender: "user",
      },
    ];
    setMessages(newMessages);
    const response = await fetch(functionUrl, {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });
    setMessages([
      ...newMessages,
      {
        sender: "ai",
        text: await response.text(),
      },
    ]);
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
              style={{ marginRight: "10px" }}
              onClick={() => handleButtonClick("home")}
            >
              Home
              <i className="fa-solid fa-house" style={{ marginLeft: "5px" }} />
            </Link>
            <Link
              to="/login"
              className={`btn btn-lg btn-header ${
                activeButton === "login" ? "btn-primary" : "btn-secondary"
              }`}
              style={{ marginRight: "10px" }}
              onClick={() => handleButtonClick("login")}
            >
              Login
              <i
                className="fa-solid fa-right-to-bracket"
                style={{ marginLeft: "5px" }}
              />
            </Link>
            <Link
              to="/product"
              className={`btn btn-lg btn-header ${
                activeButton === "product" ? "btn-primary" : "btn-secondary"
              }`}
              style={{ marginRight: "10px" }}
              onClick={() => handleButtonClick("product")}
            >
              Product
              <i
                className="fa-solid fa-screwdriver-wrench"
                style={{ marginLeft: "5px" }}
              />
            </Link>
            <Link
              to="/cart"
              className={`btn btn-lg btn-header ${
                activeButton === "cart" ? "btn-primary" : "btn-secondary"
              }`}
              style={{ marginRight: "10px" }}
              onClick={() => handleButtonClick("cart")}
            >
              Cart
              <i
                className="fa-solid fa-cart-shopping"
                style={{ marginLeft: "5px" }}
              />
            </Link>
            <Link
              to="/profile"
              className={`btn btn-lg btn-header ${
                activeButton === "profile" ? "btn-primary" : "btn-secondary"
              }`}
              style={{ marginRight: "10px" }}
              onClick={() => handleButtonClick("profile")}
            >
              Profile
              <i className="fa-solid fa-user" style={{ marginLeft: "5px" }} />
            </Link>{" "}
            <div className="separator" />
            <Link
              to="/logout"
              className={`btn btn-lg btn-header ${
                activeButton === "logout" ? "btn-primary" : "btn-secondary"
              }`}
              style={{ marginRight: "10px" }}
              onClick={handleLogout}
            >
              Logout
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ marginLeft: "5px" }}
              ></i>
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
        {/*chat bot*/}
        <h1>Need Help?</h1>
        <div>
          {messages.map((message, index) => (
            <p key={index} className={"message " + message.sender}>
              {message.text}
            </p>
          ))}
        </div>
        <form className="input-form" onSubmit={newMessage}>
          <input
            type="text"
            placeholder="Message"
            value={newInputValue}
            onChange={(e) => setNewInputValue(e.currentTarget.value)}
          />
          <input type="submit" value="Send" />
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-left p-3 mt-auto footer">
        HT Tool Rental. All Rights Reserved (2024).
      </footer>
    </div>
  );
};

export default App;
