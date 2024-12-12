import React, { useState } from "react";
import "./Login.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Login = ({ setToken, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        console.log(data);
        localStorage.setItem("role", data.roles);
        localStorage.setItem("email", email);
        setToken(data.jwt);
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
    <div className="login_container">
      <div className="login_card">
        <h1 className="login_title">Iniciar Sesión</h1>
        {error && <p className="login_error">{error}</p>}
        <form onSubmit={handleSubmit} className="login_form">
          <div className="login_form_group">
            <label htmlFor="email" className="login_label">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login_input"
            />
          </div>
          <div className="login_form_group">
            <label htmlFor="password" className="login_label">
              Contraseña
            </label>
            <div className="login_input_wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login_input"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="login_toggle_password"
              >
                {showPassword ? (
                  <span role="img" aria-label="Ocultar contraseña">
                    <FaRegEyeSlash />
                  </span>
                ) : (
                  <span role="img" aria-label="Mostrar contraseña">
                    <IoEyeOutline />
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="login_button_group">
            <button className="login_primary_button">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
