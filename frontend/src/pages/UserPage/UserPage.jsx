import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/UserContext/AuthContext";
import Header from "../../components/Header/Header";
import HeaderPhone from "../../components/Header/HeaderFooterPhone/HeaderPhone/HeaderPhone";
import FooterPhone from "../../components/Header/HeaderFooterPhone/FooterPhone/FooterPhone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EigaKunLogo from "../../assets/EigaKunLogo.png";
import UserFavoritesMovies from "./UserFavorites/UserFavoritesMovies/UserFavoritesMovies";
import connexion from "../../services/connexion";
import UserFavoritesSeries from "./UserFavorites/UserFavoritesSeries/UserFavoritesSeries";
import UserFavoritesPersonalities from "./UserFavorites/UserFavoritesPersonalities/UserFavoritesPersonalities";
import UserReviewsRatingsPage from "./UserReviewsRatingsPage/UserReviewsRatingsPage";
import UserUpdate from "./UserUpdate/UserUpdate";
import "./UserPage.css";

function UserPage() {
  const { user, logout, token, handleAuthError, sessionExpired, isLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);
  const [view, setView] = useState("user");
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [favoritesSeries, setFavoritesSeries] = useState([]);
  const [favoritesPersonalities, setFavoritesPersonalities] = useState([]);
  const [reviewsRatings, setReviewsRatings] = useState([]);
  useEffect(() => {
    if ((!user || !token) && !sessionExpired) {
      navigate("/");
      return;
    }
  }, [user, token, isLoading, handleAuthError, sessionExpired, navigate]);

  useEffect(() => {
    const fetchFavoritesMovies = async () => {
      if (user && token) {
        try {
          const response = await connexion.get(
            `/users/${user.id}/favorites/movies`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setFavoritesMovies(response.data);
        } catch (error) {
          handleAuthError(error);
          console.error(
            "Erreur lors de la récupération des films favoris:",
            error,
          );
        }
      }
    };
    fetchFavoritesMovies();

    const fetchFavoritesSeries = async () => {
      if (user && token) {
        try {
          const response = await connexion.get(
            `/users/${user.id}/favorites/series`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setFavoritesSeries(response.data);
        } catch (error) {
          handleAuthError(error);
          console.error(
            "Erreur lors de la récupération des séries favoris:",
            error,
          );
        }
      }
    };
    fetchFavoritesSeries();

    const fetchFavoritesPersonalities = async () => {
      if (user && token) {
        try {
          const response = await connexion.get(
            `/users/${user.id}/favorites/personalities`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setFavoritesPersonalities(response.data);
        } catch (error) {
          handleAuthError(error);
          console.error(
            "Erreur lors de la récupération des personnalités favoris:",
            error,
          );
        }
      }
    };
    fetchFavoritesPersonalities();

    const fetchReviewsRatings = async () => {
      if (user && token) {
        try {
          const response = await connexion.get(
            `/reviews/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setReviewsRatings(response.data);
        } catch (error) {
          handleAuthError(error);
          console.error(
            "Erreur lors de la récupération des notes et reviews:",
            error,
          );
        }
      }
    };
    fetchReviewsRatings();
    return () => {
      if (user && token)
        if (user && token) {
          fetchFavoritesMovies();
          fetchFavoritesSeries();
          fetchFavoritesPersonalities();
          fetchReviewsRatings();
        }
    };
  }, [user, token, handleAuthError]);

  // Ne pas rendre la page si l'utilisateur n'est pas connecté
  if (!user || !token) {
    return null;
  }

  return (
    <div className="userPage">
      <title>{`Page profil de "${user.username}" - EigaKun`}</title>
      <Header />
      <HeaderPhone />
      <div className="userPageContent">
        <div className="userBar">
          <div className="userBarSections">
            {user.role === "admin" && (
              <button onClick={() => navigate(`/user/admin/${token}`)}>
                Mode Admin
              </button>
            )}
            <button onClick={() => setView("user")}>Mon profil</button>
            <button onClick={() => setView("favoritesMovies")}>
              Mes films
            </button>
            <button onClick={() => setView("favoritesSeries")}>
              Mes séries
            </button>
            <button onClick={() => setView("favoritesPersonalities")}>
              Mes personnalités
            </button>
            <button onClick={() => setView("userReviewsRatings")}>Mes reviews</button>
            <button onClick={() => setView("userUpdate")}>Paramètres</button>
          </div>
          <button onClick={logout}>Déconnexion</button>
        </div>
        {view === "user" && (
          <div className="userProfile">
            <div className="userProfileHeader">
              <div className="userAvatar">
                {user.avatar ? (
                  <img
                    src={
                      user.avatar && user.avatar.startsWith("http")
                        ? user.avatar
                        : user.avatar
                          ? `http://localhost:3994/src/assets/Users/Avatars/${user.avatar}`
                          : ""
                    }
                    alt="User Avatar"
                    className="avatarImage"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="6x" />
                )}
              </div>
              <h3>{user.username}</h3>
            </div>
          </div>
        )}
        {view === "favoritesMovies" && (
          <UserFavoritesMovies favoritesMovies={favoritesMovies} />
        )}
        {view === "favoritesSeries" && (
          <UserFavoritesSeries favoritesSeries={favoritesSeries} />
        )}
        {view === "favoritesPersonalities" && (
          <UserFavoritesPersonalities
            favoritesPersonalities={favoritesPersonalities}
          />
        )}
        {view === "userReviewsRatings" && <UserReviewsRatingsPage reviewsRatings={reviewsRatings} />}
        {view === "userUpdate" && (
          <UserUpdate
            setView={setView}
            onUpdate={(updatedUser) => setUserData(updatedUser)}
            userData={userData}
          />
        )}
      </div>

      <FooterPhone />
    </div>
  );
}

export default UserPage;
