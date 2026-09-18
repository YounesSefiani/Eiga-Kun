const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseGenres = async (req, res) => {
    try {
        const genres = await tables.genres.readGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneGenre = async (req, res) => {
    const genre = await tables.genres.readGenreId(req.params.id);
    if (!genre) {
        return res.status(404).json({ error: "Genre not found" });
    } else {
        res.json(genre);
    }
};

const readOneMoviesGenre = async (req, res, next) => {
    try {
        const genreId = req.params.id;
        const movies = await tables.genres.readOneGenreMovies(genreId);
        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "No movies found for this genre" });
        }
        
        // Enrichir chaque film avec genres, thèmes, univers, etc.
        const enrichedMovies = await Promise.all(
            movies.map(async (movie) => {
                const genres = await tables.genres.readGenresInMovie(movie.id);
                movie.genres = genres || [];
                
                const themes = await tables.themes.readThemesInMovie(movie.id);
                movie.themes = themes || [];

                const nationalities = await tables.nationalities.readNationalitiesInMovie(movie.id);
                movie.nationalities = nationalities || [];
                
                const universes = await tables.universes.readUniversesInMovie(movie.id);
                movie.universes = universes || [];

                const subUniverses = await tables.subUniverses.readSubUniversesInMovie(movie.id);
                movie.subUniverses = subUniverses || [];
                
                // Supprimer les champs ID bruts
                delete movie.genre;
                delete movie.theme;
                delete movie.nationality;
                delete movie.universe;
                delete movie.subUniverse;
                
                return movie;
            })
        );
        
        res.status(200).json(enrichedMovies);
    } catch (error) {
        next(error);
    }
}

const readOneSeriesGenre = async (req, res, next) => {
    try {
        const genreId = req.params.id;
        const series = await tables.genres.readOneGenreSeries(genreId);
        if (!series || series.length === 0) {
            return res.status(404).json({ error: "No series found for this genre" });
        }
        
        // Enrichir chaque film avec genres, thèmes, univers, etc.
        const enrichedSeries = await Promise.all(
            series.map(async (serie) => {
                const genres = await tables.genres.readGenresInSerie(serie.id);
                serie.genres = genres || [];
                
                const themes = await tables.themes.readThemesInSerie(serie.id);
                serie.themes = themes || [];
                
                const universes = await tables.universes.readUniversesInSerie(serie.id);
                serie.universes = universes || [];

                const subUniverses = await tables.subUniverses.readSubUniversesInSerie(serie.id);
                serie.subUniverses = subUniverses || [];
                
                // Supprimer les champs ID bruts
                delete serie.genre;
                delete serie.theme;
                delete serie.universe;
                delete serie.subUniverse;
                
                return serie;
            })
        );
        
        res.status(200).json(enrichedSeries);
    } catch (error) {
        next(error);
    }
}

// E - BREAD - EDIT
const editGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateGenre = req.body;
    const { file } = req;

    const genre = await tables.genres.readGenreId(id);

    const updatedGenreDatas = {
      id,
      name: updateGenre.name || genre.name || null,
      imageGenre: file
        ? file.filename
        : updateGenre.imageGenre || genre.imageGenre || null,
    };

    await tables.genres.updateGenre(id, updatedGenreDatas);

    const updatedGenre = await tables.genres.readGenreId(id);

    if (!updatedGenre) {
      return res
        .status(404)
        .json({ message: "Genre non trouvé ou mise à jour échouée." });
    }

    return res.status(200).json({
      message: "Genre mise à jour avec succès",
      updateGenre: updatedGenre,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour du genre :", err);
    next(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// A - BREAD - ADD
const addGenre = async (req, res, next) => {
  const genre = req.body;
  const { file } = req;

  const genreDatas = {
    ...genre,
    imageGenre: file ? file.filename : genre.imageGenre || null,
  };
  try {
    const createGenre = await tables.genres.createGenre(
      genreDatas
    );
    res.status(201).json({ id: createGenre.insertId, genreDatas });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DESTROY
const destroyGenre = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.genres.deleteGenre(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};



module.exports = {
    browseGenres,
    readOneGenre,
    readOneMoviesGenre,
    readOneSeriesGenre,
    editGenre,
    addGenre,
    destroyGenre
};