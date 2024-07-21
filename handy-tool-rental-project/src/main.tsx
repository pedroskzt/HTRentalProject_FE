import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import LoginPanel from "./components/LoginPanel";
import ProfilePanel from "./components/ProfilePanel";
import RegistrationForm from "./components/RegistrationForm";
import HomePanel from "./components/HomePanel";
import ProductPanel from "./components/ProductPanel";
import RentalCartPanel from "./components/RentalCartPanel";
import ChangePasswordForm from "./components/ChangePasswordForm";
import UpdateUserInfoForm from "./components/UpdateUserInfoForm";
import RentalHistoryForm from "./components/RentalHistoryForm";
import { AuthorizationProvider } from "./components/AuthorizationContext";
import CheckoutReviewForm from "./components/CheckoutReviewForm";

const Main: React.FC = () => {
  const product = {
    tools_model_id: 1,
    amount_available: 1,
    brand: "Brand Name",
    model: "Model Name",
    name: "Product Name",
    description: "Product Description",
    category: {
      category_id: 1,
      name: "Category Name",
    },
    price: 100,
    image_name: "image.png",
  }; // Example product data

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Nested routes for App component */}
          <Route path="/" element={<HomePanel />} />{" "}
          {/* Default route for App */}
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/product" element={<ProductPanel product={product} />} />
          <Route path="/cart" element={<RentalCartPanel />} />
          <Route path="/checkoutreview" element={<CheckoutReviewForm />} />
          <Route path="/profile" element={<ProfilePanel />} />
          <Route path="/changepassword" element={<ChangePasswordForm />} />
          <Route path="/updateuserinfo" element={<UpdateUserInfoForm />} />
          <Route path="/rentalhistory" element={<RentalHistoryForm />} />
          <Route path="/logout" element={<HomePanel />} />
        </Route>
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthorizationProvider>
      <Main />
    </AuthorizationProvider>
  </React.StrictMode>
);
