import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomerContext from "../../context/CustomerContext";
import { useTheme } from "../../context/ThemeContext";

const NewCustomer = () => {
  const { formData, errors, handleInputChangeForm, validateAndSubmit } =
    useContext(CustomerContext);
  const { state: themeState } = useTheme();

  return (
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className="card-header text-black">Nuevo Cliente</div>
      <div className={`card-body ${themeState.darkMode ? "" : ""}`}>
        <form onSubmit={validateAndSubmit} className="border">
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="Name"
            >
              Nombre
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              className={`form-control ${themeState.darkMode ? "" : ""} ${
                errors.Name ? "is-invalid" : ""
              }`}
              placeholder="Agregar Nombre"
              aria-describedby="helpId"
              value={formData.Name}
              onChange={handleInputChangeForm}
            />
            {errors.Name && (
              <div className="invalid-feedback">{errors.Name}</div>
            )}
          </div>
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="Address"
            >
              Direccion
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              className={`form-control ${themeState.darkMode ? "" : ""} ${
                errors.Name ? "is-invalid" : ""
              }`}
              placeholder="Agregar Direccion"
              aria-describedby="helpId"
              value={formData.Address}
              onChange={handleInputChangeForm}
            />
            {errors.Address && (
              <div className="invalid-feedback">{errors.Address}</div>
            )}
          </div>
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="Email"
            >
              Email
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              className={`form-control ${themeState.darkMode ? "" : ""} ${
                errors.Name ? "is-invalid" : ""
              }`}
              placeholder="Agregar Email"
              aria-describedby="helpId"
              value={formData.Email}
              onChange={handleInputChangeForm}
            />
            {errors.Email && (
              <div className="invalid-feedback">{errors.Email}</div>
            )}
          </div>
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="Phone"
            >
              Telefono
            </label>
            <input
              type="text"
              name="Phone"
              id="Phone"
              cclassName={`form-control ${themeState.darkMode ? "" : ""} ${
                errors.Name ? "is-invalid" : ""
              }`}
              placeholder="Agregar Telefono"
              aria-describedby="helpId"
              value={formData.Phone}
              onChange={handleInputChangeForm}
            />
            {errors.Phone && (
              <div className="invalid-feedback">{errors.Phone}</div>
            )}
          </div>

          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">
              Agregar Cliente
            </button>
            <Link to={"/customers"} className="btn btn-primary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
