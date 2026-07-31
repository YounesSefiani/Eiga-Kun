import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Pagination from "../../../../components/Pagination/Pagination";
import usePagination from "../../../../components/Pagination/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import connexion from "../../../../services/connexion";
import "../OneMoviesCommon/OneMoviesCommon.css";
import "./OneDecadeMoviesPage.css";

function OneDecadeMoviesPage() {
  const { startYear } = useParams();
  const navigate = useNavigate();
  const moviesListRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    setCurrentPage,
  } = usePagination(movies, 10);

  // Fonctions de navigation
  const handlePageChange = (pageNumber) => {
    goToPage(pageNumber);

    if (moviesListRef.current) {
      moviesListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page quand la décennie change
  useEffect(() => {
    setCurrentPage(1);
  }, [startYear]);

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

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      try {
        setLoading(true);
        // Utilise la route existante /movies
        const response = await connexion.get("/movies");
        const allMovies = response.data;

        // Filtre côté frontend par décennie (startYear param)
        // Accept either "2020" or "2020s" as param — extract the year digits
        const decodedStartRaw = decodeURIComponent(startYear || "");
        const yearMatch = decodedStartRaw.match(/(\d{4})/);
        const decadeStart = yearMatch ? parseInt(yearMatch[1], 10) : parseInt(decodedStartRaw, 10);
        if (Number.isNaN(decadeStart)) {
          setMovies([]);
          return;
        }
        const decadeEnd = decadeStart + 9;

        const filteredMovies = allMovies.filter((movie) => {
          if (!movie.release_date) return false;
          // release_date expected in ISO YYYY-MM-DD
          const yearStr = String(movie.release_date).slice(0, 4);
          const year = parseInt(yearStr, 10);
          if (Number.isNaN(year)) return false;
          return year >= decadeStart && year <= decadeEnd;
        });

        setMovies(filteredMovies);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterMovies();
  }, [startYear]);

  // Friendly display for header: accept both "2020" and "2020s"
  const displayDecade = startYear
    ? startYear.toString().endsWith("s")
      ? startYear
      : `${startYear}s`
    : "";

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="oneMoviesPage oneMoviesDecadePage">
      <Header />
      <HeaderPhone />
      <div className="oneMoviesHeader oneMoviesDecadeHeader">
        <h2>
          Films de la décennie {displayDecade} ({movies.length})
        </h2>
        <button onClick={() => navigate("/movies/decades")}>Retour</button>
      </div>
      <div className="oneMoviesContainer oneMoviesDecadeContainer">
        <div className="oneMoviesList oneMoviesDecadeList" ref={moviesListRef}>
          {movies.length === 0 ? (
            <p className="noMoviesFound">Aucun film trouvé pour cette décennie.</p>
          ) : (
            paginatedItems.map((movie) => (
              <div
                className="oneMovieCard oneMovieDecadeCard"
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <div className="oneMovieCardLeft oneMovieDecadeCardLeft">
                  <div className="oneMovieGenrePoster">
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
                      <div className="oneMovieGenrePosterHolder">
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Pas d'affiche pour le moment.</span>
                      </div>
                    )}
                  </div>
                  <p>
                    <span>&#9733;</span>
                    {movie.average_rating
                      ? parseFloat(movie.average_rating)
                          .toFixed(1)
                          .replace(".", ",")
                      : ".. "}
                    /10
                  </p>
                </div>
                <div className="oneMovieCardRight oneMovieDecadeCardRight">
                  <h3 title={movie.title}>{movie.title}</h3>
                  <div className="oneMovieCardDetails oneMovieDecadeCardDetails">
                    <p>Date de sortie : {formatDate(movie.release_date)}</p>
                    <p>Durée : {formatDuration(movie.duration)}</p>
                    <p>Sortie au : {movie.screen}</p>
                    <p>Genre(s) : {movie.genre}</p>
                    <p>Thème(s) : {movie.theme}</p>
                    {movie.streaming && (
                      <p>Disponible sur : {movie.streaming}</p>
                    )}
                    {movie.universe && <p>Univers : {movie.universe}</p>}
                    {movie.subUniverse && (
                      <p>Sous-univers : {movie.subUniverse}</p>
                    )}
                  </div>
                  <div className="oneMovieCardSynopsis oneMovieDecadeCardSynopsis">
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
          maxVisiblePages={3}
        />
      </div>
      <FooterPhone />
    </div>
  );
}

export default OneDecadeMoviesPage;
