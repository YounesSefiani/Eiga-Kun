const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesNationalities = async (req, res) => {
  try {
    const seriesNationalities = await tables.serie_nationalities.readSerieNationalities();
    res.status(200).json(seriesNationalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerieNationality = async (req, res) => {
  const serieNationality = await tables.serie_nationalities.readSerieNationalityId(req.params.id);
  if (!serieNationality) {
    return res.status(404).json({ error: "SerieNationality not found" });
  } else {
    res.json(serieNationality);
  }
};

// E - BREAD - EDIT
const editSerieNationality = async (req, res, next) => {
  const { serie_id, nationality_id } = req.body;
  const { id } = req.params;

  if (!serie_id || !nationality_id) {
    return res
      .status(400)
      .json({ error: "serie_id and nationality_id are required" });
  }

  try {
    await tables.serie_nationalities.updateSerieNationality(id, { serie_id, nationality_id });
    res.status(200).json({ id: parseInt(id, 10), serie_id, nationality_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addSerieNationality = async (req, res, next) => {
  const { serie_id, nationality_id } = req.body;

  if (!serie_id || !nationality_id) {
    return res
      .status(400)
      .json({ error: "serie_id and nationality_id are required" });
  }

  try {
    const createdSerieNationality = await tables.serie_nationalities.createSerieNationality({
      serie_id,
      nationality_id,
    });
    res
      .status(201)
      .json({ id: createdSerieNationality.insertId, serie_id, nationality_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroySerieNationality = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.serie_nationalities.deleteSerieNationality(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeriesNationalities,
  readOneSerieNationality,
  editSerieNationality,
  addSerieNationality,
  destroySerieNationality,
};
