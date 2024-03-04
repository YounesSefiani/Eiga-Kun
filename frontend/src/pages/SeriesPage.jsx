import React from "react";
import { Carousel, CarouselCaption } from "react-bootstrap";
import { useLoaderData, Link } from "react-router-dom";
import Header from "../components/Header";
import Series from "../components/Series";
import "./SeriesPage.css";

function SeriesPage() {
  const series = useLoaderData();

  return (
    <div className="seriesPageContainer">
      <div className="header">
        <Header />
      </div>
      <div className="series-carousel">
        <Carousel>
          {series.map((serie) => (
            <Carousel.Item key={serie.id}>
              <Link to={`/series/${serie.id}`}>
                <img
                  className="carouselImage"
                  src={serie.background}
                  alt={serie.title}
                />
                <CarouselCaption>
                  {serie.logo ? (
                    <img
                      className="serieLogo"
                      src={serie.logo}
                      alt={serie.title}
                    />
                  ) : (
                    <h3>{serie.title}</h3>
                  )}
                </CarouselCaption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="serieContainer">
        <h1>Les series</h1>
        <Series series={series} />
      </div>
    </div>
  );
}

export default SeriesPage;
