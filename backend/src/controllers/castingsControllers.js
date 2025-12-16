const tables = require("../tables");

// B - BREAD - BROWSE (READ ALL CASTINGS)
const browseCastings = async (req, res) => {
    try {
        const castings = await tables.castings.readCastings();
        res.status(200).json(castings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE CASTING
const readOneCasting = async (req, res) => {
    const casting = await tables.castings.readCastingId(req.params.id);
    if (!casting) {
        return res.status(404).json({ error: "Casting not found" });
    } else {
        res.json(casting);
    }
};

// E - BREAD - EDIT CASTING
const editCasting = async (req, res, next) => {
    const updateCasting = req.body;
    const { id } = req.params;
    try {
        await tables.castings.updateCasting(id, updateCasting);
        res.status(200).json({ ...updateCasting, id: parseInt(id, 10) });
    } catch (error) {
        next(error);
    }
};

// A - BREAD - ADD CASTING
const addCasting = async (req, res, next) => {
    const casting = req.body;
    try {
        const createdCasting = await tables.castings.createCasting(casting);
        res.status(201).json({ ...casting, id: createdCasting.insertId });
    } catch (error) {
        next(error);
    }
};

// D - BREAD - DELETE CASTING
const destroyCasting = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.castings.deleteCasting(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = { browseCastings, readOneCasting, editCasting, addCasting, destroyCasting };