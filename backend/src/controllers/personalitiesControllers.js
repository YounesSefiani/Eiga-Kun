const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL PERSONALITIES)
const browsePersonalities = async (req, res) => {
  try {
    const personalities = await tables.personalities.readPersonalities();
    res.status(200).json(personalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE PERSONALITY
const readOnePersonality = async (req, res) => {
  const personality = await tables.personalities.readPersonalityId(
    req.params.id
  );
  if (!personality) {
    return res.status(404).json({ error: "Personality not found" });
  } else {
    res.json(personality);
  }
};

const readPersonalityFilmography = async (req, res, next) => {
  try {
    const personalityId = req.params.id;
    const personality = await tables.personalities.readPersonalityId(
      personalityId
    );
    if (!personality) {
      return res.status(404).json({ error: "Personality not found" });
    }

    const movies = await tables.castings.readPersonalityMovies(personalityId);
    personality.movies = movies || [];
    const series = await tables.castings.readPersonalitySeries(personalityId);
    personality.series = series || [];
    res.status(200).json(personality);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT PERSONALITY
const editPersonality = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatePersonality = req.body;
    const { file } = req;

    const personality = await tables.personalities.readPersonalityId(id);

    const updatedPersonalityDatas = {
      id,
      fullname: updatePersonality.fullname || personality.fullname || null,
      birthdate: updatePersonality.birthdate || personality.birthdate || null,
      deathdate: Object.prototype.hasOwnProperty.call(
        updatePersonality,
        "deathdate"
      )
        ? updatePersonality.deathdate
        : personality.deathdate,
      picture: file
        ? file.filename
        : updatePersonality.picture || personality.picture || null,
      biography: updatePersonality.biography || personality.biography || null,
      nationality:
        updatePersonality.nationality || personality.nationality || null,
      profession:
        updatePersonality.profession || personality.profession || null,
      notable_works:
        updatePersonality.notable_works || personality.notable_works || null,
      sexe: updatePersonality.sexe || personality.sexe || null,
    };

    await tables.personalities.updatePersonality(id, updatedPersonalityDatas);

    const updatedPersonality = await tables.personalities.readPersonalityId(id);

    if (!updatedPersonality) {
      return res
        .status(404)
        .json({ message: "Personnalité non trouvée ou mise à jour échouée." });
    }

    return res.status(200).json({
      message: "Personnalité mise à jour avec succès",
      updatePersonality: updatedPersonality,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la personnalité:", err);
    next(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// A - BREAD - ADD PERSONALITY
const addPersonality = async (req, res, next) => {
  try {
    const personalityDatas = req.body;
    personalityDatas.picture = req.file ? req.file.filename : null;

    const result = await tables.personalities.createPersonality(
      personalityDatas
    );

    // result est un ResultSetHeader MySQL avec insertId
    if (!result.insertId) {
      // suppression image si upload
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "../assets/Personalities/Pictures",
          req.file.filename
        );
        fs.unlink(filePath, (err) => {
          if (err)
            console.error("Erreur lors de la suppression du fichier:", err);
        });
      }
      return res
        .status(400)
        .json({ message: "Erreur lors de la création de la personnalité" });
    }

    return res.status(201).json({ id: result.insertId, personalityDatas });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// D - BREAD - DESTROY PERSONALITY
const destroyPersonality = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.personalities.deletePersonality(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browsePersonalities,
  readOnePersonality,
  readPersonalityFilmography,
  editPersonality,
  addPersonality,
  destroyPersonality,
};
