const express = require("express");
const router = express.Router();

// MOVIES //
const moviesControllers = require("./controllers/moviesControllers");
const uploadMovies = require("./Middlewares/Multer/MulterMovies");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readMovie);
router.put(
  "/movies/:id",
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "original_poster", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "original_logo", maxCount: 1 },
  ]),
  moviesControllers.editMovie,
);
router.post(
  "/movies",
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "original_poster", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "original_logo", maxCount: 1 },
  ]),
  moviesControllers.addMovie,
);
router.delete("/movies/:id", moviesControllers.destroyMovie);

// SERIES //
const seriesControllers = require("./controllers/seriesControllers");
const uploadSeries = require("./Middlewares/Multer/MulterSeries");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id", seriesControllers.readSerie);
router.get("/series/:id/full", seriesControllers.readFullSerie);
router.put(
  "/series/:id",
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "original_poster", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "original_logo", maxCount: 1 },
  ]),
  seriesControllers.editSerie,
);
router.post(
  "/series",
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "original_poster", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "original_logo", maxCount: 1 },
  ]),
  seriesControllers.addSerie,
);
router.delete("/series/:id", seriesControllers.destroySerie);

// SEASONS //
const seasonsControllers = require("./controllers/seasonsControllers");
const uploadSeasons = require("./Middlewares/Multer/MulterSeasons");

router.get("/seasons", seasonsControllers.browseSeasons);
router.get("/seasons/:id", seasonsControllers.readSeason);
router.get("/seasons/:id/episodes", seasonsControllers.readSeasonWithEpisodes);
router.put(
  "/seasons/:id",
  uploadSeasons.fields([{ name: "season_poster", maxCount: 1 }]),
  seasonsControllers.editSeason,
);
router.post(
  "/seasons",
  uploadSeasons.fields([{ name: "season_poster", maxCount: 1 }]),
  seasonsControllers.addSeason,
);
router.delete("/seasons/:id", seasonsControllers.destroySeason);

// EPISODES //
const episodesControllers = require("./controllers/episodesControllers");
const uploadEpisodes = require("./Middlewares/Multer/MulterEpisodes");

router.get("/episodes", episodesControllers.browseEpisodes);
router.get("/episodes/:id", episodesControllers.readEpisodeById);

router.put(
  "/episodes/:id",
  uploadEpisodes.fields([{ name: "episode_image", maxCount: 1 }]),
  episodesControllers.editEpisode,
);
router.post(
  "/episodes",
  uploadEpisodes.fields([{ name: "episode_image", maxCount: 1 }]),
  episodesControllers.addEpisode,
);
router.delete("/episodes/:id", episodesControllers.destroyEpisode);
module.exports = router;
