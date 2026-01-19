import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HorizontalScroll from "../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTv } from "@fortawesome/free-solid-svg-icons";
import "./FilmographyContainer.css";

function FilmographyContainer({ movies, series }) {
  const formatYear = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getFullYear();
  };
  return (
    <div className="filmographyContainer">
      <div className="p_moviesSection">
        <h3>Films</h3>
        {movies && movies.length > 0 ? (
          <div className="p_moviesList">
            <HorizontalScroll>
              {movies.map((movie) => (
                <div className="p_movieCard" key={movie.id}>
                  <Link to={`/movies/${movie.movie_id}`}>
                    <h4>
                      {movie.movie_title} - (
                      {formatYear(movie.movie_release_date)})
                    </h4>
                    <div className="p_moviePoster">
                    {movie.movie_poster ? (
                      <img
                        src={
                          movie.movie_poster &&
                          movie.movie_poster.startsWith("http")
                            ? movie.movie_poster
                            : movie.movie_poster
                            ? `http://localhost:3994/src/assets/Movies/Posters/${movie.movie_poster}`
                            : ""
                        }
                        alt={movie.title}
                      />
                    ) : (
                      <div className="p_moviePosterHolder">
                        <FontAwesomeIcon icon={faFilm} />
                        <p>Aucune affiche pour le moment.</p>
                      </div>
                    )}
                    </div>
                    <p>
                      <b>Rôle :</b>
                      <br />
                      {movie.role}
                    </p>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        ) : (
          <p>Aucun film pour le moment.</p>
        )}
      </div>
      <div className="p_seriesSection">
        <h3>Séries</h3>
        {series && series.length > 0 ? (
          <div className="p_seriesList">
            <HorizontalScroll>
              {series.map((serie) => (
                <div className="p_serieCard" key={serie.id}>
                  <Link to={`/series/${serie.serie_id}`}>
                    <h4>
                      {serie.serie_title} - (
                      {formatYear(serie.serie_beginning_date)} -{" "}
                      {formatYear(serie.serie_ending_date)})
                    </h4>
                    <div className="p_seriePoster">
                    {serie.serie_poster ? (
                      <img
                        src={
                          serie.serie_poster &&
                          serie.serie_poster.startsWith("http")
                            ? serie.serie_poster
                            : serie.serie_poster
                            ? `http://localhost:3994/src/assets/Movies/Posters/${serie.serie_poster}`
                            : ""
                        }
                        alt={serie.title}
                      />
                    ) : (
                      <div className="p_seriePosterHolder">
                        <FontAwesomeIcon icon={faTv} />
                        <p>Aucune affiche pour le moment.</p>
                      </div>
                    )}
                    </div>
                    <p>
                      <b>Rôle :</b>
                      <br />
                      {serie.role}
                    </p>
                    <p>
                      <b>Présence :</b>
                      <br />
                      {serie.presence}
                    </p>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        ) : (
          <p>Aucune série pour le moment.</p>
        )}
      </div>
    </div>
  );
}

FilmographyContainer.propTypes = {
  movies: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
};

export default FilmographyContainer;
