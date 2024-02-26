const AbstractManager = require("./AbstractManager");

class moviesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "movies" as configuration
    super({ table: "movies" });
  }

  // The C of CRUD - Create operation

  async create(movies) {
    // Execute the SQL INSERT query to add a new movie to the "movies" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, poster, background, logo, trailer, synopsis, genre, theme, release_date, screen, streaming, duration, country, universe) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        movies.title,
        movies.poster,
        movies.background,
        movies.logo,
        movies.trailer,
        movies.synopsis,
        movies.genre,
        movies.theme,
        movies.release_date,
        movies.screen,
        movies.streaming,
        movies.duration,
        movies.country,
        movies.universe,
      ]
    );

    // Return the ID of the newly inserted movies
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific movie by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the movies
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all movies from the "movies" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of movies
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing movie

  async update(id, movies) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [movies, id]
    );
    return result.insertId;
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

module.exports = moviesManager;
