const express = require("express");
const router = express.Router();

// MOVIES // 

const moviesControllers = require("./controllers/moviesControllers");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.post("/movies", moviesControllers.addMovie);
router.put("/movies/:id", moviesControllers.editMovie);
router.delete("/movies/:id", moviesControllers.destroyMovie);

// SERIES // 

const seriesControllers = require("./controllers/seriesControllers");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id", seriesControllers.readOneSerie);
router.post("/series", seriesControllers.addSerie);
router.put("/series/:id", seriesControllers.editSerie);
router.delete("/series/:id", seriesControllers.destroySerie);

module.exports = router;