import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import connexion from "../connexion";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [isLoading] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");
    return !(storedUser && storedToken);
  });
  const [sessionExpired, setSessionExpired] = useState(false);
  const [userFavorites, setUserFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("userFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {
      favoritesMovies: [],
      favoritesSeries: [],
      favoritesPersonalities: [],
    };
  });

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("userFavorites");
    window.location.href = "/";
  }, []);

    const fetchUserFavorites = useCallback(async (userId, authToken) => {
    if (!userId || !authToken) return;

    try {
      const [
        favoritesMoviesResponse,
        favoritesSeriesResponse,
        favoritesPersonalitiesResponse,
      ] = await Promise.all([
        connexion.get(`/users/${userId}/favorites/movies`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .catch(() => ({ data: [] })),
        connexion.get(`/users/${userId}/favorites/series`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .catch(() => ({ data: [] })),
        connexion.get(`/users/${userId}/favorites/personalities`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .catch(() => ({ data: [] })),
      ]);

      // Le backend retourne directement les tableaux
      const favoritesMoviesList = Array.isArray(favoritesMoviesResponse.data) 
        ? favoritesMoviesResponse.data 
        : [];
      const favoritesSeriesList = Array.isArray(favoritesSeriesResponse.data) 
        ? favoritesSeriesResponse.data 
        : [];
      const favoritesPersonalitiesList = Array.isArray(favoritesPersonalitiesResponse.data) 
        ? favoritesPersonalitiesResponse.data 
        : [];

      const newFavorites = {
        favoritesMovies: favoritesMoviesList,
        favoritesSeries: favoritesSeriesList,
        favoritesPersonalities: favoritesPersonalitiesList,
      };

      setUserFavorites(newFavorites);
      localStorage.setItem("userFavorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }, []);

   useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUserId = localStorage.getItem("userId");
    let isMounted = true;

    if (savedToken) {
      try {
        // Decode the JWT token to get user data
        const decodedToken = JSON.parse(atob(savedToken.split(".")[1]));

        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, clear storage and redirect without calling setState
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("user");
          window.location.href = "/";
          return;
        } else {
          // Valid token, fetch user favorites (user/token already initialized from localStorage)
          // Use setTimeout to avoid synchronous setState within effect
          setTimeout(() => {
            if (isMounted) {
              fetchUserFavorites(decodedToken.sub || savedUserId, savedToken);
            }
          }, 0);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("authToken");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [fetchUserFavorites]);


  const login = useCallback((userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    setSessionExpired(false);
    localStorage.setItem("authToken", tokenData);
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("user", JSON.stringify(userData));

    fetchUserFavorites(userData.id, tokenData);
  }, [fetchUserFavorites]);

   const updateUser = useCallback((updatedUser, newToken) => {
    setUser(updatedUser);
    if (newToken) setToken(newToken);

    try {
      if (newToken) localStorage.setItem("authToken", newToken);
      localStorage.setItem("userId", updatedUser.id);
      localStorage.setItem("avatar", updatedUser.avatar);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  }, []);

  // Fonction pour rafraîchir les favoris (utile après ajout/suppression)
  const refreshFavorites = useCallback(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken && savedUserId) {
      fetchUserFavorites(savedUserId, savedToken);
    }
  }, [fetchUserFavorites]);

  // NE PAS déconnecter ici, juste signaler l'expiration
  const handleTokenExpired = useCallback(() => {
    setSessionExpired(true);
    setUser(null);
    setToken(null);
    localStorage.clear();
    setUserFavorites({
      favoritesMovies: [],
      favoritesSeries: [],
      favoritesPersonalities: [],
    });

    setTimeout(() => {
      logout();
    }, 5000);
  }, [setSessionExpired, logout]);

  const handleAuthError = useCallback(
    (error) => {
      if (
        error?.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleTokenExpired();
      }
      return false;
    },
    [handleTokenExpired]
  );

  const contextValue = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      logout,
      updateUser,
      handleAuthError,
      sessionExpired,
      setSessionExpired,
      handleTokenExpired,
      userFavorites,
      refreshFavorites,
    }),
    [
      user,
      token,
      isLoading,
      login,
      logout,
      updateUser,
      handleAuthError,
      sessionExpired,
      handleTokenExpired,
      userFavorites,
      refreshFavorites,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;