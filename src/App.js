import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./context/ThemeContext";
import LoginPage from "./components/auth/pages/LoginPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, setToken } = useContext(AuthContext);
  const { state: themeState } = useTheme();

  useEffect(() => {
    if (token) {
      console.log("Token actualizado:", token);
      // Aquí puedes hacer cualquier acción adicional cuando cambie el token
    }
  }, [token]);

  if (token) {
    // Prioriza el dashboard si el usuario está autenticado
    return (
      <div className="main-container">
        <div className="menu-column">
          <VerticalMenu />
        </div>
        <div
          className={`content-column ${themeState.darkMode ? "dark-mode" : ""}`}
        >
          <h1
            className={`main-title ${themeState.darkMode ? "dark-mode" : ""}`}
          >
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

  return (
    <div className="App">
      <LoginPage setToken={setToken} />
    </div>
  );
}

export default App;
