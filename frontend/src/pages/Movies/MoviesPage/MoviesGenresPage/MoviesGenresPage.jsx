import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import "./MoviesGenresPage.css";


// Liste des genres en dur (pas besoin du backend)
const genresList = [
  { name: "Action", image: "https://image.tmdb.org/t/p/original/r17jFHAemzcWPPtoO0UxjIX0xas.jpg" },
  { name: "Comédie", image: "https://image.tmdb.org/t/p/original/bQlw59HncOXX9alFlOYKHAvSnm.jpg" },
  { name: "Drame", image: "https://image.tmdb.org/t/p/original/esIkb7Wkfk016ZNpqX24w0gbgkb.jpg" },
  { name: "Horreur", image: "https://image.tmdb.org/t/p/original/7sK1fJTh6ndhI7gRg1L9VS4260r.jpg" },
  { name: "Science-Fiction", image: "https://image.tmdb.org/t/p/original/h3HsfV8Kn9Sz2QWUYYdP5ya23hx.jpg" },
  { name: "Fantastique", image: "https://image.tmdb.org/t/p/original/pZIiPOoNhhzVpBuVEpDK7vbBz4l.jpg" },
  { name: "Aventure", image: "https://image.tmdb.org/t/p/original/9lm7drIvSPANclGcbVUYJlK4ivh.jpg" },
  { name: "Romance", image: "https://image.tmdb.org/t/p/original/sCzcYW9h55WcesOqA12cgEr9Exw.jpg" },
  { name: "Animation", image: "https://image.tmdb.org/t/p/original/19SRdYFaxTbqG8rc9CpXmfLpPoM.jpg" },
  { name: "Thriller", image: "https://image.tmdb.org/t/p/original/8eihUxjQsJ7WvGySkVMC0EwbPAD.jpg"},
  { name: "Familial", image: "https://image.tmdb.org/t/p/original/xEfrWnwrayrRoi0DudLE3JJqjsO.jpg"},
  { name: "Western", image: "https://image.tmdb.org/t/p/original/x4biAVdPVCghBlsVIzB6NmbghIz.jpg"},
  { name: "Guerre", image: "https://image.tmdb.org/t/p/original/z2NFCCvH3joRoTWHuNDS499FypC.jpg"},
  { name: "Biopic", image: "https://image.tmdb.org/t/p/original/bBdYxkiDVGjKHmlyGa5WG1EVTI4.jpg"},
  { name: "Musical", image: "https://image.tmdb.org/t/p/original/qhRbhkw9aQMM3uqCt1F06vz5xXu.jpg"},
];

function MoviesGenresPage() {
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    navigate(`/movies/genre/${encodeURIComponent(genreName)}`);
  };

  return (
    <div className="moviesGenresPage">
      <Header />
      <HeaderPhone />
      <h2>Films par genres</h2>
      <div className="moviesGenresContainer">
        {genresList.map((genre) => (
          <div
            key={genre.name}
            className="moviesGenreCard"
            onClick={() => handleGenreClick(genre.name)}
          >
            {genre.image && <img src={genre.image} alt={genre.name} />}
            <h3>{genre.name}</h3>
          </div>
        ))}
      </div>
      <FooterPhone />
    </div>
  );
}

export default MoviesGenresPage;