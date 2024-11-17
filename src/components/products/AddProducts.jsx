import React, { useEffect, useState } from "react";
import Base from "../navbar/Base";
import { useNavigate, useParams } from "react-router-dom";
import { addProductQut } from "../../services/admin/Product";
import { toast } from "react-toastify";

const AddProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const pageTitle = "Add Product";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handleAddQuantity = () => {
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    addProductQut(id, quantity)
      .then((data) => {
        toast.success("Product quantity added successfully.");
        navigate("/view-product");
      })
      .catch((error) => {
        toast.error("Failed to add product quantity.");
        console.error("Error adding product quantity:", error);
      });
  };

  return (
    <Base>
      <div className="container mt-3">
        <div className="card border-0">
          <div className="card-header">
            <i>
              <h3 className="card-title text-center">Add Product Quantity</h3>
            </i>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="quantity">Enter Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-secondary mt-3"
                onClick={handleAddQuantity}
              >
                Add Quantity
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddProducts;
