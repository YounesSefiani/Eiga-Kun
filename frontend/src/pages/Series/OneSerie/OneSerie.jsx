import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Seasons from "../../../components/Seasons/Seasons";
import SerieCasting from "../../../components/SerieCasting/SerieCasting";
import FavoriteButtons from "../../../components/FavoriteButtons/FavoriteButtons";
import RatingFeedBack from "../../../components/RatingFeedBack/RatingFeedBack";
import "./OneSerie.css";

function OneSerie() {
  const serie = useLoaderData();

  const formatDate = (date) => {
    const zero = (number) => (number < 10 ? `0${number}` : number);
    const d = new Date(date);
    const day = zero(d.getDate());
    const month = zero(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const debutDate = formatDate(serie.release_date);
  const endingDate = formatDate(serie.ending_date);

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
              <div className="oneSerieSeason">
                <p>
                  Première diffusion : <br />
                  {debutDate}
                </p>
                <p>
                  {serie.seasons.length} <br />
                  saisons
                </p>
                <p>
                  {serie.episodes} <br />
                  épisodes
                </p>
                <p>
                  Dernière diffusion : <br />
                  {endingDate}
                </p>
                <p>
                  Statut de la série : <br />
                  {serie.statut} au bout de {serie.seasons.length} saison(s)
                </p>
              </div>
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
      <div className="seasons">
        <Seasons seasons={serie.seasons} />
      </div>
      <div className="serieCasting">
        <SerieCasting serieCasting={serie.serieCasting} />
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
