const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE (READ ALL)
const browseStreamings = async (req, res) => {
    try {
        const streamings = await tables.streamings.readStreamings();
        res.status(200).json(streamings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const browseMoviesByStreaming = async (req, res) => {
    try {
        const streaming = await tables.streamings.readStreamingId(req.params.id);

        if (!streaming) {
            return res.status(404).json({ error: "Streaming not found" });
        }
        const moviesInStreaming = await tables.streamings.readMoviesByStreaming(req.params.id);
        res.status(200).json({
            streamingName: streaming.name,
            NbMovies: moviesInStreaming.length === 0 ? "Aucun film disponible sur cette plateforme." : moviesInStreaming.length,
            moviesInStreaming
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const browseSeriesByStreaming = async (req, res) => {
    try {
        const streaming = await tables.streamings.readStreamingId(req.params.id);

        if (!streaming) {
            return res.status(404).json({ error: "Streaming not found" });
        }
        const seriesInStreaming = await tables.streamings.readSeriesByStreaming(req.params.id);
        res.status(200).json({
            streamingName: streaming.name,
            NbSeries: seriesInStreaming.length === 0 ? "Aucune série disponible sur cette plateforme." : seriesInStreaming.length,
            seriesInStreaming
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// R - BREAD - READ ONE
const readOneStreaming = async (req, res) => {
    const streaming = await tables.streamings.readStreamingId(req.params.id);
    if (!streaming) {
        return res.status(404).json({ error: "Streaming not found" });
    } else {
        res.json(streaming);
    }
}

// E - BREAD - EDIT
const editStreaming = async (req, res, next) => {
    const updateStreaming = req.body;
    const { id } = req.params;
    try {
        await tables.streamings.updateStreaming(id, updateStreaming);
        res.status(200).json({ ...updateStreaming, id: parseInt(id, 10) });
    } catch (error) {
        next(error);
    }
}

// A - BREAD - ADD
const addStreaming = async (req, res, next) => {
    const newStreaming = req.body;
    const { files } = req;

    const streamingDatas = {
        ...newStreaming,
        imageStreaming: files?.imageStreaming ? files.imageStreaming[0].filename : newStreaming.imageStreaming || null,
        iconStreaming: files?.iconStreaming ? files.iconStreaming[0].filename : newStreaming.iconStreaming || null,
    };
    try {
        const createdStreaming = await tables.streamings.createStreaming(streamingDatas);
        res.status(201).json({ id: createdStreaming, streamingDatas });
    } catch (error) {
        next(error);
    }
}

// D - BREAD - DELETE
const destroyStreaming = async (req, res, next) => {
    const { id } = req.params;
    try {
        await tables.streamings.deleteStreaming(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    browseStreamings,
    browseMoviesByStreaming,
    browseSeriesByStreaming,
    readOneStreaming,
    editStreaming,
    addStreaming,
    destroyStreaming
}