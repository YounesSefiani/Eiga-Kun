const tables = require("../../tables");

// MOVIES //
// R - BREAD - READ FAVORITES MOVIES //
const readFavoriteMovies = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    const favoriteMovies = await tables.userFavorites.getUserFavoritesMovies(
      userId
    );
    res.json(favoriteMovies);
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD FAVORITE MOVIE //
const addingFavoriteMovie = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoriteMovie = req.body;
  try {
    const result = await tables.userFavorites.addFavoriteMovie(favoriteMovie);

    if (result.alreadyExists) {
      return res.status(409).json({
        error: result.message,
        id: result.id,
      });
    }

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      ...favoriteMovie,
      message: "Film ajouté avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE FAVORITE MOVIE //
const removingFavoriteMovie = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoriteMovie = req.body;
  try {
    const result = await tables.userFavorites.removeFavoriteMovie(
      favoriteMovie
    );
    if (!result) {
      return res.status(404).json({ error: "Favorite movie not found" });
    }
    res.status(200).json({ message: "Film supprimé avec succès" });
  } catch (error) {
    next(error);
  }
};

// SERIES //
// R - BREAD - READ FAVORITES SERIE //
const readFavoriteSeries = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    const favoriteSeries = await tables.userFavorites.getUserFavoritesSeries(
      userId
    );
    res.json(favoriteSeries);
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD FAVORITE SERIE //
const addingFavoriteSerie = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoriteSerie = req.body;
  try {
    const result = await tables.userFavorites.addFavoriteSerie(favoriteSerie);

    if (result.alreadyExists) {
      return res.status(409).json({
        error: result.message,
        id: result.id,
      });
    }

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      ...favoriteSerie,
      message: "Série ajoutée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE FAVORITE SERIE //
const removingFavoriteSerie = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoriteSerie = req.body;
  try {
    const result = await tables.userFavorites.removeFavoriteSerie(
      favoriteSerie
    );
    if (!result) {
      return res.status(404).json({ error: "Favorite serie not found" });
    }
    res.status(200).json({ message: "Série supprimée avec succès" });
  } catch (error) {
    next(error);
  }
};


// PERSONALITIES //
// R - BREAD - READ FAVORITES PERSONALITIES //
const readFavoritePersonalities = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  try {
    const favoritePersonalities =
      await tables.userFavorites.getUserFavoritesPersonalities(userId);
    res.json(favoritePersonalities);
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD FAVORITE PERSONALITY //
const addingFavoritePersonality = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoritePersonality = req.body;
  try {
    const result = await tables.userFavorites.addFavoritePersonality(
      favoritePersonality
    );

    if (result.alreadyExists) {
      return res.status(409).json({
        error: result.message,
        id: result.id,
      });
    }

    res.status(201).json({
      id: result.insertId,
      user_id: userId,
      ...favoritePersonality,
      message: "Personnalité ajoutée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE FAVORITE PERSONALITY //
const removingFavoritePersonality = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await tables.users.readUserId(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const favoritePersonality = req.body;
  try {
    const result = await tables.userFavorites.removeFavoritePersonality(
      favoritePersonality
    );
    if (!result) {
      return res.status(404).json({ error: "Favorite personality not found" });
    }
    res.status(200).json({ message: "Personnalité supprimée avec succès" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  readFavoriteMovies,
  addingFavoriteMovie,
  removingFavoriteMovie,
  readFavoriteSeries,
  addingFavoriteSerie,
  removingFavoriteSerie,
  readFavoritePersonalities,
  addingFavoritePersonality,
  removingFavoritePersonality,
};
