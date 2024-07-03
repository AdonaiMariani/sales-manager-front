import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import Product from '../../product/Product';
import './ProductList.css';
const productService = new ProductService();

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productService.getAllProducts()
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  //con mensaje de confirmación
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.deleteProduct(productId)
        .then(() => {
          const updatedProducts = products.filter((product) => product.id !== productId);
          setProducts(updatedProducts);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Products</h3>
        <Link className="btn btn-success" to="/newProduct">New Product</Link>
      </div>
      <div className="card-body">
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Search..." />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(product => 
              Object.values(product).some(value => 
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
            ).map((product) => (
              <Product key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default ProductsList;