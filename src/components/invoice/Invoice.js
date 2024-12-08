
// //CÓDIGO QUE TRABAJA CON MOCKINVOICES
// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import './Invoice.css';

// import mockInvoices from '../mockData/MockInvoices';

// const Invoice = ({ handleDeleteInvoice }) => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     // Instead of making a network request, use mock data
//     setInvoices(mockInvoices);
//   }, []);

//   return (
//     <>
//       {invoices.map((invoice) => (
//         <tr key={invoice.id}>
//           <td>
//             <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
//           </td>
//           <td>{new Date(invoice.date).toLocaleDateString()}</td>
//           {/* <td>{invoice.customerId}</td> */}
//           <td>{invoice.customerName}</td> {/* Modificado para mostrar el nombre del cliente */}
//           {/* <td>{new Date(invoice.date).toLocaleDateString()}</td> */}
//           <td>${invoice.totalPrice}</td>
//           <td className="button-container">
//             <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
//             <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
//             <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// };

// export default Invoice;

// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import './Invoice.css';

// import mockInvoices from '../mockData/MockInvoices';

// const Invoice = () => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     // En lugar de hacer una solicitud de red, usa los datos ficticios
//     setInvoices(mockInvoices);
//   }, []);

//   const handleDeleteInvoice = (id) => {
//     // Implementa la lógica para eliminar la factura aquí
//     console.log(`Deleting invoice with ID: ${id}`);
//   };

//   return (
//     <div className="invoices-container">
//       <h1>Invoices</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Customer ID</th>
//             <th>Date</th>
//             <th>Total Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.id}>
//               <td>
//                 <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
//               </td>
//               <td>{invoice.customerId}</td>
//               <td>{new Date(invoice.date).toLocaleDateString()}</td>
//               <td>${invoice.totalPrice}</td>
//               <td className="button-container">
//                 <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
//                 <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
//                 <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Invoice;

// import React, { useState, useEffect } from "react";
// import './Invoice.css';

// import mockInvoices from '../mockData/MockInvoices';
// const Invoices = () => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     // En lugar de hacer una solicitud de red, usa los datos ficticios
//     setInvoices(mockInvoices);
//   }, []);

//   return (
//     <div className="invoices-container">
//       <h1>Invoices</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Customer ID</th>
//             <th>Date</th>
//             <th>Total Price</th>
//             <th>Products</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.id}>
//               <td>{invoice.id}</td>
//               <td>{invoice.customerId}</td>
//               <td>{new Date(invoice.date).toLocaleDateString()}</td>
//               <td>${invoice.totalPrice}</td>
//               <td>
//                 <ul>
//                   {invoice.invoiceProducts.map((product) => (
//                     <li key={product.productId}>
//                       Product ID: {product.productId}, Quantity: {product.quantity}, Price: ${product.price}
//                     </li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Invoices;

//CÓDIGO QU SE CONECTA CON LA API
import React from 'react';
import { Link } from 'react-router-dom';
import './Invoice.css';

const Invoice = ({ invoice, handleDeleteInvoice }) => {
  // Verifica si el objeto invoice y sus propiedades son nulos o indefinidos
  if (!invoice) {
    return null; // O muestra un mensaje de carga
  }

  return (
    <tr>
      <td>
        <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
      </td>
      <td>{invoice.date}</td>
      <td>{invoice.customerId}</td> {/* Aquí usaremos customerId directamente */}
      <td>{invoice.totalPrice}</td> {/* Corrige a totalPrice */}
      <td className="button-container">
        <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
        <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
        <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Invoice;






























// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Invoice.css';

// const Invoice = ({ invoice, handleDeleteInvoice }) => {
//   // Verifica si el objeto invoice y sus propiedades son nulos o indefinidos
//   if (!invoice) {
//     return null; // O muestra un mensaje de carga
//   }

//   return (
//     <tr>
//       <td>
//         <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
//       </td>
//       <td>{invoice.date}</td>
//       <td>{invoice.customerId}</td> {/* Aquí usaremos customerId directamente */}
//       <td>{invoice.totalPrice}</td> {/* Corrige a totalPrice */}
//       <td className="button-container">
//         <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
//         <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
//         <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
//       </td>
//     </tr>
//   );
// };

// export default Invoice;
// // CÓDIGO ANTES MODIFICACIÓN FRANCO
// //CODIGO DESPUES DE IMPLEMENTAR INVOICEPRODUCTS

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Invoice.css';

// const Invoice = ({ invoice, handleDeleteInvoice }) => {
//     const total = invoice.invoiceProducts.reduce((sum, product) => sum + product.product.price * product.quantity, 0);

//     return (
//         <tr>
//             <td>
//                 <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
//             </td>
//             <td>{invoice.date}</td>
//             <td>{invoice.customer.name}</td>
//             <td>${total}</td>
//             <td className="button-container">
//                 <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
//                 <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
//                 <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
//             </td>
//         </tr>
//     );
// };

// export default Invoice;






// //CODIGO ANTES DE IMPLEMENTAR INVOICEPRODUCTS
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Invoice.css';

// const Invoice = ({ invoice, handleDeleteInvoice }) => {
//   return (
//     <tr>
//       <td>
//         <Link to={`/invoices/${invoice.id}`}>{invoice.id}</Link>
//       </td>
//       <td>{invoice.id}</td>
//       <td>{invoice.date}</td>
//       <td>{invoice.customer.name}</td>
//       <td>{invoice.total}</td>
//       <td className="button-container">
//         <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>Edit</Link>
//         <Link className="btn btn-secondary" to={`/invoices/print/${invoice.id}`}>Print View</Link>
//         <button className="btn btn-danger" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
//       </td>
//     </tr>
//   );
// };

// export default Invoice;