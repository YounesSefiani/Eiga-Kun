const AbstractManager = require("./AbstractManager");

class MovieUniverseManager extends AbstractManager {
    constructor() {
        super({ table: "movie_universes" });
    }

    // C - CRUD - Create
    async createMovieUniverse(movieUniverse) {
        const [movieUniverseCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, universe_id) VALUES (?, ?)`,
            [movieUniverse.movie_id, movieUniverse.universe_id]
        );
        return movieUniverseCreated.insertId;
    }

    // R - CRUD - READ
    async readMovieUniverses() {
        const [movieUniverses] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, universes.name AS universe_name, ${this.table}.movie_id, ${this.table}.universe_id 
             FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN universes ON ${this.table}.universe_id = universes.id`
        );
        return movieUniverses;
    }

    async readMovieUniverseId(id) {
        const [movieUniverse] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, universes.name AS universe_name, ${this.table}.movie_id, ${this.table}.universe_id FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN universes ON ${this.table}.universe_id = universes.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieUniverse[0];
    }

    // U - CRUD - UPDATE
    async updateMovieUniverse(id, movieUniverse) {
        const [movieUniverseUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, universe_id = ? WHERE ${this.table}.id = ?`,
            [movieUniverse.movie_id, movieUniverse.universe_id, id]
        );
        return movieUniverseUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieUniverse(id) {
        const [movieUniverseDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieUniverseDeleted.affectedRows;
    }
}

module.exports = MovieUniverseManager;