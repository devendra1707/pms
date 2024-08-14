import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/admin/Product";
import * as Yup from "yup";
import Breadcrumb from "../navbar/Breadcrumb";
import Base from "../navbar/Base";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required("Product Name is required")
      .min(3, "Product Name must be at least 3 characters")
      .max(50, "Product Name must be at most 50 characters"),

    productQuantity: Yup.number()
      .min(0, "Quantity must be at least 0")
      .max(10000, "Quantity must be at most 10,000")
      .required("Quantity is required"),

    productPrice: Yup.number()
      .min(0.01, "Price must be greater than 0")
      .max(2000000, "Price must be a valid amount")
      .required("Price is required"),

    productDiscount: Yup.number()
      .min(0, "Discount must be at least 0")
      .max(100, "Discount must be at most 100"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description must be at most 2000 characters"),
  });

  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    productName: "",
    productQuantity: "",
    productPrice: "",
    productDiscount: "",
    description: "",
  });

  const fieldChange = (event, property) => {
    setProduct({ ...product, [property]: event.target.value });
    setErrors({ ...errors, [property]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(product, { abortEarly: false });
      await addProduct(product);
      toast.success("Product Added Successfully");
      navigate("/view-product");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else if (error.response && error.response.status === 403) {
        toast.error("You do not have permission.");
      } else if (
        error.response &&
        (error.response.status === 400 || error.response.status === 404)
      ) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong on the server!!");
      }
    }
  };

  const handleReset = () => {
    setProduct({
      productName: "",
      productQuantity: "",
      productPrice: "",
      productDiscount: "",
      description: "",
    });
    setErrors({});
  };

  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/view-product" },
    { label: "Add Products" },
  ];

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <Breadcrumb crumbs={crumbs} />
          <div className="text-center">
            <h5>Product Form</h5>
          </div>
          <form action="" className="border border-secondary p-3 rounded">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  onChange={(e) => fieldChange(e, "productName")}
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter here"
                />
                {errors.productName && (
                  <div className="text-danger">{errors.productName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="productQuantity" className="form-label">
                  Product Quantity
                </label>
                <input
                  onChange={(e) => fieldChange(e, "productQuantity")}
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  placeholder="Enter here"
                />
                {errors.productQuantity && (
                  <div className="text-danger">{errors.productQuantity}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Product Price
                </label>
                <input
                  onChange={(e) => fieldChange(e, "productPrice")}
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="productPrice"
                  placeholder="Enter here"
                />
                {errors.productPrice && (
                  <div className="text-danger">{errors.productPrice}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="productDiscount" className="form-label">
                  Product Discount
                </label>
                <input
                  onChange={(e) => fieldChange(e, "productDiscount")}
                  type="number"
                  className="form-control"
                  id="productDiscount"
                  placeholder="Enter here"
                />
                {errors.productDiscount && (
                  <div className="text-danger">{errors.productDiscount}</div>
                )}
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  onChange={(e) => fieldChange(e, "description")}
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Enter here"
                ></textarea>
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>

              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Base>
  );
};

export default CreateProduct;
