import axios from "axios";

const BASE_URL = "http://localhost:8080/products";

const updateAuthorizationHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export class ProductService {
  constructor() {
    // Initialize any necessary properties here
    this.baseUrl = "http://localhost:8080/products";
    const token = localStorage.getItem("token");
    updateAuthorizationHeader(token);
  }

  // Define methods for interacting with products here
  async getAllProducts() {
    const response = await axios.get(BASE_URL);
    console.log(response);
    return response.data;
  }

  async getProductById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }

  async createProduct(productData) {
    const response = await axios.post(BASE_URL, productData);
    return response.data;
  }

  async updateProduct(id, productData) {
    const response = await axios.put(`${BASE_URL}/${id}`, productData);
    return response.data;
  }

  async deleteProduct(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
}
