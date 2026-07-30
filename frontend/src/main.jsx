import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MoviesPage from "./pages/Movies/MoviesPage/MoviesPage.jsx";
import MoviesGenresPage from "./pages/Movies/MoviesPage/GenresMoviesPage/GenresMoviesPage.jsx";
import OneGenreMoviesPage from "./pages/Movies/MoviesPage/OneGenreMoviesPage/OneGenreMoviesPage.jsx";
import MoviesDecadesPage from "./pages/Movies/MoviesPage/DecadesMoviesPage/DecadesMoviesPage.jsx";
import OneDecadeMoviesPage from "./pages/Movies/MoviesPage/OneDecadeMoviesPage/OneDecadeMoviesPage.jsx";
import MoviesCountriesPage from "./pages/Movies/MoviesPage/CountriesMoviesPage/CountriesMoviesPage.jsx";
import OneCountryMoviesPage from "./pages/Movies/MoviesPage/OneCountryMoviesPage/OneCountryMoviesPage.jsx";
import EveryMoviesPage from "./pages/Movies/MoviesPage/EveryMoviesPage/EveryMoviesPage.jsx";
import OneMoviePage from "./pages/Movies/OneMoviePage/OneMoviePage.jsx";
import SeriesPage from "./pages/Series/SeriesPage/SeriesPage.jsx";
import OneSeriePage from "./pages/Series/OneSeriePage/OneSeriePage.jsx";
import PersonalitiesPage from "./pages/Personalities/PersonalitiesPage/PersonalitiesPage.jsx";
import OnePersonalityPage from "./pages/Personalities/OnePersonalityPage/OnePersonalityPage.jsx";
import AuthentificationPage from "./pages/AuthentificationPage/AuthentificationPage.jsx";
import connexion from "./services/connexion.js";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ValidateAuthPage from "./pages/AuthentificationPage/ValidateAuthPage/ValidationAuthPage.jsx";
import UserAdminPage from "./pages/UserPage/UserAdminPage/UserAdminPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import { AuthProvider } from "./services/UserContext/AuthContext.jsx";
import { UserFavoritesProvider } from "./services/UserContext/UserFavoritesContext.jsx";
import { RatingsReviewsProvider } from "./services/UserContext/UserRatingsReviewsContext.jsx";
import ResetPasswordPage from "./pages/AuthentificationPage/ResetPasswordPage/ResetPasswordPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <MoviesPage />,
    loader: async () => {
      try {
        const res = await connexion.get("/movies");
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/movies/genres/",
    element: <MoviesGenresPage />,
  },
  {
    path: "/movies/genres/:genre",
    element: <OneGenreMoviesPage />,
  },
  {
    path: "/movies/decades",
    element: <MoviesDecadesPage />,
  },
  {
    path: "/movies/decades/:startYear",
    element: <OneDecadeMoviesPage />,
  },
  {
    path: "/movies/countries",
    element: <MoviesCountriesPage />,
  },
  {
    path: "/movies/countries/:country",
    element: <OneCountryMoviesPage />,
  },
  {
    path: "/movies/all",
    element: <EveryMoviesPage />,
    loader: async () => {
      try {
        const res = await connexion.get("/movies");
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/movies/:id",
    element: <OneMoviePage />,
    loader: async ({ params }) => {
      try {
        const res = await connexion.get(`/movies/${params.id}/full`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/series",
    element: <SeriesPage />,
    loader: async () => {
      try {
        const res = await connexion.get("/series");
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/series/:id",
    element: <OneSeriePage />,
    loader: async ({ params }) => {
      try {
        const res = await connexion.get(`/series/${params.id}/full`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/personalities",
    element: <PersonalitiesPage />,
    loader: async () => {
      try {
        const res = await connexion.get("/personalities");
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/personalities/:id",
    element: <OnePersonalityPage />,
    loader: async ({ params }) => {
      try {
        const res = await connexion.get(`/personalities/${params.id}/full`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/auth",
    element: <AuthentificationPage />,
  },
  {
    path: "/auth/validate/:token",
    element: <ValidateAuthPage />,
  },
  {
    path: "/auth/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/user/:token",
    element: <UserPage />,
  },
  {
    path: "/user/admin/:token",
    element: <UserAdminPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserFavoritesProvider>
        <RatingsReviewsProvider>
          <RouterProvider router={router} />
        </RatingsReviewsProvider>
      </UserFavoritesProvider>
    </AuthProvider>
  </React.StrictMode>,
);
