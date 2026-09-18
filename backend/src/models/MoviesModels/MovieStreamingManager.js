const AbstractManager = require("../AbstractManager");

class MovieStreamingManager extends AbstractManager {
    constructor() {
        super({ table: "movies_streamings" });
    }

    // C - CRUD - CREATE
    async createMovieStreaming(movieStreaming) {
        const [movieStreamingCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, streaming_id, movieIsOriginal) VALUES (?, ?, ?)`,
            [movieStreaming.movie_id, movieStreaming.streaming_id, movieStreaming.movieIsOriginal]
        )
        return movieStreamingCreated.insertId;
    }

    // R - CRUD - READ
    async readMoviesStreamings() {
        const [movieStreamings] = await this.database.query(`SELECT * FROM ${this.table}`);
        return movieStreamings;
    }

    async readMovieStreamingId(id) {
        const [movieStreaming] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return movieStreaming[0];
    }

    async readMovieByStreamings(id) {
        const [movieStreamings] = await this.database.query(
            `SELECT movies.id AS movie_id,streamings.id AS streaming_id, streamings.name AS streaming_name, streamings.imageStreaming AS streaming_image, streamings.iconStreaming AS streaming_icon, movies_streamings.movieIsOriginal
            FROM ${this.table}
            JOIN movies ON ${this.table}.movie_id = movies.id
            JOIN streamings ON ${this.table}.streaming_id = streamings.id
            WHERE ${this.table}.movie_id = ?`,
            [id]
        );
        return movieStreamings;
    }

    // U - CRUD - UPDATE
    async updateMovieStreaming(id, movieStreaming) {
        const [movieStreamingUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, streaming_id = ?, movieIsOriginal = ? WHERE id = ?`,
            [movieStreaming.movie_id, movieStreaming.streaming_id, movieStreaming.movieIsOriginal, id]
        );
        return movieStreamingUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieStreaming(id) {
        const [movieStreamingDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return movieStreamingDeleted.affectedRows;
    }
}

module.exports = MovieStreamingManager;