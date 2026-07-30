import React, { useMemo, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Pagination from "../../../../components/Pagination/Pagination";
import usePagination from "../../../../components/Pagination/usePagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

import "./EveryMoviesPage.css";

const DEFAULT_GENRES = [
  "Action",
  "Aventure",
  "Animation",
  "Comédie",
  "Drame",
  "Horreur",
  "Romance",
  "Thriller",
];

const moviesCountries = [
  "France",
  "Japon",
  "USA",
  "Canada",
  "UK",
  "Italie",
  "Espagne",
  "Allemagne",
  "Australie",
  "Inde",
];

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const getMovieGenres = (genreValue = "") =>
  genreValue
    .split(/[,/|;-]+/)
    .map((genre) => genre.trim())
    .filter(Boolean);

const getMovieCountries = (countryValue = "") =>
  countryValue
    .split(/[,/|;-]+/)
    .map((country) => country.trim())
    .filter(Boolean);

function EveryMoviesPage() {
  const movies = useLoaderData();
  const moviesListRef = useRef(null);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [titleQuery, setTitleQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  const availableGenres = useMemo(() => {
    const genresFromMovies = movies
      .flatMap((movie) => getMovieGenres(movie.genre))
      .filter(Boolean);

    const genreSet = new Set([...DEFAULT_GENRES, ...genresFromMovies]);

    return [...genreSet].sort((a, b) => a.localeCompare(b, "fr"));
  }, [movies]);

  const toggleGenre = (genreName) => {
    setCurrentPage(1);
    setSelectedGenres((previous) =>
      previous.includes(genreName)
        ? previous.filter((genre) => genre !== genreName)
        : [...previous, genreName],
    );
  };

  const availableCountries = useMemo(() => {
    const countriesFromMovies = movies
      .flatMap((movie) => getMovieCountries(movie.country))
      .filter(Boolean);

    const countrySet = new Set([...moviesCountries, ...countriesFromMovies]);

    return [...countrySet].sort((a, b) => a.localeCompare(b, "fr"));
  }, [movies]);

  const toggleCountry = (countryName) => {
    setCurrentPage(1);
    setSelectedCountries((previous) =>
      previous.includes(countryName)
        ? previous.filter((country) => country !== countryName)
        : [...previous, countryName],
    );
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setSelectedGenres([]);
    setSelectedCountries([]);
    setFromDate("");
    setToDate("");
    setTitleQuery("");
    setSortBy("title-asc");
  };

  const filteredMovies = useMemo(() => {
    const normalizedQuery = normalizeText(titleQuery);
    const normalizedSelectedGenres = selectedGenres.map((genre) =>
      normalizeText(genre),
    );
    const normalizedSelectedCountries = selectedCountries.map((country) =>
      normalizeText(country),
    );
    const fromTime = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
    const toTime = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

    const baseFiltered = movies.filter((movie) => {
      const movieReleaseTime = movie.release_date
        ? new Date(movie.release_date).getTime()
        : null;

      if (fromTime && (!movieReleaseTime || movieReleaseTime < fromTime)) {
        return false;
      }

      if (toTime && (!movieReleaseTime || movieReleaseTime > toTime)) {
        return false;
      }

      if (
        normalizedQuery &&
        !normalizeText(movie.title).includes(normalizedQuery)
      ) {
        return false;
      }

      if (normalizedSelectedGenres.length > 0) {
        const movieGenres = getMovieGenres(movie.genre).map((genre) =>
          normalizeText(genre),
        );
        const hasSelectedGenre = normalizedSelectedGenres.some(
          (selectedGenre) =>
            movieGenres.some((movieGenre) =>
              movieGenre.includes(selectedGenre),
            ),
        );

        if (!hasSelectedGenre) {
          return false;
        }
      }

      if (normalizedSelectedCountries.length > 0) {
        const movieCountries = getMovieCountries(movie.country).map((country) =>
          normalizeText(country),
        );
        const hasSelectedCountry = normalizedSelectedCountries.some(
          (selectedCountry) =>
            movieCountries.some((movieCountry) =>
              movieCountry.includes(selectedCountry),
            ),
        );

        if (!hasSelectedCountry) {
          return false;
        }
      }

      return true;
    });

    return [...baseFiltered].sort((a, b) => {
      if (sortBy === "date-asc") {
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      }

      if (sortBy === "date-desc") {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      }

      return a.title.localeCompare(b.title, "fr");
    });
  }, [
    movies,
    selectedGenres,
    selectedCountries,
    fromDate,
    toDate,
    titleQuery,
    sortBy,
  ]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    setCurrentPage,
  } = usePagination(filteredMovies, 10);

  const handlePageChange = (pageNumber) => {
    goToPage(pageNumber);

    if (moviesListRef.current) {
      moviesListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="everyMoviesPage">
      <Header />
      <HeaderPhone />
      <div className="everyMoviesPageContent">
        <div className="moviesBar">
          <form
            className="moviesFilterSort"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3>Trier par</h3>
            <label htmlFor="sortBy">
              <select
                id="sortBy"
                name="sortBy"
                value={sortBy}
                onChange={(event) => {
                  setCurrentPage(1);
                  setSortBy(event.target.value);
                }}
              >
                <option value="title-asc">Titre A-Z</option>
                <option value="date-desc">Date décroissante</option>
                <option value="date-asc">Date croissante</option>
              </select>
            </label>
          </form>
          <div className="moviesFilterByGenre">
            <h3>Filtre par genres</h3>
            <form onSubmit={(event) => event.preventDefault()}>
              {availableGenres.map((genre) => {
                const id = `genre-${normalizeText(genre).replace(/\s+/g, "-")}`;
                return (
                  <label htmlFor={id} key={genre}>
                    <input
                      type="checkbox"
                      id={id}
                      name={genre}
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                    />
                    {genre}
                  </label>
                );
              })}
            </form>
          </div>
          <div className="moviesFilterByCountries">
            <h3>Filtre par pays</h3>
            <form onSubmit={(event) => event.preventDefault()}>
              {availableCountries.map((country) => {
                const id = `country-${normalizeText(country).replace(/\s+/g, "-")}`;
                return (
                  <label htmlFor={id} key={country}>
                    <input
                      type="checkbox"
                      id={id}
                      name={country}
                      value={country}
                      checked={selectedCountries.includes(country)}
                      onChange={() => toggleCountry(country)}
                    />
                    {country}
                  </label>
                );
              })}
            </form>
          </div>
          <div className="moviesFilterByReleaseDate">
            <h3>Filtre par dates de sortie</h3>
            <form onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="fromYear">
                De
                <input
                  type="date"
                  id="fromYear"
                  name="fromYear"
                  value={fromDate}
                  onChange={(event) => {
                    setCurrentPage(1);
                    setFromDate(event.target.value);
                  }}
                />
              </label>
              <label htmlFor="toYear">
                À
                <input
                  type="date"
                  id="toYear"
                  name="toYear"
                  value={toDate}
                  onChange={(event) => {
                    setCurrentPage(1);
                    setToDate(event.target.value);
                  }}
                />
              </label>
            </form>
          </div>
          <button type="button" onClick={handleResetFilters}>
            Réinitialiser les filtres
          </button>
        </div>
        <div className="everyMoviesList" ref={moviesListRef}>
          <div className="moviesList">
            {paginatedItems.map((movie) => (
              <div className="everyMoviesCard" key={movie.id}>
                <Link to={`/movies/${movie.id}`} title={movie.title}>
                  {movie.poster ? (
                    <div className="everyMoviesCardPoster">
                      <img
                        src={
                          movie.poster && movie.poster.startsWith("http")
                            ? movie.poster
                            : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                        }
                        alt={movie.title}
                      />
                    </div>
                  ) : (
                    <div className="everyMoviesCardPosterHolder">
                      <FontAwesomeIcon icon={faFilm} />
                      <span>Aucune affiche pour le moment.</span>
                    </div>
                  )}
                  <h2>{movie.title}</h2>
                </Link>
              </div>
            ))}
            {filteredMovies.length === 0 && (
              <p>Aucun film ne correspond aux filtres sélectionnés.</p>
            )}
          </div>
          {filteredMovies.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              containerClassName="oneMoviePagePagination oneMovieGenrePagePagination"
              maxVisiblePages={2}
              previousLabel="←"
              nextLabel="→"
            />
          )}
        </div>
      </div>

      <FooterPhone />
    </div>
  );
}

export default EveryMoviesPage;
