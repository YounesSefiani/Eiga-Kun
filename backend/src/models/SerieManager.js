const AbstractManager = require("./AbstractManager");

class seriesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "series" as configuration
    super({ table: "series" });
  }

  // The C of CRUD - Create operation

  async create(series) {
    // Execute the SQL INSERT query to add a new movie to the "series" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, poster, background, logo, trailer, synopsis, genre, theme, universe, release_date, ending_date, statut, seasons, episodes, country, director, screen, streaming) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        series.title,
        series.poster,
        series.background,
        series.logo,
        series.trailer,
        series.synopsis,
        series.genre,
        series.theme,
        series.universe,
        series.release_date,
        series.ending_date,
        series.statut,
        series.seasons,
        series.episodes,
        series.country,
        series.director,
        series.screen,
        series.streaming,
      ]
    );

    // Return the ID of the newly inserted serie
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific serie by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the serie
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all series from the "series" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of series
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing serie

  async update(id, series) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [series, id]
    );
    return result.insertId;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a serie by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = seriesManager;
