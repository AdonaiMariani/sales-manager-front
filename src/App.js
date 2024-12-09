import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import AppRoutes from "./routes/AppRoutes";
import { DataContext } from "./context/DataContext";
import { useTheme } from "./context/ThemeContext";
import LoginPage from "./components/auth/pages/LoginPage";
import RegisterPage from "./components/auth/pages/RegisterPage";
import { useNavigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("login"); // Nueva variable de estado
  const { state: themeState } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  if (isAuthenticated) {
    // Prioriza el dashboard si el usuario está autenticado
    return (
      <div className="main-container">
        <div className="menu-column">
          <VerticalMenu />
        </div>
        <div
          className={`content-column ${themeState.darkMode ? "dark-mode" : ""}`}
        >
          <h1
            className={`main-title ${themeState.darkMode ? "dark-mode" : ""}`}
          >
            Sales Management
          </h1>
          <div
            style={{
              marginLeft: "100px",
              padding: "20px",
              width: "80%",
              height: "100%",
            }}
          >
            <AppRoutes />
          </div>
        </div>
      </div>
    );
  }

  // Renderiza las pantallas de autenticación si el usuario no está autenticado
  return (
    <div className="App">
      {currentPage === "login" ? (
        <LoginPage
          onLogin={handleLogin}
          onRegister={() => setCurrentPage("register")}
        />
      ) : (
        <RegisterPage
          onBackToLogin={() => setCurrentPage("login")}
          onSuccesfullyRegister={() => setCurrentPage("login")}
        />
      )}
    </div>
  );
}

export default App;

// import "./App.css";
// import React, { useState, useEffect } from "react";
// import VerticalMenu from "./components/verticalMenu/VerticalMenu";
// import AppRoutes from "./routes/AppRoutes";
// import CustomerProvider from "./context/CustomerProvider";
// import { ProductsProvider } from "./context/ProductContext";

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     //agrego manejo de errores
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/customers");

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };

//     //agrego manejo de errores
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/products");

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     // Llama a las funciones para obtener los datos
//     fetchCustomers();
//     fetchProducts();
//   }, []);

//   //función handelCreate para crear facturas con múltiple productos
//   // const handleCreate = async (invoice) => {
//   //   const productsToSend = invoice.invoiceProducts.map((product) => ({
//   //     productId: product.productId, // Cambio aquí: usé productId en lugar de id
//   //     quantity: Number(product.quantity), // Asegurarse de que quantity sea un número
//   //     price: product.price,
//   //   }));
//     const handleCreate = async (invoice) => {
//       // Verifica que invoice.invoiceProducts exista y sea un arreglo; si no, usa un arreglo vacío
//       const productsToSend = (invoice.invoiceProducts || []).map((product) => ({
//         productId: product.productId,
//         quantity: Number(product.quantity),
//         price: product.price,
//       }));

//     const invoiceToSend = {
//       customerId: invoice.customerId, // Cambio aquí: usé customerId en lugar de customer
//       date: invoice.date,
//       invoiceProducts: productsToSend,
//     };

//     console.log("invoiceToSend:", invoiceToSend);

//     const response = await fetch("http://localhost:8080/invoices", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(invoiceToSend),
//     });
//     console.log("Response:", response);

//     if (!response.ok) {
//       console.error("Error creating invoice:", response.statusText);
//       return;
//     }

//     const createdInvoice = await response.json();
//     console.log("Created invoice:", createdInvoice);
//   };

//   return (
//     <div className="main-container">
//       <div className="menu-column">
//         <VerticalMenu />
//       </div>
//       <div className="content-column">
//         <h1 className="main-title">Sales Management</h1>
//         <div style={{ marginLeft: "100px", padding: "20px", width: "60%" }}>
//           <ProductsProvider>
//             <CustomerProvider>
//               <AppRoutes
//                 customers={customers}
//                 products={products}
//                 handleCreate={handleCreate}
//               />
//             </CustomerProvider>
//           </ProductsProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// //CÓDIGO ANTES MODIFICACION FRANCO
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import VerticalMenu from "./components/verticalMenu/VerticalMenu";
// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/customers");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/products");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchCustomers();
//     fetchProducts();
//   }, []);

//   const handleCreate = async (invoice) => {
//     if (!invoice.products || !Array.isArray(invoice.products)) {
//       console.error("Products data is invalid:", invoice.products);
//       return;
//     }
//  // Validar que cada producto tenga un precio
//  const hasInvalidPrice = invoice.products.some(product => !product.price || typeof product.price !== 'number' || product.price <= 0);
//  if (hasInvalidPrice) {
//    console.error("Every product must have a valid price greater than 0");
//    return;
//  }
//     const invoiceProducts = invoice.products.map(product => ({
//       product: { id: product.id }, // Asegúrate de que el ID del producto se envíe correctamente
//       quantity: Number(product.quantity),
//       price: product.price,
//       total_price: product.price * product.quantity,
//     }));

//     const invoiceToSend = {
//       customer: { id: invoice.customer },
//       invoiceProducts: invoiceProducts, // Usar invoiceProducts en lugar de products
//       date: invoice.date
//     };

//     console.log('invoiceToSend:', invoiceToSend);

//     try {
//       const response = await fetch("http://localhost:8080/invoices", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(invoiceToSend),
//       });

//       console.log('Response:', response);

//       if (!response.ok) {
//         console.error("Error creating invoice:", response.statusText);
//         return;
//       }

//       const createdInvoice = await response.json();
//       console.log("Created invoice:", createdInvoice);
//     } catch (error) {
//       console.error("Error during fetch:", error);
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="menu-column">
//         <VerticalMenu />
//       </div>
//       <div className="content-column">
//         <h1 className="main-title">Sales Management</h1>
//         <div style={{ marginLeft: "200px", padding: "20px", width: "50%" }}>
//           <AppRoutes customers={customers} products={products} handleCreate={handleCreate} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// //CODIGO ANTES DE IMPLEMENTAR INVOICEPRODUCTS
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import VerticalMenu from "./components/verticalMenu/VerticalMenu";
// import AppRoutes from "./routes/AppRoutes"

// function App() {
//   const [customers, setCustomers] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//   //agrego manejo de errores
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/customers");

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     //agrego manejo de errores
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/products");

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     // Llama a las funciones para obtener los datos
//     fetchCustomers();
//     fetchProducts();
//   }, []);

//   //función handelCreate para crear facturas con múltiple productos
//   const handleCreate = async (invoice) => {
//     const productsToSend = invoice.products.map(product => ({
//       id: product.id,
//       // quantity: product.quantity,
//       quantity: Number(product.quantity), // Asegurarse de que quantity sea un número
//       price: product.price,
//       total_price: product.price * product.quantity,
//     }));

//     const invoiceToSend = {
//       customer: { id: invoice.customer },
//       products: productsToSend,
//       date: invoice.date
//     };

//     console.log('invoiceToSend:', invoiceToSend);

//     const response = await fetch("http://localhost:8080/invoices", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(invoiceToSend),
//     });
//     console.log('Response:', response);

//     if (!response.ok) {
//       console.error("Error creating invoice:", response.statusText);
//       return;
//     }

//     const createdInvoice = await response.json();
//     console.log("Created invoice:", createdInvoice);
//   };

//   return (
//     <div className="main-container">
//      <div className="menu-column">
//       <VerticalMenu />
//      </div>
//       <div className="content-column">
//        <h1 className="main-title">Sales Management</h1>
//        <div style={{ marginLeft: "200px", padding: "20px", width: "50%" }}>
//           <AppRoutes customers={customers} products={products} handleCreate={handleCreate} />
//         </div>
//      </div>
//   </div>
//   );
// }

// export default App;

// //CODIGO DESPUES DE IMPLEMENTAR INVOICEPRODUCTS

// // import "./App.css";
// // import React, { useState, useEffect } from "react";
// // import VerticalMenu from "./components/verticalMenu/VerticalMenu";
// // import AppRoutes from "./routes/AppRoutes";

// // function App() {
// //   const [customers, setCustomers] = useState([]);
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const fetchCustomers = async () => {
// //       try {
// //         const response = await fetch("http://localhost:8080/customers");
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setCustomers(data);
// //       } catch (error) {
// //         console.error('Error fetching customers:', error);
// //       }
// //     };

// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch("http://localhost:8080/products");
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setProducts(data);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       }
// //     };

// //     fetchCustomers();
// //     fetchProducts();
// //   }, []);

// //   const handleCreate = async (invoice) => {
// //     if (!invoice.products || !Array.isArray(invoice.products)) {
// //       console.error("Products data is invalid:", invoice.products);
// //       return;
// //     }

// //     const productsToSend = invoice.products.map(product => ({
// //       id: product.id,
// //       quantity: Number(product.quantity),
// //       price: product.price,
// //       total_price: product.price * product.quantity,
// //     }));

// //     const invoiceToSend = {
// //       customer: { id: invoice.customer },
// //       products: productsToSend,
// //       date: invoice.date
// //     };

// //     console.log('invoiceToSend:', invoiceToSend);

// //     try {
// //       const response = await fetch("http://localhost:8080/invoices", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(invoiceToSend),
// //       });

// //       console.log('Response:', response);

// //       if (!response.ok) {
// //         console.error("Error creating invoice:", response.statusText);
// //         return;
// //       }

// //       const createdInvoice = await response.json();
// //       console.log("Created invoice:", createdInvoice);
// //     } catch (error) {
// //       console.error("Error during fetch:", error);
// //     }
// //   };

// //   return (
// //     <div className="main-container">
// //       <div className="menu-column">
// //         <VerticalMenu />
// //       </div>
// //       <div className="content-column">
// //         <h1 className="main-title">Sales Management</h1>
// //         <div style={{ marginLeft: "200px", padding: "20px", width: "50%" }}>
// //           <AppRoutes customers={customers} products={products} handleCreate={handleCreate} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
