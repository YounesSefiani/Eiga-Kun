import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../services/UserContext/AuthContext";
import connexion from "../../../../../services/connexion";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPenSquare,
  faTrash,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminEditEpisodesModal.css";

function AdminEditEpisodesModal({
  episodes,
  onClose,
  onUpdate,
  onDelete,
  serieId,
  seasonId,
  seasonNumber,
  serieTitle,
}) {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [localEpisodes, setLocalEpisodes] = useState(episodes || []);
  const [episodeEditForm, setEpisodeEditForm] = useState({
    episode_number: episodes.episode_number || "",
    title: episodes.title || "",
    episode_image: episodes.episode_image || "",
    release_date: episodes.release_date || "",
    duration: episodes.duration || "",
    synopsis: episodes.synopsis || "",
  });

  const [episodeAddForm, setEpisodeAddForm] = useState({
    episode_number: "",
    title: "",
    episode_image: "",
    release_date: "",
    duration: "",
    synopsis: "",
  });

  const [episodeImageInput, setEpisodeImageInput] = useState({
    url: "",
    file: null,
  });

  const handleEpisodeSubmit = (e) => {
    const { name, value } = e.target;
    setEpisodeEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEpisodeAddSubmit = (e) => {
    const { name, value } = e.target;
    setEpisodeAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEpisodeAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("serie_id", serieId);
    formData.append("season_id", seasonId);
    formData.append("episode_number", episodeAddForm.episode_number);
    formData.append("title", episodeAddForm.title);
    formData.append("synopsis", episodeAddForm.synopsis);
    formData.append("release_date", episodeAddForm.release_date);
    formData.append("duration", episodeAddForm.duration);

    if (episodeImageInput.file) {
      formData.append("episode_image", episodeImageInput.file);
    } else if (episodeImageInput.url) {
      formData.append("episode_image", episodeImageInput.url);
    }

    try {
      const response = await connexion.post("/episodes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const newEpisodeId = response.data.id;
      if (newEpisodeId) {
        const episodeResponse = await connexion.get(
          `/episodes/${newEpisodeId}`,
        );
        const createdEpisode = episodeResponse.data;
        setLocalEpisodes((prev) => [...prev, createdEpisode]);
      }
      toast.success("Épisode ajouté avec succès !");
      setEpisodeAddForm({
        episode_number: "",
        title: "",
        episode_image: "",
        release_date: "",
        duration: "",
        synopsis: "",
      });
      setEpisodeImageInput({
        url: "",
        file: null,
      });
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'ajout de l'épisode.");
    }
  };

  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !token) {
      window.location.href = "/";
    }
  }, [user, token]);

  useEffect(() => {
    setLocalEpisodes(episodes);
  }, [episodes]);

  console.log("Episodes dans AdminEditEpisodesModal :", episodes);

  const handleUpdateEpisode = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("serie_id", serieId);
    formData.append("season_id", seasonId);
    formData.append("episode_number", episodeEditForm.episode_number);
    formData.append("title", episodeEditForm.title);
    formData.append("synopsis", episodeEditForm.synopsis);
    formData.append("release_date", episodeEditForm.release_date);
    formData.append("duration", episodeEditForm.duration);

    if (episodeImageInput.file) {
      formData.append("episode_image", episodeImageInput.file);
    } else if (episodeImageInput.url) {
      formData.append("episode_image", episodeImageInput.url);
    }

    try {
      await connexion.put(`/episodes/${isEditing}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const episodeResponse = await connexion.get(`/episodes/${isEditing}`);
      const updatedEpisode = episodeResponse.data;

      setLocalEpisodes((prev) =>
        prev.map((ep) => (ep.id === updatedEpisode.id ? updatedEpisode : ep)),
      );
      toast.success("Épisode mis à jour avec succès !");
      setIsEditing(null);
      if (typeof onUpdate === "function") {
        onUpdate(updatedEpisode);
      }
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      toast.error("Erreur lors de la mise à jour de l'épisode.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  const previewEpisodeImage = (input) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Series/Episodes/${input.url}`;
  };

  const handleEpisodeImageChange = (type, e) => {
    if (e.target.type === "file" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEpisodeImageInput({
        file,
        url: "",
      });
    } else {
      const url = e.target.value;
      setEpisodeImageInput({
        file: null,
        url,
      });
    }
  };

  const handleDeleteEpisode = (episode) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet épisode ?")) {
      connexion
        .delete(`/episodes/${episode.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Épisode supprimé avec succès !");
          if (typeof onDelete === "function") {
            onDelete(episode.id);
          }
          setLocalEpisodes((prev) => prev.filter((ep) => ep.id !== episode.id));
        })
        .catch((error) => {
          console.error("Erreur suppression :", error);
          toast.error("Erreur lors de la suppression de l'épisode.");
        });
    }
  };

  const handleClose = () => {
    setShow(false);
    setIsAdding(false);
    setIsEditing(null);
    if (typeof onUpdate === "function") {
      onUpdate(localEpisodes);
    }
  };
  const handleShow = () => setShow(true);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="adminEditEpisodesModal">
      <button onClick={handleShow}>Voir les épisodes</button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="adminEditEpisodesContent"
      >
        <Modal.Header>
          <Modal.Title
            title={`Les épisodes de la saison ${seasonNumber} de "${serieTitle}"`}
          >
            Les épisodes de la saison {seasonNumber} de "{serieTitle}"
          </Modal.Title>
          <div className="adminSerieEpisodeActions">
            <button
              onClick={() => {
                setIsAdding(true);
                setIsEditing(null);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button onClick={handleClose}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {localEpisodes.length > 0 ? (
            <div className="adminEpisodesList">
              {localEpisodes.map((episode) =>
                isEditing === episode.id ? (
                  <form
                    className="adminEpisodeEditCard"
                    key={episode.id}
                    onSubmit={handleUpdateEpisode}
                  >
                    <div className="adminEpisodeEditCardLeft">
                      <label>
                        <div className="adminEpisodeImage">
                          {episodeImageInput.url || episodeImageInput.file ? (
                            <img
                              src={previewEpisodeImage(episodeImageInput)}
                              alt="Preview"
                            />
                          ) : (
                            <div className="adminEpisodePlaceHolder">
                              <FontAwesomeIcon icon={faImage} />
                              <span>Aucune image pour le moment</span>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          name="episode_image"
                          accept="image/*"
                          onChange={(e) => handleEpisodeImageChange("add", e)}
                        />
                        <input
                          type="text"
                          name="episode_image"
                          placeholder="URL de l'image"
                          value={episodeImageInput.url}
                          onChange={(e) => handleEpisodeImageChange("add", e)}
                        />
                      </label>
                      <div className="adminEpisodeEditButtons">
                        <button type="submit">Sauvegarder</button>
                        <button type="button" onClick={handleCancelEdit}>
                          Annuler
                        </button>
                      </div>
                    </div>
                    <div className="adminEpisodeEditCardRight">
                      <label>
                        <input
                          type="number"
                          name="episode_number"
                          placeholder="N° de l'épisode"
                          value={episodeEditForm.episode_number}
                          onChange={handleEpisodeSubmit}
                        />{" "}
                        -{" "}
                        <input
                          type="text"
                          name="title"
                          placeholder="Titre"
                          value={episodeEditForm.title}
                          onChange={handleEpisodeSubmit}
                        />
                      </label>
                      <label>
                        <input
                          type="date"
                          name="release_date"
                          placeholder="Date de diffusion"
                          value={episodeEditForm.release_date}
                          onChange={handleEpisodeSubmit}
                        />{" "}
                        -{" "}
                        <input
                          type="time"
                          name="duration"
                          placeholder="Durée"
                          value={episodeEditForm.duration}
                          onChange={handleEpisodeSubmit}
                        />
                      </label>
                      <label>
                        <textarea
                          name="synopsis"
                          placeholder="Synopsis"
                          value={episodeEditForm.synopsis}
                          onChange={handleEpisodeSubmit}
                        ></textarea>
                      </label>
                      
                    </div>
                  </form>
                ) : (
                  <div className="adminEpisodeCard" key={episode.id}>
                    <div className="adminEpisodeCardLeft">
                      <div className="adminEpisodeImage">
                        {episode.episode_image ? (
                          <img
                            src={
                              episode.episode_image &&
                              episode.episode_image.startsWith("http")
                                ? episode.episode_image
                                : episode.episode_image
                                  ? `http://localhost:3994/src/assets/Series/Episodes/${episode.episode_image}`
                                  : null
                            }
                            alt={episode.title}
                          />
                        ) : (
                          <div className="adminEpisodePlaceHolder">
                            <FontAwesomeIcon icon={faImage} />
                            <span>Aucune image pour le moment</span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        title={"Modifier l'épisode"}
                        onClick={() => {
                          setIsEditing(episode.id);
                          setEpisodeEditForm({
                            episode_number: episode.episode_number || "",
                            title: episode.title || "",
                            episode_image: episode.episode_image || "",
                            release_date: episode.release_date ? episode.release_date.split("T")[0] : "",
                            duration: episode.duration || "",
                            synopsis: episode.synopsis || "",
                          });
                          setEpisodeImageInput({
                            url: episode.episode_image || "",
                            file: null,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPenSquare} />
                      </button>
                      <button
                        type="button"
                        title={"Supprimer l'épisode"}
                        onClick={() => handleDeleteEpisode(episode)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    <div className="adminEpisodeCardRight">
                      <h3>
                        {episode.episode_number} - {episode.title}
                      </h3>
                      <div className="adminEpisodeInfos">
                        <p>
                          <b>
                            Date de diffusion :{" "}
                            {formatDate(episode.release_date)}
                          </b>
                        </p>
                        <p>
                          <b>Durée : {episode.duration}</b>
                        </p>
                      </div>
                      <div className="adminEpisodeSynopsis">
                        <h4>
                          <b>Synopsis :</b>
                        </h4>
                        <p>{episode.synopsis}</p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <p>Aucun épisode pour cette saison.</p>
          )}
          {isAdding && (
            <>
              <div
                className="adminAddEpisodeOverlay"
                onClick={() => setIsAdding(false)}
              />
              <div className="adminAddEpisode">
                <div className="adminAddEpisodeHeader">
                  <h3>Ajouter un épisode</h3>
                  <button onClick={() => setIsAdding(false)}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
                <form
                  className="adminAddEpisodeForm"
                  onSubmit={handleEpisodeAdd}
                >
                  <div className="adminAddEpisodeFormLeft">
                    <label>
                      <div className="adminEpisodeImage">
                        {episodeImageInput.file || episodeImageInput.url ? (
                          <img
                            src={previewEpisodeImage(episodeImageInput)}
                            alt="Preview"
                          />
                        ) : (
                          <div className="adminEpisodePlaceHolder">
                            <FontAwesomeIcon icon={faImage} />
                            <span>Aucune image pour le moment</span>
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        name="episode_image"
                        accept="image/*"

                        onChange={(e) => handleEpisodeImageChange("add", e)}
                      />
                      <input
                        type="text"
                        name="episode_image"
                        placeholder="URL de l'image"
                        value={episodeImageInput.url}
                        onChange={(e) => handleEpisodeImageChange("add", e)}
                      />
                    </label>
                    <button type="submit">Ajouter l'épisode</button>
                  </div>
                  <div className="adminAddEpisodeFormRight">
                    <label>
                      <input
                        type="number"
                        name="episode_number"
                        placeholder="N° de l'épisode"
                        value={episodeAddForm.episode_number}
                        onChange={handleEpisodeAddSubmit}
                      />{" "}
                      -{" "}
                      <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        value={episodeAddForm.title}
                        onChange={handleEpisodeAddSubmit}
                      />
                    </label>
                    <label>
                      <input
                        type="date"
                        name="release_date"
                        placeholder="Date de diffusion"
                        value={episodeAddForm.release_date}
                        onChange={handleEpisodeAddSubmit}
                      />{" "}
                      -{" "}
                      <input
                        type="time"
                        name="duration"
                        placeholder="Durée"
                        value={episodeAddForm.duration}
                        onChange={handleEpisodeAddSubmit}
                      />
                    </label>
                    <label className="adminAddEpisodeSynopsis">
                      <textarea
                        name="synopsis"
                        placeholder="Synopsis"
                        value={episodeAddForm.synopsis}
                        onChange={handleEpisodeAddSubmit}
                      ></textarea>
                    </label>
                  </div>
                </form>
              </div>
            </>
          )}
          <ToastContainer />
        </Modal.Body>
      </Modal>
    </div>
  );
}

AdminEditEpisodesModal.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      episode_number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  serieId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  serieTitle: PropTypes.string.isRequired,
};

export default AdminEditEpisodesModal;
