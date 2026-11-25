const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browseSeasons = async (req, res) => {
  try {
    const seasons = await tables.seasons.readSeasons();
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - READ - READ ONE SEASON
const readSeason = async (req, res, next) => {
  try {
    const seasonId = req.params.id;
    const season = await tables.seasons.readSeasonById(seasonId);
    if (!season) {
      return res.status(404).json({ error: "Season not found" });
    }
    res.status(200).json(season);
  } catch (error) {
    next(error);
  }
};

const readSeasonWithEpisodes = async (req, res, next) => {
  try {
    const seasonId = req.params.id;
    const episodes = await tables.episodes.readEpisodesBySeason(seasonId);
    res.status(200).json(episodes);
  } catch (error) {
    next(error);
  }
};


// E - BREAD - EDIT SEASON
const editSeason = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSeason = req.body;
    const { files } = req;

    const season = await tables.seasons.readSeasonById(id);

    const updatedSeasonDatas = {
      serie_id: updateSeason.serie_id || season.serie_id,
      season_number: updateSeason.season_number || season.season_number || null,
      season_poster: files?.season_poster ? files.season_poster[0].filename : updateSeason.season_poster || season.season_poster || null,
      nb_episodes: updateSeason.nb_episodes || season.nb_episodes || null,
      first_episode_date:
        updateSeason.first_episode_date || season.first_episode_date || null,
      last_episode_date:
        updateSeason.last_episode_date || season.last_episode_date || null,
    };

    await tables.seasons.updateSeason(id, updatedSeasonDatas);
    res.status(200).json({ message: "Season updated successfully", id, updatedSeasonDatas });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD SEASON
const addSeason = async (req, res, next) => {
  const season = req.body;
  const { files } = req;

  const seasonDatas = {
    ...season,
    season_poster: files?.season_poster ? files.season_poster[0].filename : season.season_poster || null,
  };

  try {
    const createdSeason = await tables.seasons.createSeason(seasonDatas);
    res.status(201).json({ message: "La saison a été ajoutée avec succès.",id: createdSeason, seasonDatas });
  } catch (error) {
    if (files?.season_poster) {
      files.season_poster.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Erreur suppression fichier:', err);
        });
      });
    }
    res.status(500).json({ error: "Erreur lors de la création de la saison", details: error.message });
    next(error);
    console.error(error);
  }
};

const destroySeason = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.seasons.deleteSeason(id);
        res.status(200).json({message: "Season deleted successfully"})
    } catch (error) {
        next(error);
    }
};

module.exports = {
  browseSeasons,
  readSeason,
  readSeasonWithEpisodes,
  editSeason,
  addSeason,
  destroySeason,
};
