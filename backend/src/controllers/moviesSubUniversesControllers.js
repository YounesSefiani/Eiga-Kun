const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesSubUniverses = async (req, res) => {
  try {
    const moviesSubUniverses = await tables.movie_subUniverses.readMovieSubUniverses();
    res.status(200).json(moviesSubUniverses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneMovieSubUniverse = async (req, res) => {
  const movieSubUniverse = await tables.movie_subUniverses.readMovieSubUniverseId(req.params.id);
  if (!movieSubUniverse) {
    return res.status(404).json({ error: "MovieSubUniverse not found" });
  } else {
    res.json(movieSubUniverse);
  }
};

// E - BREAD - EDIT
const editMovieSubUniverse = async (req, res, next) => {
  const { movie_id, subUniverse_id } = req.body;
  const { id } = req.params;

  if (!movie_id || !subUniverse_id) {
    return res
      .status(400)
      .json({ error: "movie_id and subUniverse_id are required" });
  }

  try {
    await tables.movie_subUniverses.updateMovieSubUniverse(id, { movie_id, subUniverse_id });
    res.status(200).json({ id: parseInt(id, 10), movie_id, subUniverse_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addMovieSubUniverse = async (req, res, next) => {
  const { movie_id, subUniverse_id } = req.body;

  if (!movie_id || !subUniverse_id) {
    return res
      .status(400)
      .json({ error: "movie_id and subUniverse_id are required" });
  }

  try {
    const createdMovieSubUniverse = await tables.movie_subUniverses.createMovieSubUniverse({
      movie_id,
      subUniverse_id,
    });
    res
      .status(201)
      .json({ id: createdMovieSubUniverse.insertId, movie_id, subUniverse_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroyMovieSubUniverse = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movie_subUniverses.deleteMovieSubUniverse(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMoviesSubUniverses,
  readOneMovieSubUniverse,
  editMovieSubUniverse,
  addMovieSubUniverse,
  destroyMovieSubUniverse,
};
