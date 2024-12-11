import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/InvoiceService";
import InvoicePrint from "../invoicePrint/InvoicePrint";

const InvoiceView = ({ id }) => {
  const [invoice, setInvoice] = useState(null);
  const [printMode, setPrintMode] = useState(false); // Initialize printMode with false

  useEffect(() => {
    const invoiceService = new InvoiceService();
    invoiceService
      .getInvoiceById(id)
      .then((data) => setInvoice(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  // Función para alternar el modo de impresión
  const togglePrintMode = () => {
    setPrintMode(!printMode);
  };

  return (
    <div>
      {printMode ? (
        // Paso 3: Utiliza InvoicePrint para la vista de impresión
        <InvoicePrint invoice={invoice} />
      ) : (
        // Vista normal
        <>
          <h2>Invoice #{invoice.id}</h2>
          <p>Date: {invoice.date}</p>
          <p>Customer: {invoice.customer}</p>
          <p>Total: {invoice.total}</p>
          <h3>Items</h3>
          <ul>
            {invoice.items.map((item, index) => (
              <li key={index}>
                <p>Product: {item.product}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </li>
            ))}
          </ul>
          <button onClick={togglePrintMode}>Toggle Print View</button>
        </>
      )}
    </div>
  );
};

export default InvoiceView;
