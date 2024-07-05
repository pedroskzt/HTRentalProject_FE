import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import LoginPanel from "./components/LoginPanel";
import ProfilePanel from "./components/ProfilePanel";
import RegistrationForm from "./components/RegistrationForm";
import HomePanel from "./components/HomePanel";
import ProductPanel from "./components/ProductPanel";
import RentalCartPanel from "./components/RentalCartPanel";

import "bootstrap/dist/css/bootstrap.css";
import ChangePasswordForm from "./components/ChangePasswordForm";
import UpdateUserInfoForm from "./components/UpdateUserInfoForm";
import RentalHistoryForm from "./components/RentalHistoryForm";

const Main: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Nested routes for App component */}
          <Route path="/" element={<HomePanel />} />{" "}
          {/* Default route for App */}
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/product" element={<ProductPanel />} />
          <Route path="/cart" element={<RentalCartPanel />} />
          <Route path="/profile" element={<ProfilePanel />} />
          <Route path="/changepassword" element={<ChangePasswordForm />} />
          <Route path="/updateuserinfo" element={<UpdateUserInfoForm />} />
          <Route path="/rentalhistory" element={<RentalHistoryForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
