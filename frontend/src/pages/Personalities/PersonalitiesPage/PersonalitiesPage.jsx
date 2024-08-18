import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./PersonalitiesPage.css";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";

function Personalities() {
  const personalities = useLoaderData();
  return (
    <div className="personalitiesPage">
      <Header />
      <div className="personalitiesList">
        <h1>Toutes les personnalités</h1>
        <div className="personalitiesContainer">
          <HorizontalScroll>
            {personalities.map((personality) => (
              <Link
                key={personality.id}
                to={`/personnalités/${personality.id}`}
              >
                <div className="personalityCard">
                  <div className="personalityImg">
                    <img
                      src={personality.image_src}
                      alt={personality.fullname}
                    />
                  </div>
                  <h2>{personality.fullname}</h2>
                  <p>{personality.profession}</p>
                </div>
              </Link>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </div>
  );
}

export default Personalities;
