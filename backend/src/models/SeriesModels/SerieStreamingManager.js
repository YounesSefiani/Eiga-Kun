const AbstractManager = require("../AbstractManager");

class SerieStreamingManager extends AbstractManager {
    constructor() {
        super({ table: "series_streamings" });
    }

    // C - CRUD - CREATE
    async createSerieStreaming(serieStreaming) {
        const [serieStreamingCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, streaming_id, serieIsOriginal) VALUES (?, ?, ?)`,
            [serieStreaming.serie_id, serieStreaming.streaming_id, serieStreaming.serieIsOriginal]
        )
        return serieStreamingCreated.insertId;
    }

    // R - CRUD - READ
    async readSeriesStreamings() {
        const [serieStreamings] = await this.database.query(`SELECT * FROM ${this.table}`);
        return serieStreamings;
    }

    async readSerieStreamingId(id) {
        const [serieStreaming] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return serieStreaming[0];
    }

    async readSerieByStreamings(id) {
        const [serieStreamings] = await this.database.query(
            `SELECT series.id AS serie_id,streamings.id AS streaming_id, streamings.name AS streaming_name, streamings.imageStreaming AS streaming_image, streamings.iconStreaming AS streaming_icon, series_streamings.serieIsOriginal
            FROM ${this.table}
            JOIN series ON ${this.table}.serie_id = series.id
            JOIN streamings ON ${this.table}.streaming_id = streamings.id
            WHERE ${this.table}.serie_id = ?`,
            [id]
        );
        return serieStreamings;
    }

    // U - CRUD - UPDATE
    async updateSerieStreaming(id, serieStreaming) {
        const [serieStreamingUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, streaming_id = ?, serieIsOriginal = ? WHERE id = ?`,
            [serieStreaming.serie_id, serieStreaming.streaming_id, serieStreaming.serieIsOriginal, id]
        );
        return serieStreamingUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieStreaming(id) {
        const [serieStreamingDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return serieStreamingDeleted.affectedRows;
    }
}

module.exports = SerieStreamingManager;