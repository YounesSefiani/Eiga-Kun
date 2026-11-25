const AbstractManager = require("./AbstractManager");

class SeasonManager extends AbstractManager {
  constructor() {
    super({ table: "seasons" });
  }

  // C - CRUD - CREATE
  async createSeason(season) {
    try {
      const [serie] = await this.database.query(
        `SELECT * FROM series WHERE id = ?`,
        [season.serie_id],
      );
      if (serie.length === 0) {
        throw new Error("Serie not found");
      }

      const maxSeasons = serie[0].nb_total_seasons;
      const [currentSeasons] = await this.database.query(
        `SELECT COUNT(*) AS count FROM seasons WHERE serie_id = ?`,
        [season.serie_id],
      );
      const seasonsCount = currentSeasons[0].count;
      if (seasonsCount >= maxSeasons || season.season_number > maxSeasons) {
        throw new Error(
          `Cette série comporte ${maxSeasons} saisons. Par conséquent, celle-ci est de trop !`,
        );
      }

      const [existingSeason] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE serie_id = ? AND season_number = ?`,
        [season.serie_id, season.season_number],
      );
      if (existingSeason.length > 0) {
        throw new Error("Cette saison existe déjà pour cette série");
      }

      if (season.season_number > 1) {
        const [previousSeasons] = await this.database.query(
          `SELECT season_number FROM seasons WHERE serie_id = ? AND season_number < ? ORDER BY season_number ASC`,
          [season.serie_id, season.season_number],
        );
        if (previousSeasons.length < season.season_number - 1) {
          const [seasonsofSerie] = await this.database.query(
            `SELECT * FROM seasons WHERE serie_id = ? ORDER BY season_number ASC`,
            [season.serie_id],
          );
          const seasons = Array.isArray(seasonsofSerie) ? seasonsofSerie : [];
          throw new Error(
            `Il manque des saisons pour cette série. Les saisons existantes sont : ${seasons.map((s) => s.season_number).join(", ")}`,
          );
        }
      }
      const [seasonCreated] = await this.database.query(
        `INSERT INTO ${this.table} (serie_id, season_number, season_poster, nb_episodes, first_episode_date, last_episode_date) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          season.serie_id,
          season.season_number,
          season.season_poster,
          season.nb_episodes,
          season.first_episode_date,
          season.last_episode_date,
        ],
      );
      return seasonCreated.insertId;
    } catch (error) {
      throw error;
    }
  }

  // R - CRUD - READ
  async readSeasons() {
    const [seasons] = await this.database.query(
      `SELECT series.title AS serie_title, ${this.table}.* 
      FROM ${this.table}
      JOIN series ON ${this.table}.serie_id = series.id
      `,
    );
    return seasons;
  }

  // R - CRUD - READ ONE SEASON
  async readSeasonById(id) {
    const [season] = await this.database.query(
      `SELECT series.title AS serie_title, ${this.table}.* FROM ${this.table} JOIN series ON ${this.table}.serie_id = series.id WHERE ${this.table}.id = ?`,
      [id],
    );
    return season[0];
  }

  async readSeasonsBySerie(serieId) {
    const [serie] = await this.database.query(
      `SELECT series.id AS serie_id, series.title AS serie_title, ${this.table}.*
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        WHERE series.id = ?`,
      [serieId],
    );
    return serie;
  }

  // U - CRUD - UPDATE
  async updateSeason(id, season) {
    const [seasonUpdated] = await this.database.query(
      `UPDATE ${this.table} SET serie_id = ?, season_number = ?, season_poster = ?, nb_episodes = ?, first_episode_date = ?, last_episode_date = ? WHERE id = ?`,
      [
        season.serie_id,
        season.season_number,
        season.season_poster,
        season.nb_episodes,
        season.first_episode_date,
        season.last_episode_date,
        id,
      ],
    );
    return seasonUpdated.affectedRows;
  }
  // D - CRUD - DELETE
  async deleteSeason(id) {
    const [seasonDeleted] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return seasonDeleted.affectedRows;
  }
}

module.exports = SeasonManager;
