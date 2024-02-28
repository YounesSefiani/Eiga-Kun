import React from "react";
import { Link, Outlet } from "react-router-dom";
import EigaKunLogo from "../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <nav>
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
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
