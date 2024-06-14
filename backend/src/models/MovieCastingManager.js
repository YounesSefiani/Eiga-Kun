const AbstractManager = require("./AbstractManager");

class movieCastingManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "movieCasting" as configuration
    super({ table: "movieCasting" });
  }

  // The C of CRUD - Create operation

  async create(movieCasting, movieId, personalityId) {
    // Execute the SQL INSERT query to add a new movieCasting to the "movieCasting" table
    const [result] = await this.database.query(
      `insert into ${this.table} (movies_id, personality_id, role ) values (?, ?, ?)`,
      [movieId, personalityId, movieCasting.role]
    );

    // Return the ID of the newly inserted movieCasting
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific movieCasting by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the movieCasting
    return rows[0];
  }

  async readByMovieId(movieId) {
    const [rows] = await this.database.query(
      `SELECT movieCasting.*, personalities.id AS personalities_id, personalities.image_src AS personalities_image, personalities.fullname AS personalities_fullname
          FROM ${this.table}
          JOIN movies on movieCasting.movie_id = movies.id
          JOIN personalities on movieCasting.personality_id = personalities.id
          WHERE movieCasting.movie_id = ?`,
      [movieId]
    );

    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all movieCastings from the "movieCasting" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of movieCastings
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, movieCasting) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [movieCasting, id]
    );
    return result.insertId;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = movieCastingManager;
