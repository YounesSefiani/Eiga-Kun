const AbstractManager = require("./AbstractManager");

class GenreManager extends AbstractManager {
  constructor() {
    super({ table: "genres" });
  }

  // C - CRUD - Create
  async createGenre(genre) {
    const [genreCreated] = await this.database.query(
      `INSERT INTO ${this.table} (name, imageGenre) VALUES (?, ?)`,
      [genre.name, genre.imageGenre],
    );
    return genreCreated.insertId;
  }

  // R - CRUD - Read
  async readGenres() {
    const [genres] = await this.database.query(`SELECT * FROM ${this.table}`);
    return genres;
  }

  async readGenreId(id) {
    const [genre] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return genre[0];
  }

  async readGenresInMovie(movieId) {
    const [genres] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN movie_genres ON movie_genres.genre_id = ${this.table}.id
            WHERE movie_genres.movie_id = ?`,
      [movieId],
    );
    return genres;
  }

  async readOneGenreMovies(genreId) {
    const [movies] = await this.database.query(
      `SELECT movies.*
            FROM movies
            JOIN movie_genres ON movie_genres.movie_id = movies.id
            WHERE movie_genres.genre_id = ?`,
      [genreId],
    );
    return movies;
  }

  async readGenresInSerie(serieId) {
    const [genres] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN serie_genres ON serie_genres.genre_id = ${this.table}.id
            WHERE serie_genres.serie_id = ?`,
      [serieId],
    );
    return genres;
  }

  // U - CRUD - Update
  async updateGenre(id, genre) {
    const [genreUpdated] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, imageGenre = ? WHERE ${this.table}.id = ?`,
      [genre.name, genre.imageGenre, id],
    );
    return genreUpdated.affectedRows;
  }

  // D - CRUD - Delete
  async deleteGenre(id) {
    const [genreDeleted] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return genreDeleted.affectedRows;
  }
}

module.exports = GenreManager;
