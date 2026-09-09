const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseSubUniverses = async (req, res) => {
    try {
        const subUniverses = await tables.subUniverses.readSubUniverses();
        res.status(200).json(subUniverses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readOneSubUniverse = async (req, res) => {
    const subUniverse = await tables.subUniverses.readSubUniverseId(req.params.id);
    if (!subUniverse) {
        return res.status(404).json({ error: "SubUniverse not found" });
    } else {
        res.json(subUniverse);
    }
};

const readAllSubUniverseInUniverse = async (req, res) => {
    const universeId = req.params.id;
    try {
        const subUniverses = await tables.subUniverses.readSubUniversesInUniverse(universeId);
        res.status(200).json(subUniverses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSubUniverse = async (req, res) => {
    const subUniverseId = req.params.id;
    const subUniverse = req.body;
    try {
        const updatedSubUniverse = await tables.subUniverses.updateSubUniverse(subUniverseId, subUniverse);
        res.status(200).json(updatedSubUniverse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSubUniverse = async (req, res) => {
    const subUniverseId = req.params.id;
    try {
        const deletedSubUniverse = await tables.subUniverses.deleteSubUniverse(subUniverseId);
        res.status(200).json(deletedSubUniverse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { browseSubUniverses, readOneSubUniverse, readAllSubUniverseInUniverse, updateSubUniverse, deleteSubUniverse };