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
            Welcome to Handy Rental Tools, your trusted source for all your tool
            rental needs!
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
