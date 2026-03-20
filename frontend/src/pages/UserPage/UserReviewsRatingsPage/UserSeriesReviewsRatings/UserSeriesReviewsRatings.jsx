import React from "react";
import PropTypes from "prop-types";
import { Rating, Star } from "@smastrom/react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "@smastrom/react-rating/style.css";
import "./UserSeriesReviewsRatings.css";

function UserSerieReviewsRatings({ seriesReviewsRatings }) {
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
    <div className="userSerieReviewsRatingsSection">
      <h3>Mes reviews et notes de séries</h3>
      <div className="userSerieReviewsRatingsList">
        {seriesReviewsRatings && seriesReviewsRatings.length > 0 ? (
          seriesReviewsRatings.map((serieReview) => (
            <div className="userSerieReviewRatingCard" key={serieReview.id}>
              <div className="userSerieReviewRatingCardLeft">
                <div className="serieReviewRatingCardPoster">
                  {serieReview.serie_poster ? (
                    <img
                      src={
                        serieReview.serie_poster &&
                        serieReview.serie_poster.startsWith("http")
                          ? serieReview.serie_poster
                          : `http://localhost:3994/src/assets/Series/Posters/${serieReview.serie_poster}`
                      }
                      alt={serieReview.serie_title}
                    />
                  ) : (
                    <div className="serieReviewRatingCardPosterHolder">
                      <FontAwesomeIcon icon={faFilm} />
                      <p>Aucune affiche pour le moment.</p>
                    </div>
                  )}
                </div>
                
              </div>
              <div className="userSerieReviewRatingCardRight">
                <h4 title={serieReview.serie_title}>{serieReview.serie_title}</h4>
                <div className="serieRatingSide">
                  <Rating
                    value={serieReview.rating || 0}
                    items={10}
                    itemShapes={Star}
                    style={{ maxWidth: "60%" }}
                    readOnly
                  />
                  <span>Note : {serieReview.rating}/10</span>
                </div>
                <p>{serieReview.review}</p>
                <span>
                  Review crée le : {formatDate(serieReview.created_at)} -{" "}
                  {serieReview.updated_at
                    ? `Modifiée le : ${formatDate(serieReview.updated_at)}`
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

UserSerieReviewsRatings.propTypes = {
  seriesReviewsRatings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      serie_id: PropTypes.number.isRequired,
      serie_title: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }),
  ),
};

export default UserSerieReviewsRatings;
