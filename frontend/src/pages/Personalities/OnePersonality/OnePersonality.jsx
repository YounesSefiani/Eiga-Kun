import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";
import "./OnePersonality.css";
import FavoritePersonality from "../../../components/Favorites/FavoritePersonality/FavoritePersonality";

function OnePersonality() {
  const { personality, movies, series } = useLoaderData();

  const formatDate = (date) => {
    const zero = (number) => (number < 10 ? `0${number}` : number);
    const d = new Date(date);
    const day = zero(d.getDate());
    const month = zero(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onlyYear = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    return `${year}`;
  };

  return (
    <div className="onePersonalityPage">
      <Header />
      <section className="personalityHeader">
        <div className="personality">
          <div className="personalityPicture">
            <div className="pictureContainer">
              <img src={personality.image_src} alt={personality.fullname} />
              <div className="favorite">
                <FavoritePersonality />
              </div>
            </div>
          </div>
          <div className="personalityInfos">
            <div className="personalityFullName">
              <h1>{personality.fullname}</h1>
            </div>
            <div className="personalityDetails">
              <p>
                Date de naissance : <br />
                {formatDate(personality.birthdate)}
              </p>
              {personality.deathdate && (
                <p>
                  Date de décès : <br />
                  {formatDate(personality.deathdate)}
                </p>
              )}
              <p>
                Origine : <br />
                {personality.origin}
              </p>
              <p>
                Profession : <br /> {personality.profession}
              </p>
            </div>
            <div className="personalityBio">
              <h2>Biographie</h2>
              <p>{personality.bio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="filmography">
        <h1>Films</h1>
        <HorizontalScroll>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <div className="movies">
                  <li key={movie.id}>
                    <div className="movieCard">
                      <Link to={`/films/${movie.movies_id}`}>
                        <div className="poster">
                          <img src={movie.poster} alt={movie.title} />
                        </div>
                      </Link>
                      <h2>
                        {movie.title} <br /> {onlyYear(movie.release_date)}
                      </h2>
                      <p>Rôle : {movie.role}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>Aucun film trouvé pour le moment</p>
          )}
        </HorizontalScroll>
      </section>

      <section className="filmography">
        <h1>Séries</h1>
        <HorizontalScroll>
          {series.length > 0 ? (
            <ul>
              {series.map((serie) => (
                <div className="series">
                  <li key={serie.id}>
                    <div className="serieCard">
                      <Link to={`/séries/${serie.series_id}`}>
                        <div className="poster">
                          <img src={serie.poster} alt={serie.title} />
                        </div>
                      </Link>
                      <h2>
                        {serie.title} <br /> {onlyYear(serie.release_date)} -{" "}
                        {onlyYear(serie.ending_date)}
                      </h2>
                      <p>Rôle : {serie.role}</p>
                      <p>{serie.presence}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>Aucune série trouvée pour le moment</p>
          )}
        </HorizontalScroll>
      </section>
    </div>
  );
}

export default OnePersonality;
