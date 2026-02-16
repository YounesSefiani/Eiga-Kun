import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import "./UserFavoritesSeries.css";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import HorizontalScroll from "../../../../components/HorizontalScroll/HorizontalScroll";

function UserFavoritesSeries({ favoritesSeries }) {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const likedSeries = useMemo(
    () => favoritesSeries.filter((serie) => serie.favorite_status === "liked"),
    [favoritesSeries],
  );
  const favoriteSeries = useMemo(
    () =>
      favoritesSeries.filter((serie) => serie.favorite_status === "favorite"),
    [favoritesSeries],
  );
  const toWatchSeries = useMemo(
    () =>
      favoritesSeries.filter((serie) => serie.favorite_status === "toWatch"),
    [favoritesSeries],
  );
  const seenSeries = useMemo(
    () => favoritesSeries.filter((serie) => serie.favorite_status === "seen"),
    [favoritesSeries],
  );
  const isWatchingSeries = useMemo(
    () =>
      favoritesSeries.filter((serie) => serie.favorite_status === "isWatching"),
    [favoritesSeries],
  );

  if (!user || !token) {
    navigate("/");
    return null;
  }

  return (
    <div className="userFavoritesSeries">
            <title>{`Les séries préférées de "${user.username}" - EigaKun`}</title>
      <div className="userFavoritesSeriesSection">
        <h3>Les séries que j'aime</h3>
        <div className="userSeriesList">
          {likedSeries && likedSeries.length > 0 ? (
            <HorizontalScroll>
              {likedSeries.map((serie) => (
                <div className="userSerieCard" key={serie.serie_id}>
                  <Link to={`/series/${serie.serie_id}`} title={`${serie.serie_title}`}>
                    <div className="userSeriePoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="userSeriePosterHolder">
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{serie.serie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucune série aimée pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesSeriesSection">
        <h3>Mes séries favorites</h3>
        <div className="userSeriesList">
          {favoriteSeries && favoriteSeries.length > 0 ? (
            <HorizontalScroll>
              {favoriteSeries.map((serie) => (
                <div className="userSerieCard" key={serie.serie_id}>
                  <Link to={`/series/${serie.serie_id}`} title={`${serie.serie_title}`}>
                    <div className="userSeriePoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="userSeriePosterHolder">
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{serie.serie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucune série favorite pour le moment</p>
          )}
        </div>
      </div>
      <div className="userFavoritesSeriesSection">
        <h3>Les séries que j'ai vues</h3>
        <div className="userSeriesList">
          {seenSeries && seenSeries.length > 0 ? (
            <HorizontalScroll>
              {seenSeries.map((serie) => (
                <div className="userSerieCard" key={serie.serie_id}>
                  <Link to={`/series/${serie.serie_id}`} title={`${serie.serie_title}`}>
                    <div className="userSeriePoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="userSeriePosterHolder">
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{serie.serie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucune série vue pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesSeriesSection">
        <h3>Les séries que je veux voir</h3>
        <div className="userSeriesList">
          {toWatchSeries && toWatchSeries.length > 0 ? (
            <HorizontalScroll>
              {toWatchSeries.map((serie) => (
                <div className="userSerieCard" key={serie.serie_id}>
                  <Link to={`/series/${serie.serie_id}`} title={`${serie.serie_title}`}>
                    <div className="userSeriePoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="userSeriePosterHolder">
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{serie.serie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucune série vue pour le moment.</p>
          )}
        </div>
      </div>
       <div className="userFavoritesSeriesSection">
        <h3>Les séries que je regarde</h3>
        <div className="userSeriesList">
          {isWatchingSeries && isWatchingSeries.length > 0 ? (
            <HorizontalScroll>
              {isWatchingSeries.map((serie) => (
                <div className="userSerieCard" key={serie.serie_id}>
                  <Link to={`/series/${serie.serie_id}`} title={`${serie.serie_title}`}>
                    <div className="userSeriePoster">
                      {serie.serie_poster ? (
                        <img
                          src={
                            serie.serie_poster &&
                            serie.serie_poster.startsWith("http")
                              ? serie.serie_poster
                              : serie.serie_poster
                                ? `http://localhost:3994/src/assets/Series/Posters/${serie.serie_poster}`
                                : ""
                          }
                          alt={serie.serie_title}
                        />
                      ) : (
                        <div className="userSeriePosterHolder">
                          <p>Aucune affiche pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{serie.serie_title}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucune série en cours de visionnage pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

UserFavoritesSeries.propTypes = {
  favoritesSeries: PropTypes.array,
};

export default UserFavoritesSeries;
