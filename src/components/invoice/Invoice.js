import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";
import CustomerContext from "../../context/CustomerContext";
import { FaRegEdit } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { CustomerService } from "../../services/CustomerService";

const customerService = new CustomerService();
const Invoice = ({ invoice, handleDeleteInvoice }) => {
  const { customers, setCustomers } = useContext(CustomerContext);
  const [customerName, setCustomerName] = useState("N/A");
  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (invoice) {
      const foundCustomer = customers.find((c) => c.id === invoice.customerId);
      setCustomerName(foundCustomer?.name || "N/A");
    }
  }, [invoice, customers]);
  if (!invoice) {
    return null;
  }

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
