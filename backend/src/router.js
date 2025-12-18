const express = require("express");
const router = express.Router();

// MOVIES //
const moviesControllers = require("./controllers/moviesControllers");
const uploadMovies = require("./Middlewares/Multer/MulterMovies");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.get("/movies/:id/full", moviesControllers.readFullMovie);
router.post(
  "/movies",
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.addMovie
);
router.put(
  "/movies/:id",
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.editMovie
);
router.delete("/movies/:id", moviesControllers.destroyMovie);

// SERIES //
const seriesControllers = require("./controllers/seriesControllers/seriesControllers");
const uploadSeries = require("./Middlewares/Multer/MulterSeries");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id/full", seriesControllers.readFullSerie);
router.get("/series/:id", seriesControllers.readOneSerie);
router.post(
  "/series",
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.addSerie
);
router.put(
  "/series/:id",
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.editSerie
);
router.delete("/series/:id", seriesControllers.destroySerie);

// SEASONS //
const seasonsControllers = require("./controllers/seriesControllers/seasonsControllers");
const uploadSeasons = require("./Middlewares/Multer/MulterSeasons");

router.get("/seasons", seasonsControllers.browseSeasons);
router.get("/seasons/:id", seasonsControllers.readSeason);
router.post("/seasons", uploadSeasons.single("poster"), seasonsControllers.addSeason);
router.put("/seasons/:id", uploadSeasons.single("poster"), seasonsControllers.editSeason);
router.delete("/seasons/:id", seasonsControllers.destroySeason);

// EPISODES //
const episodesControllers = require("./controllers/seriesControllers/episodesControllers");
const uploadEpisodes = require("./Middlewares/Multer/MulterEpisodes");

router.get("/episodes", episodesControllers.browseEpisodes);
router.get("/episodes/:id", episodesControllers.readEpisode);
router.post("/episodes", uploadEpisodes.single("episode_image"), episodesControllers.addEpisode);
router.put("/episodes/:id",uploadEpisodes.single("episode_image"), episodesControllers.editEpisode);
router.delete("/episodes/:id", episodesControllers.destroyEpisode);

// PERSONALITIES //
const personalitiesControllers = require("./controllers/personalitiesControllers");
const uploadPersonalities = require("./Middlewares/Multer/MulterPersonalities");

router.get("/personalities", personalitiesControllers.browsePersonalities);
router.get("/personalities/:id", personalitiesControllers.readOnePersonality);
router.get(
  "/personalities/:id/filmography",
  personalitiesControllers.readPersonalityFilmography
);
router.post("/personalities", uploadPersonalities.single("picture"), personalitiesControllers.addPersonality);
router.put("/personalities/:id", uploadPersonalities.single("picture"), personalitiesControllers.editPersonality);
router.delete(
  "/personalities/:id",
  personalitiesControllers.destroyPersonality
);

// CASTINGS //
const castingControllers = require("./controllers/castingsControllers");

router.get("/castings", castingControllers.browseCastings);
router.get("/castings/:id", castingControllers.readOneCasting);
router.post("/castings", castingControllers.addCasting);
router.put("/castings/:id", castingControllers.editCasting);
router.delete("/castings/:id", castingControllers.destroyCasting);

// USERS //
const usersControllers = require("./controllers/usersControllers/usersControllers");

router.get("/users", usersControllers.browseUsers);
router.get("/users/:id", usersControllers.readOneUser);
router.post("/users", usersControllers.addUser);
router.put("/users/:id", usersControllers.editUser);
router.delete("/users/:id", usersControllers.deleteUser);

// USERS FAVORITES / INTERACTIONS //
const usersFavoritesControllers = require("./controllers/usersControllers/usersFavoritesControllers");

// Toggle (ajouter/supprimer en un seul appel)
// router.post("/users/:userId/favorites", usersFavoritesControllers.toggleInteraction);

// Lecture
// router.get("/users/:userId/favorites", usersFavoritesControllers.getAllInteractions);
// router.get("/users/:userId/favorites/type/:type", usersFavoritesControllers.getInteractionsByType);
// router.get("/users/:userId/favorites/status/:status", usersFavoritesControllers.getInteractionsByStatus);
// router.get("/users/:userId/favorites/type/:type/status/:status", usersFavoritesControllers.getInteractionsByTypeAndStatus);

// // Ajout/Suppression explicites (optionnel)
// router.post("/users/:userId/favorites/add", usersFavoritesControllers.addInteraction);
// router.delete("/users/:userId/favorites/delete", usersFavoritesControllers.removeInteraction);

router.get(
  "/users/:userId/favorites/movies",
  usersFavoritesControllers.readFavoriteMovies
);
router.post(
  "/users/:userId/favorites/movie/add",
  usersFavoritesControllers.addingFavoriteMovie
);
router.delete(
  "/users/:userId/favorites/movie/remove",
  usersFavoritesControllers.removingFavoriteMovie
);

// USER FAVORITES SERIES //
router.get(
  "/users/:userId/favorites/series",
  usersFavoritesControllers.readFavoriteSeries
);
router.post(
  "/users/:userId/favorites/serie/add",
  usersFavoritesControllers.addingFavoriteSerie
);
router.delete(
  "/users/:userId/favorites/serie/remove",
  usersFavoritesControllers.removingFavoriteSerie
);

// USER FAVORITES PERSONALITIES //
router.get(
  "/users/:userId/favorites/personalities",
  usersFavoritesControllers.readFavoritePersonalities
);
router.post(
  "/users/:userId/favorites/personality/add",
  usersFavoritesControllers.addingFavoritePersonality
);
router.delete(
  "/users/:userId/favorites/personality/remove",
  usersFavoritesControllers.removingFavoritePersonality
);

// USERS REVIEWS //

// USER MOVIES REVIEWS //
const usersReviewsControllers = require("./controllers/usersControllers/usersReviewsControllers");

router.get(
  "/reviews/movies/:movieId",
  usersReviewsControllers.browseMovieReviews
);
router.get(
  "/reviews/users/:userId/movies",
  usersReviewsControllers.readUserMoviesReviews
);
router.post(
  "/reviews/users/:userId/movies/:movieId/add",
  usersReviewsControllers.addMovieReview
);
router.put(
  "/reviews/users/:userId/movies/:movieId/edit",
  usersReviewsControllers.editMovieReview
);

// USER SERIES REVIEWS //
router.get(
  "/reviews/series/:serieId",
  usersReviewsControllers.browseSerieReviews
);
router.get(
  "/reviews/users/:userId/series",
  usersReviewsControllers.readUserSeriesReviews
);
router.post(
  "/reviews/users/:userId/series/:serieId/add",
  usersReviewsControllers.addSerieReview
);
router.put(
  "/reviews/users/:userId/series/:serieId/edit",
  usersReviewsControllers.editSerieReview
);

// USER PERSONALITIES REVIEWS //
router.get(
  "/reviews/personalities/:personalityId",
  usersReviewsControllers.browsePersonalityReviews
);
router.get(
  "/reviews/users/:userId/personalities",
  usersReviewsControllers.readUserPersonalitiesReviews
);
router.post(
  "/reviews/users/:userId/personalities/:personalityId/add",
  usersReviewsControllers.addPersonalityReview
);
router.put(
  "/reviews/users/:userId/personalities/:personalityId/edit",
  usersReviewsControllers.editPersonalityReview
);

module.exports = router;
