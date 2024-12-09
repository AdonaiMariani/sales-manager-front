import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceService } from '../../services/InvoiceService';
import { CustomerService } from '../../services/CustomerService';

const invoiceService = new InvoiceService();
const customerService = new CustomerService();

const EditInvoice = ({ customers: customersProp, products }) => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [productSearch, setProductSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        invoiceService.getInvoiceById(id)
            .then(data => {
                if (!data.invoiceProducts) {
                    data.invoiceProducts = [];
                }
                setInvoice(data);
            })
            .catch(error => console.error(error));

        customerService.getAllCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleProductSearch = e => {
        const searchTerm = e.target.value;
        setProductSearch(searchTerm);

        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleProductSelect = product => {
        setProductSearch(product.name);
        setQuantity(1);
        setSearchResults([]);
    };

    const handleAddProduct = () => {
        const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
        if (productToAdd) {
            setInvoice(prevInvoice => ({
                ...prevInvoice,
                invoiceProducts: [
                    ...prevInvoice.invoiceProducts,
                    {
                        productId: productToAdd.id,
                        quantity: Number(quantity),
                        price: productToAdd.price
                    }
                ]
            }));
            setProductSearch("");
            setQuantity(1);
        }
    };
    const handleUpdate = (updatedInvoice) => {
        const invoiceToUpdate = {
            ...updatedInvoice,
            invoiceProducts: updatedInvoice.invoiceProducts.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        };

         // Log para verificar los datos antes de enviarlos
        console.log("Datos enviados al backend:", invoiceToUpdate);
    
        invoiceService
            .updateInvoice(id, invoiceToUpdate)
            .then((response) => {
                console.log("Respuesta del backend:", response);
                alert("Invoice updated successfully!");
            })
            .catch((error) => console.error("Error updating invoice:", error));
    };
    
    // const handleUpdate = (updatedInvoice) => {
    //     invoiceService.updateInvoice(id, updatedInvoice)
    //         .then(data => setInvoice(data))
    //         .catch(error => console.error(error));
    // };

    const handleRemoveProduct = (productIndex) => {
        setInvoice({
            ...invoice,
            invoiceProducts: invoice.invoiceProducts.filter((_, index) => index !== productIndex)
        });
    };

    if (!invoice) {
        return <div>Loading...</div>;
    }

    const total = invoice.invoiceProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleUpdate(invoice);
        }}>
            <label>
                Date:
                <input
                    type="date"
                    value={invoice.date.split('T')[0]} // Extrae solo la parte de la fecha
                    onChange={e => setInvoice({ ...invoice, date: e.target.value })}
                />
            </label>
            <div>
                <label>Customer</label>
                <select
                    value={invoice.customerId}
                    onChange={(e) => setInvoice({ ...invoice, customerId: e.target.value })}
                >
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
            </div>
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
            {invoice.invoiceProducts.map((item, index) => (
                <div key={index}>
                    <span>Product ID: {item.productId}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: {item.price}</span>
                    <span>Total: {item.price * item.quantity}</span>
                    <button onClick={() => handleRemoveProduct(index)}>Remove</button>
                </div>
            ))}
            <div>Total: {total}</div>
            <input type="submit" value="Update Invoice" />
        </form>
    );
};

export default EditInvoice;

// //CODIGO DESPUES DE IMPLEMENTAR INVOICEPRODUCTS
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { InvoiceService } from '../../services/InvoiceService';
// import { CustomerService } from '../../services/CustomerService';

// const invoiceService = new InvoiceService();
// const customerService = new CustomerService();

// const EditInvoice = ({ customers: customersProp, products }) => {
//     const { id } = useParams();
//     const [invoice, setInvoice] = useState(null);
//     const [customers, setCustomers] = useState([]);
//     const [productSearch, setProductSearch] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [quantity, setQuantity] = useState(1);
//     const navigate = useNavigate();

//     useEffect(() => {
//         invoiceService.getInvoiceById(id)
//             .then(data => setInvoice(data))
//             .catch(error => console.error(error));

//         customerService.getAllCustomers()
//             .then(data => setCustomers(data))
//             .catch(error => console.error(error));
//     }, [id]);

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
//         const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
//         if (productToAdd) {
//             setInvoice(prevInvoice => ({
//                 ...prevInvoice,
//                 invoiceProducts: [...prevInvoice.invoiceProducts, { product: productToAdd, quantity }]
//             }));
//             setProductSearch("");
//             setQuantity(1);
//         }
//     };

//     // const handleUpdate = (updatedInvoice) => {
//     //     invoiceService.updateInvoice(id, updatedInvoice)
//     //         .then(data => setInvoice(data))
//     //         .catch(error => console.error(error));
//     // };
//     const handleUpdate = (updatedInvoice) => {
//       const changes = Object.keys(updatedInvoice).filter(key => updatedInvoice[key] !== invoice[key]);
//       const confirmMessage = changes.map(key => `${key}: ${invoice[key]} => ${updatedInvoice[key]}`).join('\n');
//       if (window.confirm(`Are you sure you want to make these changes?\n\n${confirmMessage}`)) {
//           invoiceService.updateInvoice(id, updatedInvoice)
//               .then(() => {
//                   alert('Invoice updated successfully');
//                   navigate('/invoices');
//               })
//               .catch(error => console.error(error));
//       }
//   };

//     const handleRemoveProduct = (productIndex) => {
//         setInvoice({
//             ...invoice,
//             invoiceProducts: invoice.invoiceProducts.filter((_, index) => index !== productIndex)
//         });
//     };

//     if (!invoice) {
//         return <div>Loading...</div>;
//     }

//     const total = invoice.invoiceProducts.reduce((total, product) => total + product.product.price * product.quantity, 0);

//     return (
//         <form onSubmit={(event) => {
//             event.preventDefault();
//             handleUpdate(invoice);
//         }}>
//             <label>
//                 Date:
//                 <input type="date" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
//             </label>
//             <div>
//                 <label>Customer</label>
//                 <select value={invoice.customer} onChange={(e) => setInvoice({...invoice, customer: e.target.value})}>
//                     {customers.map(customer => (
//                         <option key={customer.id} value={customer.id}>{customer.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <label>
//                 Product:
//                 <input type="text" value={productSearch} onChange={handleProductSearch} />
//                 {searchResults.map(product => (
//                     <div key={product.id} onClick={() => handleProductSelect(product)}>
//                         {product.name}
//                     </div>
//                 ))}
//                 <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
//                 <button type="button" onClick={handleAddProduct}>Add Product</button>
//             </label>
//             {invoice.invoiceProducts.map((product, index) => (
//                 <div key={index}>
//                     <span>{product.product.name}</span>
//                     <span>{product.quantity}</span>
//                     <span>{product.product.price}</span>
//                     <span>{product.product.price * product.quantity}</span>
//                     <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//                 </div>
//             ))}
//             <div>Total: {total}</div>
//             <input type="submit" value="Update Invoice" />
//         </form>
//     );
// };

// export default EditInvoice;






// //CODIGO ANTES DE IMPLEMENTAR INVOICEPRODUCTS
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { InvoiceService } from '../../services/InvoiceService';
// import { CustomerService } from '../../services/CustomerService';

// const invoiceService = new InvoiceService();
// const customerService = new CustomerService();

// const EditInvoice = ({ customers: customersProp, products }) => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [productSearch, setProductSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     invoiceService.getInvoiceById(id)
//       .then(data => setInvoice(data))
//       .catch(error => console.error(error));

//     customerService.getAllCustomers()
//       .then(data => setCustomers(data))
//       .catch(error => console.error(error));
  
//   }, [id,]);

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
//       setInvoice(prevInvoice => ({
//         ...prevInvoice,
//         products: [...prevInvoice.products, { ...productToAdd, quantity }]
//       }));
//       setProductSearch("");
//       setQuantity(1);
//     }
//   };

//   const handleUpdate = (updatedInvoice) => {
//     invoiceService.updateInvoice(id, updatedInvoice)
//       .then(data => setInvoice(data))
//       .catch(error => console.error(error));
//   };

//   const handleRemoveProduct = (productIndex) => {
//     setInvoice({
//       ...invoice,
//       products: invoice.products.filter((_, index) => index !== productIndex)
//     });
//   };

//   if (!invoice) {
//     return <div>Loading...</div>;
//   }

//   const total = invoice.products.reduce((total, product) => total + product.price * product.quantity, 0);

//   return (
//     <form onSubmit={(event) => {
//       event.preventDefault();
//       handleUpdate(invoice);
//     }}>
//       <label>
//         Date:
//         <input type="date" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
//       </label>
//       <div>
//         <label>Customer</label>
//         <select value={invoice.customer} onChange={(e) => setInvoice({...invoice, customer: e.target.value})}>
//           {customers.map(customer => (
//             <option key={customer.id} value={customer.id}>{customer.name}</option>
//           ))}
//         </select>
//       </div>
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
//       {invoice.products.map((product, index) => (
//         <div key={index}>
//           <span>{product.name}</span>
//           <span>{product.quantity}</span>
//           <span>{product.price}</span>
//           <span>{product.price * product.quantity}</span>
//           <button onClick={() => handleRemoveProduct(index)}>Remove</button>
//         </div>
//       ))}
//       <div>Total: {total}</div>
//       <input type="submit" value="Update Invoice" />
//     </form>
//   );
// };

// export default EditInvoice;
