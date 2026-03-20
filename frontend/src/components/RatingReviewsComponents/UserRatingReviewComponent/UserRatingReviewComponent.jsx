import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../services/UserContext/AuthContext";
import { UserRatingsReviewsContext } from "../../../services/UserContext/UserRatingsReviewsContext";
import connexion from "../../../services/connexion";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ToastContainer, toast } from "react-toastify";
import "./UserRatingReviewComponent.css";

function UserRatingReviewComponent({ ratingReviewId, ratingReviewType }) {
  const { user, token } = useContext(AuthContext);
  const { ratingsReviewsData, refreshRatingsReviews } = useContext(
    UserRatingsReviewsContext,
  );

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user || !ratingsReviewsData) return;

    let foundReview = null;

    if (ratingReviewType === "movie") {
      foundReview = ratingsReviewsData.movies?.find(
        (review) => review.movie_id === ratingReviewId,
      );
    } else if (ratingReviewType === "serie") {
      foundReview = ratingsReviewsData.series?.find(
        (review) => review.serie_id === ratingReviewId,
      );
    } else if (ratingReviewType === "personality") {
      foundReview = ratingsReviewsData.personalities?.find(
        (review) => review.personality_id === ratingReviewId,
      );
    }

    if (foundReview) {
      setExistingReview(foundReview);
      setRating(foundReview.rating || 0);
      setReviewText(foundReview.review || "");
      setIsEditing(true);
      console.log("✏️ Review existante trouvée:", foundReview);
    } else {
      setExistingReview(null);
      setRating(0);
      setReviewText("");
      setIsEditing(false);
      console.log("➕ Aucune review existante, mode création");
    }
  }, [user, ratingsReviewsData, ratingReviewId, ratingReviewType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error("Vous devez être connecté pour soumettre une review.");
      return;
    }

    if (!rating || rating === 0) {
      toast.dismiss("Veuillez donner une note avant de soumettre.");
      return;
    }

    setIsSubmitting(true);

    try {
      let endpoint = "";
      if (ratingReviewType === "movie") {
        endpoint = `/reviews/users/${user.id}/movies/${ratingReviewId}`;
      } else if (ratingReviewType === "serie") {
        endpoint = `/reviews/users/${user.id}/series/${ratingReviewId}`;
      } else if (ratingReviewType === "personality") {
        endpoint = `/reviews/users/${user.id}/personalities/${ratingReviewId}`;
      }

      let response;
      if (isEditing) {
        console.log("✏️ Modification de la review existante");
        response = await connexion.put(
          endpoint,
          {
            review: reviewText || "",
            rating: rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Review modifiée avec succès ! ✅");
      } else {
        console.log("➕ Création d'une nouvelle review");
        response = await connexion.post(
          endpoint,
          {
            review: reviewText || "",
            rating: rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success("Review soumise avec succès ! ✅");
        setIsEditing(true);
      }

      await refreshRatingsReviews();

      console.log("✅ Opération réussie:", response.data);
    } catch (err) {
      console.error("❌ Erreur lors de la soumission:", err);

      if (err.response?.status === 409) {
        toast.error("Vous avez déjà fait une review pour cet élément.");
      } else if (err.response?.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
      } else if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="userRatingReviewComponent">
      {user ? (
        <form className="userRatingReviewForm" onSubmit={handleSubmit}>
          <div className="ratingSide">
            <Rating
              value={rating || 0}
              items={10}
              itemShapes={Star}
              style={{ maxWidth: "70%" }}
              onChange={setRating}
            />
            <span>Note : {rating}/10</span>
          </div>
          <div className="reviewSide">
            <textarea
              placeholder="Écrivez votre review ici..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {isEditing && existingReview && (
              <span>
                Review modifiée le : {formatDate(existingReview.updated_at)}
              </span>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isEditing ? "Modifier" : "Soumettre"}
          </button>
        </form>
      ) : (
        <div className="noUserRatingReview">
          <div className="noUserRatingReviewOverlay">
            {" "}
            <p>Connectez-vous pour soumettre une review.</p>
          </div>
          <form className="userRatingReviewForm">
            <div className="ratingSide">
              <Rating
                value={rating || 0}
                items={10}
                itemShapes={Star}
                style={{ maxWidth: "70%" }}
                onChange={setRating}
              />
              <span>Note : {rating}/10</span>
            </div>
            <div className="reviewSide">
              <textarea
                placeholder="Écrivez votre review ici..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              {isEditing && existingReview && (
                <span>
                  Review modifiée le : {formatDate(existingReview.updated_at)}
                </span>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isEditing ? "Modifier" : "Soumettre"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

UserRatingReviewComponent.propTypes = {
  ratingReviewId: PropTypes.number.isRequired,
  ratingReviewType: PropTypes.oneOf(["movie", "serie", "personality"])
    .isRequired,
  title: PropTypes.string,
  fullname: PropTypes.string,
};

export default UserRatingReviewComponent;
