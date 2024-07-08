
import React, { useState, useEffect } from "react";
import "./NewInvoice.css";
const NewInvoice = ({ customers, products, onCreate }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [date, setDate] = useState(formattedDate);
  const [customer, setCustomer] = useState(
    customers && customers.length > 0 ? customers[0].id : ""
  );
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      setCustomer(customers[0].id);
    }
  }, [customers]);

  const handleProductSearch = (e) => {
    const searchTerm = e.target.value;
    setProductSearch(searchTerm);

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleProductSelect = (product) => {
    setProductSearch(product.name);
    setQuantity(1);
    setSearchResults([]);
  };

  const handleAddProduct = () => {
    console.log("Product Search: ", productSearch); // Log the product search term
    console.log("Products: ", products); // Log the products array
    const productToAdd = products.find(
      (product) => product.name.toLowerCase() === productSearch.toLowerCase()
    );
    console.log("Product to Add: ", productToAdd); // Log the product to add
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, { ...productToAdd, quantity }]);
      setProductSearch("");
      setQuantity(1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Crear objeto invoiceData con la estructura correcta
    const invoiceData = {
      date,
      customerId: customer, // Usar customerId en lugar de customer
      invoiceProducts: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    // Enviar invoiceData a la función onCreate
    onCreate(invoiceData);
  };

  const handleRemoveProduct = (index) => {
    const newCart = cart.filter((product, i) => i !== index);
    setCart(newCart);
  };
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="form-container"> 
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Customer:
          <select value={customer} onChange={e => setCustomer(e.target.value)}>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </label>
        <label>
          Product:
          <input type="text" value={productSearch} onChange={handleProductSearch} />
          {searchResults.map(product => (
            <div key={product.id} onClick={() => handleProductSelect(product)}>
              {product.name}
            </div>
          ))}
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <button type="button" onClick={handleAddProduct}>Add Product</button>
        </label>
       {cart.length > 0 && (
    <table>
      <thead>
        <tr>
          <th className="columna-producto">Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total por Producto</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${(product.price * product.quantity).toFixed(2)}</td>
            <td>
              <button onClick={() => handleRemoveProduct(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
        
        <div className="total-price">TOTAL: {total}</div>
        <input type="submit" value="Create Invoice" />
      </form>
   </div> 
    );
  };
  
  export default NewInvoice;

// //CÓDIGO ANTES MODIFICACIÓN FRANCO
// import React, { useState, useEffect } from 'react';
// import './NewInvoice.css';
// import { useNavigate } from 'react-router-dom';
// const NewInvoice = ({ customers, products, onCreate }) => {
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
//   const navigate = useNavigate();
//   const [date, setDate] = useState(formattedDate);
//   const [customer, setCustomer] = useState(customers.length > 0 ? customers[0].id : "");
//   const [productSearch, setProductSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (customers.length > 0) {
//       setCustomer(customers[0].id);
//     }
//   }, [customers]);

//   const handleProductSearch = e => {
//     const searchTerm = e.target.value;
//     setProductSearch(searchTerm);

//     const results = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const handleProductSelect = product => {
//     setProductSearch(product.name);
//     setQuantity(1);
//     setSearchResults([]);
//   };

//   const handleAddProduct = () => {
//     const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
//     if (productToAdd) {
//       setCart(prevCart => [...prevCart, { ...productToAdd, quantity }]);
//       setProductSearch("");
//       setQuantity(1);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const invoiceProducts = cart.map(item => ({
//       id: item.id,
//       quantity: item.quantity,
//       price: item.price
//     }));
//     console.log('Invoice Products to Send:', invoiceProducts);
//     onCreate({ date, customer, products: invoiceProducts })
//     .then(() => {
//         alert('Invoice created successfully'); // Muestra un mensaje de éxito
//         navigate('/invoices'); // Navega a la lista de facturas
//       })
//       .catch(error => console.error(error));
//   };

//   const handleRemoveProduct = index => {
//     const newCart = cart.filter((product, i) => i !== index);
//     setCart(newCart);
//   };

//   const total_price = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//   <div className="form-container"> 
//     <form onSubmit={handleSubmit}>
//       <label>
//         Date:
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//       </label>
//       <label>
//         Customer:
//         <select value={customer} onChange={e => setCustomer(e.target.value)}>
//           {customers.map(customer => (
//             <option key={customer.id} value={customer.id}>{customer.name}</option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Product:
//         <input type="text" value={productSearch} onChange={handleProductSearch} />
//         {searchResults.map(product => (
//           <div key={product.id} onClick={() => handleProductSelect(product)}>
//             {product.name}
//           </div>
//         ))}
//         <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
//         <button type="button" onClick={handleAddProduct}>Add Product</button>
//       </label>
//       {/* {cart.map((product, index) => (
//         <div key={index}>
//           <span>{product.name}</span>
//           <span>{product.quantity}</span>
//           <span>{product.price}</span>
//           <span>{product.price * product.quantity}</span>
//           <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//         </div>
//       ))} */}
//       {cart.length > 0 && (
//   <table>
//     <thead>
//       <tr>
//         <th className="columna-producto">Producto</th>
//         <th>Cantidad</th>
//         <th>Precio Unitario</th>
//         <th>Total por Producto</th>
//         <th>Acción</th>
//       </tr>
//     </thead>
//     <tbody>
//       {cart.map((product, index) => (
//         <tr key={index}>
//           <td>{product.name}</td>
//           <td>{product.quantity}</td>
//           <td>${product.price.toFixed(2)}</td>
//           <td>${(product.price * product.quantity).toFixed(2)}</td>
//           <td>
//             <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// )}
      
//       <div className="total-price">TOTAL: {total_price}</div>
//       <input type="submit" value="Create Invoice" />
//     </form>
//  </div> 
//   );
// };

// export default NewInvoice;







// //CODIGO ANTES DE IMPLEMENTAR INVOICEPRODUCTS
// import React, { useState, useEffect } from 'react';
// import './NewInvoice.css';
// const NewInvoice = ({ customers, products, onCreate }) => {
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

//     const [date, setDate] = useState(formattedDate);
//     const [customer, setCustomer] = useState(customers && customers.length > 0 ? customers[0].id : "");
//     const [productSearch, setProductSearch] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [quantity, setQuantity] = useState(1);
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         if (customers && customers.length > 0) {
//             setCustomer(customers[0].id);
//         }
//     }, [customers]);

//     const handleProductSearch = e => {
//         const searchTerm = e.target.value;
//         setProductSearch(searchTerm);
    
//         const results = products.filter(product =>
//             product.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setSearchResults(results);
//     };
    
//     const handleProductSelect = product => {
//         setProductSearch(product.name);
//         setQuantity(1);
//         setSearchResults([]);
//     };

//     const handleAddProduct = () => {
//         console.log("Product Search: ", productSearch); // Log the product search term
//         console.log("Products: ", products); // Log the products array
//         const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
//         console.log("Product to Add: ", productToAdd); // Log the product to add
//         if (productToAdd) {
//             setCart(prevCart => [...prevCart, { ...productToAdd, quantity }]);
//             setProductSearch("");
//             setQuantity(1);
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onCreate({ date, customer, products: cart });
//     };

//     const handleRemoveProduct = index => {
//         const newCart = cart.filter((product, i) => i !== index);
//         setCart(newCart);
//     };
//     const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);


// return (
//     <form onSubmit={handleSubmit}>
//         <label>
//             Date:
//             <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//         </label>
//         <label>
//             Customer:
//             <select value={customer} onChange={e => setCustomer(e.target.value)}>
//                 {customers && customers.map(customer => (
//                     <option key={customer.id} value={customer.id}>{customer.name}</option>
//                 ))}
//             </select>
//         </label>
//         <label>
//             Product:
//             <input type="text" value={productSearch} onChange={handleProductSearch} />
//             {searchResults.map(product => (
//                 <div key={product.id} onClick={() => handleProductSelect(product)}>
//                     {product.name}
//                 </div>
//             ))}
//             <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
//             <button type="button" onClick={handleAddProduct}>Add Product</button>
//         </label>
//         {cart.map((product, index) => (
//             <div key={index}>
//                 <span>{product.name}</span>
//                 <span>{product.quantity}</span>
//                 <span>{product.price}</span>
//                 <span>{product.price * product.quantity}</span>
//                 <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//             </div>
//         ))}
//         <div>Total: {total}</div>
//         <input type="submit" value="Create Invoice" />
//     </form>
// );}

// export default NewInvoice;

// //CODIGO DESPUES DE IMPLEMENTAR INVOICEPRODUCTS
// // import React, { useState, useEffect } from 'react';
// // import './NewInvoice.css';
// // const NewInvoice = ({ customers, products, onCreate }) => {
// //     const currentDate = new Date();
// //     const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

// //     const [date, setDate] = useState(formattedDate);
// //     const [customer, setCustomer] = useState(customers && customers.length > 0 ? customers[0].id : "");
// //     const [productSearch, setProductSearch] = useState("");
// //     const [searchResults, setSearchResults] = useState([]);
// //     const [quantity, setQuantity] = useState(1);
// //     const [cart, setCart] = useState([]);

// //     useEffect(() => {
// //         if (customers && customers.length > 0) {
// //             setCustomer(customers[0].id);
// //         }
// //     }, [customers]);

// //     const handleProductSearch = e => {
// //         const searchTerm = e.target.value;
// //         setProductSearch(searchTerm);
    
// //         const results = products.filter(product =>
// //             product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //         setSearchResults(results);
// //     };
    
// //     const handleProductSelect = product => {
// //         setProductSearch(product.name);
// //         setQuantity(1);
// //         setSearchResults([]);
// //     };

// //     const handleAddProduct = () => {
// //         const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
// //         if (productToAdd) {
// //             setCart(prevCart => [...prevCart, { product: productToAdd, quantity }]);
// //             setProductSearch("");
// //             setQuantity(1);
// //         }
// //     };

// //     const handleSubmit = (event) => {
// //         event.preventDefault();
// //         onCreate({ date, customer, invoiceProducts: cart });
// //     };

// //     const handleRemoveProduct = index => {
// //         const newCart = cart.filter((product, i) => i !== index);
// //         setCart(newCart);
// //     };
// //     const total = cart.reduce((sum, product) => sum + product.product.price * product.quantity, 0);

// //     return (
// //         <form onSubmit={handleSubmit}>
// //             <label>
// //                 Date:
// //                 <input type="date" value={date} onChange={e => setDate(e.target.value)} />
// //             </label>
// //             <label>
// //                 Customer:
// //                 <select value={customer} onChange={e => setCustomer(e.target.value)}>
// //                     {customers && customers.map(customer => (
// //                         <option key={customer.id} value={customer.id}>{customer.name}</option>
// //                     ))}
// //                 </select>
// //             </label>
// //             <label>
// //                 Product:
// //                 <input type="text" value={productSearch} onChange={handleProductSearch} />
// //                 {searchResults.map(product => (
// //                     <div key={product.id} onClick={() => handleProductSelect(product)}>
// //                         {product.name}
// //                     </div>
// //                 ))}
// //                 <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
// //                 <button type="button" onClick={handleAddProduct}>Add Product</button>
// //             </label>
// //             {cart.map((product, index) => (
// //                 <div key={index}>
// //                     <span>{product.product.name}</span>
// //                     <span>{product.quantity}</span>
// //                     <span>{product.product.price}</span>
// //                     <span>{product.product.price * product.quantity}</span>
// //                     <button onClick={() => handleRemoveProduct(index)}>Remove</button>
// //                 </div>
// //             ))}
// //             <div>Total: {total}</div>
// //             <input type="submit" value="Create Invoice" />
// //         </form>
// //     );
// // };

// // export default NewInvoice;

// // import React, { useState, useEffect } from 'react';
// // import './NewInvoice.css';

// // const NewInvoice = ({ customers, products, onCreate }) => {
// //     const currentDate = new Date();
// //     const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

// //     const [date, setDate] = useState(formattedDate);
// //     const [customer, setCustomer] = useState(customers && customers.length > 0 ? customers[0].id : "");
// //     const [productSearch, setProductSearch] = useState("");
// //     const [searchResults, setSearchResults] = useState([]);
// //     const [quantity, setQuantity] = useState(1);
// //     const [cart, setCart] = useState([]);

// //     useEffect(() => {
// //         if (customers && customers.length > 0) {
// //             setCustomer(customers[0].id);
// //         }
// //     }, [customers]);

// //     const handleProductSearch = e => {
// //         const searchTerm = e.target.value;
// //         setProductSearch(searchTerm);

// //         const results = products.filter(product =>
// //             product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //         setSearchResults(results);
// //     };

// //     const handleProductSelect = product => {
// //         setProductSearch(product.name);
// //         setQuantity(1);
// //         setSearchResults([]);
// //     };

// //     const handleAddProduct = () => {
// //         const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
// //         if (productToAdd) {
// //             setCart(prevCart => [...prevCart, { ...productToAdd, quantity }]);
// //             setProductSearch("");
// //             setQuantity(1);
// //         }
// //     };

// //     const handleSubmit = (event) => {
// //         event.preventDefault();
// //         const invoiceProducts = cart.map(item => ({
// //             product: item.id,
// //             quantity: item.quantity,
// //             price: item.price
// //         }));
// //         onCreate({ date, customer, invoiceProducts });
// //     };

// //     const handleRemoveProduct = index => {
// //         const newCart = cart.filter((product, i) => i !== index);
// //         setCart(newCart);
// //     };

// //     const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

// //     return (
// //         <form onSubmit={handleSubmit}>
// //             <label>
// //                 Date:
// //                 <input type="date" value={date} onChange={e => setDate(e.target.value)} />
// //             </label>
// //             <label>
// //                 Customer:
// //                 <select value={customer} onChange={e => setCustomer(e.target.value)}>
// //                     {customers && customers.map(customer => (
// //                         <option key={customer.id} value={customer.id}>{customer.name}</option>
// //                     ))}
// //                 </select>
// //             </label>
// //             <label>
// //                 Product:
// //                 <input type="text" value={productSearch} onChange={handleProductSearch} />
// //                 {searchResults.map(product => (
// //                     <div key={product.id} onClick={() => handleProductSelect(product)}>
// //                         {product.name}
// //                     </div>
// //                 ))}
// //                 <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
// //                 <button type="button" onClick={handleAddProduct}>Add Product</button>
// //             </label>
// //             {cart.map((product, index) => (
// //                 <div key={index}>
// //                     <span>{product.name}</span>
// //                     <span>{product.quantity}</span>
// //                     <span>{product.price}</span>
// //                     <span>{product.price * product.quantity}</span>
// //                     <button onClick={() => handleRemoveProduct(index)}>Remove</button>
// //                 </div>
// //             ))}
// //             <div>Total: {total}</div>
// //             <input type="submit" value="Create Invoice" />
// //         </form>
// //     );
// // };

// // export default NewInvoice;