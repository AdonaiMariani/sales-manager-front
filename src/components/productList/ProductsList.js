import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import Product from "../../product/Product";
import "./ProductList.css";

const productService = new ProductService();

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    category: "all",
    minPrice: 0,
  });

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // Filtrar productos
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filter.minPrice &&
        (filter.category.toLowerCase() === "all" ||
          product.category.toLowerCase() === filter.category)
      );
    });
  };

  const handleCategoryChange = (event) => {
    setFilter({ ...filter, category: event.target.value });
  };

  const handleMinPriceChange = (event) => {
    setFilter({ ...filter, minPrice: parseFloat(event.target.value) || 0 });
  };

  const filteredProducts = filterProducts(
    products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  // con mensaje de confirmación
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService
        .deleteProduct(productId)
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(updatedProducts);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3>Products</h3>
        <Link className="btn btn-success" to="/newProduct">
          New Product
        </Link>
      </div>
      <div className="card-body">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
        />
        <div>
          <label>
            Category:
            <select
              id="category"
              value={filter.category}
              onChange={handleCategoryChange}
            >
              <option value="all">All</option>
              <option value="gaseosa">Gaseosa</option>
              <option value="alimento">Alimento</option>
            </select>
          </label>
          <label>
            Min Price:
            <input
              type="number"
              value={filter.minPrice}
              onChange={handleMinPriceChange}
            />
          </label>
        </div>
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
            {filteredProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default ProductsList;
