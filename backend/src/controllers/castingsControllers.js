const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browseCastings = async (req, res) => {
try {
    const castings = await tables.castings.readCastings();
    res.status(200).json(castings);
} catch (error) {
    res.status(500).json({ error: error.message});
}
};

// R - BREAD - READ
const readCasting = async (req, res) => {
    const casting = await tables.castings.readCastingById(req.params.id);
    if (!casting) {
        return res.status(404).json({ error: "Casting not found" });
    } else {
        res.status(200).json(casting);
    }
};

// E - BREAD - EDIT

const editCasting = async (req, res) => {
    try {
        const { id } = req.params;
        const updateCasting = req.body;
        
        const updatedCastingDatas = {
            id,
            personality_id: updateCasting.personality_id,
            movie_id: updateCasting.movie_id,
            serie_id: updateCasting.serie_id,
            side: updateCasting.side,
            role: updateCasting.role,
            presence_serie: updateCasting.presence_serie
        }
        const updatedCasting = await tables.castings.updateCasting(id, updatedCastingDatas);
        res.status(200).json(updatedCasting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// A - BREAD - ADD
const addCasting = async (req, res, next) => {
    const casting = req.body;

    const castingDatas = {
        ...casting,
    };
    try {
        const createdCasting = await tables.castings.createCasting(castingDatas);
        res.status(201).json({ message: "Casting ajouté avec succès.", id: createdCasting, castingDatas});
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
        console.error(error);
    }
};

// D - BREAD - DELETE
const deleteCasting = async (req, res, next) => {
   const { id } = req.params;
   try {
    await tables.castings.deleteCasting(id);
    res.status(200).json({ message: "Casting supprimé avec succès." });
   } catch (error) {
       res.status(500).json({ error: error.message });
       next(error);
       console.error(error);
   }
};

module.exports = {
    browseCastings,
    readCasting,
    editCasting,
    addCasting,
    deleteCasting
};