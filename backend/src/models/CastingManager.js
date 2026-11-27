const AbstractManager = require("./AbstractManager");

class CastingManager extends AbstractManager {
    constructor() {
        super({ table: "castings" });
    }

    // C - CRUD - CREATE
    async createCasting(casting) {
        const [castingCreated] = await this.database.query(
            `INSERT INTO ${this.table} (personality_id, movie_id, serie_id, side, role, presence_serie)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                casting.personality_id,
                casting.movie_id,
                casting.serie_id,
                casting.side,
                casting.role,
                casting.presence_serie
            ]
        );
        return castingCreated;
    }
    // R - CRUD - READ
    async readCastings() {
        const [castings] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return castings;
    }

    async readCastingById(id) {
        const [casting] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return casting[0];
    }

    async readCastingMovie(movieId) {
        const [movieCasting] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.movie_id, movies.id AS movie_id, personalities.id AS personality_id, personalities.fullname AS personality_fullname, personalities.personality_picture AS personality_picture, ${this.table}.side, ${this.table}.role
            FROM ${this.table}
            JOIN movies ON ${this.table}.movie_id = movies.id
            JOIN personalities ON ${this.table}.personality_id = personalities.id
            WHERE ${this.table}.movie_id = ?`,
            [movieId]
        );
        return movieCasting;
    }

       async readCastingSerie(serieId) {
        const [serieCasting] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.serie_id, series.id AS serie_id, personalities.id AS personality_id, personalities.fullname AS personality_fullname, personalities.personality_picture AS personality_picture, ${this.table}.side, ${this.table}.role, ${this.table}.presence_serie
            FROM ${this.table}
            JOIN series ON ${this.table}.serie_id = series.id
            JOIN personalities ON ${this.table}.personality_id = personalities.id
            WHERE ${this.table}.serie_id = ?`,
            [serieId]
        );
        return serieCasting;
    }

    async readPersonalityMovies(personalityId) {
    const [personalityMovies] = await this.database.query(
        `SELECT castings.id, castings.movie_id, movies.title AS movie_title, movies.poster AS movie_poster, movies.release_date AS movie_release_date, castings.side, castings.role
        FROM castings
        JOIN movies ON castings.movie_id = movies.id
        WHERE castings.personality_id = ? AND castings.movie_id IS NOT NULL`,
        [personalityId]
    );
    return personalityMovies;
}

    async readPersonalitySeries(personalityId) {
        const [personalitySeries] = await this.database.query(
            `SELECT castings.id, castings.serie_id, series.title AS serie_title, series.poster AS serie_poster, series.beginning_date AS serie_beginning_date, series.ending_date AS serie_ending_date, castings.side, castings.role, castings.presence_serie
            FROM castings
            JOIN series ON castings.serie_id = series.id
            WHERE castings.personality_id = ? AND castings.serie_id IS NOT NULL`,
            [personalityId]
        );
        return personalitySeries;
    }

    // U - CRUD - UPDATE
    async updateCasting(id, casting) {
        const [castingUpdated] = await this.database.query(
            `UPDATE ${this.table} SET personality_id = ?, movie_id = ?, serie_id = ?, side = ?, role = ?, presence_serie = ? WHERE id = ?`,
            [
                casting.personality_id,
                casting.movie_id,
                casting.serie_id,
                casting.side,
                casting.role,
                casting.presence_serie,
                id
            ]
        );
        return castingUpdated;
    }

    // D - CRUD - DELETE
    async deleteCasting(id) {
        const [castingDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return castingDeleted;
    }
}

module.exports = CastingManager;