import React, { useState } from "react";
import Inscription from "../Inscription/Inscription";
import Connexion from "../Connexion/Connexion";
import Logo from "../../../assets/EigaKunLogo.png";
import "./Authentification.css";
import Header from "../../Header/Header";

function Authentification() {
  const [view, setView] = useState("initial");

  return (
    <div className="authentificationPage">
      <Header />
      <div className="authContainer">
        <div className="background" />
        {view === "initial" && (
          <div className="initialView">
            <h2>
              {" "}
              Rejoins la communauté de{" "}
              <img src={Logo} alt="Eiga-Kun Logo" className="logo" />
            </h2>{" "}
            <div className="btnContainer">
              <p>Nouveau ? Rejoins-nous !</p>
              <button
                type="button"
                onClick={() => setView("signup")}
                className="authButton"
              >
                Inscription
              </button>
              <p>Déjà parmi nous ? Connecte-toi !</p>
              <button
                type="button"
                onClick={() => setView("login")}
                className="authButton"
              >
                Connexion
              </button>
            </div>
          </div>
        )}
        {view === "signup" && <Inscription setView={setView} />}
        {view === "login" && <Connexion setView={setView} />}
      </div>
    </div>
  );
}

export default Authentification;
