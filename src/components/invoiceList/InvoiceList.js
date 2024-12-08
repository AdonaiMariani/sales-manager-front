// //CÓDIGO QUE IMPLEMENTA DATOS FICTICIOS

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Invoice from '../invoice/Invoice';
// import './InvoiceList.css';
// import mockInvoices from '../mockData/MockInvoices'; // Importamos mockInvoices

// const InvoiceList = () => {
//     const [invoices, setInvoices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         // Aquí usamos directamente mockInvoices en lugar de obtener datos del servicio
//         setInvoices(mockInvoices);
//     }, []);

//     const handleDeleteInvoice = (id) => {
//         // Implementa la lógica de eliminación si es necesaria para los datos ficticios
//         console.log(`Deleting invoice with id ${id}`);
//         // Puedes manejar la eliminación de manera simulada o simplemente no implementarla para datos ficticios
//         // Si deseas simular la eliminación, puedes actualizar el estado para reflejar que el elemento fue eliminado
//         const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
//         setInvoices(updatedInvoices);
//     };

//     return (
//         <div className="card">
//             <div className="card-header d-flex justify-content-between">
//                 <h3>Invoices</h3>
//                 <Link className="btn btn-success" to="/newInvoice">New Invoice</Link>
//             </div>
//             <div className="card-body">
//                 <input 
//                     type="text" 
//                     value={searchTerm} 
//                     onChange={event => setSearchTerm(event.target.value)} 
//                     placeholder="Search..." 
//                 />
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Date</th>
//                             <th>Customer</th>
//                             <th>Total</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {invoices.filter(invoice => 
//                             Object.values(invoice).some(value => 
//                                 value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//                             )
//                         ).map((invoice) => (
//                             <Invoice 
//                                 key={invoice.id} 
//                                 invoice={invoice} 
//                                 handleDeleteInvoice={handleDeleteInvoice} 
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default InvoiceList;


//CÓDIGO QUE SE CONECTA CON LA API
//CODIGO DESPUES DE IMPLEMENTAR INVOICEPRODUCTS

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InvoiceService } from '../../services/InvoiceService';
import Invoice from '../invoice/Invoice';
import './InvoiceList.css';

const invoiceService = new InvoiceService();

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        invoiceService.getAllInvoices()
            .then(data => setInvoices(data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteInvoice = (id) => {
        invoiceService.deleteInvoice(id)
            .then(() => invoiceService.getAllInvoices())
            .then(data => setInvoices(data))
            .catch(error => console.error(error));
    };

    const filteredInvoices = invoices.filter(invoice => {
        // Asegurarse de que los valores no sean null o undefined antes de usar toString()
        return Object.values(invoice).some(value => {
            if (value === null || value === undefined) {
                return false;
            }
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h3>Invoices</h3>
                <Link className="btn btn-success" to="/newInvoice">New Invoice</Link>
            </div>
            <div className="card-body">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={event => setSearchTerm(event.target.value)} 
                    placeholder="Search..." 
                />
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <Invoice 
                                key={invoice.id} 
                                invoice={invoice} 
                                handleDeleteInvoice={handleDeleteInvoice} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceList;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { InvoiceService } from '../../services/InvoiceService';
// import Invoice from '../invoice/Invoice';
// import './InvoiceList.css';
// const invoiceService = new InvoiceService();

// const InvoiceList = () => {
//     const [invoices, setInvoices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         invoiceService.getAllInvoices()
//             .then(data => setInvoices(data))
//             .catch(error => console.error(error));
//     }, []);

//     const handleDeleteInvoice = (id) => {
//         invoiceService.deleteInvoice(id)
//             .then(() => {
//                 return invoiceService.getAllInvoices();
//             })
//             .then(data => setInvoices(data))
//             .catch(error => console.error(error));
//     };

//     return (
//         <div className="card">
//             <div className="card-header d-flex justify-content-between">
//                 <h3>Invoices</h3>
//                 <Link className="btn btn-success" to="/newInvoice">New Invoice</Link>
//             </div>
//             <div className="card-body">
//                 <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Date</th>
//                             <th>Customer</th>
//                             <th>Total</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {invoices.filter(invoice => 
//                             Object.values(invoice).some(value => 
//                                 value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//                             )
//                         ).map((invoice) => (
//                             <Invoice key={invoice.id} invoice={invoice} handleDeleteInvoice={handleDeleteInvoice} />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default InvoiceList;





// //CODIGO ANTES DE IMPLEMENTAR INVOICEPRODUCTS
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { InvoiceService } from '../../services/InvoiceService';
// import Invoice from '../invoice/Invoice';
// import './InvoiceList.css';
// const invoiceService = new InvoiceService();

// const InvoiceList = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     invoiceService.getAllInvoices()
//       .then(data => setInvoices(data))
//       .catch(error => console.error(error));
//   }, []);

//   const handleDeleteInvoice = (id) => {
//     // Aquí va tu lógica para eliminar la factura
//     // Por ejemplo, podrías llamar a un método en invoiceService para eliminar la factura
//     invoiceService.deleteInvoice(id)
//       .then(() => {
//         // Después de eliminar la factura, podrías querer actualizar la lista de facturas
//         return invoiceService.getAllInvoices();
//       })
//       .then(data => setInvoices(data))
//       .catch(error => console.error(error));
//   };

//   return (
//     <div className="card">
//       <div className="card-header d-flex justify-content-between">
//         <h3>Invoices</h3>
//         <Link className="btn btn-success" to="/newInvoice">New Invoice</Link>
//       </div>
//       <div className="card-body">
//         <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
//         <table className="table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Date</th>
//               <th>Customer</th>
//               <th>Total</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.filter(invoice => 
//               Object.values(invoice).some(value => 
//                 value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//               )
//             ).map((invoice) => (
//               <Invoice key={invoice.id} invoice={invoice} handleDeleteInvoice={handleDeleteInvoice} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;
