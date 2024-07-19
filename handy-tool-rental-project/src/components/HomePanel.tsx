import React from "react";
import { useState } from "react";
import "../HomePanel.css";

// insert function URL for openAI here:
const functionUrl = "https://xxxxxxxxxxxxxxxx.lambda-url.eu-west-3.on.aws/";

type Message = {
  text: string;
  sender: "ai" | "user";
};

const HomePanel: React.FC = () => {
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
    <div className="home-panel">
      <div className="left-section">
        {/* Text Section */}
        <div className="text-section">
          <h2>About Us</h2>
          <p>
            Welcome to Handy Tool Rental, your trusted source for all your tool
            rental needs!
          </p>
          <h2>Who We Are</h2>
          <p>
            At Handy Tool Rental, we specialize in providing a wide range of
            high-quality tools and equipment for all your project needs. Whether
            you're a professional contractor, a DIY enthusiast, or need
            specialized tools for a one-time project, we've got you covered.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to make tool rental easy, accessible, and affordable
            for everyone. We believe that the right tools can make any job
            easier and more efficient, and we're committed to providing our
            customers with the best rental experience possible.
          </p>

          <h2>Why Choose Us?</h2>
          <p>
            Convenience: Easily browse and reserve tools online, and choose
            between delivery or in-store pickup.
          </p>
          <p>
            Customer Satisfaction: We're dedicated to providing excellent
            customer service and support, ensuring you have everything you need
            for a successful project.
          </p>
          <p>
            Community Focus: As a locally owned and operated business, we're
            committed to supporting our community and helping local projects
            thrive.
          </p>
        </div>
      </div>
      <div className="right-section">
        {/* Add content for the right section here */}
        <div className="text-section">
          <h2>Explore Our Tools</h2>
          <p>
            Browse through our extensive collection of tools and find the
            perfect one for your needs.
          </p>
          <h2>What We Offer</h2>
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
              <strong>Expert Support:</strong> Our knowledgeable staff is always
              ready to assist you in selecting the right tools and providing
              tips on how to use them effectively.
            </li>
          </ul>
          <h2>Contact Us</h2>
          <p>
            Have questions or need assistance? Feel free to reach out to us! You
            can contact us via email at info@handyrentaltools.com, call us at
            (123) 456-7890, or visit our store at 123 Main Street, Vancouver. We
            look forward to serving you!
          </p>
        </div>
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
      </div>
    </div>
  );
};
export default HomePanel;
