const AbstractManager = require ("./AbstractManager");

class UniverseManager extends AbstractManager {
    constructor() {
        super({ table: "universes"});
    }

    // C - CRUD - Create
    async createUniverse(universe) {
        const [universeCreated] = await this.database.query(
            `INSERT INTO ${this.table} (name, imageUniverse, universe_description) VALUES (?, ?, ?)`,
            [universe.name, universe.imageUniverse, universe.universe_description]
        );
        return universeCreated.insertId;
    }

    // R - CRUD - Read
    async readUniverses() {
        const [universes] = await this.database.query(
            `SELECT * FROM ${this.table}`
        );
        return universes;
    }

    async readUniverseId(id) {
        const [genre] = await this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return genre[0];
    }   

    async readUniversesInMovie(movieId) {
        const [universes] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN movie_universes ON movie_universes.universe_id = ${this.table}.id
            WHERE movie_universes.movie_id = ?`,
            [movieId]
        );
        return universes;
    }

     async readUniversesInSerie(serieId) {
        const [universes] = await this.database.query(
            `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN serie_universes ON serie_universes.universe_id = ${this.table}.id
            WHERE serie_universes.serie_id = ?`,
            [serieId]
        );
        return universes;
    }

    async readSubUniversesInUniverse(universeId) {
        const [subUniverses] = await this.database.query(
            `SELECT id, name, imageSubUniverse, subUniverse_description
            FROM subUniverses
            WHERE universe_id = ?`,
            [universeId]
        );
        return subUniverses;
    }

    // U - CRUD - Update
    async updateUniverse(id, universe) {
        const [universeUpdated] = await this.database.query(
            `UPDATE ${this.table} SET name = ?, imageUniverse = ?, universe_description = ? WHERE id = ?`,
            [universe.name, universe.imageUniverse, universe.universe_description, id]
        );
        return universeUpdated.affectedRows;
    }

    // D - CRUD - Delete
    async deleteUniverse(id) {
        const [universeDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return universeDeleted.affectedRows;
    }
}

module.exports = UniverseManager;