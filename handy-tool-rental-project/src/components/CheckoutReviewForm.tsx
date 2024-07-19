import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import "../App.css";

interface Tool {
  quantity: number;
  rental_time: number;
  tools_model_id: number;
}

interface RentedProduct {
  id: number;
  tools: Tool[];
  date_created: string;
  date_updated: string;
  user: number;
}

const CheckoutReviewForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rentedProducts, setRentedProducts] = useState<RentedProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken } = useAuthorization();

  // Initial load check for authorization
  useEffect(() => {
    if (accessToken) {
      console.log("User has access.");
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  // Initial load check for authorization
  useEffect(() => {
    const fetchRentedProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://ec2-52-91-173-244.compute-1.amazonaws.com:27015/payment/RentalCart/Get",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Failed to retrieve products that are added to cart by the user."
          );
          throw new Error("Failed to fetch add to cart products.");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setRentedProducts(data);
        } else {
          setRentedProducts([data]);
        }

        console.log("Rented:", rentedProducts.length);
      } catch (error) {
        setError("Server error. Please try again.");
        throw new Error("Server error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRentedProducts();
  }, [accessToken]);

  return (
    <div>
      <div className="col-md-12 page-section">
        <h3 className="text-center">Checkout Review</h3>
      </div>
      <div>
        <hr />
      </div>
      {rentedProducts.length > 0 ? (
        <form className="row g-3 needs-validation">
          <div className="table-container">
            {/* Add padding using Bootstrap classes */}
            <table className="table table-striped table-hover table-bordered border border-primary-subtle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Date Updated</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rental Time</th>
                  <th scope="col">Tool ID</th>
                </tr>
              </thead>
              <tbody>
                {rentedProducts.map((rentedProduct, index) => (
                  <React.Fragment key={rentedProduct.id}>
                    {rentedProduct.tools.map((tool, toolIndex) => (
                      <tr key={`${rentedProduct.id}-${toolIndex}`}>
                        <th scope="row">{rentedProduct.id}</th>
                        <td>{rentedProduct.user}</td>
                        <td>{rentedProduct.date_created}</td>
                        <td>{rentedProduct.date_updated}</td>
                        <td>{tool ? tool.quantity : 0}</td>
                        <td>{tool ? tool.rental_time : 0}</td>
                        <td>{tool ? tool.tools_model_id : 0}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-8 d-flex justify-content-end align-items-center">
            <div className="text-center text-danger fw-bold">
              NOTE: This is the last page that you can make changes for the
              rented products.{" "}
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
          <div className="col-md-4 btn-main d-flex justify-content-left">
            <button
              className="btn btn-primary fw-bold"
              id="checkoutreview"
              name="checkoutreview"
              type="submit"
            >
              {isLoading ? "Checkout Review processing ..." : "Checkout Review"}
              {"   "}
              <i className="fa-solid fa-check-double"></i>
            </button>
            {"   "}
            {error && <div className="text-danger">{error}</div>}
          </div>
        </form>
      ) : (
        <div className="text-danger text-center">
          <h4>
            {isAuthenticated
              ? "No rented products available."
              : "You need to login to access the Rental Cart function."}
          </h4>
        </div>
      )}
    </div>
  );
};

export default CheckoutReviewForm;
