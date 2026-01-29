import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import connexion from "../../../services/connexion";
import { ToastContainer, toast } from "react-toastify";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const [userNewPassword, setUserNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();
  const { token: resetToken } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserNewPassword({
      ...userNewPassword,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userNewPassword.newPassword !== userNewPassword.confirmNewPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await connexion.post(`/users/reset-password/${resetToken}`, {
        newPassword: userNewPassword.newPassword,
      });
      toast.success("Mot de passe réinitialisé avec succès !");
      setUserNewPassword({
        newPassword: "",
        confirmNewPassword: "",
      });
      setTimeout(() => {
        navigate("/auth");
      }, 4000);
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la réinitialisation du mot de passe.",
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="resetPasswordPage">
      <div className="resetPasswordLeft"></div>
      <div className="resetPasswordRight">
        <h2>Laisse-moi deviner, tu as oublié ton mot de passe ?</h2>
        <h3>Pas de problème ! Tu peux refaire ton mot de passe ici.</h3>
        <form className="resetPasswordForm" onSubmit={handleSubmit}>
          <label>
            Nouveau mot de passe
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              value={userNewPassword.newPassword}
              required
            />
          </label>
          <label>
            Confirmer le nouveau mot de passe
            <input
              type={showPassword ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              onChange={handleChange}
              value={userNewPassword.confirmNewPassword}
              required
            />
          </label>
          <div className="resetPasswordBtnSection">
            <button type="submit">Réinitialiser le mot de passe</button>
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword
                ? "Cacher le mot de passe"
                : "Afficher le mot de passe"}
            </button>
          </div>
        </form>
        <div className="resetPasswordAdvices">
          <h4>Conseils pour un mot de passe sécurisé :</h4>
          <ul>
            <li>Le mot de passe doit faire entre 8 à 16 caractères.</li>
            <li>
              Il faut qu'il y ait au moins une lettre minuscule et une lettre
              majuscule.
            </li>
            <li>Ajoute des chiffres.</li>
            <li>Utilise des caractères spéciaux (!@#$%^&*).</li>
            <li>
              Et bien sûr, évite les mots de passe du style "12345", "mot de
              passe" ou encore ta date de naissance.
            </li>
          </ul>
          <p>
            Un mot de passe long et fort sera un mot de passe compliqué pour les
            petits voleurs.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPasswordPage;
