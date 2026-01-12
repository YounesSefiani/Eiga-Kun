const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL SEASONS)
const browseSeasons = async (req, res, next) => {
  try {
    const seasons = await tables.seasons.readSeasons();
    res.json(seasons);
  } catch (error) {
    next(error);
  }
};

// R - BREAD - READ (READ ONE SEASON)

const readSeason = async (req, res, next) => {
  const season = await tables.seasons.readSeasonId(req.params.id);
  if (!season) {
    return res.status(404).json({ error: "Season not found" });
  } else {
    res.json(season);
  }
};

// E - BREAD - EDIT (UPDATE SEASON)
const editSeason = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSeason = req.body;
    const { file } = req;

    const season = await tables.seasons.readSeasonId(id);

    const updatedSeasonDatas = {
      serie_id: updateSeason.serie_id || season.serie_id,
      season_number: updateSeason.season_number || season.season_number || null,
      poster: file
        ? file.filename
        : updateSeason.poster || season.poster || null,
      nbEpisodesSeason:
        updateSeason.nbEpisodesSeason || season.nbEpisodesSeason || null,
      episodes: updateSeason.episodes || season.episodes || null,
      first_episode_date:
        updateSeason.first_episode_date || season.first_episode_date || null,
      last_episode_date:
        updateSeason.last_episode_date || season.last_episode_date || null,
    };

    await tables.seasons.updateSeason(id, updatedSeasonDatas);

    const updatedSeason = await tables.seasons.readSeasonId(id);

    if (!updatedSeason) {
      return res.status(404).json({ error: "Updated Season not found" });
    }

    return res.status(200).json({
      message: "Saison mise à jour avec succès",
      updateSeason: updatedSeason,
    });
  } catch (err) {
    next(err);
  }
};

// A - BREAD - ADD (CREATE SEASON)
const addSeason = async (req, res, next) => {
  try {
    const seasonDatas = req.body;
    seasonDatas.poster = req.file ? req.file.filename : null;

    const result = await tables.seasons.createSeason(seasonDatas);

    if (result && result.success === false) {
      // Supprime l'image si elle a été uploadée
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "../assets/Series/Seasons/",
          req.file.filename
        );
        fs.unlink(filePath, (err) => {
          if (err)
            console.error("Erreur lors de la suppression du fichier:", err);
        });
      }
      return res.status(400).json(result);
    }

    return res.status(201).json({ id: result, seasonDatas });
  } catch (err) {
    next(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// D - BREAD - DELETE (DELETE SEASON)
const destroySeason = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.seasons.deleteSeason(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeasons,
  readSeason,
  addSeason,
  editSeason,
  destroySeason,
};
