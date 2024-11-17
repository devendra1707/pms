import React, { useEffect, useState } from "react";
import Base from "../navbar/Base";
import { useParams } from "react-router-dom";
import { getPurchareProdById } from "../../services/admin/Product";
import PrintablePurchaseDetails from "./PrintablePurchaseDetails";

const PurchaseProdDetails = () => {
  const { id } = useParams();
  const [purchaseProd, setPurchaseProd] = useState(null);

  useEffect(() => {
    getPurchareProdById(id)
      .then((data) => {
        setPurchaseProd(data);
      })
      .catch((error) => {
        console.log("Failed to fetch Purchase details:", error);
      });
  }, [id]);

  const pageTitle = "Purchase Product Details";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Base>
      <div className="container mt-5">
        {purchaseProd ? (
          <>
            <div className="card">
              <div className="card-header text-center">
                <i>
                  <h3>Purchase Details</h3>
                </i>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Product ID: </strong> {purchaseProd.id}
                    </p>
                    <p>
                      <strong>Product Name: </strong> {purchaseProd.productName}
                    </p>

                    <p>
                      <strong>Quantity Purchased: </strong>
                      {purchaseProd.quantityPurchased}
                    </p>
                    <p>
                      <strong>Total Amount: </strong> ₹{" "}
                      {purchaseProd.totalAmount}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Customer Name: </strong> {purchaseProd.cusName}
                    </p>
                    <p>
                      <strong>Email: </strong> {purchaseProd.cusEmail}
                    </p>
                    <p>
                      <strong>Mobile Number: </strong> {purchaseProd.mobNum}
                    </p>
                    <p>
                      <strong>Address: </strong> {purchaseProd.address}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Product Price: </strong> ₹{" "}
                      {purchaseProd.productPrice}
                    </p>
                    <p>
                      <strong>Product Discount: </strong>{" "}
                      {purchaseProd.productDiscount}%
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Description: </strong> {purchaseProd.description}
                    </p>
                    <p>
                      <strong>Purchase Date: </strong>{" "}
                      {purchaseProd.purchaseDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-secondary" onClick={handlePrint}>
                  Print PDF
                </button>
              </div>
            </div>
            {/* Printable section (not hidden with display: none) */}
            <div className="printable">
              <PrintablePurchaseDetails purchaseProd={purchaseProd} />
            </div>
          </>
        ) : (
          <p>Loading purchase details...</p>
        )}
      </div>
    </Base>
  );
};

export default PurchaseProdDetails;

{
  /* </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary me-2" onClick={handleDownloadPdf}>
                Download PDF
              </button>
              <button className="btn btn-secondary" onClick={handlePrintPdf}>
                Print PDF
              </button>
            </div>
          </div>
        ) : (
          <p>Loading purchase details...</p>
        )}
      </div>
    </Base>
  );
}; */
}

// export default PurchaseProdDetails;
