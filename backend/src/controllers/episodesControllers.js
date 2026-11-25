const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browseEpisodes = async (req, res) => {
  try {
    const episodes = await tables.episodes.readEpisodes();
    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - READ - READ ONE EPISODE
const readEpisodeById = async (req, res, next) => {
  try {
    const episodeId = req.params.id;
    const episode = await tables.episodes.readEpisodeById(episodeId);
    if (!episode) {
      return res.status(404).json({ error: "Episode not found" });
    }
    res.status(200).json(episode);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT EPISODE
const editEpisode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateEpisode = req.body;
    const { files } = req;

    const episode = await tables.episodes.readEpisodeById(id);

    const updatedEpisodeDatas = {
      serie_id: updateEpisode.serie_id || episode.serie_id,
      season_id: updateEpisode.season_id || episode.season_id,
      episode_number:
        updateEpisode.episode_number || episode.episode_number || null,
      episode_image: files?.episode_image
        ? files.episode_image[0].filename
        : updateEpisode.episode_image || episode.episode_image || null,
      episode_title:
        updateEpisode.episode_title || episode.episode_title || null,
      episode_synopsis:
        updateEpisode.episode_synopsis || episode.episode_synopsis || null,
      episode_air_date:
        updateEpisode.episode_air_date || episode.episode_air_date || null,
      episode_duration:
        updateEpisode.episode_duration || episode.episode_duration || null,
    };

    await tables.episodes.updateEpisode(id, updatedEpisodeDatas);
    res.status(200).json({ message: "Episode updated successfully" });
  } catch (error) {
    next(error);
  }
};

// A - BREAD - ADD EPISODE
const addEpisode = async (req, res, next) => {
  const episode = req.body;
  const { files } = req;

  const episodeDatas = {
    ...episode,
    episode_image: files?.episode_image
      ? files.episode_image[0].filename
      : episode.episode_image || null,
  };

  try {
    const createdEpisode = await tables.episodes.createEpisode(episodeDatas);
    res.status(201).json({ id: createdEpisode, episodeDatas });
  } catch (error) {
    if (files?.episode_image) {
      files.episode_image.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.error("Erreur suppression fichier:", err);
        });
      });
    }
    res
      .status(500)
      .json({
        error: "Erreur lors de la création de l'épisode",
        details: error.message,
      });
    next(error);
    console.error(error);
  }
};

const destroyEpisode = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.episodes.deleteEpisode(id);
    res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseEpisodes,
  readEpisodeById,
  editEpisode,
  addEpisode,
  destroyEpisode,
};
