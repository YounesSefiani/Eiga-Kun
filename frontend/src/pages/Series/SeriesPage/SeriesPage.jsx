import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";
import EigaKunLogo from "../../../assets/EigaKunLogo.png";
import "./SeriesPage.css";

function SeriesPage() {
  const series = useLoaderData();

  return (
    <div className="seriesPage">
      <Header />
      <HeaderPhone />
        <div className="seriesList">
          {series && series.length > 0 ? (
            <HorizontalScroll>
              {series.map((serie) => (
                <div className="serieCard" key={serie.id}>
                  <Link to={`/series/${serie.id}`}>
                                        {serie.poster ? (
                    <div className="seriePoster">
                        <img
                          src={
                            serie.poster && serie.poster.startsWith("http")
                              ? serie.poster
                              : serie.poster
                              ? `http://localhost:3994/src/assets/Series/Posters/${serie.poster}`
                              : ""
                          }
                          alt={serie.title}
                        />
                    </div>
                      ) : (
                        <div className="seriePosterHolder">
                          <img
                            src={EigaKunLogo}
                            className="seriePosterHolder"
                            alt="Logo Eiga-Kun"
                          />
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    <h3>{serie.title}</h3>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>No series found.</p>
          )}
        </div>
      <FooterPhone />
    </div>
  );
}

export default SeriesPage;
