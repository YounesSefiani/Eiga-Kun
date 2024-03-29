import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "./Header";
import "./OneMovie.css";

function OneMovie() {
  const movie = useLoaderData();

  const date = new Date(movie.release_date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className="oneMovieContainer">
      <div className="header">
        <Header />
      </div>
      <div className="movieBackground">
        <img className="background" src={movie.background} alt={movie.title} />
      </div>
      <div className="moviePoster">
        <img className="poster" src={movie.poster} alt={movie.title} />
      </div>
      <div className="movieInfos">
        <div className="movieName">
          {movie.logo ? (
            <img className="movieLogo2" src={movie.logo} alt={movie.logo} />
          ) : (
            <h3>{movie.title}</h3>
          )}
        </div>
        <div className="movieDetails">
          <h2>
            {movie.genre} / {movie.theme} / {formattedDate} / {movie.country} /{" "}
            {movie.universe}
          </h2>
        </div>
        <div className="movieSynopsis">
          <h2>{movie.synopsis}</h2>
        </div>
        <div className="commentsAndTrailerContainer">
          <div className="comments">
            <h1>Commentaires</h1>
          </div>
          <div className="movieTrailer">
            <iframe
              width="auto"
              height="auto"
              src={movie.trailer}
              title="Trailer du film {movie.title}"
              allow="acceleometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneMovie;
