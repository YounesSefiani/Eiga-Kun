const tables = require("../../tables");

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
    const updateEpisode = req.body;
    const { id } = req.params;
    try {
        const result = await tables.episodes.updateEpisode(id, updateEpisode);
        if (!result.success) {
            return res.status(400).json(result);
        }
        res.status(200).json({ ...updateEpisode, id: parseInt(id, 10), message: result.message });
    } catch (error) {
        next(error);
    }
};

// A - BREAD - ADD (CREATE EPISODE)
const addEpisode = async (req, res, next) => {
    const episode = req.body;
    try {
        const createdEpisode = await tables.episodes.createEpisode(episode);
        if (!createdEpisode.success) {
            return res.status(400).json(createdEpisode);
        }
        res.status(201).json({ ...episode, id: createdEpisode.id });
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

module.exports = { browseEpisodes, readEpisode, editEpisode, addEpisode, destroyEpisode };