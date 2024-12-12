import axios from "axios";

const AUTH_URL = "http://localhost:8080/auth";

export class AuthService {
  setAuthorizationHeader() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  async registerUser(userData) {
    try {
      const response = await axios.post(`${AUTH_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user", error);
      throw error;
    }
  }

  async validatePassword(userId, currentPassword) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.post(`${AUTH_URL}/validate-password`, {
        userId,
        currentPassword,
      });
      return response.data.isValid;
    } catch (error) {
      console.error("Error validating password", error);
      throw error;
    }
  }

  getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found in localStorage");
        return null;
    }
    
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token payload:", payload);
      return payload.userId; // Cambia 'userId' según el payload de tu token
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  }
}
