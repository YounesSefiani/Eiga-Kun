import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Series.css";

function Series({ series }) {
  return (
    <div className="seriesContainer">
      {series.map((serie) => (
        <Link key={serie.id} to={`/series/${serie.id}`}>
          <div className="seriesCard">
            <img className="borderimg" src={serie.poster} alt={serie.title} />
          </div>
        </Link>
      ))}
    </div>
  );
}

Series.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

Series.defaultProps = {
  series: [],
};

export default Series;
