import React from "react";
import PropTypes from "prop-types";
import { Rating, Star } from "@smastrom/react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "@smastrom/react-rating/style.css";
import "./UserPersonalitiesReviewsRatings.css";

function UserPersonalityReviewsRatings({ personalitiesReviewsRatings }) {
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
    <div className="userPersonalityReviewsRatingsSection">
      <h3>Mes reviews et notes de films</h3>
      <div className="userPersonalityReviewsRatingsList">
        {personalitiesReviewsRatings && personalitiesReviewsRatings.length > 0 ? (
          personalitiesReviewsRatings.map((personalityReview) => (
            <div className="userPersonalityReviewRatingCard" key={personalityReview.id}>
              <div className="userPersonalityReviewRatingCardLeft">
                <div className="personalityReviewRatingCardPicture">
                  {personalityReview.personality_picture ? (
                    <img
                      src={
                        personalityReview.personality_picture &&
                        personalityReview.personality_picture.startsWith("http")
                          ? personalityReview.personality_picture
                          : `http://localhost:3994/src/assets/Personalities/Pictures/${personalityReview.personality_picture}`
                      }
                      alt={personalityReview.personality_fullname}
                    />
                  ) : (
                    <div className="personalityReviewRatingCardPictureHolder">
                      <FontAwesomeIcon icon={faFilm} />
                      <p>Aucune affiche pour le moment.</p>
                    </div>
                  )}
                </div>
                
              </div>
              <div className="userPersonalityReviewRatingCardRight">
                <h4 title={personalityReview.personality_fullname}>{personalityReview.personality_fullname}</h4>
                <div className="personalityRatingSide">
                  <Rating
                    value={personalityReview.rating || 0}
                    items={10}
                    itemShapes={Star}
                    style={{ maxWidth: "60%" }}
                    readOnly
                  />
                  <span>Note : {personalityReview.rating}/10</span>
                </div>
                <p>{personalityReview.review}</p>
                <span>
                  Review crée le : {formatDate(personalityReview.created_at)} -{" "}
                  {personalityReview.updated_at
                    ? `Modifiée le : ${formatDate(personalityReview.updated_at)}`
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

UserPersonalityReviewsRatings.propTypes = {
  personalitiesReviewsRatings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      personality_id: PropTypes.number.isRequired,
      personality_fullname: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ),
};

export default UserPersonalityReviewsRatings;
