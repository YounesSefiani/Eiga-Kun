import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import EigaKunLogo from "../../../assets/EigaKunLogo.png";
import "./MoviesPage.css";

function MoviesPage() {
  const movies = useLoaderData();

  return (
    <>
      <Header />
      <HeaderPhone />
      <div className="moviesPage">
        <h2>Movies Page</h2>
        <div className="moviesList">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div className="movieCard" key={movie.id}>
                <Link to={`/films/${movie.id}`}>
                  <div className="moviePoster">
                    {movie.poster ? (
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
                  </div>
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
      <FooterPhone />
    </>
  );
}

export default MoviesPage;
