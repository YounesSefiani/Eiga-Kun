import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTv,
  faStar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "./FooterPhone.css";

function FooterPhone() {
  return (
    <div className="footerPhone">
      <ul>
        <li>
          <Link to="/films">
            <FontAwesomeIcon icon={faFilm} />
            Films
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faTv} />
          Séries
        </li>
        <li>
          <FontAwesomeIcon icon={faStar} />
          Personnalités
        </li>
        <li>
          <FontAwesomeIcon icon={faNewspaper} />
          Blog
        </li>
      </ul>
    </div>
  );
}

export default FooterPhone;
