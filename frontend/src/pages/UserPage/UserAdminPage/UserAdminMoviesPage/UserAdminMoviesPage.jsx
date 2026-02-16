import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import AdminMovieModal from "../../../../components/AdminComponents/AdminMovieModals/AdminMovieModal/AdminMovieModal";
import AdminAddMovie from "../../../../components/AdminComponents/AdminMovieModals/AdminAddMovie/AdminAddMovie";
import "./UserAdminMoviesPage.css";

function UserAdminMoviesPage({ setAdminView }) {
  const { user, token, handleAuthError } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);

  useEffect(() => {
    if ((!user || !token) && !handleAuthError) {
      navigate("/");
      return;
    }
    if (user && token) {
      connexion
        .get("/movies", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [user, token, navigate, handleAuthError]);

  const handleOpenMovieModal = async (movie) => {
    const response = await connexion.get(`/movies/${movie.id}/full`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedMovie(response.data);
    setShowMovieModal(true);
  };

  const handleUpdateMovie = async () => {
    // Recharger le film complet avec le casting mis à jour
    try {
      const response = await connexion.get(`/movies/${selectedMovie.id}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullMovie = response.data;
      
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === selectedMovie.id ? fullMovie : movie,
        ),
      );
      setSelectedMovie(fullMovie);
      setShowMovieModal(false);
    } catch (error) {
      console.error("Error reloading movie:", error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await connexion.delete(`/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movieId));
      setShowMovieModal(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="userAdminMoviesPage">
      <div className="userAdminMoviesTop">
        <h2>Tous les films</h2>
        <div className="userAdminMoviesBtnSection">
          <button type="button" onClick={() => setShowAddMovieModal(true)}>Ajouter un film</button>
          <button type="button" onClick={() => setAdminView("admin")}>
            Retour
          </button>
        </div>
      </div>
      {showAddMovieModal && (
        <AdminAddMovie
          onClose={() => setShowAddMovieModal(false)}
          onMovieAdded={() => {
            connexion.get(`/movies`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
              setMovies(response.data);
              setShowAddMovieModal(false);
            })
            .catch((error) => {
              console.error("Error fetching movies after adding:", error);
            });
          }}
        />
      )}
      <div className="userAdminMoviesSection">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="userAdminMovieCard"
              key={movie.id}
              title={movie.title}
              onClick={() => handleOpenMovieModal(movie)}
            >
              <div className="userAdminMoviePoster">
                {movie.poster ? (
                  <img
                    src={
                      movie.poster && movie.poster.startsWith("http")
                        ? movie.poster
                        : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                    }
                    alt={movie.title}
                  />
                ) : (
                  <div className="adminMoviePosterHolder">
                    <FontAwesomeIcon icon={faFilm} />
                    <p>Aucune affiche disponible pour le moment.</p>
                  </div>
                )}
              </div>
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
      <AdminMovieModal
        movie={selectedMovie}
        show={showMovieModal}
        onClose={() => setShowMovieModal(false)}
        onUpdate={handleUpdateMovie}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
}

UserAdminMoviesPage.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  handleAuthError: PropTypes.func,
};

export default UserAdminMoviesPage;
