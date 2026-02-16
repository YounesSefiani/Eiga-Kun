import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPanorama,
  faCopyright,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import "./AdminEditMovie.css";

function AdminEditMovie({ movie, onUpdate, onCancel, onDelete }) {
  const [movieEditForm, setmovieEditForm] = useState({
    title: movie.title || "",
    release_date: movie.release_date || "",
    duration: movie.duration || "",
    genre: movie.genre || "",
    theme: movie.theme || "",
    country: movie.country || "",
    screen: movie.screen || "",
    streaming: movie.streaming || "",
    original: movie.original || "",
    universe: movie.universe || "",
    subUniverse: movie.subUniverse || "",
    synopsis: movie.synopsis || "",
    trailer: movie.trailer || "",
    casting: movie.casting || [],
  });

  const [personalities, setPersonalities] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState("");
  const [role, setRole] = useState("");
  const [side, setSide] = useState("Directing");
  const [_error, setError] = useState("");

  const { token } = useContext(AuthContext);

  const [posterInput, setPosterInput] = useState({
    url: movie.poster || "",
    file: null,
  });

  const [backgroundInput, setBackgroundInput] = useState({
    url: movie.background || "",
    file: null,
  });

  const [logoInput, setLogoInput] = useState({
    url: movie.logo || "",
    file: null,
  });

  const casting = movieEditForm.casting || [];
  console.log("casting data:", casting);
  const directing = casting.filter((cast) => cast.side === "Directing");
  const acting = casting.filter((cast) => cast.side === "Acting");

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
    if (!selectedPersonality || !role || !side) {
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
          movie_id: movie.id,
          personality_id: personality.id,
          role,
          side,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setmovieEditForm({
        ...movieEditForm,
        casting: [
          ...movieEditForm.casting,
          {
            id: response.data.id || Date.now(),
            personality_id: personality.id,
            personality_fullname: personality.fullname,
            personality_picture: personality.picture,
            role,
            side,
            movie_id: movie.id,
          },
        ],
      });
      setSelectedPersonality("");
      setRole("");
      setSide("Directing");
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

  const handleMovieChange = (e) => {
    setmovieEditForm({
      ...movieEditForm,
      [e.target.name]: e.target.value,
    });
  };

  // Met à jour le rôle localement
  const handleRoleChange = (castId, newRole) => {
    console.log("handleRoleChange appelé:", { castId, newRole });
    setmovieEditForm((prevForm) => ({
      ...prevForm,
      casting: prevForm.casting.map((cast) =>
        cast.id === castId ? { ...cast, role: newRole } : cast,
      ),
    }));
  };

  // Sauvegarde le rôle au onBlur
  const handleRoleSave = async (castId) => {
    console.log("handleRoleSave appelé:", { castId });
    console.log("movieEditForm.casting:", movieEditForm.casting);
    if (!castId) {
      console.log("castId est undefined/null, on sort");
      return;
    }
    const cast = movieEditForm.casting.find((c) => c.id === castId);
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

    setmovieEditForm((prevForm) => ({
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

  const handleRemoveCast = async (castId) => {
    try {
      await connexion.delete(`/castings/${castId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setmovieEditForm((prevForm) => ({
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

  const handleMovieSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(movieEditForm).forEach(([key, value]) => {
      if (key === "casting") {
        // On n'envoie pas le casting ici, il est géré séparément
      } else {
        formData.append(key, value ?? "");
      }
    });
    if (posterInput.file) formData.append("poster", posterInput.file);
    if (backgroundInput.file)
      formData.append("background", backgroundInput.file);
    if (logoInput.file) formData.append("logo", logoInput.file);
    connexion
      .put(`/movies/${movie.id}`, formData, {
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
      return `http://localhost:3994/src/assets/Movies/${localPath}/${input.url}`;
    return "";
  };

  const handleDeleteMovie = () => {
    if (window.confirm("Voulez-vous vraiment supprimer ce film ?")) {
      connexion
        .delete(`/movies/${movie.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onDelete(movie.id);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <form className="adminEditMovieForm" onSubmit={handleMovieSubmit}>
      <h2>Modifier le film</h2>
      <div className="adminEditMovieFormHeader">
        <label>
          <input
            type="text"
            name="title"
            value={movieEditForm.title}
            onChange={handleMovieChange}
          />
        </label>
        <div className="adminEditMovieActions">
          <button type="submit">Mettre à jour</button>
          <button type="button" onClick={handleDeleteMovie}>
            Supprimer
          </button>
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
      <div className="adminEditMovieFormBody">
        <div className="adminEditMovieFormBodyLeft">
          <label>
            <div className="editMoviePoster">
              {posterInput.url || posterInput.file ? (
                <img
                  src={previewImage(posterInput, "Posters")}
                  alt={movie.title}
                />
              ) : (
                <div className="editMoviePosterHolder">
                  <FontAwesomeIcon icon={faImage} />
                  <p>Poster</p>
                </div>
              )}
            </div>
            <input
              type="text"
              value={posterInput.url}
              onChange={(e) => handleImageChange(e, "poster")}
              placeholder="URL de l'affiche"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "poster")}
            />
          </label>
          <label>
            <div className="editMovieBackground">
              {backgroundInput.url || backgroundInput.file ? (
                <img
                  src={previewImage(backgroundInput, "Backgrounds")}
                  alt={movie.title}
                />
              ) : (
                <div className="editMovieBackgroundHolder">
                  <FontAwesomeIcon icon={faPanorama} />
                  <p>Background</p>
                </div>
              )}
            </div>
            <input
              type="text"
              value={backgroundInput.url}
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
        <div className="adminEditMovieFormBodyRight">
          <label>
            <div className="editMovieLogo">
              {logoInput.url || logoInput.file ? (
                <img src={previewImage(logoInput, "Logos")} alt={movie.title} />
              ) : (
                <div className="editMovieLogoHolder">
                  <FontAwesomeIcon icon={faCopyright} />
                  <p>Logo</p>
                </div>
              )}
            </div>
            <input
              type="text"
              value={logoInput.url}
              onChange={(e) => handleImageChange(e, "logo")}
              placeholder="URL du logo"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "logo")}
            />
          </label>
          <div className="adminEditMovieInfos">
            <label>
              <p>
                <b>Date de sortie :</b>
              </p>
              <input
                type="date"
                name="release_date"
                value={movieEditForm.release_date}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Durée :</b>
              </p>
              <input
                type="time"
                name="duration"
                value={movieEditForm.duration}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Genre(s) :</b>
              </p>
              <input
                type="text"
                name="genre"
                value={movieEditForm.genre}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Thème(s) :</b>
              </p>
              <input
                type="text"
                name="theme"
                value={movieEditForm.theme}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Pays d'origine :</b>
              </p>
              <input
                type="text"
                name="country"
                value={movieEditForm.country}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Sortie :</b>
              </p>
              <select
                name="screen"
                value={movieEditForm.screen}
                onChange={handleMovieChange}
              >
                <option value="Cinema">Cinéma</option>
                <option value="Streaming">Streaming</option>
                <option value="TV">TV</option>
                <option value="DVD">DVD</option>
              </select>
            </label>
            <label>
              <p>
                <b>Streaming :</b>
              </p>
              <input
                type="text"
                name="streaming"
                value={movieEditForm.streaming}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Original :</b>
              </p>
              <input
                type="text"
                name="original"
                value={movieEditForm.original}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Univers :</b>
              </p>
              <input
                type="text"
                name="universe"
                value={movieEditForm.universe}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Sous-univers :</b>
              </p>
              <input
                type="text"
                name="subUniverse"
                value={movieEditForm.subUniverse}
                onChange={handleMovieChange}
              />
            </label>
          </div>
          <div className="adminEditMovieST">
            <label>
              <p>
                <b>Synopsis :</b>
              </p>
              <textarea
                name="synopsis"
                value={movieEditForm.synopsis}
                onChange={handleMovieChange}
              />
            </label>
            <label>
              <p>
                <b>Bande-annonce :</b>
              </p>
              <div className="adminEditMovieTrailer">
                {movieEditForm.trailer ? (
                  <iframe
                    src={movieEditForm.trailer}
                    allowFullScreen
                    title={`Trailer du film ${movie.title}`}
                  />
                ) : (
                  <div className="adminEditMovieTrailerPlaceHolder">
                    <FontAwesomeIcon icon={faFilm} />
                    <p>Aucune bande-annonce pour le moment.</p>
                  </div>
                )}
              </div>
              <input
                type="text"
                name="trailer"
                value={movieEditForm.trailer}
                onChange={handleMovieChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="editMovieCasting">
        <h4>Casting du film</h4>
        <div className="editMovieCastingSection">
          <h5>Réalisation</h5>
          {directing && directing.length > 0 ? (
            <div className="editMovieCastingList">
              <HorizontalScroll>
                {directing.map((direction) => (
                  <div className="editMovieCastingCard" key={direction.id}>
                    <div className="editCastPicture">
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
                      onClick={() => handleRemoveCast(direction.id)}
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
        <div className="editMovieCastingSection">
          <h5>Acteurs</h5>
          {acting && acting.length > 0 ? (
            <div className="editMovieCastingList">
              <HorizontalScroll>
                {acting.map((actor) => (
                  <div className="editMovieCastingCard" key={actor.id}>
                    <div className="editCastPicture">
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
                          <FontAwesomeIcon icon={faImage} />
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
                      onClick={() => handleRemoveCast(actor.id)}
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
          <button type="button" onClick={handleAddCast}>
            Ajouter au casting
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

AdminEditMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminEditMovie;
