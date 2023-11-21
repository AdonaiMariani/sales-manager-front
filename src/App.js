// import './App.css';
// import ProductList from "./components/ProductsList";
// import { Route, BrowserRouter as Router } from "react-router-dom";
// function App() {
//   return (
//     <Router>
//     <div className="container">
//       SALES MANAGEMENT
//       <Route exact path= "/" component={ProductList}></Route>
//     </div>
//     </Router>
//   );
// }

// export default App;
// import './App.css';
// import ProductList from './components/ProductsList';
// import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

// import VerticalMenu from './components/verticalMenu/VerticalMenu';
// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3">
//             <VerticalMenu />
//           </div>
//           <div className="col-md-9">
//             {/* Contenido principal */}
//             SALES MANAGEMENT
//             <Routes> {/* Utiliza el componente Routes */}
//               <Route path="/" element={<ProductList />} /> {/* Ruta de ProductList */}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import './App.css';
import ProductList from './components/productList/ProductsList';
import CustomerList from './components/customerList/CustomerList';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NewProduct from './components/newProduct/NewProduct';
import EditProduct from './components/editProduct/EditProduct';

import VerticalMenu from './components/verticalMenu/VerticalMenu';
import NewCustomer from './components/newCustomer/NewCustomer';
import EditCustomer from './components/editCustomer/EditCustomer';
import CreateInvoiceForm from './components/createInvoiceForm/CreateInvoiceForm';
function App() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de los clientes
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:8080/customers');
      const data = await response.json();
      setCustomers(data);
    };
  
    // Función para obtener los datos de los productos
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      setProducts(data);
    };
  
    // Llama a las funciones para obtener los datos
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleCreate = async (invoice) => {
    const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoice),
    });

    if (!response.ok) {
        console.error('Error creating invoice:', response.statusText);
        return;
    }

    const createdInvoice = await response.json();
    console.log('Created invoice:', createdInvoice);
};

  return (
    <Router>
      <div className="container">
        <div className="row">
          {/* Columna del menú vertical */}
          <div className="col-md-3">
            <VerticalMenu />
            {/* <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="nav navbar-nav">
                    <Link className="nav-item nav-link active" to={"/"}>Products <span class="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to={"/newProduct"}>New Product</Link>
                    <Link className="nav-item nav-link" to={"/products"}>Edit Product</Link>
                </div>
            </nav> */}
          </div>

          {/* Columna del contenido principal */}
          <div className="col-md-9">
            {/* Contenido principal */}
            SALES MANAGEMENT
            <div className="col-md-9 form-column">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/newProduct" element={<NewProduct />} />
              <Route path="/products/:id" element={<EditProduct />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/newCustomer" element={<NewCustomer />} />
              <Route path="/customers/:id" element={<EditCustomer />} />
              {/* <Route path="/createInvoice" element={<CreateInvoiceForm onCreate={handleCreate} />} /> Nueva ruta para el formulario de creación de facturas */}
              <Route path="/createInvoice" element={<CreateInvoiceForm customers={customers} products={products} onCreate={handleCreate} />} />
              
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
