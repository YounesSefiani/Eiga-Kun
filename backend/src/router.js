const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* *********************************MOVIES**************************************** */

// Import itemControllers module for handling item-related operations
const moviesControllers = require("./controllers/moviesControllers");

// Route to get a list of items
router.get("/movies", moviesControllers.browse);

// Route to get a specific item by ID
router.get("/movies/:id", moviesControllers.read);

router.get("/movies/:id/movieCasting", moviesControllers.getMovieWithCasting);

// Route to add a new movie
router.post("/movies", moviesControllers.add);

// Route to update a movie
router.put("/movies/:id", moviesControllers.edit);

// Route to delete a movie
router.delete("/movies/:id", moviesControllers.destroy);

/* *********************************PERSONALITIES**************************************** */

// Import itemControllers module for handling item-related operations
const personalitiesControllers = require("./controllers/personalitiesControllers");

// Route to get a list of items
router.get("/personalities", personalitiesControllers.browse);

// Route to get a specific item by ID
router.get("/personalities/:id", personalitiesControllers.read);

router.get(
  "/personalities/:id/career",
  personalitiesControllers.getFilmography
);
// Route to add a new movie
router.post("/personalities", personalitiesControllers.add);

// Route to update a movie
router.put("/personalities/:id", personalitiesControllers.edit);

// Route to delete a movie
router.delete("/personalities/:id", personalitiesControllers.destroy);

/* *********************************MOVIE*CASTING*************************************** */

// Import moviesControllers module for handling personalities-related operations
const movieCastingControllers = require("./controllers/movieCastingControllers");

// Route to get a list of movies
router.get("/movieCasting", movieCastingControllers.browse);

// Route to get a specific movie by ID
router.get("/movieCasting/:id", movieCastingControllers.read);

router.get(
  "/movieCasting/movies/:movieId",
  movieCastingControllers.getCastingByMovieId
);

// Route to add a new movie
router.post("/movieCasting", movieCastingControllers.add);

// Route to update a movie
router.put("/movieCasting/:id", movieCastingControllers.edit);

// Route to delete a movie
router.delete("/movieCasting/:id", movieCastingControllers.destroy);

/* *********************************SERIES**************************************** */

// Import itemControllers module for handling item-related operations
const serieControllers = require("./controllers/seriesControllers");

// Route to get a list of items
router.get("/series", serieControllers.browse);

// Route to get a specific item by ID
router.get("/series/:id", serieControllers.getFullSerie);

// Route to add a new movie
router.post("/series", serieControllers.add);

// Route to update a movie
router.put("/series/:id", serieControllers.edit);

// Route to delete a movie
router.delete("/series/:id", serieControllers.destroy);

/* *********************************SEASONS**************************************** */

// Import itemControllers module for handling item-related operations
const seasonsControllers = require("./controllers/seasonsControllers");

// Route to get a list of seasons
router.get("/seasons", seasonsControllers.browse);

// Route to get a specific season by ID
router.get("/seasons/:id", seasonsControllers.read);

router.get("/seasons/series/:serieId", seasonsControllers.getSeasonsBySerieId);

// Route to add a new season
router.post("/seasons", seasonsControllers.add);

// Route to update a season
router.put("/seasons/:id", seasonsControllers.edit);

// Route to delete a season
router.delete("/seasons/:id", seasonsControllers.destroy);

/* *********************************SEASONS**************************************** */

// Import itemControllers module for handling item-related operations
const episodesControllers = require("./controllers/episodesControllers");

// Route to get a list of seasons
router.get("/episodes", episodesControllers.browse);

// Route to get a specific season by ID
router.get("/episodes/:id", episodesControllers.read);

router.get("/episodes/seasons/:id", episodesControllers.getEpisodesBySeasonId);

// Route to add a new season
router.post("/episodes", episodesControllers.add);

// Route to update a season
router.put("/episodes/:id", episodesControllers.edit);

// Route to delete a season
router.delete("/episodes/:id", episodesControllers.destroy);

/* *********************************SERIE*CASTING*************************************** */

// Import moviesControllers module for handling users-related operations
const serieCastingControllers = require("./controllers/serieCastingControllers");

// Route to get a list of movies
router.get("/serieCasting", serieCastingControllers.browse);

// Route to get a specific movie by ID
router.get("/serieCasting/:id", serieCastingControllers.read);

router.get(
  "/serieCasting/series/:serieId",
  serieCastingControllers.getCastingBySerieId
);

// Route to add a new movie
router.post("/serieCasting", serieCastingControllers.add);

// Route to update a movie
router.put("/serieCasting/:id", serieCastingControllers.edit);

// Route to delete a movie
router.delete("/serieCasting/:id", serieCastingControllers.destroy);

/* *********************************USERS**************************************** */

// Import itemControllers module for handling item-related operations
const usersControllers = require("./controllers/usersControllers");

// Route to get a list of users
router.get("/users", usersControllers.browse);

// Route to get a specific user by ID
router.get("/users/:id", usersControllers.read);

// Route to add a new user
router.post("/users", usersControllers.add);

// Route to update a user
router.put("/users/:id", usersControllers.edit);

// Route to delete a user
router.delete("/users/:id", usersControllers.destroy);

/* *********************************PROFILES**************************************** */

// Import itemControllers module for handling item-related operations
const profilesControllers = require("./controllers/profilesControllers");

// Route to get a list of profiles
router.get("/profiles", profilesControllers.browse);

// Route to get a specific profil by ID
router.get("/profiles/:id", profilesControllers.read);

// Route to add a new profil
router.post("/profiles", profilesControllers.add);

// Route to update a profile
router.put("/profiles/:id", profilesControllers.edit);

// Route to delete a profile
router.delete("/profiles/:id", profilesControllers.destroy);

module.exports = router;
