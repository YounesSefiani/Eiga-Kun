import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import connexion from "../../../../services/connexion";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import "./UserAdminSeriesPage.css";

function UserAdminSeriesPage({ setAdminView }) {
    const {user, token, handleAuthError} = useContext(AuthContext);
    const [series, setSeries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if ((!user || !token) && user?.role !== 'admin') {
            handleAuthError();
            navigate('/');
            return;
        } else {
            connexion
            .get("/series", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setSeries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching series:", error);
            });
        }
    }, [user, token, navigate, handleAuthError]);
  return (
    <div className="userAdminSeriesPage">
      <div className="userAdminSeriesTop">
        <h2>Toutes les séries</h2>
        <div className="userAdminSeriesBtnSection">
          <button>Ajouter une série</button>
          <button onClick={() => setAdminView("admin")}>Retour</button>
        </div>
      </div>
      <div className="userAdminSeriesSection">
        {series.map((serie) => (
            <div className="userAdminSerieCard" key={serie.id}
            title={serie.title}>
                <div className="userAdminSeriePoster">
                    {serie.poster ? (
                        <img src={serie.poster && serie.poster.startsWith("http") ? serie.poster : serie.poster ? `http://localhost:3994/src/assets/Series/Posters/${serie.poster}` : ""} alt={serie.title} />
                    ) : (
                        <div className="userAdminSeriePosterHolder">
                            <FontAwesomeIcon icon={faTv} />
                            <p>Aucune affiche disponible pour le moment.</p>
                        </div>
                    )}
                </div>
                <h3>{serie.title}</h3>
            </div>
        ))}
      </div>
    </div>
  );
}

UserAdminSeriesPage.propTypes = {
  setAdminView: PropTypes.func.isRequired,
};

export default UserAdminSeriesPage;
