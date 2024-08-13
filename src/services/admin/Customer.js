import { privateAxios } from "../helper";

export const createCustomer = async (customer) => {
  try {
    const response = await privateAxios.post("customer/create", customer);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Customer

export const updateCustomers = (id,customer) => {
  return privateAxios
    .put(`customer/update/${id}`, customer)
    .then((response) => {
      return response.data;
    });
};

// Get Customer By Id

export const fetchCustomerById = (id) => {
  return privateAxios.get(`customer/` + id).then((response) => {
    return response.data;
  });
};

// Get Customer By Mobile Number

export const fetchCustomerByMobileNumber = (mobNum) => {
  return privateAxios
    .get(`customer/findByMobNum/` + mobNum)
    .then((response) => {
      return response.data;
    });
};

// Get Customer By Email Id

export const fetchCustomerByEmailId = (emailId) => {
  return privateAxios
    .get(`customer/findByEmail/` + emailId)
    .then((response) => {
      return response.data;
    });
};
// Get All Customer

export const fetchCustomers = () => {
  return privateAxios.get(`customer/all`).then((response) => {
    return response.data;
  });
};

// Delete Customer

export const deleteCustomerById = (id) => {
  return privateAxios.delete(`customer/delete/` + id).then((response) => {
    return response.data;
  });
};
