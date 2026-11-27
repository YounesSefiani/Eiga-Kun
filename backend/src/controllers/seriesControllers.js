const tables = require("../tables");
const fs = require("fs");
const path = require("path");

// B - BREAD - BROWSE
const browseSeries = async (req, res) => {
  try {
    const series = await tables.series.readSeries();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// R - BREAD - READ ONE
const readSerie = async (req, res) => {
  const serie = await tables.series.readSerieById(req.params.id);
  if (!serie) {
    return res.status(404).json({ error: "Serie not found" });
  } else {
    res.status(200).json(serie);
  }
};

const readFullSerie = async (req, res) => {
  try {
    const serie = await tables.series.readSerieById(req.params.id);
    if (!serie) {
      return res.status(404).json({ error: "Serie not found"});
    }

    const casting = await tables.castings.readCastingSerie(serie.id);
    serie.casting = casting || [];

    const seasons = await tables.seasons.readSeasonsBySerie(serie.id);
    const seasonsWithEpisodes = await Promise.all(
      seasons.map(async (season) => {
        const episodes = await tables.episodes.readEpisodesBySeason(season.id);
        return {
          ...season,
          episodes : episodes || season.episodes }
      })
    );

    const fullSerie = {
      ...serie,
      seasons: seasonsWithEpisodes,
      casting: serie.casting,
    };
    res.status(200).json(fullSerie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// E - BREAD - EDIT
const editSerie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateSerie = req.body;
    const { files } = req;

    const serie = await tables.series.readSerieById(id);

    if (!serie) {
      return res.status(404).json({ message: "Série non trouvée." });
    }

    const updatedSerieDatas = {
      id,
      title: updateSerie.title !== undefined ? updateSerie.title : serie.title,
      original_title:
        updateSerie.original_title !== undefined
          ? updateSerie.original_title
          : serie.original_title,
      poster: files?.poster
        ? files.poster[0].filename
        : updateSerie.poster !== undefined
          ? updateSerie.poster
          : serie.poster,
      original_poster: files?.original_poster
        ? files.original_poster[0].filename
        : updateSerie.original_poster !== undefined
          ? updateSerie.original_poster
          : serie.original_poster,
      background: files?.background
        ? files.background[0].filename
        : updateSerie.background !== undefined
          ? updateSerie.background
          : serie.background,
      logo: files?.logo
        ? files.logo[0].filename
        : updateSerie.logo !== undefined
          ? updateSerie.logo
          : serie.logo,
      original_logo: files?.original_logo
        ? files.original_logo[0].filename
        : updateSerie.original_logo !== undefined
          ? updateSerie.original_logo
          : serie.original_logo,
      trailer:
        updateSerie.trailer !== undefined ? updateSerie.trailer : serie.trailer,
      synopsis:
        updateSerie.synopsis !== undefined
          ? updateSerie.synopsis
          : serie.synopsis,
      beginning_date:
        updateSerie.beginning_date !== undefined
          ? updateSerie.beginning_date
          : serie.beginning_date,
      ending_date:
        updateSerie.ending_date !== undefined
          ? updateSerie.ending_date
          : serie.ending_date,
      average_episode_duration:
        updateSerie.average_episode_duration !== undefined
          ? updateSerie.average_episode_duration
          : serie.average_episode_duration,
      SCREEN:
        updateSerie.SCREEN !== undefined ? updateSerie.SCREEN : serie.SCREEN,
      nb_total_seasons:
        updateSerie.nb_total_seasons !== undefined
          ? updateSerie.nb_total_seasons
          : serie.nb_total_seasons,
      nb_total_episodes:
        updateSerie.nb_total_episodes !== undefined
          ? updateSerie.nb_total_episodes
          : serie.nb_total_episodes,
      statut:
        updateSerie.statut !== undefined ? updateSerie.statut : serie.statut,
    };

    await tables.series.updateSerie(id, updatedSerieDatas);

    const updatedSerie = await tables.series.readSerieById(id);
    if (!updatedSerie) {
      return res
        .status(404)
        .json({ message: "Série non trouvée après mise à jour." });
    }
    res.status(200).json({
      message: "Série mise à jour avec succès.",
      updatedSerie: updatedSerie,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de la série :", err);
    next(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la série." });
  }
};

// A - BREAD - ADD
const addSerie = async (req, res, next) => {
  const serie = req.body;
  const { files } = req;

  const serieDatas = {
    ...serie,
    poster: files?.poster ? files.poster[0].filename : serie.poster || null,
    original_poster: files?.original_poster
      ? files.original_poster[0].filename
      : serie.original_poster || null,
    background: files?.background
      ? files.background[0].filename
      : serie.background || null,
    logo: files?.logo ? files.logo[0].filename : serie.logo || null,
    original_logo: files?.original_logo
      ? files.original_logo[0].filename
      : serie.original_logo || null,
  };
  try {
    const createdSerie = await tables.series.createSerie(serieDatas);
    res.status(201).json({
      message: "Série ajoutée avec succès.",
      id: createdSerie,
      serieDatas,
    });
 } catch (error) {
     if (files?.poster) {
       files.poster.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) console.error('Erreur suppression fichier:', err);
         });
       });
     }
     if (files?.original_poster) {
       files.original_poster.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) console.error('Erreur suppression fichier:', err);
         });
       });
     }
     if (files?.background) {
       files.background.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) console.error('Erreur suppression fichier:', err);
         });
       });
     }
     if (files?.logo) {
       files.logo.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) console.error('Erreur suppression fichier:', err);
         });
       });
     }
     if (files?.original_logo) {
       files.original_logo.forEach((file) => {
         fs.unlink(file.path, (err) => {
           if (err) console.error('Erreur suppression fichier:', err);
         });
       });
     }
     res.status(500).json({ error: "Erreur lors de la création de la série", details: error.message });
     next(error);
     console.error(error);
  }
};

// D - BREAD - DELETE
const destroySerie = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.series.deleteSerie(id);
    res.status(200).json({ message: "Série supprimée avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression de la série :", err);
    next(err);
    res.status(500).json({ error: "Erreur lors de la suppression de la série." });
  }
};

module.exports = {
  browseSeries,
  readSerie,
  readFullSerie,
  editSerie,
  addSerie,
  destroySerie,
};
