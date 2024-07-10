import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import Product from "../product/Product";
import "./ProductList.css";
import { ProductsContext } from "../../context/ProductContext";
import { useFilters } from "../../hooks/useFilters";
import { useTheme } from "../../context/ThemeContext";
const productService = new ProductService();

const ProductsList = () => {
  const { state: themeState } = useTheme();
  const {
    filter,
    filteredProducts,
    handleCategoryChange,
    handleMinPriceChange,
  } = useFilters();
  const { setProducts, searchTerm, setSearchTerm, handleDeleteProduct } =
    useContext(ProductsContext);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [setProducts]);

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div className="card-header d-flex justify-content-between">
        <h3>Products</h3>
        <Link className="btn btn-success" to="/newProduct">
          New Product
        </Link>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
          className="mb-3"
        />
        <div
          className={`filter-container ${
            themeState.darkMode ? "dark-mode" : ""
          }`}
        >
          <label>
            <select
              id="category"
              value={filter.category}
              onChange={handleCategoryChange}
              className=""
            >
              <option value="all">All</option>
              <option value="gaseosa">Gaseosa</option>
              <option value="alimento">Alimento</option>
            </select>
          </label>
          <label className="filter-item">
            Min Price:
            <input
              type="range"
              value={filter.minPrice}
              min="0"
              max="2000"
              onChange={handleMinPriceChange}
              className="ml-2"
            />
            <span className="filter-item">{filter.minPrice}</span>
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="no-products">
                    <h3>There are no more products available.</h3>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
