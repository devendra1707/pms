import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../navbar/Base";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Breadcrumb from "../navbar/Breadcrumb";
import { fetchCustomerById, updateCustomers } from "../../services/admin/Customer";

const UpdateCustomer = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [updateCustomer, setUpdateCustomer] = useState({
    cusName: "",
    cusEmail: "",
    mobNum: "",
    address: "",
  });

  const validationSchema = Yup.object().shape({
    cusName: Yup.string()
      .required("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(50, "Name must be at most 50 characters"),
  });

  const fieldChange = (event, property) => {
    setUpdateCustomer({ ...updateCustomer, [property]: event.target.value });
    setErrors({ ...errors, [property]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(updateCustomer, { abortEarly: false });

      await updateCustomers(id, {
        cusName: updateCustomer.cusName,
        cusEmail: updateCustomer.cusEmail,
        mobNum: updateCustomer.mobNum,
        address: updateCustomer.address,
      });
      toast.success("Customer is Updated Successfully");
      navigate("/view-customer");
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
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on the server!!");
      }
    }
  };

  const handleBack = () => {
    navigate("/view-customer");
  };

  useEffect(() => {
    fetchCustomerById(id)
      .then((data) => {
        setUpdateCustomer(data);
      })
      .catch((error) => {
        console.log("Failed to fetch Customer details:", error);
      });
  }, [id]);

  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Customers", path: "/view-customer" },
    { label: "Update Customer" },
  ];

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <Breadcrumb crumbs={crumbs} />
          <div className="text-center">
            <h5>Update Customer</h5>
          </div>
          <form action="" className="border border-secondary p-3 rounded">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cusName" className="form-label">
                  Full Name
                </label>
                <input
                  onChange={(e) => fieldChange(e, "cusName")}
                  value={updateCustomer.cusName}
                  type="text"
                  className="form-control"
                  id="cusName"
                  placeholder="Enter Full Name"
                />
                {errors.cusName && (
                  <div className="text-danger">{errors.cusName}</div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="mobNum" className="form-label">
                  Mobile Number
                </label>
                <input
                  onChange={(e) => fieldChange(e, "mobNum")}
                  value={updateCustomer.mobNum}
                  type="text"
                  className="form-control"
                  id="mobNum"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cusEmail" className="form-label">
                  Email ID
                </label>
                <input
                  onChange={(e) => fieldChange(e, "cusEmail")}
                  value={updateCustomer.cusEmail}
                  type="email"
                  className="form-control"
                  id="cusEmail"
                  placeholder="Enter Email ID"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  onChange={(e) => fieldChange(e, "address")}
                  value={updateCustomer.address}
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter Address"
                />
              </div>
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Base>
  );
};

export default UpdateCustomer;
