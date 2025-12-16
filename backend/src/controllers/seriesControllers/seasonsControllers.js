const tables = require("../../tables");

// B - BREAD - BROWSE (READ ALL SEASONS)
const browseSeasons = async (req, res, next) => {
    try {
        const seasons = await tables.seasons.readSeasons();
        res.json(seasons);
    } catch (error) {
        next(error);
    }
};

// R - BREAD - READ (READ ONE SEASON)

const readSeason = async (req, res, next) => {
    const season = await tables.seasons.readSeasonId(req.params.id);
    if (!season) {
        return res.status(404).json({ error: "Season not found" });
    } else {
    res.json(season);
    }
}

// E - BREAD - EDIT (UPDATE SEASON)
const editSeason = async (req, res, next) => {
    const updateSeason = req.body;
    const { id } = req.params;
    try {
        const result = await tables.seasons.updateSeason(id, updateSeason);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json({ ...updateSeason, id: parseInt(id, 10), message: result.message });
    } catch (error) {
        next(error);
    }
}

// A - BREAD - ADD (CREATE SEASON)
const addSeason = async (req, res, next) => {
    const season = req.body;
    try {
        const createdSeason = await tables.seasons.createSeason(season);
        if (!createdSeason.success) {
            return res.status(400).json(createdSeason);
        }
        res.status(201).json({ ...season, id: createdSeason.id });
    } catch (error) {
        next(error);
    }
}

// D - BREAD - DELETE (DELETE SEASON)
const destroySeason = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.seasons.deleteSeason(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    browseSeasons,
    readSeason,
    addSeason,
    editSeason,
    destroySeason,
};