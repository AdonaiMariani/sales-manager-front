// import axios from "axios";

// const BASE_URL = "http://localhost:8080/invoices";

// export class InvoiceService {
//   constructor() {
//     // Initialize any necessary properties here
//     this.baseUrl = "http://localhost:8080/invoices";
//   }

//   // Define methods for interacting with invoices here
//   async getAllInvoices() {
//     const response = await axios.get(BASE_URL);
//     return response.data;
//   }

//   async getInvoiceById(id) {
//     const response = await axios.get(`${BASE_URL}/${id}`);
//     return response.data;
//   }

//   async createInvoice(invoiceData) {
//     const response = await axios.post(BASE_URL, invoiceData);
//     return response.data;
//   }

//   async updateInvoice(id, invoiceData) {
//     const response = await axios.put(`${BASE_URL}/${id}`, invoiceData);
//     return response.data;
//   }

//   async deleteInvoice(id) {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return response.data;
//   }
// }

//CÓDIGO CON MANEJO DE ERRORES
import axios from "axios";

const BASE_URL = "http://localhost:8080/invoices";

export class InvoiceService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async getAllInvoices() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error getting all invoices', error);
      throw error;
    }
  }

  async getInvoiceById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting invoice with id ${id}`, error);
      throw error;
    }
  }

  async createInvoice(invoiceData) {
    try {
      const response = await axios.post(this.baseUrl, invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error creating invoice', error);
      throw error;
    }
  }

  async updateInvoice(id, invoiceData) {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, invoiceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating invoice with id ${id}`, error);
      throw error;
    }
  }

  async deleteInvoice(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting invoice with id ${id}`, error);
      throw error;
    }
  }
}