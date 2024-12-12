import React, { useState, useEffect } from "react";
import InvoiceList from "../invoiceList/InvoiceList";
import { useTheme } from "../../context/ThemeContext";
import "./Home.css";

const Home = () => {
  const { state: themeState } = useTheme();
  const [showInvoiceList, setShowInvoiceList] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInvoiceList(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={themeState.darkMode ? "dark-mode-title" : ""}>
      <h1 className={`title ${themeState.darkMode ? "dark-mode-title" : ""}`}>
        Su aplicación de gerente de ventas
      </h1>
      <h2 className={themeState.darkMode ? "dark-subtitle" : ""}>
        Lista de facturas:
      </h2>

      {showInvoiceList ? <InvoiceList /> : null}
    </div>
  );
};

export default Home;
