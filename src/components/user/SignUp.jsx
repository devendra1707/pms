import * as React from "react";
import Base from "../navbar/Base";
import { useState ,useEffect} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiCallAgain, signUpUser } from "../../services/UserService";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    mobNumber: "",
  });

  const [rollId, setRollId] = useState("");

  const [validForm, setValidForm] = useState(false);

  const handleChange = (event, property) => {
    if (property === "id") {
      setRollId(event.target.value);
    } else {
      setData({ ...data, [property]: event.target.value });
      setErrors({ ...errors, [property]: "" });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Basic validation for name
    if (!data.name || data.name.length < 5 || data.name.length > 20) {
      formIsValid = false;
      errors["name"] = "Name must be between 5 and 20 characters";
    }

    // Basic validation for  mobile number
    if (
      !data.mobNumber ||
      data.mobNumber.length < 5 ||
      data.mobNumber.length > 10
    ) {
      formIsValid = false;
      errors["mobNumber"] = "Mobile number must be between 5 and 10 digits";
    }

    // Advanced validation for email
    if (!data.email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else {
      // Regular expression for email validation
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailPattern.test(data.email)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address";
      }
    }

    // Advanced validation for password
    if (
      !data.password ||
      data.password.length < 3 ||
      data.password.length > 10
    ) {
      formIsValid = false;
      errors["password"] = "Password must be between 3 and 10 characters";
    }

    //  Role Validation
    if (!rollId) {
      formIsValid = false;
      errors["role"] = "Please select a role";
    }

    setErrors(errors);
    setValidForm(formIsValid);
    return formIsValid;
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(data);

      // call server api for sending data
      signUpUser(data, rollId)
        .then((resp) => {
          toast.success("User is Registered Successfully");
          setData({
            email: "",
            password: "",
            name: "",
            mobNumber: "",
          });
          setRollId("");
          navigate("/login");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 409) {
              toast.error(
                "Email is already registered. Please use a different email."
              );
            } else if (error.response.status === 400) {
              setErrors(error.response.data);
            } else {
              toast.error("Something went wrong...");
              console.log("Failed to Register User. Please try again later.");
            }
          } else {
            toast.error("Something went wrong...");
            console.log("Failed to Register User. Please try again later.");
          }
        });
    }
  };

  const resetData = () => {
    setData({
      email: "",
      password: "",
      name: "",
      mobNumber: "",
    });
    setRollId("");
    setErrors({});
    setValidForm(false);
  };

  // For Call API on Every 50 sec
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCallAgain();
        console.log("Fetched data:", response);
      } catch (err) {
        console.error("Error during API call:", err);
      }
    };
    const interval = setInterval(() => {
      fetchData();
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Base>
      {/* {JSON.stringify(data)} */}
      <main class="content px-3 py-2 mb-3">
        <div class="container-fluid mt-3">
          <div className="text-center">
            <h5>Register Here</h5>
          </div>
          <form action="" className="border border-secondary p-3 rounded">
            <div className="col-xl-12 col-md-12">
              <div class="mb-3">
                <label for="" class="form-label">
                  User Name
                </label>
                <input
                  onChange={(e) => handleChange(e, "name")}
                  value={data.name}
                  type="text"
                  class="form-control"
                  placeholder="Enter here"
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Mobile Number
                </label>
                <input
                  onChange={(e) => handleChange(e, "mobNumber")}
                  value={data.mobNumber}
                  type="number"
                  class="form-control"
                  placeholder="Enter here"
                />
                {errors.mobNumber && (
                  <div className="text-danger">{errors.mobNumber}</div>
                )}
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Email Id
                </label>
                <input
                  onChange={(e) => handleChange(e, "email")}
                  value={data.email}
                  type="email"
                  class="form-control"
                  placeholder="Enter here"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div class="mb-3">
                <label for="" class="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => handleChange(e, "password")}
                  value={data.password}
                  type="password"
                  class="form-control"
                  placeholder="Enter here"
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>

              <div class="mb-3 text-center">
                <div class="form-check form-check-inline">
                  <input
                    onChange={(e) => handleChange(e, "id")}
                    value="501"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    ADMIN
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    onChange={(e) => handleChange(e, "id")}
                    value="502"
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    USER
                  </label>
                </div>
                {errors.role && (
                  <div className="text-danger">{errors.role}</div>
                )}
              </div>

              <div className="card-body text-center">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={submitForm}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={resetData}
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

export default Signup;
