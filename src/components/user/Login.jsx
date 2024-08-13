import React from "react";
import Base from "../navbar/Base";
import { doLogin } from "../../auth";
import { loginUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import userContext from "../../context/UserContext";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [errors, setErrors] = useState({});
  // const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!loginDetail.email) {
      valid = false;
      errors["email"] = "Email is required";
    } else {
      // Regular expression for email validation
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailPattern.test(loginDetail.email)) {
        valid = false;
        errors["email"] = "Please enter a valid email address";
      }
    }

    if (!loginDetail.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (event, property) => {
    setLoginDetail({ ...loginDetail, [property]: event.target.value });
    setErrors({ ...errors, [property]: "" });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(loginDetail);
    //validation
    if (!validateForm()) {
      return;
    }

    loginUser(loginDetail)
      .then((data) => {
        // console.log(data);

        doLogin(data, () => {
          // console.log("login detail is saved to localstorage");

          navigate("/");
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Invalid Username Or Password");
        } else if (
          error.response &&
          (error.response.status === 400 || error.response.status === 404)
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on the server!!");
        }
      });
  };

  const handleReset = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="text-center">
            <h5>Login Here</h5>
          </div>
          <form action="" className="border border-secondary p-3 rounded">
            <div className="col-xl-12 col-md-12">
              <div className="mb-3">
                <label for="" className="form-label">
                  Email Id
                </label>
                <input
                  value={loginDetail.email}
                  onChange={(e) => handleChange(e, "email")}
                  type="text"
                  className="form-control"
                  placeholder="Enter here"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label for="" className="form-label">
                  Password
                </label>
                <input
                  value={loginDetail.password}
                  onChange={(e) => handleChange(e, "password")}
                  type="password"
                  className="form-control"
                  placeholder="Enter here"
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              <div className="card-body text-center">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={handleFormSubmit}
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

export default Login;
