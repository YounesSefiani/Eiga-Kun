const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
    constructor() {
        super({ table: "movies"});
    }

    // C - CRUD - CREATE
    async createMovie(movie) {
        const [movieCreated] = await this.database.query(
            `INSERT INTO ${this.table} (title, original_title, poster, original_poster, background, logo, original_logo, trailer, synopsis, release_date, duration, SCREEN) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                movie.title,
                movie.original_title,
                movie.poster,
                movie.original_poster,
                movie.background,
                movie.logo,
                movie.original_logo,
                movie.trailer,
                movie.synopsis,
                movie.release_date,
                movie.duration,
                movie.SCREEN
            ]
        );
        return movieCreated.insertId;
    }

    // R - CRUD - READ
    async readMovies() {
        const [movies] = await this.database.query(
            `SELECT ${this.table}.* FROM ${this.table}`
        );
        return movies;
    }
    // R - CRUD - READ ONE MOVIE
    async readMovieById(id) {
        const [movie] = await this.database.query(
            `SELECT ${this.table}.* FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return movie[0];
    }
    // U - CRUD - UPDATE
    async updateMovie(id, movie) {
        const [movieUpdated] = await this.database.query(
            `UPDATE ${this.table} SET title = ?, original_title = ?, poster = ?, original_poster = ?, background = ?, logo = ?, original_logo = ?, trailer = ?, synopsis = ?, release_date = ?, duration = ?, SCREEN = ? WHERE id = ?`,
            [
                movie.title,
                movie.original_title,
                movie.poster,
                movie.original_poster,
                movie.background,
                movie.logo,
                movie.original_logo,
                movie.trailer,
                movie.synopsis,
                movie.release_date,
                movie.duration,
                movie.SCREEN,
                id
            ]
        );
        return movieUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteMovie(id) {
        const [movieDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return movieDeleted.affectedRows;
    }
}

module.exports = MovieManager;