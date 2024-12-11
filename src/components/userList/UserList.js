import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";
import { useTheme } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { UserService } from "../../services/UserService";

const userService = new UserService();

const UserList = () => {
  const { state: themeState } = useTheme();
  const { user, setUser, searchTerm, setSearchTerm, handleDeleteUser } =
    useContext(UserContext);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={`card ${themeState.darkMode ? "" : ""}`}>
      <div className={`card-header ${themeState.darkMode ? "" : ""}`}>
        <h3 className="text-black">Users</h3>
        <div>
          <Link className="btn btn-success" to="/newUser">
            New Product
          </Link>
        </div>
      </div>
      <div className={`card-body ${themeState.darkMode ? "" : ""}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
          className={`form-control ${themeState.darkMode ? "" : ""}`}
        />
        <table className="table">
          <thead>
            <tr>
              <th className="id-column">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th className="email-column">Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user
              .filter((user) =>
                Object.values(user).some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
              )
              .map((user) => (
                <tr key={user.id}>
                  <td className="id-column">{user.id}</td>
                  <td className="name-column">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="email-column">{user.role}</td>
                  <td className="button-container">
                    <Link
                      className="btn btn-primary"
                      to={`/customers/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default UserList;
