import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";

interface RentalHistoryFormProps {
  id: number;
  rent_start_date: string;
  rent_end_date: string;
  date_created: string;
  date_modified: string;
  tool: {
    id: number;
    available: boolean;
    model: {
      id: number;
      brand: string;
      model: string;
      name: string;
      price: string;
      description: string;
      image_name: string;
      category: {
        id: number;
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

  // Initial load check for authorization
  useEffect(() => {
    const fetchRentalHistory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/api/Tools/History/Get/ByUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to retrieve rental history of the user.");
          throw new Error("Failed to fetch rental history.");
        }
        const data = await response.json();
        setRentalHistory(data);
      } catch (error) {
        setError("Server error. Please try again.");
        throw new Error("Server error. Please try again.");
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
                          <th scope="col">Tool ID</th>
                          <th scope="col">Category</th>
                          <th scope="col">Tool Name</th>
                          <th scope="col">Tool Brand</th>
                          <th scope="col">Tool Model</th>
                          <th scope="col">Price</th>
                          <th scope="col">Rent Start Date</th>
                          <th scope="col">Rent End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rentalHistory.map((rentHistory) => (
                          <tr key={rentHistory.id ? rentHistory.id : 0}>
                            <th scope="row">
                              {rentHistory.tool.id ? rentHistory.tool.id : 0}
                            </th>
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
                                ? rentHistory.tool.model.price
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.rent_start_date
                                ? rentHistory.rent_start_date
                                : "Unknown"}
                            </td>
                            <td>
                              {rentHistory.rent_end_date
                                ? rentHistory.rent_end_date
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
                  <h4>No rental history available.</h4>
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
