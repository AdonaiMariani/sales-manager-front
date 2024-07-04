import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InvoiceService } from '../../services/InvoiceService';
import Invoice from '../invoice/Invoice';
import './InvoiceList.css';
const invoiceService = new InvoiceService();

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    invoiceService.getAllInvoices()
      .then(data => setInvoices(data))
      .catch(error => console.error(error));
  }, []);

  const handleDeleteInvoice = (id) => {
    // Aquí va tu lógica para eliminar la factura
    // Por ejemplo, podrías llamar a un método en invoiceService para eliminar la factura
    invoiceService.deleteInvoice(id)
      .then(() => {
        // Después de eliminar la factura, podrías querer actualizar la lista de facturas
        return invoiceService.getAllInvoices();
      })
      .then(data => setInvoices(data))
      .catch(error => console.error(error));
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Invoices</h3>
        <Link className="btn btn-success" to="/newInvoice">New Invoice</Link>
      </div>
      <div className="card-body">
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.filter(invoice => 
              Object.values(invoice).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            ).map((invoice) => (
              <Invoice key={invoice.id} invoice={invoice} handleDeleteInvoice={handleDeleteInvoice} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;