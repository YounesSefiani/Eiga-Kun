import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import connexion from "../../../../services/connexion";
import EigaKunLogo from "../../../../assets/EigaKunLogo.png";
import "./HeaderPhone.css";

function HeaderPhone() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    movies: [],
    series: [],
    personalities: [],
  });
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        connexion
          .get(`/search?q=${encodeURIComponent(searchQuery)}`)
          .then((response) => {
            setSearchResults(response.data);
            setShowResults(true);
          })
          .catch((error) => {
            console.error("Erreur de recherche:", error);
          });
      } else {
        setSearchResults({ movies: [], series: [], personalities: [] });
        setShowResults(false);
      }
    }, 300); // Attendre 300ms après la dernière frappe

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleResultClick = (type, id) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/${type}/${id}`);
  };

  const hasResults =
    searchResults.movies.length > 0 ||
    searchResults.series.length > 0 ||
    searchResults.personalities.length > 0;

  const formatYear = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.getFullYear();
  };

  return (
    <div className="headerPhone">
      <Link to="/">
        <img src={EigaKunLogo} alt="Eiga-Kun Logo" />
      </Link>
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
        />

        {showResults && hasResults && (
          <div className="search-results-dropdown">
            {searchResults.movies.length > 0 && (
              <div className="search-category">
                <h4>Films</h4>
                {searchResults.movies.map((movie) => (
                  <div
                    key={`movie-${movie.id}`}
                    className="search-result-item"
                    onClick={() => handleResultClick("movies", movie.id)}
                  >
                    {movie.poster && (
                      <img
                        src={
                          movie.poster && movie.poster.startsWith("http")
                            ? movie.poster
                            : `http://localhost:3994/src/assets/Movies/Posters/${movie.poster}`
                        }
                        alt={movie.title}
                      />
                    )}
                    <span>
                      {movie.title} - ({formatYear(movie.release_date)})
                    </span>
                  </div>
                ))}
              </div>
            )}

            {searchResults.series.length > 0 && (
              <div className="search-category">
                <h4>Séries</h4>
                {searchResults.series.map((serie) => (
                  <div
                    key={`serie-${serie.id}`}
                    className="search-result-item"
                    onClick={() => handleResultClick("series", serie.id)}
                  >
                    {serie.poster && (
                      <img
                        src={
                          serie.poster && serie.poster.startsWith("http")
                            ? serie.poster
                            : `http://localhost:3994/src/assets/Series/Posters/${serie.poster}`
                        }
                        alt={serie.title}
                      />
                    )}
                    <span>
                      {serie.title} - ({formatYear(serie.beginning_date)} -{" "}
                      {formatYear(serie.ending_date)})
                    </span>
                  </div>
                ))}
              </div>
            )}

            {searchResults.personalities.length > 0 && (
              <div className="search-category">
                <h4>Personnalités</h4>
                {searchResults.personalities.map((personality) => (
                  <div
                    key={`personality-${personality.id}`}
                    className="search-result-item"
                    onClick={() =>
                      handleResultClick("personalities", personality.id)
                    }
                  >
                    {personality.picture && (
                      <img
                        src={
                          personality.picture &&
                          personality.picture.startsWith("http")
                            ? personality.picture
                            : `http://localhost:3994/src/assets/Personalities/Pictures/${personality.picture}`
                        }
                        alt={personality.fullname}
                      />
                    )}
                    <span>{personality.fullname}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {user && token ? (
        <button onClick={() => navigate(`/user/${token}`)}>
          {user.username}
        </button>
      ) : (
        <button onClick={() => navigate("/auth")}>Se connecter</button>
      )}
    </div>
  );
}

export default HeaderPhone;
