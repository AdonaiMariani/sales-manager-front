import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import { AuthService, UserService } from "../services/UserService";

const userService = new UserService();
const authService = new AuthService();

export const UserContext = createContext();

export function UsersProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleDeleteUser = (userId) => {
    if (window.confirm("Estas seguro que quieres eliminar este usuario?")) {
      userService
        .deleteUser(userId)
        .then(() => {
          const updateUser = user.filter((user) => user.id !== userId);
          setUser(updateUser);
        })
        .catch((error) => console.error(error));
    }
  };
  const [formDataRegister, setFormDataRegister] = useState({
    Name: "",
    Email: "",
    Password: "",
    Role: "USER",
  });

  const handleInputChange = (event) => {
    setFormDataRegister({
      ...formDataRegister,
      [event.target.name]: event.target.value,
    });
  };

  const [errors, setErrors] = useState({});
  const validateAndSubmit = (event) => {
    event.preventDefault();

    let tempErrors = {};
    tempErrors.Name = formDataRegister.Name ? "" : "Name is required.";
    tempErrors.Email = /\S+@\S+\.\S+/.test(formDataRegister.Email)
      ? ""
      : "Invalid email format.";
    tempErrors.Password =
      formDataRegister.Password.length >= 6
        ? ""
        : alert("Password must be at least 6 characters long.");
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      authService
        .authUser({
          name: formDataRegister.Name,
          email: formDataRegister.Email,
          password: formDataRegister.Password,
          role: formDataRegister.Role,
        })
        .then(() => {
          alert("User created successfully");
          setFormDataRegister({
            Name: "",
            Email: "",
            Password: "",
            Role: "",
          });
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          alert("Error creating user: " + error.message);
        });
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        searchTerm,
        formDataRegister,
        errors,
        setFormDataRegister,
        setUser,
        setSearchTerm,
        handleDeleteUser,
        handleInputChange,
        validateAndSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
