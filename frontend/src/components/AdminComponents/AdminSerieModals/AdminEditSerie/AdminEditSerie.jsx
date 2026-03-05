import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import AdminEditSeasonsSerie from "./AdminEditSeasonsSerie/AdminEditSeasonsSerie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPanorama,
  faCopyright,
  faVideo,
  faStar,
  faFilePen,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "./AdminEditSerie.css";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";

function AdminEditSerie({ serie, onUpdate, onCancel, onDelete }) {
  const [serieEditForm, setSerieEditForm] = useState({
    title: serie.title || "",
    beginning_date: serie.beginning_date || "",
    ending_date: serie.ending_date || "",
    serie_average_duration: serie.serie_average_duration || "",
    statut: serie.statut || "",
    nbSeasons: serie.nbSeasons || "",
    nbEpisodesSerie: serie.nbEpisodesSerie || "",
    genre: serie.genre || "",
    theme: serie.theme || "",
    country: serie.country || "",
    screen: serie.screen || "",
    streaming: serie.streaming || "",
    original: serie.original || "",
    universe: serie.universe || "",
    subUniverse: serie.subUniverse || "",
    trailer: serie.trailer || "",
    synopsis: serie.synopsis || "",
    seasons: serie.seasons || [],
    casting: serie.casting || [],
  });
  
 

  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [role, setRole] = useState("");
  const [side, setSide] = useState("Directing");
  const [presence, setPresence] = useState("");
  const [_error, setError] = useState("");

  const { token } = useContext(AuthContext);

  const [seriePosterInput, setSeriePosterInput] = useState({
    url: serie.poster || "",
    file: null,
  });

  const [serieBackgroundInput, setSerieBackgroundInput] = useState({
    url: serie.background || "",
    file: null,
  });

  const [serieLogoInput, setSerieLogoInput] = useState({
    url: serie.logo || "",
    file: null,
  });



  const casting = serieEditForm.casting || [];
  console.log("casting data:", casting);
  const directing = casting.filter((cast) => cast.side === "Directing");
  const acting = casting.filter((cast) => cast.side === "Acting");

  const serieSeasons = serieEditForm.seasons || [];

  console.log("serieSeasons data:", serieSeasons);
  useEffect(() => {
    const fetchPersonalities = async () => {
      try {
        const response = await connexion.get("/personalities");
        setPersonalities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPersonalities();
  }, []);

  const handleAddCast = async () => {
    setError("");
    if (!selectedPersonality || !role || !side || !presence) {
      setError(
        "Veuillez remplir tous les champs pour ajouter un membre du casting.",
      );
      toast.error(
        "Veuillez remplir tous les champs pour ajouter un membre du casting.",
      );
      return;
    }
    try {
      const personality = personalities.find(
        (p) => p.id === parseInt(selectedPersonality, 10),
      );
      const response = await connexion.post(
        "/castings",
        {
          serie_id: serie.id,
          personality_id: personality.id,
          role,
          side,
          presence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSerieEditForm({
        ...serieEditForm,
        casting: [
          ...serieEditForm.casting,
          {
            id: response.data.id || Date.now(),
            personality_id: personality.id,
            personality_fullname: personality.fullname,
            personality_picture: personality.picture,
            role,
            side,
            presence,
            serie_id: serie.id,
          },
        ],
      });
      setSelectedPersonality("");
      setRole("");
      setSide("Directing");
      setPresence("");
    } catch (error) {
      console.error(error);
      setError("Une erreur est survenue lors de l'ajout du membre du casting.");
      toast.error(
        "Une erreur est survenue lors de l'ajout du membre du casting.",
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }
  };

  const handleSerieChange = (e) => {
    setSerieEditForm({
      ...serieEditForm,
      [e.target.name]: e.target.value,
    });
  };

  // Met à jour le rôle localement
  const handleRoleChange = (castId, newRole) => {
    console.log("handleRoleChange appelé:", { castId, newRole });
    setSerieEditForm((prevForm) => ({
      ...prevForm,
      casting: prevForm.casting.map((cast) =>
        cast.id === castId ? { ...cast, role: newRole } : cast,
      ),
    }));
  };

  // Sauvegarde le rôle au onBlur
  const handleRoleSave = async (castId) => {
    console.log("handleRoleSave appelé:", { castId });
    console.log("serieEditForm.casting:", serieEditForm.casting);
    if (!castId) {
      console.log("castId est undefined/null, on sort");
      return;
    }
    const cast = serieEditForm.casting.find((c) => c.id === castId);
    console.log("cast trouvé:", cast);
    if (!cast) {
      console.log("cast non trouvé, on sort");
      return;
    }

    console.log("Envoi PUT /castings/" + castId, { role: cast.role });
    try {
      const response = await connexion.put(
        `/castings/${castId}`,
        { role: cast.role },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("Réponse PUT:", response);
    } catch (error) {
      console.error("Erreur PUT:", error);
    }
  };

  // Sauvegarde le side immédiatement (select)
  const handleSideChange = async (castId, newSide) => {
    console.log("handleSideChange appelé:", { castId, newSide });
    if (!castId) return;

    setSerieEditForm((prevForm) => ({
      ...prevForm,
      casting: prevForm.casting.map((cast) =>
        cast.id === castId ? { ...cast, side: newSide } : cast,
      ),
    }));

    try {
      await connexion.put(
        `/castings/${castId}`,
        { side: newSide },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePresenceChange = async (castId, newPresence) => {
    console.log("handlePresenceChange appelé:", { castId, newPresence });
    if (!castId) return;

    setSerieEditForm((prevForm) => ({
      ...prevForm,
      casting: prevForm.casting.map((cast) =>
        cast.id === castId ? { ...cast, presence: newPresence } : cast,
      ),
    }));

    try {
      await connexion.put(
        `/castings/${castId}`,
        { presence: newPresence },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveCast = async (castId) => {
    try {
      await connexion.delete(`/castings/${castId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSerieEditForm((prevForm) => ({
        ...prevForm,
        casting: prevForm.casting.filter((cast) => cast.id !== castId),
      }));
    } catch (error) {
      console.error(error);
      setError(
        "Une erreur est survenue lors de la suppression du membre du casting.",
      );
      toast.error(
        "Une erreur est survenue lors de la suppression du membre du casting.",
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }
  };

  const handleImageChange = (e, type) => {
    if (e.target.type === "file" && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (type === "poster") setSeriePosterInput({ url: "", file });
      if (type === "background") setSerieBackgroundInput({ url: "", file });
      if (type === "logo") setSerieLogoInput({ url: "", file });
    } else {
      const url = e.target.value;
      if (type === "poster") setSeriePosterInput({ url, file: null });
      if (type === "background") setSerieBackgroundInput({ url, file: null });
      if (type === "logo") setSerieLogoInput({ url, file: null });
    }
  };

  const handleSerieSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(serieEditForm).forEach(([key, value]) => {
      if (key === "casting") {
        // On n'envoie pas le casting ici, il est géré séparément
      } else {
        formData.append(key, value ?? "");
      }
    });
    if (seriePosterInput.file) formData.append("poster", seriePosterInput.file);
    if (serieBackgroundInput.file)
      formData.append("background", serieBackgroundInput.file);
    if (serieLogoInput.file) formData.append("logo", serieLogoInput.file);
    connexion
      .put(`/series/${serie.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((error) => console.log(error));
  };

  const previewImage = (input, localPath) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Series/${localPath}/${input.url}`;
    return "";
  };

  const handleDeleteSerie = () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette série ?")) {
      connexion
        .delete(`/series/${serie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onDelete(serie.id);
        })
        .catch((error) => console.log(error));
    }
  };


  return (
    <form className="adminEditSerieForm" onSubmit={handleSerieSubmit}>
      <h2>Modifier la série </h2>
      <div className="adminEditSerieFormHeader">
        <label>
          <input
            type="text"
            name="title"
            value={serieEditForm.title}
            onChange={handleSerieChange}
            placeholder="Titre de la série"
          />
        </label>
        <div className="adminEditSerieActions">
          <button type="submit"><FontAwesomeIcon icon={faFilePen} /></button>
          <button type="button" onClick={handleDeleteSerie}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button type="button" onClick={onCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <div className="adminEditSerieFormBody">
        <div className="adminEditSerieFormLeft">
          <label>
            <div className="editSeriePoster">
              {seriePosterInput.url || seriePosterInput.file ? (
                <img
                  src={previewImage(seriePosterInput, "Posters")}
                  alt="Poster de la série"
                />
              ) : (
                <div className="editSeriePosterPlaceHolder">
                  <FontAwesomeIcon icon={faImage} />
                  <span>Poster de la série</span>
                </div>
              )}
            </div>
            <input
              type="text"
              value={seriePosterInput.url}
              onChange={(e) => handleImageChange(e, "poster")}
              placeholder="URL du poster"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "poster")}
            />
          </label>
          <label>
            <div className="editSerieBackground">
              {serieBackgroundInput.url || serieBackgroundInput.file ? (
                <img
                  src={previewImage(serieBackgroundInput, "Backgrounds")}
                  alt="Background de la série"
                />
              ) : (
                <div className="editSerieBackgroundPlaceHolder">
                  <FontAwesomeIcon icon={faPanorama} />
                  <span>Background de la série</span>
                </div>
              )}
            </div>
            <input
              type="text"
              value={serieBackgroundInput.url}
              onChange={(e) => handleImageChange(e, "background")}
              placeholder="URL du background"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "background")}
            />
          </label>
        </div>
        <div className="adminEditSerieFormRight">
          <label>
            <div className="editSerieLogo">
              {serieLogoInput.url || serieLogoInput.file ? (
                <img
                  src={previewImage(serieLogoInput, "Logos")}
                  alt="Logo de la série"
                />
              ) : (
                <div className="editSerieLogoPlaceHolder">
                  <FontAwesomeIcon icon={faCopyright} />
                  <span>Logo de la série</span>
                </div>
              )}
            </div>
            <input
              type="text"
              value={serieLogoInput.url}
              onChange={(e) => handleImageChange(e, "logo")}
              placeholder="URL du logo"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "logo")}
            />
          </label>
          <div className="editSerieInfos">
            <label>
              <p>
                <b>Date de début :</b>
              </p>
              <input
                type="date"
                name="beginning_date"
                value={serieEditForm.beginning_date}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Date de fin :</b>
              </p>
              <input
                type="date"
                name="ending_date"
                value={serieEditForm.ending_date}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Nombre de saisons :</b>
              </p>
              <input
                type="number"
                name="nbSeasons"
                value={serieEditForm.nbSeasons}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Nombre d'épisodes :</b>
              </p>
              <input
                type="number"
                name="nbEpisodesSerie"
                value={serieEditForm.nbEpisodesSerie}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Durée moyenne d'un épisode :</b>
              </p>
              <input
                type="text"
                name="serie_average_duration"
                value={serieEditForm.serie_average_duration}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Sortie :</b>
              </p>
              <select
                name="screen"
                value={serieEditForm.screen}
                onChange={handleSerieChange}
              >
                <option value="TV">TV</option>
                <option value="Streaming">Streaming</option>
              </select>
            </label>
            <label>
              <p>
                <b>Original :</b>
              </p>
              <input
                type="text"
                name="original"
                value={serieEditForm.original}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Streaming :</b>
              </p>
              <input
                type="text"
                name="streaming"
                value={serieEditForm.streaming}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Statut :</b>
              </p>
              <select
                name="statut"
                value={serieEditForm.statut}
                onChange={handleSerieChange}
              >
                <option value="En cours">En cours</option>
                <option value="Terminée">Terminée</option>
                <option value="Fin de saison">Fin de saison</option>
                <option value="Annulée">Annulée</option>
              </select>
            </label>
            <label>
              <p>
                <b>Genre(s) :</b>
              </p>
              <input
                type="text"
                name="genre"
                value={serieEditForm.genre}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Thème(s) :</b>
              </p>
              <input
                type="text"
                name="theme"
                value={serieEditForm.theme}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Origine(s) :</b>
              </p>
              <input
                type="text"
                name="country"
                value={serieEditForm.country}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Univers :</b>
              </p>
              <input
                type="text"
                name="universe"
                value={serieEditForm.universe}
                onChange={handleSerieChange}
              />
            </label>
            <label>
              <p>
                <b>Sous-univers :</b>
              </p>
              <input
                type="text"
                name="subUniverse"
                value={serieEditForm.subUniverse}
                onChange={handleSerieChange}
              />
            </label>
          </div>
          <div className="editSerieST">
            <label>
              <div className="editSerieSynopsis">
                <p>
                  <b>Synopsis :</b>
                </p>
                <textarea
                  name="synopsis"
                  value={serieEditForm.synopsis}
                  onChange={handleSerieChange}
                />
              </div>
            </label>
            <label>
              <div className="editSerieTrailer">
                <p>
                  <b>Bande-annonce :</b>
                </p>
                {serieEditForm.trailer ? (
                  <iframe
                    src={serieEditForm.trailer}
                    title="trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="editSerieTrailerPlaceHolder">
                    <FontAwesomeIcon icon={faVideo} />
                    <span>Aucune bande-annonce disponible pour le moment.</span>
                  </div>
                )}
                <input
                  type="text"
                  name="trailer"
                  value={serieEditForm.trailer}
                  onChange={handleSerieChange}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <AdminEditSeasonsSerie serie={serie} seasons={Array.isArray(serieSeasons) ? serieSeasons : []} onUpdate={onUpdate} />
      <div className="adminEditSerieCasting">
        <h4>Casting de la série</h4>
        <div className="adminEditSerieCastingSection">
          <h5>Réalisation</h5>
          {directing && directing.length > 0 ? (
            <div className="adminEditSerieCastingList">
              <HorizontalScroll>
                {directing.map((direction) => (
                  <div className="adminEditSerieCastingCard" key={direction.id}>
                    <div className="editSerieCastPicture">
                      {direction.personality_picture ? (
                        <img
                          src={
                            direction.personality_picture &&
                            direction.personality_picture.startsWith("http")
                              ? direction.personality_picture
                              : direction.personality_picture
                                ? `http://localhost:3994/src/assets/Personalities/${direction.personality_picture}`
                                : ""
                          }
                          alt={direction.personality_fullname}
                        />
                      ) : (
                        <div className="editSerieCastPicturePlaceHolder">
                          <FontAwesomeIcon icon={faStar} />
                          <span>
                            Aucune image de la personnalité pour le moment.
                          </span>
                        </div>
                      )}
                    </div>
                    <p>{direction.personality_fullname}</p>
                    <label>
                      Side :
                      <select
                        name="side"
                        value={direction.side || "Directing"}
                        onChange={(e) =>
                          handleSideChange(direction.id, e.target.value)
                        }
                      >
                        <option value="Directing">Réalisation</option>
                        <option value="Acting">Acting</option>
                      </select>
                    </label>
                    <label>
                      Rôle :
                      <input
                        type="text"
                        value={direction.role}
                        onChange={(e) =>
                          handleRoleChange(direction.id, e.target.value)
                        }
                        onBlur={() => handleRoleSave(direction.id)}
                      />
                    </label>
                    <label>
                      Présence :
                      <input
                        type="text"
                        value={direction.presence}
                        onChange={(e) =>
                          handlePresenceChange(direction.id, e.target.value)
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(direction.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          ) : (
            <p>
              Aucun membre de la réalisation dans le casting pour le moment.
            </p>
          )}
        </div>
        <div className="adminEditSerieCastingSection">
          <h5>Acteurs & Actrices</h5>
          {acting && acting.length > 0 ? (
            <div className="adminEditSerieCastingList">
              <HorizontalScroll>
                {acting.map((actor) => (
                  <div className="adminEditSerieCastingCard" key={actor.id}>
                    <div className="editSerieCastPicture">
                      {actor.personality_picture ? (
                        <img
                          src={
                            actor.personality_picture &&
                            actor.personality_picture.startsWith("http")
                              ? actor.personality_picture
                              : actor.personality_picture
                                ? `http://localhost:3994/src/assets/Personalities/${actor.personality_picture}`
                                : ""
                          }
                          alt={actor.personality_fullname}
                        />
                      ) : (
                        <div className="editSerieCastPicturePlaceHolder">
                          <FontAwesomeIcon icon={faStar} />
                          <span>
                            Aucune image de la personnalité pour le moment.
                          </span>
                        </div>
                      )}
                    </div>
                    <p>{actor.personality_fullname}</p>
                    <label>
                      Side :
                      <select
                        name="side"
                        value={actor.side || "Acting"}
                        onChange={(e) =>
                          handleSideChange(actor.id, e.target.value)
                        }
                      >
                        <option value="Directing">Réalisation</option>
                        <option value="Acting">Acting</option>
                      </select>
                    </label>
                    <label>
                      Rôle :
                      <input
                        type="text"
                        value={actor.role}
                        onChange={(e) =>
                          handleRoleChange(actor.id, e.target.value)
                        }
                        onBlur={() => handleRoleSave(actor.id)}
                      />
                    </label>
                    <label>
                      Présence :
                      <input
                        type="text"
                        value={actor.presence}
                        onChange={(e) =>
                          handlePresenceChange(actor.id, e.target.value)
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(actor.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          ) : (
            <p>Aucun acteur ni actrice dans le casting pour le moment.</p>
          )}
        </div>
        <div className="adminAddSerieCast">
          <h4>Ajouter un membre au casting</h4>
          <label>
            Sélectionnez une personnalité :
            <select
              value={selectedPersonality}
              onChange={(e) => setSelectedPersonality(e.target.value)}
            >
              <option value="">-- Sélectionnez une personnalité --</option>
              {personalities.map((personality) => (
                <option key={personality.id} value={personality.id}>
                  {personality.fullname}
                </option>
              ))}
            </select>
          </label>
          <label>
            Side :
            <select
              name="side"
              value={side}
              onChange={(e) => setSide(e.target.value)}
            >
              <option value="Directing">Réalisation</option>
              <option value="Acting">Acting</option>
            </select>
          </label>
          <label>
            Rôle :
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <label>
            Présence :
            <input
              type="text"
              value={presence}
              onChange={(e) => setPresence(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleAddCast}>
            Ajouter au casting
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

export default AdminEditSerie;
