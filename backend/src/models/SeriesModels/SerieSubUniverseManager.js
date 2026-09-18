const AbstractManager = require("../AbstractManager");

class SerieSubUniverseManager extends AbstractManager {
    constructor() {
        super({ table: "serie_subUniverses" });
    }

    // C - CRUD - Create
    async createSerieSubUniverse(serieSubUniverse) {
        const [serieSubUniverseCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, subUniverse_id) VALUES (?, ?)`,
            [serieSubUniverse.serie_id, serieSubUniverse.subUniverse_id]
        );
        return serieSubUniverseCreated.insertId;
    }

    // R - CRUD - READ
    async readSerieSubUniverses() {
        const [serieSubUniverses] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, subUniverses.name AS subUniverse_name, ${this.table}.serie_id, ${this.table}.subUniverse_id 
             FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN subUniverses ON ${this.table}.subUniverse_id = subUniverses.id`
        );
        return serieSubUniverses;
    }

    async readSerieSubUniverseId(id) {
        const [serieSubUniverse] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, subUniverses.name AS subUniverse_name, ${this.table}.serie_id, ${this.table}.subUniverse_id FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN subUniverses ON ${this.table}.subUniverse_id = subUniverses.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieSubUniverse[0];
    }

    // U - CRUD - UPDATE
    async updateSerieSubUniverse(id, serieSubUniverse) {
        const [serieSubUniverseUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, subUniverse_id = ? WHERE ${this.table}.id = ?`,
            [serieSubUniverse.serie_id, serieSubUniverse.subUniverse_id, id]
        );
        return serieSubUniverseUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieSubUniverse(id) {
        const [serieSubUniverseDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieSubUniverseDeleted.affectedRows;
    }
}

module.exports = SerieSubUniverseManager;