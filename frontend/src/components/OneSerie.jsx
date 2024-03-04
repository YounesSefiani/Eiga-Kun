import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import "./OneSerie.css";

function Oneserie() {
  const serie = useLoaderData();

  const Debutdate = new Date(serie.release_date);
  const dDay = Debutdate.getDate();
  const dMonth = Debutdate.getMonth() + 1;
  const dYear = Debutdate.getFullYear();

  const formattedDebutDate = `${dDay}-${dMonth}-${dYear}`;

  const Endingdate = new Date(serie.ending_date);
  const eDay = Endingdate.getDate();
  const eMonth = Endingdate.getMonth() + 1;
  const eYear = Endingdate.getFullYear();

  const formattedEndingDate = `${eDay}-${eMonth}-${eYear}`;

  return (
    <div className="oneSerieContainer">
      <div className="header">
        <Header />
      </div>
      <div className="serieBackground">
        <img className="background" src={serie.background} alt={serie.title} />
      </div>
      <div className="seriePoster">
        <img className="poster" src={serie.poster} alt={serie.title} />
      </div>
      <div className="serieInfos">
        <div className="serieName">
          {serie.logo ? (
            <img className="serieLogo2" src={serie.logo} alt={serie.logo} />
          ) : (
            <h3>{serie.title}</h3>
          )}
        </div>
        <div className="serieDetails">
          <h2>
            {serie.genre} / {serie.theme} / Premier épisode :{" "}
            {formattedDebutDate} / Dernier épisode : {formattedEndingDate} /
            Saisons : {serie.seasons} / Episodes : {serie.episodes} / Statut de
            la série : {serie.statut} / {serie.country} / {serie.universe}
          </h2>
        </div>
        <div className="serieSynopsis">
          <h2>{serie.synopsis}</h2>
        </div>
        <div className="commentsAndTrailerContainer">
          <div className="comments">
            <h1>Commentaires</h1>
          </div>
          <div className="serieTrailer">
            <iframe
              width="auto"
              height="auto"
              src={serie.trailer}
              title="Trailer du film {serie.title}"
              allow="acceleometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oneserie;
