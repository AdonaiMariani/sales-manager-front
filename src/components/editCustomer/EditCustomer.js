import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerService } from "../../services/CustomerService";
import "./EditCustomer.css";
import { useTheme } from "../../context/ThemeContext";

const customerService = new CustomerService();

const EditCustomer = () => {
  const { state: themeState } = useTheme();
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    customerService
      .getCustomerById(id)
      .then((data) => {
        setCustomer(data);
        setOriginalCustomer(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    console.log(originalCustomer, customer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(customer).filter(
      (key) => customer[key] !== originalCustomer[key]
    );
    const confirmMessage = changes
      .map((key) => `${key}: ${originalCustomer[key]} => ${customer[key]}`)
      .join("\n");
    if (
      window.confirm(
        `Are you sure you want to make these changes?\n\n${confirmMessage}`
      )
    ) {
      customerService
        .updateCustomer(id, customer)
        .then(() => {
          alert("Customer updated successfully");
          navigate("/customers");
        })
        .catch((error) => console.error(error));
    }
  };

  const hasChanges = () => {
    return (
      originalCustomer &&
      Object.keys(customer).some(
        (key) => customer[key] !== originalCustomer[key]
      )
    );
  };

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div
        className={`card-header ${
          themeState.darkMode ? "dark-mode" : ""
        } d-flex justify-content-between`}
      >
        <h3>Editar Cliente</h3>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/customers")}
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
              className="form-control"
              name="id"
              value={customer.id}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Telefono
            </label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={customer.email}
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

export default EditCustomer;
