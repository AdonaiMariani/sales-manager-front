//CÓDIGO QUE SE CONECTA CON LA API
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceService } from '../../services/InvoiceService';
import './InvoicePrint.css';

const InvoicePrint = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({ invoiceProducts: [] }); // Inicialización con estructura por defecto

    useEffect(() => {
        const invoiceService = new InvoiceService();
        invoiceService.getInvoiceById(id)
            .then(data => {
                console.log("Datos recibidos del backend:", data);
                setInvoice(data);
            })
            .catch(error => console.error("Error al obtener la factura:", error));
    }, [id]);

    // Mostrar un mensaje de carga si los datos no están disponibles
    if (!invoice || !invoice.customerId) {
        return <div>Loading...</div>;
    }

    // Calcular el total
    const total = invoice.invoiceProducts.reduce(
        (sum, product) => sum + (product.price || 0) * (product.quantity || 0),
        0
    );

    return (
        <div className="invoice-print-container">
            <header>
                <div className="invoice-header">
                    <img src="/path/to/logo.png" alt="Logo" />
                    <div>Información del emisor</div>
                </div>
                <div className="invoice-customer">
                    <h2>Factura para:</h2>
                    <p>Cliente ID: {invoice.customerId}</p>
                </div>
            </header>

            <table className="invoice-details">
                <thead>
                    <tr>
                        <th>Producto ID</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.invoiceProducts.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId || 'Sin ID'}</td>
                            <td>{product.quantity || 0}</td>
                            <td>${product.price || 0}</td>
                            <td>${(product.price || 0) * (product.quantity || 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="invoice-total">
                <strong>Total: ${total}</strong>
            </div>

            <button onClick={() => window.print()}>Imprimir Factura</button>
        </div>
    );
};

export default InvoicePrint;

// //CÓDIGO QUE SE CONECTA CON LA API
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { InvoiceService } from '../../services/InvoiceService';
// import './InvoicePrint.css';

// const InvoicePrint = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState({ invoiceProducts: [] }); // Initialize with default structure

//     useEffect(() => {
//         const invoiceService = new InvoiceService();
//         invoiceService.getInvoiceById(id)
//             .then(data => {
//                 console.log(data); // Imprimir la respuesta para depurar
//                 setInvoice(data);
//             })
//             .catch(error => console.error(error));
//     }, [id]);

//     if (!invoice || !invoice.customer) { // Check for invoice and customer existence
//         return <div>Loading...</div>;
//     }

//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.product.price * product.quantity, 0);

//     return (
//         <div className="invoice-print-container">
//             <header>
//                 <div className="invoice-header">
//                     <img src="/path/to/logo.png" alt="Logo" />
//                     <div>Información del emisor</div>
//                 </div>
//                 <div className="invoice-customer">
//                     <h2>Factura para:</h2>
//                     <p>{invoice.customer.name}</p>
//                 </div>
//             </header>
            
//             <table className="invoice-details">
//                 <thead>
//                     <tr>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Precio Unitario</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
//                         <tr key={product.id}>
//                             <td>{product.product.name}</td>
//                             <td>{product.quantity}</td>
//                             <td>${product.product.price}</td>
//                             <td>${product.product.price * product.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             <div className="invoice-total">
//                 Total: ${total}
//             </div>
            
//             <button onClick={() => window.print()}>Imprimir Factura</button>
//         </div>
//     );
// };

// export default InvoicePrint;



// //CÓDIGO QUE UTILIZA MOCKDATA
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './InvoicePrint.css';

// import mockInvoices from '../mockData/MockInvoices'; // Importa los datos mock

// const InvoicePrint = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null); // Inicializa con null
//     const [loading, setLoading] = useState(true); // Estado para manejar la carga

//     useEffect(() => {
//         // Simula una solicitud de datos
//         const fetchInvoiceById = () => {
//             // Encuentra la factura correspondiente en los datos mock
//             const foundInvoice = mockInvoices.find(inv => inv.id === parseInt(id));
//             if (foundInvoice) {
//                 setInvoice(foundInvoice);
//                 setLoading(false); // Actualiza el estado de carga
//             } else {
//                 setLoading(false); // Manejo de caso donde no se encuentra la factura
//             }
//         };

//         fetchInvoiceById(); // Llama a la función para simular la carga de datos

//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
//     }

//     if (!invoice) {
//         return <div>No invoice found.</div>; // Maneja el caso cuando no se encuentra la factura
//     }

//     // Calcula el total basado en los productos de la factura
//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//     return (
//         <div className="invoice-print-container">
//             <header>
//                 <div className="invoice-header">
//                     <img src="/path/to/logo.png" alt="Logo" />
//                     <div>Información del emisor</div>
//                 </div>
//                 <div className="invoice-customer">
//                     <h2>Customer:</h2>
//                     <p>{invoice.customerName}</p>
//                 </div>
//             </header>
            
//             <table className="invoice-details">
//                 <thead>
//                     <tr>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Precio Unitario</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
//                         <tr key={product.productId}>
//                             <td>{product.productName}</td>
//                             <td>{product.quantity}</td>
//                             <td>${product.price}</td>
//                             <td>${product.price * product.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             <div className="invoice-total">
//                 Total: ${total}
//             </div>
            
//             <button onClick={() => window.print()}>Imprimir Factura</button>
//         </div>
//     );
// };

// export default InvoicePrint;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './InvoicePrint.css';

// import mockInvoices from '../mockData/MockInvoices'; // Importa los datos mock

// const InvoicePrint = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null); // Inicializa con null
//     const [loading, setLoading] = useState(true); // Estado para manejar la carga

//     useEffect(() => {
//         // Simula una solicitud de datos
//         const fetchInvoiceById = () => {
//             // Encuentra la factura correspondiente en los datos mock
//             const foundInvoice = mockInvoices.find(inv => inv.id === parseInt(id));
//             if (foundInvoice) {
//                 setInvoice(foundInvoice);
//                 setLoading(false); // Actualiza el estado de carga
//             } else {
//                 setLoading(false); // Manejo de caso donde no se encuentra la factura
//             }
//         };

//         fetchInvoiceById(); // Llama a la función para simular la carga de datos

//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
//     }

//     if (!invoice) {
//         return <div>No invoice found.</div>; // Maneja el caso cuando no se encuentra la factura
//     }

//     // Calcula el total basado en los productos de la factura
//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//     return (
//         <div className="invoice-print-container">
//             <header>
//                 <div className="invoice-header">
//                     <img src="/path/to/logo.png" alt="Logo" />
//                     <div>Información del emisor</div>
//                 </div>
//                 <div className="invoice-customer">
//                     <h2>Factura para:</h2>
//                     <p>Customer ID: {invoice.customerId}</p>
//                     {/* Aquí puedes mostrar más detalles del cliente si están disponibles en tu aplicación */}
//                 </div>
//             </header>
            
//             <table className="invoice-details">
//                 <thead>
//                     <tr>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Precio Unitario</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
//                         <tr key={product.productId}>
//                             <td>{`Product ID: ${product.productId}`}</td>
//                             <td>{product.quantity}</td>
//                             <td>${product.price}</td>
//                             <td>${product.price * product.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             <div className="invoice-total">
//                 Total: ${total}
//             </div>
            
//             <button onClick={() => window.print()}>Imprimir Factura</button>
//         </div>
//     );
// };

// export default InvoicePrint;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './InvoicePrint.css';

// import mockInvoices from '../mockData/MockInvoices'; // Importa los datos mock

// const InvoicePrint = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null); // Inicializa con null
//     const [loading, setLoading] = useState(true); // Estado para manejar la carga

//     useEffect(() => {
//         // Simula una solicitud de datos
//         const fetchInvoiceById = () => {
//             // Encuentra la factura correspondiente en los datos mock
//             const foundInvoice = mockInvoices.find(inv => inv.id === parseInt(id));
//             if (foundInvoice) {
//                 setInvoice(foundInvoice);
//                 setLoading(false); // Actualiza el estado de carga
//             } else {
//                 setLoading(false); // Manejo de caso donde no se encuentra la factura
//             }
//         };

//         fetchInvoiceById(); // Llama a la función para simular la carga de datos

//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
//     }

//     if (!invoice || !invoice.customer) {
//         return <div>No invoice found or missing customer data.</div>; // Maneja el caso cuando no se encuentra la factura o falta datos del cliente
//     }

//     // Calcula el total basado en los productos de la factura
//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//     return (
//         <div className="invoice-print-container">
//             <header>
//                 <div className="invoice-header">
//                     <img src="/path/to/logo.png" alt="Logo" />
//                     <div>Información del emisor</div>
//                 </div>
//                 <div className="invoice-customer">
//                     <h2>Factura para:</h2>
//                     <p>{invoice.customer.name}</p>
//                 </div>
//             </header>
            
//             <table className="invoice-details">
//                 <thead>
//                     <tr>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Precio Unitario</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
//                         <tr key={product.productId}>
//                             <td>{`Product ID: ${product.productId}`}</td>
//                             <td>{product.quantity}</td>
//                             <td>${product.price}</td>
//                             <td>${product.price * product.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             <div className="invoice-total">
//                 Total: ${total}
//             </div>
            
//             <button onClick={() => window.print()}>Imprimir Factura</button>
//         </div>
//     );
// };

// export default InvoicePrint;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './InvoicePrint.css';

// import mockInvoices from '../mockData/MockInvoices'; // Importa los datos mock

// const InvoicePrint = () => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null); // Inicializa con null
//     const [loading, setLoading] = useState(true); // Estado para manejar la carga

//     useEffect(() => {
//         // Simula una solicitud de datos
//         const fetchInvoiceById = () => {
//             // Encuentra la factura correspondiente en los datos mock
//             const foundInvoice = mockInvoices.find(inv => inv.id === parseInt(id));
//             if (foundInvoice) {
//                 setInvoice(foundInvoice);
//                 setLoading(false); // Actualiza el estado de carga
//             } else {
//                 setLoading(false); // Manejo de caso donde no se encuentra la factura
//             }
//         };

//         fetchInvoiceById(); // Llama a la función para simular la carga de datos

//     }, [id]);

//     if (loading) {
//         return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
//     }

//     if (!invoice || !invoice.customer) {
//         return <div>No invoice found or missing customer data.</div>; // Maneja el caso cuando no se encuentra la factura o falta datos del cliente
//     }

//     // Calcula el total basado en los productos de la factura
//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//     return (
//         <div className="invoice-print-container">
//             <header>
//                 <div className="invoice-header">
//                     <img src="/path/to/logo.png" alt="Logo" />
//                     <div>Información del emisor</div>
//                 </div>
//                 <div className="invoice-customer">
//                     <h2>Factura para:</h2>
//                     <p>{invoice.customer.name}</p>
//                 </div>
//             </header>
            
//             <table className="invoice-details">
//                 <thead>
//                     <tr>
//                         <th>Producto</th>
//                         <th>Cantidad</th>
//                         <th>Precio Unitario</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
//                         <tr key={product.productId}>
//                             <td>{product.productName}</td>
//                             <td>{product.quantity}</td>
//                             <td>${product.price}</td>
//                             <td>${product.price * product.quantity}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             <div className="invoice-total">
//                 Total: ${total}
//             </div>
            
//             <button onClick={() => window.print()}>Imprimir Factura</button>
//         </div>
//     );
// };

// export default InvoicePrint;

