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

import "./App.css";
import React, { useState, useEffect } from "react";
import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import AppRoutes from "./routes/AppRoutes";
import CustomerProvider from "./context/CustomerProvider";
import { ProductsProvider } from "./context/ProductContext";

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
        console.error("Error fetching customers:", error);
      }
    };

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

    fetchCustomers();
    fetchProducts();
  }, []);

  //función handelCreate para crear facturas con múltiple productos
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
    <div className="main-container">
      <div className="menu-column">
        <VerticalMenu />
      </div>
      <div className="content-column">
        <h1 className="main-title">Sales Management</h1>
        <div style={{ marginLeft: "100px", padding: "20px", width: "60%" }}>
          <ProductsProvider>
            <CustomerProvider>
              <AppRoutes
                customers={customers}
                products={products}
                handleCreate={handleCreate}
              />
            </CustomerProvider>
          </ProductsProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
