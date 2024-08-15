import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import "./SerieCasting.css";

function SerieCasting({ serieCasting }) {
  const realisation = serieCasting.filter(
    (cast) => cast.side === "Realisation"
  );
  const acting = serieCasting.filter((cast) => cast.side === "Acting");

  return (
    <div className="serieCasting">
      <h1>L'équipe de la série</h1>
      <div className="casting">
        <div className="castRealisation">
          <h2>Réalisation</h2>
          <HorizontalScroll
            itemWidth={150}
            containerWidth="80%"
            arrowColor="#ffb20c"
          >
            {realisation.map((cast) => (
              <li key={cast.id}>
                <Link to={`/personnalités/${cast.personalities_id}`}>
                  <div className="castCard">
                    <img
                      className="castimg"
                      src={cast.personalities_image}
                      alt={cast.personalities_fullname}
                    />
                  </div>
                  <div className="castInfos">
                    <h3>{cast.personalities_fullname}</h3>
                    <p>{cast.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </HorizontalScroll>
        </div>
        <div className="castActing">
          <h2>Casting</h2>
          <HorizontalScroll
            itemWidth={150}
            containerWidth="80%"
            arrowColor="#ffb20c"
          >
            {acting.map((cast) => (
              <li key={cast.id}>
                <Link to={`/personnalités/${cast.personalities_id}`}>
                  <div className="castCard">
                    <img
                      className="castimg"
                      src={cast.personalities_image}
                      alt={cast.personalities_fullname}
                    />
                  </div>
                </Link>
                <div className="castInfos">
                  <h3>{cast.personalities_fullname}</h3>
                  <p>{cast.role}</p>
                  <p>{cast.presence}</p>
                </div>
              </li>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </div>
  );
}

SerieCasting.propTypes = {
  serieCasting: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      personalities_id: PropTypes.number.isRequired,
      personalities_fullname: PropTypes.string.isRequired,
      personalities_image: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SerieCasting;
