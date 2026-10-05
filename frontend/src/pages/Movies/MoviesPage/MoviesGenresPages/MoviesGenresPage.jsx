import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "./MoviesGenresPage.css";

function GenresMoviesPage() {
  const moviesGenres = useLoaderData();
  console.log(moviesGenres);
  return (
    <div className="moviesGenresPage">
      <Header />
      <HeaderPhone />
      <div className="moviesGenresContainer">
        <h2>Genres des films</h2>
        <div className="moviesGenresList">
          {moviesGenres.map((genre) => (
            <Link to={`/movies/genres/${genre.id}`} key={genre.id}>
              <div className="moviesGenreCard">
               {genre.imageGenre ? (
                <img src={genre.imageGenre && genre.imageGenre.startsWith("http") ? genre.imageGenre : genre.imageGenre ? `http://localhost:3994/src/assets/Genres/${genre.imageGenre}` : ""} alt={genre.name} />
              ) : (
                <div className="moviesGenreImagePlaceHolder">
                <FontAwesomeIcon icon={faFilm} />
                </div>
              )}
                <h3>{genre.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FooterPhone />
    </div>
  )
}

export default GenresMoviesPage;