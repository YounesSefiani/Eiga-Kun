const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesThemes = async (req, res) => {
  try {
    const moviesThemes = await tables.movie_themes.readMovieThemes();
    res.status(200).json(moviesThemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneMovieTheme = async (req, res) => {
  const movieTheme = await tables.movie_themes.readMovieThemeId(req.params.id);
  if (!movieTheme) {
    return res.status(404).json({ error: "MovieTheme not found" });
  } else {
    res.json(movieTheme);
  }
};

// E - BREAD - EDIT
const editMovieTheme = async (req, res, next) => {
  const { movie_id, theme_id } = req.body;
  const { id } = req.params;

  if (!movie_id || !theme_id) {
    return res
      .status(400)
      .json({ error: "movie_id and theme_id are required" });
  }

  try {
    await tables.movie_themes.updateMovieTheme(id, { movie_id, theme_id });
    res.status(200).json({ id: parseInt(id, 10), movie_id, theme_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addMovieTheme = async (req, res, next) => {
  const { movie_id, theme_id } = req.body;

  if (!movie_id || !theme_id) {
    return res
      .status(400)
      .json({ error: "movie_id and theme_id are required" });
  }

  try {
    const createdMovieTheme = await tables.movie_themes.createMovieTheme({
      movie_id,
      theme_id,
    });
    res
      .status(201)
      .json({ id: createdMovieTheme.insertId, movie_id, theme_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroyMovieTheme = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movie_themes.deleteMovieTheme(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMoviesThemes,
  readOneMovieTheme,
  editMovieTheme,
  addMovieTheme,
  destroyMovieTheme,
};
