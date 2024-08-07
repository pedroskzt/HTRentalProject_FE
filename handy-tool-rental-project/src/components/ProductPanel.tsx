import React, { useEffect, useState } from "react";
import "../App.css";
import { useAuthorization } from "./AuthorizationContext";
import { useNavigate } from "react-router-dom";

interface Product {
  tools_model_id: number;
  amount_available: number;
  brand: string;
  model: string;
  name: string;
  description: string;
  category: {
    category_id: number;
    name: string;
  };
  price: number;
  image_name: string;
}

interface ProductProps {
  product: Product;
}

const ProductPanel: React.FC<ProductProps> = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [toolModelID, setToolModelID] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string>(
    "Server error. Please try again."
  );
  const [rentalDays, setRentalDays] = useState<{ [key: number]: number }>({});
  const [amountAvailable, setAmountAvailable] = useState(
    product.amount_available | 0
  );
  const [availableQuantities, setAvailableQuantities] = useState<{
    [key: number]: number;
  }>({});
  const [errorProduct, setErrorProduct] = useState<{ [key: number]: string }>(
    {}
  );
  const { accessToken } = useAuthorization();
  const navigate = useNavigate();

  /** URLs for filter categories */
  const urlAll =
    "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/Models/Get/All";
  const urlDrillsAndHammer =
    "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/Models/Get/ByCategory/1";
  const urlCuttingAndConcrete =
    "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/Models/Get/ByCategory/2";
  const urlFloorCareAndSanding =
    "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/Models/Get/ByCategory/3";
  const urlByID =
    "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/Models/Get/";

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptionValue = e.target.value;
    setSelectedOption(selectedOptionValue);
    setError(null);
    if (selectedOptionValue != "byID") {
      setToolModelID(""); // Clear the tool id in cases where the option is not by ID
    }
  };

  const handleToolIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption("byID");
    if (/^\d*$/.test(value)) {
      setToolModelID(value);
      setError(null);
    } else {
      setError("Please enter a valid contact number (digits only).");
    }
  };

  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    products.forEach((product) => {
      initialQuantities[product.tools_model_id] = product.amount_available;
    });
    setAvailableQuantities(initialQuantities);
  }, [products]);

  const handleRangeChange =
    (productID: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setRentalDays((prev) => ({
        ...prev,
        [productID]: value, // Update state for the specific product ID
      }));
    };

  const handleAddToCart = (productId: number) => async () => {
    const days = rentalDays[productId] || 0;
    if (days === 0) {
      setErrorProduct((prevErrors) => ({
        ...prevErrors,
        [productId]: "Please select at least 1 rental day.",
      }));
      return;
    }

    const currentAmount = availableQuantities[productId] || 0;
    if (currentAmount <= 0) {
      setErrorProduct((prevErrors) => ({
        ...prevErrors,
        [productId]: "Product is out of stock.",
      }));
      return;
    }

    setAvailableQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] - 1,
    }));

    try {
      const response = await fetch(
        "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/payment/RentalCart/Add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            tools_model_id: productId,
            rental_time: rentalDays[productId],
            quantity: 1,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      // Response available
      if (response.status === 200 || response.ok) {
        setError(null);
        setErrorProduct([]);
        console.log("Add to cart successful.");
        navigate("/cart");
      } else {
        console.error("Add to cart failed. Message=", response.statusText);
        setError("Error in adding to cart.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error:" + error);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
      return;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    /** Authentication check */
    if (accessToken) {
      console.log("There is access token.");
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

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
          activeURL = `${urlByID}${toolModelID}`;
          break;
        default:
          activeURL = urlAll;
      }

      const response = await fetch(activeURL);
      const data = await response.json();

      if (data.user_error) {
        setError(data.user_error);
        setDataError(data.user_error);
        setProducts([]);
        throw new Error(data.user_error);
      } else {
        if (Array.isArray(data)) {
          setProducts(data);
          console.log("Fetched data:", data);
        } else {
          throw new Error("Response is not an array.");
        }
      }

      if (response.ok || response.status === 200) {
        console.log("Filter product successful: Data" + response.body);
      } else {
        if (response.status === 400) {
          console.error(dataError);
          setError(dataError);
          throw new Error(dataError);
        } else {
          console.error("Filter product failed. Message=", response.statusText);
          setError(response.statusText || "Filter product failed");
          throw new Error("Filter product error.");
        }
      }
    } catch (error) {
      console.error("error:" + error);
      setError(dataError);
      throw new Error(dataError);
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
              <hr />
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
                id="toolModelID"
                name="toolModelID"
                value={toolModelID}
                placeholder="Enter Tool Model ID"
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
            <hr />
          </div>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.tools_model_id ? product.tools_model_id : 0}
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
                      alt={product.image_name}
                      style={{
                        maxWidth: "180px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="text-product-title d-flex justify-content-between">
                        <span>{product.name ? product.name : "Unknown"} </span>
                        <span>
                          Tool Model ID:{" "}
                          {product.tools_model_id
                            ? product.tools_model_id
                            : "Unknown"}{" "}
                        </span>
                      </h4>

                      <h6 className="text-italic">
                        Category:{" "}
                        {product.category ? product.category.name : "Unknown"}
                      </h6>
                      <h6 className="fw-bold">
                        Brand: {product.brand ? product.brand : "Unknown"}
                      </h6>
                      <h6 className="fw-bold">
                        Model: {product.model ? product.model : "Unknown"}
                      </h6>

                      <p className="card-text">
                        {product.description ? product.description : "Unknown"}
                      </p>
                      <p>
                        <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="7"
                          step="1"
                          value={rentalDays[product.tools_model_id] || 0}
                          id={`rentalDays-${product.tools_model_id}`}
                          name={`rentalDays-${product.tools_model_id}`}
                          onChange={handleRangeChange(product.tools_model_id)}
                        />
                      </p>
                      <p>
                        <button
                          type="button"
                          className="btn btn-warning fw-bold"
                          disabled
                          style={{ marginRight: "10px" }}
                        >
                          <i
                            className="fa-solid fa-dollar-sign"
                            style={{ marginRight: "2px" }}
                          />
                          {product.price ? product.price : "0.0"}
                        </button>
                        <button
                          className="btn btn-danger"
                          name="qty"
                          id="qty"
                          type="button"
                          disabled
                          style={{ marginRight: "10px" }}
                        >
                          Qty{" "}
                          <i
                            className="fa-solid fa-equals"
                            style={{ marginRight: "2px" }}
                          ></i>
                          {availableQuantities[product.tools_model_id]
                            ? availableQuantities[product.tools_model_id]
                            : 0}
                        </button>
                        <button
                          className="btn btn-info"
                          name="qty"
                          id="qty"
                          type="button"
                          disabled
                          style={{ marginRight: "10px" }}
                        >
                          <span>
                            {rentalDays[product.tools_model_id] || 0} days
                          </span>
                        </button>

                        <button
                          className="btn btn-success fw-bold"
                          name="addToCart"
                          id="addToCart"
                          type="submit"
                          disabled={
                            !isAuthenticated ||
                            availableQuantities[product.tools_model_id] <= 0
                          }
                          style={{ marginRight: "5px" }}
                          onClick={handleAddToCart(product.tools_model_id)}
                        >
                          Add to Cart
                          <i
                            className="fa-solid fa-cart-shopping"
                            style={{ marginLeft: "2px" }}
                          />
                        </button>

                        {/* Error message for this product */}
                        {errorProduct[product.tools_model_id] && (
                          <p className="text-danger">
                            {errorProduct[product.tools_model_id]}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-danger">
              {error ? error : "Select a filter option."}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
