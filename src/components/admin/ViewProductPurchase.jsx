import React, { useEffect, useState } from "react";
import Base from "../navbar/Base";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../../services/admin/Product";

const ViewProductPurchase = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetchProduct()
      .then((data) => {
        // Sort products by productName in ascending order
        const sortedProducts = data.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.log("Failed to fetch Product details:", error);
      });
  }, []);

  const pageTitle = "View Purchase Product";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Generate pagination range
  const paginationRange = (pageNumbers, currentPage) => {
    const delta = 2; // How many pages to show on each side of the current page
    const left = Math.max(currentPage - delta, 1);
    const right = Math.min(currentPage + delta, totalPages);

    let pages = [];

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = paginationRange([], currentPage);

  const purchaseProduct = (id) => {
    navigate(`/purchase-product/${id}`);
  };

  return (
    <Base>
      {/* {JSON.stringify(currentItems[1].productQuantity)} */}
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="card border-0">
            <div className="card-header">
              <i>
                <h3 className="card-title text-center">Products List</h3>
              </i>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Quantity</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Product Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((details) => (
                    <tr key={details.prodId}>
                      <th scope="row">{details.prodId}</th>
                      <td>{details.productName}</td>
                      <td>{details.productQuantity}</td>
                      <td>{details.productPrice}</td>
                      <td>{details.productDiscount}</td>
                      <td>
                        <div className="dropdown">
                          {/* <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => purchaseProduct(details.prodId)}
                          >
                            PURCHASE
                          </button> */}
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => purchaseProduct(details.prodId)}
                            disabled={details.productQuantity <= 0}
                          >
                            {details.productQuantity > 0
                              ? "BUY NOW"
                              : "NOT AVAILABLE"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {visiblePages.map((page, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => page !== "..." && handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </Base>
  );
};

export default ViewProductPurchase;
