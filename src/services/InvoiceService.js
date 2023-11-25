import axios from "axios";

const BASE_URL = "http://localhost:8080/invoices";

export class InvoiceService {
  constructor() {
    // Initialize any necessary properties here
    this.baseUrl = "http://localhost:8080/invoices";
  }

  // Define methods for interacting with invoices here
  async getAllInvoices() {
    const response = await axios.get(BASE_URL);
    return response.data;
  }

  async getInvoiceById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }

  async createInvoice(invoiceData) {
    const response = await axios.post(BASE_URL, invoiceData);
    return response.data;
  }

  async updateInvoice(id, invoiceData) {
    const response = await axios.put(`${BASE_URL}/${id}`, invoiceData);
    return response.data;
  }

  async deleteInvoice(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
}
