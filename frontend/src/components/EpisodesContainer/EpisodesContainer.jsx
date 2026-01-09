import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "./EpisodesContainer.css";

function EpisodesContainer({ episodes }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMinutes = (duration) => {
    if (!duration) return "";
    const [hh, mm] = duration.split(":");
    return `${parseInt(hh, 10)} h ${mm} min`;
  };

  return (
    <div className="episodesContainer">
      <button onClick={handleShow}>Voir les épisodes</button>
      <Modal
        show={showModal}
        onHide={handleClose}
        className="episodesModalContent"
      >
        <Modal.Header closeButton>
          <Modal.Title>Les épisodes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {episodes.length ? (
            <div className="episodesList">
              {episodes.map((episode) => (
                <div key={episode.id} className="episodeCard">
                  <div className="episodeCardLeft">
                    {episode.episode_image ? (
                      <img src={episode.episode_image} alt={episode.title} />
                    ) : (
                      <div className="episodeImagePlaceHolder">
                        <FontAwesomeIcon icon={faImage} />
                        <p>Aucune image pour le moment.</p>
                      </div>
                    )}
                  </div>
                  <div className="episodeCardRight">
                    <h3>
                      {episode.episode_number} - {episode.title}
                    </h3>
                    <div className="episodeDetails">
                      <p>
                        <b>Date de diffusion :</b>
                        <br />
                        {formatDate(episode.release_date)}
                      </p>
                      <p>
                        <b>Durée de l'épisode :</b>
                        <br />
                        {formatMinutes(episode.duration)}
                      </p>
                    </div>
                    <div className="episodeSynopsis">
                      <p>{episode.synopsis}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun épisode disponible pour le moment.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

EpisodesContainer.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      episode_number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      episode_image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EpisodesContainer;
