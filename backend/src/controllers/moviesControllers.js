const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browseMovies = async (req, res) => {
  try {
    const movies = await tables.movies.readMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readMovie = async (req, res) => {
  const movie = await tables.movies.readMovieById(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  } else {
    res.status(200).json(movie);
  }
};

// E - BREAD - EDIT
const editMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateMovie = req.body;
    const { files } = req;

    const movie = await tables.movies.readMovieById(id);

    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé." });
    }

    const updatedMovieDatas = {
      id,
      title: updateMovie.title !== undefined ? updateMovie.title : movie.title,
      original_title:
        updateMovie.original_title !== undefined
          ? updateMovie.original_title
          : movie.original_title,
      poster:
        files?.poster ? files.poster[0].filename : updateMovie.poster !== undefined ? updateMovie.poster : movie.poster,
      original_poster:
        files?.original_poster ? files.original_poster[0].filename : updateMovie.original_poster !== undefined
          ? updateMovie.original_poster
          : movie.original_poster,
      background:
        files?.background ? files.background[0].filename : updateMovie.background !== undefined
          ? updateMovie.background
          : movie.background,
      logo: files?.logo ? files.logo[0].filename : updateMovie.logo !== undefined ? updateMovie.logo : movie.logo,
      original_logo:
        files?.original_logo ? files.original_logo[0].filename : updateMovie.original_logo !== undefined
          ? updateMovie.original_logo
          : movie.original_logo,
      trailer:
        updateMovie.trailer !== undefined ? updateMovie.trailer : movie.trailer,
      synopsis:
        updateMovie.synopsis !== undefined
          ? updateMovie.synopsis
          : movie.synopsis,
      release_date:
        updateMovie.release_date !== undefined
          ? updateMovie.release_date
          : movie.release_date,
      duration:
        updateMovie.duration !== undefined
          ? updateMovie.duration
          : movie.duration,
      SCREEN:
        updateMovie.SCREEN !== undefined ? updateMovie.SCREEN : movie.SCREEN,
    };

    await tables.movies.updateMovie(id, updatedMovieDatas);

    const updatedMovie = await tables.movies.readMovieById(id);
    if (!updatedMovie) {
      return res
        .status(404)
        .json({ message: "Film non trouvé après mise à jour." });
    }
    res.status(200).json({
      message: "Film mis à jour avec succès.",
      updateMovie: updatedMovie,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du film :", err);
    next(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du film." });
  }
};

// A - BREAD - ADD
const addMovie = async (req, res, next) => {
  const movie = req.body;
  const { files } = req;

  const movieDatas = {
    ...movie,
    poster: files?.poster ? files.poster[0].filename : movie.poster || null,
    original_poster: files?.original_poster
      ? files.original_poster[0].filename
      : movie.original_poster || null,
    background: files?.background
      ? files.background[0].filename
      : movie.background || null,
    logo: files?.logo ? files.logo[0].filename : movie.logo || null,
    original_logo: files?.original_logo
      ? files.original_logo[0].filename
      : movie.original_logo || null,
  };
  try {
    const createdMovie = await tables.movies.createMovie(movieDatas);
    res.status(201).json({
      message: "Film ajouté avec succès.",
      id: createdMovie,
      movieDatas,
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout du film :", err);
    next(err);
    res.status(500).json({ error: "Erreur lors de l'ajout du film." });
  }
};

// D - BREAD - DELETE
const destroyMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.movies.deleteMovie(id);
    res.status(200).json({ message: "Film supprimé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression du film :", err);
    next(err);
    res.status(500).json({ error: "Erreur lors de la suppression du film." });
  }
};

module.exports = {
  browseMovies,
  readMovie,
  editMovie,
  addMovie,
  destroyMovie,
};
