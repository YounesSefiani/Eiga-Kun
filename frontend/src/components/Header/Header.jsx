import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [buttonOpen, setButtonOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
    setButtonOpen(!buttonOpen);
  };
  return (
    <div className={`header ${hamburgerOpen ? "menu-open" : ""}`}>
      <button
        type="button"
        className={`hamburger-button ${buttonOpen ? "open" : ""}`}
        onClick={toggleHamburger}
        aria-label="button"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={hamburgerOpen ? "menu-open" : ""}>
        <ul>
          <li>
            <Link to="/films">Films</Link>
          </li>
          <li>
            <Link to="/séries">Séries</Link>
          </li>
          <li>
            <Link to="/">
              <img src={EigaKunLogo} alt="EigaKunLogo" />
            </Link>
          </li>
          <li>
            <Link to="/personnalités">Personnalités</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
      <div className={`hamburger-menu ${hamburgerOpen ? "menu-open" : ""}`}>
        <ul>
          <li>
            <Link to="/membre">Connexion / Inscription</Link>
          </li>
          <li>
            <Link to="/rechercher">Rechercher</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/à-propos">A propos</Link>
          </li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
