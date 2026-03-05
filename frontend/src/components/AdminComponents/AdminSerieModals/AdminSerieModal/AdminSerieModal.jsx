import React, { useState } from "react";
import PropTypes from "prop-types";
import AdminEditSerie from "../AdminEditSerie/AdminEditSerie";
import HorizontalScroll from "../../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPanorama,
  faCopyright,
  faXmark,
  faStar,
  faVideo,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import AdminEditEpisodesModal from "../AdminEditSerie/AdminEditEpisodesModal/AdminEditEpisodesModal";
import "./AdminSerieModal.css";

function AdminSerieModal({ serie, show, onUpdate, onClose, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!show || !serie) {
    return null;
  }

  const casting = serie.casting || [];
  const seasons = serie.seasons || [];
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
        className="adminSerieModalOverlay"
        onClick={() => {
          onClose();
          setIsEditing(false);
        }}
      ></div>
      <div className="adminSerieModal">
        {isEditing ? (
          <AdminEditSerie
            serie={serie}
            onUpdate={(updatedSerie) => {
              onUpdate(updatedSerie);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
            onDelete={onDelete}
          />
        ) : (
          <>
            <div className="adminSerieModalHeader">
          <h4 title={serie.title}>{serie.title}</h4>
          <div className="adminSerieModalActions">
            <button
              type="button"
              title="Modifier la série"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <FontAwesomeIcon icon={faPenSquare} />
            </button>
            <button
              type="button"
              title="Fermer le modal"
              onClick={() => {
                onClose();
                setIsEditing(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="adminSerieModalContent">
          <div className="adminSerieModalLeft">
            <div className="adminSerieModalPoster">
              {serie.poster ? (
                <img
                  src={
                    serie.poster && serie.poster.startsWith("http")
                      ? serie.poster
                      : serie.poster
                        ? `http://localhost:3994/src/assets/Series/Posters/${serie.poster}`
                        : ""
                  }
                  alt={serie.title}
                />
              ) : (
                <div className="adminSeriePosterHolder">
                  <FontAwesomeIcon icon={faImage} />
                  <p>Aucune affiche disponible pour le moment.</p>
                </div>
              )}
            </div>
            <div className="adminSerieModalBackground">
              {serie.background ? (
                <img
                  src={
                    serie.background && serie.background.startsWith("http")
                      ? serie.background
                      : serie.background
                        ? `http://localhost:3994/src/assets/Series/Backgrounds/${serie.background}`
                        : ""
                  }
                  alt={`${serie.title} background`}
                />
              ) : (
                <div className="adminSerieBackgroundHolder">
                  <FontAwesomeIcon icon={faPanorama} />
                  <p>Aucun fond disponible pour le moment.</p>
                </div>
              )}
            </div>
          </div>
          <div className="adminSerieModalRight">
            <div className="adminSerieModalLogo">
              {serie.logo ? (
                <img
                  src={
                    serie.logo && serie.logo.startsWith("http")
                      ? serie.logo
                      : serie.logo
                        ? `http://localhost:3994/src/assets/Series/Logos/${serie.logo}`
                        : ""
                  }
                  alt={`${serie.title} logo`}
                />
              ) : (
                <div className="adminSerieLogoHolder">
                  <FontAwesomeIcon icon={faCopyright} />
                  <p>Aucun logo disponible pour le moment.</p>
                </div>
              )}
            </div>
            <div className="adminSerieModalInfos">
              <p>
                <b>Date de début :</b>
                <br />
                {formatDate(serie.beginning_date)}
              </p>
              <p>
                <b>Date de fin :</b>
                <br />
                {formatDate(serie.ending_date)}
              </p>
              <p>
                <b>Nombre de saisons :</b>
                <br />
                {serie.nbSeasons}
              </p>
              <p>
                <b>Nombre d'épisodes :</b>
                <br />
                {serie.nbEpisodesSerie}
              </p>
              <p>
                <b>Durée moyenne d'un épisode :</b>
                <br />
                {serie.serie_average_duration}
              </p>
              <p>
                <b>Sortie :</b>
                <br />
                {serie.screen}
              </p>
              <p>
                <b>Original :</b>
                <br />
                {serie.original}
              </p>
              <p>
                <b>Streaming :</b>
                <br />
                {serie.streaming}
              </p>
              <p>
                <b>Statut :</b>
                <br />
                {serie.statut}
              </p>
              <p>
                <b>Genre(s) :</b>
                <br />
                {serie.genre}
              </p>
              <p>
                <b>Thème(s) :</b>
                <br />
                {serie.theme}
              </p>
              <p>
                <b>Origine(s) :</b>
                <br />
                {serie.country}
              </p>
              <p>
                <b>Univers :</b>
                <br />
                {serie.universe}
              </p>
              <p>
                <b>Sous-univers :</b>
                <br />
                {serie.subUniverse}
              </p>
            </div>
            <div className="adminSerieModalST">
              <div className="adminSerieModalSynopsis">
                <h5>Synopsis :</h5>
                <p>{serie.synopsis}</p>
              </div>
              <div className="adminSerieModalTrailer">
                <h5>Trailer :</h5>
                {serie.trailer ? (
                  <iframe
                    src={serie.trailer}
                    title={serie.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="adminSerieTrailerHolder">
                    <FontAwesomeIcon icon={faVideo} />
                    <p>Aucun trailer disponible pour le moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="adminSerieModalSeasons">
          <h4>Saisons</h4>
          {seasons.length > 0 ? (
            <div className="adminSerieSeasonsList">
              <HorizontalScroll>
                {seasons.map((season) => (
                  <div className="adminSerieSeasonCard">
                    <h5>Saison {season.season_number}</h5>
                    <div className="adminSerieSeasonPoster">
                      {season.season_poster ? (
                        <img
                          src={
                            season.season_poster && season.season_poster.startsWith("http")
                              ? season.season_poster
                              : season.season_poster
                                ? `http://localhost:3994/src/assets/Series/Seasons/${season.season_poster}`
                                : ""
                          }
                          alt={`Saison ${season.season_number}`}
                        />
                      ) : (
                        <div className="adminSerieSeasonPosterHolder">
                          <FontAwesomeIcon icon={faImage} />
                          <p>Aucune image disponible pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <p>
                      <b>Dates de diffusion :</b>
                      <br />
                      {formatDate(season.first_episode_date)} -{" "}
                      {formatDate(season.last_episode_date)}
                    </p>
                    <p>
                      <b>Nombre d'épisodes :</b> <br />
                      {season.nbEpisodesSeason}
                    </p>
                    <AdminEditEpisodesModal
                      episodes={season.episodes}
                      serieId={serie.id}
                      seasonId={season.id}
                      seasonNumber={season.season_number}
                      serieTitle={serie.title}
                      onUpdate={onUpdate}
                      />
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          ) : (
            <p>Aucune saison disponible pour le moment.</p>
          )}
        </div>
        <div className="adminSerieModalCasting">
          <h4>Casting</h4>
          <div className="adminSerieCastingSection">
            <h5>Réalisation</h5>
            {directing.length > 0 ? (
              <div className="adminSerieCastingList">
                <HorizontalScroll>
                  {directing.map((cast) => (
                    <div className="adminSerieCastingCard">
                      <div className="adminSerieCastingPicture">
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
                            alt={`${cast.personality_fullname} picture`}
                          />
                        ) : (
                          <div className="adminSerieCastingPictureHolder">
                            <FontAwesomeIcon icon={faStar} />
                            <p>Aucune image disponible pour le moment.</p>
                          </div>
                        )}
                      </div>
                      <p title={cast.personality_fullname}>
                        {cast.personality_fullname}
                      </p>
                      <p>{cast.role}</p>
                      <p>{cast.presence}</p>
                    </div>
                  ))}
                </HorizontalScroll>
              </div>
            ) : (
              <p>Aucun membre de la réalisation répertorié pour le moment.</p>
            )}
          </div>
          <div className="adminSerieCastingSection">
            <h5>Acteurs & Actrices</h5>
            {acting.length > 0 ? (
              <div className="adminSerieCastingList">
                <HorizontalScroll>
                  {acting.map((cast) => (
                    <div className="adminSerieCastingCard">
                      <div className="adminSerieCastingPicture">
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
                            alt={`${cast.name} picture`}
                          />
                        ) : (
                          <div className="adminSerieCastingPictureHolder">
                            <FontAwesomeIcon icon={faStar} />
                            <p>Aucune image disponible pour le moment.</p>
                          </div>
                        )}
                      </div>
                      <p title={cast.personality_fullname}>
                        {cast.personality_fullname}
                      </p>
                      <p title={cast.role}>
                        <b>Rôle :</b>
                        <br />
                        {cast.role}
                      </p>
                      <p title={cast.presence}>
                        <b>Présence :</b>
                        <br />
                        {cast.presence}
                      </p>
                    </div>
                  ))}
                </HorizontalScroll>
              </div>
            ) : (
              <p>Aucun membre de la réalisation répertorié pour le moment.</p>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
}

AdminSerieModal.propTypes = {
  serie: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminSerieModal;
