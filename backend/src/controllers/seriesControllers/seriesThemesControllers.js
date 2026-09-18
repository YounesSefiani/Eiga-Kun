const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesThemes = async (req, res) => {
  try {
    const seriesThemes = await tables.serie_themes.readSerieThemes();
    res.status(200).json(seriesThemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerieTheme = async (req, res) => {
  const serieTheme = await tables.serie_themes.readSerieThemeId(req.params.id);
  if (!serieTheme) {
    return res.status(404).json({ error: "SerieTheme not found" });
  } else {
    res.json(serieTheme);
  }
};

// E - BREAD - EDIT
const editSerieTheme = async (req, res, next) => {
  const { serie_id, theme_id } = req.body;
  const { id } = req.params;

  if (!serie_id || !theme_id) {
    return res
      .status(400)
      .json({ error: "serie_id and theme_id are required" });
  }

  try {
    await tables.serie_themes.updateSerieTheme(id, { serie_id, theme_id });
    res.status(200).json({ id: parseInt(id, 10), serie_id, theme_id });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD
const addSerieTheme = async (req, res, next) => {
  const { serie_id, theme_id } = req.body;

  if (!serie_id || !theme_id) {
    return res
      .status(400)
      .json({ error: "serie_id and theme_id are required" });
  }

  try {
    const createdSerieTheme = await tables.serie_themes.createSerieTheme({
      serie_id,
      theme_id,
    });
    res
      .status(201)
      .json({ id: createdSerieTheme.insertId, serie_id, theme_id });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE
const destroySerieTheme = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.serie_themes.deleteSerieTheme(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeriesThemes,
  readOneSerieTheme,
  editSerieTheme,
  addSerieTheme,
  destroySerieTheme,
};
