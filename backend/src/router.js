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

router.get("/users/:userId/favorites/movies", usersFavoritesControllers.readFavoriteMovies);
router.post("/users/:userId/favorites/movie/add", usersFavoritesControllers.addingFavoriteMovie);
router.delete("/users/:userId/favorites/movie/remove", usersFavoritesControllers.removingFavoriteMovie);

// USER FAVORITES SERIES //
router.get("/users/:userId/favorites/series", usersFavoritesControllers.readFavoriteSeries);
router.post("/users/:userId/favorites/serie/add", usersFavoritesControllers.addingFavoriteSerie);
router.delete("/users/:userId/favorites/serie/remove", usersFavoritesControllers.removingFavoriteSerie);

// USER FAVORITES PERSONALITIES //
router.get("/users/:userId/favorites/personalities", usersFavoritesControllers.readFavoritePersonalities);
router.post("/users/:userId/favorites/personality/add", usersFavoritesControllers.addingFavoritePersonality);
router.delete("/users/:userId/favorites/personality/remove", usersFavoritesControllers.removingFavoritePersonality);

module.exports = router;