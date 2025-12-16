const tables = require("../tables");

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
    const personality = await tables.personalities.readPersonalityId(personalityId);
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
}


// E - BREAD - EDIT PERSONALITY
const editPersonality = async (req, res, next) => {
  const updatePersonality = req.body;
  const { id } = req.params;
  try {
    await tables.personalities.updatePersonality(id, updatePersonality);
    res.status(200).json({ ...updatePersonality, id: parseInt(id, 10) });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD PERSONALITY
const addPersonality = async (req, res, next) => {
  const personality = req.body;
  try {
    const createdPersonality = await tables.personalities.createPersonality(
      personality
    );
    res.status(201).json({ ...personality, id: createdPersonality.insertId });
  } catch (error) {
    next(error);
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
