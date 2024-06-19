import React from "react";
import "../ProductPanel.css";

const ProductPanel: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Side: Checkboxes */}
        <div className="col-md-4">
          <h3>Filter Products</h3>

          {/* Drill and Hammer */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="drillAndHammer"
            />
            <label className="form-check-label" htmlFor="drillAndHammer">
              Drills & Hammers
            </label>
          </div>

          {/* Cutting and Concrete */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="cuttingAndConcrete"
            />
            <label className="form-check-label" htmlFor="cuttingAndConcrete">
              Cutting & Concrete
            </label>
          </div>

          {/* Floor Care and Sanding */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="floorCareAndSanding"
            />
            <label className="form-check-label" htmlFor="floorCareAndSanding">
              Floor Care & Sanding
            </label>
          </div>
          {/* Add more checkboxes as needed */}
        </div>

        {/* Right Side: Product Images */}
        <div className="col-md-8">
          <h3>Products</h3>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="./drill-standard.png"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">Standard Drill</h5>
                    <p className="card-text">Category: Drills & Hammer</p>
                    <p className="card-text">
                      <small className="text-body-secondary">$20</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <hr />
          </div>
          {/* Navigation */}
          <div className="col-md-8">
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
