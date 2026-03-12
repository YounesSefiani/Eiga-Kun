import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import { useNavigate, Link } from "react-router-dom";
import AdminPersonalityModal from "../../../../components/AdminComponents/AdminPersonalityModals/AdminPersonalityModal/AdminPersonalityModal";
import AdminAddPersonality from "../../../../components/AdminComponents/AdminPersonalityModals/AdminAddPersonality/AdminAddPersonality";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./UserAdminPersonalitiesPage.css";

function UserAdminPersonalitiesPage({ setAdminView }) {
  const { user, token, handleAuthError } = useContext(AuthContext);
  const navigate = useNavigate();
  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState(null);
  const [showPersonalityModal, setShowPersonalityModal] = useState(false);
  const [showAddPersonalityModal, setShowAddPersonalityModal] = useState(false);

  useEffect(() => {
    if ((!user || !token) && !handleAuthError) {
      navigate("/");
      return;
    }
    if (user && token) {
      connexion
        .get("/personalities", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPersonalities(response.data);
        })
        .catch((error) => {
          console.error("Error fetching personalities:", error);
        });
    }
  }, [user, token, navigate, handleAuthError]);

  const handleOpenPersonalityModal = async (personality) => {
    const response = await connexion.get(
      `/personalities/${personality.id}/full`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setSelectedPersonality(response.data);
    setShowPersonalityModal(true);
  };

  return (
    <div className="userAdminPersonalitiesPage">
      <div className="userAdminPersonalitiesHeader">
        <h2>Les personnalités</h2>
        <div className="userAdminPersonalitiesActions">
          <button onClick={() => setShowAddPersonalityModal(true)}>
            Ajouter une personnalité
          </button>
          <button onClick={() => setAdminView("admin")}>Retour</button>
        </div>
        {showAddPersonalityModal && (
          <AdminAddPersonality
            onClose={() => setShowAddPersonalityModal(false)}
            onPersonalityAdded={() => {
              connexion
                .get("/personalities", {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                  setPersonalities(response.data);
                  setShowAddPersonalityModal(false);
                })
                .catch((error) => {
                  console.error("Error fetching personalities:", error);
                });
            }}
          />
        )}
      </div>
      <div className="userAdminPersonalitiesSection">
        {personalities && personalities.length > 0 ? (
          personalities.map((personality) => (
            <div
              className="userAdminPersonalityCard"
              key={personality.id}
              title={personality.fullname}
              onClick={() => handleOpenPersonalityModal(personality)}
            >
              <div className="userAdminPersonalityPicture">
                {personality.picture ? (
                  <img
                    src={
                      personality.picture &&
                      personality.picture.startsWith("http")
                        ? personality.picture
                        : `http://localhost:3994/src/assets/Personalities/Pictures/${personality.picture}`
                    }
                    alt={personality.name}
                  />
                ) : (
                  <div className="userAdminPersonalityPicturePlaceHolder">
                    <FontAwesomeIcon icon={faStar} />
                    <span>Aucune image pour le moment</span>
                  </div>
                )}
              </div>
              <p>{personality.fullname}</p>
            </div>
          ))
        ) : (
          <p>Aucune personnalité trouvée.</p>
        )}
      </div>
      <AdminPersonalityModal
        personality={selectedPersonality}
        show={showPersonalityModal}
        onClose={() => setShowPersonalityModal(false)}
        onUpdate={(updatedPersonality) => {
          setSelectedPersonality(updatedPersonality);
          setPersonalities((prev) =>
            prev.map((p) =>
              p.id === updatedPersonality.id ? updatedPersonality : p,
            ),
          );
        }}
        onDelete={() => {}}
      />
    </div>
  );
}

UserAdminPersonalitiesPage.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  handleAuthError: PropTypes.func,
};

export default UserAdminPersonalitiesPage;
