import React from "react";
import PropTypes from "prop-types";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import Episodes from "../Episodes/Episodes";
import "./Seasons.css";

function Seasons({ seasons }) {
  return (
    <div className="seasonContainer">
      <HorizontalScroll>
        {seasons.map((season) => (
          <li key={season.id}>
            <div className="seasons">
              <h2>Saison {season.season_number}</h2>
              <div className="seasonPoster">
                <img
                  src={season.poster}
                  alt={`Poster de la saison ${season.season_number}`}
                />
              </div>
              <Episodes episodes={season.episodes} />
            </div>
          </li>
        ))}
      </HorizontalScroll>
    </div>
  );
}

Seasons.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      season_number: PropTypes.number.isRequired,
      poster: PropTypes.string,
      first_episode_date: PropTypes.string,
      last_episode_date: PropTypes.string,
      synopsis: PropTypes.string,
      episode: PropTypes.number.isRequired,
      episodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          episode_number: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          image: PropTypes.string,
          release_date: PropTypes.string,
          synopsis: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default Seasons;
