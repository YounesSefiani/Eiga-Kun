const tables = require("../../tables");

// B - BREAD - BROWSE (READ ALL)
const browseSeriesStreamings = async (req, res) => {
    try {
        const seriesStreaming = await tables.series_streamings.readSeriesStreamings();
        res.status(200).json(seriesStreaming);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// R - BREAD - READ ONE
const readOneSerieStreaming = async (req, res) => {
    const serieStreaming = await tables.series_streamings.readSerieStreamingId(req.params.id);
    if (!serieStreaming) {
        return res.status(404).json({ error: "SerieStreaming not found" });
    } else {
        res.json(serieStreaming);
    }
};

const browseSerieByStreamings = async (req, res) => {
    try {
        const serie = await tables.series.readSerieId(req.params.id);

        if (!serie) {
            return res.status(404).json({ error: "Serie not found" });
        }

        const streamings = await tables.series_streamings.readSerieByStreamings(req.params.id);
        res.status(200).json({
            serieTitle: serie.title,
            streamings,
            message: streamings.length === 0
                ? "Ce film n'est disponible sur aucune plateforme."
                : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

// E - BREAD - EDIT
const editSerieStreaming = async (req, res) => {
    const updateSerieStreaming = req.body;
    const { id } = req.params;
    try {
        await tables.series_streamings.updateSerieStreaming(id, updateSerieStreaming);
        res.status(200).json({ ...updateSerieStreaming, id: parseInt(id, 10) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// A - BREAD - ADD
const addSerieStreaming = async (req, res) => {
    const newSerieStreaming = req.body;
    try {
        const serieStreaming = await tables.series_streamings.createSerieStreaming(newSerieStreaming);
        res.status(201).json({ ...serieStreaming, id: serieStreaming.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// D - BREAD - DELETE
const destroySerieStreaming = async (req, res) => {
    const { id } = req.params;
    try {
        await tables.series_streamings.deleteSerieStreaming(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    browseSeriesStreamings,
    readOneSerieStreaming,
    browseSerieByStreamings,
    editSerieStreaming,
    addSerieStreaming,
    destroySerieStreaming,
};