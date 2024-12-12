import axios from "axios";

const BASE_URL = "http://localhost:8080/invoices";

export class InvoiceService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async getAllInvoices() {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error("Error getting all invoices", error);
      throw error;
    }
  }

  async getInvoiceById(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting invoice with id ${id}`, error);
      throw error;
    }
  }

  async createInvoice(invoiceData) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.post(this.baseUrl, invoiceData);
      return response.data;
    } catch (error) {
      console.error("Error creating invoice", error);
      throw error;
    }
  }

  async updateInvoice(id, invoiceData) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, invoiceData);
      return response.data;
    } catch (error) {
      console.error(`Error updating invoice with id ${id}`, error);
      throw error;
    }
  }

  async getInvoiceInPDF(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.get(`${this.baseUrl}/${id}/pdf`, {
        responseType: "blob", // Esto asegura que obtienes un archivo binario (PDF)
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting invoice with id ${id}`, error);
      throw error;
    }
  }

  async deleteInvoice(id) {
    this.setAuthorizationHeader();
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting invoice with id ${id}`, error);
      throw error;
    }
  }
}
