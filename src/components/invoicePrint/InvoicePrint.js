//CÓDIGO QUE SE CONECTA CON LA API
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/InvoiceService";
import "./InvoicePrint.css";
import { CustomerService } from "../../services/CustomerService";
import { ProductService } from "../../services/ProductService";
import { ProductsContext } from "../../context/ProductContext";
import CustomerContext from "../../context/CustomerContext";

const customerService = new CustomerService();
const productService = new ProductService();

const InvoicePrint = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({ invoiceProducts: [] }); // Inicialización con estructura por defecto
  const { customers, setCustomers } = useContext(CustomerContext);
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const invoiceService = new InvoiceService();
    invoiceService
      .getInvoiceById(id)
      .then((data) => {
        console.log("Datos recibidos del backend:", data);
        setInvoice(data);
      })
      .catch((error) => console.error("Error al obtener la factura:", error));
  }, [id]);
  const productName = products.find(
    (p) => p.id === invoice.invoiceProducts.productId
  )?.name;
  const customerName = customers.find((c) => c.id === invoice.customerId)?.name;

  // Mostrar un mensaje de carga si los datos no están disponibles
  if (!invoice || !invoice.customerId) {
    return <div>Loading...</div>;
  }

  // Calcular el total
  const total = invoice.invoiceProducts.reduce(
    (sum, product) => sum + (product.price || 0) * (product.quantity || 0),
    0
  );

  return (
    <div className="invoice-print-container">
      <header>
        <div className="invoice-header">
          <img src="/path/to/logo.png" alt="Logo" />
          <div>Información del emisor</div>
        </div>
        <div className="invoice-customer">
          <h2>Factura para:</h2>
          <p>Cliente ID: {customerName}</p>
        </div>
      </header>

      <table className="invoice-details">
        <thead>
          <tr>
            <th>Producto ID</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.invoiceProducts.map((product) => (
            <tr key={product.productId}>
              <td>
                {products.find((p) => p.id === product.productId)?.name ||
                  "Sin nombre"}
              </td>
              <td>{product.quantity || 0}</td>
              <td>${product.price || 0}</td>
              <td>${(product.price || 0) * (product.quantity || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-total">
        <strong>Total: ${total}</strong>
      </div>

      <button onClick={() => window.print()}>Imprimir Factura</button>
    </div>
  );
};

export default InvoicePrint;
