import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../../../components/Header/Header";
import HeaderPhone from "../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import EigaKunLogo from "../../../assets/EigaKunLogo.png";
import "./PersonalitiesPage.css";
import HorizontalScroll from "../../../components/HorizontalScroll/HorizontalScroll";

function PersonalitiesPage() {
  const personalities = useLoaderData();
  return (
    <div className="personalitiesPage">
      <Header />
      <HeaderPhone />
      <div className="personalitiesList">
        {personalities && personalities.length > 0 ? (
          <HorizontalScroll>
            {personalities.map((personality) => (
              <div className="personalityCard" key={personality.id}>
                <Link to={`/personalities/${personality.id}`}>
                  {personality.picture ? (
                    <div className="personalityPicture">
                      <img
                        src={
                          personality.picture &&
                          personality.picture.startsWith("http")
                            ? personality.picture
                            : personality.picture
                            ? `http://localhost:3994/src/assets/Personalities/Pictures/${personality.picture}`
                            : ""
                        }
                        alt={personality.fullname}
                      />
                    </div>
                  ) : (
                    <div className="personalityPictureHolder">
                      <img src={EigaKunLogo} alt="Eiga-Kun Logo" />
                      <p>Aucune image pour le moment.</p>
                    </div>
                  )}
                  <h3>{personality.fullname}</h3>
                </Link>
              </div>
            ))}
          </HorizontalScroll>
        ) : (
          <p>No personalities found.</p>
        )}
      </div>
      <FooterPhone />
    </div>
  );
}
export default PersonalitiesPage;
