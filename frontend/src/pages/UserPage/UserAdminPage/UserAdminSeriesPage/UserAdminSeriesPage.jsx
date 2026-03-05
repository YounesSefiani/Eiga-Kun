import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import connexion from "../../../../services/connexion";
import AdminSerieModal from "../../../../components/AdminComponents/AdminSerieModals/AdminSerieModal/AdminSerieModal";
import AdminAddSerie from "../../../../components/AdminComponents/AdminSerieModals/AdminAddSerie/AdminAddSerie";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import "./UserAdminSeriesPage.css";

function UserAdminSeriesPage({ setAdminView }) {
  const { user, token, handleAuthError } = useContext(AuthContext);
  const [series, setSeries] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [showSerieModal, setShowSerieModal] = useState(false);
  const [showAddSerieModal, setShowAddSerieModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user || !token) && user?.role !== "admin") {
      handleAuthError();
      navigate("/");
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

  const handleOpenSerieModal = async (serie) => {
    const response = await connexion.get(`/series/${serie.id}/full`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedSerie(response.data);
    setShowSerieModal(true);
  };

  const handleUpdateSerie = async () => {
    // Recharger le film complet avec le casting mis à jour
    try {
      const response = await connexion.get(`/series/${selectedSerie.id}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullSerie = response.data;

      setSeries((prevSeries) =>
        prevSeries.map((serie) =>
          serie.id === selectedSerie.id ? fullSerie : serie,
        ),
      );
      setSelectedSerie(fullSerie);
      setShowSerieModal(false);
    } catch (error) {
      console.error("Error reloading serie:", error);
    }
  };

  const handleDeleteSerie = async (serieId) => {
    try {
      await connexion.delete(`/series/${serieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeries((prevSeries) => prevSeries.filter((m) => m.id !== serieId));
      setShowSerieModal(false);
    } catch (error) {
      console.error("Error deleting serie:", error);
    }
  };

  return (
    <div className="userAdminSeriesPage">
      <div className="userAdminSeriesTop">
        <h2>Toutes les séries</h2>
        <div className="userAdminSeriesBtnSection">
          <button onClick={() => setShowAddSerieModal(true)}>Ajouter une série</button>
          <button onClick={() => setAdminView("admin")}>Retour</button>
        </div>
      </div>
      {showAddSerieModal && (
        <AdminAddSerie
          onClose={() => setShowAddSerieModal(false)}
          onSerieAdded={() => {
            connexion
              .get(`/series`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                setSeries(response.data);
                setShowAddSerieModal(false);
              })
              .catch((error) => {
                console.error("Error fetching series after adding:", error);
              });
          }}
        />
      )}
      <div className="userAdminSeriesSection">
        {series.map((serie) => (
          <div
            className="userAdminSerieCard"
            key={serie.id}
            title={serie.title}
            onClick={() => handleOpenSerieModal(serie)}
          >
            <div className="userAdminSeriePoster">
              {serie.poster ? (
                <img
                  src={
                    serie.poster && serie.poster.startsWith("http")
                      ? serie.poster
                      : serie.poster
                        ? `http://localhost:3994/src/assets/Series/Posters/${serie.poster}`
                        : ""
                  }
                  alt={serie.title}
                />
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
      <AdminSerieModal
        serie={selectedSerie}
        show={showSerieModal}
        onClose={() => setShowSerieModal(false)}
        onUpdate={handleUpdateSerie}
        onDelete={handleDeleteSerie}
      />
    </div>
  );
}

UserAdminSeriesPage.propTypes = {
  setAdminView: PropTypes.func.isRequired,
};

export default UserAdminSeriesPage;
