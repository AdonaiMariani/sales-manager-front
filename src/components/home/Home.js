import React from "react";
import InvoiceList from "../invoiceList/InvoiceList";
import { useTheme } from "../../context/ThemeContext";
import "./Home.css"; // Asegúrate de importar el archivo CSS

const Home = () => {
  const { state: themeState } = useTheme();

  return (
    <div className={themeState.darkMode ? "dark-mode-title" : ""}>
      <h1 className={`title ${themeState.darkMode ? "dark-mode-title" : ""}`}>
        Your Sales Manager App
      </h1>
      <h2 className={themeState.darkMode ? "dark-subtitle" : ""}>
        Invoice List:
      </h2>
      <InvoiceList />
    </div>
  );
};

export default Home;
