const AbstractManager = require("../AbstractManager");

class SerieManager extends AbstractManager {
  constructor() {
    super({ table: "series" });
  }

  // C - CRUD - Create
  async createSerie(serie) {
    const [serieCreated] = await this.database.query(
      `INSERT INTO ${this.table} (title, poster, background, logo, trailer, synopsis, genre, theme, universe, subUniverse, beginning_date, ending_date, statut, nbSeasons, seasons, nbEpisodesSerie, episodes, duration, country, screen, streaming, original) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        serie.title,
        serie.poster,
        serie.background,
        serie.logo,
        serie.trailer,
        serie.synopsis,
        serie.genre,
        serie.theme,
        serie.universe,
        serie.subUniverse,
        serie.beginning_date,
        serie.ending_date,
        serie.statut,
        serie.nbSeasons,
        serie.seasons,
        serie.nbEpisodesSerie,
        serie.episodes,
        serie.duration,
        serie.country,
        serie.screen,
        serie.streaming,
        serie.original,
      ]
    );
    return serieCreated;
  }

  // R - CRUD - Read
  async readSeries() {
    const [series] = await this.database.query(`SELECT * FROM ${this.table}`);
    return series;
  }

  async readSerieId(id) {
    const [serie] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return serie[0];
  }




  // U - CRUD - Update
  async updateSerie(id, serie) {
    const [updatedSerie] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, poster = ?, background = ?, logo = ?, trailer = ?, synopsis = ?, genre = ?, theme = ?, universe = ?, subUniverse = ?, beginning_date = ?, ending_date = ?, statut = ?, nbSeasons = ?, seasons = ?, nbEpisodesSerie = ?, episodes = ?, duration = ?, country = ?, screen = ?, streaming = ?, original = ? WHERE id = ?`,
      [
        serie.title,
        serie.poster,
        serie.background,
        serie.logo,
        serie.trailer,
        serie.synopsis,
        serie.genre,
        serie.theme,
        serie.universe,
        serie.subUniverse,
        serie.beginning_date,
        serie.ending_date,
        serie.statut,
        serie.nbSeasons,
        serie.seasons,
        serie.nbEpisodesSerie,
        serie.episodes,
        serie.duration,
        serie.country,
        serie.screen,
        serie.streaming,
        serie.original,
        id,
      ]
    );
    return updatedSerie;
  }

  // D - CRUD - Delete

  async deleteSerie(id) {
    const [deletedSerie] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return deletedSerie;
  }
}

module.exports = SerieManager;
