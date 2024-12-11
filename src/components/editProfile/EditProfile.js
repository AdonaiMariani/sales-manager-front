// import React, { useContext, useEffect, useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import "./EditProfile.css";

// const EditProfile = () => {
//   const { user, loadProfile, updateProfile, validatePassword, handleInputChange } =
//     useContext(UserContext);
//   const { state: themeState } = useTheme();
//   const navigate = useNavigate();

//   const [originalUser, setOriginalUser] = useState(null);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   // Load user profile when the component mounts
//   useEffect(() => {
//     const userId = localStorage.getItem("userId"); // Ensure userId is stored in localStorage
//     if (userId) {
//       loadProfile(userId); // Call loadProfile from context
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setOriginalUser({ ...user });
//     }
//   }, [user]);

//   const togglePasswordVisibility = (field) => {
//     setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate new password
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match.");
//       return;
//     }

//     // Validate current password
//     const isValidPassword = await validatePassword(currentPassword);
//     if (!isValidPassword) {
//       alert("Current password is incorrect.");
//       return;
//     }

//     // Confirm changes and update profile
//     const changes = Object.keys(user).filter(
//       (key) => user[key] !== originalUser[key]
//     );
//     const confirmMessage = changes
//       .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
//       .join("\n");
//     if (
//       window.confirm(
//         `Are you sure you want to make these changes?\n\n${confirmMessage}`
//       )
//     ) {
//       const updatedData = { ...user, password: newPassword };
//       await updateProfile(updatedData);
//       navigate("/profile");
//     }
//   };

//   const hasChanges = () => {
//     return (
//       originalUser &&
//       Object.keys(user).some((key) => user[key] !== originalUser[key])
//     );
//   };

//   if (!user) {
//     return <div>Loading user profile...</div>;
//   }

//   return (
//     <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
//       <div
//         className={`card-header ${
//           themeState.darkMode ? "dark-mode" : ""
//         } d-flex justify-content-between`}
//       >
//         <h3>Edit Profile</h3>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/home")}
//         >
//           Cancel
//         </button>
//       </div>
//       <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={user.name || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={user.email || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Current Password
//             </label>
//             <div className="password-container">
//               <input
//                 type={showPassword.current ? "text" : "password"}
//                 className="form-control"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility("current")}
//                 className="toggle-password"
//               >
//                 {showPassword.current ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               New Password
//             </label>
//             <div className="password-container">
//               <input
//                 type={showPassword.new ? "text" : "password"}
//                 className="form-control"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility("new")}
//                 className="toggle-password"
//               >
//                 {showPassword.new ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Confirm New Password
//             </label>
//             <div className="password-container">
//               <input
//                 type={showPassword.confirm ? "text" : "password"}
//                 className="form-control"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility("confirm")}
//                 className="toggle-password"
//               >
//                 {showPassword.confirm ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//           <button type="submit" className="btn btn-primary"disabled={!hasChanges()} >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const { user, updateProfile, validatePassword, handleInputChange } =
    useContext(UserContext);
  const { state: themeState } = useTheme();
  const navigate = useNavigate();

  const [originalUser, setOriginalUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setOriginalUser({ ...user });
    }
  }, [user]);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que las contraseñas sean iguales
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // Validar contraseña actual usando el contexto
    const isValidPassword = await validatePassword(currentPassword);
    if (!isValidPassword) {
      alert("Current password is incorrect.");
      return;
    }

    // Actualizar perfil usando el contexto
    const changes = Object.keys(user).filter(
      (key) => user[key] !== originalUser[key]
    );
    const confirmMessage = changes
      .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
      .join("\n");
    if (
      window.confirm(
        `Are you sure you want to make these changes?\n\n${confirmMessage}`
      )
    ) {
      const updatedData = { ...user, password: newPassword };
      updateProfile(updatedData);
      navigate("/profile");
    }
  };

  const hasChanges = () => {
    return (
      originalUser &&
      Object.keys(user).some((key) => user[key] !== originalUser[key])
    );
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
      <div
        className={`card-header ${
          themeState.darkMode ? "dark-mode" : ""
        } d-flex justify-content-between`}
      >
        <h3>Edit Profile</h3>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/home")}
        >
          Cancel
        </button>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Current Password
            </label>
            <div className="password-container">
              <input
                type={showPassword.current ? "text" : "password"}
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="toggle-password"
              >
                {showPassword.current ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              New Password
            </label>
            <div className="password-container">
              <input
                type={showPassword.new ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="toggle-password"
              >
                {showPassword.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Confirm New Password
            </label>
            <div className="password-container">
              <input
                type={showPassword.confirm ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="toggle-password"
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;


// //anda pero no muesra ni valida contraseñas
// import React, { useContext, useEffect, useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import "./EditProfile.css";

// const EditProfile = () => {
//   const { user, loadProfile, updateProfile, handleInputChange } =
//     useContext(UserContext);
//   const { state: themeState } = useTheme();
//   const navigate = useNavigate();

//   const [originalUser, setOriginalUser] = useState(null);

//   useEffect(() => {
//     const userId = 1; // Aquí puedes obtener dinámicamente el ID del usuario
//     loadProfile(userId);
//   }, [loadProfile]);

//   useEffect(() => {
//     if (user) {
//       setOriginalUser({ ...user });
//     }
//   }, [user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const changes = Object.keys(user).filter(
//       (key) => user[key] !== originalUser[key]
//     );
//     const confirmMessage = changes
//       .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
//       .join("\n");
//     if (
//       window.confirm(
//         `Are you sure you want to make these changes?\n\n${confirmMessage}`
//       )
//     ) {
//       const { id, ...updatedData } = user; // Excluir el ID al enviar los datos
//       updateProfile(id, updatedData);
//       navigate("/profile");
//     }
//   };

//   if (!user) {
//     return <div>Loading user profile...</div>;
//   }

//   return (
//     <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
//       <div
//         className={`card-header ${
//           themeState.darkMode ? "dark-mode" : ""
//         } d-flex justify-content-between`}
//       >
//         <h3>Edit Profile</h3>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/home")}
//         >
//           Cancel
//         </button>
//       </div>
//       <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>Id</label>
//             <input
//               type="text"
//               className="form-control"
//               name="id"
//               value={user.id}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={user.name || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={user.email || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={user.password || ""}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

// import React, { useContext, useEffect, useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import "./EditProfile.css";

// const EditProfile = () => {
//   const { user, updateProfile, handleInputChange, errors } =
//     useContext(UserContext);
//   const { state: themeState } = useTheme();
//   const navigate = useNavigate();

//   const [originalUser, setOriginalUser] = useState(null);

//   useEffect(() => {
//     console.log("User data in context:", user);
//     if (user) {
//       setOriginalUser({ ...user });
//       console.log("Original user data:", originalUser);
//     }
//   }, [user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const changes = Object.keys(user).filter(
//       (key) => user[key] !== originalUser[key]
//     );
//     const confirmMessage = changes
//       .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
//       .join("\n");
//     if (
//       window.confirm(
//         `Are you sure you want to make these changes?\n\n${confirmMessage}`
//       )
//     ) {
//       updateProfile(user); // Llama a la función específica del contexto
//       navigate("/profile");
//     }
//   };

//   const hasChanges = () => {
//     return (
//       originalUser &&
//       Object.keys(user).some((key) => user[key] !== originalUser[key])
//     );
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
//       <div
//         className={`card-header ${
//           themeState.darkMode ? "dark-mode" : ""
//         } d-flex justify-content-between`}
//       >
//         <h3>Edit Profile</h3>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/home")}
//         >
//           Cancel
//         </button>
//       </div>
//       <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>Id</label>
//             <input
//               type="text"
//               className="form-control"
//               name="id"
//               value={user.id || ""}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Name
//             </label>
//             <input
//               type="text"
//               className={`form-control ${errors.Name ? "is-invalid" : ""}`}
//               name="Name"
//               value={user.Name || ""}
//               onChange={handleInputChange}
//             />
//             {errors.Name && (
//               <div className="invalid-feedback">{errors.Name}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Email
//             </label>
//             <input
//               type="email"
//               className={`form-control ${errors.Email ? "is-invalid" : ""}`}
//               name="Email"
//               value={user.Email || ""}
//               onChange={handleInputChange}
//             />
//             {errors.Email && (
//               <div className="invalid-feedback">{errors.Email}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Password
//             </label>
//             <input
//               type="password"
//               className={`form-control ${errors.Password ? "is-invalid" : ""}`}
//               name="Password"
//               value={user.Password || ""}
//               onChange={handleInputChange}
//             />
//             {errors.Password && (
//               <div className="invalid-feedback">{errors.Password}</div>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={!hasChanges()}
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



// import React, { useContext, useEffect, useState } from "react";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import "./EditProfile.css";

// const EditProfile = () => {
//   const { user, handleInputChange, errors, validateAndSubmit } =
//     useContext(UserContext);
//   const { state: themeState } = useTheme();
//   const navigate = useNavigate();

//   const [originalUser, setOriginalUser] = useState(null);

//   useEffect(() => {
//     if (user) {
//       setOriginalUser({ ...user });
//     }
//   }, [user]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const changes = Object.keys(user).filter(
//       (key) => user[key] !== originalUser[key]
//     );
//     const confirmMessage = changes
//       .map((key) => `${key}: ${originalUser[key]} => ${user[key]}`)
//       .join("\n");
//     if (
//       window.confirm(
//         `Are you sure you want to make these changes?\n\n${confirmMessage}`
//       )
//     ) {
//       validateAndSubmit(event); // Submit handled through the context
//       navigate("/profile");
//     }
//   };

//   const hasChanges = () => {
//     return (
//       originalUser &&
//       Object.keys(user).some((key) => user[key] !== originalUser[key])
//     );
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={`card ${themeState.darkMode ? "dark-mode" : ""}`}>
//       <div
//         className={`card-header ${
//           themeState.darkMode ? "dark-mode" : ""
//         } d-flex justify-content-between`}
//       >
//         <h3>Edit Profile</h3>
//         <button
//           className="btn btn-secondary"
//           onClick={() => navigate("/home")}
//         >
//           Cancel
//         </button>
//       </div>
//       <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>Id</label>
//             <input
//               type="text"
//               className="form-control"
//               name="id"
//               value={user.id}
//               readOnly
//             />
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Name
//             </label>
//             <input
//               type="text"
//               className={`form-control ${errors.Name ? "is-invalid" : ""}`}
//               name="Name"
//               value={user.Name}
//               onChange={handleInputChange}
//             />
//             {errors.Name && (
//               <div className="invalid-feedback">{errors.Name}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Email
//             </label>
//             <input
//               type="email"
//               className={`form-control ${errors.Email ? "is-invalid" : ""}`}
//               name="Email"
//               value={user.Email}
//               onChange={handleInputChange}
//             />
//             {errors.Email && (
//               <div className="invalid-feedback">{errors.Email}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <label className={themeState.darkMode ? "dark-mode" : ""}>
//               Password
//             </label>
//             <input
//               type="password"
//               className={`form-control ${errors.Password ? "is-invalid" : ""}`}
//               name="Password"
//               value={user.Password}
//               onChange={handleInputChange}
//             />
//             {errors.Password && (
//               <div className="invalid-feedback">{errors.Password}</div>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={!hasChanges()}
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
