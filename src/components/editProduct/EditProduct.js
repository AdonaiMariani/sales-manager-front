import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductService } from "../../services/ProductService";
import "./EditProduct.css";
import { useTheme } from "../../context/ThemeContext";

const productService = new ProductService();

const EditProduct = () => {
  const { state: themeState } = useTheme();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    brand: "",
    category: "",
    price: "",
  });
  const [originalProduct, setOriginalProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    productService
      .getProductById(id)
      .then((data) => {
        setProduct(data);
        setOriginalProduct(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(product).filter(
      (key) => product[key] !== originalProduct[key]
    );
    const confirmMessage = changes
      .map((key) => `${key}: ${originalProduct[key]} => ${product[key]}`)
      .join("\n");
    if (
      window.confirm(
        `Are you sure you want to make these changes?\n\n${confirmMessage}`
      )
    ) {
      productService
        .updateProduct(id, product)
        .then(() => {
          alert("Product updated successfully");
          navigate("/products");
        })
        .catch((error) => console.error(error));
    }
  };

  const hasChanges = () => {
    return (
      originalProduct &&
      Object.keys(product).some((key) => product[key] !== originalProduct[key])
    );
  };

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div
        className={`card-header ${
          themeState.darkMode ? "dark-mode" : ""
        } d-flex justify-content-between`}
      >
        <h3>Editar Producto</h3>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          Cancelar
        </button>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>Id</label>
            <input
              type="text"
              className={`form-control ${
                themeState.darkMode ? "dark-mode" : ""
              }`}
              name="id"
              value={product.id}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Nombre
            </label>
            <input
              type="text"
              className={`form-control ${
                themeState.darkMode ? "dark-mode" : ""
              }`}
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Marca
            </label>
            <input
              type="text"
              className={`form-control ${
                themeState.darkMode ? "dark-mode" : ""
              }`}
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Categoria
            </label>
            <input
              type="text"
              className={`form-control ${
                themeState.darkMode ? "dark-mode" : ""
              }`}
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Precio
            </label>
            <input
              type="number"
              className={`form-control ${
                themeState.darkMode ? "dark-mode" : ""
              }`}
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!hasChanges()}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
