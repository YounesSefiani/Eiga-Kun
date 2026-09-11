const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesUniverses = async (req, res) => {
  try {
    const moviesUniverses = await tables.movie_universes.readMovieUniverses();
    res.status(200).json(moviesUniverses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneMovieUniverse = async (req, res) => {
  const movieUniverse = await tables.movie_universes.readMovieUniverseId(req.params.id);
  if (!movieUniverse) {
    return res.status(404).json({ error: "MovieUniverse not found" });
  } else {
    res.json(movieUniverse);
  }
};

// E - BREAD - EDIT
const editMovieUniverse = async (req, res, next) => {
  const { movie_id, universe_id } = req.body;
  const { id } = req.params;

  if (!movie_id || !universe_id) {
    return res
      .status(400)
      .json({ error: "movie_id and universe_id are required" });
  }

  try {
    await tables.movie_universes.updateMovieUniverse(id, { movie_id, universe_id });
    res.status(200).json({ id: parseInt(id, 10), movie_id, universe_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addMovieUniverse = async (req, res, next) => {
  const { movie_id, universe_id } = req.body;

  if (!movie_id || !universe_id) {
    return res
      .status(400)
      .json({ error: "movie_id and universe_id are required" });
  }

  try {
    const createdMovieUniverse = await tables.movie_universes.createMovieUniverse({
      movie_id,
      universe_id,
    });
    res
      .status(201)
      .json({ id: createdMovieUniverse.insertId, movie_id, universe_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroyMovieUniverse = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movie_universes.deleteMovieUniverse(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMoviesUniverses,
  readOneMovieUniverse,
  editMovieUniverse,
  addMovieUniverse,
  destroyMovieUniverse,
};
