import { useNavigate } from "react-router-dom";
import { createContext, useState , useEffect} from "react";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

const userService = new UserService();
const authService = new AuthService();

export const UserContext = createContext();

export function UsersProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Eliminar usuario por ID
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(userId);
        setUser((prev) => prev.filter((u) => u.id !== userId));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // const handleDeleteUser = (userId) => {
  //   if (window.confirm("Estas seguro que quieres eliminar este usuario?")) {
  //     userService
  //       .deleteUser(userId)
  //       .then(() => {
  //         const updateUser = user.filter((user) => user.id !== userId);
  //         setUser(updateUser);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };
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

  // Registrar un nuevo usuario
  const validateAndSubmit = async (userData) => {
    let tempErrors = {};
    tempErrors.name = userData.name ? "" : "Name is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(userData.email)
      ? ""
      : "Invalid email format.";
    tempErrors.password =
      userData.password.length >= 6 ? "" : "Password must be at least 6 characters long.";
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      try {
        await authService.registerUser(userData);
        alert("User registered successfully");
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user");
      }
    }
  };
  // const validateAndSubmit = (event) => {
  //   event.preventDefault();

  //   let tempErrors = {};
  //   tempErrors.Name = formDataRegister.Name ? "" : "Name is required.";
  //   tempErrors.Email = /\S+@\S+\.\S+/.test(formDataRegister.Email)
  //     ? ""
  //     : "Invalid email format.";
  //   tempErrors.Password =
  //     formDataRegister.Password.length >= 6
  //       ? ""
  //       : alert("Password must be at least 6 characters long.");
  //   setErrors(tempErrors);

  //   if (Object.values(tempErrors).every((x) => x === "")) {
  //     authService
  //       .registerUser({
  //         name: formDataRegister.Name,
  //         email: formDataRegister.Email,
  //         password: formDataRegister.Password,
  //         role: formDataRegister.Role,
  //       })
  //       .then(() => {
  //         alert("User created successfully");
  //         setFormDataRegister({
  //           Name: "",
  //           Email: "",
  //           Password: "",
  //           Role: "",
  //         });
  //         navigate("/users");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         alert("Error creating user: " + error.message);
  //       });
  //   }
  // };

  // Cargar el perfil del usuario logueado desde el token
  const loadProfile = async () => {
    try {
      const userId = authService.getUserIdFromToken();
      if (!userId) {
        console.error("No user ID found in token");
        return;
      }
      const userData = await userService.getUserById(userId);
      setUser(userData);
      console.log("User profile loaded:", userData);
    } catch (error) {
      console.error("Error loading user profile:", error);
      setUser(null);
    }
  };
  // const loadProfile = async (userId) => {
  //   try {
  //     const response = await userService.getUserById(userId);
  //     setUser(response); // Guarda los datos del usuario en el estado
  //     console.log("User loaded:", response);
  //   } catch (error) {
  //     console.error("Error loading user profile:", error);
  //     setUser(null); // Manejo de error
  //   }
  // };

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

  // const validatePassword = async (currentPassword) => {
  //   try {
  //     if (!user || !user.id) {
  //       throw new Error("User is not loaded");
  //     }
  //     const isValid = await authService.validatePassword(
  //       user.id,
  //       currentPassword
  //     );
  //     return isValid;
  //   } catch (error) {
  //     console.error("Error validating password:", error);
  //     return false;
  //   }
  // };

  // const loadProfileByEmail = async (email) => {
  //   try {
  //     const userData = await userService.getUserByEmail(email);
  //     setUser(userData);
  //     console.log("User profile loaded:", userData);
  //   } catch (error) {
  //     console.error("Error loading user profile:", error);
  //     setUser(null);
  //   }
  // };
  
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const email = authService.getEmailFromToken(token); // Asumiendo que tienes un método para obtener el email del token
  //     loadProfileByEmail(email);
  //   }
  // }, []);

   // Cargar el perfil automáticamente al inicio si hay un token
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadProfile();
    }
  }, []);
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
        // validatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
