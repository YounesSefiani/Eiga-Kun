const tables = require("../../tables");

// B - BREAD - BROWSE (READ ALL)
const browseSeries = async (req, res) => {
  try {
    const series = await tables.series.readSeries();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readOneSerie = async (req, res) => {
  const serie = await tables.series.readSerieId(req.params.id);
  if (!serie) {
    return res.status(404).json({ error: "Serie not found" });
  } else {
    res.json(serie);
  }
};

const readFullSerie = async (req, res, next) => {
  try {
    const serie = await tables.series.readSerieId(req.params.id);
    if (!serie) {
      return res.status(404).json({ error: "Serie not found" });
    }

    const casting = await tables.castings.readCastingSerie(serie.id);

    const seasons = await tables.seasons.readSeasonsSerie(serie.id);

    const seasonsWithEpisodes = await Promise.all(
      seasons.map(async (season) => {
        const episodes = await tables.episodes.readEpisodesSeason(season.id);
        return { ...season, episodes: episodes || season.episodes };
      })
    );

    const fullSerie = {
      ...serie,
      seasons: seasonsWithEpisodes,
      casting: casting || [],
    };

    res.json(fullSerie);
  } catch (error) {
    next(error);
  }
};

// E - BREAD - EDIT
const editSerie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSerie = req.body;
    const { files } = req;

    const serie = await tables.series.readSerieId(id);
    if (!serie) {
      return res.status(404).json({ message: "Serie non trouvée." });
    }

    const updatedSerieDatas = {
      id,
      title: updateSerie.title || serie.title,
      release_date: updateSerie.release_date || serie.release_date || null,
      ending_date: updateSerie.ending_date || serie.ending_date || null,
      genre: updateSerie.genre || serie.genre || null,
      theme: updateSerie.theme || serie.theme || null,
      universe: updateSerie.universe || serie.universe || null,
      subUniverse: updateSerie.subUniverse || serie.subUniverse || null,
      synopsis: updateSerie.synopsis || serie.synopsis || null,
      poster: files?.poster
        ? files.poster[0].filename
        : updateSerie.poster || serie.poster || null,
      logo: files?.logo
        ? files.logo[0].filename
        : updateSerie.logo || serie.logo || null,
      background: files?.background
        ? files.background[0].filename
        : updateSerie.background || serie.background || null,
      statut: updateSerie.statut || serie.statut || null,
      nbSeasons: updateSerie.nbSeasons || serie.nbSeasons || null,
      seasons: updateSerie.seasons || serie.seasons || null,
      nbEpisodesSerie: updateSerie.nbEpisodesSerie || serie.nbEpisodesSerie || null,
      episodes: updateSerie.episodes || serie.episodes || null,
      trailer: updateSerie.trailer || serie.trailer || null,
      country: updateSerie.country || serie.country || null,
      serie_average_duration: updateSerie.serie_average_duration || serie.serie_average_duration || null,
      screen: updateSerie.screen || serie.screen || null,
      streaming: updateSerie.streaming || serie.streaming || null,
      original: updateSerie.original || serie.original || null,
    };

    await tables.series.updateSerie(id, updatedSerieDatas);

    const updatedSerie = await tables.series.readSerieId(id);

    if (!updatedSerie) {
      return res
        .status(404)
        .json({ message: "Serie non trouvée ou misee à jour échouée." });
    }

    return res.status(200).json({
      message: "Serie mise à jour avec succès",
      updateSerie: updatedSerie,
    });
  } catch (err) {
    console.error("Erreur lors de la misee à jour du série:", err);
    next(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// A - BREAD - ADD
const addSerie = async (req, res, next) => {
      const serie = req.body;
      const { files } = req;
      
      const serieDatas = {
          ...serie,
          poster: files?.poster ? files.poster[0].filename: null,
          background: files?.background ? files.background[0].filename: null,
          logo: files?.logo ? files.logo[0].filename: null,
      }
      try {
          const createdSerie =  await tables.series.createSerie(serieDatas);
          res.status(201).json({id: createdSerie, serieDatas});
      } catch (error) {
          next(error);
      }
  
};

// D - BREAD - DELETE
const destroySerie = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.series.deleteSerie(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSeries,
  readOneSerie,
  readFullSerie,
  addSerie,
  editSerie,
  destroySerie,
};
