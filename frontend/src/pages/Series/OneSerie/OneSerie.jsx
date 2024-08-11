import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import FavoriteButtons from "../../../components/FavoriteButtons/FavoriteButtons";
import "./OneSerie.css";
import RatingFeedBack from "../../../components/RatingFeedBack/RatingFeedBack";

function OneSerie() {
  const serie = useLoaderData();

  const zero = (number) => (number < 10 ? `0${number}` : number);

  const date = new Date(serie.release_date);
  const day = zero(date.getDate());
  const month = zero(date.getMonth() + 1);
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="oneSeriePage">
      <div className="headerSerie">
        <Header />
      </div>
      <div className="serieHeader">
        <img
          className="serieBackground"
          src={serie.background}
          alt={serie.title}
        />
        <div className="oneSerieCover">
          <div className="oneSeriePoster">
            <div className="favoriteBtns">
              <FavoriteButtons />
            </div>
            <img src={serie.poster} alt={serie.title} />
          </div>
          <div className="oneSerieInfos">
            <div className="oneSerieName">
              {serie.logo ? (
                <div className="serieLogo">
                  <img src={serie.logo} alt={serie.title} />
                </div>
              ) : (
                <h1>{serie.title}</h1>
              )}
            </div>
            <div className="oneSerieSeasons">
              <p>
                Première diffusion : <br />
                {formattedDate}
              </p>
              <p>
                {serie.seasons} <br />
                saisons
              </p>
              <p>
                {serie.episodes} <br />
                épisodes
              </p>
              <p>
                Dernière diffusion : <br />
                {serie.ending_date}
              </p>
              <p>
                Statut de la série : <br />
                {serie.statut} au bout de {serie.seasons} saison(s)
              </p>
            </div>
            <div className="detailsAndSynopsisSerie">
              <div className="oneSerieDetails">
                <li>
                  <p>Genre : {serie.genre}</p>
                  <p>Thème(s) : {serie.theme}</p>
                  {serie.universe ? <p>Univers : {serie.universe}</p> : <p />}
                  <p>Provenance : {serie.country}</p>
                  <p>Diffusion : {serie.screen}</p>
                  <p>Disponible sur : {serie.streaming}</p>
                </li>
              </div>
              <div className="oneSerieSynopsis">
                <p>{serie.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviewsAndTrailer">
        <div className="ratingReviews">
          <RatingFeedBack />
        </div>
        <div className="trailer">
          <h1>Trailer de la série "{serie.title}"</h1>
          <iframe
            src={serie.trailer}
            className="trailerVideo"
            title={`Trailer de la série ${serie.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}

export default OneSerie;
