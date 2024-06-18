import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./MovieCasting.css";

function MovieCasting({ movieCasting }) {
  if (!movieCasting) {
    return <p>Chargement</p>;
  }

  const direction = movieCasting.filter(
    (casting) => casting.side === "Direction"
  );

  const acting = movieCasting.filter((casting) => casting.side === "Acting");
  return (
    <div className="movieCasting">
      <h1>Casting</h1>
      <div className="casting">
        <h2>Réalisation</h2>
        <div className="realisation">
          {direction.map((casting) => (
            <li key={casting.id}>
              <Link to={`/personnalités/${casting.personalities_id}`}>
                <div className="castCard">
                  <img
                    className="castimg"
                    src={casting.personalities_image}
                    alt={casting.personalities_fullname}
                  />
                </div>
              </Link>
              <div className="castInfos">
                <h3>{casting.personalities_fullname}</h3>
                <p>{casting.role}</p>
              </div>
            </li>
          ))}
        </div>
        <h2>Distribution</h2>
        <div className="acting">
          {acting.map((casting) => (
            <li key={casting.id}>
              <Link to={`/personnalités/${casting.personalities_id}`}>
                <div className="castCard">
                  <img
                    className="castimg"
                    src={casting.personalities_image}
                    alt={casting.personalities_fullname}
                  />
                </div>
              </Link>
              <div className="castInfos">
                <h3>{casting.personalities_fullname}</h3>
                <p>{casting.role}</p>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

MovieCasting.propTypes = {
  movieCasting: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      personalities_id: PropTypes.number.isRequired,
      personalities_fullname: PropTypes.string.isRequired,
      personalities_image: PropTypes.string.isRequired,
      personalities_profession: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieCasting;
