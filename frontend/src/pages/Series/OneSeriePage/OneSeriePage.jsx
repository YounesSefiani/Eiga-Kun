import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import SeasonsContainer from "../../../components/SeasonsContainer/SeasonsContainer";
import CastingContainer from "../../../components/CastingFilmography/CastingContainer/CastingContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilm } from "@fortawesome/free-solid-svg-icons";
import "./OneSeriePage.css";

function OneSeriePage() {
  const serie = useLoaderData();

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
    <div className="oneSeriePage">
      <Header />
      <HeaderPhone />
      <div className="oneSerieHeader">
        {serie.background ? (
          <div className="oneSerieBackground">
            <img
              src={
                serie.background && serie.background.startsWith("http")
                  ? serie.background
                  : serie.background
                  ? `http://localhost:3994/src/assets/Series/Backgrounds/${serie.background}`
                  : ""
              }
              alt={serie.title}
            />
          </div>
        ) : (
          <div className="oneSerieBackgroundHolder"></div>
        )}
        <div className="oneSerieHeaderContent">
          <div className="oneSerieHeaderLeft">
            <div className="userInteractions">
              {/* Composant des interactions utilisateur à implémenter une fois crée */}
              <p>Prochainement...</p>
            </div>
            {serie.poster ? (
              <div className="oneSeriePoster">
                <img
                  src={
                    serie.poster && serie.poster.startsWith("http")
                      ? serie.poster
                      : serie.poster
                      ? `http://localhost:3994/src/assets/Series/Posters/${serie.poster}`
                      : ""
                  }
                  alt={serie.title}
                />
              </div>
            ) : (
              <div className="oneSeriePosterHolder">
                <FontAwesomeIcon icon={faFile} />
                <p>Aucune affiche pour le moment.</p>
              </div>
            )}
            <div className="userReviews">
              {/* Composant des notes et critiques des utilisateurs et utilisatrices à implémenter une fois crée */}
              <p>Prochainement...</p>
            </div>
          </div>
          <div className="oneSerieHeaderRight">
            {serie.logo ? (
              <img
                src={
                  serie.logo && serie.logo.startsWith("http")
                    ? serie.logo
                    : serie.logo
                    ? `http://localhost:3994/src/assets/Series/Logos/${serie.logo}`
                    : ""
                }
                className="oneSerieLogo"
                alt={serie.title}
              />
            ) : (
              <h2>{serie.title}</h2>
            )}
            <div className="oneSerieInfos">
              <div className="oneSerieDetails">
                <p>
                  <b>Dates de diffusions :</b>
                  {formatDate(serie.beginning_date)} -{" "}
                  {formatDate(serie.ending_date)}
                </p>
                <p>
                  <b>Sortie :</b>
                  {serie.screen}
                </p>
                <p>
                  <b>Nombre de saisons :</b>
                  {serie.nbSeasons}
                </p>
                <p>
                  <b>Nombre total d'épisodes :</b>
                  {serie.nbEpisodesSerie}
                </p>
                <p>
                  <b>Durée moyenne d'un épisode :</b>
                  {serie.serie_average_duration}
                </p>
                <p>
                  <b>Statut :</b>
                  {serie.statut}
                </p>
                <p>
                  <b>Genre(s) :</b>
                  {serie.genre}
                </p>
                <p>
                  <b>Thème(s) :</b>
                  {serie.theme}
                </p>
                <p>
                  <b>Origine(s) :</b>
                  {serie.country}
                </p>
                {serie.universe ? (
                  <p>
                    <b>Univers :</b>
                    {serie.universe}
                  </p>
                ) : null}
                {serie.subUniverse ? (
                  <p>
                    <b>Sous-univers :</b>
                    {serie.subUniverse}
                  </p>
                ) : null}
                {serie.streaming ? (
                  <p>
                    <b>Streaming :</b>
                    {serie.streaming}
                  </p>
                ) : null}
                {serie.original ? (
                  <p>
                    <b>Original :</b>
                    {serie.original}
                  </p>
                ) : null}
              </div>
              <div className="oneSerieSynopsis">
                <p>{serie.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="oneSerieSeasons">
        {/* Composant des saisons de la série à implémenter une fois crée */}
        <h4>Les saisons de la série "{serie.title}"</h4>
        <SeasonsContainer seasons={serie.seasons} />
      </div>
      <div className="oneSerieCasting">
        <h4>Casting de la série "{serie.title}"</h4>
        <CastingContainer casting={serie.casting} />
      </div>
      <div className="oneSerieReviewsTrailer">
        <div className="oneSerieReviews">
          {/* Composant des Reviews à implémenter une fois crée */}
          <h4>Critiques de la série "{serie.title}"</h4>
          <p>Prochainement...</p>
        </div>
        <div className="oneSerieTrailer">
          <h4>Bande annonce de la série "{serie.title}"</h4>
          {serie.trailer ? (
            <iframe
              src={serie.trailer}
              title={serie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="oneSerieTrailerHolder">
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

export default OneSeriePage;
