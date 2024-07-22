import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import "../App.css";
import { useNavigate } from "react-router-dom";

interface ToolsModels {
  quantity: number;
  time_rented: number;
  tool__model_id: number;
}

interface ReviewRentedProduct {
  rental_order_id: number;
  tools_models: ToolsModels[];
  date_created: string;
  date_updated: string;
  date_completed: string;
  user: number;
  status: string;
  sub_total: string;
}

type InputValuesType = { [key: string]: string };
type InputErrorsType = { [key: string]: string };
type CheckedStateType = { [key: string]: boolean };
type UpdatedDataType = { [key: string]: { [key: string]: string | number } };

const CheckoutReviewForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewRentedProducts, setReviewRentedProducts] = useState<
    ReviewRentedProduct[]
  >([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken } = useAuthorization();
  const [checkedState, setCheckedState] = useState<CheckedStateType>({});
  const [inputValues, setInputValues] = useState<InputValuesType>({});
  const [inputErrors, setInputErrors] = useState<InputErrorsType>({});
  const [selectedRowID, setSelectedRowID] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [timeRented, setTimeRented] = useState<string>("");
  const [updatingRowID, setUpdatingRowID] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initial load check for authorization
  useEffect(() => {
    if (accessToken) {
      console.log("User has access.");
      setIsAuthenticated(true);
    } else {
      console.error("Access token is not available.");
    }
  }, [accessToken]);

  // Fetch rented products for review
  const fetchReviewRentedProducts = async () => {
    if (!accessToken) {
      console.error("Cannot fetch products: No access token.");
      setError("You are not authenticated.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://ec2-54-227-38-251.compute-1.amazonaws.com:27015/payment/Checkout/Review",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rented products.");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setReviewRentedProducts(data);
      } else {
        setReviewRentedProducts([data]);
      }
    } catch (error) {
      setError("Server error. Please try again.");
      throw new Error("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchReviewRentedProducts();
    }
  }, [isAuthenticated]);

  const handleCheckboxChange = (id: string) => {
    if (selectedRowID === id) {
      setSelectedRowID(null);
    } else {
      setSelectedRowID(id);
      // Reset input values when a new row is selected
      setQuantity(inputValues[`${id}-quantity`] || "");
      setTimeRented(inputValues[`${id}-time_rented`] || "");
    }
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuantity(value);
    if (/^\d*$/.test(value)) {
      setInputErrors((prevState) => ({
        ...prevState,
        quantity: "",
      }));
    } else {
      setInputErrors((prevState) => ({
        ...prevState,
        quantity: "Please enter a valid number.",
      }));
    }
  };

  const handleTimeRentedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setTimeRented(value);
    if (/^\d*$/.test(value)) {
      setInputErrors((prevState) => ({
        ...prevState,
        time_rented: "",
      }));
    } else {
      setInputErrors((prevState) => ({
        ...prevState,
        time_rented: "Please enter a valid number.",
      }));
    }
  };

  const handleUpdateClick = async (rowID: string) => {
    //event.preventDefault(); // Prevent default form submission

    if (!accessToken) {
      console.error("Cannot update products: No access token.");
      setError("You are not authenticated.");
      return;
    }

    setUpdatingRowID(rowID);
    if (!selectedRowID) {
      setError("No row selected for update.");
      return;
    }

    //const [rowID, modelID] = selectedRowID.split("-");
    const [rentalOrderID, modelID] = selectedRowID.split("-");
    const updatedData: UpdatedDataType = {
      [modelID]: {},
    };

    if (quantity) {
      updatedData[modelID].quantity = parseInt(quantity, 10);
    }

    if (timeRented) {
      updatedData[modelID].rental_time = parseInt(timeRented, 10);
    }

    console.log("Updated data before fetch:", JSON.stringify(updatedData));
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://ec2-54-227-38-251.compute-1.amazonaws.com:27015/payment/RentalCart/Update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update rented products.");
      }

      // Reload the data without reloading the entire page
      fetchReviewRentedProducts(); // Call a function to fetch the updated data
    } catch (error) {
      console.error("Failed to update rented products:", error);
      setError("Failed to update rented products. Please try again.");
      return;
    } finally {
      setUpdatingRowID(null);
      setIsLoading(false);
    }
  };

  // Handles the Make payment
  const handleMakePaymentClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://ec2-54-227-38-251.compute-1.amazonaws.com:27015/payment/Checkout/Pay",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to make payment.");
        return;
      }
      // Handle successful payment (e.g., show a success message, redirect, etc.)
      console.log("Successful payment made.");
      navigate("/profile");
    } catch (error) {
      setError("Failed to make payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="col-md-12 page-section">
        <h3 className="text-center">Checkout Review</h3>
      </div>
      <div>
        <hr />
      </div>
      {reviewRentedProducts.length > 0 ? (
        <form className="row g-3 needs-validation">
          <div className="table-container">
            {/* Add padding using Bootstrap classes */}
            <table className="table table-striped table-hover table-bordered border border-primary-subtle">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Model ID</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Time Rented</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Date Updated</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviewRentedProducts.map((rentedProduct, index) => (
                  <React.Fragment key={rentedProduct.rental_order_id}>
                    {rentedProduct.tools_models.map((toolsModel, toolIndex) => {
                      const rowID = `${rentedProduct.rental_order_id}-${toolsModel.tool__model_id}-${toolIndex}`;
                      return (
                        <tr key={rowID} className="text-center">
                          <th scope="row">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="rentedProductCheck"
                              checked={selectedRowID === rowID}
                              onChange={() => handleCheckboxChange(rowID)}
                            />
                          </th>
                          <td>{toolsModel ? toolsModel.tool__model_id : 0}</td>
                          <td>
                            <input
                              className="form-control short-input"
                              type="text"
                              value={
                                selectedRowID === rowID
                                  ? quantity
                                  : toolsModel.quantity
                              }
                              id={`toolQuantity-${rowID}`}
                              disabled={selectedRowID !== rowID}
                              onChange={handleQuantityChange}
                            ></input>
                            {inputErrors.quantity && (
                              <div className="text-danger">
                                {inputErrors.quantity}
                              </div>
                            )}
                          </td>
                          <td>
                            <input
                              className="form-control short-input"
                              type="text"
                              value={
                                selectedRowID === rowID
                                  ? timeRented
                                  : toolsModel.time_rented
                              }
                              id={`toolTimeRented-${rowID}`}
                              disabled={selectedRowID !== rowID}
                              pattern="\d*"
                              onChange={handleTimeRentedChange}
                            ></input>

                            {inputErrors.time_rented && (
                              <div className="text-danger">
                                {inputErrors.time_rented}
                              </div>
                            )}
                          </td>
                          <td>
                            {rentedProduct.date_created
                              ? new Date(rentedProduct.date_created)
                                  .toISOString()
                                  .split("T")[0]
                              : "Unknown"}
                          </td>
                          <td>
                            {rentedProduct.date_updated
                              ? new Date(rentedProduct.date_updated)
                                  .toISOString()
                                  .split("T")[0]
                              : "Unknown"}
                          </td>

                          <td>
                            <button
                              className="btn btn-primary fw-bold"
                              id="editCheckoutReview"
                              name="editCheckoutReview"
                              type="button"
                              disabled={selectedRowID !== rowID}
                              onClick={() => handleUpdateClick(rowID)}
                            >
                              {updatingRowID === rowID
                                ? "Updating Rented Product ..."
                                : "Update"}
                              {"   "}
                              <i className="fa-solid fa-pen-nib"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {reviewRentedProducts.map((rentedProduct) => (
              <div
                key={`subtotal-${rentedProduct.rental_order_id}`}
                className="text-center"
              >
                <p>
                  <strong>Sub Total for Rented Product:</strong>
                  <strong className="btn btn-success fw-bold">
                    <i
                      className="fa-solid fa-dollar-sign"
                      style={{ marginRight: "5px", marginLeft: "5px" }}
                    />
                    {rentedProduct.sub_total}
                  </strong>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center">
            <div className="text-center text-danger fw-bold">
              <i className="fa-solid fa-triangle-exclamation"></i>
              NOTE: This is the last page that you can make changes for the
              rented products.{" "}
            </div>
          </div>
          <div className="col-md-4 btn-main d-flex justify-content-left">
            <button
              className="btn btn-primary fw-bold"
              id="makepayment"
              name="makepayment"
              type="button"
              onClick={handleMakePaymentClick}
            >
              {isLoading ? "Making payment ..." : "Make Payment"}
              {"   "}
              <i className="fa-solid fa-money-check-dollar"></i>
            </button>
            {"   "}
            {error && <div className="text-danger">{error}</div>}
          </div>
        </form>
      ) : (
        <div className="text-danger text-center">
          <h4>
            {isAuthenticated
              ? "No checkout review products available."
              : "You need to login to access the Rental Cart function."}
          </h4>
        </div>
      )}
    </div>
  );
};

export default CheckoutReviewForm;
