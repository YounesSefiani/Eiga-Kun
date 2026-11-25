const AbstractManager = require("./AbstractManager");

class EpisodeManager extends AbstractManager {
  constructor() {
    super({ table: "episodes" });
  }

  // C - CRUD - CREATE
  async createEpisode(episode) {
    const [episodeCreated] = await this.database.query(
      `INSERT INTO ${this.table} (serie_id, season_id, episode_number, episode_image, episode_title, episode_synopsis, episode_air_date, episode_duration)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        episode.serie_id,
        episode.season_id,
        episode.episode_number,
        episode.episode_image,
        episode.episode_title,
        episode.episode_synopsis,
        episode.episode_air_date,
        episode.episode_duration,
      ],
    );
    return episodeCreated.insertId;
  }

  // R - CRUD - READ ALL
  async readEpisodes() {
    const [episodes] = await this.database.query(
      `SELECT series.title AS serie_title, ${this.table}.* FROM ${this.table} JOIN seasons ON ${this.table}.season_id = seasons.id JOIN series ON seasons.serie_id = series.id`,
    );
    return episodes;
  }

  // R - CRUD - READ
  async readEpisodeById(id) {
    const [episode] = await this.database.query(
      `SELECT series.title AS serie_title, ${this.table}.* FROM ${this.table} JOIN seasons ON ${this.table}.season_id = seasons.id JOIN series ON seasons.serie_id = series.id WHERE ${this.table}.id = ?`,
      [id],
    );
    return episode[0];
  }

  async readEpisodesBySeason(seasonId) {
    const [episodes] = await this.database.query(
      `SELECT series.id AS serie_id, seasons.id AS season_id, ${this.table}.* FROM ${this.table} JOIN seasons ON ${this.table}.season_id = seasons.id JOIN series ON seasons.serie_id = series.id WHERE seasons.id = ? ORDER BY ${this.table}.episode_number ASC`,
      [seasonId],
    );
    return episodes;
  }

  // U - CRUD - UPDATE
  async updateEpisode(id, episode) {
    const [episodeUpdated] = await this.database.query(
      `UPDATE ${this.table} SET serie_id = ?, season_id = ?, episode_number = ?, episode_image = ?, episode_title = ?, episode_synopsis = ?, episode_air_date = ?, episode_duration = ? WHERE id = ?`,
      [
        episode.serie_id,
        episode.season_id,
        episode.episode_number,
        episode.episode_image,
        episode.episode_title,
        episode.episode_synopsis,
        episode.episode_air_date,
        episode.episode_duration,
        id,
      ],
    );
    return episodeUpdated.affectedRows;
  }

  // D - CRUD - DELETE
  async deleteEpisode(id) {
    const [episodeDeleted] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return episodeDeleted.affectedRows;
  }
}
module.exports = EpisodeManager;
