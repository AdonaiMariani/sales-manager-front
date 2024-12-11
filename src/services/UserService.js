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

  async validatePassword(userId, password) {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/${userId}/validate-password`,
        { password }
      );
      return response.data.isValid; // Retorna true o false
    } catch (error) {
      console.error("Error validating password", error);
      throw error;
    }
  }
}

// import axios from "axios";
// const BASE_URL = "http://localhost:8080/users";

// export class UserService {
//   // Define methods for interacting with customers here
//   async getAllUsers() {
//     const response = await axios.get(BASE_URL);
//     return response.data;
//   }

//   async getUserById(id) {
//     const response = await axios.get(`${BASE_URL}/${id}`);
//     return response.data;
//   }

//   async createUser(userData) {
//     console.log("Creating user with data:", userData);
//     const response = await axios.post(BASE_URL, userData);
//     return response.data;
//   }

//   async updateUser(id, userData) {
//     const response = await axios.put(`${BASE_URL}/${id}`, userData);
//     return response.data;
//   }

//   async deleteUser(id) {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return response.data;
//   }
// }

// export class AuthService {
//   async registerUser(userData) {
//     console.log("Register user with data:", userData);
//     const response = await axios.post(
//       "http://localhost:8080/register",
//       userData
//     );
//     return response.data;
//   }
// }
