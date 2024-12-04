import React from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.id}</td>
      <td>{invoice.date}</td>
      <td>{invoice.customer.name}</td>
      <td>{invoice.total}</td>
      <td className="button-container">
        <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>
          Edit
        </Link>
        <Link
          className="btn btn-secondary"
          to={`/invoices/print/${invoice.id}`}
        >
          Print View
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteInvoice(invoice.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Invoice;
