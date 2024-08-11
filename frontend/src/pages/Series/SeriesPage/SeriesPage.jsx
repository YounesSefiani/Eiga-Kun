import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./SeriesPage.css";

function SeriesPage() {
  const series = useLoaderData();

  return (
    <div className="seriesPage">
      <Header />
      <div className="seriesList">
        <h1>Toutes les séries</h1>
        <div className="seriesContainer">
          {series.map((serie) => (
            <div className="serieCard">
              <Link key={serie.id} to={`/séries/${serie.id}`}>
                <img
                  className="serieImg"
                  src={serie.poster}
                  alt={serie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeriesPage;
