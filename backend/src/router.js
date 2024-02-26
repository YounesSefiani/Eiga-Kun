const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

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

/* ************************************************************************* */

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

/* ************************************************************************* */

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

module.exports = router;
