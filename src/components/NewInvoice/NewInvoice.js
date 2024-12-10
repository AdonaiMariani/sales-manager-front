import React, { useState, useEffect, useContext } from "react";
import "./NewInvoice.css";
import { CustomerService } from "../../services/CustomerService";
import CustomerContext from "../../context/CustomerContext";
import { ProductsContext } from "../../context/ProductContext";
import { ProductService } from "../../services/ProductService";

const customerService = new CustomerService();
const productService = new ProductService();
const NewInvoice = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  const { customers, setCustomers } = useContext(CustomerContext);
  const { products, setProducts } = useContext(ProductsContext);

  const [date, setDate] = useState(formattedDate);

  const [customer, setCustomer] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch customers and products on component load
  //función handelCreate para crear facturas con múltiple productos
  const handleCreate = async (invoice) => {
    const productsToSend = invoice.invoiceProducts.map((product) => ({
      productId: product.productId,
      quantity: Number(product.quantity),
      price: product.price,
    }));

    const invoiceToSend = {
      customerId: invoice.customerId,
      date: invoice.date,
      invoiceProducts: productsToSend,
    };

    console.log("invoiceToSend:", invoiceToSend);

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoiceToSend),
    });
    console.log("Response:", response);
    console.log("Token: ", token);

    if (!response.ok) {
      const errorData = response;
      console.log("Error creating invoice:", errorData || response.statusText);
      alert(`Error: ${errorData.message || "Unauthorized access"}`);
      return;
    }
  };
  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
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

    handleCreate(invoiceData);
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
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Customer:
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Product:
          <input
            type="text"
            value={productSearch}
            onChange={handleProductSearch}
          />
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
                    <button onClick={() => handleRemoveProduct(index)}>
                      Remove
                    </button>
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
