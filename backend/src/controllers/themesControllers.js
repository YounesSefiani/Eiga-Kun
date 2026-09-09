const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseThemes = async (req, res) => {
    try {
        const themes = await tables.themes.readThemes();
        res.status(200).json(themes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readOneTheme = async (req, res) => {
    const theme = await tables.themes.readThemeId(req.params.id);
    if (!theme) {
        return res.status(404).json({ error: "Theme not found" });
    } else {
        res.json(theme);
    }
};

const readOneMoviesTheme = async (req, res, next) => {
    try {
        const themeId = req.params.id;
        const movies = await tables.themes.readOneThemeMovies(themeId);
        if (!movies || movies.length === 0) {
            return res.status(404).json({ error: "No movies found for this theme" });
        }
        
        // Enrichir chaque film avec themes, thèmes, univers, etc.
        const enrichedMovies = await Promise.all(
            movies.map(async (movie) => {
                const genres = await tables.genres.readGenresInMovie(movie.id);
                movie.genres = genres || [];
                
                const themes = await tables.themes.readThemesInMovie(movie.id);
                movie.themes = themes || [];
                
                const universes = await tables.universes.readUniversesInMovie(movie.id);
                movie.universes = universes || [];

                const subUniverses = await tables.subUniverses.readSubUniversesInMovie(movie.id);
                movie.subUniverses = subUniverses || [];
                
                // Supprimer les champs ID bruts
                delete movie.genre;
                delete movie.theme;
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

const readOneSeriesTheme = async (req, res, next) => {
    try {
        const themeId = req.params.id;
        const series = await tables.themes.readOneThemeSeries(themeId);
        if (!series || series.length === 0) {
            return res.status(404).json({ error: "No series found for this theme" });
        }
        
        // Enrichir chaque film avec themes, thèmes, univers, etc.
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
                delete serie.theme;
                delete serie.theme;
                delete serie.universe;
                delete serie.subUniverse;
                delete serie.seasons;
                delete serie.episodes;
                
                return serie;
            })
        );
        
        res.status(200).json(enrichedSeries);
    } catch (error) {
        next(error);
    }

}


module.exports = {
    browseThemes,
    readOneTheme,
    readOneMoviesTheme,
    readOneSeriesTheme
};