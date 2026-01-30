import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import connexion from "../connexion";

// eslint-disable-next-line react-refresh/only-export-components
export const UserFavoritesContext = createContext();

// Hook personnalisé pour utiliser le contexte des favoris
// eslint-disable-next-line react-refresh/only-export-components
export const useUserFavorites = () => {
  const context = useContext(UserFavoritesContext);
  if (!context) {
    throw new Error("useUserFavorites doit être utilisé dans un UserFavoritesProvider");
  }
  return context;
};

export function UserFavoritesProvider({ children }) {
  const { user, token, handleAuthError } = useContext(AuthContext);

  // États pour les favoris
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("userFavorites");
    return stored ? JSON.parse(stored) : {
      movies: [],
      series: [],
      personalities: [],
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  // Configuration des headers avec le token
  const getAuthHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  // ==================== REFRESH ALL FAVORITES ====================
  const refreshFavorites = useCallback(async () => {
    if (!user?.id || !token) return;

    setIsLoading(true);
    try {
      const [moviesRes, seriesRes, personalitiesRes] = await Promise.all([
        connexion.get(`/users/${user.id}/favorites/movies`, getAuthHeaders()).catch(() => ({ data: [] })),
        connexion.get(`/users/${user.id}/favorites/series`, getAuthHeaders()).catch(() => ({ data: [] })),
        connexion.get(`/users/${user.id}/favorites/personalities`, getAuthHeaders()).catch(() => ({ data: [] })),
      ]);

      const newFavorites = {
        movies: Array.isArray(moviesRes.data) ? moviesRes.data : [],
        series: Array.isArray(seriesRes.data) ? seriesRes.data : [],
        personalities: Array.isArray(personalitiesRes.data) ? personalitiesRes.data : [],
      };

      setFavorites(newFavorites);
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris:", err);
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, token, getAuthHeaders, handleAuthError]);

  // Charger les favoris au montage si l'utilisateur est connecté
  useEffect(() => {
    if (user?.id && token) {
      refreshFavorites();
    }
  }, [user?.id, token, refreshFavorites]);

  // ==================== ADD FAVORITE ====================
  const addFavorite = useCallback(async (type, itemId, status) => {
    if (!user?.id || !token) return { success: false, error: "Non authentifié" };

    // Mapping du type vers les clés API
    const typeConfig = {
      movie: { endpoint: "movie", idKey: "movie_id" },
      serie: { endpoint: "serie", idKey: "serie_id" },
      personality: { endpoint: "personality", idKey: "personality_id" },
    };

    const config = typeConfig[type];
    if (!config) return { success: false, error: "Type invalide" };

    try {
      const response = await connexion.post(
        `/users/${user.id}/favorites/${config.endpoint}/add`,
        {
          user_id: user.id,
          [config.idKey]: itemId,
          status,
        },
        getAuthHeaders()
      );

      // Rafraîchir les favoris après ajout
      await refreshFavorites();

      return { success: true, data: response.data };
    } catch (err) {
      console.error(`Erreur lors de l'ajout du ${type} aux favoris:`, err);
      handleAuthError(err);

      if (err.response?.status === 409) {
        return { success: false, error: err.response.data.error, alreadyExists: true };
      }

      return { success: false, error: "Erreur lors de l'ajout aux favoris" };
    }
  }, [user?.id, token, getAuthHeaders, refreshFavorites, handleAuthError]);

  // ==================== REMOVE FAVORITE ====================
  const removeFavorite = useCallback(async (type, itemId, status) => {
    if (!user?.id || !token) return { success: false, error: "Non authentifié" };

    const typeConfig = {
      movie: { endpoint: "movie", idKey: "movie_id" },
      serie: { endpoint: "serie", idKey: "serie_id" },
      personality: { endpoint: "personality", idKey: "personality_id" },
    };

    const config = typeConfig[type];
    if (!config) return { success: false, error: "Type invalide" };

    try {
      await connexion.delete(`/users/${user.id}/favorites/${config.endpoint}/remove`, {
        ...getAuthHeaders(),
        data: {
          user_id: user.id,
          [config.idKey]: itemId,
          status,
        },
      });

      // Rafraîchir les favoris après suppression
      await refreshFavorites();

      return { success: true };
    } catch (err) {
      console.error(`Erreur lors de la suppression du ${type} des favoris:`, err);
      handleAuthError(err);
      return { success: false, error: "Erreur lors de la suppression" };
    }
  }, [user?.id, token, getAuthHeaders, refreshFavorites, handleAuthError]);

  // ==================== CHECK IF FAVORITE ====================
  const isFavorite = useCallback((type, itemId, status) => {
    const typeConfig = {
      movie: { list: favorites.movies, idKey: "movie_id" },
      serie: { list: favorites.series, idKey: "serie_id" },
      personality: { list: favorites.personalities, idKey: "personality_id" },
    };

    const config = typeConfig[type];
    if (!config) return false;

    return config.list.some(
      (fav) => fav[config.idKey] === itemId && fav.favorite_status === status
    );
  }, [favorites]);

  // ==================== TOGGLE FAVORITE ====================
  const toggleFavorite = useCallback(async (type, itemId, status) => {
    if (isFavorite(type, itemId, status)) {
      return removeFavorite(type, itemId, status);
    }
    return addFavorite(type, itemId, status);
  }, [isFavorite, removeFavorite, addFavorite]);

  // ==================== CLEAR FAVORITES ====================
  const clearFavorites = useCallback(() => {
    const emptyFavorites = { movies: [], series: [], personalities: [] };
    setFavorites(emptyFavorites);
    localStorage.removeItem("userFavorites");
  }, []);

  // Valeur du contexte mémorisée
  const contextValue = useMemo(
    () => ({
      // États
      favorites,
      isLoading,

      // Fonctions principales
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      refreshFavorites,
      clearFavorites,
    }),
    [
      favorites,
      isLoading,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      refreshFavorites,
      clearFavorites,
    ]
  );

  return (
    <UserFavoritesContext.Provider value={contextValue}>
      {children}
    </UserFavoritesContext.Provider>
  );
}

UserFavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserFavoritesProvider;
