// Import access to database tables
const tables = require("../tables");

const SeriesManager = require("../models/SerieManager");

const SeasonsManager = require("../models/SeasonManager");

const EpisodesManager = require("../models/EpisodeManager");

const SerieCastingManager = require("../models/SerieCastingManager");

const serieCastingManager = new SerieCastingManager();

const seriesManager = new SeriesManager();

const seasonsManager = new SeasonsManager();

const episodesManager = new EpisodesManager();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all series from the database
    const series = await tables.series.readAll();

    // Respond with the seriess in JSON format
    res.json(series);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific serie from the database based on the provided ID
    const series = await tables.series.read(req.params.id);

    // If the series is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the serie in JSON format
    if (series == null) {
      res.sendStatus(404);
    } else {
      res.json(series);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const getFullSerie = async (req, res) => {
  try {
    const serieId = req.params.id;

    if (!serieId) {
      return res.status(400).send("L'id de la série est requis");
    }

    const serie = await seriesManager.read(serieId);

    if (!serie) {
      return res.status(404).send("Série non trouvée");
    }

    const serieCasting = await serieCastingManager.castingBySerieId(serie.id);

    serie.serieCasting = serieCasting;

    const seasons = await seasonsManager.readBySerieId(serie.id);

    const seasonsWithEpisodes = await Promise.all(
      seasons.map(async (season) => {
        const episodes = await episodesManager.readBySeasonId(season.id);
        return { ...season, episodes };
      })
    );

    const serieWithDetails = { ...serie, seasons: seasonsWithEpisodes };

    res.json(serieWithDetails);
  } catch (err) {
    res.status(500).send("Erreur Serveur");
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    await tables.series.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the series data from the request body
  const series = req.body;

  try {
    // Insert the serie into the database
    const insertId = await tables.series.create(series);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted serie
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.series.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  getFullSerie,
  edit,
  add,
  destroy,
};
