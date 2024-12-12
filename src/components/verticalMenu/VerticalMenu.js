import { Link } from "react-router-dom";

import "./VerticalMenu.css";
import { useTheme } from "../../context/ThemeContext";

import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { SlLogout } from "react-icons/sl";

const VerticalMenu = () => {
  const { state, dispatch } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    window.location.reload();
  };

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";

  return (
    <div className={`vertical-menu ${state.darkMode ? "dark-mode" : ""}`}>
      <div className="menu-content">
        <Link to="/home" className="menu-link">
          Inicio
        </Link>

        <div className="dropdown">
          <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
            Productos
          </button>
          <div
            className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
          >
            <Link to="/products" className="dropdown-link">
              Ver Productos
            </Link>
            <Link to="/newProduct" className="dropdown-link">
              Añadir Productos
            </Link>
          </div>
        </div>

        <div className="dropdown">
          <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
            Clientes
          </button>
          <div
            className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
          >
            <Link to="/customers" className="dropdown-link">
              Ver Clientes
            </Link>
            <Link to="/newCustomer" className="dropdown-link">
              Añadir Clientes
            </Link>
          </div>
        </div>

        <div className="dropdown">
          <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
            Facturas
          </button>
          <div
            className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
          >
            <Link to="/invoices" className="dropdown-link">
              Ver Facturas
            </Link>
            <Link to="/newInvoice" className="dropdown-link">
              Nueva Factura
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div className="dropdown">
            <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
              Usuarios
            </button>
            <div
              className={`dropdown-content ${
                state.darkMode ? "dark-mode" : ""
              }`}
            >
              <Link to="/users" className="dropdown-link">
                Ver Usuarios
              </Link>
              <Link to="/newUser" className="dropdown-link">
                Añadir Usuario
              </Link>
            </div>
          </div>
        )}

        <div className="dropdown">
          <button className={`dropbtn ${state.darkMode ? "dark-mode" : ""}`}>
            Ajustes
          </button>
          <div
            className={`dropdown-content ${state.darkMode ? "dark-mode" : ""}`}
          >
            <Link to="/profile" className="dropdown-link">
              Perfil
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-buttons">
        <button
          type="button"
          onClick={toggleDarkMode}
          style={{ border: "none", background: "none" }}
        >
          {state.darkMode ? <LuSunMedium /> : <LuMoonStar />}
        </button>
        <button onClick={handleLogout} className="logout-button">
          <SlLogout />
        </button>
      </div>
    </div>
  );
};

export default VerticalMenu;
