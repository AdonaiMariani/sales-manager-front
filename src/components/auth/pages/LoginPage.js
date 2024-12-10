import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        navigate("/home");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 px-2 py-1 text-gray-600 bg-white rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none"
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

          <div className="space-y-4">
            <button className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300">
              Ingresar
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
