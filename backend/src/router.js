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
module.exports = router;
