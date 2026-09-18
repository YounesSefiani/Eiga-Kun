const AbstractManager = require("./AbstractManager");

class ThemeManager extends AbstractManager {
    constructor() {
        super({ table: "themes" });
    }

    // C - CRUD - Create
  async createTheme(theme) {
    const [themeCreated] = await this.database.query(
      `INSERT INTO ${this.table} (name, imageTheme) VALUES (?, ?)`,
      [theme.name, theme.imageTheme],
    );
    return themeCreated.insertId;
  }

    // R - CRUD - Read
    async readThemes() {
        const [themes] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return themes;
    }

    async readThemeId(id) {
        const [theme] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return theme[0];
    }

    async readThemesInMovie(movieId) {
        const [themes] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN movie_themes ON movie_themes.theme_id = ${this.table}.id
            WHERE movie_themes.movie_id = ?`,
            [movieId]
        );
        return themes;
    }

     async readThemesInSerie(serieId) {
        const [themes] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN serie_themes ON serie_themes.theme_id = ${this.table}.id
            WHERE serie_themes.serie_id = ?`,
            [serieId]
        );
        return themes;
    }

      async readOneThemeMovies(themeId) {
        const [movies] = await this.database.query(
            `SELECT movies.*
            FROM movies
            JOIN movie_themes ON movie_themes.movie_id = movies.id
            WHERE movie_themes.theme_id = ?`,
            [themeId]
        );
        return movies;
    }

      async readOneThemeSeries(themeId) {
        const [series] = await this.database.query(
            `SELECT series.*
            FROM series
            JOIN serie_themes ON serie_themes.serie_id = series.id
            WHERE serie_themes.theme_id = ?`,
            [themeId]
        );
        return series;
    }

      // U - CRUD - Update
  async updateTheme(id, theme) {
    const [themeUpdated] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, imageTheme = ? WHERE ${this.table}.id = ?`,
      [theme.name, theme.imageTheme, id],
    );
    return themeUpdated.affectedRows;
  }

  // D - CRUD - Delete
  async deleteTheme(id) {
    const [themeDeleted] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return themeDeleted.affectedRows;
  }
}

module.exports = ThemeManager;
