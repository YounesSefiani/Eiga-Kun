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
module.exports = router;
