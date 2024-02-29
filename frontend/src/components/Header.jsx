import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import EigaKunLogo from "../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [buttonOpen, setButtonOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setButtonOpen(!menuOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMenuOpen(false);
  };

  return (
    <div className={`header ${menuOpen ? "menu-open" : ""}`}>
      <button
        type="button"
        className={`hamburger-button ${buttonOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        &#9776;
      </button>
      <nav className={menuOpen ? "menu-open" : ""}>
        <ul>
          <li>
            <Link to="/films">Films</Link>
          </li>
          <li>
            <Link to="/séries">Séries</Link>
          </li>
          <li>
            <Link to="/">
              <img src={EigaKunLogo} alt="Eiga-Kun" />
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
      <div className={`hamburger-menu ${menuOpen ? "menu-open" : ""}`}>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profil">Mon profil</Link>
              </li>
              <li>
                <Link to="/mes-films">Mes Films</Link>
              </li>
              <li>
                <Link to="/mes-séries">Mes Séries</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/authentification">Connexion / Inscription</Link>
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
            </>
          )}
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
