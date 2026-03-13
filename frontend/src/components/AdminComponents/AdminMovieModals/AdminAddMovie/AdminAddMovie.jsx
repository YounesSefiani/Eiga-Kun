import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../../../../services/connexion";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopyright,
  faFilm,
  faImage,
  faPanorama,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminAddMovie.css";

const addMovieForm = {
  title: "",
  poster: "",
  background: "",
  logo: "",
  trailer: "",
  release_date: "",
  duration: "",
  genre: "",
  theme: "",
  screen: "",
  streaming: "",
  original: "",
  country: "",
  universe: "",
  subUniverse: "",
  synopsis: "",
};

function AdminAddMovie({ onClose, onMovieAdded }) {
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState(addMovieForm);

  const [posterInput, setPosterInput] = useState({ url: "", file: null });
  const [logoInput, setLogoInput] = useState({ url: "", file: null });
  const [backgroundInput, setBackgroundInput] = useState({
    url: "",
    file: null,
  });

  const [casting, setCasting] = useState([]);
  const directing = casting.filter((c) => c.side === "Directing");
  const acting = casting.filter((c) => c.side === "Acting");

  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [role, setRole] = useState("");
  const [side, setSide] = useState("Directing");
  const [error, setError] = useState("");
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

  const handleMovieSubmit = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (type, e) => {
    if (e.target.type === "file" && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (type === "poster") setPosterInput({ url: "", file });
      if (type === "background") setBackgroundInput({ url: "", file });
      if (type === "logo") setLogoInput({ url: "", file });
    } else {
      const url = e.target.value;
      if (type === "poster") setPosterInput({ url, file: null });
      if (type === "background") setBackgroundInput({ url, file: null });
      if (type === "logo") setLogoInput({ url, file: null });
    }
  };

  const previewImage = (input, localPath) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Movies/${localPath}/${input.url}`;
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
      },
    ]);
    setSelectedPersonality("");
    setRole("");
    setSide("Directing");
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

  const handleMovieAdd = async (event) => {
    event.preventDefault();
    setLoading(true);

    const movieFormData = new FormData();
    movieFormData.append("title", movie.title);
    movieFormData.append("release_date", movie.release_date);
    movieFormData.append("duration", movie.duration);
    movieFormData.append("genre", movie.genre);
    movieFormData.append("theme", movie.theme);
    movieFormData.append("screen", movie.screen);
    movieFormData.append("streaming", movie.streaming);
    movieFormData.append("original", movie.original);
    movieFormData.append("country", movie.country);
    movieFormData.append("universe", movie.universe);
    movieFormData.append("subUniverse", movie.subUniverse);
    movieFormData.append("synopsis", movie.synopsis);
    movieFormData.append("trailer", movie.trailer);
    if (posterInput.file) movieFormData.append("poster", posterInput.file);
    else if (posterInput.url) movieFormData.append("poster", posterInput.url);
    if (backgroundInput.file)
      movieFormData.append("background", backgroundInput.file);
    else if (backgroundInput.url)
      movieFormData.append("background", backgroundInput.url);
    if (logoInput.file) movieFormData.append("logo", logoInput.file);
    else if (logoInput.url) movieFormData.append("logo", logoInput.url);

    try {
      const response = await connexion.post("/movies", movieFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const newMovie = response.data;
      if (casting.length > 0 && newMovie.id) {
        for (const member of casting) {
          await connexion.post(
            "/castings",
            {
              movie_id: newMovie.id,
              personality_id: member.personality_id,
              role: member.role,
              side: member.side,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
        }
      }
      toast.success("Film ajouté avec succès !");
      setMovie(addMovieForm);
      setPosterInput({ url: "", file: null });
      setBackgroundInput({ url: "", file: null });
      setLogoInput({ url: "", file: null });
      setCasting([]);
      if (onMovieAdded && response.data) onMovieAdded(response.data);
      if (onClose) onClose();
    } catch (err) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Erreur lors de l'ajout du film",
      );
      console.error("Error adding movie:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="adminAddMovieOverlay" onClick={onClose}></div>
      <div className="adminAddMovieModal">
        <h2>Ajouter un film</h2>
        <form className="adminAddMovieForm" onSubmit={handleMovieAdd}>
          <div className="adminAddMovieFormHeader">
            <label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Titre du film"
                value={movie.title}
                onChange={handleMovieSubmit}
                required
              />
            </label>
            <div className="adminAddMovieFormActions">
              <button type="submit" disabled={loading}>
                {loading ? "Ajout en cours..." : "Ajouter"}
              </button>
              <button type="button" onClick={onClose}>
                Annuler
              </button>
            </div>
          </div>
          <div className="adminAddMovieFormBody">
            <div className="adminAddMovieFormBodyLeft">
              <label>
                <div className="adminAddMoviePoster">
                  {posterInput.file || posterInput.url ? (
                    <img
                      src={previewImage(posterInput, "Posters")}
                      alt="Poster Preview"
                    />
                  ) : (
                    <div className="adminAddMoviePosterPlaceHolder">
                      <FontAwesomeIcon icon={faImage} />
                      <p>Ajouter une affiche</p>
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
                  type="text"
                  id="posterUrl"
                  name="posterUrl"
                  placeholder="URL de l'affiche"
                  value={posterInput.url}
                  onChange={(e) => handleImageChange("poster", e)}
                />
              </label>
              <label>
                <div className="adminAddMovieBackground">
                  {backgroundInput.file || backgroundInput.url ? (
                    <img
                      src={previewImage(backgroundInput, "Backgrounds")}
                      alt="Background Preview"
                    />
                  ) : (
                    <div className="adminAddMovieBackgroundPlaceHolder">
                      <FontAwesomeIcon icon={faPanorama} />
                      <p>Ajouter une couverture</p>
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
                  type="text"
                  id="backgroundUrl"
                  name="backgroundUrl"
                  placeholder="URL de la couverture"
                  value={backgroundInput.url}
                  onChange={(e) => handleImageChange("background", e)}
                />
              </label>
            </div>
            <div className="adminAddMovieFormBodyRight">
              <label>
                <div className="adminAddMovieLogo">
                  {logoInput.file || logoInput.url ? (
                    <img
                      src={previewImage(logoInput, "Logos")}
                      alt="Logo Preview"
                    />
                  ) : (
                    <div className="adminAddMovieLogoPlaceHolder">
                      <FontAwesomeIcon icon={faCopyright} />
                      <p>Ajouter un logo</p>
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
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  placeholder="URL du logo"
                  value={logoInput.url}
                  onChange={(e) => handleImageChange("logo", e)}
                />
              </label>
              <div className="adminAddMovieFormInfos">
                <label>
                  <p>
                    <b>Date de sortie</b>
                  </p>
                  <input
                    type="date"
                    id="release_date"
                    name="release_date"
                    placeholder="Date de sortie"
                    value={movie.release_date}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Durée</b>
                  </p>
                  <input
                    type="time"
                    id="duration"
                    name="duration"
                    placeholder="Durée"
                    value={movie.duration}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Genre</b>
                  </p>
                  <input
                    type="text"
                    id="genre"
                    name="genre"
                    placeholder="Genre"
                    value={movie.genre}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Thème</b>
                  </p>
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    placeholder="Thème"
                    value={movie.theme}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Pays d'origine</b>
                  </p>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Pays d'origine"
                    value={movie.country}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Sortie</b>
                  </p>
                  <select
                    name="screen"
                    value={movie.screen}
                    onChange={handleMovieSubmit}
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="Cinema">Cinéma</option>
                    <option value="Streaming">Streaming</option>
                    <option value="TV">TV</option>
                    <option value="DVD">DVD</option>
                  </select>
                </label>
                <label>
                  <p>
                    <b>Streaming</b>
                  </p>
                  <input
                    type="text"
                    id="streaming"
                    name="streaming"
                    placeholder="Plateforme de streaming"
                    value={movie.streaming}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Original</b>
                  </p>
                  <input
                    type="text"
                    id="original"
                    name="original"
                    placeholder="Titre original"
                    value={movie.original}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Univers</b>
                  </p>
                  <input
                    type="text"
                    id="universe"
                    name="universe"
                    placeholder="Univers"
                    value={movie.universe}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Sous-univers</b>
                  </p>
                  <input
                    type="text"
                    id="subUniverse"
                    name="subUniverse"
                    placeholder="Sous-univers"
                    value={movie.subUniverse}
                    onChange={handleMovieSubmit}
                  />
                </label>
              </div>
              <div className="adminAddMovieST">
                <label>
                  <p>
                    <b>Synopsis</b>
                  </p>
                  <textarea
                    id="synopsis"
                    name="synopsis"
                    placeholder="Synopsis"
                    value={movie.synopsis}
                    onChange={handleMovieSubmit}
                  />
                </label>
                <label>
                  <p>
                    <b>Bande-annonce</b>
                  </p>
                  <div className="adminAddMovieTrailer">
                    {movie.trailer ? (
                      <iframe
                        title="Trailer Preview"
                        src={movie.trailer}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="adminAddMovieTrailerPlaceHolder">
                        <FontAwesomeIcon icon={faFilm} />
                        <p>Ajouter une bande-annonce</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    id="trailer"
                    name="trailer"
                    placeholder="Bande-annonce"
                    value={movie.trailer}
                    onChange={handleMovieSubmit}
                  />
                </label>
              </div>
            </div>
          </div>
      <div className="addMovieCasting">
        <h4>Casting du film</h4>
        <div className="addMovieCastingSection">
          <h5>Réalisation</h5>
          {directing && directing.length > 0 ? (
            <div className="addMovieCastingList">
              <HorizontalScroll>
                {directing.map((direction) => (
                  <div className="addMovieCastingCard" key={direction.id}>
                    <div className="addCastPicture">
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
                        <div className="castPictureHolder">
                          <FontAwesomeIcon icon={faImage} />
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
            <p>Aucun membre de la réalisation dans le casting pour le moment.</p>
          )}
        </div>
        <div className="addMovieCastingSection">
          <h5>Acteurs</h5>
          {acting && acting.length > 0 ? (
            <div className="addMovieCastingList">
              <HorizontalScroll>
                {acting.map((actor) => (
                  <div className="addMovieCastingCard" key={actor.id}>
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
                        value={actor.side || "Acting"}
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
        <div className="addMemberCasting">
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
          <button type="button" onClick={handleAddCasting}>
            Ajouter au casting
          </button>
        </div>
      </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

AdminAddMovie.propTypes = {
  onClose: PropTypes.func.isRequired,
  onMovieAdded: PropTypes.func.isRequired,
};

export default AdminAddMovie;
