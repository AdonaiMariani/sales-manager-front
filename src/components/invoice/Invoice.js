import React from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  // Verifica si el objeto invoice y sus propiedades son nulos o indefinidos
  if (!invoice) {
    return null; // O muestra un mensaje de carga
  }

  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.date}</td>
      <td>{invoice.customerId}</td>{" "}
      {/* Aquí usaremos customerId directamente */}
      <td>{invoice.totalPrice}</td> {/* Corrige a totalPrice */}
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
