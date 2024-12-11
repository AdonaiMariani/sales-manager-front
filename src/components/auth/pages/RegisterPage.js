import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

function RegisterPage({ onSuccesfullyRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { formDataRegister, errors, validateAndSubmit, handleInputChange } =
    useContext(UserContext);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Registrarse
        </h1>
        <form className="space-y-4" onSubmit={validateAndSubmit}>
          <div className="form-group">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              className={`form-control ${errors.Name ? "is-invalid" : ""}`}
              placeholder="Username"
              aria-describedby="helpId"
              value={formDataRegister.Name}
              onChange={handleInputChange}
            />
            {errors.Name && (
              <div className="invalid-feedback">{errors.Name}</div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Email"
              aria-describedby="helpId"
              value={formDataRegister.Email}
              onChange={handleInputChange}
            />
            {errors.Email && (
              <div className="invalid-feedback">{errors.Email}</div>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Password"
                aria-describedby="helpId"
                value={formDataRegister.Password}
                onChange={handleInputChange}
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
          </div>
          <button
            type="submit"
            onClick={onSuccesfullyRegister}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
