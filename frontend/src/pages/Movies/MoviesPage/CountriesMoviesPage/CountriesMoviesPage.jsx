import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import "./CountriesMoviesPage.css";

function MoviesCountriesPage() {

  const navigate = useNavigate();

    const countriesList = [
        { name: "France", url: "france", image: "https://www.drapeauxdespays.fr/data/flags/w580/fr.webp" },
        { name: "USA", url: "us", image: "https://www.drapeauxdespays.fr/data/flags/w580/us.webp" },
        { name: "Japon", url: "jp", image: "https://www.drapeauxdespays.fr/data/flags/w580/jp.webp" },
        { name: "UK", url: "gb", image: "https://www.drapeauxdespays.fr/data/flags/w580/gb.webp" },
        { name: "Allemagne", url: "de", image: "https://www.drapeauxdespays.fr/data/flags/w580/de.webp" },
        { name: "Italie", url: "it", image: "https://www.drapeauxdespays.fr/data/flags/w580/it.webp" },
        { name: "Espagne", url: "es", image: "https://www.drapeauxdespays.fr/data/flags/w580/es.webp" },
        { name: "Inde", url: "in", image: "https://www.drapeauxdespays.fr/data/flags/w580/in.webp" },
        { name: "Corée du Sud", url: "kr", image: "https://www.drapeauxdespays.fr/data/flags/w580/kr.webp" },
        { name: "Australie", url: "au", image: "https://www.drapeauxdespays.fr/data/flags/w580/au.webp" },
        { name: "Brésil", url: "br", image: "https://www.drapeauxdespays.fr/data/flags/w580/br.webp" },
        { name: "Canada", url: "ca", image: "https://www.drapeauxdespays.fr/data/flags/w580/ca.webp" },
        { name: "Russie", url: "ru", image: "https://www.drapeauxdespays.fr/data/flags/w580/ru.webp" },
        { name: "Mexique", url: "mx", image: "https://www.drapeauxdespays.fr/data/flags/w580/mx.webp" },
        { name: "Suède", url: "se", image: "https://www.drapeauxdespays.fr/data/flags/w580/se.webp" },
    ]
  return (
    <div className="moviesIndexPage moviesCountriesPage">
      <title>{`Les films par pays - Eiga-Kun`}</title>
      <Header />
      <HeaderPhone />
      <h2>Films par pays</h2>
      <div className="moviesIndexContainer moviesCountriesContainer">
        {countriesList.map((country) => (
          <div
            key={country.name}
            className="moviesIndexCard moviesCountryCard"
            onClick={() => navigate(`/movies/countries/${encodeURIComponent(country.url)}`)}
          >
            {country.image && <img src={country.image} alt={country.name} />}
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
      <FooterPhone />
    </div>
  );
}

export default MoviesCountriesPage;
