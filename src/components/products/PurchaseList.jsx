import React, { useEffect, useState } from "react";
import Base from "../navbar/Base";
import { useNavigate } from "react-router-dom";
import { fetchProductPurchaseList } from "../../services/admin/Product";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { parse, compareDesc } from "date-fns";

const PurchaseList = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  const pageTitle = "Purchase List";

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    fetchProductPurchaseList()
      .then((data) => {
        // Define the date format
        const dateFormat = "dd/MM/yyyy hh:mm:ss a";

        // Sort purchases by purchaseDate in descending order
        const sortedPurchases = data.sort((a, b) => {
          const dateA = parse(a.purchaseDate, dateFormat, new Date());
          const dateB = parse(b.purchaseDate, dateFormat, new Date());
          return compareDesc(dateA, dateB);
        });
        
        setPurchases(sortedPurchases);
      })
      .catch((error) => {
        console.log("Failed to fetch Product Purchase details:", error);
      });
  }, []);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchases.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(purchases.length / itemsPerPage);

  // Generate pagination range
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle pagination range to show
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

  const visiblePages = paginationRange(pageNumbers, currentPage);

  const handleDetails = (id) => {
    navigate(`/purchase-details/${id}`);
  };

  return (
    <Base>
      <main className="content px-3 py-2">
        <div className="container-fluid mt-3">
          <div className="card border-0">
            <div className="card-header">
              <h5 className="card-title text-center">Purchase Product List</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Product Quantity</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Purchase Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((details) => (
                    <tr key={details.id}>
                      <th scope="row">{details.id}</th>
                      <td>{details.cusName}</td>
                      <td>{details.quantityPurchased}</td>
                      <td>{details.productPrice}</td>
                      <td>{details.purchaseDate}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-secondary btn-sm mx-2"
                            onClick={() => handleDetails(details.id)}
                          >
                            <BsFileEarmarkPdf /> VIEW
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination controls */}
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

export default PurchaseList;


// import React, { useEffect, useState } from "react";
// import Base from "../navbar/Base";
// import { useNavigate } from "react-router-dom";
// import { fetchProductPurchaseList } from "../../services/admin/Product";
// import { BsFileEarmarkPdf } from "react-icons/bs";
// import { parse, compareDesc } from "date-fns";

// const PurchaseList = () => {
//   const navigate = useNavigate();
//   const [purchases, setPurchases] = useState([]);

//   useEffect(() => {
//     fetchProductPurchaseList()
//       .then((data) => {
//         // Define the date format
//         const dateFormat = "dd/MM/yyyy hh:mm:ss a";

//         // Sort purchases by purchaseDate in descending order
//         const sortedPurchases = data.sort((a, b) => {
//           const dateA = parse(a.purchaseDate, dateFormat, new Date());
//           const dateB = parse(b.purchaseDate, dateFormat, new Date());
//           return compareDesc(dateA, dateB);
//         });
        
//         setPurchases(sortedPurchases);
//       })
//       .catch((error) => {
//         console.log("Failed to fetch Product Purchase details:", error);
//       });
//   }, []);

//   const handleDetails = (id) => {
//     navigate(`/purchase-details/${id}`);
//   };

//   return (
//     <Base>
//       <main className="content px-3 py-2">
//         <div className="container-fluid mt-3">
//           <div className="card border-0">
//             <div className="card-header">
//               <h5 className="card-title text-center">Purchase List</h5>
//             </div>
//             <div className="card-body">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">Id</th>
//                     <th scope="col">Customer Name</th>
//                     <th scope="col">Product Quantity</th>
//                     <th scope="col">Product Price</th>
//                     <th scope="col">Purchase Date</th>
//                     <th scope="col">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {purchases &&
//                     purchases.map((details) => (
//                       <tr key={details.id}>
//                         <th scope="row">{details.id}</th>
//                         <td>{details.cusName}</td>
//                         <td>{details.quantityPurchased}</td>
//                         <td>{details.productPrice}</td>
//                         <td>{details.purchaseDate}</td>
//                         <td>
//                           <div className="action-buttons">
//                             <button
//                               className="btn btn-secondary btn-sm mx-2"
//                               onClick={() => handleDetails(details.id)}
//                             >
//                               <BsFileEarmarkPdf /> VIEW
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </main>
//     </Base>
//   );
// };

// export default PurchaseList;

