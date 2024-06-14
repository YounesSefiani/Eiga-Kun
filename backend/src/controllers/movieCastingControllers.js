// Import access to database tables
const tables = require("../tables");

const MovieCastingManager = require("../models/MovieCastingManager");

const movieCastingManager = new MovieCastingManager();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all movieCastings from the database
    const movieCastings = await tables.movieCasting.readAll();

    // Respond with the movieCastings in JSON format
    res.json(movieCastings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific movieCasting from the database based on the provided ID
    const movieCasting = await tables.movieCasting.read(req.params.id);

    // If the movieCasting is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the movieCasting in JSON format
    if (movieCasting == null) {
      res.sendStatus(404);
    } else {
      res.json(movieCasting);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getCastingByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movieCasting = await movieCastingManager.readbyMovieId(movieId);
    res.json(movieCasting);
  } catch (err) {
    res.status(500).send(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    await tables.movies.update(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the movieCasting data from the request body
  const movieCasting = req.body;

  try {
    // Insert the movieCasting into the database
    const insertId = await tables.movieCasting.create(movieCasting);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted movieCasting
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.movies.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  getCastingByMovieId,
  edit,
  add,
  destroy,
};
