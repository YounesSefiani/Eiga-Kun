import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTv,
  faStar,
  faNewspaper,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./FooterPhone.css";

function FooterPhone() {
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const moviesDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moviesDropdownRef.current &&
        !moviesDropdownRef.current.contains(event.target)
      ) {
        setIsMoviesOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMoviesDropdown = () => {
    setIsMoviesOpen((prev) => !prev);
  };

  const closeMoviesDropdown = () => {
    setIsMoviesOpen(false);
  };

  return (
    <div className="footerPhone">
      <ul>
        <li
          ref={moviesDropdownRef}
          className={`footerItemDropDown ${isMoviesOpen ? "open" : ""}`}
        >
          <div className="footerDropdownTopRow">
            <Link to="/movies" className="footerMainLink" onClick={closeMoviesDropdown}><FontAwesomeIcon icon={faFilm} /> Films</Link>
          <button
            type="button"
            className="footerDropdownTrigger"
            onClick={toggleMoviesDropdown}
            aria-expanded={isMoviesOpen}
            aria-label={isMoviesOpen ? "Fermer le menu Films" : "Ouvrir le menu Films"}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="footerDropdownContent">
            <Link to="/movies/genres" onClick={closeMoviesDropdown}>
              Films par genres
            </Link>
            <Link to="/movies/countries" onClick={closeMoviesDropdown}>
              Films par pays
            </Link>
            <Link to="/movies/decades" onClick={closeMoviesDropdown}>
              Films par années
            </Link>
            <Link to="/movies/all" onClick={closeMoviesDropdown}>
              Tous les films
            </Link>
          </div>
          </div>
        </li>
        <li className="footerItemDropDown">
          <Link to="/series">
            <FontAwesomeIcon icon={faTv} />
            Séries
          </Link>
        </li>
        <li>
          <Link to="/personalities">
            <FontAwesomeIcon icon={faStar} />
            Personnalités
          </Link>
        </li>
        <li>
          <Link to="/blog">
            <FontAwesomeIcon icon={faNewspaper} />
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterPhone;
