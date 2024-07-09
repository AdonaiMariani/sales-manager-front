import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceService } from '../../services/InvoiceService';
import './InvoicePrint.css';

const InvoicePrint = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({ invoiceProducts: [] }); // Initialize with default structure

    useEffect(() => {
        const invoiceService = new InvoiceService();
        invoiceService.getInvoiceById(id)
            .then(data => {
                console.log(data); // Imprimir la respuesta para depurar
                setInvoice(data);
            })
            .catch(error => console.error(error));
    }, [id]);

    if (!invoice || !invoice.customer) { // Check for invoice and customer existence
        return <div>Loading...</div>;
    }

    const total = invoice.invoiceProducts.reduce((total, product) => total + product.product.price * product.quantity, 0);

    return (
        <div className="invoice-print-container">
            <header>
                <div className="invoice-header">
                    <img src="/path/to/logo.png" alt="Logo" />
                    <div>Información del emisor</div>
                </div>
                <div className="invoice-customer">
                    <h2>Factura para:</h2>
                    <p>{invoice.customer.name}</p>
                </div>
            </header>
            
            <table className="invoice-details">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.invoiceProducts && invoice.invoiceProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.product.name}</td>
                            <td>{product.quantity}</td>
                            <td>${product.product.price}</td>
                            <td>${product.product.price * product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="invoice-total">
                Total: ${total}
            </div>
            
            <button onClick={() => window.print()}>Imprimir Factura</button>
        </div>
    );
};

export default InvoicePrint;

