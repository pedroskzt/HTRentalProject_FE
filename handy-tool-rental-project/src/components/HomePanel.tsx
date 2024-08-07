import React from "react";
import { useState } from "react";
import "../HomePanel.css";
import { useAuthorization } from "./AuthorizationContext";

// insert function URL for openAI here:
const functionUrl =
  "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/ChatBot/Input";

type Message = {
  text: string;
  sender: "ai" | "user";
};

const HomePanel: React.FC = () => {
  // creating chat bot
  const [newInputValue, setNewInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { accessToken } = useAuthorization();

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
    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), // Works for both non and authenticated users
        },
        body: JSON.stringify({
          input: newInputValue,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.user_error) {
          console.error(data.user_error);
        }
        throw new Error("Network response was not ok");
      }

      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: data.response_to_user, // response from api
        },
      ]);
    } catch (error) {
      console.error("Error encountered:", error);
      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    }
  };

  return (
    <div className="home-panel">
      <div className="left-section">
        {/* Text Section */}
        <div className="text-section">
          <div className="text-box">
            <h2>
              About Us
              <i
                className="fa-regular fa-address-card"
                style={{ marginLeft: "10px" }}
              ></i>
            </h2>
            <p>
              Welcome to Handy Tool Rental, your trusted source for all your
              tool rental needs!
            </p>
          </div>
          <div className="text-box">
            <h2>
              Who We Are <i className="fa-solid fa-users"></i>
            </h2>
            <p>
              At Handy Tool Rental, we specialize in providing a wide range of
              high-quality tools and equipment for all your project needs.
              Whether you're a professional contractor, a DIY enthusiast, or
              need specialized tools for a one-time project, we've got you
              covered.
            </p>
          </div>
          <div className="text-box">
            <h2>
              Our Mission
              <i
                className="fa-solid fa-bullseye"
                style={{ marginLeft: "10px" }}
              ></i>
            </h2>
            <p>
              Our mission is to make tool rental easy, accessible, and
              affordable for everyone. We believe that the right tools can make
              any job easier and more efficient, and we're committed to
              providing our customers with the best rental experience possible.
            </p>
          </div>
          <div className="text-box">
            <h2>
              Why Choose Us? <i className="fa-regular fa-circle-check"></i>
            </h2>
            <p>
              Convenience: Easily browse and reserve tools online, and choose
              between delivery or in-store pickup.
            </p>
            <p>
              Customer Satisfaction: We're dedicated to providing excellent
              customer service and support, ensuring you have everything you
              need for a successful project.
            </p>
            <p>
              Community Focus: As a locally owned and operated business, we're
              committed to supporting our community and helping local projects
              thrive.
            </p>
          </div>
        </div>
      </div>
      <div className="right-section">
        {/* Add content for the right section here */}
        <div className="text-section">
          <div className="text-box">
            <h2>
              Explore Our Tools{" "}
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </h2>
            <p>
              Browse through our extensive collection of tools and find the
              perfect one for your needs.
            </p>
          </div>
          <div className="text-box">
            <h2>
              What We Offer <i className="fa-solid fa-gift"></i>
            </h2>
            <ul>
              <li>
                <strong>Extensive Inventory:</strong> From power tools and hand
                tools to heavy machinery, we offer a comprehensive selection of
                tools for every job.
              </li>
              <li>
                <strong>Quality Assurance:</strong> All our tools are maintained
                to the highest standards to ensure they perform reliably and
                safely.
              </li>
              <li>
                <strong>Affordable Rates:</strong> We offer competitive rental
                rates and flexible rental periods to suit your budget and
                schedule.
              </li>
              <li>
                <strong>Expert Support:</strong> Our knowledgeable staff is
                always ready to assist you in selecting the right tools and
                providing tips on how to use them effectively.
              </li>
            </ul>
          </div>
          <div className="text-box">
            <h2>
              Contact Us <i className="fa-solid fa-phone"></i>
            </h2>
            <p>
              Have questions or need assistance? Feel free to reach out to us!
              You can contact us via email at info@handyrentaltools.com, call us
              at (123) 456-7890, or visit our store at 123 Main Street,
              Vancouver. We look forward to serving you!
            </p>
          </div>
        </div>
        <hr className="double" />
        <div className="text-box text-box-container">
          <h1>
            Need Help <i className="fa-regular fa-circle-question"></i>
          </h1>
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
              placeholder="Ask a question"
              value={newInputValue}
              onChange={(e) => setNewInputValue(e.currentTarget.value)}
            />
            <button className="btn btn-primary fw-bold" type="submit">
              Send
              <i
                className="fa-solid fa-circle-question"
                style={{ marginLeft: "5px" }}
              ></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default HomePanel;
