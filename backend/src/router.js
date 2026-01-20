const express = require("express");
const router = express.Router();

const { hashPassword, updateHashPassword, validateUserForm, verifyToken } = require("./Middlewares/auth");
// MOVIES //
const moviesControllers = require("./controllers/moviesControllers");
const uploadMovies = require("./Middlewares/Multer/MulterMovies");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.get("/movies/:id/full", moviesControllers.readFullMovie);
router.post(
  "/movies",
  verifyToken,
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.addMovie
);
router.put(
  "/movies/:id",
  verifyToken,
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.editMovie
);
router.delete("/movies/:id", verifyToken, moviesControllers.destroyMovie);

// SERIES //
const seriesControllers = require("./controllers/seriesControllers/seriesControllers");
const uploadSeries = require("./Middlewares/Multer/MulterSeries");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id/full", seriesControllers.readFullSerie);
router.get("/series/:id", seriesControllers.readOneSerie);
router.post(
  "/series",
  verifyToken,
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.addSerie
);
router.put(
  "/series/:id",
  verifyToken,
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.editSerie
);
router.delete("/series/:id", verifyToken, seriesControllers.destroySerie);

// SEASONS //
const seasonsControllers = require("./controllers/seriesControllers/seasonsControllers");
const uploadSeasons = require("./Middlewares/Multer/MulterSeasons");

router.get("/seasons", seasonsControllers.browseSeasons);
router.get("/seasons/:id", seasonsControllers.readSeason);
router.post("/seasons", verifyToken, uploadSeasons.single("poster"), seasonsControllers.addSeason);
router.put("/seasons/:id", verifyToken, uploadSeasons.single("poster"), seasonsControllers.editSeason);
router.delete("/seasons/:id", verifyToken, seasonsControllers.destroySeason);

// EPISODES //
const episodesControllers = require("./controllers/seriesControllers/episodesControllers");
const uploadEpisodes = require("./Middlewares/Multer/MulterEpisodes");

router.get("/episodes", episodesControllers.browseEpisodes);
router.get("/episodes/:id", episodesControllers.readEpisode);
router.post("/episodes", verifyToken, uploadEpisodes.single("episode_image"), episodesControllers.addEpisode);
router.put("/episodes/:id", verifyToken, uploadEpisodes.single("episode_image"), episodesControllers.editEpisode);
router.delete("/episodes/:id", verifyToken,episodesControllers.destroyEpisode);

// PERSONALITIES //
const personalitiesControllers = require("./controllers/personalitiesControllers");
const uploadPersonalities = require("./Middlewares/Multer/MulterPersonalities");

router.get("/personalities", personalitiesControllers.browsePersonalities);
router.get("/personalities/:id", personalitiesControllers.readOnePersonality);
router.get(
  "/personalities/:id/full",
  personalitiesControllers.readPersonalityFilmography
);
router.post("/personalities", verifyToken, uploadPersonalities.single("picture"), personalitiesControllers.addPersonality);
router.put("/personalities/:id", verifyToken, uploadPersonalities.single("picture"), personalitiesControllers.editPersonality);
router.delete(
  "/personalities/:id", verifyToken,
  personalitiesControllers.destroyPersonality
);

// CASTINGS //
const castingControllers = require("./controllers/castingsControllers");

router.get("/castings", castingControllers.browseCastings);
router.get("/castings/:id", castingControllers.readOneCasting);
router.post("/castings", verifyToken, castingControllers.addCasting);
router.put("/castings/:id", verifyToken, castingControllers.editCasting);
router.delete("/castings/:id", verifyToken, castingControllers.destroyCasting);

// USERS //
const usersControllers = require("./controllers/usersControllers/usersControllers");
const uploadUsers = require("./Middlewares/Multer/MulterUsers");


router.get("/users", verifyToken, usersControllers.browseUsers);
router.get("/users/:id", verifyToken, usersControllers.readOneUser);
router.post("/users", validateUserForm, uploadUsers.single("avatar"), hashPassword, usersControllers.addUser);
router.put("/users/:id", updateHashPassword, usersControllers.editUser);
router.delete("/users/:id", verifyToken, usersControllers.deleteUser);
router.post("/users/login", usersControllers.login);
router.get("/users/verify/:token", usersControllers.validateUser);
router.post("/users/forgot-password", usersControllers.forgotPassword);
router.post("/users/reset-password/:resetToken", usersControllers.resetPassword);

// USERS FAVORITES / INTERACTIONS //
const usersFavoritesControllers = require("./controllers/usersControllers/usersFavoritesControllers");

router.get(
  "/users/:userId/favorites/movies",
  verifyToken,
  usersFavoritesControllers.readFavoriteMovies
);
router.post(
  "/users/:userId/favorites/movie/add",
  verifyToken,
  usersFavoritesControllers.addingFavoriteMovie
);
router.delete(
  "/users/:userId/favorites/movie/remove",
  verifyToken,
  usersFavoritesControllers.removingFavoriteMovie
);

// USER FAVORITES SERIES //
router.get(
  "/users/:userId/favorites/series",
  verifyToken,
  usersFavoritesControllers.readFavoriteSeries
);
router.post(
  "/users/:userId/favorites/serie/add",
  verifyToken,
  usersFavoritesControllers.addingFavoriteSerie
);
router.delete(
  "/users/:userId/favorites/serie/remove",
  verifyToken,
  usersFavoritesControllers.removingFavoriteSerie
);

// USER FAVORITES PERSONALITIES //
router.get(
  "/users/:userId/favorites/personalities",
  verifyToken,
  usersFavoritesControllers.readFavoritePersonalities
);
router.post(
  "/users/:userId/favorites/personality/add",
  verifyToken,
  usersFavoritesControllers.addingFavoritePersonality
);
router.delete(
  "/users/:userId/favorites/personality/remove",
  verifyToken,
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
  verifyToken,
  usersReviewsControllers.readUserMoviesReviews
);
router.post(
  "/reviews/users/:userId/movies/:movieId/add",
  verifyToken,
  usersReviewsControllers.addMovieReview
);
router.put(
  "/reviews/users/:userId/movies/:movieId/edit",
  verifyToken,
  usersReviewsControllers.editMovieReview
);

// USER SERIES REVIEWS //
router.get(
  "/reviews/series/:serieId",
  usersReviewsControllers.browseSerieReviews
);
router.get(
  "/reviews/users/:userId/series",
  verifyToken,
  usersReviewsControllers.readUserSeriesReviews
);
router.post(
  "/reviews/users/:userId/series/:serieId/add",
  verifyToken,
  usersReviewsControllers.addSerieReview
);
router.put(
  "/reviews/users/:userId/series/:serieId/edit",
  verifyToken,
  usersReviewsControllers.editSerieReview
);

// USER PERSONALITIES REVIEWS //
router.get(
  "/reviews/personalities/:personalityId",
  usersReviewsControllers.browsePersonalityReviews
);
router.get(
  "/reviews/users/:userId/personalities",
  verifyToken,
  usersReviewsControllers.readUserPersonalitiesReviews
);
router.post(
  "/reviews/users/:userId/personalities/:personalityId/add",
  verifyToken,
  usersReviewsControllers.addPersonalityReview
);
router.put(
  "/reviews/users/:userId/personalities/:personalityId/edit",
  verifyToken,
  usersReviewsControllers.editPersonalityReview
);

module.exports = router;
