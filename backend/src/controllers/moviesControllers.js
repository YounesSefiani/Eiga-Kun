// Import access to database tables
const tables = require("../tables");

const MovieCastingManager = require("../models/MovieCastingManager");

const MoviesManager = require("../models/MovieManager");

const movieCastingManager = new MovieCastingManager();

const moviesManager = new MoviesManager();

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all movies from the database
    const movies = await tables.movies.readAll();

    // Respond with the movies in JSON format
    res.json(movies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific movie from the database based on the provided ID
    const movie = await tables.movies.read(req.params.id);

    // If the movie is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the movie in JSON format
    if (movie == null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getMovieWithCasting = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const movie = await moviesManager.read(movieId);
    if (movie == null) {
      return res.sendStatus(404);
    }
    const casting = await movieCastingManager.readByMovieId(movieId);
    movie.casting = casting;
    return res.json(movie);
  } catch (err) {
    return next(err);
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
  // Extract the movie data from the request body
  const movie = req.body;

  try {
    // Insert the movie into the database
    const insertId = await tables.movies.create(movie);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted movie
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
  getMovieWithCasting,
  edit,
  add,
  destroy,
};
