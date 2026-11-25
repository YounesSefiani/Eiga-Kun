const AbstractManager = require("./AbstractManager");

class SerieManager extends AbstractManager {
    constructor() {
        super({ table: "series" });
    }

        // C - CRUD - CREATE
    async createSerie(serie) {
        const [serieCreated] = await this.database.query(
            `INSERT INTO ${this.table} (title, original_title, poster, original_poster, background, logo, original_logo, trailer, beginning_date, ending_date, statut, average_episode_duration, nb_total_seasons, nb_total_episodes, SCREEN, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                serie.title,
                serie.original_title,
                serie.poster,
                serie.original_poster,
                serie.background,
                serie.logo,
                serie.original_logo,
                serie.trailer,
                serie.beginning_date,
                serie.ending_date,
                serie.statut,
                serie.average_episode_duration,
                serie.nb_total_seasons,
                serie.nb_total_episodes,
                serie.SCREEN,
                serie.synopsis
            ]
        );
        return serieCreated.insertId;
    }

    // R - CRUD - READ
    async readSeries() {
        const [series] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return series;
    }
    // R - CRUD - READ ONE MOVIE
    async readSerieById(id) {
        const [serie] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return serie[0];
    }
    // U - CRUD - UPDATE
    async updateSerie(id, serie) {
        const [serieUpdated] = await this.database.query(
            `UPDATE ${this.table} SET title = ?, original_title = ?, poster = ?, original_poster = ?, background = ?, logo = ?, original_logo = ?, trailer = ?, beginning_date = ?, ending_date = ?, statut = ?, average_episode_duration = ?, nb_total_seasons = ?, nb_total_episodes = ?, SCREEN = ?, synopsis = ? WHERE id = ?`,
            [
                serie.title,
                serie.original_title,
                serie.poster,
                serie.original_poster,
                serie.background,
                serie.logo,
                serie.original_logo,
                serie.trailer,
                serie.beginning_date,
                serie.ending_date,
                serie.statut,
                serie.average_episode_duration,
                serie.nb_total_seasons,
                serie.nb_total_episodes,
                serie.SCREEN,
                serie.synopsis,
                id
            ]
        );
        return serieUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerie(id) {
        const [serieDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return serieDeleted.affectedRows;
    }
}

module.exports = SerieManager;