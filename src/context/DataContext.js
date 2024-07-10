import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [customers, setCustomers] = useState();

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/customers");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  //agrego manejo de errores
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleCreate = async (invoice) => {
    const productsToSend = invoice.products.map((product) => ({
      id: product.id,
      // quantity: product.quantity,
      quantity: Number(product.quantity), // Asegurarse de que quantity sea un número
      price: product.price,
      total_price: product.price * product.quantity,
    }));

    const invoiceToSend = {
      customer: { id: invoice.customer },
      products: productsToSend,
      date: invoice.date,
    };

    console.log("invoiceToSend:", invoiceToSend);

    const response = await fetch("http://localhost:8080/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceToSend),
    });
    console.log("Response:", response);

    if (!response.ok) {
      console.error("Error creating invoice:", response.statusText);
      return;
    }

    const createdInvoice = await response.json();
    console.log("Created invoice:", createdInvoice);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        customers,
        fetchCustomers,
        fetchProducts,
        handleCreate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
