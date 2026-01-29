import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import validationLoading from "../../../assets/ValidationLoading.png";
import validationSuccess from "../../../assets/ValidationSuccess.png";
import connexion from "../../../services/connexion";
import "./ValidationAuthPage.css";

function ValidationPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleValidate = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await connexion.get(
        `http://localhost:3994/api/users/verify/${token}`,
      );
      setStatus("success");
      setMessage(res.data.message || "Votre compte a bien été validé !");
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message ||
          "Erreur lors de la validation du compte.",
      );
    }
  };

  return (
    <div className="validationAuthPage">
      <div className="validationAuthPageLeft">
        {status === "idle" && (
          <img src={validationLoading} alt="Validation en cours" />
        )}
        {status === "success" && (
          <img
            src={validationSuccess}
            alt="Logo Eiga-Kun"
            className="validationSuccess"
          />
        )}
        {status === "error" && (
          <img src={validationLoading} alt="Validation en cours" />
        )}
      </div>
      <div className="validationAuthPageRight">
        <h2>Validation du compte</h2>
        <h3>
          Cliquez sur le bouton pour valider votre inscription.
          <br />
          Ce lien est à usage unique.
        </h3>
        <div className="validationAuthContainer">
          {status === "idle" && (
            <button onClick={handleValidate}>Valider mon compte</button>
          )}
          {status === "loading" && <p>Validation en cours...</p>}
          {status === "error" && (
            <button onClick={handleValidate}>Réessayer</button>
          )}

          {status === "success" && (
            <>
              <p className="success">{message}</p>
              <button type="button">
                <Link to="/auth" className="link-auth">
                  Se connecter
                </Link>
              </button>
            </>
          )}
          {status === "error" && <p className="error">{message}</p>}
          {status === "idle" && (
            <p className="info">En attente de validation...</p>
          )}
          {status === "loading" && (
            <p className="info">Veuillez patienter...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ValidationPage;
