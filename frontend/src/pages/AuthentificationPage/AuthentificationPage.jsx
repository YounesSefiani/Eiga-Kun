import React from "react";
import Header from "../../components/Header/Header";
import HeaderPhone from "../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEye,
  faStarHalfStroke,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import AuthentificationContainer from "../../components/AuthentificationContainer/AuthentificationContainer";
import "./AuthentificationPage.css";

function AuthentificationPage() {
  return (
    <div className="authentificationPage">
      <Header />
      <HeaderPhone />
      <div className="authPageContent">
        <div className="authPageContentLeft">
          <h2>Bienvenue sur <img src={EigaKunLogo} alt="Eiga-Kun Logo"/> !</h2>
          <h3>Une fois membre, voilà ce que tu pourras faire :</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faList} /> Ajouter tes films, séries et
              personnalités dans tes favoris.
            </li>
            <li>
              <FontAwesomeIcon icon={faEye} /> Avoir ta propre liste de films et
              séries à voir ou vus.
            </li>
            <li>
              <FontAwesomeIcon icon={faStarHalfStroke} /> Noter et donner ton
              avis sur les films, séries et personnalités.
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleQuestion} /> Mettre à l'épreuve ta
              culture cinématographique avec des quiz.
            </li>
          </ul>
        </div>
        <div className="authPageContentRight">
            <AuthentificationContainer />
        </div>
      </div>
      <FooterPhone />
    </div>
  );
}

export default AuthentificationPage;
