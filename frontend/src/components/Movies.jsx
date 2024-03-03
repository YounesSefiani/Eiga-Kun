import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movies.css";

function Movies({ movies }) {
  return (
    <div className="moviesContainer">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/films/${movie.id}`}>
          <div className="card">
            <img className="borderimg" src={movie.poster} alt={movie.title} />
          </div>
        </Link>
      ))}
    </div>
  );
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

Movies.defaultProps = {
  movies: [],
};

export default Movies;
