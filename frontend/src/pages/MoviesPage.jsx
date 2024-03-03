// MoviesPage.jsx
import React from "react";
import { Carousel, CarouselCaption } from "react-bootstrap";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../components/Header";
import Movies from "../components/Movies";
import "./MoviesPage.css";

function MoviesPage() {
  const movies = useLoaderData();

  return (
    <div className="moviesPageContainer">
      <div className="header">
        <Header />
      </div>
      <div className="movies-carousel">
        <Carousel>
          {movies.map((film) => (
            <Carousel.Item key={film.id}>
              <Link to={`/films/${film.id}`}>
                <img
                  className="carouselImage"
                  src={film.background}
                  alt={film.title}
                />
                <CarouselCaption>
                  {film.logo ? (
                    <img
                      className="movieLogo"
                      src={film.logo}
                      alt={film.title}
                    />
                  ) : (
                    <h3>{film.title}</h3>
                  )}
                </CarouselCaption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="movieContainer">
        <h1>Les films</h1>
        <Movies movies={movies} />
      </div>
    </div>
  );
}

export default MoviesPage;
