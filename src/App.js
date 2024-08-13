import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Login from "./components/user/Login.jsx";
import Signup from "./components/user/SignUp.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import ViewProductPurchase from "./components/admin/ViewProductPurchase.jsx";
import CreateCustomer from "./components/customer/CreateCustomer.jsx";
import AllCustomer from "./components/customer/AllCustomer.jsx";
import UpdateCustomer from "./components/customer/UpdateCustomer.jsx";
import CustomerDetails from "./components/customer/CustomerDetails.jsx";
import PurchaseList from "./components/products/PurchaseList.jsx";
import PurchaseProdDetails from "./components/products/PurchaseProdDetails.jsx";
import PurchaseProducts from "./components/admin/PurchaseProducts.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import CreateProduct from "./components/admin/CreateProduct.jsx";
import AddProducts from "./components/products/AddProducts.jsx";
import UserProfile from "./components/admin/UserProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* User */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/view-product" element={<ProductList />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/add-product/:id" element={<AddProducts />} />

        <Route path="/purchase" element={<ViewProductPurchase />} />
        <Route path="/purchase-list" element={<PurchaseList />} />
        <Route path="/purchase-product/:id" element={<PurchaseProducts />} />
        <Route path="/purchase-details/:id" element={<PurchaseProdDetails />} />

        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/view-customer" element={<AllCustomer />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/customer-details/:id" element={<CustomerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
