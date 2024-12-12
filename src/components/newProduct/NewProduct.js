import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";

const NewProduct = () => {
  const { formData, errors, validateAndSubmit, handleInputChange } =
    useContext(ProductsContext);
  const { state: themeState } = useTheme();

  return (
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className="card-header text-black">Nuevo Producto</div>
      <div className={`card-body ${themeState.darkMode ? "" : ""}`}>
        <form onSubmit={validateAndSubmit}>
          <div className="form-group">
            <label htmlFor="Name" className={themeState.darkMode ? "" : ""}>
              Nombre
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              className={`form-control ${errors.Name ? "is-invalid" : ""}`}
              placeholder="Nombre"
              aria-describedby="helpId"
              value={formData.Name}
              onChange={handleInputChange}
            />
            {errors.Name && (
              <div className="invalid-feedback">{errors.Name}</div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="Brand"
              className={themeState.darkMode ? "dark-mode-label" : ""}
            >
              Marca
            </label>
            <input
              type="text"
              name="Brand"
              id="Brand"
              className={`form-control ${errors.Brand ? "is-invalid" : ""}`}
              placeholder="Marca"
              aria-describedby="helpId"
              value={formData.Brand}
              onChange={handleInputChange}
            />
            {errors.Brand && (
              <div className="invalid-feedback">{errors.Brand}</div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="Category"
              className={themeState.darkMode ? "dark-mode-label" : ""}
            >
              Categoria
            </label>
            <input
              type="text"
              name="Category"
              id="Category"
              className={`form-control ${errors.Category ? "is-invalid" : ""}`}
              placeholder="Categoria"
              aria-describedby="helpId"
              value={formData.Category}
              onChange={handleInputChange}
            />
            {errors.Category && (
              <div className="invalid-feedback">{errors.Category}</div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="Price"
              className={themeState.darkMode ? "dark-mode-label" : ""}
            >
              Precio
            </label>
            <input
              type="text"
              name="Price"
              id="Price"
              className={`form-control ${errors.Price ? "is-invalid" : ""}`}
              placeholder="Precio"
              aria-describedby="helpId"
              value={formData.Price}
              onChange={handleInputChange}
            />
            {errors.Price && (
              <div className="invalid-feedback">{errors.Price}</div>
            )}
          </div>
          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">
              Agregar Producto
            </button>
            <Link to={"/products"} className="btn btn-primary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
