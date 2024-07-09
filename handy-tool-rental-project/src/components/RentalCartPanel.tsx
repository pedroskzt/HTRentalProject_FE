import React, { useEffect, useState } from "react";
import { useAuthorization } from "./AuthorizationContext";
import "../App.css";

interface Product {
  id: number;
  amount_available: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  image_name: string;
}

const RentalCartPanel: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { accessToken } = useAuthorization();

  // Initial load check for authorization
  useEffect(() => {
    if (accessToken) {
      console.log("User has access.");
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  // TODO: Temporary data
  useEffect(() => {
    const tempProducts: Product[] = [
      {
        id: 1,
        amount_available: 3,
        name: "Rotary",
        description:
          "BOSCH GBH18V-21N 18V Brushless SDS-Plus 3/4 in. Rotary Hammer (Bare Tool)",
        category: {
          id: 1,
          name: "Drills & Hammers",
        },
        price: 100.0,
        image_name: "rotary",
      },
      {
        id: 2,
        amount_available: 2,
        name: "Cordless",
        description:
          "DEWALT 20V MAX XR Hammer Drill, Brushless, 3-Speed, Tool Only (DCD996B)",
        category: {
          id: 2,
          name: "Cordless Tools",
        },
        price: 120.0,
        image_name: "cordless",
      },
    ];
    setProducts(tempProducts);
  }, []);

  return (
    <div>
      <div className="col-md-12 page-section">
        <h3 className="text-center">Rental Cart</h3>
      </div>
      <div>
        <hr />
      </div>
      {products.length > 0 ? (
        <form className="row g-3 needs-validation">
          <div className="table-container">
            {/* Add padding using Bootstrap classes */}
            <table className="table table-striped table-hover table-bordered border border-primary-subtle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.image_name}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.amount_available}</td>
                    <td>{product.price * product.amount_available}</td>
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
              ? "No products available."
              : "You need to login to access the Rental Cart function."}
          </h4>
        </div>
      )}
    </div>
  );
};

export default RentalCartPanel;
