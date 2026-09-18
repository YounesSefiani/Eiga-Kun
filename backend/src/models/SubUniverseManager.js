const AbstractManager = require("./AbstractManager");

class SubUniverseManager extends AbstractManager {
  constructor() {
    super({ table: "subUniverses" });
  }

  // C - CRUD - Create
  async createSubUniverse(subUniverse) {
    const [subUniverseCreated] = await this.database.query(
      `INSERT INTO ${this.table} (universe_id, name, imageSubUniverse, subUniverse_description) VALUES (?, ?, ?, ?)`,
      [
        subUniverse.universe_id,
        subUniverse.name,
        subUniverse.imageSubUniverse,
        subUniverse.subUniverse_description,
      ],
    );
    return subUniverseCreated.insertId;
  }

  // R - CRUD - Read
  async readSubUniverses() {
    const [subUniverses] = await this.database.query(
      `SELECT * FROM ${this.table}`,
    );
    return subUniverses;
  }

  async readSubUniverseId(id) {
    const [subUniverse] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return subUniverse[0];
  }

  async readSubUniversesInMovie(movieId) {
    const [subUniverses] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN movie_subUniverses ON movie_subUniverses.subUniverse_id = ${this.table}.id
            WHERE movie_subUniverses.movie_id = ?`,
      [movieId],
    );
    return subUniverses;
  }

  async readSubUniversesInSerie(serieId) {
    const [subUniverses] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN serie_subUniverses ON serie_subUniverses.subUniverse_id = ${this.table}.id
            WHERE serie_subUniverses.serie_id = ?`,
      [serieId],
    );
    return subUniverses;
  }

  async readSubUniversesInUniverse(universeId) {
    const [subUniverses] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.name
            FROM ${this.table}
            JOIN subUniverses ON subUniverse.id = ${this.table}.id
            WHERE universe_id = ?`,
      [universeId],
    );
    return subUniverses;
  }

  // U - CRUD - Update
  async updateSubUniverse(id, subUniverse) {
    const [subUniverseUpdated] = await this.database.query(
      `UPDATE ${this.table} SET universe_id = ?, name = ?, imageSubUniverse = ?, subUniverse_description = ? WHERE id = ?`,
      [
        subUniverse.universe_id,
        subUniverse.name,
        subUniverse.imageSubUniverse,
        subUniverse.subUniverse_description,
        id,
      ],
    );
    return subUniverseUpdated.affectedRows;
  }

  // D - CRUD - Delete
  async deleteSubUniverse(id) {
    const [subUniverseDeleted] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id],
    );
    return subUniverseDeleted.affectedRows;
  }
}

module.exports = SubUniverseManager;
