import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export class UserService {
  // Define methods for interacting with customers here
  async getAllUsers() {
    const response = await axios.get(BASE_URL);
    return response.data;
  }

  async getUserById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }

  async createUser(userData) {
    console.log("Creating user with data:", userData);
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  }

  async updateUser(id, userData) {
    const response = await axios.put(`${BASE_URL}/${id}`, userData);
    return response.data;
  }

  async deleteUser(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
}
