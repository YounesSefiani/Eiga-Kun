const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseNationalities = async (req, res) => {
    try {
        const nationalities = await tables.nationalities.readNationalities();
        res.status(200).json(nationalities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneNationality = async (req, res) => {
    const nationality = await tables.nationalities.readNationalityId(req.params.id);
    if (!nationality) {
        return res.status(404).json({ error: "Nationality not found" });
    } else {
        res.json(nationality);
    }
};

const readOneNationalityInMovie = async (req, res, next) => {
    try {
        const nationalityId = req.params.id;
        const movies = await tables.nationalities.readOneNationalityMovies(nationalityId);
        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "No movies found for this nationality" });
        }
        
        const enrichedMovies = await Promise.all(
            movies.map(async (movie) => {
                const nationalities = await tables.nationalities.readNationalitiesInMovie(movie.id);
                movie.nationalities = nationalities || [];

                const genres = await tables.genres.readGenresInMovie(movie.id);
                movie.genres = genres || [];
                
                const themes = await tables.themes.readThemesInMovie(movie.id);
                movie.themes = themes || [];
                
                const universes = await tables.universes.readUniversesInMovie(movie.id);
                movie.universes = universes || [];
                
                const subUniverses = await tables.subUniverses.readSubUniversesInMovie(movie.id);
                movie.subUniverses = subUniverses || [];
                
                // Supprimer les champs ID bruts
                delete movie.nationality;
                delete movie.genre;
                delete movie.theme;
                delete movie.universe;
                delete movie.subUniverse;
                
                return movie;
            })
        );
        
        res.status(200).json(enrichedMovies);
    } catch (error) {
        next(
            res.status(500).json({ error: error.message })
        )
    }
}

const readOneNationalityInSerie = async (req, res, next) => {
    try {
        const nationalityId = req.params.id;
        const series = await tables.nationalities.readOneNationalitySeries(nationalityId);
        if (!series || series.length === 0) {
            return res.status(404).json({ error: "No series found for this nationality" });
        }
        
        const enrichedSeries = await Promise.all(
            series.map(async (serie) => {
                const nationalities = await tables.nationalities.readNationalitiesInSerie(serie.id);
                serie.nationalities = nationalities || [];

                const genres = await tables.genres.readGenresInSerie(serie.id);
                serie.genres = genres || [];
                
                const themes = await tables.themes.readThemesInSerie(serie.id);
                serie.themes = themes || [];
                
                const universes = await tables.universes.readUniversesInSerie(serie.id);
                serie.universes = universes || [];
                
                const subUniverses = await tables.subUniverses.readSubUniversesInSerie(serie.id);
                serie.subUniverses = subUniverses || [];
                
                // Supprimer les champs ID bruts
                delete serie.nationality;
                delete serie.genre;
                delete serie.theme;
                delete serie.universe;
                delete serie.subUniverse;
                
                return serie;
            })
        );
        
        res.status(200).json(enrichedSeries);
    } catch (error) {
        next(
            res.status(500).json({ error: error.message })
        )
    }
}

// E - BREAD - EDIT
const editNationality = async (req, res) => {
    const updateNationality = req.body;
    const { id } = req.params;
    try {
        await tables.nationalities.updateNationality(id, updateNationality);
        res.status(200).json({ ...updateNationality, id: parseInt(id, 10) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// A - BREAD - ADD
const addNationality = async (req, res) => {
    const nationality = req.body;
    try {
        const result = await tables.nationalities.addNationality(nationality);
        res.status(201).json({ ...nationality, id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// D - BREAD - DELETE
const destroyNationality = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.nationalities.deleteNationality(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    browseNationalities,
    readOneNationality,
    readOneNationalityInMovie,
    readOneNationalityInSerie,
    editNationality,
    addNationality,
    destroyNationality,
};