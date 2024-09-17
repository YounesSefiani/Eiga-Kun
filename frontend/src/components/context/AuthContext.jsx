// AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const toggleFavoriteMovie = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      }
      // Add to favorites
      return [...prevFavorites, movie];
    });
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");

    if (savedToken) {
      try {
        const decodedToken = JSON.parse(atob(savedToken.split(".")[1]));
        setUser({
          id: decodedToken.sub,
          mail: decodedToken.mail,
          pseudo: decodedToken.pseudo,
          avatar: decodedToken.avatar,
          role: decodedToken.role,
        });
        setToken(savedToken);
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("authToken", tokenData);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("avatar", userData.avatar);
  };

  const updateUser = (updatedUser, newToken) => {
    setUser(updatedUser);
    setToken(newToken);

    try {
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("userId", updatedUser.id);
      localStorage.setItem("avatar", updatedUser.avatar);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Vérifie les valeurs dans localStorage
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  const contextValue = useMemo(
    () => ({
      user,
      token,
      login,
      updateUser,
      logout,
      loading,
      msg,
      setMsg,
      favoriteMovies,
      toggleFavoriteMovie,
    }),
    [user, token, msg, loading, updateUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
