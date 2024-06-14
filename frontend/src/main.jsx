import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App";
import MoviesPage from "./pages/MoviesPage";
import OneMovie from "./components/OneMovie";
import SeriesPage from "./pages/SeriesPage";
import OneSerie from "./components/OneSerie";
import PersonalitiesPage from "./pages/PersonalitiesPage";
import OnePersonality from "./components/OnePersonality";
import Authentification from "./pages/Authentification";
import InscriptionUser from "./pages/InscriptionUser";
import Login from "./pages/Login";

const fetchMovieWithCasting = async ({ params }) => {
  const response = await fetch(
    `http://localhost:3310/api/movies/${params.id}/movieCasting`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/films",
    element: <MoviesPage />,
    loader: () => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/movies`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/films/:id",
    element: <OneMovie />,
    loader: fetchMovieWithCasting,
  },
  {
    path: "/series",
    element: <SeriesPage />,
    loader: () => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/series`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
  {
    path: "/series/:id",
    element: <OneSerie />,
    loader: async ({ params }) => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/series/${params.id}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
  {
    path: "/personnalités",
    element: <PersonalitiesPage />,
    loader: () => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/personalities`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
  {
    path: "/personnalités/:id",
    element: <OnePersonality />,
    loader: async ({ params }) => {
      return axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/personalities/${params.id}`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
  {
    path: "/authentification",
    element: <Authentification />,
  },
  {
    path: "/inscriptionUser",
    element: <InscriptionUser />,
  },
  {
    path: "/connexion",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
