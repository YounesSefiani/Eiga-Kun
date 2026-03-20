import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../../services/UserContext/AuthContext";
import UserMoviesReviewsRatings from "./UserMoviesReviewsRatings/UserMoviesReviewsRatings";
import UserSeriesReviewsRatings from "./UserSeriesReviewsRatings/UserSeriesReviewsRatings";
import UserPersonalitiesReviewsRatings from "./UserPersonalitiesReviewsRatings/UserPersonalitiesReviewsRatings";
import "./UserReviewsRatingsPage.css";

function UserReviewsRatingsPage({ reviewsRatings }) {
  const { user, token } = useContext(AuthContext);
  const [reviewsView, setReviewsView] = useState("reviewsRatings");
  const navigate = useNavigate();

  if (!user || !token) {
    navigate("/");
    return null;
  }

  const moviesReviewsRatings = reviewsRatings.movies || [];
  const seriesReviewsRatings = reviewsRatings.series || [];
  const personalitiesReviewsRatings = reviewsRatings.personalities || [];
  return (
    <div className="userReviewsRatingsPage">
      <title>{`Mes notes et reviews - EigaKun`}</title>
      <h2>Mes notes et reviews</h2>
      <div className="reviewsRatingsContent">
        <button
          type="button"
          onClick={() => setReviewsView("moviesReviewsRatings")}
        >
          Reviews de films
        </button>
        <button
          type="button"
          onClick={() => setReviewsView("seriesReviewsRatings")}
        >
          Reviews de séries
        </button>
        <button type="button" onClick={() => setReviewsView("personalitiesReviewsRatings")}>Reviews de personnalités</button>
      </div>
      {reviewsView === "moviesReviewsRatings" && (
        <UserMoviesReviewsRatings moviesReviewsRatings={moviesReviewsRatings} />
      )}
      {reviewsView === "seriesReviewsRatings" && (
        <UserSeriesReviewsRatings seriesReviewsRatings={seriesReviewsRatings} />
      )}
      {reviewsView === "personalitiesReviewsRatings" && (
        <UserPersonalitiesReviewsRatings
          personalitiesReviewsRatings={personalitiesReviewsRatings}
        />
      )}
    </div>
  );
}

UserReviewsRatingsPage.propTypes = {
  reviewsRatings: PropTypes.shape({
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        movie_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        review: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
      }),
    ),
    series: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        serie_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        review: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
      }),
    ),
    personalities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        personality_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        review: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};

export default UserReviewsRatingsPage;
