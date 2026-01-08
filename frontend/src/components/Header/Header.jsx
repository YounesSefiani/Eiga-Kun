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
        <li><Link to="/films">Films</Link></li>
        <li>Séries</li>
        <li>Personnalités</li>
        <li>Blog</li>
      </ul>
      <input type="text" placeholder="Rechercher..."/>
      <button>Se connecter</button>
    </div>
  );
}

export default Header;
