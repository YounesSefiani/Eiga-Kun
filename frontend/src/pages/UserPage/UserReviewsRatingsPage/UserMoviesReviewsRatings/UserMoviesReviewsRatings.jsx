import React from "react";
import PropTypes from "prop-types";
import { Rating, Star } from "@smastrom/react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "@smastrom/react-rating/style.css";
import "./UserMoviesReviewsRatings.css";

function UserMovieReviewsRatings({ moviesReviewsRatings }) {
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
    <div className="userMovieReviewsRatingsSection">
      <h3>Mes reviews et notes de films</h3>
      <div className="userMovieReviewsRatingsList">
        {moviesReviewsRatings && moviesReviewsRatings.length > 0 ? (
          moviesReviewsRatings.map((movieReview) => (
            <div className="userMovieReviewRatingCard" key={movieReview.id}>
              <div className="userMovieReviewRatingCardLeft">
                <div className="movieReviewRatingCardPoster">
                  {movieReview.movie_poster ? (
                    <img
                      src={
                        movieReview.movie_poster &&
                        movieReview.movie_poster.startsWith("http")
                          ? movieReview.movie_poster
                          : `http://localhost:3994/src/assets/Movies/Posters/${movieReview.movie_poster}`
                      }
                      alt={movieReview.movie_title}
                    />
                  ) : (
                    <div className="movieReviewRatingCardPosterHolder">
                      <FontAwesomeIcon icon={faFilm} />
                      <p>Aucune affiche pour le moment.</p>
                    </div>
                  )}
                </div>
                
              </div>
              <div className="userMovieReviewRatingCardRight">
                <h4 title={movieReview.movie_title}>{movieReview.movie_title}</h4>
                <div className="movieRatingSide">
                  <Rating
                    value={movieReview.rating || 0}
                    items={10}
                    itemShapes={Star}
                    style={{ maxWidth: "60%" }}
                    readOnly
                  />
                  <span>Note : {movieReview.rating}/10</span>
                </div>
                <p>{movieReview.review}</p>
                <span>
                  Review crée le : {formatDate(movieReview.created_at)} -{" "}
                  {movieReview.updated_at
                    ? `Modifiée le : ${formatDate(movieReview.updated_at)}`
                    : ""}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune review ou note de film disponible.</p>
        )}
      </div>
    </div>
  );
}

UserMovieReviewsRatings.propTypes = {
  moviesReviewsRatings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      movie_id: PropTypes.number.isRequired,
      movie_title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
};

export default UserMovieReviewsRatings;
