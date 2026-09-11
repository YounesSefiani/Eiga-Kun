const AbstractManager = require("./AbstractManager");

class SerieNationalityManager extends AbstractManager {
    constructor() {
        super({ table: "serie_nationalities" });
    }

    // C - CRUD - Create
    async createSerieNationality(serieNationality) {
        const [serieNationalityCreated] = await this.database.query(
            `INSERT INTO ${this.table} (serie_id, nationality_id) VALUES (?, ?)`,
            [serieNationality.serie_id, serieNationality.nationality_id]
        );
        return serieNationalityCreated.insertId;
    }

    // R - CRUD - READ
    async readSerieNationalities() {
        const [serieNationality] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, nationalities.name AS nationality_name, ${this.table}.serie_id, ${this.table}.nationality_id 
             FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN nationalities ON ${this.table}.nationality_id = nationalities.id`
        );
        return serieNationality;
    }

    async readSerieNationalityId(id) {
        const [serieNationality] = await this.database.query(
            `SELECT ${this.table}.id, series.title AS serie_title, nationalities.name AS nationality_name, ${this.table}.serie_id, ${this.table}.nationality_id FROM ${this.table}
             JOIN series ON ${this.table}.serie_id = series.id
             JOIN nationalities ON ${this.table}.nationality_id = nationalities.id
             WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieNationality[0];
    }

    // U - CRUD - UPDATE
    async updateSerieNationality(id, serieNationality) {
        const [serieNationalityUpdated] = await this.database.query(
            `UPDATE ${this.table} SET serie_id = ?, nationality_id = ? WHERE ${this.table}.id = ?`,
            [serieNationality.serie_id, serieNationality.nationality_id, id]
        );
        return serieNationalityUpdated.affectedRows;
    }

    // D - CRUD - DELETE
    async deleteSerieNationality(id) {
        const [serieNationalityDeleted] = await this.database.query(
            `DELETE FROM ${this.table} WHERE ${this.table}.id = ?`,
            [id]
        );
        return serieNationalityDeleted.affectedRows;
    }
}

module.exports = SerieNationalityManager;