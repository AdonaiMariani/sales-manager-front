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
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Cancel
        </button>
      </div>
      <div className={`card-body ${themeState.darkMode ? "dark-mode" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className={themeState.darkMode ? "dark-mode" : ""}>
              Email
            </label>
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
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
