import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import HeaderPhone from "../../../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import "./DecadesMoviesPage.css";

const decadesList = [
  { name: "2020s", background: "https://www.dbta.com/Images/Default.aspx?ImageID=22888", startYear: 2020 },
  { name: "2010s", background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffosC9-TnnLNoqb1NAyZhDgsAqt7NtZYROA&s", startYear: 2010 },
  { name: "2000s", background: "https://wallpapercat.com/w/full/f/5/0/307465-3840x2160-desktop-4k-the-matrix-wallpaper-photo.jpg", startYear: 2000 },
  { name: "1990s", background: "https://img.freepik.com/free-vector/80s-geometric-background-design-with-retro-style_23-2148236211.jpg?semt=ais_incoming&w=740&q=80", startYear: 1990 },
  { name: "1980s", background: "https://static.vecteezy.com/system/resources/thumbnails/002/058/317/small_2x/retro-futuristic-80s-background-free-vector.jpg", startYear: 1980 },
  { name: "1970s", background: "https://img.freepik.com/free-vector/groovy-psychedelic-background_23-2149074832.jpg", startYear: 1970 },
  { name: "1960s", background: "https://media.istockphoto.com/id/1404635524/video/pastel-colorful-retro-flat-wavy-sun-beams-background.jpg?s=640x640&k=20&c=HIynTNmXOkJmotZvmKwZ21Nds8VAkzuJjDVFsL-JGXU=", startYear: 1960 },
  { name: "1950s", background: "https://media.gettyimages.com/id/489096326/video/4k-old-film-countdown.jpg?s=640x640&k=20&c=IrYUQKSZa1yyUXcwR4m8zDhCuzEjp30Q_2_X_NGjWFg=", startYear: 1950 },
];

function MoviesDecadesPage() {
  const navigate = useNavigate();

  const handleDecadeClick = (startYear) => {
    navigate(`/movies/decades/${startYear}`);
  };

  return (
    <div className="moviesIndexPage moviesDecadesPage">
      <Header />
      <HeaderPhone />
      <h2>Films par années</h2>
      <div className="moviesIndexContainer moviesDecadesContainer">
        {decadesList.map((decade) => (
          <div
            key={decade.name}
            className="moviesIndexCard moviesDecadeCard"
            onClick={() => handleDecadeClick(decade.startYear)}
          >
            {decade.background && <img src={decade.background} alt={decade.name} />}
            <h3>{decade.name}</h3>
          </div>
        ))}
      </div>
      <FooterPhone />
    </div>
  );
}

export default MoviesDecadesPage;
