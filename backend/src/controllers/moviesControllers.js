const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMovies = async (req, res) => {
    try {
        const movies = await tables.movies.readMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneMovie = async (req, res) => {
    const movie = await tables.movies.readMovieId(req.params.id);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    } else {
    res.json(movie);
    }
}

const readFullMovie = async (req, res, next) => {
    try {
        const movieId = req.params.id
        const movie = await tables.movies.readMovieId(movieId);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const casting = await tables.castings.readCastingMovie(movieId);
        movie.casting = casting || [],
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

// E - BREAD - EDIT
const editMovie = async (req, res, next) => {
 try {
    const { id } = req.params;
    const updateMovie = req.body;
    const { files } = req;
    
    const movie = await tables.movies.readMovieId(id);

    if (!movie) {
      return res.status(404).json({ message: 'Film non trouvé.' });
    }

    const updatedMovieDatas = {
        id,
      title: updateMovie.title !== undefined ? updateMovie.title : movie.title,
      release_date: updateMovie.release_date !== undefined ? updateMovie.release_date || null : movie.release_date,
      genre: updateMovie.genre !== undefined ? updateMovie.genre || null : movie.genre,
      theme: updateMovie.theme !== undefined ? updateMovie.theme || null : movie.theme,
      universe: updateMovie.universe !== undefined ? updateMovie.universe || null : movie.universe,
      subUniverse: updateMovie.subUniverse !== undefined ? updateMovie.subUniverse || null : movie.subUniverse,
      synopsis: updateMovie.synopsis !== undefined ? updateMovie.synopsis || null : movie.synopsis,
      poster: files?.poster
        ? files.poster[0].filename
        : updateMovie.poster !== undefined ? updateMovie.poster || null : movie.poster,
      logo: files?.logo 
        ? files.logo[0].filename 
        : updateMovie.logo !== undefined ? updateMovie.logo || null : movie.logo,
      background: files?.background
        ? files.background[0].filename
        : updateMovie.background !== undefined ? updateMovie.background || null : movie.background,
      trailer: updateMovie.trailer !== undefined ? updateMovie.trailer || null : movie.trailer,
      country: updateMovie.country !== undefined ? updateMovie.country || null : movie.country,
      duration: updateMovie.duration !== undefined ? updateMovie.duration || null : movie.duration,
      screen: updateMovie.screen !== undefined ? updateMovie.screen || null : movie.screen,
      streaming: updateMovie.streaming !== undefined ? updateMovie.streaming || null : movie.streaming,
      original: updateMovie.original !== undefined ? updateMovie.original || null : movie.original
    };

    await tables.movies.updateMovie(id, updatedMovieDatas);

    const updatedMovie = await tables.movies.readMovieId(id);

    if (!updatedMovie) {
      return res
        .status(404)
        .json({ message: 'Film non trouvé ou mise à jour échouée.' });
    }

    return res.status(200).json({
      message: 'Film mis à jour avec succès',
      updateMovie: updatedMovie,
    });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du film:', err);
    next(err);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

// A - BREAD - ADD
const addMovie = async (req, res, next) => {
    const movie = req.body;
    const { files } = req;
    
    const movieDatas = {
        ...movie,
        poster: files?.poster ? files.poster[0].filename: movie.poster || null,
        background: files?.background ? files.background[0].filename: movie.background || null,
        logo: files?.logo ? files.logo[0].filename: movie.logo || null,
    }
    try {
        const createdMovie =  await tables.movies.createMovie(movieDatas);
        res.status(201).json({id: createdMovie, movieDatas});
    } catch (error) {
        next(error);
    }
}

// D - BREAD - DELETE
const destroyMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.movies.deleteMovie(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    browseMovies,
    readOneMovie,
    readFullMovie,
    addMovie,
    editMovie,
    destroyMovie,
};