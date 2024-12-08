import React, { useState, useEffect } from "react";
import "./NewInvoice.css";

const NewInvoice = ({ onCreate }) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [date, setDate] = useState(formattedDate);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch customers and products on component load
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("http://localhost:8080/customers"); // Cambia por la URL real
      const data = await response.json();
      setCustomers(data);
      if (data.length > 0) setCustomer(data[0].id);
    };

    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8080/products"); // Cambia por la URL real
      const data = await response.json();
      setProducts(data);
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (customers.length > 0) {
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
    const productToAdd = products.find(
      (product) => product.name.toLowerCase() === productSearch.toLowerCase()
    );
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, { ...productToAdd, quantity }]);
      setProductSearch("");
      setQuantity(1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const invoiceData = {
      date,
      customerId: customer,
      invoiceProducts: cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    onCreate(invoiceData);
  };

  const handleRemoveProduct = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
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
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Customer:
          <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product:
          <input type="text" value={productSearch} onChange={handleProductSearch} />
          {searchResults.map((product) => (
            <div key={product.id} onClick={() => handleProductSelect(product)}>
              {product.name}
            </div>
          ))}
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </label>
        {cart.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
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
        <div>Total: ${total.toFixed(2)}</div>
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default NewInvoice;


// import React, { useState, useEffect } from "react";
// import "./NewInvoice.css";
// const NewInvoice = ({ customers, products, onCreate }) => {
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getFullYear()}-${String(
//     currentDate.getMonth() + 1
//   ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

//   const [date, setDate] = useState(formattedDate);
//   const [customer, setCustomer] = useState(
//     customers && customers.length > 0 ? customers[0].id : ""
//   );
//   const [productSearch, setProductSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     if (customers && customers.length > 0) {
//       setCustomer(customers[0].id);
//     }
//   }, [customers]);

//   const handleProductSearch = (e) => {
//     const searchTerm = e.target.value;
//     setProductSearch(searchTerm);

//     const results = products.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchResults(results);
//   };

//   const handleProductSelect = (product) => {
//     setProductSearch(product.name);
//     setQuantity(1);
//     setSearchResults([]);
//   };

//   const handleAddProduct = () => {
//     console.log("Product Search: ", productSearch); // Log the product search term
//     console.log("Products: ", products); // Log the products array
//     const productToAdd = products.find(
//       (product) => product.name.toLowerCase() === productSearch.toLowerCase()
//     );
//     console.log("Product to Add: ", productToAdd); // Log the product to add
//     if (productToAdd) {
//       setCart((prevCart) => [...prevCart, { ...productToAdd, quantity }]);
//       setProductSearch("");
//       setQuantity(1);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//     // Crear objeto invoiceData con la estructura correcta
//     const invoiceData = {
//       date,
//       customerId: customer, // Usar customerId en lugar de customer
//       invoiceProducts: cart.map((product) => ({
//         productId: product.id,
//         quantity: product.quantity,
//         price: product.price,
//       })),
//     };

//     // Enviar invoiceData a la función onCreate
//     onCreate(invoiceData);
//   };

//   const handleRemoveProduct = (index) => {
//     const newCart = cart.filter((product, i) => i !== index);
//     setCart(newCart);
//   };
//   const total = cart.reduce(
//     (sum, product) => sum + product.price * product.quantity,
//     0
//   );

//   return (
//     <div className="form-container"> 
//       <div className="form-container"> 
//       <form onSubmit={handleSubmit}>
//         <label>
//           Date:
//           <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//         </label>
//         <label>
//           Customer:
//           <select value={customer} onChange={e => setCustomer(e.target.value)}>
//             {customers.map(customer => (
//               <option key={customer.id} value={customer.id}>{customer.name}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Product:
//           <input type="text" value={productSearch} onChange={handleProductSearch} />
//           {searchResults.map(product => (
//             <div key={product.id} onClick={() => handleProductSelect(product)}>
//               {product.name}
//             </div>
//           ))}
//           <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
//           <button type="button" onClick={handleAddProduct}>Add Product</button>
//         </label>
//        {cart.length > 0 && (
//     <table>
//       <thead>
//         <tr>
//           <th className="columna-producto">Producto</th>
//           <th>Cantidad</th>
//           <th>Precio Unitario</th>
//           <th>Total por Producto</th>
//           <th>Acción</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cart.map((product, index) => (
//           <tr key={index}>
//             <td>{product.name}</td>
//             <td>{product.quantity}</td>
//             <td>${product.price.toFixed(2)}</td>
//             <td>${(product.price * product.quantity).toFixed(2)}</td>
//             <td>
//               <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )}
        
//         <div className="total-price">TOTAL: {total}</div>
//         <input type="submit" value="Create Invoice" />
//       </form>
//   </div> 
//   </div>
//     );
//   };
  
//   export default NewInvoice;

