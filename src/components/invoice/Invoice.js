import React from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  if (!invoice) {
    return null;
  }

  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.date}</td>
      <td>{invoice.customerName}</td>
      <td>${invoice.totalPrice}</td>
      <td className="button-container">
        <Link className="btn btn-sm btn-primary" to={`/invoices/${invoice.id}`}>
          Edit Invoice
        </Link>
        <Link
          className="btn btn-sm btn-secondary"
          to={`/invoices/print/${invoice.id}`}
        >
          Print View
        </Link>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteInvoice(invoice.id)}
        >
          Delete Invoice
        </button>
      </td>
    </tr>
  );
};

export default Invoice;
