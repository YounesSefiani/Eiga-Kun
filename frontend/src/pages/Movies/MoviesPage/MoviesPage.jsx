import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";
import EigaKunLogo from "../../../assets/EigaKunLogo.png";
import "./MoviesPage.css";

function MoviesPage() {
  const movies = useLoaderData();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const getRemainingDays = (releaseDate) => {
    const release = new Date(releaseDate);
    if (Number.isNaN(release.getTime())) return null;

    release.setHours(0, 0, 0, 0);
    const diffMs = release - now;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return Math.max(0, days);
  };

  const moviesSection = [12, 19, 21, 22]

  const comingSoonMovies = movies.filter(movie => moviesSection.includes(movie.id)) 
    .filter((movie) => {
      const release = new Date(movie.release_date);
      if (Number.isNaN(release.getTime())) return false;
      release.setHours(0, 0, 0, 0);
      return release > now;
    })
    .sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
    );

    const releasedMovies = [10, 16, 20];

    const availableMovies = movies.filter(movie => releasedMovies.includes(movie.id));
  return (
    <div className="moviesPage">
      <Header />
      <HeaderPhone />
      <div className="moviesPageContent">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              src="https://image.tmdb.org/t/p/original/evW8mgOB3suCPlAGK0DyzMiNwvs.jpg"
              alt="Avengers: Doomsday"
            />
            <Carousel.Caption>
              <h3>Il nous faut un miracle !</h3>
              <p>
                La bande-annonce tant d'attendue d'Avengers: Doomsday est enfin disponible.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://image.tmdb.org/t/p/original/b0LviwKbDto7Qq0D4DzGoVHpF4C.jpg"
              alt="Backrooms"
            />
            <Carousel.Caption>
              <h3>Spider-man est de retour !</h3>
              <p>
                Spider-Man : Brand New Day, actuellement dans les salles.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://image.tmdb.org/t/p/original/2rrC9qUaSGNAYw9t2gfXJOKBjuw.jpg"
              alt="Return to Silent Hill"
            />
            <Carousel.Caption>
              <h3>Dans mes rêves, je vois cette ville...</h3>
              <p>
                Return to Silent Hill, enfin disponible en achat digital et en DVD & Blu-Ray.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="moviesSection">
          <h2>Films à venir</h2>
          <div className="moviesSectionList">
            <HorizontalScroll>
              {comingSoonMovies.map((movie) => (
                <div
                  className="movieSectionCard"
                  key={movie.id}
                  title={movie.title}
                >
                  <Link
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    className="movieCard"
                  >
                    <div className="movieSectionCardPoster">
                      {movie.poster ? (
                        <img
                          src={
                            movie.poster && movie.poster.startsWith("http")
                              ? movie.poster
                              : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                          }
                          alt={movie.title}
                        />
                      ) : (
                        <div className="movieSectionCardPosterHolder">
                          <img
                            src={EigaKunLogo}
                            alt="EigaKun Logo"
                            className="eigaKunLogo"
                          />
                          <span>Aucune affiche pour le moment.</span>
                        </div>
                      )}
                      <p>J -{getRemainingDays(movie.release_date)}</p>
                    </div>
                    <h3>{movie.title}</h3>
                    <p>
                      Sortie le{" "}
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        </div>
                <div className="moviesSection">
          <h2>Actuellement au cinéma</h2>
          <div className="moviesSectionList">
            <HorizontalScroll>
              {availableMovies.map((movie) => (
                <div
                  className="movieSectionCard"
                  key={movie.id}
                  title={movie.title}
                >
                  <Link
                    to={`/movies/${movie.id}`}
                    key={movie.id}
                    className="movieCard"
                  >
                    <div className="movieSectionCardPoster">
                      {movie.poster ? (
                        <img
                          src={
                            movie.poster && movie.poster.startsWith("http")
                              ? movie.poster
                              : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                          }
                          alt={movie.title}
                        />
                      ) : (
                        <div className="movieSectionCardPosterHolder">
                          <img
                            src={EigaKunLogo}
                            alt="EigaKun Logo"
                            className="eigaKunLogo"
                          />
                          <span>Aucune affiche pour le moment.</span>
                        </div>
                      )}
                    </div>
                    <h3>{movie.title}</h3>
                    <p>
                      Sortie le{" "}
                      {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        </div>

      </div>
      <FooterPhone />
    </div>
  );
}

export default MoviesPage;
