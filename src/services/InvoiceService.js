import axios from "axios";

const BASE_URL = "http://localhost:8080/invoices";

export class InvoiceService {
  constructor() {
    this.baseUrl = "http://localhost:8080/invoices";
  }

  async getAllInvoices() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error("Error getting all invoices", error);
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
      console.error("Error creating invoice", error);
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
