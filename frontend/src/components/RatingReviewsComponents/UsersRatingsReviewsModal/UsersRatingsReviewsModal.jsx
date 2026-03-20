import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import connexion from "../../../services/connexion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./UsersRatingsReviewsModal.css";

function UsersRatingsReviewsModal({
  isOpen,
  onClose,
  ratingReviewId,
  ratingReviewType,
  title,
  fullname,
}) {
  const [reviews, setReviews] = useState([]);
  const [itemTitle, setItemTitle] = useState(title || fullname || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRatingsReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "";
      if (ratingReviewType === "movie") {
        endpoint = `/reviews/movies/${ratingReviewId}`;
      } else if (ratingReviewType === "serie") {
        endpoint = `/reviews/series/${ratingReviewId}`;
      } else if (ratingReviewType === "personality") {
        endpoint = `/reviews/personalities/${ratingReviewId}`;
      }

      const response = await connexion.get(endpoint);
      const reviewsData = response.data.reviews || [];
      setReviews(reviewsData);

      if (reviewsData.length > 0) {
        const firstReview = reviewsData[0];

        if (ratingReviewType === "movie" && firstReview.movie_title) {
          setItemTitle(firstReview.movie_title);
        } else if (ratingReviewType === "serie" && firstReview.serie_title) {
          setItemTitle(firstReview.serie_title);
        } else if (
          ratingReviewType === "personality" &&
          firstReview.personality_fullname
        ) {
          setItemTitle(firstReview.personality_fullname);
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setReviews([]);
        setError("Aucun avis trouvé pour cet élément.");
      } else {
        setError("Une erreur est survenue lors du chargement des avis.");
      }
    } finally {
      setLoading(false);
    }
  }, [ratingReviewId, ratingReviewType]);

  const getReviewTypeLabel = () => {
    switch (ratingReviewType) {
      case "movie":
        return "Reviews du film";
      case "serie":
        return "Reviews de la série";
      case "personality":
        return "Reviews de la personnalité";
      default:
        return "Reviews";
    }
  };

  useEffect(() => {
    if (isOpen && ratingReviewId && ratingReviewType) {
      fetchRatingsReviews();
    }
  }, [isOpen, ratingReviewId, ratingReviewType, fetchRatingsReviews]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="usersRatingsReviewsOverlay" onClick={onClose} />
      <div className="usersRatingsReviewsModal">
        <div className="usersRatingsReviewsHeader">
          <h2>
            {getReviewTypeLabel()} {itemTitle && `"${itemTitle}"`}
          </h2>
          <button type="button" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="usersRatingsReviewsList">
          {loading && <p className="loadingMessage">Chargement des avis...</p>}
          {error && <p className="errorMessage">{error}</p>}
          {!loading && !error && reviews.length > 0
            ? reviews.map((review) => (
                <div className="userRatingReviewCard" key={review.id}>
                  <div className="userRatingReviewCardLeft">
                    <div className="userRatingReviewAvatar">
                      {review.user_avatar ? (
                        <img
                          src={
                            review.user_avatar &&
                            review.user_avatar.startsWith("http")
                              ? review.user_avatar
                              : `http://localhost:3994/src/assets/Users/Avatars/${review.user_avatar}`
                          }
                          alt={`Avatar de ${review.user_username}`}
                        />
                      ) : (
                        <div className="userAvatarPlaceholder">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                      )}
                    </div>
                    <p>{review.user_username}</p>
                  </div>
                  <div className="userRatingReviewCardRight">
                    <div className="userRatingSide">
                      <Rating
                        value={review.rating}
                        items={10}
                        itemShapes={Star}
                        readOnly
                        style={{ maxWidth: "70%" }}
                      />
                      <span>{review.rating}/10</span>
                    </div>
                    <div className="userReviewSide">
                      <p>{review.review}</p>
                      <span>
                      Rédigée le {formatDate(review.created_at)} -{" "}
                      {review.updated_at
                        ? `Mis à jour le ${formatDate(review.updated_at)}`
                        : ""}
                    </span>
                    </div>
                    
                  </div>
                </div>
              ))
            : !loading &&
              !error && (
                <p className="noReviewsMessage">
                  Aucun avis trouvé pour cet élément.
                </p>
              )}
        </div>
      </div>
    </>
  );
}

UsersRatingsReviewsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ratingReviewId: PropTypes.number.isRequired,
  ratingReviewType: PropTypes.oneOf(["movie", "serie", "personality"])
    .isRequired,
  title: PropTypes.string,
  fullname: PropTypes.string,
};

export default UsersRatingsReviewsModal;
