import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/InvoiceService";
import { CustomerService } from "../../services/CustomerService";
import "./EditInvoice.css";

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
    invoiceService
      .getInvoiceById(id)
      .then((data) => {
        if (!data.invoiceProducts) {
          data.invoiceProducts = [];
        }
        setInvoice(data);
      })
      .catch((error) => console.error(error));

    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, [id]);

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
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        invoiceProducts: [
          ...prevInvoice.invoiceProducts,
          {
            productId: productToAdd.id,
            quantity: Number(quantity),
            price: productToAdd.price,
          },
        ],
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

    console.log("Datos enviados al backend:", invoiceToUpdate);

    invoiceService
      .updateInvoice(id, invoiceToUpdate)
      .then((response) => {
        console.log("Respuesta del backend:", response);
        alert("Invoice updated successfully!");
      })
      .catch((error) => console.error("Error updating invoice:", error));
  };

  const handleRemoveProduct = (productIndex) => {
    setInvoice({
      ...invoice,
      invoiceProducts: invoice.invoiceProducts.filter(
        (_, index) => index !== productIndex
      ),
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
    <form
      className="invoice-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleUpdate(invoice);
      }}
    >
      <div className="form-group">
        <label className="form-label">Date:</label>
        <input
          className="form-input"
          type="date"
          value={invoice.date.split("T")[0]} // Extrae solo la parte de la fecha
          onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Customer:</label>
        <select
          className="form-input"
          value={invoice.customerId}
          onChange={(e) =>
            setInvoice({ ...invoice, customerId: e.target.value })
          }
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Product:</label>
        <input
          className="form-input"
          type="text"
          value={productSearch}
          onChange={handleProductSearch}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((product) => (
              <div
                className="search-result-item"
                key={product.id}
                onClick={() => handleProductSelect(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
        <input
          className="form-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          className="form-button add-product-button"
          type="button"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      {invoice.invoiceProducts.map((item, index) => (
        <div className="product-item" key={index}>
          <span>Product ID: {item.productId}</span>
          <span>Quantity: {item.quantity}</span>
          <span>Price: {item.price}</span>
          <span>Total: {item.price * item.quantity}</span>
          <button
            className="form-button remove-product-button"
            onClick={() => handleRemoveProduct(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="form-total">Total: {total}</div>
      <input
        className="form-button submit-button"
        type="submit"
        value="Update Invoice"
      />
    </form>
  );
};

export default EditInvoice;
