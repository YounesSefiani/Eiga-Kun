const AbstractManager = require("./AbstractManager");

class StreamingManager extends AbstractManager {
    constructor() {
        super({ table: "streamings" });
    }

    // C - CRUD - Create
    async createStreaming(streaming) {
        const [streamingCreated] = await this.database.query(
            `INSERT INTO ${this.table} (name, imageStreaming, iconStreaming, description) VALUES (?, ?, ?, ?)`,
            [streaming.name, streaming.imageStreaming, streaming.iconStreaming, streaming.description]
        );
        return streamingCreated.insertId;
    }

    // R - CRUD - Read
    async readStreamings() {
        const [streamings] = await this.database.query(`SELECT * FROM ${this.table}`);
        return streamings;
    }

    async readMoviesByStreaming(id) {
        const [moviesByStreaming] = await this.database.query(
            `SELECT movies.id AS movie_id, movies.title AS movie_title, movies.poster AS movie_poster, streamings.id AS streaming_id, streamings.name AS streaming_name, movies_streamings.movieIsOriginal
            FROM movies_streamings
            JOIN movies ON movies_streamings.movie_id = movies.id
            JOIN streamings ON movies_streamings.streaming_id = streamings.id
            WHERE movies_streamings.streaming_id = ?`,
            [id]
        );
        return moviesByStreaming;
    }

     async readSeriesByStreaming(id) {
        const [seriesByStreaming] = await this.database.query(
            `SELECT series.id AS serie_id, series.title AS serie_title, series.poster AS serie_poster, streamings.id AS streaming_id, streamings.name AS streaming_name, series_streamings.serieIsOriginal
            FROM series_streamings
            JOIN series ON series_streamings.serie_id = series.id
            JOIN streamings ON series_streamings.streaming_id = streamings.id
            WHERE series_streamings.streaming_id = ?`,
            [id]
        );
        return seriesByStreaming;
    }

    async readStreamingId(id) {
        const [streaming] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return streaming[0];
    }

    // U - CRUD - Update
    async updateStreaming(id, streaming) {
        const [streamingUpdated] = await this.database.query(
            `UPDATE ${this.table} SET name = ?, imageStreaming = ?, iconStreaming = ?, description = ? WHERE id = ?`,
            [streaming.name, streaming.url, streaming.icon, streaming.description, id]
        );
        return streamingUpdated.affectedRows;
    }

    // D - CRUD - Delete
    async deleteStreaming(id) {
        const [streamingDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return streamingDeleted.affectedRows;
    }
}

module.exports = StreamingManager;