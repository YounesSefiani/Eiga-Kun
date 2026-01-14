const tables = require("../../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL EPISODES)
const browseEpisodes = async (req, res) => {
  try {
    const episodes = await tables.episodes.readEpisodes();
    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ (READ ONE EPISODE)
const readEpisode = async (req, res) => {
  const episode = await tables.episodes.readEpisodeId(req.params.id);
  if (!episode) {
    return res.status(404).json({ error: "Episode not found" });
  } else {
    res.status(200).json(episode);
  }
};

// E - BREAD - EDIT (UPDATE EPISODE)
const editEpisode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateEpisode = req.body;
    const { file } = req;

    const episode = await tables.episodes.readEpisodeId(id);

    const updatedEpisodeDatas = {
      id,
      serie_id: updateEpisode.serie_id || episode.serie_id || null,
      season_id: updateEpisode.season_id || episode.season_id || null,
      episode_number:
        updateEpisode.episode_number || episode.episode_number || null,
      title: updateEpisode.title || episode.title || null,
      synopsis: updateEpisode.synopsis || episode.synopsis || null,
      episode_image: file
        ? file.filename
        : updateEpisode.episode_image || episode.episode_image || null,
      release_date: updateEpisode.release_date || episode.release_date || null,
      duration: updateEpisode.duration || episode.duration || null,
    };

    await tables.episodes.updateEpisode(id, updatedEpisodeDatas);

    const updatedEpisode = await tables.episodes.readEpisodeId(id);

    if (!updatedEpisode) {
      return res.status(404).json({ error: "Updated Episode not found" });
    }

    return res.status(200).json({
      message: "Episode mise à jour avec succès",
      updateEpisode: updatedEpisode,
    });
  } catch (err) {
    next(err);
  }
};

// A - BREAD - ADD (CREATE EPISODE)
const addEpisode = async (req, res, next) => {
  const episode = req.body;
  const { file } = req;

  const episodeDatas = {
    ...episode,
    episode_image: file?.episode_image ? file.episode_image[0].filename : episode.episode_image || null,
  }

  try {
    const createdEpisode = await tables.episodes.createEpisode(episodeDatas);
    res.status(201).json({
      id: createdEpisode,
      episodeDatas,
    });
  } catch (error) {
    next(error);
  }
};

// D - BREAD - DELETE (DELETE EPISODE)
const destroyEpisode = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.episodes.deleteEpisode(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseEpisodes,
  readEpisode,
  editEpisode,
  addEpisode,
  destroyEpisode,
};
