import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import connexion from "../../../services/connexion";
import UsersRatingsReviewsModal from "../UsersRatingsReviewsModal/UsersRatingsReviewsModal";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./UserRatingsReviewsContainer.css";

function UserRatingsReviewsContainer({ ratingReviewId, ratingReviewType, title, fullname }) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setIsLoading(true);
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
        const data = response.data;
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les avis pour le moment.");
        setAverageRating(0);
        setTotalReviews(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (ratingReviewId && ratingReviewType) {
      fetchRatings();
    }
  }, [ratingReviewId, ratingReviewType]);

  if (isLoading) {
    return (
      <div className="ratingsReviewsContainer loading">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ratingsReviewsContainer error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="userRatingsReviewsContainer">
        <div className="ratingsDisplay">
          <Rating
            value={averageRating}
            items={10}
            itemShapes={Star}
            readOnly
            style={{ maxWidth: "75%" }}
          />
          <p>{averageRating > 0 ? averageRating.toFixed(1) : "N/A"} / 10</p>
        </div>
        {totalReviews > 0 && (
          <button type="button" onClick={() => setShowModal(true)}>
            Voir toutes les critiques
          </button>
        )}
      </div>
      {showModal && (
        <UsersRatingsReviewsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          ratingReviewId={ratingReviewId}
          ratingReviewType={ratingReviewType}
          title={title}
          fullname={fullname}
        />
      )}
    </>
  );
}

UserRatingsReviewsContainer.propTypes = {
  ratingReviewId: PropTypes.number.isRequired,
  ratingReviewType: PropTypes.oneOf(["movie", "serie", "personality"])
    .isRequired,
  title: PropTypes.string,
  fullname: PropTypes.string,
};

export default UserRatingsReviewsContainer;
