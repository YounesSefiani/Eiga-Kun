const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseMoviesStreamings = async (req, res) => {
    try {
        const moviesStreaming = await tables.movies_streamings.readMoviesStreamings();
        res.status(200).json(moviesStreaming);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneMovieStreaming = async (req, res) => {
    const movieStreaming = await tables.movies_streamings.readMovieStreamingId(req.params.id);
    if (!movieStreaming) {
        return res.status(404).json({ error: "MovieStreaming not found" });
    } else {
        res.json(movieStreaming);
    }
};

const browseMovieByStreamings = async (req, res) => {
    try {
        const movie = await tables.movies.readMovieId(req.params.id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const streamings = await tables.movies_streamings.readMovieByStreamings(req.params.id);
        res.status(200).json({
            movieTitle: movie.title,
            streamings,
            message: streamings.length === 0
                ? "Ce film n'est disponible sur aucune plateforme."
                : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

// E - BREAD - EDIT
const editMovieStreaming = async (req, res) => {
    const updateMovieStreaming = req.body;
    const { id } = req.params;
    try {
        await tables.movies_streamings.updateMovieStreaming(id, updateMovieStreaming);
        res.status(200).json({ ...updateMovieStreaming, id: parseInt(id, 10) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// A - BREAD - ADD
const addMovieStreaming = async (req, res) => {
    const newMovieStreaming = req.body;
    try {
        const movieStreaming = await tables.movies_streamings.createMovieStreaming(newMovieStreaming);
        res.status(201).json({ ...movieStreaming, id: movieStreaming.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// D - BREAD - DELETE
const destroyMovieStreaming = async (req, res) => {
    const { id } = req.params;
    try {
        await tables.movies_streamings.deleteMovieStreaming(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    browseMoviesStreamings,
    readOneMovieStreaming,
    browseMovieByStreamings,
    editMovieStreaming,
    addMovieStreaming,
    destroyMovieStreaming,
};