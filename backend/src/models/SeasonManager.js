const AbstractManager = require("./AbstractManager");

class seasonsManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "seasons" as configuration
    super({ table: "seasons" });
  }

  // The C of CRUD - Create operation

  async create(seasons) {
    // Execute the SQL INSERT query to add a new movie to the "seasons" table
    const {
      serieId,
      seasonNumber,
      poster,
      firstEpisodeDate,
      lastEpisodeDate,
      synopsis,
      episodes,
    } = seasons;
    const [result] = await this.database.query(
      `insert into ${this.table} (serie_id, season_number, poster, first_episode_date, last_episode_date, synopsis, episodes) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        serieId,
        seasonNumber,
        poster,
        firstEpisodeDate,
        lastEpisodeDate,
        synopsis,
        episodes,
      ]
    );

    // Return the ID of the newly inserted seasons
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific movie by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the seasons
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all seasons from the "seasons" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of seasons
    return rows;
  }

  async readSerieAndSeasons(serieId) {
    const [rows] = await this.database.query(
      `SELECT series.id AS series_id, ${this.table}.*
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        WHERE ${this.table}.serie_id = ?`,
      [serieId]
    );

    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing movie

  async update(id, seasons) {
    const {
      serieId,
      seasonNumber,
      poster,
      firstEpisodeDate,
      lastEpisodeDate,
      synopsis,
      episodes,
    } = seasons;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET serie_id = ?, season_number = ?, poster = ?, first_episode_date = ?, last_episode_date = ?, synopsis = ?, episodes = ? WHERE id = ?`,
      [
        serieId,
        seasonNumber,
        poster,
        firstEpisodeDate,
        lastEpisodeDate,
        synopsis,
        episodes,
        id,
      ]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an movie by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = seasonsManager;
