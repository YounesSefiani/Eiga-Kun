// Debug : afficher la donnée reçue
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HorizontalScroll from "../../HorizontalScroll/HorizontalScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CastingContainer.css";

function CastingContainer({ casting }) {
  const realisation = casting.filter((cast) => cast.side === "Directing");
  const acting = casting.filter((cast) => cast.side === "Acting");

  return (
    <div className="castingContainer">
      <div className="realisationSection">
        <h3>Réalisation</h3>
        {realisation && realisation.length > 0 ? (
          <div className="realisationList">
            <HorizontalScroll>
              {realisation.map((cast) => (
                <div className="realisationCard" key={cast.id}>
                  <Link to={`/personalities/${cast.personality_id}`}>
                    {cast.personality_picture ? (
                      <img
                        src={
                          cast.personality_picture &&
                          cast.personality_picture.startsWith("http")
                            ? cast.personality_picture
                            : cast.personality_picture
                            ? `http://localhost:3994/src/assets/Personalities/Pictures/${cast.personality_picture}`
                            : ""
                        }
                        alt={cast.personalityName}
                        className="realisationPicture"
                      />
                    ) : (
                      <div className="realisationPictureHolder">
                        <FontAwesomeIcon icon={faStar} />
                        <p>Aucune image pour le moment.</p>
                      </div>
                    )}
                    <h4>{cast.personality_fullname}</h4>
                    <p>
                      <b>Rôle :</b>
                      <br />
                      {cast.role}
                    </p>
                    {cast.presence ? <p>{cast.presence}</p> : null}
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        ) : (
          <p>Aucun membre de la réalisation pour ce film.</p>
        )}
      </div>
      <div className="actingSection">
        <h3>Acteurs & Actrices</h3>
        {acting && acting.length > 0 ? (
          <div className="actingList">
            <HorizontalScroll>
              {acting.map((cast) => (
                <div className="actingCard" key={cast.id}>
                  <Link to={`/personalities/${cast.personality_id}`}>
                    {cast.personality_picture ? (
                      <img
                        src={
                          cast.personality_picture &&
                          cast.personality_picture.startsWith("http")
                            ? cast.personality_picture
                            : cast.personality_picture
                            ? `http://localhost:3994/src/assets/Personalities/Pictures/${cast.personality_picture}`
                            : ""
                        }
                        alt={cast.personalityName}
                        className="actingPicture"
                      />
                    ) : (
                      <div className="actingPictureHolder">
                        <FontAwesomeIcon icon={faStar} />
                        <p>Aucune image pour le moment.</p>
                      </div>
                    )}
                    <h4>{cast.personality_fullname}</h4>
                    <p>
                      <b>Rôle :</b>
                      <br />
                      {cast.role}
                    </p>
                    {cast.presence ? (
                      <p>
                        <b>Présence :</b>
                        <br />
                        {cast.presence}
                      </p>
                    ) : null}
                  </Link>
                </div>
              ))}
            </HorizontalScroll>
          </div>
        ) : (
          <p>Aucun membre d'acteurs pour ce film.</p>
        )}
      </div>
    </div>
  );
}

CastingContainer.propTypes = {
  casting: PropTypes.array,
};

export default CastingContainer;
