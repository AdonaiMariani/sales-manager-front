import "./App.css";
import ProductList from "./components/productList/ProductsList";
import CustomerList from "./components/customerList/CustomerList";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NewProduct from "./components/newProduct/NewProduct";
import EditProduct from "./components/editProduct/EditProduct";

import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import NewCustomer from "./components/newCustomer/NewCustomer";
import EditCustomer from "./components/editCustomer/EditCustomer";
import NewInvoice from "./components/NewInvoice/NewInvoice";
import InvoiceList from "./components/invoiceList/InvoiceList";
import Home from "./components/home/Home";
import EditInvoice from "./components/editInvoice/EditInvoice";
import InvoicePrint from "./components/invoicePrint/InvoicePrint";

function App() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
  //agrego manejo de errores
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8080/customers");
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
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
        console.error('Error fetching products:', error);
      }
    };
    // Llama a las funciones para obtener los datos
    fetchCustomers();
    fetchProducts();
  }, []);



  //función handelCreate para crear facturas con múltiple productos
  const handleCreate = async (invoice) => {
    const productsToSend = invoice.products.map(product => ({
      id: product.id,
      // quantity: product.quantity,
      quantity: Number(product.quantity), // Asegurarse de que quantity sea un número
      price: product.price,
      total_price: product.price * product.quantity,
    }));
  
    const invoiceToSend = {
      customer: { id: invoice.customer },
      products: productsToSend,
      date: invoice.date
    };
  
    console.log('invoiceToSend:', invoiceToSend);
  
    const response = await fetch("http://localhost:8080/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceToSend),
    });
    console.log('Response:', response);
    
    if (!response.ok) {
      console.error("Error creating invoice:", response.statusText);
      return;
    }
  
    const createdInvoice = await response.json();
    console.log("Created invoice:", createdInvoice);
  };


  return (
    <Router>
      <div className="container">
        <div className="row">
          {/* Columna del menú vertical */}
          <div className="col-md-3">
            <VerticalMenu />
          </div>

          {/* Columna del contenido principal */}
          <div className="col-md-9">
            {/* Contenido principal */}
            SALES MANAGEMENT
            <div className="col-md-9 form-column">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/newProduct" element={<NewProduct />} />
                <Route path="/products/:id" element={<EditProduct />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/newCustomer" element={<NewCustomer />} />
                <Route path="/customers/:id" element={<EditCustomer />} />
                <Route path="/invoices" element={<InvoiceList />} />
                
                {/* <Route path="/createInvoice" element={<CreateInvoiceForm onCreate={handleCreate} />} /> Nueva ruta para el formulario de creación de facturas */}
                <Route
                  path="/newInvoice"
                  element={
                    <NewInvoice
                      customers={customers}
                      products={products}
                      onCreate={handleCreate}
                    />
                  }
                />
                <Route path="/invoices/:id" element={<EditInvoice />} />
                <Route path="/invoices/print/:id" element={<InvoicePrint />} />
                
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
