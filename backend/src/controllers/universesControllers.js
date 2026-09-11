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

// E - BREAD - EDIT //
const editUniverse = async (req, res, next) => {
    const updateUniverse = req.body;
    const { id } = req.params;
    try {
        await tables.universes.updateUniverse(id, updateUniverse);
        res.status(200).json({ ...updateUniverse, id: parseInt(id, 10) });
    } catch (error) {
        next(error);
    }
};

// A - BREAD - ADD //
const addUniverse = async (req, res, next) => {
    const newUniverse = req.body;
    try {
        const createdUniverse = await tables.universes.createUniverse(newUniverse);
        res.status(201).json({ ...newUniverse, id: createdUniverse.insertId });
    } catch (error) {
        next(error);
    }
};

// D - BREAD - DELETE //
const destroyUniverse = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.universes.deleteUniverse(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};


module.exports = {
    browseUniverses,
    readOneUniverse,
    readAllSubUniverseInUniverse,
    editUniverse,
    addUniverse,
    destroyUniverse
};