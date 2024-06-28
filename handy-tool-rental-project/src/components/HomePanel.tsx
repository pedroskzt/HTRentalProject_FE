
import React from "react";
import "./HomePanel.css"; // Ensure you create and import the CSS file for styling

const HomePanel: React.FC = () => {
  return (
    <div className="home-panel">
      <div className="left-section">
        {/* Text Section */}
        <div className="text-section">
          <h2>About Us</h2>
          <p>
          Welcome to Handy Rental Tools, your trusted source for all your tool rental needs!
          </p>
        </div>
      </div>
      <div className="right-section">
        {/* Add content for the right section here */}
        <div className="text-section">
          <h2>Explore Our Tools</h2>
          <p>
            Browse through our extensive collection of tools and find the perfect one for your needs.
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePanel;