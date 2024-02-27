const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* *******************************PERSONALITIES***************************************** */

// Import personalitiesControllers module for handling personalities-related operations
const personalitiesControllers = require("./controllers/personalitiesControllers");

// Route to get a list of personalitiess
router.get("/personalities", personalitiesControllers.browse);

// Route to get a specific personality by ID
router.get("/personalities/:id", personalitiesControllers.read);

// Route to add a new personality
router.post("/personalities", personalitiesControllers.add);

// Route to update a personality
router.put("/personalities/:id", personalitiesControllers.edit);

// Route to delete a personality
router.delete("/personalities/:id", personalitiesControllers.destroy);

/* *******************************MOVIES***************************************** */

// Import moviesControllers module for handling personalities-related operations
const moviesControllers = require("./controllers/moviesControllers");

// Route to get a list of movies
router.get("/movies", moviesControllers.browse);

// Route to get a specific movie by ID
router.get("/movies/:id", moviesControllers.read);

// Route to add a new movie
router.post("/movies", moviesControllers.add);

// Route to update a movie
router.put("/movies/:id", moviesControllers.edit);

// Route to delete a movie
router.delete("/movies/:id", moviesControllers.destroy);

/* *******************************SERIES***************************************** */

// Import seriesControllers module for handling personalities-related operations
const seriesControllers = require("./controllers/seriesControllers");

// Route to get a list of series
router.get("/series", seriesControllers.browse);

// Route to get a specific serie by ID
router.get("/series/:id", seriesControllers.read);

// Route to add a new serie
router.post("/series", seriesControllers.add);

// Route to update a serie
router.put("/series/:id", seriesControllers.edit);

// Route to delete a serie
router.delete("/series/:id", seriesControllers.destroy);

/* *******************************USERS***************************************** */

// Import usersControllers module for handling personalities-related operations
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

/* *******************************PROFILS***************************************** */

// Import profilsControllers module for handling personalities-related operations
const profilsControllers = require("./controllers/profilsControllers");

// Route to get a list of profils
router.get("/profils", profilsControllers.browse);

// Route to get a specific profil by ID
router.get("/profils/:id", profilsControllers.read);

// Route to add a new profil
router.post("/profils", profilsControllers.add);

// Route to update a profil
router.put("/profils/:id", profilsControllers.edit);

// Route to delete a profil
router.delete("/profils/:id", profilsControllers.destroy);

/* *******************************ARTICLES***************************************** */

// Import articlesControllers module for handling personalities-related operations
const articlesControllers = require("./controllers/articlesControllers");

// Route to get a list of articles
router.get("/articles", articlesControllers.browse);

// Route to get a specific article by ID
router.get("/articles/:id", articlesControllers.read);

// Route to add a new article
router.post("/articles", articlesControllers.add);

// Route to update a article
router.put("/articles/:id", articlesControllers.edit);

// Route to delete a article
router.delete("/articles/:id", articlesControllers.destroy);

module.exports = router;
