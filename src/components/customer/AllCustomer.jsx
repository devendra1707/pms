import React, { useEffect, useState } from "react";
import Base from "../navbar/Base";
import "./AllCustomer.css";
import { useNavigate } from "react-router-dom";
import {
  deleteCustomerById,
  fetchCustomers,
} from "../../services/admin/Customer";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";

const AllCustomer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetchCustomers()
      .then((data) => {
        // Sort customers by name in ascending order
        const sortedCustomers = data.sort((a, b) =>
          a.cusName.localeCompare(b.cusName)
        );
        setCustomers(sortedCustomers);
      })
      .catch((error) => {
        console.log("Failed to fetch Customer details:", error);
      });
  }, []);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Generate pagination range
  const paginationRange = (currentPage, totalPages) => {
    const delta = 2; // Number of pages to show around the current page
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

  const visiblePages = paginationRange(currentPage, totalPages);

  const handleUpdate = (id) => {
    navigate(`/update-customer/${id}`);
  };

  const handleDelete = (id) => {
    deleteCustomerById(id)
      .then(() => {
        toast.success("Customer deleted successfully.");
        fetchCustomers()
          .then((data) => {
            // Resort and update customers
            const sortedCustomers = data.sort((a, b) =>
              a.cusName.localeCompare(b.cusName)
            );
            setCustomers(sortedCustomers);
          })
          .catch((error) => {
            toast.error("Failed to refresh customer list.");
            console.log("Failed to fetch updated customer list:", error);
          });
      })
      .catch((error) => {
        toast.error("Something went wrong while deleting.");
        console.log(error);
      });
  };

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="card border-0">
            <div className="card-header">
              <h5 className="card-title text-center">View Customers</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email ID</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((details) => (
                    <tr key={details.cusId}>
                      <th scope="row">{details.cusId}</th>
                      <td>{details.cusName}</td>
                      <td>{details.cusEmail}</td>
                      <td>{details.mobNum}</td>
                      <td>{details.address}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-secondary btn-sm mx-2"
                            onClick={() => handleUpdate(details.cusId)}
                          >
                            <FaUserEdit /> Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(details.cusId)}
                          >
                            <TiUserDeleteOutline /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                      className={`page-item ${currentPage === page ? "active" : ""}`}
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
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
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

export default AllCustomer;
