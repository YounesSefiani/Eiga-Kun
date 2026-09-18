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

// E - BREAD - EDIT
const editUniverse = async (req, res, next) => {
   try {
      const { id } = req.params;
      const updateUniverse = req.body;
      const { file } = req;
  
      const universe = await tables.universes.readUniverseId(id);
  
      const updatedUniverseDatas = {
        id,
        universe_id:
          updateUniverse.universe_id ?? universe.universe_id ?? null,
        name: updateUniverse.name || universe.name || null,
        imageUniverse: file
          ? file.filename
          : updateUniverse.imageUniverse || universe.imageUniverse || null,
        universe_description:
          updateUniverse.universe_description ||
          universe.universe_description ||
          null,
      };
  
      await tables.universes.updateUniverse(id, updatedUniverseDatas);
  
      const updatedUniverse = await tables.universes.readUniverseId(id);
  
      if (!updatedUniverse) {
        return res
          .status(404)
          .json({ message: "Univers non trouvé ou mise à jour échouée." });
      }
  
      return res.status(200).json({
        message: "Univers mise à jour avec succès",
        updateSubUniverse: updatedUniverse,
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'univers :", err);
      next(err);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

// A - BREAD - ADD //
const addUniverse = async (req, res, next) => {
  const universe = req.body;
  const { file } = req;

  const universeDatas = {
    ...universe,
    imageUniverse: file ? file.filename : universe.imageUniverse || null,
  };
  try {
    const createUniverse = await tables.universes.createUniverse(
      universeDatas
    );
    res.status(201).json({ id: createUniverse.insertId, universeDatas });
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