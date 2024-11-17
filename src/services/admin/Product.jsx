import { privateAxios } from "../helper";

// add Product  /create

export const addProduct = (product) => {
  return privateAxios.post(`product/create`, product).then((response) => {
    return response.data;
  });
};

// Add Product Quantity  /add/{prodId}/qualnity/{quantity}

export const addProductQut = (prodId, quantity) => {
  return privateAxios
    .put(`product/add/${prodId}/qualnity/${quantity}`)
    .then((response) => {
      return response.data;
    });
};

// update Products details /update/{prodId}

export const updateProductDetails = (id, product) => {
  return privateAxios.put(`product/update/${id}`, product).then((response) => {
    return response.data;
  });
};

// Purchase Product  /product/purchase/{prodId}/{quantity}

export const purchaseProduct = (
  prodId,
  quantity,
  cusName,
  cusEmail,
  mobNum,
  address
) => {
  return privateAxios
    .post(`product/purchase/${prodId}/${quantity}`, null, {
      params: {
        cusName,
        cusEmail,
        mobNum,
        address,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// export const purchaseProduct = (prodId, quantity) => {
//   return privateAxios
//     .post(`product/purchase/${prodId}/${quantity}`)
//     .then((response) => {
//       return response.data;
//     });
// };

// get Product History /{prodId}/history

export const getProductHistory = (prodId) => {
  return privateAxios.get(`product/${prodId}/history`).then((res) => {
    return res.data;
  });
};

// All Products List

export const fetchProduct = () => {
  return privateAxios.get(`product/active`).then((response) => {
    return response.data;
  });
};
// export const fetchProduct = () => {
//   return privateAxios.get(`product/all`).then((response) => {
//     return response.data;
//   });
// };

// All Products Purchase List

export const fetchProductPurchaseList = () => {
  return privateAxios.get(`product/purchasedetails`).then((response) => {
    return response.data;
  });
};

// Get Purchase Product By ID

export const getPurchareProdById = (purchId) => {
  return privateAxios.get(`product/purchaseprod/` + purchId).then((res) => {
    return res.data;
  });
};

// Download PDF

// export const downloadPurchareProdpdf = (id) => {
//   return privateAxios
//     .get(`/purchase/${id}/pdf`, {
//       responseType: "blob", // Important for downloading PDFs
//     })
//     .then((res) => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "purchase-receipt.pdf");
//       document.body.appendChild(link);
//       link.click();
//     })
//     .catch((err) => {
//       console.error("Failed to download PDF:", err);
//       throw err;
//     });
// };

// Ensure the JWT token is included in the request
export const downloadPurchareProdpdf = (id) => {
  const token = localStorage.getItem("data"); // Assuming you store your JWT token in localStorage

  console.log("------------------eeeeeeeeee" + token);
  return privateAxios
    .get(`/purchase/${id}/pdf`, {
      responseType: "blob", // Important for downloading PDFs
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token here
      },
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "purchase-receipt.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      console.error("Failed to download PDF:", err);
      throw err;
    });
};
// get one products {prodId}

export const getProductById = (prodId) => {
  return privateAxios.get(`product/` + prodId).then((res) => {
    return res.data;
  });
};

// delete Products /delete/{prodId}

export const deleteProductById = (prodId,product) => {
  return privateAxios.put(`product/delete/${prodId}`).then((res) => {
    return res.data;
  });
};
