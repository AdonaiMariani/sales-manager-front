import "./App.css";
import React, { useEffect, useContext } from "react";
import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import AppRoutes from "./routes/AppRoutes";
import { DataContext } from "./context/DataContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { fetchCustomers, fetchProducts } = useContext(DataContext);
  const { state: themeState } = useTheme();

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  return (
    <div className="main-container">
      <div className="menu-column">
        <VerticalMenu />
      </div>
      <div
        className={`content-column ${themeState.darkMode ? "dark-mode" : ""}`}
      >
        <h1 className={`main-title ${themeState.darkMode ? "dark-mode" : ""}`}>
          Sales Management
        </h1>
        <div
          style={{
            marginLeft: "100px",
            padding: "20px",
            width: "80%",
            height: "100%",
          }}
        >
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
