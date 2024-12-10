import axios from "axios";

const BASE_URL = "http://localhost:8080/customers";

const updateAuthorizationHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export class CustomerService {
  constructor() {
    // Initialize any necessary properties here
    this.baseUrl = "http://localhost:8080/customers";
    const token = localStorage.getItem("token");
    updateAuthorizationHeader(token);
  }

  // Define methods for interacting with customers here
  async getAllCustomers() {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return response.data;
  }

  async getCustomerById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }

  async createCustomer(customerData) {
    console.log("Creating customer with data:", customerData);
    const response = await axios.post(BASE_URL, customerData);
    return response.data;
  }

  async updateCustomer(id, customerData) {
    const response = await axios.put(`${BASE_URL}/${id}`, customerData);
    return response.data;
  }

  async deleteCustomer(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
}
