const AbstractManager = require("../AbstractManager");

class EpisodeManager extends AbstractManager {
  constructor() {
    super({ table: "episodes" });
  }

  // C - CRUD - Create
  async createEpisode(episode) {
    try {
      const [serie] = await this.database.query(
        `SELECT * FROM series WHERE id = ?`,
        [episode.serie_id]
      );
      if (serie.length === 0) {
        return { success: false, message: "Serie non trouvée !" };
      }

      const [season] = await this.database.query(
        `SELECT * FROM seasons WHERE id = ? AND serie_id = ?`,
        [episode.season_id, episode.serie_id]
      );
      if (season.length === 0) {
        return { success: false, message: "Saison non trouvée !" };
      }

      const maxEpisodes = season[0].nbEpisodesSeason;
      const [existingEpisodes] = await this.database.query(
        `SELECT COUNT(*) AS count FROM ${this.table} WHERE season_id = ?`,
        [episode.season_id]
      );
      if (existingEpisodes[0].count >= maxEpisodes) {
        return { success: false, message: "Saison pleine !" };
      }

      const [existingEpisode] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE season_id = ? AND episode_number = ?`,
        [episode.season_id, episode.episode_number]
      );
      if (existingEpisode.length > 0) {
        return { success: false, message: "Episode existant !" };
      }

      if (episode.episode_number > 1) {
        const [previousEpisode] = await this.database.query(
          `SELECT * FROM ${this.table} WHERE season_id = ? AND episode_number = ?`,
          [episode.season_id, episode.episode_number - 1]
        );
        if (previousEpisode.length < episode.episode_number - 1) {
          const [episodesofSeason] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE season_id = ? ORDER BY episode_number`,
            [episode.season_id]
          );
          const episodes = Array.isArray(episodesofSeason)
            ? episodesofSeason
            : [];
          return {
            success: false,
            message: `Il manque des épisodes avant l'épisode ${
              episode.episode_number
            } ! Episodes existants : ${episodesofSeason
              .map((ep) => ep.episode_number)
              .join(", ")}`,
            episodes,
          };
        }
      }

      await this.database.query(
        `INSERT INTO ${this.table} (serie_id, season_id, episode_number, title, episode_image, synopsis, release_date, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          episode.serie_id,
          episode.season_id,
          episode.episode_number,
          episode.title,
          episode.episode_image,
          episode.synopsis,
          episode.release_date,
          episode.duration,
        ]
      );
      return { success: true, message: "Episodes ajouté !" };
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return { success: false, message: "Episode existant !" };
      } else {
        throw error;
      }
    }
  }

  // R - CRUD - Read
  async readEpisodes() {
    const [episodes] = await this.database.query(`SELECT * FROM ${this.table}`);
    return episodes;
  }

  async readEpisodeId(id) {
    const [episode] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return episode[0];
  }

  async readEpisodesSeason(seasonId) {
    const [episodes] = await this.database.query(
      `SELECT seasons.id AS season_id, ${this.table}.* FROM ${this.table} JOIN seasons ON ${this.table}.season_id = seasons.id WHERE seasons.id = ? ORDER BY ${this.table}.episode_number ASC`,
      [seasonId]
    );
    return episodes;
  }
  // U - CRUD - Update
  async updateEpisode(id, episode) {
    try {
      const [existingEpisode] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [id]
      );
      if (existingEpisode.length === 0) {
        return { success: false, message: "Episode non trouvée !" };
      }

      const [serie] = await this.database.query(
        `SELECT * FROM series WHERE id = ?`,
        [episode.serie_id]
      );
      if (serie.length === 0) {
        return { success: false, message: "Serie non trouvée !" };
      }

      const [season] = await this.database.query(
        `SELECT * FROM seasons WHERE id = ? AND serie_id = ?`,
        [episode.season_id, episode.serie_id]
      );
      if (season.length === 0) {
        return { success: false, message: "Saison non trouvée !" };
      }

      const maxEpisodes = season[0].nbEpisodesSeason;
      const [existingEpisodes] = await this.database.query(
        `SELECT COUNT(*) AS count FROM ${this.table} WHERE season_id = ?`,
        [episode.season_id]
      );
      if (existingEpisodes[0].count >= maxEpisodes) {
        return { success: false, message: "Saison pleine !" };
      }

      const [duplicateEpisode] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE season_id = ? AND episode_number = ? AND id != ?`,
        [episode.season_id, episode.episode_number, id]
      );
      if (duplicateEpisode.length > 0) {
        return {
          success: false,
          message: "Episode existant !",
          existingEpisode: duplicateEpisode[0],
        };
      }

      if (episode.episode_number > 1) {
        const [previousEpisode] = await this.database.query(
          `SELECT * FROM ${this.table} WHERE season_id = ? AND episode_number = ?`,
          [episode.season_id, episode.episode_number - 1]
        );
        if (previousEpisode.length < episode.episode_number - 1) {
          const [episodesofSeason] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE season_id = ? ORDER BY episode_number`,
            [episode.season_id]
          );
          return {
            success: false,
            message: `Il manque des épisodes avant l'épisode ${
              episode.episode_number
            } ! Episodes existants : ${episodesofSeason
              .map((ep) => ep.episode_number)
              .join(", ")}`,
          };
        }
      }

      const [updateEpisode] = await this.database.query(
        `UPDATE ${this.table} SET serie_id = ?, season_id = ?, episode_number = ?, title = ?, episode_image = ?, synopsis = ?, release_date = ?, duration = ? WHERE id = ?`,
        [
          episode.serie_id,
          episode.season_id,
          episode.episode_number,
          episode.title,
          episode.episode_image,
          episode.synopsis,
          episode.release_date,
          episode.duration,
          id,
        ]
      );
      return {
        success: true,
        message: "Episode modifiée !",
        id: updateEpisode.insertId,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // D - CRUD - Delete
  async deleteEpisode(id) {
    try {
      const [episode] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [id]
      );
      if (episode.length === 0) {
        return { success: false, message: "Episode non trouvée !" };
      }
      await this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
      return { success: true, message: "Episode supprimée !" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = EpisodeManager;
