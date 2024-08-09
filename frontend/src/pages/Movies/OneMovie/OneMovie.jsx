import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import FavoriteButtons from "../../../components/FavoriteButtons/FavoriteButtons";
import MovieCasting from "../../../components/MovieCasting/MovieCasting";
import RatingFeedBack from "../../../components/RatingFeedBack/RatingFeedBack";
import "./OneMovie.css";

function OneMovie() {
  const movie = useLoaderData();

  const zero = (number) => (number < 10 ? `0${number}` : number);

  const date = new Date(movie.release_date);
  const day = zero(date.getDate());
  const month = zero(date.getMonth() + 1);
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="oneMoviePage">
      <div className="headerMovie">
        <Header />
      </div>
      <div className="movieHeader">
        <img
          className="movieBackground"
          src={movie.background}
          alt={movie.title}
        />
        <div className="oneMovieCover">
          <div className="oneMoviePoster">
            <div className="favoriteBtns">
              <FavoriteButtons />
            </div>
            <img src={movie.poster} alt={movie.title} />
          </div>
          <div className="oneMovieInfos">
            <div className="oneMovieName">
              {movie.logo ? (
                <div className="movieLogo">
                  <img src={movie.logo} alt={movie.title} />
                </div>
              ) : (
                <h1>{movie.title}</h1>
              )}
            </div>
            <div className="detailsAndSynopsisMovie">
              <div className="oneMovieDetails">
                <li>
                  <p>Date de sortie : {formattedDate}</p>
                  <p>Genre : {movie.genre}</p>
                  <p>Thèmes : {movie.theme}</p>
                  <p>Pays : {movie.country}</p>
                  <p>Univers : {movie.universe}</p>
                  <p>Sous-univers : {movie.subUniverse}</p>
                </li>
              </div>
              <div className="oneMovieSynopsis">
                <p>{movie.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="movieCasting">
        <MovieCasting movieCasting={movie.casting} />
      </div>
      <div className="reviewsAndTrailer">
        <div className="ratingReviews">
          <RatingFeedBack />
        </div>
        <div className="trailer">
          <h1>Trailer du film "{movie.title}"</h1>
          <iframe
            src={movie.trailer}
            className="trailerVideo"
            title={`Trailer du film ${movie.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}

export default OneMovie;
