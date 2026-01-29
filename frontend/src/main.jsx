import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MoviesPage from "./pages/Movies/MoviesPage/MoviesPage.jsx";
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
import UserPage from "./pages/UserPage/UserPage.jsx";
import { AuthProvider } from "./services/UserContext/AuthContext.jsx";
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
