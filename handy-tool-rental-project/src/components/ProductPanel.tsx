import React, { useState } from "react";
import { defer, useNavigate } from "react-router-dom";
import "../App.css";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  image_name: string;
}

const ProductPanel: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [toolID, setToolID] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /** URLs for filter categories */
  const urlAll =
    "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/Tools/Models/Get/All";
  const urlDrillsAndHammer =
    "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/tools/category?category_name=Drills %26 Hammers";
  const urlCuttingAndConcrete =
    "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/tools/category?category_name=Cutting %26 Concrete";
  const urlFloorCareAndSanding =
    "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/tools/category?category_name=Floor Care %26 Sanding";
  const urlByID =
    "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/tools/1";

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptionValue = e.target.value;
    setSelectedOption(selectedOptionValue);
    setError(null);
    if (selectedOptionValue != "byID") {
      setToolID(""); // Clear the tool id in cases where the option is not by ID
    }
  };

  const handleToolIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption("byID");
    if (/^\d*$/.test(value)) {
      setToolID(value);
      setError(null);
    } else {
      setError("Please enter a valid contact number (digits only).");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    /** TODO: Modify this for authentication check */
    setIsAuthenticated(true);

    try {
      let activeURL = urlAll;
      switch (selectedOption) {
        case "all":
          activeURL = urlAll;
          break;
        case "drillsAndHammer":
          activeURL = urlDrillsAndHammer;
          break;
        case "cuttingAndConcrete":
          activeURL = urlCuttingAndConcrete;
          break;
        case "floorCareAndSanding":
          activeURL = urlFloorCareAndSanding;
          break;
        case "byID":
          activeURL = urlByID;
          break;
        default:
          activeURL = urlAll;
      }
      console.log("Fetching url:", activeURL);
      const response = await fetch(activeURL);
      const data = await response.json();

      console.log("Raw response data:", data);

      if (Array.isArray(data)) {
        setProducts(data);
        console.log("Fetched data:", data);
      } else {
        throw new Error("Response is not an array.");
      }

      if (response.ok || response.status === 200) {
        console.log("Filter product successful: Data" + response.body);
      } else {
        console.error("Filter product failed. Message=", response.statusText);
        setError(response.statusText || "Filter product failed");
        throw new Error("Filter product error.");
      }
    } catch (error) {
      console.error("error:" + error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
      throw new Error("Server response error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Side: Checkboxes */}
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            {/** Filter Category */}
            <h3>Filter Products</h3>
            <div>
              <p>
                <hr />
              </p>
            </div>
            {/* ALL */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productRadios"
                id="productRadiosAll"
                value="all"
                checked={selectedOption === "all"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="productRadiosAll">
                All
              </label>
            </div>
            {/* Drill and Hammer */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productRadios"
                id="productRadiosDrillAndHammer"
                value="drillsAndHammer"
                checked={selectedOption === "drillsAndHammer"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label"
                htmlFor="productRadiosDrillAndHammer"
              >
                Drills & Hammer
              </label>
            </div>
            {/* Cutting and Concrete */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productRadios"
                id="productRadiosCuttingAndConcrete"
                value="cuttingAndConcrete"
                checked={selectedOption === "cuttingAndConcrete"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label"
                htmlFor="productRadiosCuttingAndConcrete"
              >
                Cutting & Concrete
              </label>
            </div>
            {/* Floor Care and Sanding */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="productRadios"
                id="productRadiosFloorCareAndSanding"
                value="floorCareAndSanding"
                checked={selectedOption === "floorCareAndSanding"}
                onChange={handleOptionChange}
              />
              <label
                className="form-check-label"
                htmlFor="productRadiosFloorCareAndSanding"
              >
                Floor Care & Sanding
              </label>
            </div>
            {/* By ID */}
            <div className="form-check">
              <label className="form-check-label" htmlFor="productRadiosByID">
                By ID
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="productRadios"
                id="productRadiosByID"
                value="byID"
                checked={selectedOption === "byID"}
                onChange={handleOptionChange}
              />
            </div>
            <div className="form-check">
              <input
                type="text"
                id="toolID"
                name="toolID"
                value={toolID}
                placeholder="Enter Tool ID"
                aria-label="First name"
                className={`form-control ${error ? "is-invalid" : ""}`}
                pattern="\d*"
                onChange={handleToolIDChange}
              />
            </div>
            <div className="form-check">
              <button
                className="btn btn-primary fw-bold"
                name="products"
                id="products"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Filtering products..." : "Filter Products"}
                <i
                  className="fa-solid fa-filter"
                  style={{ marginLeft: "5px" }}
                />
              </button>
              {error && <div className="text-danger">{error}</div>}
            </div>
          </form>
        </div>

        {/* Card for products */}
        <div className="col-md-8">
          <h3>Products</h3>
          <div>
            <p>
              <hr />
            </p>
          </div>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="card mb-3"
                style={{
                  maxWidth: "740px",
                }}
              >
                <div className="row g-0">
                  <div className="col-md-4 d-flex justify-content-center">
                    <img
                      src={`/${product.image_name}.jpeg`}
                      className="card-img-top p-2"
                      alt={product.name}
                      style={{
                        maxWidth: "180px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="text-product-title">{product.name}</h4>
                      <h6 className="text-italic">
                        Category: {product.category.name}
                      </h6>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <button
                          type="button"
                          className="btn btn-warning fw-bold"
                          disabled
                          style={{ marginRight: "20px" }}
                        >
                          <i
                            className="fa-solid fa-dollar-sign"
                            style={{ marginRight: "5px" }}
                          />
                          {product.price}
                        </button>

                        <button
                          className="btn btn-success fw-bold"
                          name="addToCart"
                          id="addToCart"
                          type="submit"
                          disabled={!isAuthenticated}
                        >
                          Add to Cart
                          <i
                            className="fa-solid fa-cart-shopping"
                            style={{ marginLeft: "5px" }}
                          />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger">No products to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
