import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";
import "./MoviesPage.css";

function MoviesPage() {
  const movies = useLoaderData();

  const superHerosMovie = movies.filter(
    (movie) => movie.theme === "Super-Héros"
  );

  const today = new Date();
  const upcomingMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.release_date);
    return releaseDate > today;
  });

  const halloweenMovies = movies.filter((movie) => movie.genre === "Horreur");

  const calculateDaysLeft = (releaseDate) => {
    const release = new Date(releaseDate);
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <div className="moviesPage">
      <Header />
      <div className="moviesList">
        <h1>Tous les films</h1>
        <div className="moviesContainer">
          <HorizontalScroll>
            {movies.map((film) => (
              <div className="movieCard">
                <Link key={film.id} to={`/films/${film.id}`}>
                  <img
                    className="movieImg"
                    src={film.poster}
                    alt={film.title}
                  />
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
      <div className="moviesList">
        <h1>Les Super-Héros sont là !</h1>
        <div className="moviesContainer">
          <HorizontalScroll>
            {superHerosMovie.map((film) => (
              <div className="movieCard">
                <Link key={film.id} to={`/films/${film.id}`}>
                  <img
                    className="movieImg"
                    src={film.poster}
                    alt={film.title}
                  />
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
      <div className="moviesList">
        <h1>Halloween approche !</h1>
        <div className="moviesContainer">
          <HorizontalScroll>
            {halloweenMovies.map((film) => (
              <div className="movieCard">
                <Link key={film.id} to={`/films/${film.id}`}>
                  <img
                    className="movieImg"
                    src={film.poster}
                    alt={film.title}
                  />
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
      <div className="moviesList">
        <h1>Prochainement dans les salles !</h1>
        <div className="moviesContainer">
          <HorizontalScroll>
            {upcomingMovies.map((film) => (
              <div className="movieCard">
                <Link key={film.id} to={`/films/${film.id}`}>
                  <img
                    className="movieImg"
                    src={film.poster}
                    alt={film.title}
                  />
                  <div className="daysLeft">
                    <p>J-{calculateDaysLeft(film.release_date)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
