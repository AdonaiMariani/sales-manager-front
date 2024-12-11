import axios from "axios";

const BASE_URL = "http://localhost:8080/users";

export class UserService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getAllUsers() {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error("Error getting all users", error);
      throw error;
    }
  }

  async getUserById(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting user with id ${id}`, error);
      throw error;
    }
  }

  async createUser(userData) {
    this.setAuthorizationHeader();
    try {
      console.log("Creating user with data:", userData);
      const response = await axios.post(this.baseUrl, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}`, error);
      throw error;
    }
  }

  async deleteUser(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}`, error);
      throw error;
    }
  }
}

export class AuthService {
  async registerUser(userData) {
    try {
      console.log("Registering user with data:", userData);
      const response = await axios.post(
        "http://localhost:8080/register",
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error registering user", error);
      throw error;
    }
  }
}
