// Main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App";
import MoviesPage from "./pages/MoviesPage";
import OneMovie from "./components/OneMovie";
import SeriesPage from "./pages/SeriesPage";
import OneSerie from "./components/OneSerie";

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
    loader: async ({ params }) => {
      return axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/movies/${params.id}`)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        });
    },
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
