const AbstractManager = require("../AbstractManager");

class SerieUniverseManager extends AbstractManager {
    constructor() {
        super({ table: "serie_universes" });
    }

    // C - CRUD - Create
    async createSerieUniverse(serieUniverse) {
        const [serieUniverseCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, universe_id) VALUES (?, ?)`,
            [serieUniverse.serie_id, serieUniverse.universe_id]
        );
        return serieUniverseCreated.insertId;
    }

    // R - CRUD - READ
    async readSerieUniverses() {
        const [serieUniverses] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, universes.name AS universe_name, ${this.table}.serie_id, ${this.table}.universe_id 
             FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN universes ON ${this.table}.universe_id = universes.id`
        );
        return serieUniverses;
    }

    async readSerieUniverseId(id) {
        const [serieUniverse] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, universes.name AS universe_name, ${this.table}.serie_id, ${this.table}.universe_id FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN universes ON ${this.table}.universe_id = universes.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieUniverse[0];
    }

    // U - CRUD - UPDATE
    async updateSerieUniverse(id, serieUniverse) {
        const [serieUniverseUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, universe_id = ? WHERE ${this.table}.id = ?`,
            [serieUniverse.serie_id, serieUniverse.universe_id, id]
        );
        return serieUniverseUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieUniverse(id) {
        const [serieUniverseDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieUniverseDeleted.affectedRows;
    }
}

module.exports = SerieUniverseManager;