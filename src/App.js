import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React from "react";

import Home from "./components/home/Home";
import LoginPage from "./components/auth/pages/LoginPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

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

/* <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="nav navbar-nav">
                    <Link className="nav-item nav-link active" to={"/"}>Products <span class="sr-only">(current)</span></Link>
                    <Link className="nav-item nav-link" to={"/newProduct"}>New Product</Link>
                    <Link className="nav-item nav-link" to={"/products"}>Edit Product</Link>
                </div>
            </nav> */
