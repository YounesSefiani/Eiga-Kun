import React from "react";
import { Link } from "react-router-dom";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      {/* <h2>Header</h2> */}
      <Link to ="/"><img src={EigaKunLogo} alt="Eiga-Kun Logo"/></Link>
      <ul>
        <li><Link to="/movies">Films</Link></li>
        <li><Link to="/series">Séries</Link></li>
        <li><Link to="/personalities">Personnalités</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
      <input type="text" placeholder="Rechercher..."/>
      <button>Se connecter</button>
    </div>
  );
}

export default Header;
