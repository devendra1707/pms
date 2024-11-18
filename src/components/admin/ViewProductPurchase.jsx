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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginationRange = (pageNumbers, currentPage) => {
    const delta = 2;
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
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-12">
              <div className="card border-0">
                <div className="card-header">
                  <h3 className="card-title text-center">Products List</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
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
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => purchaseProduct(details.prodId)}
                                disabled={details.productQuantity <= 0}
                              >
                                {details.productQuantity > 0
                                  ? "BUY NOW"
                                  : "NOT AVAILABLE"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                            onClick={() =>
                              page !== "..." && handlePageChange(page)
                            }
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
          </div>
        </div>
      </main>
    </Base>
  );
};

export default ViewProductPurchase;
