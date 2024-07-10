import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NewCustomer.css";
import CustomerContext from "../../context/CustomerContext";
import { useTheme } from "../../context/ThemeContext";

const NewCustomer = () => {
  const { formData, errors, handleInputChangeForm, validateAndSubmit } =
    useContext(CustomerContext);
  const { state: themeState } = useTheme();

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div className="card-header">New Customer</div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={validateAndSubmit}>
          <div className="form-group">
            <label
              className={themeState.darkMode ? "dark-mode-label" : ""}
              htmlFor="Name"
            >
              Name
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              className={`form-control ${
                themeState.darkMode ? "form-control-dark-mode" : ""
              } ${errors.Name ? "is-invalid" : ""}`}
              placeholder="Insert Name"
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
              Address
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              className={`form-control ${
                themeState.darkMode ? "form-control-dark-mode" : ""
              } ${errors.Address ? "is-invalid" : ""}`}
              placeholder="Insert Address"
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
              className={`form-control ${
                themeState.darkMode ? "form-control-dark-mode" : ""
              } ${errors.Email ? "is-invalid" : ""}`}
              placeholder="Insert Email"
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
              Phone
            </label>
            <input
              type="text"
              name="Phone"
              id="Phone"
              className={`form-control ${
                themeState.darkMode ? "form-control-dark-mode" : ""
              } ${errors.Phone ? "is-invalid" : ""}`}
              placeholder="Insert Phone"
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
              Add New Customer
            </button>
            <Link to={"/customers"} className="btn btn-primary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default NewCustomer;
