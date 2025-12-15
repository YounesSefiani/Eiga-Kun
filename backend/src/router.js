const express = require("express");
const router = express.Router();

// MOVIES // 

const moviesControllers = require("./controllers/moviesControllers");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.post("/movies", moviesControllers.addMovie);
router.put("/movies/:id", moviesControllers.editMovie);
router.delete("/movies/:id", moviesControllers.destroyMovie);

module.exports = router;