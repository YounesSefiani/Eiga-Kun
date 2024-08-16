// Import access to database tables

const MovieCastingManager = require("../models/MovieCastingManager");

const movieCastingManager = new MovieCastingManager();

const SerieCastingManager = require("../models/SerieCastingManager");

const serieCastingManager = new SerieCastingManager();

const PersonalitiesManager = require("../models/PersonalityManager");

const personalityManager = new PersonalitiesManager();

const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all personalities from the database
    const personalities = await tables.personalities.readAll();

    // Respond with the personalities in JSON format
    res.json(personalities);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific personality from the database based on the provided ID
    const personality = await tables.personalities.read(req.params.id);

    // If the personalitie is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the personalitie in JSON format
    if (personality == null) {
      res.sendStatus(404);
    } else {
      res.json(personality);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const getFilmography = async (req, res) => {
  try {
    const personalityId = req.params.id;
    const personality = await personalityManager.read(personalityId);
    if (!personality) {
      return res.status(404).send("Personnalité non trouvée");
    }

    const movies = await movieCastingManager.moviesByPersonalityId(
      personalityId
    );

    const series = await serieCastingManager.seriesByPersonalityId(
      personalityId
    );

    const fullFilmography = { personality, movies, series };

    res.json(fullFilmography);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    await tables.personalities.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the personality data from the request body
  const personalities = req.body;

  try {
    // Insert the personality into the database
    const insertId = await tables.personalities.create(personalities);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted personalities
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.personalities.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  getFilmography,
  edit,
  add,
  destroy,
};
