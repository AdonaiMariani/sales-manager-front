import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ProductService } from "../../services/ProductService";
import "./ProductList.css";
import { useTheme } from "../../context/ThemeContext";
import { ProductsContext } from "../../context/ProductContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

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
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className={`card-header ${themeState.darkMode ? "" : ""}`}>
        <h3 className="text-black">Productos</h3>
        <div>
          <Link className="btn btn-success" to="/newProduct">
            Agregar Producto
          </Link>
        </div>
      </div>
      <div className={`card-body ${themeState.darkMode ? "" : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar..."
          className={`form-control ${themeState.darkMode ? "" : ""}`}
        />
        <table className="table">
          <thead>
            <tr>
              <th className="id-column">ID</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Acciones</th>
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
                      className="btn btn-edit"
                      to={`/products/${product.id}`}
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
