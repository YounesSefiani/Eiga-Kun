import React from "react";
import { useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import FilmographyContainer from "../../../components/CastingFilmography/FilmographyContainer/FilmographyContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./OnePersonalityPage.css";

function OnePersonalityPage() {
  const personality = useLoaderData();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calcul de l'âge si vivant
  let age;
  if (personality.birthdate && !personality.deathdate && personality.birthdate !== "1900-01-01") {
    const currentDate = new Date();
    const birth = new Date(personality.birthdate);
    let a = currentDate.getFullYear() - birth.getFullYear();
    const monthDiff = currentDate.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birth.getDate())) {
      a--;
    }
    age = a;
  }

  // Calcul de l'âge au décès si mort
  const deathAge = (() => {
    if (personality.birthdate && personality.deathdate && personality.birthdate !== "1900-01-01" && personality.deathdate !== "1900-01-01") {
      const birth = new Date(personality.birthdate);
      const death = new Date(personality.deathdate);
      let a = death.getFullYear() - birth.getFullYear();
      const monthDiff = death.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
        a--;
      }
      return a;
    }
    return null;
  })();

  return (
    <div className="onePersonalityPage">
      <Header />
      <HeaderPhone />
      <div className="onePersonalityHeader">
        <div className="onePersonalityHeaderLeft">
          <div className="userInteractions">
            {/* Composant des interactions utilisateur à implémenter une fois crée */}
            <p>Prochainement...</p>
          </div>

          {personality.picture ? (
            <div className="onePersonalityPicture">
              <img
                src={
                  personality.picture && personality.picture.startsWith("http")
                    ? personality.picture
                    : personality.picture
                    ? `http://localhost:3994/src/assets/Personalities/Pictures/${personality.picture}`
                    : ""
                }
                alt={personality.fullname}
              />
            </div>
          ) : (
            <div className="onePersonalityPictureHolder">
              <FontAwesomeIcon icon={faStar} />
              <p>Aucune image pour le moment.</p>
            </div>
          )}
          <div className="userReviews">
            {/* Composant des notes et critiques des utilisateurs et utilisatrices à implémenter une fois crée */}
            <p>Prochainement...</p>
          </div>
        </div>
        <div className="onePersonalityHeaderRight">
          <h2>{personality.fullname}</h2>
          <div className="onePersonalityDetails">
            <p>
              <b>Date de naissance</b>
              <br />
              {personality.birthdate === "1900-01-01"
                ? "??-??-????"
                : formatDate(personality.birthdate)}
              {!personality.deathdate && age !== undefined && (
                <> ({age} ans)</>
              )}
            </p>
            {personality.deathdate && (
              <p>
                <b>Date de décès</b>
                <br />
                {personality.deathdate === "1900-01-01"
                  ? "??-??-????"
                  : formatDate(personality.deathdate)}
                {deathAge !== null && (
                  <> ({deathAge} ans)</>
                )}
              </p>
            )}
            <p>
              <b>Nationalité :</b>
              <br />
              {personality.nationality}
            </p>
            <p>
              <b>Profession(s)</b>
              <br />
              {personality.profession}
            </p>
            <p>
              <b>Oeuvre(s) notable(s) :</b>
              <br />
              {personality.notable_works}
            </p>
          </div>
          <div className="onePersonalityBiography">
            <h4>Biographie :</h4>
            <p>{personality.biography}</p>
          </div>
        </div>
      </div>
      <div className="onePersonalityFilmography">
        <h3>Filmographie de {personality.fullname}</h3>
        <FilmographyContainer
          movies={personality.movies || []}
          series={personality.series || []}
        />
      </div>
      <div className="onePersonalityReviews">
        {/* Composant des Reviews à implémenter une fois crée */}
        <h4>Critiques de la personnalité "{personality.fullname}"</h4>
        <p>Prochainement...</p>
      </div>
      <FooterPhone />
    </div>
  );
}

export default OnePersonalityPage;
