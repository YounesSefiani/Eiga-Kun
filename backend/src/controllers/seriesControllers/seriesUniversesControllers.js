const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesUniverses = async (req, res) => {
  try {
    const seriesUniverses = await tables.serie_universes.readSerieUniverses();
    res.status(200).json(seriesUniverses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerieUniverse = async (req, res) => {
  const serieUniverse = await tables.serie_universes.readSerieUniverseId(req.params.id);
  if (!serieUniverse) {
    return res.status(404).json({ error: "SerieUniverse not found" });
  } else {
    res.json(serieUniverse);
  }
};

// E - BREAD - EDIT
const editSerieUniverse = async (req, res, next) => {
  const { serie_id, universe_id } = req.body;
  const { id } = req.params;

  if (!serie_id || !universe_id) {
    return res
      .status(400)
      .json({ error: "serie_id and universe_id are required" });
  }

  try {
    await tables.serie_universes.updateSerieUniverse(id, { serie_id, universe_id });
    res.status(200).json({ id: parseInt(id, 10), serie_id, universe_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addSerieUniverse = async (req, res, next) => {
  const { serie_id, universe_id } = req.body;

  if (!serie_id || !universe_id) {
    return res
      .status(400)
      .json({ error: "serie_id and universe_id are required" });
  }

  try {
    const createdSerieUniverse = await tables.serie_universes.createSerieUniverse({
      serie_id,
      universe_id,
    });
    res
      .status(201)
      .json({ id: createdSerieUniverse.insertId, serie_id, universe_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroySerieUniverse = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.serie_universes.deleteSerieUniverse(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeriesUniverses,
  readOneSerieUniverse,
  editSerieUniverse,
  addSerieUniverse,
  destroySerieUniverse,
};
