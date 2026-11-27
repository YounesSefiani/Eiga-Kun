const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browsePersonalities = async (req, res) => {
    try {
        const personalities = await tables.personalities.readPersonalities();
        res.status(200).json(personalities);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// R - BREAD - READ
const readPersonality = async (req, res) => {
    const personality = await tables.personalities.readPersonalityById(req.params.id);
    if (!personality) {
        return res.status(404).json({ error: "Personality not found"});
    } else {
        res.status(200).json(personality);
    }
}

const readPersonalityFull = async (req, res) => {
    const personality = await tables.personalities.readPersonalityById(req.params.id);
    if (!personality) {
        return res.status(404).json({ error: "Personality not found"});
    }
    const personalityMovies = await tables.castings.readPersonalityMovies(personality.id);
    const personalitySeries = await tables.castings.readPersonalitySeries(personality.id);
    const fullPersonality = {
        ...personality,
        movies: personalityMovies || [],
        series: personalitySeries || []
    };
    res.status(200).json(fullPersonality);
}
// E - BREAD - EDIT
const editPersonality = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatePersonality = req.body;
        const { files } = req;

        const personality = await tables.personalities.readPersonalityById(id);
        if (!personality) {
            return res.status(404).json({ error: "Personality not found" });
        }
       
        const updatedPersonalityDatas = {
            id,
            fullname: updatePersonality.fullname !== undefined ? updatePersonality.fullname : personality.fullname,
            personality_picture: files?.personality_picture ? files.personality_picture[0].filename : updatePersonality.personality_picture !== undefined ? updatePersonality.personality_picture : personality.personality_picture,
            birth_date: updatePersonality.birth_date !== undefined ? updatePersonality.birth_date : personality.birth_date,
            death_date: updatePersonality.death_date !== undefined ? updatePersonality.death_date : personality.death_date,
            notable_movies: updatePersonality.notable_movies !== undefined ? updatePersonality.notable_movies : personality.notable_movies,
            notable_series: updatePersonality.notable_series !== undefined ? updatePersonality.notable_series : personality.notable_series,
            profession: updatePersonality.profession !== undefined ? updatePersonality.profession : personality.profession,
            biography: updatePersonality.biography !== undefined ? updatePersonality.biography : personality.biography,
        };

        await tables.personalities.updatePersonality(id, updatedPersonalityDatas);

        const updatedPersonality = await tables.personalities.readPersonalityById(id);
        if (!updatedPersonality) {
            return res.status(404).json({ error: "Personality not found after update" });
        }
        res.status(200).json({ message: "Personnalité mise à jour avec succès.",
            updatePersonality: updatedPersonality,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la personnalité:", error);
        next(error)
        res.status(500).json({ error: error.message });
    }
}

// A - BREAD - ADD
const addPersonality = async (req, res, next) => {
    const personality = req.body;
    const { files } = req;

    const personalityDatas = {
        ...personality,
        personality_picture: files?.personality_picture ? files.personality_picture[0].filename : personality.personality_picture
    };
    try {
        const createdPersonality = await tables.personalities.createPersonality(personalityDatas);
        res.status(201).json({
            message: "Personnalité ajoutée avec succès.",
            id: createdPersonality,
            personalityDatas,
        });
    } catch (error) {
        if (files?.personality_picture) {
            files.personality_picture.forEach((file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Erreur lors de la suppression du fichier:', err);
                });
            }));
        }
        res.status(500).json({ error: error.message });
        next(error);
        console.error(error);
    }
}

// D - BREAD - DELETE
const destroyPersonality = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.personalities.deletePersonality(id);
        res.status(200).json({ message : "Personnalité supprimée avec succès"});
    } catch (error) {
        console.error("Erreur lors de la suppression de la personnalité:", error);
        next(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    browsePersonalities,
    readPersonality,
    readPersonalityFull,
    editPersonality,
    addPersonality,
    destroyPersonality,
};