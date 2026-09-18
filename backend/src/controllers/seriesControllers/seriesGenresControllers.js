const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesGenres = async (req, res) => {
  try {
    const seriesGenres = await tables.serie_genres.readSerieGenres();
    res.status(200).json(seriesGenres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerieGenre = async (req, res) => {
  const serieGenre = await tables.serie_genres.readSerieGenreId(req.params.id);
  if (!serieGenre) {
    return res.status(404).json({ error: "SerieGenre not found" });
  } else {
    res.json(serieGenre);
  }
};

// E - BREAD - EDIT
const editSerieGenre = async (req, res, next) => {
  const { serie_id, genre_id } = req.body;
  const { id } = req.params;

  if (!serie_id || !genre_id) {
    return res
      .status(400)
      .json({ error: "serie_id and genre_id are required" });
  }

  try {
    await tables.serie_genres.updateSerieGenre(id, { serie_id, genre_id });
    res.status(200).json({ id: parseInt(id, 10), serie_id, genre_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addSerieGenre = async (req, res, next) => {
  const { serie_id, genre_id } = req.body;

  if (!serie_id || !genre_id) {
    return res
      .status(400)
      .json({ error: "serie_id and genre_id are required" });
  }

  try {
    const createdSerieGenre = await tables.serie_genres.createSerieGenre({
      serie_id,
      genre_id,
    });
    res
      .status(201)
      .json({ id: createdSerieGenre.insertId, serie_id, genre_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroySerieGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.serie_genres.deleteSerieGenre(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeriesGenres,
  readOneSerieGenre,
  editSerieGenre,
  addSerieGenre,
  destroySerieGenre,
};
