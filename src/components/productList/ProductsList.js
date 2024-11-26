import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ProductService } from "../../services/ProductService";
import "./ProductList.css";
import { useTheme } from "../../context/ThemeContext";
import { ProductsContext } from "../../context/ProductContext";

const productService = new ProductService();

const ProductList = () => {
  const { state: themeState } = useTheme();
  const {
    products,
    setProducts,
    searchTerm,
    setSearchTerm,
    handleDeleteProduct,
  } = useContext(ProductsContext);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div className={`card-header ${themeState.darkMode ? "dark-mode" : ""}`}>
        <h3>Products</h3>
        <div>
          <Link className="btn btn-success" to="/newProduct">
            New Product
          </Link>
        </div>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
          className={`form-control ${themeState.darkMode ? "dark-mode" : ""}`}
        />
        <table className="table">
          <thead>
            <tr>
              <th className="id-column">ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                Object.values(product).some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
              )
              .map((product) => (
                <tr key={product.id}>
                  <td className="id-column">{product.id}</td>
                  <td className="name-column">{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td className="button-container">
                    <Link
                      className="btn btn-primary"
                      to={`/products/${product.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default ProductList;
