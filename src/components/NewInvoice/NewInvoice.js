import React, { useState, useEffect } from 'react';
import './NewInvoice.css';
const NewInvoice = ({ customers, products, onCreate }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const [date, setDate] = useState(formattedDate);
    const [customer, setCustomer] = useState(customers && customers.length > 0 ? customers[0].id : "");
    const [productSearch, setProductSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (customers && customers.length > 0) {
            setCustomer(customers[0].id);
        }
    }, [customers]);

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
        console.log("Product Search: ", productSearch); // Log the product search term
        console.log("Products: ", products); // Log the products array
        const productToAdd = products.find(product => product.name.toLowerCase() === productSearch.toLowerCase());
        console.log("Product to Add: ", productToAdd); // Log the product to add
        if (productToAdd) {
            setCart(prevCart => [...prevCart, { ...productToAdd, quantity }]);
            setProductSearch("");
            setQuantity(1);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate({ date, customer, products: cart });
    };

    const handleRemoveProduct = index => {
        const newCart = cart.filter((product, i) => i !== index);
        setCart(newCart);
    };
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);


return (
    <form onSubmit={handleSubmit}>
        <label>
            Date:
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
            Customer:
            <select value={customer} onChange={e => setCustomer(e.target.value)}>
                {customers && customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
            </select>
        </label>
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
        {cart.map((product, index) => (
            <div key={index}>
                <span>{product.name}</span>
                <span>{product.quantity}</span>
                <span>{product.price}</span>
                <span>{product.price * product.quantity}</span>
                <button onClick={() => handleRemoveProduct(index)}>Remove</button>
            </div>
        ))}
        <div>Total: {total}</div>
        <input type="submit" value="Create Invoice" />
    </form>
);}

export default NewInvoice;