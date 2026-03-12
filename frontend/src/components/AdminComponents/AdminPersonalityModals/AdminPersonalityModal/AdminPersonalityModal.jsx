import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminEditPersonality from "../AdminEditPersonality/AdminEditPersonality";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImagePortrait,
  faFilm,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminPersonalityModal.css";

function AdminPersonalityModal({
  personality,
  show,
  onUpdate,
  onClose,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (!show || !personality) {
    return null;
  }
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calcul de l'âge si vivant
  let age;
  if (
    personality.birthdate &&
    !personality.deathdate &&
    personality.birthdate !== "1900-01-01"
  ) {
    const currentDate = new Date();
    const birth = new Date(personality.birthdate);
    let a = currentDate.getFullYear() - birth.getFullYear();
    const monthDiff = currentDate.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birth.getDate())
    ) {
      a--;
    }
    age = a;
  }

  // Calcul de l'âge au décès si mort
  const deathAge = (() => {
    if (
      personality.birthdate &&
      personality.deathdate &&
      personality.birthdate !== "1900-01-01" &&
      personality.deathdate !== "1900-01-01"
    ) {
      const birth = new Date(personality.birthdate);
      const death = new Date(personality.deathdate);
      let a = death.getFullYear() - birth.getFullYear();
      const monthDiff = death.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && death.getDate() < birth.getDate())
      ) {
        a--;
      }
      return a;
    }
    return null;
  })();

  const formatYear = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getFullYear();
  };

  const movies = personality.movies || [];
  const series = personality.series || [];

  return (
    <>
      <div
        className="adminPersonalityOverlay"
        onClick={() => {
          onClose();
          setIsEditing(false);
        }}
      ></div>
      <div className="adminPersonalityModal">
        {isEditing ? (
          <AdminEditPersonality
            personality={personality}
            onUpdate={(updatedPersonality) => {
              onUpdate(updatedPersonality);
              setIsEditing(false);
            }}
            onClose={onClose}
            onDelete={onDelete}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="adminPersonalityModalHeader">
              <h4 title={personality.fullname}>{personality.fullname}</h4>
              <div className="adminPersonalityModalActions">
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => {
                  onClose();
                  setIsEditing(false);
                }}>Fermer</button>
              </div>
            </div>
            <div className="adminPersonalityModalContent">
              <div className="adminPersonalityModalLeft">
                <div className="adminPersonalityModalPicture">
                  {personality.picture ? (
                    <img
                      src={
                        personality.picture &&
                        personality.picture.startsWith("http")
                          ? personality.picture
                          : `http://localhost:3994/src/assets/Personalities/Pictures/${personality.picture}`
                      }
                      alt={personality.fullname}
                    />
                  ) : (
                    <div className="adminPersonalityModalPicturePlaceHolder">
                      <FontAwesomeIcon icon={faImagePortrait} />
                      <p>Aucune image pour le moment</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="adminPersonalityModalRight">
                <div className="adminPersonalityInfos">
                  <p>
                    <strong>Nom complet :</strong>
                    <br /> {personality.fullname}
                  </p>
                  <p>
                    <strong>Date de naissance :</strong>
                    <br /> {formatDate(personality.birthdate)} - ({age} ans)
                  </p>
                  {personality.deathdate && (
                    <p>
                      <strong>Date de décès :</strong>{" "}
                      {formatDate(personality.deathdate)} - ({deathAge} ans)
                    </p>
                  )}
                  <p>
                    <strong>Genre :</strong>
                    <br />{" "}
                    {personality.sexe == "Male"
                      ? "Homme"
                      : personality.sexe == "Female"
                        ? "Femme"
                        : personality.sexe == "Non-binary"
                          ? "Non-Binaire"
                          : personality.sexe == "Transgender"
                            ? "Transgenre"
                            : personality.sexe == "Other"
                              ? "Autre"
                              : "Inconnu"}
                  </p>
                  <p>
                    <strong>Origine(s):</strong>
                    <br />
                    {personality.nationality}
                  </p>
                  <p>
                    <strong>Profession(s):</strong>
                    <br />
                    {personality.profession}
                  </p>
                  <p>
                    <strong>Rôles notables :</strong>
                    <br />
                    {personality.notable_works}...
                  </p>
                </div>
                <div className="adminPersonalityBio">
                  <h5>Biographie</h5>
                  <p>{personality.biography}</p>
                </div>
              </div>
            </div>
            <div className="adminPersonalityFilmography">
              <h3>Filmographie</h3>
              <div className="adminPersonalityFilmographySection">
                <h4>Films</h4>
                {movies && movies.length > 0 ? (
                  <div className="adminPersonalityFilmographyMovies">
                    <HorizontalScroll>
                      {movies.map((movie) => (
                        <div
                          className="adminPersonalityMovieCard"
                          key={movie.id}
                          title={movie.title}
                        >
                          <h5 title={movie.movie_title}>
                            {movie.movie_title} - (
                            {formatYear(movie.movie_release_date)})
                          </h5>
                          <div className="adminPersonalityMoviePoster">
                            {movie.movie_poster ? (
                              <img
                                src={
                                  movie.movie_poster &&
                                  movie.movie_poster.startsWith("http")
                                    ? movie.movie_poster
                                    : `http://localhost:3994/src/assets/Movies/Posters/${movie.movie_poster}`
                                }
                                alt={movie.movie_title}
                              />
                            ) : (
                              <div className="adminPersonalityMoviePosterPlaceHolder">
                                <FontAwesomeIcon icon={faFilm} />
                                <p>Aucune image pour le moment</p>
                              </div>
                            )}
                          </div>
                          <p title={movie.role}>
                            <strong>Rôle :</strong>
                            <br />
                            {movie.role}
                          </p>
                        </div>
                      ))}
                    </HorizontalScroll>
                  </div>
                ) : (
                  <p>Aucun film dans sa filmographie pour le moment.</p>
                )}
              </div>
              <div className="adminPersonalityFilmographySection">
                <h4>Séries</h4>
                {series && series.length > 0 ? (
                  <div className="adminPersonalityFilmographySeries">
                    <HorizontalScroll>
                      {series.map((serie) => (
                        <div
                          className="adminPersonalityMovieCard"
                          key={serie.id}
                          title={serie.title}
                        >
                          <h5 title={serie.serie_title}>
                            {serie.serie_title} <br />(
                            {formatYear(serie.serie_beginning_date)}) - (
                            {formatYear(serie.serie_ending_date)})
                          </h5>
                          <div className="adminPersonalityMoviePoster">
                            {serie.serie_poster ? (
                              <img
                                src={
                                  serie.serie_poster &&
                                  serie.serie_poster.startsWith("http")
                                    ? serie.serie_poster
                                    : `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                }
                                alt={serie.serie_title}
                              />
                            ) : (
                              <div className="adminPersonalityMoviePosterPlaceHolder">
                                <FontAwesomeIcon icon={faTv} />
                                <p>Aucune image pour le moment</p>
                              </div>
                            )}
                          </div>
                          <p title={serie.role}>
                            <strong>Rôle :</strong>
                            <br />
                            {serie.role}
                          </p>
                          <p title={serie.presence}>
                            <strong>Présence :</strong>
                            <br />
                            {serie.presence}
                          </p>
                        </div>
                      ))}
                    </HorizontalScroll>
                  </div>
                ) : (
                  <p>Aucune série dans sa filmographie pour le moment.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

AdminPersonalityModal.propTypes = {
  personality: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminPersonalityModal;
