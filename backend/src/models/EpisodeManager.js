const AbstractManager = require("./AbstractManager");

class episodesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "episodes" as configuration
    super({ table: "episodes" });
  }

  // The C of CRUD - Create operation

  async create(episodes) {
    // Execute the SQL INSERT query to add a new movie to the "episodes" table
    const {
      serieId,
      seasonId,
      episodeNumber,
      title,
      image,
      releaseDate,
      synopsis,
    } = episodes;
    const [result] = await this.database.query(
      `insert into ${this.table} (serie_id, season_id, episode_number, title, image, release_date, synopsis) values (?, ?, ?, ?, ?, ?, ?)`,
      [serieId, seasonId, episodeNumber, title, image, releaseDate, synopsis]
    );

    // Return the ID of the newly inserted episode
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific episode by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the episode
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all episodes from the "episodes" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of episodes
    return rows;
  }

  async readSerieSeasonsAndEpisodes(serieId) {
    const [rows] = await this.database.query(
      `SELECT series.id AS series_id, seasons.id AS seasons_id, ${this.table}.*
        FROM ${this.table}
        JOIN series ON ${this.table}.serie_id = series.id
        JOIN seasons ON ${this.table}.season_id = seasons.id
        WHERE ${this.table}.serie_id = ?`,
      [serieId]
    );

    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing movie

  async update(id, episodes) {
    const {
      serieId,
      seasonId,
      episodeNumber,
      title,
      image,
      releaseDate,
      synopsis,
    } = episodes;

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET serie_id = ?, season_id = ?, episode_number = ?, title = ?, image = ?, release_date = ?, synopsis = ? WHERE id = ?`,
      [
        serieId,
        seasonId,
        episodeNumber,
        title,
        image,
        releaseDate,
        synopsis,
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

module.exports = episodesManager;
