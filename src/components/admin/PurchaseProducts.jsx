import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base from "../navbar/Base";
import {
  fetchCustomerByEmailId,
  fetchCustomerByMobileNumber,
} from "../../services/admin/Customer";
import { getProductById, purchaseProduct } from "../../services/admin/Product";

const PurchaseProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [purchase, setPurchase] = useState({
    quantityPurchased: "",
    cusName: "",
    cusEmail: "",
    mobNum: "",
    address: "",
  });

  const [findBy, setFindBy] = useState("email");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  const fieldChange = (event, property) => {
    setPurchase({ ...purchase, [property]: event.target.value });
  };

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to fetch product details"));
  }, [id]);

  useEffect(() => {
    if (findBy === "email" && purchase.cusEmail) {
      fetchCustomerByEmailId(purchase.cusEmail)
        .then((data) => {
          setPurchase({
            ...purchase,
            cusName: data.cusName || "",
            mobNum: data.mobNum || "",
            address: data.address || "",
            cusEmail: data.cusEmail || "",
          });
          setError("");
        })
        .catch(() => {
          setError(`Customer Not Found with Email ID: ${purchase.cusEmail}`);
          setPurchase({
            ...purchase,
            cusName: "",
            mobNum: "",
            address: "",
          });
        });
    }
  }, [purchase.cusEmail, findBy]);

  useEffect(() => {
    if (findBy === "mobile" && purchase.mobNum) {
      fetchCustomerByMobileNumber(purchase.mobNum)
        .then((data) => {
          setPurchase({
            ...purchase,
            cusName: data.cusName || "",
            mobNum: data.mobNum || "",
            address: data.address || "",
            cusEmail: data.cusEmail || "",
          });
          setError("");
        })
        .catch(() => {
          setError(`Customer Not Found with Mobile Number: ${purchase.mobNum}`);
          setPurchase({
            ...purchase,
            cusName: "",
            cusEmail: "",
            address: "",
          });
        });
    }
  }, [purchase.mobNum, findBy]);

  useEffect(() => {
    if (product && purchase.quantityPurchased) {
      const quantity = parseInt(purchase.quantityPurchased, 10);
      if (
        product.productPrice &&
        product.productDiscount != null &&
        quantity > 0
      ) {
        const discountAmount =
          (product.productPrice * product.productDiscount) / 100;
        const finalPrice = product.productPrice - discountAmount;
        setTotalCost(finalPrice * quantity);
      } else {
        setTotalCost(0);
      }
    }
  }, [purchase.quantityPurchased, product]);

  const handleFindByChange = (event) => {
    setFindBy(event.target.value);
    setError("");
    setPurchase({
      quantityPurchased: "",
      cusName: "",
      cusEmail: "",
      mobNum: "",
      address: "",
    });
  };

  const handleCreateCustomer = () => {
    navigate("/create-customer");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (product && purchase.quantityPurchased) {
      try {
        const quantity = parseInt(purchase.quantityPurchased, 10);
        if (quantity <= 0) {
          setError("Quantity must be greater than zero.");
          setLoading(false);
          return;
        }

        await purchaseProduct(
          id,
          quantity,
          purchase.cusName,
          purchase.cusEmail,
          purchase.mobNum,
          purchase.address
        );
        setError("");
        navigate(`/purchase-list`); // Redirect to the purchase details page
      } catch (e) {
        setError("Failed to complete the purchase.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please provide all necessary details.");
      setLoading(false);
    }
  };

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="text-center">
            <h5>Purchase Product</h5>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border border-secondary p-3 rounded"
          >
            <div className="row align-items-center">
              <div className="col-xl-4 col-md-6 mb-3">
                <label className="form-label">Find By:</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="findBy"
                    value="email"
                    checked={findBy === "email"}
                    onChange={handleFindByChange}
                  />
                  <label className="form-check-label">Email</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="findBy"
                    value="mobile"
                    checked={findBy === "mobile"}
                    onChange={handleFindByChange}
                  />
                  <label className="form-check-label">Mobile Number</label>
                </div>
              </div>

              <div className="col-xl-8 col-md-6 mb-3">
                {findBy === "email" && (
                  <input
                    onChange={(e) => fieldChange(e, "cusEmail")}
                    type="email"
                    className="form-control"
                    id="cusEmail"
                    placeholder="Enter email"
                    value={purchase.cusEmail}
                  />
                )}
                {findBy === "mobile" && (
                  <input
                    onChange={(e) => fieldChange(e, "mobNum")}
                    type="text"
                    className="form-control"
                    id="mobNum"
                    placeholder="Enter mobile number"
                    value={purchase.mobNum}
                  />
                )}
              </div>
            </div>
            {error && (
              <div
                className="alert alert-danger d-flex justify-content-between align-items-center"
                role="alert"
              >
                <span>{error}</span>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleCreateCustomer}
                >
                  Create Customer
                </button>
              </div>
            )}
            {product && (
              <div className="text-center mb-3">
                <h4 className="text-primary">{product.productName}</h4>
                <h5 className="text-secondary">
                  Total Cost: ₹  {totalCost.toFixed(2)}
                </h5>
              </div>
            )}
            <div className="row">
              <div className="col-xl-6 col-md-12">
                <div className="mb-3">
                  <label htmlFor="cusName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cusName"
                    value={purchase.cusName}
                    disabled
                  />
                </div>
              </div>

              <div className="col-xl-6 col-md-12">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={purchase.address}
                    disabled
                  />
                </div>
              </div>

              <div className="col-xl-6 col-md-12">
                <div className="mb-3">
                  <label htmlFor="cusEmail" className="form-label">
                    Email Id
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="cusEmail"
                    value={purchase.cusEmail}
                    disabled
                  />
                </div>
              </div>

              <div className="col-xl-6 col-md-12">
                <div className="mb-3">
                  <label htmlFor="mobNum" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobNum"
                    value={purchase.mobNum}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="card-body text-center">
              <div className="mb-3">
                <label htmlFor="quantityPurchased" className="form-label">
                  Quantity Purchased
                </label>
                <input
                  onChange={(e) => fieldChange(e, "quantityPurchased")}
                  type="number"
                  className="form-control"
                  id="quantityPurchased"
                  placeholder="Enter here"
                  value={purchase.quantityPurchased}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mx-2"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
              <button type="reset" className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </Base>
  );
};




// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Base from "../navbar/Base";
// import {
//   fetchCustomerByEmailId,
//   fetchCustomerByMobileNumber,
// } from "../../services/admin/Customer";
// import { getProductById, purchaseProduct } from "../../services/admin/Product";

// const PurchaseProducts = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [error, setError] = useState("");
//   const [purchase, setPurchase] = useState({
//     quantityPurchased: "",
//     cusName: "",
//     cusEmail: "",
//     mobNum: "",
//     address: "",
//   });

//   const [findBy, setFindBy] = useState("email");
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [totalCost, setTotalCost] = useState(0);

//   const fieldChange = (event, property) => {
//     setPurchase((prevState) => ({
//       ...prevState,
//       [property]: event.target.value,
//     }));
//   };

//   useEffect(() => {
//     getProductById(id)
//       .then((data) => setProduct(data))
//       .catch(() => setError("Failed to fetch product details"));
//   }, [id]);

//   useEffect(() => {
//     const fetchCustomer =
//       findBy === "email"
//         ? fetchCustomerByEmailId(purchase.cusEmail)
//         : fetchCustomerByMobileNumber(purchase.mobNum);

//     if (purchase.cusEmail || purchase.mobNum) {
//       fetchCustomer
//         .then((data) => {
//           setPurchase((prevState) => ({
//             ...prevState,
//             cusName: data.cusName || "",
//             mobNum: data.mobNum || "",
//             address: data.address || "",
//             cusEmail: data.cusEmail || "",
//           }));
//           setError("");
//         })
//         .catch(() => {
//           setError(
//             `Customer Not Found with ${
//               findBy === "email" ? "Email ID" : "Mobile Number"
//             }: ${findBy === "email" ? purchase.cusEmail : purchase.mobNum}`
//           );
//           setPurchase((prevState) => ({
//             ...prevState,
//             cusName: "",
//             mobNum: "",
//             address: "",
//             cusEmail: findBy === "email" ? purchase.cusEmail : "",
//           }));
//         });
//     }
//   }, [purchase.cusEmail, purchase.mobNum, findBy]);

//   // Calculate total cost based on quantity purchased and product details
//   useEffect(() => {
//     if (product && purchase.quantityPurchased) {
//       const quantity = parseInt(purchase.quantityPurchased, 10);
//       if (
//         product.productPrice &&
//         product.productDiscount != null &&
//         quantity > 0
//       ) {
//         const discountAmount =
//           (product.productPrice * product.productDiscount) / 100;
//         const finalPrice = product.productPrice - discountAmount;
//         setTotalCost(finalPrice * quantity);
//       } else {
//         setTotalCost(0);
//       }
//     }
//   }, [purchase.quantityPurchased, product]);

//   // Handle the change of criteria for fetching customer
//   const handleFindByChange = (event) => {
//     setFindBy(event.target.value);
//     setError("");
//     setPurchase({
//       quantityPurchased: "",
//       cusName: "",
//       cusEmail: "",
//       mobNum: "",
//       address: "",
//     });
//   };

//   const handleCreateCustomer = () => {
//     navigate("/create-customer");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const quantity = parseInt(purchase.quantityPurchased, 10);
//       if (quantity <= 0) {
//         setError("Quantity must be greater than zero.");
//         return;
//       }

//       await purchaseProduct(
//         id,
//         quantity,
//         purchase.cusName,
//         purchase.cusEmail,
//         purchase.mobNum,
//         purchase.address
//       );
//       setError("");
//       navigate(`/purchase-list`);
//     } catch (e) {
//       setError("Failed to complete the purchase.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Base>
//       <main className="content px-3 py-2">
//         <div className="container-fluid mt-3">
//           <div className="text-center">
//             <h5>Purchase Product</h5>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="border border-secondary p-3 rounded"
//           >
//             <div className="row align-items-center">
//               <div className="col-xl-4 col-md-6 mb-3">
//                 <label className="form-label">Find By:</label>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="findBy"
//                     value="email"
//                     checked={findBy === "email"}
//                     onChange={handleFindByChange}
//                   />
//                   <label className="form-check-label">Email</label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="findBy"
//                     value="mobile"
//                     checked={findBy === "mobile"}
//                     onChange={handleFindByChange}
//                   />
//                   <label className="form-check-label">Mobile Number</label>
//                 </div>
//               </div>

//               <div className="col-xl-8 col-md-6 mb-3">
//                 {findBy === "email" && (
//                   <input
//                     onChange={(e) => fieldChange(e, "cusEmail")}
//                     type="email"
//                     className="form-control"
//                     id="cusEmail"
//                     placeholder="Enter email"
//                     value={purchase.cusEmail}
//                   />
//                 )}
//                 {findBy === "mobile" && (
//                   <input
//                     onChange={(e) => fieldChange(e, "mobNum")}
//                     type="text"
//                     className="form-control"
//                     id="mobNum"
//                     placeholder="Enter mobile number"
//                     value={purchase.mobNum}
//                   />
//                 )}
//               </div>
//             </div>
//             {error && (
//               <div
//                 className="alert alert-danger d-flex justify-content-between align-items-center"
//                 role="alert"
//               >
//                 <span>{error}</span>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleCreateCustomer}
//                 >
//                   Create Customer
//                 </button>
//               </div>
//             )}
//             {product && (
//               <div className="text-center mb-3">
//                 <h4 className="text-primary">{product.productName}</h4>
//                 <h5 className="text-secondary">
//                   Total Cost: ₹ {totalCost.toFixed(2)}
//                 </h5>
//               </div>
//             )}
//             <div className="row">
//               <div className="col-xl-6 col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="cusName" className="form-label">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="cusName"
//                     value={purchase.cusName}
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="col-xl-6 col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     value={purchase.address}
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="col-xl-6 col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="cusEmail" className="form-label">
//                     Email Id
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="cusEmail"
//                     value={purchase.cusEmail}
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="col-xl-6 col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="mobNum" className="form-label">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="mobNum"
//                     value={purchase.mobNum}
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="card-body text-center">
//               <div className="mb-3">
//                 <label htmlFor="quantityPurchased" className="form-label">
//                   Quantity Purchased
//                 </label>
//                 <input
//                   onChange={(e) => fieldChange(e, "quantityPurchased")}
//                   type="number"
//                   className="form-control"
//                   id="quantityPurchased"
//                   placeholder="Enter here"
//                   value={purchase.quantityPurchased}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary mx-2"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Submit"}
//               </button>
//               <button type="reset" className="btn btn-secondary">
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </Base>
//   );
// };

export default PurchaseProducts;
