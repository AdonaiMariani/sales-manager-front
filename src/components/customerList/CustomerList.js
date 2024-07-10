import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Customer from "../customer/Customer";
import CustomerContext from "../../context/CustomerContext";
import { CustomerService } from "../../services/CustomerService";
import "./CustomerList.css";
import { useTheme } from "../../context/ThemeContext";

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
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div className={`card-header ${themeState.darkMode ? "dark-mode" : ""}`}>
        <h3>Customers</h3>
        <div>
          <Link className="btn btn-success" to="/newCustomer">
            New Customer
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
              <th>Address</th>
              <th>Phone</th>
              <th className="email-column">Email</th>
              <th>Actions</th>
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
                <Customer
                  key={customer.id}
                  customer={customer}
                  handleDeleteCustomer={handleDeleteCustomer}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default CustomerList;
