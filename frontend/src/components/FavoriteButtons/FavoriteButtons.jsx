import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faEye,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router-dom";
import "./FavoriteButtons.css";

function FavoriteButtons() {
  const movie = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isToWatch, setIsToWatch] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isInList, setIsInList] = useState(false);

  const favorite = () => {
    if (isFavorite) {
      toast(`Le film "${movie.title}" vient d'être retiré de vos favoris !`, {
        position: "top-right",
        className: "toast-notify",
      });
    } else {
      toast(`Le film "${movie.title}" vient d'être ajouté dans vos favoris !`, {
        position: "top-left",
        className: "toast-notify",
      });
    }
  };

  const toWatch = () => {
    if (isToWatch) {
      toast(`Vous ne prévoyez plus de voir le film "${movie.title}"`, {
        position: "top-right",
        className: "toast-notify",
      });
    } else {
      toast(`Vous prévoyez de voir le film "${movie.title}"`, {
        position: "top-left",
        className: "toast-notify",
      });
    }
  };

  const seen = () => {
    if (isSeen) {
      toast(`Vous n'avez pas encore vu le film "${movie.title}"`, {
        position: "top-right",
        className: "toast-notify",
      });
    } else {
      toast(
        `Vous avez vu le film "${movie.title}". N'hésitez pas à noter le film et à laisser un commentaire."`,
        {
          position: "top-left",
          className: "toast-notify",
        }
      );
    }
  };

  const list = () => {
    if (isInList) {
      toast(`Le film "${movie.title}" vient d'être retiré de votre liste`, {
        position: "top-right",
        className: "toast-notify",
      });
    } else {
      toast(`Le film "${movie.title}" vient d'être ajouté à votre liste !`, {
        position: "top-left",
        className: "toast-notify",
      });
    }
  };

  return (
    <div className="favoriteBtns">
      <button
        type="button"
        aria-label="favoriteButton"
        title="Ajouter aux favoris"
        className={isFavorite ? "active" : ""}
        onClick={() => {
          setIsFavorite(!isFavorite);
          favorite();
        }}
      >
        <FontAwesomeIcon icon={faStar} />
      </button>
      <button
        type="button"
        aria-label="toWatchButton"
        title="A voir"
        className={isToWatch ? "active" : ""}
        onClick={() => {
          setIsToWatch(!isToWatch);
          toWatch();
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button
        type="button"
        aria-label="seenButton"
        title="A vu"
        className={`seenButton ${isSeen ? "active" : ""}`}
        onClick={() => {
          setIsSeen(!isSeen);
          seen();
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button
        type="button"
        aria-label="listButton"
        title="Ajouter à ma liste"
        className={isInList ? "active" : ""}
        onClick={() => {
          setIsInList(!isInList);
          list();
        }}
      >
        <FontAwesomeIcon icon={faRectangleList} />
      </button>
      <ToastContainer />
    </div>
  );
}

export default FavoriteButtons;
