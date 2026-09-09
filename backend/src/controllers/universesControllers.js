const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseUniverses = async (req, res) => {
    try {
        const universes = await tables.universes.readUniverses();
        res.status(200).json(universes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneUniverse = async (req, res) => {
    const universe = await tables.universes.readUniverseId(req.params.id);
    if (!universe) {
        return res.status(404).json({ error: "Universe not found" });
    } else {
        res.json(universe);
    }
};

const readAllSubUniverseInUniverse = async (req, res, next) => {
    try {
        const universeId = req.params.id;
        const subUniverses = await tables.universes.readSubUniversesInUniverse(universeId);
        if (!subUniverses || subUniverses.length === 0) {
            return res.status(404).json({ error: "No sub-universes found for this universe" });
        }
        res.status(200).json(subUniverses);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    browseUniverses,
    readOneUniverse,
    readAllSubUniverseInUniverse
};