const AbstractManager = require("./AbstractManager");

class ProfilManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "profils" as configuration
    super({ table: "profils" });
  }

  // The C of CRUD - Create operation

  async create(profile) {
    // Execute the SQL INSERT query to add a new profile to the "profiles" table
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, firstname, lastname, gender, birthdate, postalCode, city, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.pseudo,
        profile.firstname,
        profile.lastname,
        profile.gender,
        profile.birthdate,
        profile.postalCode,
        profile.city,
        profile.image,
        profile.user_id,
      ]
    );

    // Return the ID of the newly inserted profiles
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific profile by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the profiles
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all profiles from the "profiles" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of profiles
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing profile

  async update(id, profiles) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [profiles, id]
    );
    return result.insertId;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an profile by its ID

  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = ProfilManager;
