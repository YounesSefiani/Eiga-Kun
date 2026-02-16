import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../../services/UserContext/AuthContext";
import HorizontalScroll from "../../../../components/HorizontalScroll/HorizontalScroll";
import "./UserFavoritesPersonalities.css";

function UserFavoritesPersonalities({ favoritesPersonalities }) {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const likedPersonalities = useMemo(
    () =>
      favoritesPersonalities.filter(
        (personality) => personality.favorite_status === "liked",
      ),
    [favoritesPersonalities],
  );
  const favoritePersonalities = useMemo(
    () =>
      favoritesPersonalities.filter(
        (personality) => personality.favorite_status === "favorite",
      ),
    [favoritesPersonalities],
  );

  if (!user || !token) {
    navigate("/");
    return null;
  }

  return (
    <div className="userFavoritesPersonalities">
      <title>{`Les personnalités préférées de "${user.username}" - EigaKun`}</title>
      <div className="userFavoritesPersonalitiesSection">
        <h3>Les personnalités que j'aime</h3>
        <div className="userPersonalitiesList">
          {likedPersonalities && likedPersonalities.length > 0 ? (
            <HorizontalScroll>
              {likedPersonalities.map((personality) => (
                <div
                  className="userPersonalityCard"
                  key={personality.personality_id}
                >
                  <Link to={`/personalities/${personality.personality_id}`} title={`${personality.personality_fullname}`}>
                    <div className="userPersonalityPicture">
                      {personality.personality_picture ? (
                        <img
                          src={
                            personality.personality_picture &&
                            personality.personality_picture.startsWith("http")
                              ? personality.personality_picture
                              : personality.personality_picture
                                ? `http://localhost:3994/src/assets/Personalities/Pictures/${personality.personality_picture}`
                                : ""
                          }
                          alt={personality.personality_fullname}
                        />
                      ) : (
                        <div className="userPersonalityPictureHolder">
                          <p>Aucune image pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{personality.personality_fullname}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun personnalité aimé pour le moment.</p>
          )}
        </div>
      </div>
      <div className="userFavoritesPersonalitiesSection">
        <h3>Mes personnalités favorites</h3>
        <div className="userPersonalitiesList">
          {favoritePersonalities && favoritePersonalities.length > 0 ? (
            <HorizontalScroll>
              {favoritePersonalities.map((personality) => (
                <div
                  className="userPersonalityCard"
                  key={personality.personality_id}
                >
                  <Link to={`/personalities/${personality.personality_id}`} title={`${personality.personality_fullname}`}>
                    <div className="userPersonalityPicture">
                      {personality.personality_picture ? (
                        <img
                          src={
                            personality.personality_picture &&
                            personality.personality_picture.startsWith("http")
                              ? personality.personality_picture
                              : personality.personality_picture
                                ? `http://localhost:3994/src/assets/Personalities/Pictures/${personality.personality_picture}`
                                : ""
                          }
                          alt={personality.personality_fullname}
                        />
                      ) : (
                        <div className="userPersonalityPictureHolder">
                          <p>Aucune image pour le moment.</p>
                        </div>
                      )}
                    </div>
                    <h4>{personality.personality_fullname}</h4>
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          ) : (
            <p>Aucun personnalité favoris pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

UserFavoritesPersonalities.propTypes = {
  favoritesPersonalities: PropTypes.array,
};

export default UserFavoritesPersonalities;
