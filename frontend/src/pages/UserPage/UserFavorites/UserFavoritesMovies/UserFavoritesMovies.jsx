import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import HorizontalScroll from "../../../../components/HorizontalScroll/HorizontalScroll";
import "./UserFavoritesMovies.css";

function UserFavoritesMovies({ favoritesMovies }) {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const likedMovies = useMemo(
    () => favoritesMovies.filter((movie) => movie.favorite_status === "liked"),
    [favoritesMovies],
  );
  const favoriteMovies = useMemo(
    () =>
      favoritesMovies.filter((movie) => movie.favorite_status === "favorite"),
    [favoritesMovies],
  );
  const toWatchMovies = useMemo(
    () =>
      favoritesMovies.filter((movie) => movie.favorite_status === "toWatch"),
    [favoritesMovies],
  );
  const seenMovies = useMemo(
    () => favoritesMovies.filter((movie) => movie.favorite_status === "seen"),
    [favoritesMovies],
  );

  if (!user || !token) {
    navigate("/");
    return null;
  }

  return (
    <div className="userFavoritesMovies">
      <title>{`Les films préférés de "${user.username}" - EigaKun`}</title>
      <div className="userFavoritesMoviesSection">
        <h3>Les films que j'aime</h3>
        <div className="userMoviesList">
          {likedMovies && likedMovies.length > 0 ? (
            <HorizontalScroll>
              {likedMovies.map((movie) => (
                <div className="userMovieCard" key={movie.movie_id}>
                  <Link
                    to={`/movies/${movie.movie_id}`}
                    title={`${movie.movie_title}`}
                  >
                    <div className="userMoviePoster">
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
                          alt={movie.movie_title}
                        />
                      ) : (
                        <div className="userMoviePosterHolder">
                          <FontAwesomeIcon icon={faFilm} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{movie.movie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun film aimé pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesMoviesSection">
        <h3>Mes films favoris</h3>
        <div className="userMoviesList">
          {favoriteMovies && favoriteMovies.length > 0 ? (
            <HorizontalScroll>
              {favoriteMovies.map((movie) => (
                <div className="userMovieCard" key={movie.movie_id}>
                  <Link
                    to={`/movies/${movie.movie_id}`}
                    title={`${movie.movie_title}`}
                  >
                    <div className="userMoviePoster">
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
                          alt={movie.movie_title}
                        />
                      ) : (
                        <div className="userMoviePosterHolder">
                          <FontAwesomeIcon icon={faFilm} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{movie.movie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun film favoris pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesMoviesSection">
        <h3>Les films que j'ai vus</h3>
        <div className="userMoviesList">
          {seenMovies && seenMovies.length > 0 ? (
            <HorizontalScroll>
              {seenMovies.map((movie) => (
                <div className="userMovieCard" key={movie.movie_id}>
                  <Link
                    to={`/movies/${movie.movie_id}`}
                    title={`${movie.movie_title}`}
                  >
                    <div className="userMoviePoster">
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
                          alt={movie.movie_title}
                        />
                      ) : (
                        <div className="userMoviePosterHolder">
                          <FontAwesomeIcon icon={faFilm} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{movie.movie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun film vu pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesMoviesSection">
        <h3>Les films à voir</h3>
        <div className="userMoviesList">
          {toWatchMovies && toWatchMovies.length > 0 ? (
            <HorizontalScroll>
              {toWatchMovies.map((movie) => (
                <div className="userMovieCard" key={movie.movie_id}>
                  <Link
                    to={`/movies/${movie.movie_id}`}
                    title={`${movie.movie_title}`}
                  >
                    <div className="userMoviePoster">
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
                          alt={movie.movie_title}
                        />
                      ) : (
                        <div className="userMoviePosterHolder">
                          <FontAwesomeIcon icon={faFilm} />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{movie.movie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun film à voir pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

UserFavoritesMovies.propTypes = {
  favoritesMovies: PropTypes.array,
};

export default UserFavoritesMovies;
