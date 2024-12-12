import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

const NewUser = () => {
  const { state: themeState } = useTheme();
  const { formDataRegister, errors, validateAndSubmit, handleInputChange } =
    useContext(UserContext);

  return (
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className="card-header text-black">Usuario Nuevo</div>
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
              value={formDataRegister.Name}
              onChange={handleInputChange}
            />
            {errors.Name && (
              <div className="invalid-feedback">{errors.Name}</div>
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
              value={formDataRegister.Email}
              onChange={handleInputChange}
            />
            {errors.Email && (
              <div className="invalid-feedback">{errors.Email}</div>
            )}
          </div>
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="text"
              name="Password"
              id="Password"
              className={`form-control ${themeState.darkMode ? "" : ""} ${
                errors.Password ? "is-invalid" : ""
              }`}
              placeholder="Agregar Password"
              aria-describedby="helpId"
              value={formDataRegister.Password}
              onChange={handleInputChange}
            />
            {errors.Password && (
              <div className="invalid-feedback">{errors.Password}</div>
            )}
          </div>

          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-success">
              Agregar Usuario
            </button>
            <Link to={"/users"} className="btn btn-primary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
