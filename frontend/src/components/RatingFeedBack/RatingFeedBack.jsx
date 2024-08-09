import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "./RatingFeedBack.css";

function RatingFeedBack() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  const tooltipArray = [
    "Horrible",
    "Nul",
    "Mauvais",
    "Bof",
    "Moyen",
    "Bon",
    "Bien",
    "Génial",
    "Excellent",
    "Extraordinaire",
  ];

  return (
    <div className="ratingFeedBack">
      <h1>Vos avis sur le film</h1>
      <div className="reviews">
        <div className="ratings">
          <Rating
            className="rate"
            onClick={handleRating}
            ratingValue={rating}
            size={40}
            label
            transition
            iconsCount={5}
            allowFraction
            showTooltip
            titleSeparator="sur"
            fillColor="#ffb20c"
            tooltipDefaultText="Insérez la note !"
            tooltipArray={tooltipArray}
          />
        </div>
        <div className="feedback">
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Laissez un commentaire"
            />
          </form>
          <button type="submit">Envoyer le commentaire</button>
        </div>
      </div>
    </div>
  );
}

export default RatingFeedBack;
