import axios from "axios";

const BASE_URL = "http://localhost:8080/customers";

export class CustomerService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getAllCustomers() {
    this.setAuthorizationHeader();
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async getCustomerById(id) {
    this.setAuthorizationHeader();
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createCustomer(customerData) {
    this.setAuthorizationHeader();
    console.log("Creating customer with data:", customerData);
    const response = await axios.post(this.baseUrl, customerData);
    return response.data;
  }

  async updateCustomer(id, customerData) {
    this.setAuthorizationHeader();
    const response = await axios.put(`${this.baseUrl}/${id}`, customerData);
    return response.data;
  }

  async deleteCustomer(id) {
    this.setAuthorizationHeader();
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }
}
