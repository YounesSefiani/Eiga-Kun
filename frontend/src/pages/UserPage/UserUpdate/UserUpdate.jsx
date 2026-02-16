import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../services/UserContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import connexion from "../../../services/connexion";
import "./UserUpdate.css";

function UserUpdate({ setView }) {
  const { user, token, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formUserUpdate, setFormUserUpdate] = useState({
    username: user?.username || "",
    avatar: user?.avatar || "",
    email: user?.email || "",
    currentPassword: "",
    password: "",
    confirmNewPassword: "",
  });

  const handleUpdate = (event) => {
    const { name, files, value } = event.target;

    if (name === "avatar" && files && files.length > 0) {
      setFormUserUpdate({
        ...formUserUpdate,
        [name]: files[0],
      });
    } else {
      setFormUserUpdate({
        ...formUserUpdate,
        [name]: value,
      });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const userData = new FormData();
    if (formUserUpdate.username !== user.username)
      userData.append("username", formUserUpdate.username);
    if (formUserUpdate.avatar !== user.avatar)
      userData.append("avatar", formUserUpdate.avatar);
    if (formUserUpdate.password) {
      userData.append("currentPassword", formUserUpdate.currentPassword);
      userData.append("password", formUserUpdate.password);
      userData.append("confirmNewPassword", formUserUpdate.confirmNewPassword);
    }

    try {
      const response = await connexion.put(`/users/${user.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUserData = response.data.user;

      updateUser(updatedUserData, token);
      toast.success("Profil mis à jour avec succès !");
      setTimeout(() => {
        setView("user");
      }, 4000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="userUpdatePage">
      <title>{`Paramètres du compte de "${user.username}" - EigaKun`}</title>
      <div className="userUpdateHeader">
        <h2>Paramètres du compte</h2>
        <button onClick={() => setView("user")}>Retour</button>
      </div>
      <form className="userUpdateForm" onSubmit={handleUpdateSubmit}>
        <label>
          Username :
          <input
            type="text"
            name="username"
            value={formUserUpdate.username}
            onChange={handleUpdate}
          />
        </label>
        <label>
          Avatar :
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleUpdate}
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            name="email"
            disabled
            value={formUserUpdate.email}
            onChange={handleUpdate}
          />
        </label>
        <label>
          Current Password :
          <input
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            value={formUserUpdate.currentPassword}
            onChange={handleUpdate}
          />
        </label>
        <label>
          Nouveau mot de passe :
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formUserUpdate.password}
            onChange={handleUpdate}
          />
        </label>
        <label>
          Confirmation du nouveau mot de passe :
          <input
            type={showPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={formUserUpdate.confirmNewPassword}
            onChange={handleUpdate}
          />
        </label>
        <div className="userUpdateBtnSection">
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Mise à jour en cours..." : "Mettre à jour"}
          </button>
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword
              ? "Masquer les mots de passe"
              : "Afficher les mots de passe"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

UserUpdate.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default UserUpdate;
