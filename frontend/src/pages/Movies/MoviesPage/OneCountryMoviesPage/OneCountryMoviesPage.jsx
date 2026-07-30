import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import connexion from "../../../../services/connexion";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Pagination from "../../../../components/Pagination/Pagination";
import usePagination from "../../../../components/Pagination/usePagination";
import "../OneMoviesCommon/OneMoviesCommon.css";
import "./OneCountryMoviesPage.css";

// Mapping des codes pays vers les noms en français
const countryNames = {
  france: "France",
  us: "États-Unis",
  jp: "Japon",
  gb: "Royaume-Uni",
  de: "Allemagne",
  it: "Italie",
  es: "Espagne",
  in: "Inde",
  kr: "Corée du Sud",
  au: "Australie",
  br: "Brésil",
  ca: "Canada",
  ru: "Russie",
  mx: "Mexique",
  se: "Suède",
};

function OneMoviesCountryPage() {
  const { country } = useParams();
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

  const countryDisplayName = countryNames[country] || decodeURIComponent(country);

  // Fonctions de navigation
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
  }, [country]);

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
        const response = await connexion.get("/movies");
        const allMovies = response.data;

        const decodedCountry = decodeURIComponent(country);
        const filteredMovies = allMovies.filter((movie) => {
          if (!movie.country) return false;
          return movie.country.toLowerCase().includes(decodedCountry.toLowerCase());
        });

        setMovies(filteredMovies);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterMovies();
  }, [country]);

  if (loading) return <div className="loadingScreen">Chargement...</div>;

  return (
    <div className="oneMoviesPage oneMoviesCountryPage">
        <title>{`Films de ${countryDisplayName} - Eiga-Kun`}</title>
      <Header />
      <HeaderPhone />
      <div className="oneMoviesHeader oneMoviesCountryHeader">
        <h2>
          Films de {countryDisplayName} ({movies.length})
        </h2>
        <button onClick={() => navigate("/movies/countries")}>Retour</button>
      </div>
      <div className="oneMoviesContainer oneMoviesCountryContainer">
        <div className="oneMoviesList oneMoviesCountryList" ref={moviesListRef}>
          {movies.length === 0 ? (
            <p className="noMoviesFound">Aucun film trouvé pour ce pays.</p>
          ) : (
            paginatedItems.map((movie) => (
              <div
                className="oneMovieCard oneMoviesCountryCard"
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <div className="oneMovieCardLeft oneMoviesCountryCardLeft">
                  <div className="oneMoviesCountryPoster">
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
                      <div className="oneMoviesCountryPosterPlaceHolder">
                        <span>Pas d'affiche</span>
                      </div>
                    )}
                  </div>
                  <p>
                    <span>&#9733;</span>
                    {movie.average_rating
                      ? parseFloat(movie.average_rating)
                          .toFixed(1)
                          .replace(".", ",")
                      : ".."}
                    /10
                  </p>
                </div>
                <div className="oneMovieCardRight oneMoviesCountryCardRight">
                  <h3 title={movie.title}>{movie.title}</h3>
                  <div className="oneMovieCardDetails oneMoviesCountryCardDetails">
                    <p>Date de sortie : {formatDate(movie.release_date)}</p>
                    <p>Durée : {formatDuration(movie.duration)}</p>
                    <p>Sortie au : {movie.screen}</p>
                    {movie.streaming && <p>Disponible sur : {movie.streaming}</p>}
                    <p>Thème(s) : {movie.theme}</p>
                    {movie.universe && <p>Univers : {movie.universe}</p>}
                    {movie.subUniverse && (
                      <p>Sous-univers : {movie.subUniverse}</p>
                    )}
                  </div>
                  <div className="oneMovieCardSynopsis oneMoviesCountryCardSynopsis">
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
          containerClassName="oneMoviePagePagination oneMoviesCountryPagePagination"
          maxVisiblePages={7}
          previousLabel="← Précédent"
          nextLabel="Suivant →"
        />

      </div>
      <FooterPhone />
    </div>
  );
}

export default OneMoviesCountryPage;