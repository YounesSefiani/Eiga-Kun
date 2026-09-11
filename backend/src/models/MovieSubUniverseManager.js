const AbstractManager = require("./AbstractManager");

class MovieSubUniverseManager extends AbstractManager {
    constructor() {
        super({ table: "movie_subUniverses" });
    }

    // C - CRUD - Create
    async createMovieSubUniverse(movieSubUniverse) {
        const [movieSubUniverseCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, subUniverse_id) VALUES (?, ?)`,
            [movieSubUniverse.movie_id, movieSubUniverse.subUniverse_id]
        );
        return movieSubUniverseCreated.insertId;
    }

    // R - CRUD - READ
    async readMovieSubUniverses() {
        const [movieSubUniverses] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, subUniverses.name AS subUniverse_name, ${this.table}.movie_id, ${this.table}.subUniverse_id 
             FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN subUniverses ON ${this.table}.subUniverse_id = subUniverses.id`
        );
        return movieSubUniverses;
    }

    async readMovieSubUniverseId(id) {
        const [movieSubUniverse] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, subUniverses.name AS subUniverse_name, ${this.table}.movie_id, ${this.table}.subUniverse_id FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN subUniverses ON ${this.table}.subUniverse_id = subUniverses.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieSubUniverse[0];
    }

    // U - CRUD - UPDATE
    async updateMovieSubUniverse(id, movieSubUniverse) {
        const [movieSubUniverseUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, subUniverse_id = ? WHERE ${this.table}.id = ?`,
            [movieSubUniverse.movie_id, movieSubUniverse.subUniverse_id, id]
        );
        return movieSubUniverseUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieSubUniverse(id) {
        const [movieSubUniverseDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieSubUniverseDeleted.affectedRows;
    }
}

module.exports = MovieSubUniverseManager;