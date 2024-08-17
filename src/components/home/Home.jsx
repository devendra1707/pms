import React, { useEffect } from "react";
import Base from "../navbar/Base";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const pageTitle = "Home Page";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleAdd = () => {
    navigate("/create-product");
  };

  const handlePurchaseList = () => {
    navigate("/purchase-list");
  };

  const handleViewProducts = () => {
    navigate("/view-product");
  };



  return (
    <Base>
      <div className="container-fluid p-4">
        <div className="row text-center mb-4">
          <div className="col">
            <h1 className="display-4">
              Welcome to the Product Management System
            </h1>
            <p className="lead">
              Manage your products efficiently and effortlessly.
            </p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">View Products</h5>
                <p className="card-text">
                  Browse through the list of products, view details, and manage
                  your inventory.
                </p>
                <button className="btn btn-primary mt-auto" onClick={handleViewProducts}> 
                  Go to Products
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Add New Product</h5>
                <p className="card-text">
                  Add new products to your inventory with ease and manage their
                  details.
                </p>
                <button className="btn btn-success mt-auto" onClick={handleAdd}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Purchase List</h5>
                <p className="card-text">
                  View the purchase list and track the sales of your
                  products.
                </p>
                <button className="btn btn-warning mt-auto" onClick={handlePurchaseList}>
                  Purchase List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
