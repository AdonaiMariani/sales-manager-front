import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";
import CustomerContext from "../../context/CustomerContext";
import { FaRegEdit } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  const { customers } = useContext(CustomerContext);
  if (!invoice) {
    return null;
  }
  const customerName = customers.find((c) => c.id === invoice.customerId)?.name;
  console.log(customers);
  console.log(customerName);

  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.date}</td>
      <td>{customerName}</td>
      <td>${invoice.totalPrice}</td>
      <td className="button-container">
        <Link className="btn btn-edit" to={`/invoices/${invoice.id}`}>
          <FaRegEdit />
        </Link>
        <Link className="btn btn-print" to={`/invoices/print/${invoice.id}`}>
          <AiFillPrinter />
        </Link>
        <button
          className="btn btn-delete"
          onClick={() => handleDeleteInvoice(invoice.id)}
        >
          <MdDeleteForever />
        </button>
      </td>
    </tr>
  );
};

export default Invoice;
