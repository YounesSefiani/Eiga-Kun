import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminEditMovie from "../AdminEditMovie/AdminEditMovie";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPanorama,
  faCopyright,
  faFilm,
  faPenSquare,
  faTrash,
  faXmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminMovieModal.css";

function AdminMovieModal({ movie, show, onUpdate, onClose, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!show || !movie) {
    return null;
  }

  const casting = movie.casting || [];
  const directing = casting.filter((cast) => cast.side === "Directing");
  const acting = casting.filter((cast) => cast.side === "Acting");

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
    <>
      <div
        className="adminMovieModalOverlay"
        onClick={() => {
          onClose();
          setIsEditing(false);
        }}
      ></div>

      <div className="adminMovieModal">
        {isEditing ? (
          <AdminEditMovie
            movie={movie}
            onUpdate={(updatedMovie) => {
              onUpdate(updatedMovie);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
            onDelete={onDelete}
          />
        ) : (
          <>
            <div className="adminMovieModalHeader">
              <h4 title={movie.title}>{movie.title}</h4>
              <div className="adminMovieModalActions">
                <button
                  type="button"
                  title="Modifier ce film"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPenSquare} />
                </button>
                <button
                  type="button"
                  title="Supprimer ce film"
                  onClick={() => onDelete(movie.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button type="button" onClick={onClose}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            <div className="adminMovieModalContent">
              <div className="adminMovieModalLeft">
                <div className="adminMovieModalPoster">
                  {movie.poster ? (
                    <img
                      src={
                        movie.poster && movie.poster.startsWith("http")
                          ? movie.poster
                          : movie.poster
                            ? `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                            : ""
                      }
                      alt={movie.title}
                    />
                  ) : (
                    <div className="adminMoviePosterHolder">
                      <FontAwesomeIcon icon={faImage} />
                      <p>Aucune affiche disponible pour le moment.</p>
                    </div>
                  )}
                </div>
                <div className="adminMovieModalBackground">
                  {movie.background ? (
                    <img
                      src={
                        movie.background && movie.background.startsWith("http")
                          ? movie.background
                          : movie.background
                            ? `http://localhost:3994/src/assets/Movies/Backgrounds/${movie.background}`
                            : ""
                      }
                      alt={movie.title}
                    />
                  ) : (
                    <div className="adminMovieBackgroundHolder">
                      <FontAwesomeIcon icon={faPanorama} />
                      <p>Aucun arrière plan disponible pour le moment.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="adminMovieModalRight">
                <div className="adminMovieModalLogo">
                  {movie.logo ? (
                    <img
                      src={
                        movie.logo && movie.logo.startsWith("http")
                          ? movie.logo
                          : movie.logo
                            ? `http://localhost:3994/src/assets/Movies/Logos/${movie.logo}`
                            : ""
                      }
                      alt={movie.title}
                    />
                  ) : (
                    <div className="adminMovieLogoHolder">
                      <FontAwesomeIcon icon={faCopyright} />
                      <p>Aucun logo disponible pour le moment.</p>
                    </div>
                  )}
                </div>
                <div className="adminMovieModalInfos">
                  <p>
                    <b>Date de sortie :</b>
                    <br /> {formatDate(movie.release_date)}
                  </p>
                  <p>
                    <b>Durée :</b>
                    <br /> {movie.duration}
                  </p>
                  <p>
                    <b>Genre(s) :</b>
                    <br /> {movie.genre}
                  </p>
                  <p>
                    <b>Thème(s) :</b>
                    <br /> {movie.theme}
                  </p>
                  <p>
                    <b>Provenance(s) :</b>
                    <br /> {movie.country}
                  </p>
                  <p>
                    <b>Sortie :</b>
                    <br /> {movie.screen}
                  </p>
                  <p>
                    <b>Streaming :</b>
                    <br /> {movie.streaming}
                  </p>
                  <p>
                    <b>Original :</b>
                    <br /> {movie.original}
                  </p>
                  <p>
                    <b>Univers :</b>
                    <br /> {movie.universe}
                  </p>
                  <p>
                    <b>Sous-univers :</b>
                    <br /> {movie.subUniverse}
                  </p>
                </div>
                <div className="adminMovieModalST">
                  <div className="adminMovieModalSynopsis">
                    <h5>Synopsis :</h5>
                    <p>{movie.synopsis}</p>
                  </div>
                  <div className="adminMovieModalTrailer">
                    <h5>Trailer :</h5>
                    <iframe
                      src={movie.trailer}
                      title={movie.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className="adminMovieModalCasting">
                      <h4>Casting du film {movie.title}</h4>
              <div className="adminMovieCastingSection">
                <h4>Réalisation</h4>
                {directing.length > 0 ? (
                  <div className="adminMovieCastingList">
                    <HorizontalScroll>
                      {directing.map((cast) => (
                        <div className="adminMovieCastingCard" key={cast.id}>
                          <div className="adminMovieCastingPicture">
                            {cast.personality_picture ? (
                              <img
                                src={
                                  cast.personality_picture &&
                                  cast.personality_picture.startsWith("http")
                                    ? cast.personality_picture
                                    : cast.personality_picture
                                      ? `http://localhost:3994/src/assets/Personalities/Pictures/${cast.personality_picture}`
                                      : ""
                                }
                                alt={cast.personalityName}
                              />
                            ) : (
                              <div className="adminMovieCastingPictureHolder">
                                <FontAwesomeIcon icon={faFilm} />
                              </div>
                            )}
                          </div>
                            <p title={cast.personality_fullname}>
                            {cast.personality_fullname}
                          </p>
                          <p title={cast.role}>{cast.role}</p>
                        </div>
                      ))}
                    </HorizontalScroll>
                  </div>
                ) : (
                  <p>Equipe à la réalisation inconnue pour le moment.</p>
                )}
              </div>
              <div className="adminMovieCastingSection">
                <h4>Acteurs & Actrices</h4>
                {acting.length > 0 ? (
                  <div className="adminMovieCastingList">
                    <HorizontalScroll>
                      {acting.map((cast) => (
                        <div className="adminMovieCastingCard" key={cast.id}>
                          <div className="adminMovieCastingPicture">
                            {cast.personality_picture ? (
                              <img
                                src={
                                  cast.personality_picture &&
                                  cast.personality_picture.startsWith("http")
                                    ? cast.personality_picture
                                    : cast.personality_picture
                                      ? `http://localhost:3994/src/assets/Personalities/Pictures/${cast.personality_picture}`
                                      : ""
                                }
                                alt={cast.personality_fullname}
                              />
                            ) : (
                              <div className="adminMovieCastingPictureHolder">
                                <FontAwesomeIcon icon={faStar} />
                              </div>
                            )}
                          </div>
                          <p title={cast.personality_fullname}>
                            {cast.personality_fullname}
                          </p>
                          <p title={cast.role}>{cast.role}</p>
                        </div>
                      ))}
                    </HorizontalScroll>
                  </div>
                ) : (
                  <p>Aucun acteurs ni actrices mentionnées pour le moment.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

AdminMovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminMovieModal;
