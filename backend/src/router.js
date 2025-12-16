const express = require("express");
const router = express.Router();

// MOVIES // 
const moviesControllers = require("./controllers/moviesControllers");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.get("/movies/:id/full", moviesControllers.readFullMovie);
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

// PERSONALITIES //
const personalitiesControllers = require("./controllers/personalitiesControllers");

router.get("/personalities", personalitiesControllers.browsePersonalities);
router.get("/personalities/:id", personalitiesControllers.readOnePersonality);
router.get("/personalities/:id/filmography", personalitiesControllers.readPersonalityFilmography);
router.post("/personalities", personalitiesControllers.addPersonality);
router.put("/personalities/:id", personalitiesControllers.editPersonality);
router.delete("/personalities/:id", personalitiesControllers.destroyPersonality);

// CASTINGS //
const castingControllers = require("./controllers/castingsControllers");

router.get("/castings", castingControllers.browseCastings);
router.get("/castings/:id", castingControllers.readOneCasting);
router.post("/castings", castingControllers.addCasting);
router.put("/castings/:id", castingControllers.editCasting);
router.delete("/castings/:id", castingControllers.destroyCasting);

module.exports = router;