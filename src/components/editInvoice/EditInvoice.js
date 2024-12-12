import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceService } from "../../services/InvoiceService";
import { CustomerService } from "../../services/CustomerService";
import "./EditInvoice.css";
import CustomerContext from "../../context/CustomerContext";
import { ProductsContext } from "../../context/ProductContext";
import { ProductService } from "../../services/ProductService";
import { IoReturnDownBack } from "react-icons/io5";

const invoiceService = new InvoiceService();
const customerService = new CustomerService();
const productService = new ProductService();

const EditInvoice = () => {
  const { id } = useParams();
  const [originalInvoice, setOriginalInvoice] = useState(null); // Guardar la factura original
  const [invoice, setInvoice] = useState(null);
  const { customers, setCustomers } = useContext(CustomerContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    invoiceService
      .getInvoiceById(id)
      .then((data) => {
        if (!data.invoiceProducts) {
          data.invoiceProducts = [];
        }
        setInvoice(data);
        setOriginalInvoice(JSON.stringify(data)); // Almacenar la factura original como cadena
      })
      .catch((error) => console.error(error));

    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleProductSearch = useCallback(
    (e) => {
      const searchTerm = e.target.value;
      setProductSearch(searchTerm);
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    },
    [products]
  );

  const handleProductSelect = (product) => {
    setProductSearch(product.name);
    setQuantity(1);
    setSearchResults([]);
  };

  const handleAddProduct = useCallback(() => {
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
  }, [products, productSearch, quantity]);

  const handleRemoveProduct = useCallback((productIndex) => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      invoiceProducts: prevInvoice.invoiceProducts.filter(
        (_, index) => index !== productIndex
      ),
    }));
  }, []);

  const handleUpdate = (updatedInvoice) => {
    const invoiceToUpdate = {
      ...updatedInvoice,
      invoiceProducts: updatedInvoice.invoiceProducts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    invoiceService
      .updateInvoice(id, invoiceToUpdate)
      .then(() => {
        alert("Factura actualizada con éxito!");
        navigate("/invoices");
      })
      .catch((error) => console.error("Error actualizando la factura:", error));
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const hasChanges =
    originalInvoice !== JSON.stringify(invoice) &&
    invoice.invoiceProducts.length > 0;

  const total = invoice.invoiceProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onBack = () => {
    navigate("/invoices");
  };

  return (
    <form
      className="invoice-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleUpdate(invoice);
      }}
    >
      <div className="form-group">
        <label>Fecha:</label>
        <input
          type="date"
          value={invoice.date.split("T")[0]}
          onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Clientes:</label>
        <select
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
        <label>Productos:</label>
        <input
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
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="button" onClick={handleAddProduct}>
          Añadir Producto
        </button>
      </div>
      <table className="invoice-products">
        <thead>
          <tr>
            <th>ID del Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {invoice.invoiceProducts.map((item, index) => (
            <tr key={index}>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault(); // Evitar cualquier comportamiento por defecto
                    handleRemoveProduct(index); // Llamar al manejador
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>Total: {total}</div>
      <div className="invoice-buttons">
        <button type="submit" disabled={!hasChanges}>
          Actualizar Factura
        </button>
        <button className="btn-back" onClick={onBack}>
          <IoReturnDownBack />
        </button>
      </div>
    </form>
  );
};

export default EditInvoice;
