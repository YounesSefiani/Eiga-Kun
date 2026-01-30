import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faEye, faTv, faList } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { AuthContext } from "../../services/UserContext/AuthContext";
import { useUserFavorites } from "../../services/UserContext/UserFavoritesContext";
import "./UserFavoritesContainer.css";

function UserFavoritesContainer({ itemId, itemType, isSerie = false, title, fullname }) {
  const { user } = useContext(AuthContext);
  const { toggleFavorite, favorites } = useUserFavorites();
  const [pending, setPending] = useState(null);

  // Récupérer les statuts actuels de l'item
  
  const getItemStatuses = () => {
    if (!favorites) return [];
    
    const typeConfig = {
      movie: { list: favorites.movies || [], idKey: "movie_id" },
      serie: { list: favorites.series || [], idKey: "serie_id" },
      personality: { list: favorites.personalities || [], idKey: "personality_id" },
    };

    const config = typeConfig[itemType];
    if (!config || !config.list) return [];

    return config.list
      .filter((fav) => fav[config.idKey] === itemId)
      .map((fav) => fav.favorite_status);
  };

  const itemStatuses = getItemStatuses();

  // Gère le clic sur un bouton
  const handleClick = async (status) => {
    if (pending) return;

    setPending(status);
    const isCurrentlyActive = itemStatuses.includes(status);

    try {
      const result = await toggleFavorite(itemType, itemId, status);

      if (result.success && itemType === "movie") {
        if (status === "liked") {
        const message = isCurrentlyActive
          ? `Vous n'aimez plus le film "${title}"`
          : `Vous aimez le film "${title}"`;
        toast.success(message);
      } else if (status === "favorite") {
        const message = isCurrentlyActive
          ? `"${title}" a été retiré de vos favoris`
          : `"${title}" a été ajouté à vos favoris`;
        toast.success(message);
      } else if (status === "seen") {
        const message = isCurrentlyActive
          ? `Vous n'avez pas encore vu le film "${title}"`
          : `Vous avez vu le film "${title}"`;
        toast.success(message);
        } else if (status === "toWatch") {
            const message = isCurrentlyActive 
            ? `Vous ne prévoyez plus de voir le film "${title}"`
            : `Vous prévoyez de voir le film "${title}"`;
          toast.success(message);
        }
    } else if (result.success && itemType === "serie") {
        if (status === "liked") {
        const message = isCurrentlyActive
          ? `Vous n'aimez plus la série "${title}"`
          : `Vous aimez la série "${title}"`;
        toast.success(message);
      } else if (status === "favorite") {
        const message = isCurrentlyActive
          ? `"${title}" a été retiré de vos favoris`
          : `"${title}" a été ajouté à vos favoris`;
        toast.success(message);
      } else if (status === "seen") {
        const message = isCurrentlyActive
          ? `Vous n'avez pas encore vu la série "${title}"`
          : `Vous avez vu la série "${title}"`;
        toast.success(message);
        } else if (status === "toWatch") {
            const message = isCurrentlyActive 
            ? `Vous ne prévoyez plus de voir la série "${title}"`
            : `Vous prévoyez de voir la série "${title}"`;
          toast.success(message);
        } else if (status === "isWatching") {
            const message = isCurrentlyActive 
            ? `Vous ne regardez plus la série "${title}"`
            : `Vous regardez la série "${title}"`;
          toast.success(message);
        }
      } else if (result.success && itemType === "personality") {
        if (status === "liked") {
          const message = isCurrentlyActive
            ? `Vous n'aimez plus la personnalité "${fullname}"`
            : `Vous aimez la personnalité "${fullname}"`;
          toast.success(message);
        } else if (status === "favorite") {
          const message = isCurrentlyActive
            ? `"${fullname}" a été retiré(e) de vos personnalités favorites`
            : `"${fullname}" a été ajouté(e) à vos personnalités favorites`;
          toast.success(message);
        }
      } else {
        toast.error(result.error || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error("Toggle favorite error:", error);
    } finally {
      setPending(null);
    }
  };

  return user ? (
    <div className="userInteractionsButtons">
      <button
        type="button"
        className={itemStatuses.includes("liked") ? "active" : ""}
        onClick={() => handleClick("liked")}
        title={itemStatuses.includes("liked") ? "Je n'aime pas" : "J'aime"}
        disabled={pending === "liked"}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <button
        type="button"
        className={itemStatuses.includes("favorite") ? "active" : ""}
        onClick={() => handleClick("favorite")}
        title={itemStatuses.includes("favorite") ? "Plus mon favori" : "Mon favori"}
        disabled={pending === "favorite"}
      >
        <FontAwesomeIcon icon={faStar} />
      </button>
      {itemType === "movie" || itemType === "serie" ? (
        <>
          <button
            type="button"
            className={itemStatuses.includes("seen") ? "active" : ""}
            onClick={() => handleClick("seen")}
            title={itemStatuses.includes("seen") ? "Je n'ai pas encore vu" : "J'ai vu"}
            disabled={pending === "seen"}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            type="button"
            className={itemStatuses.includes("toWatch") ? "active" : ""}
            onClick={() => handleClick("toWatch")}
            title={itemStatuses.includes("toWatch") ? "A ne plus voir" : "A voir"}
            disabled={pending === "toWatch"}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
        </>
      ) : null}
      {isSerie && (
        <button
          type="button"
          className={itemStatuses.includes("isWatching") ? "active" : ""}
          onClick={() => handleClick("isWatching")}
          title={itemStatuses.includes("isWatching") ? "Je ne regarde plus actuellement" : "Je regarde actuellement"}
          disabled={pending === "isWatching"}
        >
          <FontAwesomeIcon icon={faTv} />
        </button>
      )}
      <ToastContainer />
    </div>
  ) : (
    <div className="noUserInteractionsButtons">
        <div className="noUserOverlay"></div>
        <p>Connectez-vous pour interagir</p>
      <button type="button" title="Aimé" disabled>
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <button type="button" title="Favoris" disabled>
        <FontAwesomeIcon icon={faStar} />
      </button>
      {(itemType === "movie" || itemType === "serie") && (
        <>
          <button type="button" title="Vu" disabled>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button type="button" title="À voir" disabled>
            <FontAwesomeIcon icon={faList} />
          </button>
        </>
      )}
      {isSerie && (
        <button type="button" title="En cours de visionnage" disabled>
          <FontAwesomeIcon icon={faTv} />
        </button>
      )}
      <ToastContainer />
    </div>
  );
}

UserFavoritesContainer.propTypes = {
  itemId: PropTypes.number.isRequired,
  itemType: PropTypes.oneOf(["movie", "serie", "personality"]).isRequired,
  isSerie: PropTypes.bool,
  title: PropTypes.string,
    fullname: PropTypes.string,
};

UserFavoritesContainer.defaultProps = {
  isSerie: false,
  title: "",
    fullname: "",
};

export default UserFavoritesContainer;