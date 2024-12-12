import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import CustomerContext from "../../context/CustomerContext";
import { CustomerService } from "../../services/CustomerService";
import "./CustomerList.css";
import { useTheme } from "../../context/ThemeContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const customerService = new CustomerService();

const CustomerList = () => {
  const { state: themeState } = useTheme();
  const {
    customers,
    setCustomers,
    searchTerm,
    setSearchTerm,
    handleDeleteCustomer,
  } = useContext(CustomerContext);

  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((data) => setCustomers(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className={`card-header ${themeState.darkMode ? "" : ""}`}>
        <h3 className="text-black">Clientes</h3>
        <div>
          <Link className="btn btn-success" to="/newCustomer">
            Agregar Cliente
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
              <th>Dirección</th>
              <th>Telefono</th>
              <th className="email-column">Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter((customer) =>
                Object.values(customer).some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
              )
              .map((customer) => (
                <tr key={customer.id}>
                  <td className="id-column">{customer.id}</td>
                  <td className="name-column">{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td className="email-column">{customer.email}</td>

                  <td className="button-container">
                    <Link
                      className="btn btn-edit"
                      to={`/customers/${customer.id}`}
                    >
                      <FaRegEdit />
                    </Link>

                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteCustomer(customer.id)}
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

export default CustomerList;
