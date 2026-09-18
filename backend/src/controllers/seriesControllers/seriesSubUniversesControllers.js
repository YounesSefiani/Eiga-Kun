const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesSubUniverses = async (req, res) => {
  try {
    const seriesSubUniverses = await tables.serie_subUniverses.readSerieSubUniverses();
    res.status(200).json(seriesSubUniverses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerieSubUniverse = async (req, res) => {
  const serieSubUniverse = await tables.serie_subUniverses.readSerieSubUniverseId(req.params.id);
  if (!serieSubUniverse) {
    return res.status(404).json({ error: "SerieSubUniverse not found" });
  } else {
    res.json(serieSubUniverse);
  }
};

// E - BREAD - EDIT
const editSerieSubUniverse = async (req, res, next) => {
  const { serie_id, subUniverse_id } = req.body;
  const { id } = req.params;

  if (!serie_id || !subUniverse_id) {
    return res
      .status(400)
      .json({ error: "serie_id and subUniverse_id are required" });
  }

  try {
    await tables.serie_subUniverses.updateSerieSubUniverse(id, { serie_id, subUniverse_id });
    res.status(200).json({ id: parseInt(id, 10), serie_id, subUniverse_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addSerieSubUniverse = async (req, res, next) => {
  const { serie_id, subUniverse_id } = req.body;

  if (!serie_id || !subUniverse_id) {
    return res
      .status(400)
      .json({ error: "serie_id and subUniverse_id are required" });
  }

  try {
    const createdSerieSubUniverse = await tables.serie_subUniverses.createSerieSubUniverse({
      serie_id,
      subUniverse_id,
    });
    res
      .status(201)
      .json({ id: createdSerieSubUniverse.insertId, serie_id, subUniverse_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroySerieSubUniverse = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.serie_subUniverses.deleteSerieSubUniverse(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeriesSubUniverses,
  readOneSerieSubUniverse,
  editSerieSubUniverse,
  addSerieSubUniverse,
  destroySerieSubUniverse,
};
