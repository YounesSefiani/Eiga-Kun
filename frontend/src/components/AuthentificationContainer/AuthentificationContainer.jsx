import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import connexion from "../../services/connexion";
import { AuthContext } from "../../services/UserContext/AuthContext";
import "./AuthentificationContainer.css";

function AuthentificationContainer() {
  const [view, setView] = useState("initial");
  const [userAuth, setUserAuth] = useState({
    username: "",
    email: "",
    birthdate: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const userLoginForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [credientials, setCredentials] = useState(userLoginForm);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forgotPassword = async () => {
    if (credientials.email === "") {
      toast.error("Veuillez entrer votre adresse e-mail.");
    } else {
      toast.success(
        "Un e-mail de réinitialisation du mot de passe a été envoyé."
      );
      await connexion.post("/users/forgot-password", { email: credientials.email } );
    }
  }

  const handleAuthSubmit = (event) => {
    const { name, files, value } = event.target;

    if (name === "avatar" && files && files.length > 0) {
      setUserAuth((prevUserAuth) => ({
        ...prevUserAuth,
        [name]: files[0],
      }));
    } else {
      setUserAuth((prevUserAuth) => ({
        ...prevUserAuth,
        [name]: value,
      }));
    }
  };

  const handleUserLogin = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginRequest = async (event) => {
    event.preventDefault();

    try {
      const response = await connexion.post("/users/login", credientials);

      const { user, token } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user));

      login(user, token);

      toast.success("Connexion réussie !");
      setTimeout(() => {
        navigate(`/user/${token}`);
      }, 5000);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Connexion echouée !");
    }
  };

  const handleAuthInscription = async (event) => {
    event.preventDefault();

    const userAuthFormData = new FormData();
    userAuthFormData.append("username", userAuth.username);
    userAuthFormData.append("email", userAuth.email);
    userAuthFormData.append("birthdate", userAuth.birthdate);
    userAuthFormData.append("avatar", userAuth.avatar);
    userAuthFormData.append("password", userAuth.password);
    userAuthFormData.append("confirmPassword", userAuth.confirmPassword);

    try {
      await connexion.post("/users", userAuthFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Inscription réussie !");
      setUserAuth({
        username: "",
        email: "",
        birthdate: "",
        avatar: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setView("initial");
      }, 5000);
    } catch (error) {
      let errorList = [];

      // Si c'est une réponse HTML d'erreur
      if (
        error.response?.data &&
        typeof error.response.data === "string" &&
        error.response.data.includes("<pre>")
      ) {
        // Extraire le message d'erreur du HTML
        const match = error.response.data.match(/<pre>(.*?)<br>/s);
        if (match && match[1]) {
          const errorText = match[1].replace(/Error: /, "").trim();
          errorList = errorText
            .split(" // ")
            .filter((err) => err.trim() !== "");
        }
      }
      // Si c'est une réponse JSON normale
      else if (error.response?.data?.error) {
        const errorMsg = error.response.data.error;
        errorList = errorMsg.split(" // ").filter((err) => err.trim() !== "");
      }

      // Si aucune erreur n'a été récupérée, afficher un message générique
      if (errorList.length === 0) {
        errorList = ["Une erreur s'est produite lors de l'inscription."];
      }

      toast.error(errorList.join(" • "));
    }
  };

  return (
    <div className="authentificationContainer">
      {view === "initial" && (
        <div className="authInitialView">
          <button onClick={() => setView("login")}>Se connecter</button>
          <button onClick={() => setView("register")}>S'inscrire</button>
        </div>
      )}
      {view === "login" && (
        <div className="authLoginView">
          <form className="authLoginForm" onSubmit={handleLoginRequest}>
            <label>
              E-mail :
              <input
                type="email"
                id="email"
                name="email"
                value={credientials.email}
                onChange={handleUserLogin}
                required
                placeholder="Nom d'utilisateur"
              />
            </label>
            <label>
              Mot de passe
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credientials.password}
                onChange={handleUserLogin}
                required
                placeholder="Mot de passe"
              />
              <p onClick={forgotPassword}>Mot de passe oublié ?</p>
            </label>
            <div className="btnSection">
              <button type="submit">Se connecter</button>
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword
                  ? "Cacher le mot de passe"
                  : "Afficher le mot de passe"}
              </button>
              <button
                type="button"
                onClick={() => setView("initial")}
                className="backBtn"
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      )}
      {view === "register" && (
        <div className="authRegisterView">
          <form className="authRegisterForm" onSubmit={handleAuthInscription}>
            <label>
              Nom d'utilisateur
              <input
                type="text"
                id="username"
                name="username"
                value={userAuth.username}
                required
                onChange={handleAuthSubmit}
                placeholder="Nom d'utilisateur"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={userAuth.email}
                required
                onChange={handleAuthSubmit}
                placeholder="Email"
              />
            </label>
            <label>
              Date de naissance
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={userAuth.birthdate}
                required
                onChange={handleAuthSubmit}
                placeholder="Date de naissance"
              />
            </label>
            <label>
              Avatar
              <input
                type="file"
                accept="image/*"
                id="avatar"
                name="avatar"
                onChange={handleAuthSubmit}
              />
            </label>
            <label>
              <span className="passwordLabelContainer">
                Mot de passe
                <span className="passwordTooltipWrapper">
                  <span className="passwordInfoIcon">?</span>
                  <span className="passwordTooltip">
                    Le mot de passe doit contenir :
                    <ul>
                      <li>Entre 8 et 16 caractères</li>
                      <li>Au moins une lettre majuscule</li>
                      <li>Au moins une lettre minuscule</li>
                      <li>Au moins un caractère spécial (!@#$%^&*...)</li>
                    </ul>
                  </span>
                </span>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userAuth.password}
                required
                onChange={handleAuthSubmit}
                placeholder="Mot de passe"
              />
            </label>
            <label>
              Confirmer le mot de passe
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={userAuth.confirmPassword}
                required
                onChange={handleAuthSubmit}
                placeholder="Confirmer le mot de passe"
              />
            </label>
            <div className="btnSection">
              <button type="submit">S'inscrire</button>
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword
                  ? "Cacher le mot de passe"
                  : "Afficher le mot de passe"}
              </button>
              <button
                type="button"
                onClick={() => setView("initial")}
                className="backBtn"
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AuthentificationContainer;
