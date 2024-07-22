import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";

interface RentalHistoryFormProps {
  tools_history_id: number;
  rental_order: number;
  rental_price: number;
  user: number;
  rent_start_date: string;
  rent_end_date: string;
  date_created: string;
  date_modified: string;
  tool: {
    tool_id: number;
    available: boolean;
    model: {
      tools_model_id: number;
      brand: string;
      model: string;
      name: string;
      price: string;
      description: string;
      image_name: string;
      category: {
        category_id: number;
        name: string;
      };
    };
  };
}

const RentalHistoryForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rentalHistory, setRentalHistory] = useState<RentalHistoryFormProps[]>(
    []
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken } = useAuthorization();
  const [apiError, setApiError] = useState<string | null>(null);

  // Initial load check for authorization
  useEffect(() => {
    const fetchRentalHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://ec2-3-222-139-134.compute-1.amazonaws.com:27015/api/Tools/History/Get/ByUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          if (data.user_error) {
            setApiError(data.user_error);
            console.error(data.user_error);
            throw new Error(data.user_error);
          } else {
            console.error("Failed to retrieve rental history of the user.");
            throw new Error("Failed to fetch rental history.");
          }
          return;
        } else {
          setRentalHistory(data);
        }
      } catch (error) {
        setError("Server error. Please try again.");
        throw new Error("Server error. Please try again.");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentalHistory();
  }, [accessToken]);

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Side: Checkboxes */}
        <div className="col-md-4">
          <form>
            {/** Profile Options */}
            <h3>Profile Options</h3>
            <div>
              <hr />
            </div>
            {/* Change Password */}
            <div className="form-check">
              <button
                className="btn btn-secondary fw-bold"
                name="profileChangePassword"
                id="profileChangePassword"
                type="button"
                disabled
              >
                Change Password{" "}
                <i className="fa-solid fa-lock" style={{ marginLeft: "5px" }} />
              </button>
            </div>

            <div>
              <hr />
            </div>
            {/* Update User Info */}
            <div className="form-check">
              <button
                className="btn btn-secondary fw-bold"
                name="profileUpdateUserInfo"
                id="profileUpdateUserInfo"
                type="button"
                disabled
              >
                Update User Info
                <i
                  className="fa-solid fa-circle-info"
                  style={{ marginLeft: "5px" }}
                />
              </button>
            </div>
            <div>
              <hr />
            </div>
            {/* Rental History */}
            <div className="form-check">
              <button
                className="btn btn-dark fw-bold"
                name="profileRentalHistory"
                id="profileRentalHistory"
                type="button"
                disabled={false}
              >
                Rental History
                <i className="fa-solid fa-list" style={{ marginLeft: "5px" }} />
              </button>
            </div>
            <div>
              <hr />
            </div>
          </form>
        </div>

        {/* Profile Forms */}
        <div className="col-md-8">
          {/** Display form according to button clicked on the left part */}
          <h3 className="text-center">Rental History</h3>
          <hr />
          <div className="row d-flex justify-content-center mb-3">
            <div className="col-md-14 page-section mx-2">
              {rentalHistory.length > 0 ? (
                <form className="row g-3 needs-validation">
                  <div className="table-container">
                    {/* Add padding using Bootstrap classes */}
                    <table className="table table-striped table-hover table-bordered border border-primary-subtle">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">History ID</th>
                          <th scope="col">Category</th>
                          <th scope="col">Tool Name</th>
                          <th scope="col">Tool Brand</th>
                          <th scope="col">Tool Model</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Rental Price</th>
                          <th scope="col">Rent Start Date</th>
                          <th scope="col">Rent End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rentalHistory.map((rentHistory) => (
                          <tr
                            key={
                              rentHistory.tools_history_id
                                ? rentHistory.tools_history_id
                                : 0
                            }
                          >
                            <td>
                              {rentHistory.tools_history_id
                                ? rentHistory.tools_history_id
                                : 0}
                            </td>
                            <td>
                              {rentHistory.tool &&
                              rentHistory.tool.model &&
                              rentHistory.tool.model.category
                                ? rentHistory.tool.model.category.name
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.tool && rentHistory.tool.model
                                ? rentHistory.tool.model.name
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.tool && rentHistory.tool.model
                                ? rentHistory.tool.model.brand
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.tool && rentHistory.tool.model
                                ? rentHistory.tool.model.model
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.tool && rentHistory.tool.model
                                ? rentHistory.tool.model.price.split(".")[0] ||
                                  "0"
                                : "0"}
                            </td>
                            <td>
                              {rentHistory.rental_price
                                ? Math.round(rentHistory.rental_price)
                                : 0}
                            </td>
                            <td>
                              {rentHistory.rent_start_date
                                ? new Date(rentHistory.rent_start_date)
                                    .toISOString()
                                    .split("T")[0]
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.rent_end_date
                                ? new Date(rentHistory.rent_end_date)
                                    .toISOString()
                                    .split("T")[0]
                                : "Unknown"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </form>
              ) : (
                <div className="text-danger text-center">
                  <h4>
                    {isAuthenticated
                      ? apiError
                        ? apiError
                        : "No rental history available."
                      : "You need to login to access the Rental History function."}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHistoryForm;
