const AbstractManager = require("../AbstractManager");

class MovieNationalityManager extends AbstractManager {
    constructor() {
        super({ table: "movie_nationalities" });
    }

    // C - CRUD - Create
    async createMovieNationality(movieNationality) {
        const [movieNationalityCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, nationality_id) VALUES (?, ?)`,
            [movieNationality.movie_id, movieNationality.nationality_id]
        );
        return movieNationalityCreated.insertId;
    }

    // R - CRUD - READ
    async readMovieNationalities() {
        const [movieNationality] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, nationalities.name AS nationality_name, ${this.table}.movie_id, ${this.table}.nationality_id 
             FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN nationalities ON ${this.table}.nationality_id = nationalities.id`
        );
        return movieNationality;
    }

    async readMovieNationalityId(id) {
        const [movieNationality] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, nationalities.name AS nationality_name, ${this.table}.movie_id, ${this.table}.nationality_id FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN nationalities ON ${this.table}.nationality_id = nationalities.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieNationality[0];
    }

    // U - CRUD - UPDATE
    async updateMovieNationality(id, movieNationality) {
        const [movieNationalityUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, nationality_id = ? WHERE ${this.table}.id = ?`,
            [movieNationality.movie_id, movieNationality.nationality_id, id]
        );
        return movieNationalityUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieNationality(id) {
        const [movieNationalityDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieNationalityDeleted.affectedRows;
    }
}

module.exports = MovieNationalityManager;