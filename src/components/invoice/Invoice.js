
import React from "react";
import { Link } from "react-router-dom";
import "./Invoice.css";

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
        <Link className="btn btn-primary" to={`/invoices/${invoice.id}`}>
          Edit
        </Link>
        <Link
          className="btn btn-secondary"
          to={`/invoices/print/${invoice.id}`}
        >
          Print View
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteInvoice(invoice.id)}
        >
          Delete
        </button>
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
>>>>>>> 8d6ccc71e6fcf892547dc85c7b7075f8d7abde62
