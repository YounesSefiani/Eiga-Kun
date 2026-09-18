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

// R - BREAD - READ (READ ONE)
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

// A - BREAD - ADD
const addSubUniverse = async (req, res, next) => {
  const subUniverse = req.body;
  const { file } = req;

  const subUniverseDatas = {
    ...subUniverse,
    imageSubUniverse: file ? file.filename : subUniverse.imageSubUniverse || null,
  };
  try {
    const createSubUniverse = await tables.subUniverses.createSubUniverse(
      subUniverseDatas
    );
    res.status(201).json({ id: createSubUniverse.insertId, subUniverseDatas });
  } catch (error) {
    next(error);
  }
};


const editSubUniverse = async (req, res, next) => {
   try {
      const { id } = req.params;
      const updateSubUniverse = req.body;
      const { file } = req;
  
      const subUniverse = await tables.subUniverses.readSubUniverseId(id);
  
      const updatedSubUniverseDatas = {
        id,
        universe_id:
          updateSubUniverse.universe_id ?? subUniverse.universe_id ?? null,
        name: updateSubUniverse.name || subUniverse.name || null,
        imageSubUniverse: file
          ? file.filename
          : updateSubUniverse.imageSubUniverse || subUniverse.imageSubUniverse || null,
        subUniverse_description:
          updateSubUniverse.subUniverse_description ||
          subUniverse.subUniverse_description ||
          null,
      };
  
      await tables.subUniverses.updateSubUniverse(id, updatedSubUniverseDatas);
  
      const updatedSubUniverse = await tables.subUniverses.readSubUniverseId(id);
  
      if (!updatedSubUniverse) {
        return res
          .status(404)
          .json({ message: "Sous-univers non trouvé ou mise à jour échouée." });
      }
  
      return res.status(200).json({
        message: "Sous-univers mise à jour avec succès",
        updateSubUniverse: updatedSubUniverse,
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour du sous-univers :", err);
      next(err);
      return res.status(500).json({ message: "Erreur interne du serveur" });
    }
};


// D - BREAD - DESTROY
const destroySubUniverse = async (req, res) => {
    const subUniverseId = req.params.id;
    try {
        const deletedSubUniverse = await tables.subUniverses.deleteSubUniverse(subUniverseId);
        res.status(200).json(deletedSubUniverse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { browseSubUniverses, readOneSubUniverse, readAllSubUniverseInUniverse, addSubUniverse, editSubUniverse, destroySubUniverse };