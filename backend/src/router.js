const express = require("express");
const router = express.Router();

const {
  hashPassword,
  updateHashPassword,
  validateUserForm,
  verifyToken,
} = require("./Middlewares/auth");

// MOVIES //
const moviesControllers = require("./controllers/moviesControllers/moviesControllers");
const uploadMovies = require("./Middlewares/Multer/MulterMovies");

router.get("/movies", moviesControllers.browseMovies);
router.get("/movies/:id", moviesControllers.readOneMovie);
router.get("/movies/:id/full", moviesControllers.readFullMovie);

// SERIES //
const seriesControllers = require("./controllers/seriesControllers/seriesControllers");
const uploadSeries = require("./Middlewares/Multer/MulterSeries");

router.get("/series", seriesControllers.browseSeries);
router.get("/series/:id/full", seriesControllers.readFullSerie);
router.get("/series/:id", seriesControllers.readOneSerie);

// SEASONS //
const seasonsControllers = require("./controllers/seriesControllers/seasonsControllers");
const uploadSeasons = require("./Middlewares/Multer/MulterSeasons");

router.get("/seasons", seasonsControllers.browseSeasons);
router.get("/seasons/:id", seasonsControllers.readSeason);

// EPISODES //
const episodesControllers = require("./controllers/seriesControllers/episodesControllers");
const uploadEpisodes = require("./Middlewares/Multer/MulterEpisodes");

router.get("/episodes", episodesControllers.browseEpisodes);
router.get("/episodes/:id", episodesControllers.readEpisode);

// GENRES //
const genresControllers = require("./controllers/genresControllers");
router.get("/genres", genresControllers.browseGenres);
router.get("/genres/:id/movies", genresControllers.readOneMoviesGenre);
router.get("/genres/:id", genresControllers.readOneGenre);

// MOVIES GENRES //
const moviesGenresControllers = require("./controllers/moviesControllers/moviesGenresControllers");
router.get("/movies-genres", moviesGenresControllers.browseMoviesGenres);
router.get("/movies-genres/:id", moviesGenresControllers.readOneMovieGenre);

// SERIES GENRES //
const seriesGenresControllers = require("./controllers/seriesControllers/seriesGenresControllers");
router.get("/series-genres", seriesGenresControllers.browseSeriesGenres);
router.get("/series-genres/:id", seriesGenresControllers.readOneSerieGenre);

// THEMES //
const themesControllers = require("./controllers/themesControllers");
router.get("/themes", themesControllers.browseThemes);
router.get("/themes/:id", themesControllers.readOneTheme);
router.get("/themes/:id/movies", themesControllers.readOneMoviesTheme);
router.get("/themes/:id/series", themesControllers.readOneSeriesTheme);

// MOVIES THEMES //
const moviesThemesControllers = require("./controllers/moviesControllers/moviesThemesControllers");
router.get("/movies-themes", moviesThemesControllers.browseMoviesThemes);
router.get("/movies-themes/:id", moviesThemesControllers.readOneMovieTheme);

// SERIES THEMES //
const seriesThemesControllers = require("./controllers/seriesControllers/seriesThemesControllers");
router.get("/series-themes", seriesThemesControllers.browseSeriesThemes);
router.get("/series-themes/:id", seriesThemesControllers.readOneSerieTheme);

// STREAMINGS //
const streamingsControllers = require("./controllers/streamingsControllers");
const uploadStreamings = require("./Middlewares/Multer/MulterStreamings");
router.get("/streamings", streamingsControllers.browseStreamings);
router.get("/streamings/:id", streamingsControllers.readOneStreaming);
router.get(
  "/streamings/:id/movies",
  streamingsControllers.browseMoviesByStreaming,
);
router.get(
  "/streamings/:id/series",
  streamingsControllers.browseSeriesByStreaming,
);

// MOVIES STREAMINGS //
const moviesStreamingsControllers = require("./controllers/moviesControllers/moviesStreamingsControllers");
router.get(
  "/movies-streamings",
  moviesStreamingsControllers.browseMoviesStreamings,
);
router.get(
  "/movies-streamings/:id",
  moviesStreamingsControllers.readOneMovieStreaming,
);
router.get(
  "/movies-streamings/:id/streamings",
  moviesStreamingsControllers.browseMovieByStreamings,
);

// SERIES STREAMINGS //
const seriesStreamingsControllers = require("./controllers/seriesControllers/seriesStreamingsControllers");
router.get(
  "/series-streamings",
  seriesStreamingsControllers.browseSeriesStreamings,
);
router.get(
  "/series-streamings/:id",
  seriesStreamingsControllers.readOneSerieStreaming,
);
router.get(
  "/series-streamings/:id/streamings",
  seriesStreamingsControllers.browseSerieByStreamings,
);

// UNIVERSES //
const universesControllers = require("./controllers/universesControllers");
router.get("/universes", universesControllers.browseUniverses);
router.get("/universes/:id", universesControllers.readOneUniverse);
router.get(
  "/universes/:id/sub-universes",
  universesControllers.readAllSubUniverseInUniverse,
);

// MOVIES UNIVERSES //
const moviesUniversesControllers = require("./controllers/moviesControllers/moviesUniversesControllers");
router.get(
  "/movies-universes",
  moviesUniversesControllers.browseMoviesUniverses,
);
router.get(
  "/movies-universes/:id",
  moviesUniversesControllers.readOneMovieUniverse,
);

// SERIES UNIVERSES //
const seriesUniversesControllers = require("./controllers/seriesControllers/seriesUniversesControllers");
router.get(
  "/series-universes",
  seriesUniversesControllers.browseSeriesUniverses,
);
router.get(
  "/series-universes/:id",
  seriesUniversesControllers.readOneSerieUniverse,
);

// SUB-UNIVERSES //
const subUniversesControllers = require("./controllers/subUniversesControllers");
router.get("/sub-universes", subUniversesControllers.browseSubUniverses);
router.get("/sub-universes/:id", subUniversesControllers.readOneSubUniverse);

// MOVIES SUB-UNIVERSES //
const moviesSubUniversesControllers = require("./controllers/moviesControllers/moviesSubUniversesControllers");
router.get(
  "/movies-subuniverses",
  moviesSubUniversesControllers.browseMoviesSubUniverses,
);
router.get(
  "/movies-subuniverses/:id",
  moviesSubUniversesControllers.readOneMovieSubUniverse,
);

// SERIES SUB-UNIVERSES //
const seriesSubUniversesControllers = require("./controllers/seriesControllers/seriesSubUniversesControllers");
router.get(
  "/series-subuniverses",
  seriesSubUniversesControllers.browseSeriesSubUniverses,
);
router.get(
  "/series-subuniverses/:id",
  seriesSubUniversesControllers.readOneSerieSubUniverse,
);

// NATIONALITIES //
const nationalitiesControllers = require("./controllers/nationalitiesControllers");
router.get("/nationalities", nationalitiesControllers.browseNationalities);
router.get("/nationalities/:id", nationalitiesControllers.readOneNationality);
router.get(
  "/nationalities/:id/movies",
  nationalitiesControllers.readOneNationalityInMovie,
);
router.get(
  "/nationalities/:id/series",
  nationalitiesControllers.readOneNationalityInSerie,
);

// MOVIES NATIONALITIES //
const moviesNationalitiesControllers = require("./controllers/moviesControllers/moviesNationalitiesControllers");
router.get(
  "/movies-nationalities",
  moviesNationalitiesControllers.browseMoviesNationalities,
);
router.get(
  "/movies-nationalities/:id",
  moviesNationalitiesControllers.readOneMovieNationality,
);

// SERIES NATIONALITIES //
const seriesNationalitiesControllers = require("./controllers/seriesControllers/seriesNationalitiesControllers");
router.get(
  "/series-nationalities",
  seriesNationalitiesControllers.browseSeriesNationalities,
);
router.get(
  "/series-nationalities/:id",
  seriesNationalitiesControllers.readOneSerieNationality,
);

// PERSONALITIES //
const personalitiesControllers = require("./controllers/personalitiesControllers");
const uploadPersonalities = require("./Middlewares/Multer/MulterPersonalities");

router.get("/personalities", personalitiesControllers.browsePersonalities);
router.get("/personalities/:id", personalitiesControllers.readOnePersonality);
router.get(
  "/personalities/:id/full",
  personalitiesControllers.readPersonalityFilmography,
);

// CASTINGS //
const castingControllers = require("./controllers/castingsControllers");

router.get("/castings", castingControllers.browseCastings);
router.get("/castings/:id", castingControllers.readOneCasting);

// USERS //
const usersControllers = require("./controllers/usersControllers/usersControllers");
const uploadUsers = require("./Middlewares/Multer/MulterUsers");

router.get("/users", verifyToken, usersControllers.browseUsers);
router.get("/users/:id", verifyToken, usersControllers.readOneUser);
router.post(
  "/users",
  uploadUsers.single("avatar"),
  validateUserForm,
  hashPassword,
  usersControllers.addUser,
);
router.post("/users/login", usersControllers.login);
router.get("/users/verify/:token", usersControllers.validateUser);
router.post("/users/forgot-password", usersControllers.forgotPassword);
router.post(
  "/users/reset-password/:resetToken",
  usersControllers.resetPassword,
);

// SEARCH //
router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.json({ movies: [], series: [], personalities: [] });
  }

  try {
    const tables = require("./tables");
    const searchTerm = `%${q}%`;

    const [movies] = await tables.movies.database.query(
      "SELECT id, title, poster, release_date FROM movies WHERE title LIKE ? LIMIT 5",
      [searchTerm],
    );

    const [series] = await tables.series.database.query(
      "SELECT id, title, poster, beginning_date, ending_date FROM series WHERE title LIKE ? LIMIT 5",
      [searchTerm],
    );

    const [personalities] = await tables.personalities.database.query(
      "SELECT id, fullname, picture, profession FROM personalities WHERE fullname LIKE ? LIMIT 5",
      [searchTerm],
    );

    res.json({ movies, series, personalities });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});

router.use(verifyToken);

// MOVIES //
router.post(
  "/movies",
  verifyToken,
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.addMovie,
);
router.put(
  "/movies/:id",
  verifyToken,
  uploadMovies.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  moviesControllers.editMovie,
);
router.delete("/movies/:id", verifyToken, moviesControllers.destroyMovie);

// SERIES //
router.post(
  "/series",
  verifyToken,
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.addSerie,
);
router.put(
  "/series/:id",
  verifyToken,
  uploadSeries.fields([
    { name: "poster", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  seriesControllers.editSerie,
);
router.delete("/series/:id", verifyToken, seriesControllers.destroySerie);

// SEASONS //
router.post(
  "/seasons",
  verifyToken,
  uploadSeasons.single("season_poster"),
  seasonsControllers.addSeason,
);
router.put(
  "/seasons/:id",
  verifyToken,
  uploadSeasons.single("season_poster"),
  seasonsControllers.editSeason,
);
router.delete("/seasons/:id", verifyToken, seasonsControllers.destroySeason);

// EPISODES //
router.post(
  "/episodes",
  verifyToken,
  uploadEpisodes.single("episode_image"),
  episodesControllers.addEpisode,
);
router.put(
  "/episodes/:id",
  verifyToken,
  uploadEpisodes.single("episode_image"),
  episodesControllers.editEpisode,
);
router.delete("/episodes/:id", verifyToken, episodesControllers.destroyEpisode);

// GENRES //
const uploadGenres = require("./Middlewares/Multer/MulterGenres");

router.post("/genres", verifyToken, uploadGenres.single("imageGenre"), genresControllers.addGenre);
router.put("/genres/:id", verifyToken, uploadGenres.single("imageGenre"), genresControllers.editGenre);
router.delete("/genres/:id", verifyToken, genresControllers.destroyGenre);

// THEMES //
const uploadThemes = require("./Middlewares/Multer/MulterThemes");

router.post("/themes", verifyToken, uploadThemes.single("imageTheme"), themesControllers.addTheme);
router.put("/themes/:id", verifyToken, uploadThemes.single("imageTheme"), themesControllers.editTheme);
router.delete("/themes/:id", verifyToken, themesControllers.destroyTheme);

// MOVIES GENRES //
router.post(
  "/movies-genres",
  verifyToken,
  moviesGenresControllers.addMovieGenre,
);
router.put(
  "/movies-genres/:id",
  verifyToken,
  moviesGenresControllers.editMovieGenre,
);
router.delete(
  "/movies-genres/:id",
  verifyToken,
  moviesGenresControllers.destroyMovieGenre,
);

// SERIES GENRES //
router.post(
  "/series-genres",
  verifyToken,
  seriesGenresControllers.addSerieGenre,
);
router.put(
  "/series-genres/:id",
  verifyToken,
  seriesGenresControllers.editSerieGenre,
);
router.delete(
  "/series-genres/:id",
  verifyToken,
  seriesGenresControllers.destroySerieGenre,
);

// MOVIES THEMES //
router.post(
  "/movies-themes",
  verifyToken,
  moviesThemesControllers.addMovieTheme,
);
router.put(
  "/movies-themes/:id",
  verifyToken,
  moviesThemesControllers.editMovieTheme,
);
router.delete(
  "/movies-themes/:id",
  verifyToken,
  moviesThemesControllers.destroyMovieTheme,
);

// SERIES THEMES //
router.post(
  "/series-themes",
  verifyToken,
  seriesThemesControllers.addSerieTheme,
);
router.put(
  "/series-themes/:id",
  verifyToken,
  seriesThemesControllers.editSerieTheme,
);
router.delete(
  "/series-themes/:id",
  verifyToken,
  seriesThemesControllers.destroySerieTheme,
);

// MOVIES NATIONALITIES //
router.post(
  "/movies-nationalities",
  verifyToken,
  moviesNationalitiesControllers.addMovieNationality,
);
router.put(
  "/movies-nationalities/:id",
  verifyToken,
  moviesNationalitiesControllers.editMovieNationality,
);
router.delete(
  "/movies-nationalities/:id",
  verifyToken,
  moviesNationalitiesControllers.destroyMovieNationality,
);

// SERIES NATIONALITIES //
router.post(
  "/series-nationalities",
  verifyToken,
  seriesNationalitiesControllers.addSerieNationality,
);
router.put(
  "/series-nationalities/:id",
  verifyToken,
  seriesNationalitiesControllers.editSerieNationality,
);
router.delete(
  "/series-nationalities/:id",
  verifyToken,
  seriesNationalitiesControllers.destroySerieNationality,
);

// UNIVERSES //
const uploadUniverses = require("./Middlewares/Multer/MulterUniverses");

router.post("/universes", verifyToken, uploadUniverses.single("imageUniverse"), universesControllers.addUniverse);
router.put("/universes/:id", verifyToken, uploadUniverses.single("imageUniverse"), universesControllers.editUniverse);
router.delete(
  "/universes/:id",
  verifyToken,
  universesControllers.destroyUniverse,
);

// SUB-UNIVERSES //
const uploadSubUniverses = require("./Middlewares/Multer/MulterSubUniverses");
router.post("/sub-universes", verifyToken, uploadSubUniverses.single("imageSubUniverse"), subUniversesControllers.addSubUniverse);
router.put("/sub-universes/:id", verifyToken, uploadSubUniverses.single("imageSubUniverse"), subUniversesControllers.editSubUniverse);
router.delete("/sub-universes/:id", verifyToken, subUniversesControllers.destroySubUniverse);

// THEMES //
router.post("/themes", verifyToken, themesControllers.addTheme);
router.put("/themes/:id", verifyToken, themesControllers.editTheme);
router.delete("/themes/:id", verifyToken, themesControllers.destroyTheme);

// STREAMINGS //
router.post(
  "/streamings",
  verifyToken,
  uploadStreamings.fields([
    { name: "imageStreaming", maxCount: 1 },
    { name: "iconStreaming", maxCount: 1 },
  ]),
  streamingsControllers.addStreaming,
);
router.put(
  "/streamings/:id",
  verifyToken,
  uploadStreamings.fields([
    { name: "imageStreaming", maxCount: 1 },
    { name: "iconStreaming", maxCount: 1 },
  ]),
  streamingsControllers.editStreaming,
);
router.delete(
  "/streamings/:id",
  verifyToken,
  streamingsControllers.destroyStreaming,
);

// MOVIES STREAMINGS //
router.post(
  "/movies-streamings",
  verifyToken,
  moviesStreamingsControllers.addMovieStreaming,
);
router.put(
  "/movies-streamings/:id",
  verifyToken,
  moviesStreamingsControllers.editMovieStreaming,
);
router.delete(
  "/movies-streamings/:id",
  verifyToken,
  moviesStreamingsControllers.destroyMovieStreaming,
);

// MOVIES UNIVERSES & SUB-UNIVERSES //
router.post(
  "/movies-universes",
  verifyToken,
  moviesUniversesControllers.addMovieUniverse,
);
router.put(
  "/movies-universes/:id",
  verifyToken,
  moviesUniversesControllers.editMovieUniverse,
);
router.delete(
  "/movies-universes/:id",
  verifyToken,
  moviesUniversesControllers.destroyMovieUniverse,
);

router.post(
  "/movies-subuniverses",
  verifyToken,
  moviesSubUniversesControllers.addMovieSubUniverse,
);
router.put(
  "/movies-subuniverses/:id",
  verifyToken,
  moviesSubUniversesControllers.editMovieSubUniverse,
);
router.delete(
  "/movies-subuniverses/:id",
  verifyToken,
  moviesSubUniversesControllers.destroyMovieSubUniverse,
);

// SERIES UNIVERSES & SUB-UNIVERSES //
router.post(
  "/series-universes",
  verifyToken,
  seriesUniversesControllers.addSerieUniverse,
);
router.put(
  "/series-universes/:id",
  verifyToken,
  seriesUniversesControllers.editSerieUniverse,
);
router.delete(
  "/series-universes/:id",
  verifyToken,
  seriesUniversesControllers.destroySerieUniverse,
);

router.post(
  "/series-subuniverses",
  verifyToken,
  seriesSubUniversesControllers.addSerieSubUniverse,
);
router.put(
  "/series-subuniverses/:id",
  verifyToken,
  seriesSubUniversesControllers.editSerieSubUniverse,
);
router.delete(
  "/series-subuniverses/:id",
  verifyToken,
  seriesSubUniversesControllers.destroySerieSubUniverse,
);

// NATIONALITIES //
const uploadNationalities = require("./Middlewares/Multer/MulterNationalities");

router.post(
  "/nationalities",
  verifyToken,
  uploadNationalities.single("imageNationality"),
  nationalitiesControllers.addNationality,
);
router.put(
  "/nationalities/:id",
  verifyToken,
  uploadNationalities.single("imageNationality"),
  nationalitiesControllers.editNationality,
);
router.delete(
  "/nationalities/:id",
  verifyToken,
  nationalitiesControllers.destroyNationality,
);

// PERSONALITIES //
router.post(
  "/personalities",
  verifyToken,
  uploadPersonalities.single("picture"),
  personalitiesControllers.addPersonality,
);
router.put(
  "/personalities/:id",
  verifyToken,
  uploadPersonalities.single("picture"),
  personalitiesControllers.editPersonality,
);
router.delete(
  "/personalities/:id",
  verifyToken,
  personalitiesControllers.destroyPersonality,
);

// CASTING //
router.post("/castings", verifyToken, castingControllers.addCasting);
router.put("/castings/:id", verifyToken, castingControllers.editCasting);
router.delete("/castings/:id", verifyToken, castingControllers.destroyCasting);

// USERS FAVORITES / INTERACTIONS //
const usersFavoritesControllers = require("./controllers/usersControllers/usersFavoritesControllers");

router.get(
  "/users/:userId/favorites/movies",
  verifyToken,
  usersFavoritesControllers.readFavoriteMovies,
);
router.post(
  "/users/:userId/favorites/movie/add",
  verifyToken,
  usersFavoritesControllers.addingFavoriteMovie,
);
router.delete(
  "/users/:userId/favorites/movie/remove",
  verifyToken,
  usersFavoritesControllers.removingFavoriteMovie,
);

// USER FAVORITES SERIES //
router.get(
  "/users/:userId/favorites/series",
  verifyToken,
  usersFavoritesControllers.readFavoriteSeries,
);
router.post(
  "/users/:userId/favorites/serie/add",
  verifyToken,
  usersFavoritesControllers.addingFavoriteSerie,
);
router.delete(
  "/users/:userId/favorites/serie/remove",
  verifyToken,
  usersFavoritesControllers.removingFavoriteSerie,
);

// USER FAVORITES PERSONALITIES //
router.get(
  "/users/:userId/favorites/personalities",
  verifyToken,
  usersFavoritesControllers.readFavoritePersonalities,
);
router.post(
  "/users/:userId/favorites/personality/add",
  verifyToken,
  usersFavoritesControllers.addingFavoritePersonality,
);
router.delete(
  "/users/:userId/favorites/personality/remove",
  verifyToken,
  usersFavoritesControllers.removingFavoritePersonality,
);

// USER MOVIES REVIEWS //
const usersReviewsControllers = require("./controllers/usersControllers/usersReviewsControllers");

router.get(
  "/reviews/users/:userId",
  verifyToken,
  usersReviewsControllers.readUserRatingsReviews,
);
router.get(
  "/reviews/movies/:movieId",
  usersReviewsControllers.browseMovieReviews,
);
router.get(
  "/reviews/users/:userId/movies",
  verifyToken,
  usersReviewsControllers.readUserMoviesReviews,
);
router.post(
  "/reviews/users/:userId/movies/:movieId",
  verifyToken,
  usersReviewsControllers.addMovieReview,
);
router.put(
  "/reviews/users/:userId/movies/:movieId",
  verifyToken,
  usersReviewsControllers.editMovieReview,
);

// USER SERIES REVIEWS //
router.get(
  "/reviews/series/:serieId",
  usersReviewsControllers.browseSerieReviews,
);
router.get(
  "/reviews/users/:userId/series",
  verifyToken,
  usersReviewsControllers.readUserSeriesReviews,
);
router.post(
  "/reviews/users/:userId/series/:serieId",
  verifyToken,
  usersReviewsControllers.addSerieReview,
);
router.put(
  "/reviews/users/:userId/series/:serieId",
  verifyToken,
  usersReviewsControllers.editSerieReview,
);

// USER PERSONALITIES REVIEWS //
router.get(
  "/reviews/personalities/:personalityId",
  usersReviewsControllers.browsePersonalityReviews,
);
router.get(
  "/reviews/users/:userId/personalities",
  verifyToken,
  usersReviewsControllers.readUserPersonalitiesReviews,
);
router.post(
  "/reviews/users/:userId/personalities/:personalityId",
  verifyToken,
  usersReviewsControllers.addPersonalityReview,
);
router.put(
  "/reviews/users/:userId/personalities/:personalityId",
  verifyToken,
  usersReviewsControllers.editPersonalityReview,
);

// USERS //
router.put(
  "/users/:id",
  verifyToken,
  uploadUsers.single("avatar"),
  updateHashPassword,
  usersControllers.editUser,
);
router.delete("/users/:id", verifyToken, usersControllers.deleteUser);

module.exports = router;
