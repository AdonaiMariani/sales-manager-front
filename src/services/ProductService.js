import axios from "axios";

const BASE_URL = "http://localhost:8080/products";

export class ProductService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getAllProducts() {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(this.baseUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting all products", error);
      throw error;
    }
  }

  async getProductById(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting product with id ${id}`, error);
      throw error;
    }
  }

  async createProduct(productData) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.post(this.baseUrl, productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product", error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}`, error);
      throw error;
    }
  }

  async deleteProduct(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}`, error);
      throw error;
    }
  }
}
