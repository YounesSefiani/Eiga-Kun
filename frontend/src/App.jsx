import React, { useState } from "react";
import Header from "./components/Header/Header";
import HeaderPhone from "./components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "./components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import AvengersDoomsdayCountdown from "./assets/AvengersDoomsdayCountdown.jpg";
import TheBoysSeason5 from "./assets/TheBoysSeason5.webp";
import Michael from "./assets/Michael.webp";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="appContainer">
    <div className="appContainer">
      <Header />
      <HeaderPhone />
      <main className="mainContent">
        <div className="homePage">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                src={AvengersDoomsdayCountdown}
                alt="Avengers Doomsday Countdown"
              />
              <Carousel.Caption>
                <h3>Le compte à rebours a commencé</h3>
                <p>
                  Le prochain film Avengers : Doomsday sort le 16 Décembre 2026
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={TheBoysSeason5} alt="The Boys - Saison 5" />
              <Carousel.Caption>
                <h3>The Boys, la bataille finale</h3>
                <p>
                  La cinquième et dernière saison de la série "The Boys" arrive
                  sur Amazon Prime Vidéo, le 8 Avril 2026. {" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={Michael} alt="Michael" />
              <Carousel.Caption>
                <h3>Michael : La légende au cinéma</h3>
                <p>
                  Découvrez le biopic du King of the Pop, Michael Jackson, au
                  cinéma le 22 Avril 2026.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </main>
      <FooterPhone />
    </div>
    </div>
  );
}

export default App;
