import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import { UserService } from "../../services/UserService";

const userService = new UserService();

const EditUser = () => {
  const { state: themeState } = useTheme();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [originalUser, setOriginalUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserById(id)
      .then((data) => {
        setUser(data);
        setOriginalUser(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(user).filter(
      (key) => user[key] !== originalUser[key]
    );
    const confirmMessage = changes
      .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
      .join("\n");
    if (
      window.confirm(
        `Estas seguro que quieres realizar estos cambios?\n\n${confirmMessage}`
      )
    ) {
      userService
        .updateUser(id, user)
        .then(() => {
          alert("Usuario actualizado con éxito");
          setTimeout(() => {
            navigate("/users");
          }, 400);
        })
        .catch((error) => console.error(error));
    }
  };

  const hasChanges = () => {
    return (
      originalUser &&
      Object.keys(user).some((key) => user[key] !== originalUser[key])
    );
  };

  const thisUser = localStorage.getItem("email") === user.email;

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div
        className={`card-header ${
          themeState.darkMode ? "dark-mode" : ""
        } d-flex justify-content-between`}
      >
        <h3>Editar Usuario</h3>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/users")}
        >
          Cancelar
        </button>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>Id</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={user.id}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={thisUser}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Rol
            </label>
            <input
              type="text"
              className="form-control"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              disabled /* Siempre deshabilitado */
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!hasChanges()}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
