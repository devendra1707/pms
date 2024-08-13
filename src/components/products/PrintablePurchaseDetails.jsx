import React from 'react';
import "./Printable.css";

const PrintablePurchaseDetails = ({ purchaseProd }) => {
  return (
    <div className="printable">
      <h2 style={{ textAlign: 'center' }}>Purchase Receipt</h2>
      <div className="purchase-details">
        <div className="detail-row">
          <p><strong>Product ID:</strong> {purchaseProd.id}</p>
          <p><strong>Product Name:</strong> {purchaseProd.productName}</p>
        </div>
        <div className="detail-row">
          <p><strong>Quantity Purchased:</strong> {purchaseProd.quantityPurchased}</p>
          <p><strong>Total Amount:</strong> ₹ {purchaseProd.totalAmount}</p>
        </div>
        <div className="detail-row">
          <p><strong>Customer Name:</strong> {purchaseProd.cusName}</p>
          <p><strong>Email:</strong> {purchaseProd.cusEmail}</p>
        </div>
        <div className="detail-row">
          <p><strong>Mobile Number:</strong> {purchaseProd.mobNum}</p>
          <p><strong>Address:</strong> {purchaseProd.address}</p>
        </div>
        <div className="detail-row">
          <p><strong>Purchase Date:</strong> {purchaseProd.purchaseDate}</p>
          <p><strong>Product Price:</strong> ₹ {purchaseProd.productPrice}</p>
        </div>
        <div className="detail-row">
          <p><strong>Product Discount:</strong> {purchaseProd.productDiscount}%</p>
          <p><strong>Description:</strong> {purchaseProd.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PrintablePurchaseDetails;
