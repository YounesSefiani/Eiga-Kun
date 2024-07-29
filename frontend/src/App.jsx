import Carousel from "react-bootstrap/Carousel";
import Header from "./components/Header/Header";

import DeadPoolWolverine from "./assets/Carousel/Home/deadpoolwolverine.jpg";
import TheBoysSeason4 from "./assets/Carousel/Home/theboysseason4.jpg";
import Maxxxine from "./assets/Carousel/Home/maxine.jpg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="homeCarousel custom-carousel">
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <div className="top">
              <h1>Actuellement au cinéma</h1>
            </div>
            <img
              className="d-block w-100"
              src={DeadPoolWolverine}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Deadpool & Wolverine</h5>
              <p>Deadpool est de retour, et il n'est pas le seul !</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="top">
              <h1>Disponible sur Amazon Prime Vidéo</h1>
            </div>
            <img
              className="d-block w-100"
              src={TheBoysSeason4}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>The Boys, saison 4</h5>
              <p>
                La saison 4 de The Boys est disponible, dans son intégralité sur
                Amazon Prime Vidéo.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="top">
              <h1>Prochainement aux cinémas !</h1>
            </div>
            <img className="d-block w-100" src={Maxxxine} alt="Third slide" />
            <Carousel.Caption>
              <h5>Maxxxine</h5>
              <p>
                Cette superstar vivra une horreur, et il ne s'agit pas d'un
                film.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default App;
