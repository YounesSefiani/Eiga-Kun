import React from "react";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      {/* <h2>Header</h2> */}
      <img src={EigaKunLogo} alt="Eiga-Kun Logo"/>
      <ul>
        <li>Films</li>
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
