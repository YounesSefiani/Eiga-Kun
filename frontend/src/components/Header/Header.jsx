import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/UserContext/AuthContext";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import "./Header.css";

function Header() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="header">
      {/* <h2>Header</h2> */}
      <Link to="/">
        <img src={EigaKunLogo} alt="Eiga-Kun Logo" />
      </Link>
      <ul>
        <li>
          <Link to="/movies">Films</Link>
        </li>
        <li>
          <Link to="/series">Séries</Link>
        </li>
        <li>
          <Link to="/personalities">Personnalités</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <input type="text" placeholder="Rechercher..." />
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

export default Header;
