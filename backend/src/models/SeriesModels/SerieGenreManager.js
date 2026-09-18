const AbstractManager = require("../AbstractManager");

class SerieGenreManager extends AbstractManager {
    constructor() {
        super({ table: "serie_genres" });
    }

    // C - CRUD - Create
    async createSerieGenre(serieGenre) {
        const [serieGenreCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, genre_id) VALUES (?, ?)`,
            [serieGenre.serie_id, serieGenre.genre_id]
        );
        return serieGenreCreated.insertId;
    }

    // R - CRUD - READ
    async readSerieGenres() {
        const [serieGenres] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, genres.name AS genre_name, ${this.table}.serie_id, ${this.table}.genre_id 
             FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN genres ON ${this.table}.genre_id = genres.id`
        );
        return serieGenres;
    }

    async readSerieGenreId(id) {
        const [serieGenre] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, genres.name AS genre_name, ${this.table}.serie_id, ${this.table}.genre_id FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN genres ON ${this.table}.genre_id = genres.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieGenre[0];
    }

    // U - CRUD - UPDATE
    async updateSerieGenre(id, serieGenre) {
        const [serieGenreUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, genre_id = ? WHERE ${this.table}.id = ?`,
            [serieGenre.serie_id, serieGenre.genre_id, id]
        );
        return serieGenreUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieGenre(id) {
        const [serieGenreDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieGenreDeleted.affectedRows;
    }
}

module.exports = SerieGenreManager;