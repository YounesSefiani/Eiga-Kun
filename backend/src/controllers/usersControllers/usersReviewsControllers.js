const tables = require("../../tables");

// USER MOVIES REVIEWS //

// B - BROWSE - BROWS ALL MOVIE REVIEWS //
const browseMovieReviews = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await tables.movies.readMovieId(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const movieReviews = await tables.userReviews.readMovieReviews(
      req.params.movieId
    );
    if (!movieReviews || movieReviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this movie" });
    }
    res.json(movieReviews);
  } catch (error) {
    next(error);
  }
};

// R - BREAD - READ USER  MOVIES REVIEWS //
const readUserMoviesReviews = async (req, res, next) => {
  try {
    const readUserMoviesReviews =
      await tables.userReviews.readUserMoviesReviews(
        req.params.userId,
        req.params.id
      );
    if (!readUserMoviesReviews || readUserMoviesReviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }
    res.json(readUserMoviesReviews);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT USER MOVIE REVIEW //
const editMovieReview = async (req, res, next) => {
  try {
    const { review, rating } = req.body;

    // Validation
    if (!review && !rating) {
      return res.status(400).json({
        error: "At least review or rating must be provided.",
      });
    }

    if (rating && (rating < 1 || rating > 10)) {
      return res.status(400).json({
        error: "Rating must be between 1 and 10.",
      });
    }

    // Récupère la review existante
    const existingReview = await tables.userReviews.readByUserAndMovie(
      req.params.userId,
      req.params.movieId
    );

    if (!existingReview) {
      return res.status(404).json({
        error: "Review not found for this user and movie.",
      });
    }

    // Prépare les données à mettre à jour
    const updatedMovieReviewData = {
      id: existingReview.id,
      user_id: existingReview.user_id,
      movie_id: existingReview.movie_id,
      review: review || existingReview.review,
      rating: rating || existingReview.rating,
    };

    // Met à jour la review
    const affectedRows = await tables.userReviews.updateMovieReview(
      updatedMovieReviewData
    );

    if (affectedRows === 0) {
      return res.status(500).json({
        error: "Failed to update review.",
      });
    }

    // Récupère la review mise à jour
    const updatedMovieReview = await tables.userReviews.readByUserAndMovie(
      req.params.userId,
      req.params.movieId
    );

    res.json(updatedMovieReview);
  } catch (err) {
    next(err);
  }
};

const addMovieReview = async (req, res, next) => {
  const { review, rating } = req.body;

  if (!review || !rating) {
    return res.status(400).json({ error: "Review and rating are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: "Rating must be between 1 and 10" });
  }

  try {
    const movieReviewExists = await tables.userReviews.readByUserAndMovie(
      req.params.userId,
      req.params.movieId
    );

    if (movieReviewExists) {
      return res.status(409).json({
        error:
          "Vous avez déjà fait une review pour ce film. Si vous souhaitez, vous pouvez la modifier.",
      });
    }

    const userMovieReviewDatas = {
      user_id: req.params.userId,
      movie_id: req.params.movieId,
      rating,
      review,
    };

    const insertMovieReviewId = await tables.userReviews.createMovieReview(
      userMovieReviewDatas
    );

    const newMovieReview = await tables.userReviews.readByUserAndMovie(
      req.params.userId,
      req.params.movieId
    );

    res.status(201).json({
      id: insertMovieReviewId,
      ...newMovieReview,
      message: "Review ajoutée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// USER SERIES REVIEWS //

// B - BROWSE - BROWS ALL SERIE REVIEWS //
const browseSerieReviews = async (req, res, next) => {
  try {
    const serieId = req.params.serieId;
    const serie = await tables.series.readSerieId(serieId);
    if (!serie) {
      return res.status(404).json({ error: "Serie not found" });
    }
    const serieReviews = await tables.userReviews.readSerieReviews(
      req.params.serieId
    );
    if (!serieReviews || serieReviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this serie" });
    }
    res.json(serieReviews);
  } catch (error) {
    next(error);
  }
};

// R - BREAD - READ USER SERIES REVIEWS //
const readUserSeriesReviews = async (req, res, next) => {
  try {
    const readUserSeriesReviews =
      await tables.userReviews.readUserSeriesReviews(
        req.params.userId,
        req.params.id
      );
    if (!readUserSeriesReviews || readUserSeriesReviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }
    res.json(readUserSeriesReviews);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT USER SERIE REVIEW //
const editSerieReview = async (req, res, next) => {
  try {
    const { review, rating } = req.body;

    // Validation
    if (!review && !rating) {
      return res.status(400).json({
        error: "At least review or rating must be provided.",
      });
    }

    if (rating && (rating < 1 || rating > 10)) {
      return res.status(400).json({
        error: "Rating must be between 1 and 10.",
      });
    }

    // Récupère la review existante
    const existingReview = await tables.userReviews.readByUserAndSerie(
      req.params.userId,
      req.params.serieId
    );

    if (!existingReview) {
      return res.status(404).json({
        error: "Review not found for this user and serie.",
      });
    }

    // Prépare les données à mettre à jour
    const updatedSerieReviewData = {
      id: existingReview.id,
      user_id: existingReview.user_id,
      serie_id: existingReview.serie_id,
      review: review || existingReview.review,
      rating: rating || existingReview.rating,
    };

    // Met à jour la review
    const affectedRows = await tables.userReviews.updateSerieReview(
      updatedSerieReviewData
    );

    if (affectedRows === 0) {
      return res.status(500).json({
        error: "Failed to update review.",
      });
    }

    // Récupère la review mise à jour
    const updatedSerieReview = await tables.userReviews.readByUserAndSerie(
      req.params.userId,
      req.params.serieId
    );

    res.json(updatedSerieReview);
  } catch (err) {
    next(err);
  }
};

const addSerieReview = async (req, res, next) => {
  const { review, rating } = req.body;

  if (!review || !rating) {
    return res.status(400).json({ error: "Review and rating are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: "Rating must be between 1 and 10" });
  }

  try {
    const serieReviewExists = await tables.userReviews.readByUserAndSerie(
      req.params.userId,
      req.params.serieId
    );

    if (serieReviewExists) {
      return res.status(409).json({
        error:
          "Vous avez déjà fait une review pour cette série. Si vous souhaitez, vous pouvez la modifier.",
      });
    }

    const userSerieReviewDatas = {
      user_id: req.params.userId,
      serie_id: req.params.serieId,
      rating,
      review,
    };

    const insertSerieReviewId = await tables.userReviews.createSerieReview(
      userSerieReviewDatas
    );

    const newSerieReview = await tables.userReviews.readByUserAndSerie(
      req.params.userId,
      req.params.serieId
    );

    res.status(201).json({
      id: insertSerieReviewId,
      ...newSerieReview,
      message: "Review ajoutée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// USER PERSONALITIES REVIEWS //

// B - BROWSE - BROWSE ALL PERSONALITY REVIEWS //
const browsePersonalityReviews = async (req, res, next) => {
  try {
    const personalityId = req.params.personalityId;
    const personality = await tables.personalities.readPersonalityId(
      personalityId
    );
    if (!personality) {
      return res.status(404).json({ error: "Personality not found" });
    }
    const personalityReviews = await tables.userReviews.readPersonalityReviews(
      req.params.personalityId
    );
    if (!personalityReviews || personalityReviews.length === 0) {
      return res
        .status(404)
        .json({ error: "No reviews found for this personality" });
    }
    res.json(personalityReviews);
  } catch (error) {
    next(error);
  }
};

// R - BREAD - READ USER PERSONALITIES REVIEWS //
const readUserPersonalitiesReviews = async (req, res, next) => {
  try {
    const readUserPersonalitiesReviews =
      await tables.userReviews.readUserPersonalitiesReviews(
        req.params.userId,
        req.params.id
      );
    if (
      !readUserPersonalitiesReviews ||
      readUserPersonalitiesReviews.length === 0
    ) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }
    res.json(readUserPersonalitiesReviews);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT USER SERIE REVIEW //
const editPersonalityReview = async (req, res, next) => {
  try {
    const { review, rating } = req.body;

    // Validation
    if (!review && !rating) {
      return res.status(400).json({
        error: "At least review or rating must be provided.",
      });
    }

    if (rating && (rating < 1 || rating > 10)) {
      return res.status(400).json({
        error: "Rating must be between 1 and 10.",
      });
    }

    // Récupère la review existante
    const existingReview = await tables.userReviews.readByUserAndPersonality(
      req.params.userId,
      req.params.personalityId
    );

    if (!existingReview) {
      return res.status(404).json({
        error: "Review not found for this user and personality.",
      });
    }

    // Prépare les données à mettre à jour
    const updatedPersonalityReviewData = {
      id: existingReview.id,
      user_id: existingReview.user_id,
      personality_id: existingReview.personality_id,
      review: review || existingReview.review,
      rating: rating || existingReview.rating,
    };

    // Met à jour la review
    const affectedRows = await tables.userReviews.updatePersonalityReview(
      updatedPersonalityReviewData
    );

    if (affectedRows === 0) {
      return res.status(500).json({
        error: "Failed to update review.",
      });
    }

    // Récupère la review mise à jour
    const updatedPersonalityReview =
      await tables.userReviews.readByUserAndPersonality(
        req.params.userId,
        req.params.personalityId
      );

    res.json(updatedPersonalityReview);
  } catch (err) {
    next(err);
  }
};

const addPersonalityReview = async (req, res, next) => {
  const { review, rating } = req.body;

  if (!review || !rating) {
    return res.status(400).json({ error: "Review and rating are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: "Rating must be between 1 and 10" });
  }

  try {
    const personalityReviewExists =
      await tables.userReviews.readByUserAndPersonality(
        req.params.userId,
        req.params.personalityId
      );

    if (personalityReviewExists) {
      return res.status(409).json({
        error:
          "Vous avez déjà fait une review pour cette personnalité. Si vous souhaitez, vous pouvez la modifier.",
      });
    }

    const userPersonalityReviewDatas = {
      user_id: req.params.userId,
      personality_id: req.params.personalityId,
      rating,
      review,
    };

    const insertPersonalityReviewId =
      await tables.userReviews.createPersonalityReview(
        userPersonalityReviewDatas
      );

    const newPersonalityReview =
      await tables.userReviews.readByUserAndPersonality(
        req.params.userId,
        req.params.personalityId
      );

    res.status(201).json({
      id: insertPersonalityReviewId,
      ...newPersonalityReview,
      message: "Review ajoutée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseMovieReviews,
  readUserMoviesReviews,
  editMovieReview,
  addMovieReview,

  browseSerieReviews,
  readUserSeriesReviews,
  editSerieReview,
  addSerieReview,

  browsePersonalityReviews,
  readUserPersonalitiesReviews,
  editPersonalityReview,
  addPersonalityReview,
};
