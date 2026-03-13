const AbstractManager = require("./AbstractManager");

class CastingManager extends AbstractManager {
  constructor() {
    super({ table: "castings" });
  }

    // C - CRUD - Create
    async createCasting(casting) {
      const [castingCreated] = await this.database.query(
        `INSERT INTO ${this.table} (personality_id, movie_id, serie_id, role, side, presence) VALUES (?, ?, ?, ?, ?, ?)`,
        [casting.personality_id, casting.movie_id, casting.serie_id, casting.role, casting.side, casting.presence]
      );
      return castingCreated;
    }

    // R - CRUD - Read
    async readCastings() {
      const [castings] = await this.database.query(`SELECT * FROM ${this.table}`);
      return castings;
    }

    async readCastingId(id) {
      const [casting] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [id]
      );
      return casting[0];
    }

    async readCastingMovie(movieId) {
      const [casting] = await this.database.query(
        `SELECT ${this.table}.id, movies.id AS movie_id, movies.title AS movie_title, personalities.id AS personality_id, personalities.fullname AS personality_fullname, personalities.picture AS personality_picture, ${this.table}.role, ${this.table}.side
        FROM ${this.table}
        JOIN movies ON castings.movie_id = movies.id
        JOIN personalities ON castings.personality_id = personalities.id
        WHERE movie_id = ?`,
        [movieId]
      );
      return casting;
    }

    async readCastingSerie(serieId) {
      const [casting] = await this.database.query(
        `SELECT ${this.table}.id, series.id AS serie_id, series.title AS serie_title, personalities.id AS personality_id, personalities.fullname AS personality_fullname, personalities.picture AS personality_picture, ${this.table}.role, ${this.table}.side, ${this.table}.presence
        FROM ${this.table}
        JOIN series ON castings.serie_id = series.id
        JOIN personalities ON castings.personality_id = personalities.id
        WHERE serie_id = ?`,
        [serieId]
      );
      return casting;
    }

    async readPersonalityMovies(personalityId) {
      const [movies] = await this.database.query(
        `SELECT ${this.table}.id, movies.id AS movie_id, movies.title AS movie_title, movies.release_date AS movie_release_date, movies.poster AS movie_poster, ${this.table}.role, ${this.table}.side
        FROM ${this.table}
        JOIN movies ON castings.movie_id = movies.id
        WHERE castings.personality_id = ?`,
        [personalityId]
      );
      return movies;
    }

    async readPersonalitySeries(personalityId) {
      const [series] = await this.database.query(
        `SELECT ${this.table}.id, series.id AS serie_id, series.title AS serie_title, series.beginning_date AS serie_beginning_date, series.ending_date AS serie_ending_date, series.poster AS serie_poster, ${this.table}.role, ${this.table}.side, ${this.table}.presence
        FROM ${this.table}
        JOIN series ON castings.serie_id = series.id
        WHERE castings.personality_id = ?`,
        [personalityId]
      );
      return series;
    }

    // U - CRUD - Update
    async updateCasting(id, casting) {
      // Construire dynamiquement la requête pour ne mettre à jour que les champs fournis
      const fields = [];
      const values = [];

      if (casting.personality_id !== undefined) {
        fields.push("personality_id = ?");
        values.push(casting.personality_id);
      }
      if (casting.movie_id !== undefined) {
        fields.push("movie_id = ?");
        values.push(casting.movie_id);
      }
      if (casting.serie_id !== undefined) {
        fields.push("serie_id = ?");
        values.push(casting.serie_id);
      }
      if (casting.role !== undefined) {
        fields.push("role = ?");
        values.push(casting.role);
      }
      if (casting.side !== undefined) {
        fields.push("side = ?");
        values.push(casting.side);
      }
      if (casting.presence !== undefined) {
        fields.push("presence = ?");
        values.push(casting.presence);
      }

      if (fields.length === 0) {
        return null; // Rien à mettre à jour
      }

      values.push(id);
      const [updatedCasting] = await this.database.query(
        `UPDATE ${this.table} SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      return updatedCasting;
    }

    // D - CRUD - Delete
    async deleteCasting(id) {
      const [deletedCasting] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      );
      return deletedCasting;
    }
}

module.exports = CastingManager;