import React from "react";
import { Link } from "react-router-dom";

import "./VerticalMenu.css";
import { useTheme } from "../../context/ThemeContext";

const VerticalMenu = () => {
  const { state, dispatch } = useTheme();

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <div className={`vertical-menu ${state.darkMode ? "dark-mode" : ""}`}>
      <Link to="/home" className="menu-link">
        Home
      </Link>

      <div className="dropdown">
        <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
          Products
        </button>
        <div
          className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
        >
          <Link to="/products" className="dropdown-link">
            See Products
          </Link>
          <Link to="/newProduct" className="dropdown-link">
            Add Product
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
          Customers
        </button>
        <div
          className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
        >
          <Link to="/customers" className="dropdown-link">
            See Customers
          </Link>
          <Link to="/newCustomer" className="dropdown-link">
            Add Customer
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
          Invoices
        </button>
        <div
          className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
        >
          <Link to="/invoices" className="dropdown-link">
            See Invoices
          </Link>
          <Link to="/newInvoice" className="dropdown-link">
            New Invoice
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
          Users
        </button>
        <div
          className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
        >
          <Link to="/users" className="dropdown-link">
            See Users
          </Link>
          <Link to="/newUser" className="dropdown-link">
            Add User
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
          Settings
        </button>
        <div
          className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
        >
          <Link to="/profile" className="dropdown-link">
            Profile
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`dropdown-link theme-toggle-button ${
              state.darkMode ? "dark-mode" : ""
            }`}
          >
            {state.darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
      <button onClick={toggleDarkMode} className="theme-toggle-button">
        {state.darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default VerticalMenu;
