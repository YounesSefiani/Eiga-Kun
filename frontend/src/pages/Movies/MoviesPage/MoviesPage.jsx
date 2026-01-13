import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";
import EigaKunLogo from "../../../assets/EigaKunLogo.png";
import "./MoviesPage.css";

function MoviesPage() {
  const movies = useLoaderData();

  return (
    <div className="moviesPage">
      <Header />
      <HeaderPhone />
      <div className="moviesList">
        {movies && movies.length > 0 ? (
          <HorizontalScroll>
            {movies.map((movie) => (
              <div className="movieCard" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.poster ? (
                    <div className="moviePoster">
                      <img
                        src={
                          movie.poster && movie.poster.startsWith("http")
                            ? movie.poster
                            : movie.poster
                            ? `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                            : ""
                        }
                        alt={movie.title}
                      />
                    </div>
                  ) : (
                    <div className="moviePosterHolder">
                      <img
                        src={EigaKunLogo}
                        className="moviePosterHolder"
                        alt="Logo Eiga-Kun"
                      />
                      <p>Aucune affiche pour le moment.</p>
                    </div>
                  )}
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <FooterPhone />
    </div>
  );
}

export default MoviesPage;
