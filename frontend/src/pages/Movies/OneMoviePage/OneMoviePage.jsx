import React from "react";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import CastingContainer from "../../../components/CastingFilmography/CastingContainer/CastingContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilm } from "@fortawesome/free-solid-svg-icons";
import "./OneMoviePage.css";
import { useLoaderData } from "react-router-dom";

function OneMoviePage() {
  const movie = useLoaderData();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    const [hh, mm] = duration.split(":");
    return `${parseInt(hh, 10)}:${mm}`;
  };

  return (
    <div className="oneMoviePage">
      <Header />
      <HeaderPhone />
      <div className="oneMovieHeader">
        {movie.background ? (
          <div className="oneMovieBackground">
            <img
              src={
                movie.background && movie.background.startsWith("http")
                  ? movie.background
                  : movie.background
                  ? `http://localhost:3994/src/assets/Movies/Backgrounds/${movie.background}`
                  : ""
              }
              alt={movie.title}
            />
          </div>
        ) : (
          <div className="oneMovieBackgroundHolder"></div>
        )}
        <div className="oneMovieHeaderContent">
          <div className="oneMovieHeaderLeft">
            <div className="userInteractions">
              {/* Composant des interactions utilisateur à implémenter une fois crée */}
              <p>Prochainement...</p>
            </div>
            {movie.poster ? (
              <div className="oneMoviePoster">
                <img
                  src={
                    movie.poster && movie.poster.startsWith("http")
                      ? movie.poster
                      : movie.poster
                      ? `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                      : ""
                  }
                  alt={movie.title}
                />
              </div>
            ) : (
              <div className="oneMoviePosterHolder">
                <FontAwesomeIcon icon={faFile} />
                <p>Aucune affiche pour le moment.</p>
              </div>
            )}
            <div className="userReviews">
              {/* Composant des notes et critiques des utilisateurs et utilisatrices à implémenter une fois crée */}
              <p>Prochainement...</p>
            </div>
          </div>
          <div className="oneMovieHeaderRight">
            {movie.logo ? (
              <img
                src={
                  movie.logo && movie.logo.startsWith("http")
                    ? movie.logo
                    : movie.logo
                    ? `http://localhost:3994/src/assets/Movies/Logos/${movie.logo}`
                    : ""
                }
                className="oneMovieLogo"
                alt={movie.title}
              />
            ) : (
              <h2>{movie.title}</h2>
            )}
            <div className="oneMovieInfos">
              <div className="oneMovieDetails">
                <p>
                  <b>Date de sortie :</b>
                  {formatDate(movie.release_date)}
                </p>
                <p>
                  <b>Sortie :</b>
                  {movie.screen}
                </p>
                <p>
                  <b>Durée :</b>
                  {formatDuration(movie.duration)}
                </p>
                <p>
                  <b>Genre(s) :</b>
                  {movie.genre}
                </p>
                <p>
                  <b>Thème(s) :</b>
                  {movie.theme}
                </p>
                <p>
                  <b>Origine(s) :</b>
                  {movie.country}
                </p>
                {movie.universe ? (
                  <p>
                    <b>Univers :</b>
                    {movie.universe}
                  </p>
                ) : null}
                {movie.subUniverse ? (
                  <p>
                    <b>Sous-univers :</b>
                    {movie.subUniverse}
                  </p>
                ) : null}
                {movie.streaming ? (
                  <p>
                    <b>Streaming :</b>
                    {movie.streaming}
                  </p>
                ) : null}
                {movie.original ? (
                  <p>
                    <b>Original :</b>
                    {movie.original}
                  </p>
                ) : null}
              </div>
              <div className="oneMovieSynopsis">
                <p>{movie.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="oneMovieCasting">
        <h3>Casting du film "{movie.title}"</h3>
        <CastingContainer casting={movie.casting} />
      </div>
      <div className="oneMovieReviewsTrailer">
        <div className="oneMovieReviews">
          {/* Composant des Reviews à implémenter une fois crée */}
          <h3>Critiques du film "{movie.title}"</h3>
          <p>Prochainement...</p>
        </div>
        <div className="oneMovieTrailer">
          <h3>Bande annonce du film "{movie.title}"</h3>
          {movie.trailer ? (
            <iframe
              src={movie.trailer}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="oneMovieTrailerHolder">
              <FontAwesomeIcon icon={faFilm} />
              <p>Pas de bande annonce disponible pour le moment.</p>
            </div>
          )}
        </div>
      </div>
      <FooterPhone />
    </div>
  );
}

export default OneMoviePage;
