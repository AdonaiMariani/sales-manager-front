import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";
import CustomerContext from "../../context/CustomerContext";

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  const { customers } = useContext(CustomerContext);
  if (!invoice) {
    return null;
  }
  const customerName = customers.find((c) => c.id === invoice.customerId)?.name;

  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.date}</td>
      <td>{customerName}</td>
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
