import { useEffect, useState } from "react";
import VerticalMenu from "../verticalMenu/VerticalMenu";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "../../routes/AppRoutes";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de los clientes
    const fetchCustomers = async () => {
      const response = await fetch("http://localhost:8080/customers");
      const data = await response.json();
      setCustomers(data);
    };

    // Función para obtener los datos de los productos
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      setProducts(data);
    };

    // Llama a las funciones para obtener los datos
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleCreate = async (invoice) => {
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      console.error("Error creating invoice:", response.statusText);
      return;
    }

    const createdInvoice = await response.json();
    console.log("Created invoice:", createdInvoice);
  };
  return (
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
              <Route
                path="/*"
                element={
                  <AppRoutes
                    customers={customers}
                    products={products}
                    onCreate={handleCreate}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
