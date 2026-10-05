import React, {useEffect, useRef} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header/Header";
import HeaderPhone from "../../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Pagination from "../../../../../components/Pagination/Pagination";
import usePagination from "../../../../../components/Pagination/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import "./OneGenreMoviesPage.css";

function OneGenreMoviesPage() {
  const { genre, movies = [] } = useLoaderData() ?? {};
  const navigate = useNavigate();
  const moviesListRef = useRef(null);

    const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    setCurrentPage,
  } = usePagination(movies, 6);

    const handlePageChange = (pageNumber) => {
      goToPage(pageNumber);
  
      if (moviesListRef.current) {
        moviesListRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
  
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    // Reset page quand le country change
    useEffect(() => {
      setCurrentPage(1);
    }, [movies, setCurrentPage]);
  

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    const [hh, mm] = duration.split(":");
    return `${parseInt(hh, 10)}h${mm}`;
  };

  return (
    <div className="oneMoviesGenrePage">
      <Header />
      <HeaderPhone />
      <div className="oneMoviesGenreHeader">
        <h2>
          Films du genre "{genre?.name ?? "introuvable"}" ({movies.length})
        </h2>
        <button onClick={() => navigate("/movies/genres")}>Retour</button>
      </div>
      <div className="oneMoviesGenreContainer">
        <div className="oneMoviesGenreList">
          {!genre || movies.length === 0 ? (
           <h4>Aucun film du genre "{genre?.name ?? "introuvable"}" pour le moment !</h4>
          ) : (
            paginatedItems.map((movie) => (
              <div
                className="oneMovieGenreCard"
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <div className="oneMovieGenreCardLeft">
                  <div className="oneMovieGenrePoster">
                    {movie.poster ? (
                      <img
                        src={
                          movie.poster.startsWith("http")
                            ? movie.poster
                            : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                        }
                        alt={movie.title}
                      />
                    ) : (
                      <div className="oneMovieGenrePosterHolder">
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Pas d'affiche pour le moment.</span>
                      </div>
                    )}
                  </div>
                  <p>
                    <span>&#9733;</span>
                    {movie.average_rating
                      ? parseFloat(movie.average_rating).toFixed(1).replace(".", ",")
                      : ".. "}
                    /10
                  </p>
                </div>

                <div className="oneMovieGenreCardRight">
                  <h3 title={movie.title}>{movie.title}</h3>
                  <div className="oneMovieGenreCardDetails">
                    <p>Date de sortie : {formatDate(movie.release_date)}</p>
                    <p>Durée : {formatDuration(movie.duration)}</p>
                    <p>Sortie au : {movie.screen}</p>
                    <p>
                      Genre(s) : {movie.genres?.map((item) => item.name).join(", ") || genre.name}
                    </p>
                    <p>Thème(s) : {movie.themes?.map((item) => item.name).join(", ") || "-"}</p>
                    {movie.streaming && <p>Disponible sur : {movie.streaming}</p>}
                    {movie.universe && <p>Univers : {movie.universe}</p>}
                    {movie.subUniverse && <p>Sous-univers : {movie.subUniverse}</p>}
                  </div>
                  <div className="oneMovieGenreCardSynopsis">
                    <p>{movie.synopsis}</p>
                  </div>
                </div>
              </div>
            ))
          )}
     
        </div>
               <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={7}
        />
      </div>
      <FooterPhone />
    </div>
  );
}

export default OneGenreMoviesPage;