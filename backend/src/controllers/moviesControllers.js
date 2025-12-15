const tables = require("../tables");

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

// E - BREAD - EDIT
const editMovie = async (req, res, next) => {
    const updateMovie = req.body;
    const { id } = req.params;
    try {
        await tables.movies.updateMovie(id, updateMovie);
        res.status(200).json({ ...updateMovie, id: parseInt(id, 10) });
    } catch (error) {
        next(error);
    }
}

// A - BREAD - ADD
const addMovie = async (req, res, next) => {
    const movie = req.body;
    try {
        const createdMovie =  await tables.movies.createMovie(movie);
        res.status(201).json({ ...movie, id: createdMovie.insertId });
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
    addMovie,
    editMovie,
    destroyMovie,
};