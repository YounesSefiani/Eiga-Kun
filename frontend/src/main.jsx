import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import App from "./App";
import MoviesPage from "./pages/Movies/MoviesPage/MoviesPage";
import OneMoviePage from "./pages/Movies/OneMovie/OneMovie";
import SeriesPage from "./pages/Series/SeriesPage/SeriesPage";
import OneSeriePage from "./pages/Series/OneSerie/OneSerie";
import PersonalitiesPage from "./pages/Personalities/PersonalitiesPage/PersonalitiesPage";
import OnePersonality from "./pages/Personalities/OnePersonality/OnePersonality";

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
    element: <OneMoviePage />,
    loader: async ({ params }) => {
      return axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/movies/${
            params.id
          }/movieCasting`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
  {
    path: "/séries",
    element: <SeriesPage />,
    loader: () => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/series`)
        .then((res) => res.data)
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/séries/:id",
    element: <OneSeriePage />,
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
        .catch((err) => console.error(err));
    },
  },
  {
    path: "/personnalités/:id",
    element: <OnePersonality />,
    loader: async ({ params }) => {
      return axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/personalities/${
            params.id
          }/career`
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
