const AbstractManager = require("./AbstractManager");

class NationalityManager extends AbstractManager {
    constructor() {
        super({ table: "nationalities" });
    }

    // C - CRUD - Create
    async createNationality(nationality) {
        const [nationalityCreated] = await this.database.query(
            `INSERT INTO ${this.table} (name, code, imageNationality) VALUES (?, ?, ?)`,
            [nationality.name, nationality.code, nationality.imageNationality]
        );
        return nationalityCreated.insertId;
    }

    // R - CRUD - Read
    async readNationalities() {
        const [nationalities] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return nationalities;
    }

    async readNationalityId(id) {
        const [nationality] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return nationality[0];
    }

    async readNationalitiesInMovie(movieId) {
        const [nationalities] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN movie_nationalities ON movie_nationalities.nationality_id = ${this.table}.id
            WHERE movie_nationalities.movie_id = ?`,
            [movieId]
        );
        return nationalities;
    }

    async readOneNationalityMovies(nationalityId) {
        const [movies] = await this.database.query(
            `SELECT movies.*
            FROM movies
            JOIN movie_nationalities ON movie_nationalities.movie_id = movies.id
            WHERE movie_nationalities.nationality_id = ?`,
            [nationalityId]
        );
        return movies;
    }

    async readNationalitiesInSerie(serieId) {
        const [nationalities] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN serie_nationalities ON serie_nationalities.nationality_id = ${this.table}.id
            WHERE serie_nationalities.serie_id = ?`,
            [serieId]
        );
        return nationalities;
    }

    async readOneNationalitySeries(nationalityId) {
        const [series] = await this.database.query(
            `SELECT series.*
            FROM series
            JOIN serie_nationalities ON serie_nationalities.serie_id = series.id
            WHERE serie_nationalities.nationality_id = ?`,
            [nationalityId]
        );
        return series;
    }

    // U - CRUD - Update
    async updateNationality(id, nationality) {
        const [nationalityUpdated] = await this.database.query(
            `UPDATE ${this.table} SET name = ?, code = ?, imageNationality = ? WHERE id = ?`,
            [nationality.name, nationality.code, nationality.imageNationality, id]
        );
        return nationalityUpdated.affectedRows;
    }

    // D - CRUD - Delete
    async deleteNationality(id) {
        const [nationalityDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return nationalityDeleted.affectedRows;
    }
}

module.exports = NationalityManager;