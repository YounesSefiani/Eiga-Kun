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
const seriesControllers = require("./controllers/seriesControllers/seriesControllers");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id/full", seriesControllers.readFullSerie);
router.get("/series/:id", seriesControllers.readOneSerie);
router.post("/series", seriesControllers.addSerie);
router.put("/series/:id", seriesControllers.editSerie);
router.delete("/series/:id", seriesControllers.destroySerie);

// SEASONS //
const seasonsControllers = require("./controllers/seriesControllers/seasonsControllers");

router.get("/seasons", seasonsControllers.browseSeasons);
router.get("/seasons/:id", seasonsControllers.readSeason);
router.post("/seasons", seasonsControllers.addSeason);
router.put("/seasons/:id", seasonsControllers.editSeason);
router.delete("/seasons/:id", seasonsControllers.destroySeason);

// EPISODES //
const episodesControllers = require("./controllers/seriesControllers/episodesControllers");

router.get("/episodes", episodesControllers.browseEpisodes);
router.get("/episodes/:id", episodesControllers.readEpisode);
router.post("/episodes", episodesControllers.addEpisode);
router.put("/episodes/:id", episodesControllers.editEpisode);
router.delete("/episodes/:id", episodesControllers.destroyEpisode);

module.exports = router;