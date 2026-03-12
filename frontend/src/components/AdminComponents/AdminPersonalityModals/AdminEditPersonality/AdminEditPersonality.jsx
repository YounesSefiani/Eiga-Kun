import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import PropTypes from "prop-types";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImagePortrait,
  faFilm,
  faTv,
  faPlus,
  faTrash,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "./AdminEditPersonality.css";

function AdminEditPersonality({ personality, onUpdate, onCancel, onDelete }) {
  const [personalityEditForm, setPersonalityEditForm] = useState({
    fullname: personality.fullname || "",
    birthdate: personality.birthdate || "",
    deathdate: personality.deathdate || "",
    nationality: personality.nationality || "",
    biography: personality.biography || "",
    profession: personality.profession || "",
    notable_works: personality.notable_works || "",
    sexe: personality.sexe || "",
  });

  const { token } = useContext(AuthContext);

  // États pour les castings éditables (films et séries)
  const [filMoviesEdit, setFilMoviesEdit] = useState(
    (personality.movies || []).map((m) => ({ ...m }))
  );
  const [filSeriesEdit, setFilSeriesEdit] = useState(
    (personality.series || []).map((s) => ({ ...s }))
  );

  // Listes de tous les films/séries disponibles pour l'ajout
  const [allMovies, setAllMovies] = useState([]);
  const [allSeries, setAllSeries] = useState([]);

  // États pour le formulaire d'ajout de casting
  const [newMovieCasting, setNewMovieCasting] = useState({
    movie_id: "",
    role: "",
    side: "Acting",
  });
  const [newSerieCasting, setNewSerieCasting] = useState({
    serie_id: "",
    role: "",
    side: "Acting",
    presence: "",
  });

  // Charger les films et séries disponibles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          connexion.get("/movies"),
          connexion.get("/series"),
        ]);
        setAllMovies(moviesRes.data);
        setAllSeries(seriesRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };
    fetchData();
  }, []);

  // --- FONCTIONS CRUD POUR LES CASTINGS ---

  // Mise à jour locale d'un casting film
  const handleMovieCastingChange = (movieId, field, value) => {
    setFilMoviesEdit((prev) =>
      prev.map((m) => (m.movie_id === movieId ? { ...m, [field]: value } : m))
    );
  };

  // Mise à jour locale d'un casting série
  const handleSerieCastingChange = (serieId, field, value) => {
    setFilSeriesEdit((prev) =>
      prev.map((s) => (s.serie_id === serieId ? { ...s, [field]: value } : s))
    );
  };

  // Sauvegarder un casting film (UPDATE)
  const handleSaveMovieCasting = async (movie) => {
    try {
      await connexion.put(
        `/castings/${movie.id}`,
        {
          role: movie.role,
          side: movie.side,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Casting mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du casting:", error);
      toast.error("Erreur lors de la mise à jour du casting");
    }
  };

  // Sauvegarder un casting série (UPDATE)
  const handleSaveSerieCasting = async (serie) => {
    try {
      await connexion.put(
        `/castings/${serie.id}`,
        {
          role: serie.role,
          side: serie.side,
          presence: serie.presence,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Casting mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du casting:", error);
      toast.error("Erreur lors de la mise à jour du casting");
    }
  };

  // Supprimer un casting film (DELETE)
  const handleDeleteMovieCasting = async (movie) => {
    if (!window.confirm(`Supprimer ${movie.movie_title} de la filmographie ?`)) {
      return;
    }
    try {
      await connexion.delete(`/castings/${movie.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilMoviesEdit((prev) => prev.filter((m) => m.id !== movie.id));
      toast.success("Film retiré de la filmographie !");
    } catch (error) {
      console.error("Erreur lors de la suppression du casting:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  // Supprimer un casting série (DELETE)
  const handleDeleteSerieCasting = async (serie) => {
    if (!window.confirm(`Supprimer ${serie.serie_title} de la filmographie ?`)) {
      return;
    }
    try {
      await connexion.delete(`/castings/${serie.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilSeriesEdit((prev) => prev.filter((s) => s.id !== serie.id));
      toast.success("Série retirée de la filmographie !");
    } catch (error) {
      console.error("Erreur lors de la suppression du casting:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  // Ajouter un nouveau casting film (CREATE)
  const handleAddMovieCasting = async () => {
    if (!newMovieCasting.movie_id) {
      toast.error("Veuillez sélectionner un film");
      return;
    }
    try {
      const response = await connexion.post(
        "/castings",
        {
          personality_id: personality.id,
          movie_id: parseInt(newMovieCasting.movie_id, 10),
          serie_id: null,
          role: newMovieCasting.role,
          side: newMovieCasting.side,
          presence: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Ajouter le nouveau casting à la liste locale
      const addedMovie = allMovies.find(
        (m) => m.id === parseInt(newMovieCasting.movie_id, 10)
      );
      setFilMoviesEdit((prev) => [
        ...prev,
        {
          id: response.data.id,
          movie_id: addedMovie.id,
          movie_title: addedMovie.title,
          movie_poster: addedMovie.poster,
          movie_release_date: addedMovie.release_date,
          role: newMovieCasting.role,
          side: newMovieCasting.side,
        },
      ]);
      setNewMovieCasting({ movie_id: "", role: "", side: "Acting" });
      toast.success("Film ajouté à la filmographie !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du casting:", error);
      toast.error("Erreur lors de l'ajout");
    }
  };

  // Ajouter un nouveau casting série (CREATE)
  const handleAddSerieCasting = async () => {
    if (!newSerieCasting.serie_id) {
      toast.error("Veuillez sélectionner une série");
      return;
    }
    try {
      const response = await connexion.post(
        "/castings",
        {
          personality_id: personality.id,
          movie_id: null,
          serie_id: parseInt(newSerieCasting.serie_id, 10),
          role: newSerieCasting.role,
          side: newSerieCasting.side,
          presence: newSerieCasting.presence,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Ajouter le nouveau casting à la liste locale
      const addedSerie = allSeries.find(
        (s) => s.id === parseInt(newSerieCasting.serie_id, 10)
      );
      setFilSeriesEdit((prev) => [
        ...prev,
        {
          id: response.data.id,
          serie_id: addedSerie.id,
          serie_title: addedSerie.title,
          serie_poster: addedSerie.poster,
          serie_beginning_date: addedSerie.beginning_date,
          serie_ending_date: addedSerie.ending_date,
          role: newSerieCasting.role,
          side: newSerieCasting.side,
          presence: newSerieCasting.presence,
        },
      ]);
      setNewSerieCasting({ serie_id: "", role: "", side: "Acting", presence: "" });
      toast.success("Série ajoutée à la filmographie !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du casting:", error);
      toast.error("Erreur lors de l'ajout");
    }
  };

  // Filtrer les films/séries déjà dans la filmographie
  const availableMovies = allMovies.filter(
    (m) => !filMoviesEdit.some((fm) => fm.movie_id === m.id)
  );
  const availableSeries = allSeries.filter(
    (s) => !filSeriesEdit.some((fs) => fs.serie_id === s.id)
  );

  const [pictureInput, setPictureInput] = useState({
    url: personality.picture || "",
    file: null,
  });

  const handleImageChange = (e) => {
    if (e.target.type === "file" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPictureInput({ url: "", file });
    } else {
      const url = e.target.value;
      setPictureInput({ url, file: null });
    }
  };

   const formatYear = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getFullYear();
  };

  const previewImage = (input) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Personalities/Pictures/${input.url}`;
    return "";
  };

  const handlePersonalityChange = (e) => {
    setPersonalityEditForm({
      ...personalityEditForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePersonalityEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(personalityEditForm).forEach(([key, value]) => {
      if (key === "movies" || key === "series") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    if (pictureInput.file) formData.append("picture", pictureInput.file);
    connexion
      .put(`/personalities/${personality.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onUpdate(response.data.updatePersonality);
      })
      .catch((error) => console.log(error));
  };

  const handleDeletePersonality = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${personality.fullname} ?`)) {
      connexion
        .delete(`/personalities/${personality.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onDelete(personality.id);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <form
      className="adminEditPersonalityForm"
      onSubmit={handlePersonalityEditSubmit}
    >
      <h2>Modifier la personnalité</h2>
      <div className="adminEditPersonalityFormHeader">
        <label>
          <input
            type="text"
            name="fullname"
            value={personalityEditForm.fullname}
            onChange={handlePersonalityChange}
          ></input>
        </label>
        <div className="adminEditPersonalityActions">
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={handleDeletePersonality}>Supprimer</button>
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </div>
      <div className="adminEditPersonalityFormBody">
        <div className="adminEditPersonalityFormBodyLeft">
          <label>
            <div className="adminEditPersonalityPicture">
              {pictureInput.url || pictureInput.file ? (
                <img
                  src={previewImage(pictureInput, "Pictures")}
                  alt={personality.fullname}
                />
              ) : (
                <div className="adminEditPersonalityPicturePlaceholder">
                  <FontAwesomeIcon icon={faImagePortrait} />
                  <span>Aucune image pour le moment.</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              value={pictureInput.file || ""}
              onChange={handleImageChange}
            ></input>
            <input
              type="text"
              value={pictureInput.url || ""}
              onChange={(e) => handleImageChange(e, "picture")}
              placeholder="URL de l'image"
            ></input>
          </label>
        </div>
        <div className="adminEditPersonalityFormBodyRight">
          <div className="adminEditPersonalityInfos">
            <label>
              Date de naissance
              <input
                type="date"
                name="birthdate"
                value={personalityEditForm.birthdate}
                onChange={handlePersonalityChange}
              ></input>
            </label>
            <label>
              Date de décès
              <input
                type="date"
                name="deathdate"
                value={personalityEditForm.deathdate}
                onChange={handlePersonalityChange}
              ></input>
            </label>
            <label>
              Sexe
              <select
                name="sexe"
                value={personalityEditForm.sexe}
                onChange={handlePersonalityChange}
              >
                <option value="Male">Homme</option>
                <option value="Female">Femme</option>
                <option value="Transgender">Transgenre</option>
                <option value="Non-binary">Non-Binaire</option>
                <option value="Other">Autre</option>
              </select>
            </label>
            <label>
              Nationalité
              <input
                type="text"
                name="nationality"
                value={personalityEditForm.nationality}
                onChange={handlePersonalityChange}
              ></input>
            </label>
            <label>
              Profession
              <input
                type="text"
                name="profession"
                value={personalityEditForm.profession}
                onChange={handlePersonalityChange}
              ></input>
            </label>
            <label>
              Travaux notables
              <input
                type="text"
                name="notable_works"
                value={personalityEditForm.notable_works}
                onChange={handlePersonalityChange}
              ></input>
            </label>
          </div>
          <div className="adminEditPersonalityBiography">
            <label>
              Biographie
              <textarea
                name="biography"
                value={personalityEditForm.biography}
                onChange={handlePersonalityChange}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
      <div className="adminEditPersonalityFormFilmography">
        <h3>Filmographie</h3>
        
        {/* SECTION FILMS */}
        <div className="adminEditFilmographySection">
          <h4>Films</h4>
          
          {/* Formulaire d'ajout de film */}
          <div className="adminEditFilmographyAdd">
            <select
              value={newMovieCasting.movie_id}
              onChange={(e) =>
                setNewMovieCasting({ ...newMovieCasting, movie_id: e.target.value })
              }
            >
              <option value="">-- Sélectionner un film --</option>
              {availableMovies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} ({formatYear(movie.release_date)})
                </option>
              ))}
            </select>
            <select
              value={newMovieCasting.side}
              onChange={(e) =>
                setNewMovieCasting({ ...newMovieCasting, side: e.target.value })
              }
            >
              <option value="Acting">Acteur</option>
              <option value="Directing">Réalisation</option>
            </select>
            <input
              type="text"
              placeholder="Rôle"
              value={newMovieCasting.role}
              onChange={(e) =>
                setNewMovieCasting({ ...newMovieCasting, role: e.target.value })
              }
            />
            <button type="button" onClick={handleAddMovieCasting}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter
            </button>
          </div>

          {filMoviesEdit && filMoviesEdit.length > 0 ? (
            <div className="adminEditFilmographyList">
              <HorizontalScroll>
                {filMoviesEdit.map((movie) => (
                  <div
                    className="adminEditFilmographyCard"
                    key={movie.id || movie.movie_id}
                  >
                    <h4 title={`${movie.movie_title} - (${formatYear(movie.movie_release_date)})`}>
                      {movie.movie_title} - ({formatYear(movie.movie_release_date)})
                    </h4>
                    <div className="adminEditFilmographyPoster">
                      {movie.movie_poster ? (
                        <img
                          src={
                            movie.movie_poster &&
                            movie.movie_poster.startsWith("http")
                              ? movie.movie_poster
                              : movie.movie_poster
                                ? `http://localhost:3994/src/assets/Movies/Posters/${movie.movie_poster}`
                                : ""
                          }
                          alt={movie.movie_title}
                        />
                      ) : (
                        <div className="adminEditFilmographyPosterHolder">
                          <FontAwesomeIcon icon={faFilm} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <label>
                      Side :
                      <select
                        value={movie.side || "Acting"}
                        onChange={(e) =>
                          handleMovieCastingChange(movie.movie_id, "side", e.target.value)
                        }
                      >
                        <option value="Directing">Réalisation</option>
                        <option value="Acting">Acteur</option>
                      </select>
                    </label>
                    <label>
                      Rôle :
                      <input
                        type="text"
                        value={movie.role || ""}
                        onChange={(e) =>
                          handleMovieCastingChange(movie.movie_id, "role", e.target.value)
                        }
                      />
                    </label>
                    <div className="adminEditFilmographyCardActions">
                      <button
                        type="button"
                        className="saveBtn"
                        onClick={() => handleSaveMovieCasting(movie)}
                        title="Sauvegarder"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => handleDeleteMovieCasting(movie)}
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          ) : (
            <p>Aucun film pour le moment.</p>
          )}
        </div>

        {/* SECTION SÉRIES */}
        <div className="adminEditFilmographySection">
          <h4>Séries</h4>
          
          {/* Formulaire d'ajout de série */}
          <div className="adminEditFilmographyAdd">
            <select
              value={newSerieCasting.serie_id}
              onChange={(e) =>
                setNewSerieCasting({ ...newSerieCasting, serie_id: e.target.value })
              }
            >
              <option value="">-- Sélectionner une série --</option>
              {availableSeries.map((serie) => (
                <option key={serie.id} value={serie.id}>
                  {serie.title} ({formatYear(serie.beginning_date)})
                </option>
              ))}
            </select>
            <select
              value={newSerieCasting.side}
              onChange={(e) =>
                setNewSerieCasting({ ...newSerieCasting, side: e.target.value })
              }
            >
              <option value="Acting">Acteur</option>
              <option value="Directing">Réalisation</option>
            </select>
            <input
              type="text"
              placeholder="Rôle"
              value={newSerieCasting.role}
              onChange={(e) =>
                setNewSerieCasting({ ...newSerieCasting, role: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Présence (ex: Saison 1-3)"
              value={newSerieCasting.presence}
              onChange={(e) =>
                setNewSerieCasting({ ...newSerieCasting, presence: e.target.value })
              }
            />
            <button type="button" onClick={handleAddSerieCasting}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter
            </button>
          </div>

          {filSeriesEdit && filSeriesEdit.length > 0 ? (
            <div className="adminEditFilmographyList">
              <HorizontalScroll>
                {filSeriesEdit.map((serie) => (
                  <div
                    className="adminEditFilmographyCard"
                    key={serie.id || serie.serie_id}
                  >
                    <h4 title={`${serie.serie_title} - (${formatYear(serie.serie_beginning_date)} - ${formatYear(serie.serie_ending_date)})`}>
                      {serie.serie_title} ({formatYear(serie.serie_beginning_date)} - {formatYear(serie.serie_ending_date)})
                    </h4>
                    <div className="adminEditFilmographyPoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="adminEditFilmographyPosterHolder">
                          <FontAwesomeIcon icon={faTv} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <label>
                      Side :
                      <select
                        value={serie.side || "Acting"}
                        onChange={(e) =>
                          handleSerieCastingChange(serie.serie_id, "side", e.target.value)
                        }
                      >
                        <option value="Directing">Réalisation</option>
                        <option value="Acting">Acteur</option>
                      </select>
                    </label>
                    <label>
                      Rôle :
                      <input
                        type="text"
                        value={serie.role || ""}
                        onChange={(e) =>
                          handleSerieCastingChange(serie.serie_id, "role", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Présence :
                      <input
                        type="text"
                        value={serie.presence || ""}
                        onChange={(e) =>
                          handleSerieCastingChange(serie.serie_id, "presence", e.target.value)
                        }
                      />
                    </label>
                    <div className="adminEditFilmographyCardActions">
                      <button
                        type="button"
                        className="saveBtn"
                        onClick={() => handleSaveSerieCasting(serie)}
                        title="Sauvegarder"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => handleDeleteSerieCasting(serie)}
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          ) : (
            <p>Aucune série pour le moment.</p>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
}

AdminEditPersonality.propTypes = {
  personality: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminEditPersonality;
