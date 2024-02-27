const AbstractManager = require("./AbstractManager");

class cinemasManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "cinemas" as configuration
    super({ table: "cinemas" });
  }

  // The C of CRUD - Create operation

  async create(cinemas) {
    // Execute the SQL INSERT query to add a new cinema to the "cinemas" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, coordonnes_x, coordonnes_y, city, address, website, image) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        cinemas.name,
        cinemas.coordonnes_x,
        cinemas.coordonnes_y,
        cinemas.city,
        cinemas.address,
        cinemas.website,
        cinemas.image,
      ]
    );

    // Return the ID of the newly inserted cinemas
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific cinema by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the cinemas
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all cinemas from the "cinemas" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of cinemas
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing cinema

  async update(id, cinemas) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [cinemas, id]
    );
    return result.insertId;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an cinema by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = cinemasManager;
