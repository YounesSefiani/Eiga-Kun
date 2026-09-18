const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesGenres = async (req, res) => {
  try {
    const moviesGenres = await tables.movie_genres.readMovieGenres();
    res.status(200).json(moviesGenres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneMovieGenre = async (req, res) => {
  const movieGenre = await tables.movie_genres.readMovieGenreId(req.params.id);
  if (!movieGenre) {
    return res.status(404).json({ error: "MovieGenre not found" });
  } else {
    res.json(movieGenre);
  }
};

// E - BREAD - EDIT
const editMovieGenre = async (req, res, next) => {
  const { movie_id, genre_id } = req.body;
  const { id } = req.params;

  if (!movie_id || !genre_id) {
    return res
      .status(400)
      .json({ error: "movie_id and genre_id are required" });
  }

  try {
    await tables.movie_genres.updateMovieGenre(id, { movie_id, genre_id });
    res.status(200).json({ id: parseInt(id, 10), movie_id, genre_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addMovieGenre = async (req, res, next) => {
  const { movie_id, genre_id } = req.body;

  if (!movie_id || !genre_id) {
    return res
      .status(400)
      .json({ error: "movie_id and genre_id are required" });
  }

  try {
    const createdMovieGenre = await tables.movie_genres.createMovieGenre({
      movie_id,
      genre_id,
    });
    res
      .status(201)
      .json({ id: createdMovieGenre.insertId, movie_id, genre_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroyMovieGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movie_genres.deleteMovieGenre(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMoviesGenres,
  readOneMovieGenre,
  editMovieGenre,
  addMovieGenre,
  destroyMovieGenre,
};
