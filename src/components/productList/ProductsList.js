// import React from 'react';
// import { Link } from 'react-router-dom';
// const ProductsList = (props) => {
//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           <th>CODE</th>
//           <th>NAME</th>
//           <th>BRAND</th>
//           <th>PRICE</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>1001</td>
//           <td>Papas x 1kg.</td>
//           <td>Nikitos</td>
//           <td>2730</td>
//           <td>
//             <div className="btn-group" role="group" aria-label="">
//               {/* <button type="button" className="btn btn-warning">Edit</button> */}
//               <Link to="/editProduct" className="btn btn-warning">Edit</Link>
//               <button type="button" className="btn btn-danger">Delete</button>
             
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default ProductsList;

//CÓDIGO SIN FUNCIONALIDAD EN BOTON DELETE
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { data } from '../public/data/MOCK_DATA';

// const ProductsList = (props) => {
//   const [products, setProducts] = useState(data);

//   useEffect(() => {
//     // Realiza la solicitud a la API cuando el componente se monta
//     // EL FETCH LO VAMOS A USAR CUANDO TENGAMOS CONECTADO LA BASE DE DATOS
//     // fetch('../../public/data/MOCK_DATA.json')
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     console.log(data)
//     //     setProducts(data); // Almacena los datos en el estado
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error getting data from the API', error);
//     //   });
//   }, []); // El segundo argumento de useEffect es un array vacío, para que se ejecute solo una vez al montar el componente.
//   return (
//     <div className="card">
//       <div className="card-header">
//       <Link to={`/newProduct/`} className="btn btn-success">
//                   Add New Product
//                 </Link>
//       </div>
//       <div className="card-body">
//         <h4>Product List</h4>
//       <table className="table">
//       <thead>
//         <tr>
//           <th>CODE</th>
//           <th>NAME</th>
//           <th>BRAND</th>
//           <th>PRICE</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product) => (
//           <tr key={product.code}>
//             <td>{product.code}</td>
//             <td>{product.name}</td>
//             <td>{product.brand}</td>
//             <td>{product.price}</td>
//             <td>
//               <div className="btn-group" role="group" aria-label="">
//                 <Link to={`/editProduct/${product.code}`} className="btn btn-warning">
//                   Edit
//                 </Link>
//                 <button type="button" className="btn btn-danger">
//                   Delete
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//       </div>
//       <div className="card-footer text-muted">
//         Footer
//       </div>
//     </div>

   
//   );
// };

// export default ProductsList;

// import React, { useState, useEffect } from 'react';

//CÓDIGO ANTES DE IMPORTAR DATA DE BASE DE DATOS SQL
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { data } from '../public/data/MOCK_DATA';

// const ProductsList = (props) => {
//   const [products, setProducts] = useState(data);

//   const handleDeleteProduct = (productCode) => {
//     const updatedProducts = products.filter((product) => product.code !== productCode);
//     setProducts(updatedProducts);
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <Link to={`/newProduct/`} className="btn btn-success">
//           Add New Product
//         </Link>
//       </div>
//       <div className="card-body">
//         <h4>Product List</h4>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>CODE</th>
//               <th>NAME</th>
//               <th>BRAND</th>
//               <th>PRICE</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.code}>
//                 <td>{product.code}</td>
//                 <td>{product.name}</td>
//                 <td>{product.brand}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <div className="btn-group" role="group" aria-label="">
//                     <Link to={`/editProduct/${product.code}`} className="btn btn-warning">
//                       Edit
//                     </Link>
//                     <button
//                       type="button"
//                       className="btn btn-danger"
//                       onClick={() => handleDeleteProduct(product.code)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;



//CÓDIGO QUE OBTIENE DATA DE API
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/products')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteProduct = (productCode) => {
//     fetch(`http://localhost:8080/products/${productCode}`, {
//       method: 'DELETE',
//     })
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.code !== productCode);
//         setProducts(updatedProducts);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header">Products</div>
//       <div className="card-body">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Code</th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.code}>
//                 <td>{product.code}</td>
//                 <td>{product.name}</td>
//                 <td>{product.brand}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <Link to={`/products/${product.code}`}>Edit</Link>
//                   <button onClick={() => handleDeleteProduct(product.code)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;

// //CAMBIÉ CODE POR ID Y AGREGUÉ CATEGORY
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ProductService } from '../services/ProductService' // Importa el servicio

// const productService = new ProductService(); // Crea una instancia del servicio

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);
// //Desde acá no va 
//   // useEffect(() => {
//   //   fetch('http://localhost:8080/products')
//   //     .then(response => response.json())
//   //     .then(data => setProducts(data))
//   //     .catch(error => console.error(error));
//   // }, []);

//   // const handleDeleteProduct = (productId) => {
//   //   fetch(`http://localhost:8080/products/${productId}`, {
//   //     method: 'DELETE',
//   //   })
//   //     .then(() => {
//   //       const updatedProducts = products.filter((product) => product.id !== productId);
//   //       setProducts(updatedProducts);
//   //     })
//   //     .catch(error => console.error(error));
//   // };

//   //hasta acá no va
//   useEffect(() => {
//     productService.getAllProducts() // Utiliza el método getAllProducts del servicio
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteProduct = (productId) => {
//     productService.deleteProduct(productId) // Utiliza el método deleteProduct del servicio
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== productId);
//         setProducts(updatedProducts);
//       })
//       .catch(error => console.error(error));
//   };
  
//   return (
//     <div className="card">
//       <div className="card-header">Products</div>
//       <div className="card-body">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.brand}</td>
//                 <td>{product.category}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   {/* <Link to={`/products/${product.id}`}>Edit</Link>
//                   <button onClick={() => handleDeleteProduct(product.id)}>Delete</button> */}
//                   <Link className="btn btn-primary" to={`/products/${product.id}`}>Edit</Link>
//                   <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;

// ProductsList.js

// ProductsList.js
// //sin botón new product
// import React, { useState, useEffect } from 'react';
// import { ProductService } from '../services/ProductService';
// import Product from './Product';

// const productService = new ProductService();

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     productService.getAllProducts()
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteProduct = (productId) => {
//     productService.deleteProduct(productId)
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== productId);
//         setProducts(updatedProducts);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header">Products</div>
//       <div className="card-body">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <Product key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;

// //CON BOTÓN NEW PRODUCT
// // ProductsList.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ProductService } from '../services/ProductService';
// import Product from './Product';

// const productService = new ProductService();

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     productService.getAllProducts()
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteProduct = (productId) => {
//     productService.deleteProduct(productId)
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== productId);
//         setProducts(updatedProducts);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header d-flex justify-content-between">
//         <h3>Products</h3>
//         <Link className="btn btn-success" to="/newProduct">New Product</Link>
//       </div>
//       <div className="card-body">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <Product key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ProductService } from '../services/ProductService';
// import Product from './Product';

// const productService = new ProductService();

// const ProductsList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchOption, setSearchOption] = useState('name');

//   useEffect(() => {
//     productService.getAllProducts()
//       .then(data => setProducts(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteProduct = (productId) => {
//     productService.deleteProduct(productId)
//       .then(() => {
//         const updatedProducts = products.filter((product) => product.id !== productId);
//         setProducts(updatedProducts);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header d-flex justify-content-between">
//         <h3>Products</h3>
//         <Link className="btn btn-success" to="/newProduct">New Product</Link>
//       </div>
//       <div className="card-body">
//         <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
//         <select value={searchOption} onChange={event => setSearchOption(event.target.value)}>
//           <option value="name">Name</option>
//           <option value="brand">Brand</option>
//           <option value="category">Category</option>
//           <option value="price">Price</option>
//         </select>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Brand</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.filter(product => product[searchOption].toString().includes(searchTerm)).map((product) => (
//               <Product key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="card-footer text-muted">Footer</div>
//     </div>
//   );
// };

// export default ProductsList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import Product from '../../product/Product';
import './ProductList.css';
const productService = new ProductService();

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productService.getAllProducts()
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  // const handleDeleteProduct = (productId) => {
  //   productService.deleteProduct(productId)
  //     .then(() => {
  //       const updatedProducts = products.filter((product) => product.id !== productId);
  //       setProducts(updatedProducts);
  //     })
  //     .catch(error => console.error(error));
  // };
  //con mensaje de confirmación
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.deleteProduct(productId)
        .then(() => {
          const updatedProducts = products.filter((product) => product.id !== productId);
          setProducts(updatedProducts);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Products</h3>
        <Link className="btn btn-success" to="/newProduct">New Product</Link>
      </div>
      <div className="card-body">
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => 
              Object.values(product).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            ).map((product) => (
              <Product key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default ProductsList;