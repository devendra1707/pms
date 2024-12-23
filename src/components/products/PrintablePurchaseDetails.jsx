import React from "react";
import "./Printable.css";

const PrintablePurchaseDetails = ({ purchaseProd }) => {
  return (
    <div className="printable">
      <h2 className="receipt-title">Purchase Receipt</h2>
      <div className="purchase-details">
        <div className="detail-row">
          <p>
            <i>
              <strong>Customer Name: </strong>
            </i>
            {purchaseProd.cusName}
          </p>
          <p>
            <i>
              <strong>Email:</strong>
            </i>{" "}
            {purchaseProd.cusEmail}
          </p>
        </div>
        <div className="detail-row">
          <p>
            <i>
              <strong>Mobile Number:</strong>
            </i>{" "}
            {purchaseProd.mobNum}
          </p>
          <p>
            <i>
              <strong>Address:</strong>
            </i>{" "}
            {purchaseProd.address}
          </p>
        </div>
        <div className="detail-row">
          <p>
            <i>
              <strong>Product Name:</strong>
            </i>{" "}
            {purchaseProd.productName}
          </p>
          <p>
            <i>
              <strong>Quantity Purchased:</strong>
            </i>{" "}
            {purchaseProd.quantityPurchased}
          </p>
        </div>
        <div className="detail-row">
          <p>
            <i>
              <strong>Product Discount:</strong>
            </i>{" "}
            {purchaseProd.productDiscount}%
          </p>
          <p>
            <i>
              <strong>Product Price:</strong>
            </i>{" "}
            ₹ {purchaseProd.productPrice}
          </p>
        </div>
        <div className="detail-row">
          <p>
            <i>
              <strong>Total Amount:</strong>
            </i>{" "}
            ₹ {purchaseProd.totalAmount}
          </p>
          <p>
            <i>
              <strong>Payable Amount:</strong>
            </i>{" "}
            ₹ {purchaseProd.payableAmount}
          </p>
        </div>
        <div className="detail-row">
          <p>
            <i>
              <strong>Description:</strong>
            </i>{" "}
            {purchaseProd.description}
          </p>
          <p>
            <i>
              <strong>Purchase Date:</strong>
            </i>{" "}
            {purchaseProd.purchaseDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintablePurchaseDetails;
