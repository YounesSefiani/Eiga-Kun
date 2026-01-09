import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import MoviesPage from './pages/Movies/MoviesPage/MoviesPage.jsx';
import OneMoviePage from './pages/Movies/OneMoviePage/OneMoviePage.jsx';
import SeriesPage from './pages/Series/SeriesPage/SeriesPage.jsx';
import OneSeriePage from './pages/Series/OneSeriePage/OneSeriePage.jsx';
import connexion from "./services/connexion.js";
import './index.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/films",
    element: <MoviesPage />,
    loader: async () => {
      try {
        const res = await connexion.get('/movies');
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  {
    path: "/films/:id",
    element: <OneMoviePage />,
    loader: async ({ params }) => {
      try {
        const res = await connexion.get(`/movies/${params.id}`);
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
        const res = await connexion.get('/series');
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
  }

]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
