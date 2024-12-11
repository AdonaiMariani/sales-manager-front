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
        .registerUser({
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

  const loadProfile = async (userId) => {
    try {
      const response = await userService.getUserById(userId);
      setUser(response); // Guarda los datos del usuario en el estado
    } catch (error) {
      console.error("Error loading user profile:", error);
      setUser(null); // Manejo de error
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { id, role, ...profileFields } = profileData; // Excluye el campo "role"
      await userService.updateUser(id, profileFields); // Llama al servicio para actualizar el perfil
      setUser((prev) => ({ ...prev, ...profileFields })); // Actualiza el contexto
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
  };

  const validatePassword = async (currentPassword) => {
    try {
      if (!user || !user.id) {
        throw new Error("User is not loaded");
      }
      const isValid = await authService.validatePassword(
        user.id,
        currentPassword
      );
      return isValid;
    } catch (error) {
      console.error("Error validating password:", error);
      return false;
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
        loadProfile,
        updateProfile,
        validatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
