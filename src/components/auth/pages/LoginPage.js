import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setToken, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica al servidor que el cuerpo está en JSON
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Maneja la respuesta exitosa
        const data = await response.json();
        setToken(data.jwt);
        console.log("Respuesta del servidor", data);
      } else {
        // Maneja errores de autenticación
        if (response.status === 401) {
          throw new Error("Credenciales inválidas");
        }
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div class="login_container">
      <div class="login_card">
        <h1 class="login_title">Iniciar Sesión</h1>
        {error && <p class="login_error">{error}</p>}
        <form onSubmit={handleSubmit} class="login_form">
          <div class="login_form_group">
            <label for="email" class="login_label">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              class="login_input"
            />
          </div>
          <div class="login_form_group login_relative">
            <label for="password" class="login_label">
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              class="login_input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              class="login_toggle_password"
            >
              {showPassword ? (
                <span role="img" aria-label="Ocultar contraseña">
                  👁️‍🗨️
                </span>
              ) : (
                <span role="img" aria-label="Mostrar contraseña">
                  👁️
                </span>
              )}
            </button>
          </div>
          <div class="login_button_group">
            <button class="login_primary_button">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
