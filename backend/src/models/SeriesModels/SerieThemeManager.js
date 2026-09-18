const AbstractManager = require("../AbstractManager");

class SerieThemeManager extends AbstractManager {
    constructor() {
        super({ table: "serie_themes" });
    }

    // C - CRUD - Create
    async createSerieTheme(serieTheme) {
        const [serieThemeCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, theme_id) VALUES (?, ?)`,
            [serieTheme.serie_id, serieTheme.theme_id]
        );
        return serieThemeCreated.insertId;
    }

    // R - CRUD - READ
    async readSerieThemes() {
        const [serieThemes] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, themes.name AS theme_name, ${this.table}.serie_id, ${this.table}.theme_id 
             FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN themes ON ${this.table}.theme_id = themes.id`
        );
        return serieThemes;
    }

    async readSerieThemeId(id) {
        const [serieTheme] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, themes.name AS theme_name, ${this.table}.serie_id, ${this.table}.theme_id FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN themes ON ${this.table}.theme_id = themes.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieTheme[0];
    }

    // U - CRUD - UPDATE
    async updateSerieTheme(id, serieTheme) {
        const [serieThemeUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, theme_id = ? WHERE ${this.table}.id = ?`,
            [serieTheme.serie_id, serieTheme.theme_id, id]
        );
        return serieThemeUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieTheme(id) {
        const [serieThemeDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieThemeDeleted.affectedRows;
    }
}

module.exports = SerieThemeManager;