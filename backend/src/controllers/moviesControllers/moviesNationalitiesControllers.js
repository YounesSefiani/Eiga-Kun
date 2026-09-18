const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesNationalities = async (req, res) => {
  try {
    const moviesNationalities = await tables.movie_nationalities.readMovieNationalities();
    res.status(200).json(moviesNationalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneMovieNationality = async (req, res) => {
  const movieNationality = await tables.movie_nationalities.readMovieNationalityId(req.params.id);
  if (!movieNationality) {
    return res.status(404).json({ error: "MovieNationality not found" });
  } else {
    res.json(movieNationality);
  }
};

// E - BREAD - EDIT
const editMovieNationality = async (req, res, next) => {
  const { movie_id, nationality_id } = req.body;
  const { id } = req.params;

  if (!movie_id || !nationality_id) {
    return res
      .status(400)
      .json({ error: "movie_id and nationality_id are required" });
  }

  try {
    await tables.movie_nationalities.updateMovieNationality(id, { movie_id, nationality_id });
    res.status(200).json({ id: parseInt(id, 10), movie_id, nationality_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addMovieNationality = async (req, res, next) => {
  const { movie_id, nationality_id } = req.body;

  if (!movie_id || !nationality_id) {
    return res
      .status(400)
      .json({ error: "movie_id and nationality_id are required" });
  }

  try {
    const createdMovieNationality = await tables.movie_nationalities.createMovieNationality({
      movie_id,
      nationality_id,
    });
    res
      .status(201)
      .json({ id: createdMovieNationality.insertId, movie_id, nationality_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroyMovieNationality = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movie_nationalities.deleteMovieNationality(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMoviesNationalities,
  readOneMovieNationality,
  editMovieNationality,
  addMovieNationality,
  destroyMovieNationality,
};
