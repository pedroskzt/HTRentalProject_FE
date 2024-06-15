import React from "react";

const HomePanel: React.FC = () => {
  return (
    <div>
      <div className="col-md-12">
        {/* Text Section */}
        <div className="text-section container my-5">
          <h2 className="text-center">Welcome to Our Website</h2>
          <p className="text-center">
            Our website is dedicated to high quality tools and service ensuring
            the best tool rental experience for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePanel;
