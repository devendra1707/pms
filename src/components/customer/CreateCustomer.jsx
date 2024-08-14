import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Breadcrumb from "../navbar/Breadcrumb";
import Base from "../navbar/Base";
import { toast } from "react-toastify";
import { createCustomer } from "../../services/admin/Customer";

const CreateCustomer = () => {
  const navigate = useNavigate();

  const pageTitle = "Create Customer";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const validationSchema = Yup.object().shape({
    cusName: Yup.string()
      .required("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(50, "Name must be at most 50 characters"),
    cusEmail: Yup.string().email("Invalid email").required("Email is required"),
    mobNum: Yup.string().required("Mobile number is required"),
    address: Yup.string(),
  });

  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState({
    cusName: "",
    cusEmail: "",
    mobNum: "",
    address: "",
  });

  const fieldChange = (event, property) => {
    setCustomer({ ...customer, [property]: event.target.value });
    setErrors({ ...errors, [property]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(customer, { abortEarly: false });
      await createCustomer(customer);
      toast.success("Customer Added Successfully");
      navigate("/view-customer");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 403) {
        toast.error("You do not have permission.");
      } else {
        toast.error("Something went wrong on the server!!");
      }
    }
  };

  const handleReset = () => {
    setCustomer({
      cusName: "",
      cusEmail: "",
      mobNum: "",
      address: "",
    });
    setErrors({});
  };

  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Customers", path: "/view-customer" },
    { label: "Add Customer" },
  ];

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <Breadcrumb crumbs={crumbs} />
          <div className="text-center">
            <h5>Customer Form</h5>
          </div>
          <form action="" className="border border-secondary p-3 rounded">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cusName" className="form-label">
                  Full Name
                </label>
                <input
                  onChange={(e) => fieldChange(e, "cusName")}
                  type="text"
                  className="form-control"
                  id="cusName"
                  placeholder="Enter here"
                  value={customer.cusName}
                />
                {errors.cusName && (
                  <div className="text-danger">{errors.cusName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="cusEmail" className="form-label">
                  Email Id
                </label>
                <input
                  onChange={(e) => fieldChange(e, "cusEmail")}
                  type="email"
                  className="form-control"
                  id="cusEmail"
                  placeholder="Enter here"
                  value={customer.cusEmail}
                />
                {errors.cusEmail && (
                  <div className="text-danger">{errors.cusEmail}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="mobNum" className="form-label">
                  Mobile Number
                </label>
                <input
                  onChange={(e) => fieldChange(e, "mobNum")}
                  type="text"
                  className="form-control"
                  id="mobNum"
                  placeholder="Enter here"
                  value={customer.mobNum}
                />
                {errors.mobNum && (
                  <div className="text-danger">{errors.mobNum}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  onChange={(e) => fieldChange(e, "address")}
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter here"
                  value={customer.address}
                />
              </div>
            </div>

            <div className="card-body text-center">
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
          </form>
        </div>
      </main>
    </Base>
  );
};

export default CreateCustomer;
