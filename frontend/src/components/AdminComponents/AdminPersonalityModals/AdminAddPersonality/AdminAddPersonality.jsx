import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../../../services/connexion";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImagePortrait,
  faFilm,
  faTv,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import "./AdminAddPersonality.css";

function AdminAddPersonality({ onClose, onPersonalityAdded }) {
  const addPersonalityForm = {
    fullname: "",
    birthdate: "",
    deathdate: "",
    nationality: "",
    profession: "",
    notable_works: "",
    sexe: "",
    biography: "",
    picture: "",
  };

  const { token } = useContext(AuthContext);
  const [personality, setPersonality] = useState(addPersonalityForm);
  const [pictureInput, setPictureInput] = useState({ url: "", file: null });

  const [filmoMovies, setFilmoMovies] = useState([]);
  const [filmoSeries, setFilmoSeries] = useState([]);

  const [allMovies, setAllMovies] = useState([]);
  const [allSeries, setAllSeries] = useState([]);

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
        console.error("Erreur lors du chargement des films et séries :", error);
      }
    };
    fetchData();
  }, []);

  // Formater l'année
  const formatYear = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getFullYear();
  };

  // Filtrer les films/séries déjà dans la filmographie
  const availableMovies = allMovies.filter(
    (m) => !filmoMovies.some((fm) => fm.movie_id === m.id),
  );
  const availableSeries = allSeries.filter(
    (s) => !filmoSeries.some((fs) => fs.serie_id === s.id),
  );

  // Ajouter un film à la filmographie locale
  const handleAddMovieToFilmo = () => {
    if (!newMovieCasting.movie_id) {
      toast.error("Veuillez sélectionner un film");
      return;
    }
    const movie = allMovies.find(
      (m) => m.id === parseInt(newMovieCasting.movie_id, 10),
    );
    setFilmoMovies((prev) => [
      ...prev,
      {
        movie_id: movie.id,
        movie_title: movie.title,
        movie_poster: movie.poster,
        movie_release_date: movie.release_date,
        role: newMovieCasting.role,
        side: newMovieCasting.side,
      },
    ]);
    setNewMovieCasting({ movie_id: "", role: "", side: "Acting" });
  };

  // Supprimer un film de la filmographie locale
  const handleRemoveMovieFromFilmo = (movieId) => {
    setFilmoMovies((prev) => prev.filter((m) => m.movie_id !== movieId));
  };

  // Ajouter une série à la filmographie locale
  const handleAddSerieToFilmo = () => {
    if (!newSerieCasting.serie_id) {
      toast.error("Veuillez sélectionner une série");
      return;
    }
    const serie = allSeries.find(
      (s) => s.id === parseInt(newSerieCasting.serie_id, 10),
    );
    setFilmoSeries((prev) => [
      ...prev,
      {
        serie_id: serie.id,
        serie_title: serie.title,
        serie_poster: serie.poster,
        serie_beginning_date: serie.beginning_date,
        serie_ending_date: serie.ending_date,
        role: newSerieCasting.role,
        side: newSerieCasting.side,
        presence: newSerieCasting.presence,
      },
    ]);
    setNewSerieCasting({
      serie_id: "",
      role: "",
      side: "Acting",
      presence: "",
    });
  };

  // Supprimer une série de la filmographie locale
  const handleRemoveSerieFromFilmo = (serieId) => {
    setFilmoSeries((prev) => prev.filter((s) => s.serie_id !== serieId));
  };

  const handlePersonnalitySubmit = (e) => {
    const { name, value } = e.target;
    setPersonality((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPictureInput({ url: "", file });
    } else {
      const url = e.target.value;
      setPictureInput({ url, file: null });
    }
  };

  const previewPicture = (input) => {
    if (input.file) return URL.createObjectURL(input.file);
    if (input.url && input.url.startsWith("http")) return input.url;
    if (input.url)
      return `http://localhost:3994/src/assets/Personalities/Pictures/${input.url}`;
    return "";
  };

  const handlePersonalityAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullname", personality.fullname);
    formData.append("birthdate", personality.birthdate);
    formData.append("deathdate", personality.deathdate);
    formData.append("nationality", personality.nationality);
    formData.append("profession", personality.profession);
    formData.append("notable_works", personality.notable_works);
    formData.append("sexe", personality.sexe);
    formData.append("biography", personality.biography);
    if (pictureInput.file) {
      formData.append("picture", pictureInput.file);
    } else if (pictureInput.url) {
      formData.append("picture", pictureInput.url);
    }
    try {
      const response = await connexion.post("/personalities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const newPersonalityId = response.data.id;
      if (newPersonalityId) {
        // Créer les castings pour les films
        for (const movie of filmoMovies) {
          await connexion.post(
            "/castings",
            {
              personality_id: newPersonalityId,
              movie_id: movie.movie_id,
              serie_id: null,
              role: movie.role,
              side: movie.side,
              presence: null,
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }
        // Créer les castings pour les séries
        for (const serie of filmoSeries) {
          await connexion.post(
            "/castings",
            {
              personality_id: newPersonalityId,
              movie_id: null,
              serie_id: serie.serie_id,
              role: serie.role,
              side: serie.side,
              presence: serie.presence,
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }
        const personalityResponse = await connexion.get(
          `/personalities/${newPersonalityId}/full`,
        );
        const createdPersonality = personalityResponse.data;
        toast.success("Personnalité ajoutée avec succès !");
        setPersonality(addPersonalityForm);
        setPictureInput({ url: "", file: null });
        setFilmoMovies([]);
        setFilmoSeries([]);
        if (onPersonalityAdded) onPersonalityAdded(createdPersonality);
        if (onClose) onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Une erreur est survenue lors de l'ajout de la personnalité.",
      );
      console.error("Error adding personality:", error);
    }
  };

  return (
    <>
      <div className="adminAddPersonalityOverlay"></div>
      <form
        className="adminAddPersonalityModal"
        onSubmit={handlePersonalityAdd}
      >
        <h2>Ajouter une personnalité</h2>
        <div className="adminAddPersonalityHeader">
          <input
            type="text"
            name="fullname"
            placeholder="Nom complet"
            onChange={handlePersonnalitySubmit}
            required
          />
          <div className="adminAddPersonalityActions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </div>
        <div className="adminAddPersonalityBody">
          <div className="adminAddPersonalityLeft">
            <div className="adminAddPersonalityPicture">
              {pictureInput.file || pictureInput.url ? (
                <img
                  src={previewPicture(pictureInput, "Pictures")}
                  alt="Aperçu"
                />
              ) : (
                <div className="adminAddPersonalityPicturePlaceHolder">
                  <FontAwesomeIcon icon={faImagePortrait} />
                  <span>Ajouter une image</span>
                </div>
              )}
            </div>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
              <input
                type="text"
                placeholder="URL de l'image"
                onChange={handlePictureChange}
              />
            </label>
          </div>
          <div className="adminAddPersonalityRight">
            <div className="adminAddPersonalityInfos">
              <label>
                Date de naissance
                <input
                  type="date"
                  name="birthdate"
                  onChange={handlePersonnalitySubmit}
                />
              </label>
              <label>
                Date de décès
                <input
                  type="date"
                  name="deathdate"
                  onChange={handlePersonnalitySubmit}
                />
              </label>
              <label>
                Genre
                <select name="sexe" onChange={handlePersonnalitySubmit}>
                  <option value="">Sélectionner</option>
                  <option value="Male">Homme</option>
                  <option value="Female">Femme</option>
                  <option value="Non-binary">Non-binaire</option>
                  <option value="Transgender">Transgenre</option>
                  <option value="Other">Autre</option>
                </select>
              </label>
              <label>
                Nationalité
                <input
                  type="text"
                  name="nationality"
                  onChange={handlePersonnalitySubmit}
                  placeholder="Français, Anglais..."
                />
              </label>
              <label>
                Profession
                <input
                  type="text"
                  name="profession"
                  onChange={handlePersonnalitySubmit}
                  placeholder="Acteur(-trice), Réalisateur(-trice)...."
                />
              </label>
              <label>
                Oeuvres notables
                <input
                  type="text"
                  name="notable_works"
                  onChange={handlePersonnalitySubmit}
                  placeholder="Les films et/ou séries qui ont fait sa popularité"
                />
              </label>
            </div>
            <div className="adminAddPersonalityBiography">
              <label>
                Biographie
                <textarea
                  name="biography"
                  onChange={handlePersonnalitySubmit}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="adminAddPersonalityFilmography">
          <h3>Filmographie</h3>

          {/* SECTION FILMS */}
          <div className="adminAddFilmographySection">
            <h4>Films</h4>
            <div className="adminAddFilmographyForm">
              <select
                value={newMovieCasting.movie_id}
                onChange={(e) =>
                  setNewMovieCasting({
                    ...newMovieCasting,
                    movie_id: e.target.value,
                  })
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
                  setNewMovieCasting({
                    ...newMovieCasting,
                    side: e.target.value,
                  })
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
                  setNewMovieCasting({
                    ...newMovieCasting,
                    role: e.target.value,
                  })
                }
              />
              <button type="button" onClick={handleAddMovieToFilmo}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter
              </button>
            </div>

            <div className="adminAddFilmographyList">
              {filmoMovies && filmoMovies.length > 0 ? (
                <HorizontalScroll>
                  {filmoMovies.map((movie) => (
                    <div
                      className="adminAddFilmographyCard"
                      key={movie.movie_id}
                    >
                      <h4
                        title={`${movie.movie_title} - (${formatYear(movie.movie_release_date)})`}
                      >
                        {movie.movie_title} (
                        {formatYear(movie.movie_release_date)})
                      </h4>
                      <div className="adminAddFilmographyPoster">
                        {movie.movie_poster ? (
                          <img
                            src={
                              movie.movie_poster.startsWith("http")
                                ? movie.movie_poster
                                : `http://localhost:3994/src/assets/Movies/Posters/${movie.movie_poster}`
                            }
                            alt={movie.movie_title}
                          />
                        ) : (
                          <div className="adminAddFilmographyPosterPlaceholder">
                            <FontAwesomeIcon icon={faFilm} />
                            <p>Pas d'affiche</p>
                          </div>
                        )}
                      </div>
                      <p>
                        <strong>Rôle:</strong>
                        <br />
                        {movie.role}
                      </p>
                      <p>
                        <strong>Side:</strong>
                        <br />
                        {movie.side}
                      </p>
                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() =>
                          handleRemoveMovieFromFilmo(movie.movie_id)
                        }
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </HorizontalScroll>
              ) : (
                <p>Aucun film dans la filmographie</p>
              )}
            </div>
          </div>

          {/* SECTION SÉRIES */}
          <div className="adminAddFilmographySection">
            <h4>Séries</h4>
            <div className="adminAddFilmographyForm">
              <select
                value={newSerieCasting.serie_id}
                onChange={(e) =>
                  setNewSerieCasting({
                    ...newSerieCasting,
                    serie_id: e.target.value,
                  })
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
                  setNewSerieCasting({
                    ...newSerieCasting,
                    side: e.target.value,
                  })
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
                  setNewSerieCasting({
                    ...newSerieCasting,
                    role: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Présence (ex: Saison 1-3)"
                value={newSerieCasting.presence}
                onChange={(e) =>
                  setNewSerieCasting({
                    ...newSerieCasting,
                    presence: e.target.value,
                  })
                }
              />
              <button type="button" onClick={handleAddSerieToFilmo}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter
              </button>
            </div>

            <div className="adminAddFilmographyList">
              {filmoSeries && filmoSeries.length > 0 ? (
                <HorizontalScroll>
                  {filmoSeries.map((serie) => (
                    <div
                      className="adminAddFilmographyCard"
                      key={serie.serie_id}
                    >
                      <h4
                        title={`${serie.serie_title} (${formatYear(serie.serie_beginning_date)} - ${formatYear(serie.serie_ending_date)})`}
                      >
                        {serie.serie_title} (
                        {formatYear(serie.serie_beginning_date)} -{" "}
                        {formatYear(serie.serie_ending_date)})
                      </h4>
                      <div className="adminAddFilmographyPoster">
                        {serie.serie_poster ? (
                          <img
                            src={
                              serie.serie_poster.startsWith("http")
                                ? serie.serie_poster
                                : `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                            }
                            alt={serie.serie_title}
                          />
                        ) : (
                          <div className="adminAddFilmographyPosterPlaceholder">
                            <FontAwesomeIcon icon={faTv} />
                            <p>Pas d'affiche</p>
                          </div>
                        )}
                      </div>
                      <p>
                        <strong>Side:</strong>{" "}
                        {serie.side === "Acting" ? "Acteur" : "Réalisation"}
                      </p>
                      <p>
                        <strong>Rôle:</strong> {serie.role || "-"}
                      </p>
                      <p>
                        <strong>Présence:</strong> {serie.presence || "-"}
                      </p>
                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() =>
                          handleRemoveSerieFromFilmo(serie.serie_id)
                        }
                        title="Supprimer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </HorizontalScroll>
              ) : (
                <p>Aucune série dans la filmographie</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

AdminAddPersonality.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPersonalityAdded: PropTypes.func.isRequired,
};

export default AdminAddPersonality;
