const AbstractManager = require("../AbstractManager");

class MovieGenreManager extends AbstractManager {
    constructor() {
        super({ table: "movie_genres" });
    }

    // C - CRUD - Create
    async createMovieGenre(movieGenre) {
        const [movieGenreCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, genre_id) VALUES (?, ?)`,
            [movieGenre.movie_id, movieGenre.genre_id]
        );
        return movieGenreCreated.insertId;
    }

    // R - CRUD - READ
    async readMovieGenres() {
        const [movieGenres] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, genres.name AS genre_name, ${this.table}.movie_id, ${this.table}.genre_id 
             FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN genres ON ${this.table}.genre_id = genres.id`
        );
        return movieGenres;
    }

    async readMovieGenreId(id) {
        const [movieGenre] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, genres.name AS genre_name, ${this.table}.movie_id, ${this.table}.genre_id FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN genres ON ${this.table}.genre_id = genres.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieGenre[0];
    }

    // U - CRUD - UPDATE
    async updateMovieGenre(id, movieGenre) {
        const [movieGenreUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, genre_id = ? WHERE ${this.table}.id = ?`,
            [movieGenre.movie_id, movieGenre.genre_id, id]
        );
        return movieGenreUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieGenre(id) {
        const [movieGenreDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieGenreDeleted.affectedRows;
    }
}

module.exports = MovieGenreManager;