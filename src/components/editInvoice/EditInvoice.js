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
      .then(data => setInvoice(data))
      .catch(error => console.error(error));

    customerService.getAllCustomers()
      .then(data => setCustomers(data))
      .catch(error => console.error(error));
  
  }, [id,]);

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
        products: [...prevInvoice.products, { ...productToAdd, quantity }]
      }));
      setProductSearch("");
      setQuantity(1);
    }
  };

  const handleUpdate = (updatedInvoice) => {
    invoiceService.updateInvoice(id, updatedInvoice)
      .then(data => setInvoice(data))
      .catch(error => console.error(error));
  };

  const handleRemoveProduct = (productIndex) => {
    setInvoice({
      ...invoice,
      products: invoice.products.filter((_, index) => index !== productIndex)
    });
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const total = invoice.products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleUpdate(invoice);
    }}>
      <label>
        Date:
        <input type="date" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
      </label>
      <div>
        <label>Customer</label>
        <select value={invoice.customer} onChange={(e) => setInvoice({...invoice, customer: e.target.value})}>
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
      {invoice.products.map((product, index) => (
        <div key={index}>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
          <span>{product.price}</span>
          <span>{product.price * product.quantity}</span>
          <button onClick={() => handleRemoveProduct(index)}>Remove</button>
        </div>
      ))}
      <div>Total: {total}</div>
      <input type="submit" value="Update Invoice" />
    </form>
  );
};

export default EditInvoice;