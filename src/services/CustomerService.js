import axios from "axios";

const BASE_URL = "http://localhost:8080/customers";

export class CustomerService {
  constructor() {
    // Initialize any necessary properties here
    this.baseUrl = "http://localhost:8080/customers";
  }

  // Define methods for interacting with customers here
  async getAllCustomers() {
    const response = await axios.get(BASE_URL);
    return response.data;
  }

  async getCustomerById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }

  async createCustomer(customerData) {
    console.log('Creating customer with data:', customerData);
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

