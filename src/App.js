import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import VerticalMenu from "./components/verticalMenu/VerticalMenu";
import AppRoutes from "./routes/AppRoutes";
import { DataContext } from "./context/DataContext";
import { useTheme } from "./context/ThemeContext";
import LoginPage from "./components/auth/pages/LoginPage";
import RegisterPage from "./components/auth/pages/RegisterPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [currentPage, setCurrentPage] = useState("login"); // Nueva variable de estado
  const { state: themeState } = useTheme();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("Token guardado en localStorage:", token); // Agrega esto
    } else {
      localStorage.removeItem("token");
      console.log("Token no guardado en localStorage:", token);
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

  // Renderiza las pantallas de autenticación si el usuario no está autenticado
  return (
    <div className="App">
      {currentPage === "login" ? (
        <LoginPage
          setToken={setToken}
          onRegister={() => setCurrentPage("register")}
        />
      ) : (
        <RegisterPage
          onBackToLogin={() => setCurrentPage("login")}
          onSuccesfullyRegister={() => setCurrentPage("login")}
        />
      )}
    </div>
  );
}

export default App;
