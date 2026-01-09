import React from "react";
import PropTypes from "prop-types";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import EpisodesContainer from "../EpisodesContainer/EpisodesContainer";
import "./SeasonsContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function SeasonsContainer({ seasons }) {
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
    <div className="seasonsContainer">
      {seasons && seasons.length ? (
        <HorizontalScroll>
          {seasons.map((season) => (
            <div key={season.id} className="seasonCard">
              <h3>Saison {season.season_number}</h3>
              {season.poster ? (
              <img
                src={
                  season.poster && season.poster.startsWith("http")
                    ? season.poster
                    : season.poster
                    ? `http://localhost:3994/src/assets/Series/Seasons/${season.poster}`
                    : ""
                }
                alt={`Saison ${season.season_number}`}
              />
                ) : (
                    <div className="seasonPosterPlaceHolder">
                      <FontAwesomeIcon icon={faImage} />
                      <p>Aucune image pour le moment.</p>
                    </div>
                  )}
              <p>
                <b>Dates de diffusion :</b>
                <br />
                {season.first_episode_date === "1900-01-01"
                  ? "??-??-????"
                  : formatDate(season.first_episode_date)}{" "}
                -{" "}
                {season.last_episode_date === "1900-01-01"
                  ? "??-??-????"
                  : formatDate(season.last_episode_date)}
              </p>
              <p>
                <b>Nombre d'épisodes :</b>
                <br />
                {season.nbEpisodesSeason}
              </p>
              <EpisodesContainer episodes={season.episodes} />
            </div>
          ))}
        </HorizontalScroll>
      ) : (
        <p>Aucune saison disponible pour le moment.</p>
      )}
    </div>
  );
}

SeasonsContainer.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      season_number: PropTypes.number.isRequired,
      poster: PropTypes.string,
      first_episode_date: PropTypes.string,
      last_episode_date: PropTypes.string,
      nbEpisodesSeason: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SeasonsContainer;
