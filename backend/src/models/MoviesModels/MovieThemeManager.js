const AbstractManager = require("../AbstractManager");

class MovieThemeManager extends AbstractManager {
    constructor() {
        super({ table: "movie_themes" });
    }

    // C - CRUD - Create
    async createMovieTheme(movieTheme) {
        const [movieThemeCreated] = await this.database.query(
            `INSERT INTO ${this.table} (movie_id, theme_id) VALUES (?, ?)`,
            [movieTheme.movie_id, movieTheme.theme_id]
        );
        return movieThemeCreated.insertId;
    }

    // R - CRUD - READ
    async readMovieThemes() {
        const [movieThemes] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, themes.name AS theme_name, ${this.table}.movie_id, ${this.table}.theme_id 
             FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN themes ON ${this.table}.theme_id = themes.id`
        );
        return movieThemes;
    }

    async readMovieThemeId(id) {
        const [movieTheme] = await this.database.query(
            `SELECT ${this.table}.id, movies.title AS movie_title, themes.name AS theme_name, ${this.table}.movie_id, ${this.table}.theme_id FROM ${this.table}
             JOIN movies ON ${this.table}.movie_id = movies.id
             JOIN themes ON ${this.table}.theme_id = themes.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieTheme[0];
    }

    // U - CRUD - UPDATE
    async updateMovieTheme(id, movieTheme) {
        const [movieThemeUpdated] = await this.database.query(
            `UPDATE ${this.table} SET movie_id = ?, theme_id = ? WHERE ${this.table}.id = ?`,
            [movieTheme.movie_id, movieTheme.theme_id, id]
        );
        return movieThemeUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovieTheme(id) {
        const [movieThemeDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return movieThemeDeleted.affectedRows;
    }
}

module.exports = MovieThemeManager;