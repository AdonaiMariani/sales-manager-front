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
        Your Sales Manager App
      </h1>
      <h2 className={themeState.darkMode ? "dark-subtitle" : ""}>
        Invoice List:
      </h2>

      {showInvoiceList ? <InvoiceList /> : null}
    </div>
  );
};

export default Home;
