import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../../../services/connexion";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPanorama,
  faCopyright,
  faStar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminAddSerie.css";

function AdminAddSerie({ onClose, onSerieAdded }) {
  const addSerieForm = {
    title: "",
    poster: "",
    background: "",
    logo: "",
    trailer: "",
    beginning_date: "",
    ending_date: "",
    serie_average_duration: "",
    nbSeasons: "",
    nbEpisodesSerie: "",
    statut: "",
    genre: "",
    theme: "",
    country: "",
    screen: "",
    streaming: "",
    original: "",
    universe: "",
    subUniverse: "",
    synopsis: "",
  };

  const { token } = useContext(AuthContext);
  const [serie, setSerie] = useState(addSerieForm);
  const [posterInput, setPosterInput] = useState({ url: "", file: null });
  const [backgroundInput, setBackgroundInput] = useState({
    url: "",
    file: null,
  });
  const [logoInput, setLogoInput] = useState({ url: "", file: null });
  const [seasonPosterInput, setSeasonPosterInput] = useState({
    url: "",
    file: null,
  });

  const [seasons, setSeasons] = useState([]);
  const [newSeason, setNewSeason] = useState({
    season_number: "",
    nbEpisodesSeason: "",
    first_episode_date: "",
    last_episode_date: "",
  });

  const [casting, setCasting] = useState([]);
  const directing = casting.filter((c) => c.side === "Directing");
  const acting = casting.filter((c) => c.side === "Acting");

  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [role, setRole] = useState("");
  const [side, setSide] = useState("Directing");
  const [presence, setPresence] = useState("");
  const [_error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPersonalities = async () => {
      try {
        const response = await connexion.get("/personalities");
        setPersonalities(response.data);
      } catch (err) {
        console.error("Error fetching personalities:", err);
        setError("Erreur lors du chargement des personnalités");
      }
    };
    fetchPersonalities();
  }, []);

  const handleSerieSubmit = (e) => {
    const { name, value } = e.target;
    setSerie((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (type, e) => {
    if (e.target.type === "file" && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (type === "poster") setPosterInput({ url: "", file });
      if (type === "background") setBackgroundInput({ url: "", file });
      if (type === "logo") setLogoInput({ url: "", file });
      if (type === "season_poster") setSeasonPosterInput({ url: "", file });
    } else {
      const url = e.target.value;
      if (type === "poster") setPosterInput({ url, file: null });
      if (type === "background") setBackgroundInput({ url, file: null });
      if (type === "logo") setLogoInput({ url, file: null });
      if (type === "season_poster") setSeasonPosterInput({ url, file: null });
    }
  };

  const previewImage = (input, localPath) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Series/${localPath}/${input.url}`;
    return "";
  };

  const handleAddCasting = () => {
    setError("");
    if (!selectedPersonality || !role || !side) {
      setError(
        "Veuillez sélectionner une personnalité, un rôle et désigner la partie du casting (Acting ou Directing).",
      );
      return;
    }
    const personality = personalities.find(
      (p) => p.id === parseInt(selectedPersonality, 10),
    );
    setCasting((prev) => [
      ...prev,
      {
        id: Date.now(),
        personality_id: personality.id,
        personality_fullname: personality.fullname,
        personality_picture: personality.picture,
        role,
        side,
        presence,
      },
    ]);
    setSelectedPersonality("");
    setRole("");
    setSide("Directing");
    setPresence("");
  };

  const handleRoleChange = (castingId, newRole) => {
    setCasting((prev) =>
      prev.map((cast) =>
        cast.id === castingId ? { ...cast, role: newRole } : cast,
      ),
    );
  };

  const handleSideChange = (castingId, newSide) => {
    setCasting((prev) =>
      prev.map((cast) =>
        cast.id === castingId ? { ...cast, side: newSide } : cast,
      ),
    );
  };

  const handlePresenceChange = (castingId, newPresence) => {
    setCasting((prev) =>
      prev.map((cast) =>
        cast.id === castingId ? { ...cast, presence: newPresence } : cast,
      ),
    );
  };

  // Pour un film en cours d'ajout, pas besoin de sauvegarder en base
  // car le casting sera envoyé lors de la soumission du formulaire
  const handleRoleSave = (castId) => {
    // Le rôle est déjà mis à jour localement via handleRoleChange
    // Pas de requête API nécessaire pour un nouveau film
    console.log("Rôle mis à jour localement pour castId:", castId);
  };

  const handleRemoveCasting = (castingId) => {
    setCasting((prev) => prev.filter((cast) => cast.id !== castingId));
  };

  const handleSeasonInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeason((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSeason = () => {
    setError("");
    if (!newSeason.season_number) {
      setError("Veuillez renseigner le numéro de la saison.");
      return;
    }
    const seasonToAdd = {
      id: Date.now(),
      season_number: newSeason.season_number,
      season_poster: seasonPosterInput.file || seasonPosterInput.url || "",
      season_poster_preview: seasonPosterInput.file
        ? URL.createObjectURL(seasonPosterInput.file)
        : seasonPosterInput.url || "",
      nbEpisodesSeason: newSeason.nbEpisodesSeason,
      first_episode_date: newSeason.first_episode_date,
      last_episode_date: newSeason.last_episode_date,
    };
    setSeasons((prev) => [...prev, seasonToAdd]);
    setNewSeason({
      season_number: "",
      nbEpisodesSeason: "",
      first_episode_date: "",
      last_episode_date: "",
    });
    setSeasonPosterInput({ url: "", file: null });
  };

  const handleRemoveSeason = (seasonId) => {
    setSeasons((prev) => prev.filter((season) => season.id !== seasonId));
  };

  const handleSerieAdd = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const serieFormData = new FormData();
    serieFormData.append("title", serie.title);
    serieFormData.append("trailer", serie.trailer);
    serieFormData.append("beginning_date", serie.beginning_date);
    serieFormData.append("ending_date", serie.ending_date);
    serieFormData.append(
      "serie_average_duration",
      serie.serie_average_duration,
    );
    serieFormData.append("nbSeasons", serie.nbSeasons);
    serieFormData.append("nbEpisodesSerie", serie.nbEpisodesSerie);
    serieFormData.append("statut", serie.statut);
    serieFormData.append("genre", serie.genre);
    serieFormData.append("theme", serie.theme);
    serieFormData.append("country", serie.country);
    serieFormData.append("screen", serie.screen);
    serieFormData.append("streaming", serie.streaming);
    serieFormData.append("original", serie.original);
    serieFormData.append("universe", serie.universe);
    serieFormData.append("subUniverse", serie.subUniverse);
    serieFormData.append("synopsis", serie.synopsis);
    if (posterInput.file) serieFormData.append("poster", posterInput.file);
    else if (posterInput.url) serieFormData.append("poster", posterInput.url);
    if (backgroundInput.file)
      serieFormData.append("background", backgroundInput.file);
    else if (backgroundInput.url)
      serieFormData.append("background", backgroundInput.url);
    if (logoInput.file) serieFormData.append("logo", logoInput.file);
    else if (logoInput.url) serieFormData.append("logo", logoInput.url);

    try {
      const response = await connexion.post("/series", serieFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const newSerie = response.data;
      if (casting.length > 0 && newSerie.id) {
        for (const member of casting) {
          await connexion.post(
            "/castings",
            {
              serie_id: newSerie.id,
              personality_id: member.personality_id,
              role: member.role,
              side: member.side,
              presence: member.presence,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        }
      }
      if (seasons.length > 0 && newSerie.id) {
        for (const season of seasons) {
          const seasonFormData = new FormData();
          seasonFormData.append("serie_id", newSerie.id);
          seasonFormData.append("season_number", season.season_number);
          seasonFormData.append(
            "nbEpisodesSeason",
            season.nbEpisodesSeason || "",
          );
          seasonFormData.append(
            "first_episode_date",
            season.first_episode_date || "",
          );
          seasonFormData.append(
            "last_episode_date",
            season.last_episode_date || "",
          );
          if (season.season_poster instanceof File) {
            seasonFormData.append("season_poster", season.season_poster);
          } else if (season.season_poster) {
            seasonFormData.append("season_poster", season.season_poster);
          }
          await connexion.post("/seasons", seasonFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }
      toast.success("Série ajoutée avec succès !");
      setSerie(addSerieForm);
      setPosterInput({ url: "", file: null });
      setBackgroundInput({ url: "", file: null });
      setLogoInput({ url: "", file: null });
      setSeasonPosterInput({ url: "", file: null });
      setSeasons([]);
      setCasting([]);
      if (onSerieAdded && response.data) onSerieAdded(response.data);
      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Une erreur est survenue lors de l'ajout de la série.",
      );
      console.log(error);
      setError("Une erreur est survenue lors de l'ajout de la série.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="adminAddSerieOverlay"></div>
      <div className="adminAddSerieModal">
        <h2>Ajouter une série</h2>
        <form className="adminAddSerieForm" onSubmit={handleSerieAdd}>
          <div className="adminAddSerieFormHeader">
            <label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Titre de la série"
                value={serie.title}
                onChange={handleSerieSubmit}
                required
              />
            </label>
            <div className="adminAddSerieFormActions">
              <button type="submit" disabled={loading}>
                {loading ? "Ajout en cours..." : "Ajouter"}
              </button>
              <button type="button" onClick={onClose}>
                Annuler
              </button>
            </div>
          </div>
          <div className="adminAddSerieFormBody">
            <div className="adminAddSerieFormBodyLeft">
              <label>
                <div className="adminAddSeriePoster">
                  {posterInput.file || posterInput.url ? (
                    <img
                      src={previewImage(posterInput, "Posters")}
                      alt="Poster de la série"
                    />
                  ) : (
                    <div className="adminAddSeriePosterPlaceHolder">
                      <FontAwesomeIcon icon={faImage} />
                      <span>Poster de la série</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="poster"
                  name="poster"
                  accept="image/*"
                  onChange={(e) => handleImageChange("poster", e)}
                />
                <input
                  type="url"
                  id="poster"
                  name="poster"
                  placeholder="URL du poster"
                  value={posterInput.url}
                  onChange={(e) => handleImageChange("poster", e)}
                />
              </label>
              <label>
                <div className="adminAddSerieBackground">
                  {backgroundInput.file || backgroundInput.url ? (
                    <img
                      src={previewImage(backgroundInput, "Backgrounds")}
                      alt="Background de la série"
                    />
                  ) : (
                    <div className="adminAddSerieBackgroundPlaceHolder">
                      <FontAwesomeIcon icon={faPanorama} />
                      <span>Background de la série</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="background"
                  name="background"
                  accept="image/*"
                  onChange={(e) => handleImageChange("background", e)}
                />
                <input
                  type="url"
                  id="background"
                  name="background"
                  placeholder="URL du background"
                  value={backgroundInput.url}
                  onChange={(e) => handleImageChange("background", e)}
                />
              </label>
            </div>
            <div className="adminAddSerieFormBodyRight">
              <label>
                <div className="adminAddSerieLogo">
                  {logoInput.file || logoInput.url ? (
                    <img
                      src={previewImage(logoInput, "Logos")}
                      alt="Logo de la série"
                    />
                  ) : (
                    <div className="adminAddSerieLogoPlaceHolder">
                      <FontAwesomeIcon icon={faCopyright} />
                      <span>Logo de la série</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={(e) => handleImageChange("logo", e)}
                />
                <input
                  type="url"
                  id="logo"
                  name="logo"
                  placeholder="URL du logo"
                  value={logoInput.url}
                  onChange={(e) => handleImageChange("logo", e)}
                />
              </label>
              <div className="adminAddSerieFormInfos">
                <label>
                  Date de début
                  <input
                    type="date"
                    id="beginning_date"
                    name="beginning_date"
                    value={serie.beginning_date}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Date de fin
                  <input
                    type="date"
                    id="ending_date"
                    name="ending_date"
                    value={serie.ending_date}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Nombre de saisons
                  <input
                    type="number"
                    id="nbSeasons"
                    name="nbSeasons"
                    value={serie.nbSeasons}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Nombre d'épisodes
                  <input
                    type="number"
                    id="nbEpisodesSerie"
                    name="nbEpisodesSerie"
                    value={serie.nbEpisodesSerie}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Durée moyenne
                  <input
                    type="text"
                    id="serie_average_duration"
                    name="serie_average_duration"
                    value={serie.serie_average_duration}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Statut
                  <select
                    name="statut"
                    value={serie.statut}
                    onChange={handleSerieSubmit}
                  >
                    <option value="">--Sélectionnez un statut--</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminée">Terminée</option>
                    <option value="Fin de saison">Fin de saison</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </label>
                <label>
                  Sortie sur :
                  <select
                    name="screen"
                    value={serie.screen}
                    onChange={handleSerieSubmit}
                  >
                    <option value="">--La série est diffusée sur--</option>
                    <option value="TV">TV</option>
                    <option value="Streaming">Streaming</option>
                  </select>
                </label>
                <label>
                  Disponible sur :
                  <input
                    type="text"
                    id="streaming"
                    name="streaming"
                    value={serie.streaming}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Série originale ?
                  <input
                    type="text"
                    id="original"
                    name="original"
                    value={serie.original}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Genre(s)
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={serie.genre}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Thème(s)
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    value={serie.theme}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Origine(s)
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={serie.country}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Univers
                  <input
                    type="text"
                    id="universe"
                    name="universe"
                    value={serie.universe}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Sous-Univers
                  <input
                    type="text"
                    id="subUniverse"
                    name="subUniverse"
                    value={serie.subUniverse}
                    onChange={handleSerieSubmit}
                  />
                </label>
              </div>
              <div className="adminAddSerieST">
                <label>
                  Synopsis
                  <textarea
                    id="synopsis"
                    name="synopsis"
                    value={serie.synopsis}
                    onChange={handleSerieSubmit}
                  />
                </label>
                <label>
                  Trailer
                  <div className="adminAddSerieTrailer">
                    {serie.trailer ? (
                      <iframe
                        src={serie.trailer}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="adminAddSerieTrailerPlaceHolder">
                        <FontAwesomeIcon icon={faVideo} />
                        <span>Trailer de la série</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    id="trailer"
                    name="trailer"
                    value={serie.trailer}
                    onChange={handleSerieSubmit}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="addSerieCasting">
            <h4>Casting de la série</h4>
            <div className="addSerieCastingSection">
              <h5>Réalisation</h5>
              {directing && directing.length > 0 ? (
                <div className="addSerieCastingList">
                  <HorizontalScroll>
                    {directing.map((direction) => (
                      <div className="addSerieCastingCard" key={direction.id}>
                        <div className="addSerieCastPicture">
                          {direction.personality_picture ? (
                            <img
                              src={
                                direction.personality_picture &&
                                direction.personality_picture.startsWith("http")
                                  ? direction.personality_picture
                                  : direction.personality_picture
                                    ? `http://localhost:3994/src/assets/Personalities/Pictures/${direction.personality_picture}`
                                    : ""
                              }
                              alt={direction.personality_fullname}
                            />
                          ) : (
                            <div className="addSerieCastPictureHolder">
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                          )}
                        </div>
                        <p>{direction.personality_fullname}</p>
                        <label>
                          Rôle :
                          <input
                            type="text"
                            name="role"
                            value={direction.role || ""}
                            onChange={(e) =>
                              handleRoleChange(direction.id, e.target.value)
                            }
                            onBlur={() => handleRoleSave(direction.id)}
                          />
                        </label>
                        <label>
                          Side :
                          <select
                            name="side"
                            value={direction.side || "Directing"}
                            onChange={(e) =>
                              handleSideChange(direction.id, e.target.value)
                            }
                          >
                            <option value="Acting">Acting</option>
                            <option value="Directing">Directing</option>
                          </select>
                        </label>
                        <label>
                          Présence dans la série :
                          <input
                            type="text"
                            name="presence"
                            value={direction.presence || ""}
                            onChange={(e) =>
                              handlePresenceChange(direction.id, e.target.value)
                            }
                            onBlur={() => handlePresenceChange(direction.id)}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveCasting(direction.id)}
                        >
                          Supprimer du casting
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
            <div className="addSerieCastingSection">
              <h5>Acteurs & Actrices</h5>
              {acting && acting.length > 0 ? (
                <div className="addSerieCastingList">
                  <HorizontalScroll>
                    {acting.map((actor) => (
                      <div className="addSerieCastingCard" key={actor.id}>
                        <div className="addCastPicture">
                          {actor.personality_picture ? (
                            <img
                              src={
                                actor.personality_picture &&
                                actor.personality_picture.startsWith("http")
                                  ? actor.personality_picture
                                  : actor.personality_picture
                                    ? `http://localhost:3994/src/assets/Personalities/Pictures/${actor.personality_picture}`
                                    : ""
                              }
                              alt={actor.personality_fullname}
                            />
                          ) : (
                            <div className="castPictureHolder">
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                          )}
                        </div>
                        <p>{actor.personality_fullname}</p>
                        <label>
                          Rôle :
                          <input
                            type="text"
                            name="role"
                            value={actor.role || ""}
                            onChange={(e) =>
                              handleRoleChange(actor.id, e.target.value)
                            }
                            onBlur={() => handleRoleSave(actor.id)}
                          />
                        </label>
                        <label>
                          Side :
                          <select
                            name="side"
                            value={actor.side || "Directing"}
                            onChange={(e) =>
                              handleSideChange(actor.id, e.target.value)
                            }
                          >
                            <option value="Acting">Acting</option>
                            <option value="Directing">Directing</option>
                          </select>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveCasting(actor.id)}
                        >
                          Supprimer du casting
                        </button>
                      </div>
                    ))}
                  </HorizontalScroll>
                </div>
              ) : (
                <p>Aucun acteur ni actrice dans le casting pour le moment.</p>
              )}
            </div>
            <div className="addSerieMemberCasting">
              <h4>Ajouter un membre au casting</h4>
              <label>
                <p>
                  <b>Sélectionnez une personnalité</b>
                </p>
                <select
                  value={selectedPersonality}
                  onChange={(e) => setSelectedPersonality(e.target.value)}
                >
                  <option value="">-- Sélectionner --</option>
                  {personalities.map((personality) => (
                    <option key={personality.id} value={personality.id}>
                      {personality.fullname}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <p>
                  <b>Rôle</b>
                </p>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </label>
              <label>
                <p>
                  <b>Side</b>
                </p>
                <select value={side} onChange={(e) => setSide(e.target.value)}>
                  <option value="Directing">Réalisation</option>
                  <option value="Acting">Acting</option>
                </select>
              </label>
              <label>
                Présence dans la série :
                <input
                  type="text"
                  name="presence"
                  value={presence}
                  onChange={(e) => setPresence(e.target.value)}
                />
              </label>
              <button type="button" onClick={handleAddCasting}>
                Ajouter au casting
              </button>
            </div>
          </div>
          <div className="adminAddSerieSeason">
            <div className="adminAddSerieSeasonSection">
              <h3>Saisons de la série</h3>
              {seasons && seasons.length > 0 ? (
                <div className="adminAddSeasonList">
                  <HorizontalScroll>
                    {seasons.map((season) => (
                      <div key={season.id} className="adminAddSeasonCard">
                        <h4>Saison {season.season_number}</h4>
                        <div className="adminAddSeasonPoster">
                          {season.season_poster_preview ? (
                            <img
                              src={season.season_poster_preview}
                              alt={`Saison ${season.season_number}`}
                            />
                          ) : (
                            <div className="adminAddSeasonPosterPlaceHolder">
                              <FontAwesomeIcon icon={faImage} />
                            </div>
                          )}
                        </div>
                        <p>
                          <b>Nombre d'épisodes : </b>
                          <br />
                          {season.nbEpisodesSeason} épisodes
                        </p>
                        <p>
                          <b>Dates de diffusion :</b>
                          <br />
                          {season.first_episode_date} -{" "}
                          {season.last_episode_date}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemoveSeason(season.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </HorizontalScroll>
                </div>
              ) : (
                <p>Aucune saison ajoutée pour le moment.</p>
              )}
            </div>
            <div className="adminAddSeason">
              <h4>Ajouter une saison</h4>
              <label>
                <p>
                  <b>Poster de la saison</b>
                </p>
                <div className="adminAddSeasonPoster">
                  {seasonPosterInput.file || seasonPosterInput.url ? (
                    <img
                      src={previewImage(seasonPosterInput, "Seasons")}
                      alt="Poster de la saison"
                    />
                  ) : (
                    <div className="adminAddSeasonPosterPlaceHolder">
                      <FontAwesomeIcon icon={faImage} />
                      <span>Ajouter un poster</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="season_poster"
                  name="season_poster"
                  accept="image/*"
                  onChange={(e) => handleImageChange("season_poster", e)}
                />
                <input
                  type="url"
                  id="season_poster_url"
                  name="season_poster_url"
                  placeholder="URL du poster"
                  value={seasonPosterInput.url}
                  onChange={(e) => handleImageChange("season_poster", e)}
                />
              </label>
              <label>
                <p>
                  <b>Numéro de saison</b>
                </p>
                <input
                  type="number"
                  id="season_number"
                  name="season_number"
                  placeholder="Ex : 1"
                  value={newSeason.season_number}
                  onChange={handleSeasonInputChange}
                />
              </label>
              <label>
                <p>
                  <b>Nombre d'épisodes</b>
                </p>
                <input
                  type="number"
                  id="nbEpisodesSeason"
                  name="nbEpisodesSeason"
                  placeholder="Ex : 10"
                  value={newSeason.nbEpisodesSeason}
                  onChange={handleSeasonInputChange}
                />
              </label>
              <label>
                <p>
                  <b>Date du premier épisode</b>
                </p>
                <input
                  type="date"
                  id="first_episode_date"
                  name="first_episode_date"
                  value={newSeason.first_episode_date}
                  onChange={handleSeasonInputChange}
                />
              </label>
              <label>
                <p>
                  <b>Date du dernier épisode</b>
                </p>
                <input
                  type="date"
                  id="last_episode_date"
                  name="last_episode_date"
                  value={newSeason.last_episode_date}
                  onChange={handleSeasonInputChange}
                />
              </label>
              <button type="button" onClick={handleAddSeason}>
                Ajouter la saison
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

AdminAddSerie.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSerieAdded: PropTypes.func.isRequired,
};

export default AdminAddSerie;
